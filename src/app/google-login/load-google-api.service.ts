import { Injectable, inject } from '@angular/core';
import { Subject, fromEvent, firstValueFrom } from 'rxjs';
import { CLIENT_ID } from './google-login.config';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoadGoogleApiService {
  #loader: Promise<void>;
  #credential$ = new Subject<google.accounts.id.CredentialResponse>();
  #clientId = inject(CLIENT_ID, { optional: true });
  document = inject(DOCUMENT);

  constructor() {
    if (this.#clientId === null) {
      // Error al desarrollador cuando no ha inyectado la id de Google
      throw new Error(
        'LoadGoogleApiService: You must call provideGoogleId in your providers array'
      );
    }
    this.#loader = this.#loadApi(); // Empezamos a cargar la librería
  }

  get credential$() {
    return this.#credential$.asObservable();
  }

  async setGoogleBtn(btn: HTMLElement) {
    await this.#loader; // Espera a que se haya terminado de cargar (si no lo ha hecho ya)
    google.accounts.id.renderButton(btn, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      shape: 'rectangular',
    });
  }

  async #loadApi(): Promise<void> {
    const script = this.document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    this.document.body.appendChild(script);

    await firstValueFrom(fromEvent(script, 'load'));

    google.accounts.id.initialize({
      client_id: this.#clientId!,
      callback: (response) => {
        this.#credential$.next(response); // Se le llama cada vez que hay un login con Google
      },
    });
  }
}
