import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { matchEmailValidator } from '../../shared/validators/match-email.validator';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'register-page',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationClassesDirective, JsonPipe],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  #fb = inject(NonNullableFormBuilder);

  emailConfirm = '';

  registerForm = this.#fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    emailConfirm: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor() {
    const originalEmail = this.registerForm.get('email');
    const emailToConfirm = this.registerForm.get('emailConfirm');

    if (originalEmail) {
      emailToConfirm?.setValidators([
        Validators.required,
        Validators.email,
        matchEmailValidator(originalEmail),
      ]);
    }
  }
}
