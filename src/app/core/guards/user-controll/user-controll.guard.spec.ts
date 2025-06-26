import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userControllGuard } from './user-controll.guard';

describe('userControllGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userControllGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
