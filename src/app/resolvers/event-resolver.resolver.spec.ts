import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { eventResolverResolver } from './event-resolver.resolver';
import { MyEvent } from '../interfaces/my-event';

describe('eventResolverResolver', () => {
  const executeResolver: ResolveFn<MyEvent> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      eventResolverResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
