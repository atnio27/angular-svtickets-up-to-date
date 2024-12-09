import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MyEvent } from '../interfaces/my-event';
import {
  EventsResponse,
  SingleEventResponse,
} from '../interfaces/event-responses';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  #eventsUrl = 'events';
  #http = inject(HttpClient);

  getEvents(): Observable<MyEvent[]> {
    return this.#http
      .get<EventsResponse>(`${this.#eventsUrl}`)
      .pipe(map((resp) => resp.events));
  }

  getEvent(id: number): Observable<MyEvent> {
    return this.#http
      .get<SingleEventResponse>(`${this.#eventsUrl}/${id}`)
      .pipe(map((resp) => resp.event));
  }

  insertEvent(event: MyEvent): Observable<MyEvent> {
    return this.#http
      .post<SingleEventResponse>(`${this.#eventsUrl}`, event)
      .pipe(map((resp) => resp.event));
  }

  deleteEvent(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#eventsUrl}/${id}`);
  }
}
