import { Component, effect, inject, input } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MyEvent } from '../interfaces/my-event';

@Component({
    selector: 'event-detail',
    imports: [EventCardComponent],
    templateUrl: './event-detail.component.html',
    styleUrl: './event-detail.component.css'
})
export class EventDetailComponent {
  #title = inject(Title);
  #router = inject(Router);

  event = input.required<MyEvent>();

  constructor() {
    effect(() => {
      if (this.event()) {
        this.#title.setTitle(this.event().title + ' | Angular Events');
      }
    });
  }

  goBack() {
    this.#router.navigate(['/events']);
  }
}
