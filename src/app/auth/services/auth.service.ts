import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User, UserLogin } from '../interfaces/user';
import { TokenResponse } from '../interfaces/auth-responses';
import { map, Observable } from 'rxjs';
import { UserRegisterResponse } from '../interfaces/user-responses';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #authUrl = 'auth';
  #http = inject(HttpClient);

  #logged: WritableSignal<boolean> = signal(false);

  get logged() {
    return this.#logged;
  }

  login(user: UserLogin): Observable<void> {
    const loginUrl = `${this.#authUrl}/login/`;

    return this.#http.post<TokenResponse>(loginUrl, user).pipe(
      map((resp) => {
        localStorage.setItem('token', resp.accessToken);
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
