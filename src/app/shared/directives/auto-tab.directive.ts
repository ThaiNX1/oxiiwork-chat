import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAutoTab]'
})
export class AutoTabDirective {
  @Input('appAutoTab') public appAutoTab!: HTMLElement;

  constructor(
    private readonly element: ElementRef
  ) { }

  @HostListener('input', ['$event.target']) 
  public onInput(input: HTMLInputElement): void {
    const length = input.value.length;
    const maxLength = input.attributes.getNamedItem('maxlength')?.value;
    if (maxLength && length >= parseInt(maxLength, 10)) {
      this.appAutoTab.focus();
    }
  }
}
