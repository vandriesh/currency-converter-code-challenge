import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('canActivate', () => {
  let authGuard: AuthGuard;
  let authService;
  let router;

  it('should return true for a logged in user', () => {
    authService = { isLoggedIn: () => true };
    router = jasmine.createSpyObj('router', ['navigate']);
    authGuard = new AuthGuard(authService, router);

    expect(
      authGuard.canActivate(new ActivatedRouteSnapshot(), {
        url: 'zzz'
      } as RouterStateSnapshot)
    ).toBeTruthy();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should return false and redirect to login page', () => {
    authService = { isLoggedIn: () => false };
    router = jasmine.createSpyObj('router', ['navigate']);
    authGuard = new AuthGuard(authService, router);

    expect(authService.redirectUrl).toBeUndefined();
    expect(
      authGuard.canActivate(new ActivatedRouteSnapshot(), {
        url: 'zzz'
      } as RouterStateSnapshot)
    ).toBeFalsy();
    expect(authService.redirectUrl).toEqual('zzz');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
