import {
    Directive, ElementRef, HostBinding, HostListener, Input, forwardRef
  } from '@angular/core';
  import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
  
  @Directive({
    selector: '[contenteditable][contenteditableModel]',
    standalone: true,
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContenteditableModelDirective),
      multi: true
    }]
  })
  export class ContenteditableModelDirective implements ControlValueAccessor {
    constructor(private el: ElementRef<HTMLElement>) {}
  
    /** true = giữ HTML; false = plain text */
    @Input() contenteditableHtml = true;
  
    private onChange: (val: any) => void = () => {};
    private onTouched: () => void = () => {};
    private disabled = false;
  
    @HostBinding('attr.contenteditable')
    get editable() { return this.disabled ? 'false' : 'true'; }
  
    writeValue(value: any): void {
      const host = this.el.nativeElement;
      const v = value ?? '';
      if (this.contenteditableHtml) host.innerHTML = String(v);
      else host.textContent = String(v);
    }
  
    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
  
    @HostListener('input')
    onInput() {
      const host = this.el.nativeElement;
      const val = this.contenteditableHtml ? host.innerHTML : (host.textContent ?? '');
      this.onChange(val);
    }
  
    @HostListener('blur') onBlur() { this.onTouched(); }
  
    // Paste sạch nếu plain text mode
    @HostListener('paste', ['$event'])
    onPaste(e: ClipboardEvent) {
      if (!this.contenteditableHtml) {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain') ?? '';
        document.execCommand('insertText', false, text);
      }
    }
  }
  