import { Directive, inject, input, output } from '@angular/core';
import { LoadFbApiService } from './load-fb-api.service';

@Directive({
  selector: '[fbLogin]',
  standalone: true,
  host: {
    '(click)': 'onClick()',
  },
})
export class FbLoginDirective {
  loginOk = output<fb.StatusResponse>();
  loginError = output<string>();
  scopes = input.required<string[]>();

  #loadService = inject(LoadFbApiService);

  async onClick(): Promise<void> {
    try {
      const resp = await this.#loadService.login(this.scopes().join(','));
      this.loginOk.emit(resp);
    } catch (e) {
      console.log(e);
      this.loginError.emit('Error with Facebook login!');
    }
  }
}
