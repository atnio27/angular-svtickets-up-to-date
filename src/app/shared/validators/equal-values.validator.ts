import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function equalValues(c1: string, c2: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control1 = group.get(c1);
    const control2 = group.get(c2);
    if (control1?.value !== control2?.value) {
      return { equalValues: true };
    }

    return null; // No errors
  };
}
