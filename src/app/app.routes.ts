import { Routes } from '@angular/router';
import { loginActivateGuard } from './auth/guards/login-activate.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.eventRoutes),
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./events/event.routes').then((m) => m.eventRoutes),
    canActivate: [loginActivateGuard],
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
