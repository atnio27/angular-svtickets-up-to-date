import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(SsrCookieService);

  const token = cookieService.get('token');

  if (token) {
    // Estamos autenticados
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
    return next(authReq); // Petición con credenciales
  }
  return next(req); // Petición sin credenciales
};
