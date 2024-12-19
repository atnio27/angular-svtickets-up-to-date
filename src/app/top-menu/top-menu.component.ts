import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'top-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css',
})
export class TopMenuComponent {
  title = 'Angular Events';

  #authService = inject(AuthService);

  isLogged = computed(() => this.#authService.isLogged().pipe());

  logout() {
    this.#authService.logout();
  }

  // constructor() {
  //   console.log(this.isLogged());
  // }
}
