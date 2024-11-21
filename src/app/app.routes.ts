import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.eventRoutes),
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./events/event.routes').then((m) => m.eventRoutes),
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
