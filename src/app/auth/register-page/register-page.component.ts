import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { matchEmailValidator } from '../../shared/validators/match-email.validator';
// import { GeolocationService } from '../services/geolocation.service';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64.directive';

@Component({
  selector: 'register-page',
  standalone: true,
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

  registerForm = this.#fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    emailConfirm: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    latitude: ['0'],
    longitude: ['0'],
    image: ['', [Validators.required]],
  });

  imageBase64 = '';

  checkImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      this.imageBase64 = '';
    }
  }

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

    // geolocation
    // const latitude = this.registerForm.get('latitude');
    // const longitude = this.registerForm.get('longitude');

    // GeolocationService.getLocation().then((coords) => {
    //   latitude?.setValue(coords.latitude.toString());
    //   longitude?.setValue(coords.longitude.toString());
    // });
  }
}
