import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
// import { GeolocationService } from '../services/geolocation.service';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64.directive';
import { equalValues } from '../../shared/validators/equal-values.validator';

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
    password: ['', [Validators.required, Validators.minLength(4)]],
    latitude: ['0'],
    longitude: ['0'],
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

  constructor() {
    // geolocation
    // const latitude = this.registerForm.get('latitude');
    // const longitude = this.registerForm.get('longitude');
    // GeolocationService.getLocation().then((coords) => {
    //   latitude?.setValue(coords.latitude.toString());
    //   longitude?.setValue(coords.longitude.toString());
    // });
  }
}
