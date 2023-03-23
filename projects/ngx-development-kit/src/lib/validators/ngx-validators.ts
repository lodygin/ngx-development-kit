import { AbstractControl, ValidationErrors } from '@angular/forms';

import isUrlValidator from 'validator/es/lib/isUrl';

function isEmptyString(value: unknown): boolean {
  return (
    value == null ||
    ((typeof value === 'string' || Array.isArray(value)) && value.toString().trim().length === 0)
  );
}

function isURL(value: unknown): boolean {
  if (typeof value !== 'string') {
    return false;
  }

  return isUrlValidator(value);
}

export class NgxValidators {
  public static requiredString(control: AbstractControl): ValidationErrors | null {
    return isEmptyString(control.value) ? { requiredString: true } : null;
  }

  public static url(control: AbstractControl): ValidationErrors | null {
    return isURL(control.value) ? null : { url: true };
  }
}
