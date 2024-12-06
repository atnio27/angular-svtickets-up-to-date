import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationClassesDirective],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  #fb = inject(NonNullableFormBuilder);

  loginForm = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
}
