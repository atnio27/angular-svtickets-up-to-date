import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const LogoutActivateGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLogged().pipe(
    map((isLogged) => {
      // console.log(isLogged);
      // change the route of createUrlTree with /posts instead of /events when I have the posts service
      if (isLogged === true) return router.createUrlTree(['/events']);

      return true;
    })
  );
};
