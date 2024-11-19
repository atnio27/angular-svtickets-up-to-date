import { Routes } from '@angular/router';
import { EventsPageComponent } from './events-page/events-page.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { numericIdGuardGuard } from './guards/numeric-id-guard.guard';
import { leavePageGuardGuard } from './guards/leave-page-guard.guard';

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
        canDeactivate: [leavePageGuardGuard],
        component: EventFormComponent,
        title: 'Add event | Angular Events',
      },
      {
        path: ':id',
        canActivate: [numericIdGuardGuard],
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
