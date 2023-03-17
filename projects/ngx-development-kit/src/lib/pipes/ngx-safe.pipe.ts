import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';

export type SafeType = 'html' | 'style' | 'url' | 'resourceUrl';

@Pipe({
  name: 'ngxSafe',
  standalone: true,
})
export class NgxSafePipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  public transform(value: string, type: SafeType): SafeValue {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);

      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);

      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);

      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);

      default:
        return value;
    }
  }
}
