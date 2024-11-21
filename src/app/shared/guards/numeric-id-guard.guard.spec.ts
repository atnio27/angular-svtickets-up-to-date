import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { numericIdGuardGuard } from './numeric-id-guard.guard';

describe('numericIdGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => numericIdGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
