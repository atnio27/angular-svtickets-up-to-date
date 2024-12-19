import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { GoogleLogin, User, UserLogin } from '../interfaces/user';
import { TokenResponse } from '../interfaces/auth-responses';
import { catchError, map, Observable, of } from 'rxjs';
import { UserRegisterResponse } from '../interfaces/user-responses';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #authUrl = 'auth';

  #http = inject(HttpClient);
  cookieService = inject(SsrCookieService);
  #logged: WritableSignal<boolean> = signal(false);

  get logged() {
    return this.#logged.asReadonly();
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
        console.log(resp.accessToken);
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

  logout(): void {
    this.cookieService.delete('token');
    this.#logged.set(false);
  }

  isNotLoggedAndDoesNotHaveToken(): boolean {
    return (
      this.logged() === false && this.cookieService.check('token') === false
    );
  }

  isLogged() {
    const token = this.cookieService.get('token');

    if (token) {
      const validateUrl = `${this.#authUrl}/validate/`;
      return this.#http.get(validateUrl).pipe(
        map(() => {
          this.#logged.set(true);
          return true;
        }),
        catchError((error) => {
          console.log(error);
          this.cookieService.delete('token');
          this.#logged.set(false);
          return of(false);
        })
      );

      // if (this.logged().valueOf() === true) {
      //   // User is already logged in
      //   return of(true);
      // }

      // if (this.cookieService.check('token') === false) {
      //   // No token present
      //   return of(false);
      // }

      // // Token exists, validate it
    } else {
      if (this.logged().valueOf() === true) {
        // User is already logged in
        return of(true);
      }

      this.#logged.set(false);
      return of(false);
    }
  }
}
