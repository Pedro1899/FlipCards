import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userLanguageGuard } from './user-language.guard';

describe('userLanguageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userLanguageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
