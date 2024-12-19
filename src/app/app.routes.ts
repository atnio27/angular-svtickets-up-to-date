import { Routes } from '@angular/router';
import { LoginActivateGuard } from './auth/guards/login-activate.guard';
import { LogoutActivateGuard } from './auth/guards/logout-activate.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [LogoutActivateGuard],
    loadChildren: () => import('./auth/auth.routes').then((m) => m.eventRoutes),
  },
  {
    path: 'events',
    canActivate: [LoginActivateGuard],
    loadChildren: () =>
      import('./events/event.routes').then((m) => m.eventRoutes),
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
