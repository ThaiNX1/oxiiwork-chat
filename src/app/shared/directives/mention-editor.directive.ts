import { Directive, AfterViewInit, Output, EventEmitter, ElementRef, HostListener } from "@angular/core";

@Directive({ selector: '[appMentionEditor]' })
export class MentionEditorDirective implements AfterViewInit {
  /** Toàn bộ text (mỗi keydown/input đều emit) */
  @Output() textChanged = new EventEmitter<string>();
  /** Token mention đang gõ: "@a", "@a b", "@a b c"; hoặc null nếu không hợp lệ */
  @Output() mentionToken = new EventEmitter<string | null>();
  /** Emit riêng khi phát hiện SPACE (kể cả mobile/WebView) */
  @Output() spacePressed = new EventEmitter<void>();
  /** Tối đa bao nhiêu từ sau @ (mặc định 3) */
  maxMentionWords = 3;

  private composing = false;
  private rafId = 0;
  private pendingSpace = false; // nhận từ beforeinput

  constructor(private host: ElementRef<HTMLElement>) { }

  ngAfterViewInit() {
    const el = this.host.nativeElement;
    // Khuyến nghị cho contenteditable
    el.setAttribute('autocomplete', 'off');
    el.setAttribute('autocorrect', 'off');
    el.setAttribute('autocapitalize', 'off');
    el.setAttribute('spellcheck', 'false');
    el.setAttribute('inputmode', 'text');
  }

  ngOnDestroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  // --- IME flow (mobile) ---
  @HostListener('compositionstart') onCompStart() { this.composing = true; }
  @HostListener('compositionend') onCompEnd() { this.composing = false; this.detect(); }

  // Android/iOS: beforeinput & input là chính xác nhất để lấy chuỗi thực
  @HostListener('beforeinput') onBeforeInput(e: InputEvent) {
    const data = (e as any).data; // ký tự sắp chèn
    if ((e.inputType || '').startsWith('insert') && data === ' ') {
      this.pendingSpace = true; // ghi nhận space từ IME
    }
    this.queueDetect();
  }
  @HostListener('input') onInput() {
    if (this.composing) return;
    // Nếu beforeinput đã báo space -> emit ngay và xử lý thoát khỏi element nếu cần
    if (this.pendingSpace) {
      this.pendingSpace = false;
      this.spacePressed.emit();
    }
    this.detect();
  }

  // Theo yêu cầu: mọi keydown đều emit lại (kể cả phím điều hướng/xóa)
  @HostListener('keydown') onKeydown() { this.queueDetect(); }

  private queueDetect() {
    if (this.composing) return;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => this.detect());
  }

  private detect() {
    const el = this.host.nativeElement;

    // 1) Emit full text
    const full = (el.innerText || el.textContent || '').replace(/\u200B/g, '');
    this.textChanged.emit(full);

    // 2) Tính token mention (tối đa 3 từ) tại caret
    const mention = this.computeMentionTokenAtCaret(this.maxMentionWords);
    this.mentionToken.emit(mention);
  }

  private computeMentionTokenAtCaret(maxWords: number): string | null {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;

    let node: Node | null = sel.focusNode;
    let offset: number = sel.focusOffset;

    if (!node) return null;

    // Nếu caret đang ở ELEMENT_NODE, cố lấy text node lân cận
    if (node.nodeType !== Node.TEXT_NODE) {
      const parent = node as Element;
      const idx = Math.min(offset, parent.childNodes.length - 1);
      node = parent.childNodes.item(Math.max(0, idx));
      if (!node || node.nodeType !== Node.TEXT_NODE) return null;
      // khi đổi node, đặt offset về cuối node text
      offset = (node.textContent ?? '').length;
    }

    // Lấy text trong node; bỏ ZWSP nếu có
    const text = (node.textContent ?? '').replace(/\u200B/g, '');
    let i = offset;

    // Quét ngược tìm vị trí '@' gần nhất trong cùng text node
    let at = -1;
    for (let s = i; s > 0; s--) {
      const ch = text.charAt(s - 1);
      if (ch === '@') { at = s - 1; break; }
      // Nếu gặp newline thực, dừng (không vượt qua dòng)
      if (ch === '\n') break;
    }
    if (at < 0) return null;

    // Nếu trước '@' là ký tự không phải whitespace (dính liền từ khác) -> bỏ
    if (at > 0 && !/\s/.test(text.charAt(at - 1))) return null;

    const token = text.slice(at, i);        // gồm '@' + phần sau nó (có thể có khoảng trắng)
    if (!token.startsWith('@')) return null;

    const after = token.slice(1);           // phần sau '@'
    const parts = after.trim().length ? after.trim().split(/\s+/) : [];

    const trailingSpace = /\s$/.test(token);  // người dùng vừa gõ space sau từ cuối
    // Quy tắc reset: quá số từ cho phép, hoặc đã đủ maxWords và người dùng vừa gõ thêm space
    if (parts.length > maxWords || (parts.length === maxWords && trailingSpace)) {
      return null; // reset mention
    }

    // Trả về token ghép tối đa maxWords từ
    if (parts.length === 0) return '@';     // chỉ mới gõ '@'
    const limited = parts.slice(0, Math.min(maxWords, parts.length)).join(' ');
    return '@' + limited;
  }
}