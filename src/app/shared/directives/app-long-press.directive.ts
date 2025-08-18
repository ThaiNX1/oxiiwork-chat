import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appLongPress]',
})
export class LongPressDirective implements OnDestroy {
  /** Thời gian giữ để kích hoạt long-press (ms) */
  @Input() pressDuration = 500;
  /** Khoảng lặp khi giữ sau long-press (0 = không lặp) */
  @Input() repeatInterval = 0;
  /** Ngưỡng di chuyển cho phép trong lúc giữ (px) */
  @Input() moveTolerance = 10;
  /** Chặn click ngay sau long-press */
  @Input() swallowClickAfterLongPress = true;
  /** Có chặn menu chuột phải / menu giữ lâu khi đang nhấn? */
  @Input() preventContextMenuWhilePressing = true;

  /** Bắn 1 lần khi đủ pressDuration */
  @Output() longPress = new EventEmitter<ElementRef<HTMLElement>>();
  /** Bắn lặp khi còn giữ (tick = 1,2,3,…) */
  @Output() holdPress = new EventEmitter<number>();
  /** Bắt đầu nhấn (pointerdown) */
  @Output() pressStart = new EventEmitter<PointerEvent>();
  /** Kết thúc/cancel nhấn */
  @Output() pressEnd = new EventEmitter<void>();
  /** Bị hủy do di chuyển quá ngưỡng */
  @Output() pressCancel = new EventEmitter<void>();

  private pressed = false;
  private longTriggered = false;
  private timeoutId: any = null;
  private intervalId: any = null;
  private startX = 0;
  private startY = 0;
  private pointerId: number | null = null;
  private tick = 0;

  constructor(
    private zone: NgZone,
    private el: ElementRef<HTMLElement>
  ) {
    // Hạn chế delay & select trên mobile (tùy chọn)
    const style = this.el.nativeElement.style as any;
    if (!style.touchAction) style.touchAction = 'manipulation';
    (this.el.nativeElement as HTMLElement).onselectstart = () => false;
  }

  @HostListener('pointerdown', ['$event'])
  onPointerDown(ev: PointerEvent) {
    // Chỉ nhận nút trái
    if (ev.button !== undefined && ev.button !== 0) return;

    this.pressed = true;
    this.longTriggered = false;
    this.tick = 0;
    this.startX = ev.clientX;
    this.startY = ev.clientY;
    this.pointerId = ev.pointerId ?? null;

    // Bắt pointer để vẫn nhận move/up khi rời khỏi phần tử
    try {
      (ev.target as Element).setPointerCapture?.(ev.pointerId);
    } catch {}

    this.pressStart.emit(ev);

    this.zone.runOutsideAngular(() => {
      this.timeoutId = window.setTimeout(() => {
        if (!this.pressed) return;
        this.longTriggered = true;
        this.zone.run(() => this.longPress.emit(this.el));

        if (this.repeatInterval > 0) {
          this.intervalId = window.setInterval(() => {
            if (!this.pressed) return;
            this.tick++;
            this.zone.run(() => this.holdPress.emit(this.tick));
          }, this.repeatInterval);
        }
      }, this.pressDuration);
    });

    if (this.preventContextMenuWhilePressing) {
      // iOS/Android: hạn chế menu giữ lâu
      ev.preventDefault?.();
    }
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove(ev: PointerEvent) {
    if (!this.pressed) return;
    if (this.pointerId !== null && ev.pointerId !== this.pointerId) return;

    const dx = ev.clientX - this.startX;
    const dy = ev.clientY - this.startY;
    if (Math.hypot(dx, dy) > this.moveTolerance) {
      this.cancel('move');
    }
  }

  @HostListener('pointerup', ['$event'])
  @HostListener('pointercancel', ['$event'])
  @HostListener('pointerleave', ['$event'])
  onPointerUpOrLeave(_: PointerEvent) {
    this.finish();
  }

  // Chặn menu chuột phải khi đang giữ
  @HostListener('contextmenu', ['$event'])
  onContextMenu(e: Event) {
    if (this.pressed && this.preventContextMenuWhilePressing)
      e.preventDefault();
  }

  // Ngăn click lọt sau long-press
  @HostListener('click', ['$event'])
  onClick(ev: MouseEvent) {
    if (this.longTriggered && this.swallowClickAfterLongPress) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      this.longTriggered = false; // reset cho lần sau
    }
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  private finish() {
    const wasPressed = this.pressed;
    this.pressed = false;
    this.clearTimers();
    if (wasPressed) this.pressEnd.emit();
  }

  private cancel(_reason: 'move') {
    const wasPressed = this.pressed;
    this.pressed = false;
    this.clearTimers();
    if (wasPressed) this.pressCancel.emit();
  }

  private clearTimers() {
    if (this.timeoutId != null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
