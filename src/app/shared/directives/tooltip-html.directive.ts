import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[htmlTooltip]',
})
export class HtmlTooltipDirective implements OnInit, OnDestroy {
  @Input('htmlTooltip') tooltipHtml: string = '';

  private tooltipElement: HTMLElement | null = null;
  private mouseEnterListener: () => void;
  private mouseLeaveListener: () => void;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Khởi tạo các listener với bind(this) để giữ ngữ cảnh đúng
    this.mouseEnterListener = this.onMouseEnter.bind(this);
    this.mouseLeaveListener = this.onMouseLeave.bind(this);
  }

  ngOnInit() {
    // Gắn event listeners thông qua renderer
    this.renderer.listen(
      this.el.nativeElement,
      'mouseenter',
      this.mouseEnterListener
    );
    this.renderer.listen(
      this.el.nativeElement,
      'mouseleave',
      this.mouseLeaveListener
    );
  }

  ngOnDestroy() {
    // Đảm bảo tooltip được xóa khi component bị hủy
    this.hideTooltip();
  }

  private onMouseEnter() {
    this.showTooltip();
  }

  private onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    // Đảm bảo ẩn tooltip cũ nếu có
    this.hideTooltip();

    // Tạo phần tử tooltip mới
    this.tooltipElement = this.renderer.createElement('div');

    // Thiết lập các thuộc tính cho tooltip
    this.renderer.addClass(this.tooltipElement, 'html-tooltip');
    this.renderer.setProperty(
      this.tooltipElement,
      'innerHTML',
      this.tooltipHtml
    );

    // Thêm tooltip vào DOM
    this.renderer.appendChild(document.body, this.tooltipElement);

    // Định vị tooltip
    const hostPos = this.el.nativeElement.getBoundingClientRect();

    const top = hostPos.bottom + 10;
    const left = hostPos.left;

    // Thiết lập vị trí và các thuộc tính hiển thị
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
    this.renderer.setStyle(this.tooltipElement, 'background-color', '#333');
    this.renderer.setStyle(this.tooltipElement, 'color', 'white');
    this.renderer.setStyle(this.tooltipElement, 'padding', '5px 10px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '4px');
    this.renderer.setStyle(this.tooltipElement, 'font-size', '14px');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
