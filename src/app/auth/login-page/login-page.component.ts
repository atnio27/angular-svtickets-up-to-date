import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { FbLoginDirective } from '../../facebook-login/fb-login.directive';
import { GoogleLoginDirective } from '../../google-login/google-login.directive';
import { AuthService } from '../services/auth.service';
import { GoogleLogin, UserLogin } from '../interfaces/user';
import { Router } from '@angular/router';
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector: 'login-page',
  imports: [
    ReactiveFormsModule,
    ValidationClassesDirective,
    FbLoginDirective,
    GoogleLoginDirective,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  #fb = inject(NonNullableFormBuilder);
  #authService = inject(AuthService);
  #router = inject(Router);

  loginForm = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  login() {
    const user: UserLogin = {
      ...this.loginForm.getRawValue(),
      lat: 0,
      lng: 0,
    };

    GeolocationService.getLocation()
      .then((coords) => {
        user.lat = coords.latitude;
        user.lng = coords.longitude;
      })
      .catch((err) => {
        console.log(err);
      });

    // Tengo que poner el destroy ref y take until destroyed aqui????? TO DO
    this.#authService
      .login(user)
      .pipe()
      .subscribe(() => {
        this.#router.navigate(['/events']);
      });
  }

  loggedGoogle(resp: google.accounts.id.CredentialResponse) {
    const googleLogin: GoogleLogin = {
      token: resp.credential,
      lat: 0,
      lng: 0,
    };

    GeolocationService.getLocation()
      .then((coords) => {
        googleLogin.lat = coords.latitude;
        googleLogin.lng = coords.longitude;
      })
      .catch((err) => {
        console.log(err);
      });

    this.#authService
      .googleLogin(googleLogin)
      .pipe()
      .subscribe(() => {
        this.#router.navigate(['/events']);
      });
  }

  loggedFacebook(resp: fb.StatusResponse) {
    // Envía esto a tu API
    console.log(resp.authResponse.accessToken);
  }

  showError(error: string) {
    console.error(error);
  }
}
