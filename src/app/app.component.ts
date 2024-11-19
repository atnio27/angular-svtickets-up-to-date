import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventsPageComponent } from './events-page/events-page.component';
import { TopMenuComponent } from './top-menu/top-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventsPageComponent, TopMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-svtickets';
}
