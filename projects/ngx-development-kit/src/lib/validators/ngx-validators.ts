import { AbstractControl, ValidationErrors } from '@angular/forms';

function isEmptyString(value: unknown): boolean {
  return (
    value == null ||
    ((typeof value === 'string' || Array.isArray(value)) && value.toString().trim().length === 0)
  );
}

export class NgxValidators {
  public static requiredString(control: AbstractControl): ValidationErrors | null {
    return isEmptyString(control.value) ? { requiredString: true } : null;
  }
}
