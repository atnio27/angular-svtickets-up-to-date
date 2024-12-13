import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { GeolocationService } from '../services/geolocation.service';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64.directive';
import { equalValues } from '../../shared/validators/equal-values.validator';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register-page',
  imports: [
    ReactiveFormsModule,
    ValidationClassesDirective,
    EncodeBase64Directive,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  #fb = inject(NonNullableFormBuilder);
  #authService = inject(AuthService);
  #router = inject(Router);

  registerForm = this.#fb.group({
    name: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]],
    lat: [0],
    lng: [0],
    image: ['', [Validators.required]],
  });

  imageBase64 = '';

  emailGroupForm = this.#fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      repeatEmail: [''],
    },
    { validators: equalValues('email', 'repeatEmail') }
  );

  checkImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      this.imageBase64 = '';
    }
  }

  register() {
    const registerForm = {
      ...this.registerForm.getRawValue(),
      ...this.emailGroupForm.getRawValue(),
    };

    const user: User = {
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
      lat: +registerForm.lat,
      lng: +registerForm.lng,
      avatar: this.imageBase64,
    };

    this.#authService
      .register(user)
      .pipe()
      .subscribe(() => {
        this.#router.navigate(['/auth/login']);
      });
  }

  constructor() {
    // geolocation
    const latitude = this.registerForm.get('lat');
    const longitude = this.registerForm.get('lng');

    GeolocationService.getLocation()
      .then((coords) => {
        latitude?.setValue(coords.latitude);
        longitude?.setValue(coords.longitude);
      })
      .catch((err) => {
        console.log(err);
        latitude?.setValue(0);
        longitude?.setValue(0);
      });
  }
}
