import {
  Component,
  effect,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventsService } from '../services/events.service';
import { Title } from '@angular/platform-browser';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'event-detail',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
})
export class EventDetailComponent {
  id = input.required({ transform: numberAttribute });
  #eventsService = inject(EventsService);
  #title = inject(Title);
  event = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => this.#eventsService.getEvent(id))
    )
  );

  #router = inject(Router);

  constructor() {
    effect(() => {
      if (this.event()) {
        this.#title.setTitle(this.event()!.title + ' | Angular Products');
      }
    });
    // effect(() => {
    //   this.#eventsService
    //   .getEvent(this.id).subscribe((event) => {
    //     this.event.set(event);
    //     this.#title.setTitle(this.event()?.description + ' | Angular Events');
    //   });
    // });
  }

  goBack() {
    this.#router.navigate(['/events']);
  }
}
