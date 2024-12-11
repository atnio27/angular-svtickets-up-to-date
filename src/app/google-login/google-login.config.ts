import { InjectionToken, Provider } from '@angular/core';

export const CLIENT_ID = new InjectionToken<string>('client_id');
// Hay que usar aqui la id ??                           ^
// 540772868802-d260kpth4ucbmu3rhdcj47rc029u54bb.apps.googleusercontent.com

export function provideGoogleId(clientId: string): Provider {
  return { provide: CLIENT_ID, useValue: clientId };
}
