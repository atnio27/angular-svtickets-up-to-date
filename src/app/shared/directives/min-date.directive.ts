import { Directive, input } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[minDate]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: MinDateDirective, multi: true },
  ],
})

// TODOOOOOOOO
export class MinDateDirective {
  minDate = input.required<string>();

  validate(control: FormControl<string>): ValidationErrors | null {
    if (this.minDate() && control.value && this.minDate() > control.value) {
      return { minDate: true }; // Error returned
    }

    return null; // No errors
  }
}
