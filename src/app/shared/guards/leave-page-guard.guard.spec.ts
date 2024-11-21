import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { leavePageGuardGuard } from './leave-page-guard.guard';

describe('leavePageGuardGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      leavePageGuardGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
