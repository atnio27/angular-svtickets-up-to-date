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
  #logged: WritableSignal<boolean> = signal(false);

  #http = inject(HttpClient);
  cookieService = inject(SsrCookieService);

  getLogged() {
    return this.#logged();
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

  logout(): void {
    this.cookieService.delete('token');
    this.#logged.set(false);
  }

  isLogged(): Observable<boolean> {
    if (this.getLogged() === false && this.cookieService.check('token')) {
      return of(false);
    }

    if (this.getLogged()) return of(true);

    const validateUrl = `${this.#authUrl}/validate/`;

    return this.#http.get<Observable<boolean>>(validateUrl).pipe(
      map(() => {
        console.log();
        this.#logged.set(true);
        return true;
      }),
      catchError(() => {
        this.cookieService.delete('token');
        return of(false);
      })
    );
  }
}
