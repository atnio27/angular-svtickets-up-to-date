import { Routes } from '@angular/router';

export const eventRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),

    title: 'Login | Angular Events',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register-page/register-page.component').then(
        (m) => m.RegisterPageComponent
      ),

    title: 'Register | Angular Events',
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
