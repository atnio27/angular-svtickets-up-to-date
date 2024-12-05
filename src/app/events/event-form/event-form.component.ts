import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64.directive';
import { EventsService } from '../services/events.service';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { DatePipe } from '@angular/common';
import { MyEvent } from '../../shared/interfaces/my-event';
import { CanComponentDeactivate } from '../../shared/guards/leave-page-guard.guard';
import { minDateValidator } from '../../shared/validators/min-date.validator';

@Component({
  selector: 'event-form',
  standalone: true,
  imports: [
    FormsModule,
    EncodeBase64Directive,
    ValidationClassesDirective,
    DatePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent implements CanComponentDeactivate {
  #fb = inject(NonNullableFormBuilder);
  todayDate: string = new Date().toISOString().split('T')[0];

  eventForm = this.#fb.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z][a-zA-Z ]*$'),
      ],
    ],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    image: ['', Validators.required],
    date: ['', [Validators.required, minDateValidator(this.todayDate)]],
  });

  imageBase64 = '';

  #eventsService = inject(EventsService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router);

  saved = false;

  // TEMPLATE DRIVEN
  // newEvent = {
  //   title: '',
  //   description: '',
  //   price: 0,
  //   image: '',
  //   date: '',
  // };

  addEvent() {
    const event: MyEvent = {
      ...this.eventForm.getRawValue(),
      image: this.imageBase64,
    };

    this.#eventsService
      .insertEvent(event)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.saved = true;
        this.#router.navigate(['/events']);
      });
  }

  checkImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      // this.newEvent.image = ''; // TEMPLATE DRIVEN
      this.imageBase64 = '';
    }
  }

  canDeactivate() {
    return (
      this.saved ||
      this.eventForm.pristine ||
      confirm('Do you want to leave the page? Changes will be lost...')
    );
  }
}
