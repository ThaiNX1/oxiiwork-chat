import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[focusElement]'
})
export class FocusElementDirective implements AfterViewInit {
  constructor(
    private readonly element: ElementRef
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.element.nativeElement.focus();
    }, 100);
  }
}
