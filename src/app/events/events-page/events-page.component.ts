import { Component, computed, inject, signal } from '@angular/core';
import { MyEvent } from '../interfaces/my-event';
import { FormsModule } from '@angular/forms';
import { EventCardComponent } from '../event-card/event-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EventsService } from '../services/events.service';

@Component({
    selector: 'events-page',
    imports: [FormsModule, EventCardComponent],
    templateUrl: './events-page.component.html',
    styleUrl: './events-page.component.css'
})
export class EventsPageComponent {
  #eventsService = inject(EventsService);

  constructor() {
    this.#eventsService
      .getEvents()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (events) => {
          console.log(events);
          this.events.set(events.events);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  events = signal<MyEvent[]>([]);

  search = signal('');

  orderByDate = () => {
    this.events.update((events) =>
      events.toSorted((a, b) => a.date?.localeCompare(b.date))
    );
  };

  orderByPrice = () => {
    this.events.update((events) =>
      events.toSorted((a, b) => a.price - b.price)
    );
  };

  filteredEvents = computed(() => {
    return this.search()
      ? this.events().filter(
          (e) =>
            e.title?.toLowerCase().includes(this.search().toLowerCase()) ||
            e.description?.toLowerCase().includes(this.search().toLowerCase())
        )
      : this.events();
  });

  addEvent(event: MyEvent) {
    this.events.update((events) => [...events, event]);
  }

  deleteButton(event: MyEvent) {
    this.events.update((events) => events.filter((e) => e !== event));
  }
}
