import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { welcomeGuardGuard } from './welcome-guard.guard';

describe('welcomeGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => welcomeGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
