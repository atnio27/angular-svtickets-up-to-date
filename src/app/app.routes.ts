import { Routes } from '@angular/router';
import { EventsPageComponent } from './events-page/events-page.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Login | Angular Events',
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        component: EventsPageComponent,
        title: 'Events | Angular Events',
      },
      {
        path: 'add',
        component: EventFormComponent,
        title: 'Add event | Angular Events',
      },
      {
        path: ':id',
        component: EventDetailComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/events',
  },
];
