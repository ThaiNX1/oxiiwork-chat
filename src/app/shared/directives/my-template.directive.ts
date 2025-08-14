import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[myTemplate]'
})
export class MyTemplateDirective {
  @Input() tempCode?: string;

  constructor(public template: TemplateRef<unknown>) {
  }
}
