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

  // DEBUGUEAR ESTO

  registerForm = this.#fb.group({
    name: ['', Validators.required],
    emailGroup: this.#fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        emailConfirm: ['', [Validators.required, Validators.email]],
      },
      { validators: matchEmailValidator }
    ),
    password: ['', [Validators.required, Validators.minLength(4)]],
  });
}
