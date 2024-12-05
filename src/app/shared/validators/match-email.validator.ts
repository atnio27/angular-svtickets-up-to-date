import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

// BOMBOCLAT DEBUGUEAR ESTO

export function matchEmailValidator(
  c: AbstractControl
): ValidationErrors | null {
  const formGroup = c as FormGroup;
  const email = formGroup.controls['email'].value;
  const email2 = formGroup.controls['emailConfirm'].value;
  return email === email2 ? null : { match: true };
}
