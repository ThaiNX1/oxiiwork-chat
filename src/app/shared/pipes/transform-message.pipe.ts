import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
    name: 'unescapeRn'
})
export class UnescapeRnPipe implements PipeTransform {
    transform(v?: string) {
      return (v ?? '').replace(/\\r\\n|\\n|\\r/g, '<br>');
    }
}