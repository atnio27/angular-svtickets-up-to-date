import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64.directive';
import { EventsService } from '../services/events.service';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { MinDateDirective } from '../../shared/directives/min-date.directive';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'event-form',
  standalone: true,
  imports: [
    FormsModule,
    EncodeBase64Directive,
    ValidationClassesDirective,
    MinDateDirective,
    DatePipe,
  ],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent {
  #eventsService = inject(EventsService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router);

  saved = false;
  minDateToCheck: string = new Date().toISOString().split('T')[0];

  newEvent = {
    title: '',
    description: '',
    price: 0,
    image: '',
    date: '',
  };

  addEvent() {
    this.#eventsService
      .addEvent(this.newEvent)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.saved = true;
        this.#router.navigate(['/events']);
      });
  }

  checkImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      this.newEvent.image = '';
    }
  }

  canDeactivate() {
    return (
      this.saved ||
      confirm('Do you want to leave the page? Changes will be lost...')
    );
  }
}
