import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { catchError, EMPTY } from 'rxjs';
import { MyEvent } from '../interfaces/my-event';

export const eventResolverResolver: ResolveFn<MyEvent> = (route) => {
  const eventServie = inject(EventsService);
  const router = inject(Router);
  return eventServie.getEvent(+route.params['id']).pipe(
    catchError(() => {
      router.navigate(['/events']);
      return EMPTY;
    })
  );
};
