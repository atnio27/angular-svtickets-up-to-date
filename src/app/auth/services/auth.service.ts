import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { GoogleLogin, User, UserLogin } from '../interfaces/user';
import { TokenResponse } from '../interfaces/auth-responses';
import { map, Observable } from 'rxjs';
import { UserRegisterResponse } from '../interfaces/user-responses';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #authUrl = 'auth';
  #http = inject(HttpClient);

  #logged: WritableSignal<boolean> = signal(false);
  cookieService = inject(SsrCookieService);

  get logged() {
    return this.#logged;
  }

  login(user: UserLogin): Observable<void> {
    const loginUrl = `${this.#authUrl}/login/`;

    return this.#http.post<TokenResponse>(loginUrl, user).pipe(
      map((resp) => {
        this.cookieService.set('token', resp.accessToken);
        this.#logged.set(true);
      })
    );
  }

  googleLogin(googleLogin: GoogleLogin): Observable<void> {
    const loginUrl = `${this.#authUrl}/google/`;

    return this.#http.post<TokenResponse>(loginUrl, googleLogin).pipe(
      map((resp) => {
        this.cookieService.set('token', resp.accessToken);
        this.#logged.set(true);
      })
    );
  }

  register(user: User): Observable<void> {
    const registerUrl = `${this.#authUrl}/register/`;

    return this.#http.post<UserRegisterResponse>(registerUrl, user).pipe(
      map((resp) => {
        console.log(resp.email);
      })
    );
  }
}
