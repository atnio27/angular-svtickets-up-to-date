import { Component, DestroyRef, inject, input, output } from '@angular/core';
import {} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { IntlCurrencyPipe } from '../../shared/pipes/intl-currency.pipe.spec';
import { MyEvent } from '../interfaces/my-event';
import { EventsService } from '../services/events.service';

@Component({
    selector: 'event-card',
    imports: [DatePipe, IntlCurrencyPipe, RouterLink],
    templateUrl: './event-card.component.html',
    styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  #eventsService = inject(EventsService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router);

  event = input.required<MyEvent>();
  deleted = output<void>();

  deleteButton() {
    this.#eventsService
      .deleteEvent(this.event().id!)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.deleted.emit();
        this.#router.navigate(['/events']);
      });
  }
}
