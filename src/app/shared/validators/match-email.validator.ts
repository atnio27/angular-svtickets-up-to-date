import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchEmailValidator(
  originalEmail: AbstractControl
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = originalEmail.value;
    const emailToConfirm = control.value;

    if (email !== emailToConfirm) {
      return { emailMismatch: true };
    }
    return null;
  };
}
