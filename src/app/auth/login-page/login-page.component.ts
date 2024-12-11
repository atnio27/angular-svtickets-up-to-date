import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { GoogleLoginDirective } from '../../google-login/google-login.directive';
import { LoadGoogleApiService } from '../../google-login/load-google-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FbLoginDirective } from '../../facebook-login/fb-login.directive';
// import { FaIconComponent } from '@fortawesome/angular-fontawesome';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ValidationClassesDirective,
    GoogleLoginDirective,
    FbLoginDirective,
    // FaIconComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  #fb = inject(NonNullableFormBuilder);

  #loadGoogle = inject(LoadGoogleApiService);

  loginForm = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor() {
    this.#loadGoogle.credential$.pipe(takeUntilDestroyed()).subscribe(
      (resp) => console.log(resp.credential) // Envia esto tu API
    );
  }

  loggedFacebook(resp: fb.StatusResponse) {
    // Envía esto a tu API
    console.log(resp.authResponse.accessToken);
  }

  showError(error: string) {
    console.error(error);
  }
}
