import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// TEMPLATE DRIVEN

// @Directive({
//   selector: '[minDate]',
//   standalone: true,
//   providers: [
//     { provide: NG_VALIDATORS, useExisting: MinDateDirective, multi: true },
//   ],
// })
// export class MinDateDirective {
//   minDate = input.required<string>();

//   validate(control: FormControl<string>): ValidationErrors | null {
//     if (this.minDate() && control.value && this.minDate() > control.value) {
//       return { minDate: true }; // Error returned
//     }

//     return null; // No errors
//   }
// }

export function minDateValidator(minDate: string): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value && minDate && minDate > c.value) {
      return { minDate: true };
    }
    return null;
  };
}
