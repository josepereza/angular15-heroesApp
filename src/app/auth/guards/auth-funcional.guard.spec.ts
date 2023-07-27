import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authFuncionalGuard } from './auth-funcional.guard';

describe('authFuncionalGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authFuncionalGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
