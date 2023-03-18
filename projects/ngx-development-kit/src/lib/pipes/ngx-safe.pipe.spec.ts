import { NgxSafePipe, SafeType } from './ngx-safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('NgxSafePipe', () => {
  let pipe: NgxSafePipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    sanitizer = {} as DomSanitizer;
    sanitizer.bypassSecurityTrustHtml = jest.fn();
    sanitizer.bypassSecurityTrustStyle = jest.fn();
    sanitizer.bypassSecurityTrustUrl = jest.fn();
    sanitizer.bypassSecurityTrustResourceUrl = jest.fn();
    pipe = new NgxSafePipe(sanitizer);
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform html', () => {
    const value = '<p>Hello, World!</p>';
    pipe.transform(value, 'html');

    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(value);
  });

  it('should transform style', () => {
    const value = 'color: red;';
    pipe.transform(value, 'style');

    expect(sanitizer.bypassSecurityTrustStyle).toHaveBeenCalledWith(value);
  });

  it('should transform url', () => {
    const value = 'http://example.com';
    pipe.transform(value, 'url');

    expect(sanitizer.bypassSecurityTrustUrl).toHaveBeenCalledWith(value);
  });

  it('should transform resourceUrl', () => {
    const value = 'http://example.com/resource';
    pipe.transform(value, 'resourceUrl');

    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(value);
  });

  it('should return value if type is not recognized', () => {
    const value = 'Hello, World!';
    const result = pipe.transform(value, 'unknown' as SafeType);

    expect(sanitizer.bypassSecurityTrustHtml).not.toHaveBeenCalled();
    expect(sanitizer.bypassSecurityTrustStyle).not.toHaveBeenCalled();
    expect(sanitizer.bypassSecurityTrustUrl).not.toHaveBeenCalled();
    expect(sanitizer.bypassSecurityTrustResourceUrl).not.toHaveBeenCalled();
    expect(result).toEqual(value);
  });
});
