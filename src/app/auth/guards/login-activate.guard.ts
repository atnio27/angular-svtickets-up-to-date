import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const LoginActivateGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLogged().pipe(
    map((isLogged) => {
      // console.log(isLogged);
      if (isLogged === false) return router.createUrlTree(['/auth/login']);

      return true;
    })
  );
};
