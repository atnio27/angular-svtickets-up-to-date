import { Routes } from '@angular/router';
import { leavePageGuardGuard } from '../shared/guards/leave-page-guard.guard';
import { numericIdGuardGuard } from '../shared/guards/numeric-id-guard.guard';
import { eventResolverResolver } from './resolvers/event-resolver.resolver';

export const eventRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./events-page/events-page.component').then(
        (m) => m.EventsPageComponent
      ),
    title: 'Events | Angular Events',
  },
  {
    path: 'add',
    canDeactivate: [leavePageGuardGuard],
    loadComponent: () =>
      import('./event-form/event-form.component').then(
        (m) => m.EventFormComponent
      ),
    title: 'Add Event | Angular Events',
  },
  {
    path: ':id',
    canActivate: [numericIdGuardGuard],
    resolve: {
      event: eventResolverResolver,
    },
    loadComponent: () =>
      import('./event-detail/event-detail.component').then(
        (m) => m.EventDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/events',
  },
];
