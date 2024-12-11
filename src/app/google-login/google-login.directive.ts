import { afterNextRender, Directive, ElementRef, inject } from '@angular/core';
import { LoadGoogleApiService } from './load-google-api.service';

@Directive({
  selector: '[googleLogin]',
  standalone: true,
})
export class GoogleLoginDirective {
  #element = inject(ElementRef);
  #loadService = inject(LoadGoogleApiService);

  constructor() {
    // Nos aseguramos que no se ejecuta en el lado del servidor si tenemos SSR activado
    afterNextRender(() =>
      this.#loadService.setGoogleBtn(this.#element.nativeElement)
    );
  }
}
