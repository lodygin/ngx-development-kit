import { FormControl } from '@angular/forms';
import { NgxValidators } from './ngx-validators';

describe('NgxValidators', () => {
  describe('requiredString', () => {
    it('should error on an empty string', () => {
      expect(NgxValidators.requiredString(new FormControl(''))).toEqual({ requiredString: true });
    });

    it('should error on null', () => {
      expect(NgxValidators.requiredString(new FormControl(null))).toEqual({ requiredString: true });
    });

    it('should error on undefined', () => {
      expect(NgxValidators.requiredString(new FormControl(undefined))).toEqual({
        requiredString: true,
      });
    });

    it('should not error on a non-empty string', () => {
      expect(NgxValidators.requiredString(new FormControl('not empty'))).toBeNull();
    });

    it('should accept zero as valid', () => {
      expect(NgxValidators.requiredString(new FormControl(0))).toBeNull();
    });

    it('should error on an empty array', () => {
      expect(NgxValidators.requiredString(new FormControl([]))).toEqual({ requiredString: true });
    });

    it('should not error on a non-empty array', () => {
      expect(NgxValidators.requiredString(new FormControl([1, 2]))).toBeNull();
    });

    it('should not error on an empty object', () => {
      expect(NgxValidators.requiredString(new FormControl({}))).toBeNull();
    });

    it('should not error on an object containing a length attribute that is zero', () => {
      expect(
        NgxValidators.requiredString(new FormControl({ id: 1, length: 0, width: 0 })),
      ).toBeNull();
    });

    it('should error on a string of spaces', () => {
      expect(NgxValidators.requiredString(new FormControl('   '))).toEqual({
        requiredString: true,
      });
    });
  });

  describe('url', () => {
    it('should error on an empty string', () => {
      expect(NgxValidators.url(new FormControl(''))).toEqual({ url: true });
    });

    it('should error on null', () => {
      expect(NgxValidators.url(new FormControl(null))).toEqual({ url: true });
    });

    it('should error on undefined', () => {
      expect(NgxValidators.url(new FormControl(undefined))).toEqual({
        url: true,
      });
    });

    it('should error on a non-url string', () => {
      expect(NgxValidators.url(new FormControl('not url'))).toEqual({ url: true });
    });

    it('should error on an array', () => {
      expect(NgxValidators.url(new FormControl([1, 2, 3]))).toEqual({ url: true });
    });

    it('should error on an object', () => {
      expect(NgxValidators.url(new FormControl({}))).toEqual({ url: true });
    });

    it('should error on numbers', () => {
      expect(NgxValidators.url(new FormControl(123456789))).toEqual({ url: true });
    });

    it('should not error on an link with https protocol', () => {
      expect(NgxValidators.url(new FormControl('https://www.google.com/'))).toBeNull();
    });

    it('should not error on an link with http protocol', () => {
      expect(NgxValidators.url(new FormControl('http://www.google.com/'))).toBeNull();
    });

    it('should not error on an link without protocol', () => {
      expect(NgxValidators.url(new FormControl('google.com'))).toBeNull();
    });

    it('should error on an link with mailto protocol', () => {
      expect(NgxValidators.url(new FormControl('mailto:jen@oreilly.com'))).toEqual({ url: true });
    });

    it('should not error on an link with ftp protocol', () => {
      expect(NgxValidators.url(new FormControl('ftp://host.example.txt'))).toBeNull();
    });
  });
});
