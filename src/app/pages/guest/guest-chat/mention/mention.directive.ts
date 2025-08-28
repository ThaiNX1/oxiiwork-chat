import {
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { MentionOverlayComponent } from './mention-overlay.component';
import {
  DEFAULT_MENTION_CONFIG,
  MentionConfig,
  MentionToken,
} from './mention.types';
import { MentionService } from './mention.service';

@Directive({
  selector: '[mention]',
  standalone: true,
})
export class MentionDirective implements OnInit, OnDestroy {
  @Input('mentionSearch') mentionSearch!: (q: string) => any; // Observable<MentionUser[]>
  @Input('mentionConfig') mentionConfig?: MentionConfig;
  @Output() mentionsChange = new EventEmitter<MentionToken[]>();

  private overlayRef?: OverlayRef;
  private cmpRef?: ComponentRef<MentionOverlayComponent>;
  private subs: Subscription[] = [];

  private conf = DEFAULT_MENTION_CONFIG;
  private activeIndex = 0;

  constructor(
    private host: ElementRef<HTMLElement>,
    private overlay: Overlay,
    private svc: MentionService
  ) {}

  ngOnInit() {
    this.conf = { ...DEFAULT_MENTION_CONFIG, ...(this.mentionConfig || {}) };
    this.svc.init(this.mentionSearch, this.conf.debounceMs);

    // cập nhật overlay theo kết quả
    this.subs.push(
      this.svc.results().subscribe(items => {
        if (!this.cmpRef) return;
        this.cmpRef.instance.items = items;
        this.cmpRef.instance.activeIndex = this.activeIndex;
        this.cmpRef.changeDetectorRef.detectChanges();
      })
    );

    const el = this.host.nativeElement;
    this.subs.push(
      fromEvent<KeyboardEvent>(el, 'keydown').subscribe(e => this.onKeyDown(e))
    );
    this.subs.push(
      fromEvent<KeyboardEvent>(el, 'keyup').subscribe(() =>
        setTimeout(() => this.checkTrigger(), 0)
      )
    );
    this.subs.push(
      fromEvent<MouseEvent>(el, 'click').subscribe(() =>
        setTimeout(() => this.checkTrigger(), 0)
      )
    );
    this.subs.push(
      fromEvent<FocusEvent>(el, 'blur').subscribe(() => this.closeOverlay())
    );
    this.subs.push(
      fromEvent<KeyboardEvent>(el, 'keydown').subscribe(e =>
        this.handleDeleteMention(e)
      )
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
    this.closeOverlay();
  }

  // ---------- keyboard in overlay ----------
  private onKeyDown(e: KeyboardEvent) {
    if (!this.overlayRef || !this.overlayRef.hasAttached()) return;

    if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key))
      e.preventDefault();

    if (e.key === 'ArrowDown') this.move(1);
    if (e.key === 'ArrowUp') this.move(-1);
    if (e.key === 'Enter') this.pickActive();
    if (e.key === 'Escape') this.closeOverlay();
  }

  private move(step: number) {
    if (!this.cmpRef?.instance.items?.length) return;
    const total = this.cmpRef.instance.items.length;
    this.activeIndex = (this.activeIndex + step + total) % total;
    this.cmpRef.instance.activeIndex = this.activeIndex;
    this.cmpRef.changeDetectorRef.detectChanges();
  }

  private pickActive() {
    const items = this.cmpRef?.instance.items || [];
    const u = items[this.activeIndex];
    if (u) this.insertMention(u);
  }

  // ---------- trigger detection ----------
  private checkTrigger() {
    const res = this.findTriggerRange();
    if (!res) {
      this.closeOverlay();
      return;
    }
    const { query, rect } = res;

    if (query.length < (this.conf.minChars ?? 0)) {
      this.closeOverlay();
      return;
    }

    this.openOverlay(rect);
    this.activeIndex = 0;
    this.svc.search(query);
  }

  private openOverlay(rect: DOMRect) {
    if (!this.overlayRef) {
      const strategy: FlexibleConnectedPositionStrategy = this.overlay
        .position()
        .flexibleConnectedTo({ x: rect.left, y: rect.bottom })
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 4,
          },
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetY: -4,
          },
        ])
        .withFlexibleDimensions(false)
        .withPush(false);

      this.overlayRef = this.overlay.create({
        positionStrategy: strategy,
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        hasBackdrop: false,
        panelClass: 'mention-overlay-panel',
      });
    } else {
      (
        this.overlayRef.getConfig()
          .positionStrategy as FlexibleConnectedPositionStrategy
      ).setOrigin({ x: rect.left, y: rect.bottom });
    }

    if (!this.overlayRef.hasAttached()) {
      this.cmpRef = this.overlayRef.attach(
        new ComponentPortal(MentionOverlayComponent)
      );
      this.cmpRef.instance.pickUser.subscribe((u: any) =>
        this.insertMention(u)
      );
    }
  }

  private closeOverlay() {
    if (this.overlayRef?.hasAttached()) this.overlayRef.detach();
    this.cmpRef = undefined;
    this.activeIndex = 0;
  }

  private findTriggerRange(): {
    range: Range;
    query: string;
    rect: DOMRect;
  } | null {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    const range = sel.getRangeAt(0);
    if (!range.collapsed) return null;

    const node = range.startContainer;
    const offset = range.startOffset;
    if (!node || node.nodeType !== Node.TEXT_NODE) return null;

    const text = node.textContent ?? '';
    let i = offset - 1;
    while (i >= 0) {
      const ch = text[i];
      if (ch === this.conf.trigger) break;
      if (/\s/.test(ch)) return null;
      i--;
    }
    if (i < 0 || text[i] !== this.conf.trigger) return null;

    const start = i;
    const query = text.slice(start + 1, offset);

    const atRange = document.createRange();
    atRange.setStart(node, start);
    atRange.setEnd(node, offset);

    const rect = range.cloneRange().getBoundingClientRect();
    return { range: atRange, query, rect };
  }

  // ---------- insert & delete mention ----------
  private insertMention(u: any) {
    const res = this.findTriggerRange();
    if (!res) return;
    const { range } = res;

    const span = document.createElement('span');
    span.className = this.conf.mentionClass;
    span.setAttribute('data-user-id', u.id);
    span.setAttribute('contenteditable', 'false');
    span.textContent = `${this.conf.trigger}${u.fullname}`;

    const spacer = document.createTextNode('\u00A0'); // &nbsp;

    range.deleteContents();
    range.insertNode(spacer);
    range.insertNode(span);

    const sel = window.getSelection();
    if (sel) {
      const after = document.createRange();
      after.setStart(spacer, spacer.textContent?.length ?? 1);
      after.collapse(true);
      sel.removeAllRanges();
      sel.addRange(after);
    }

    this.closeOverlay();
    this.emitMentions();
  }

  private handleDeleteMention(e: KeyboardEvent) {
    if (!['Backspace', 'Delete'].includes(e.key)) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (!range.collapsed) return;

    if (e.key === 'Backspace') {
      const node = range.startContainer;
      const off = range.startOffset;
      const prev = this.neighbor(node, off - 1);
      if (
        prev?.nodeType === Node.ELEMENT_NODE &&
        (prev as HTMLElement).classList.contains(this.conf.mentionClass)
      ) {
        e.preventDefault();
        (prev as HTMLElement).remove();
        this.emitMentions();
      }
    } else if (e.key === 'Delete') {
      const node = range.startContainer;
      const off = range.startOffset;
      const next = this.neighbor(node, off);
      if (
        next?.nodeType === Node.ELEMENT_NODE &&
        (next as HTMLElement).classList.contains(this.conf.mentionClass)
      ) {
        e.preventDefault();
        (next as HTMLElement).remove();
        this.emitMentions();
      }
    }
  }

  private neighbor(node: Node, charOffset: number): Node | null {
    if (node.nodeType === Node.TEXT_NODE) {
      if (charOffset < 0) return node.previousSibling;
      if (charOffset >= (node.textContent?.length ?? 0))
        return node.nextSibling;
      return null;
    }
    const el = node as Element;
    return (
      el.childNodes[
        Math.max(0, Math.min(charOffset, el.childNodes.length - 1))
      ] || null
    );
  }

  private emitMentions() {
    const root = this.host.nativeElement;
    const plain = root.innerText;
    const tokens: any[] = [];

    root.querySelectorAll(`.${this.conf.mentionClass}`).forEach(el => {
      const span = el as HTMLElement;
      const text = span.innerText;
      const id = span.getAttribute('data-user-id') || '';
      const idx = plain.indexOf(text); // đơn giản; đủ cho chat cơ bản
      if (idx !== -1)
        tokens.push({ id, name: text, offset: idx, length: text.length });
    });

    this.mentionsChange.emit(tokens);
  }
}
