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
});
