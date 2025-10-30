import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = route.data?.['roles'] as string[] | undefined;

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }
  const user = authService.user();
  if (!user) {
    return router.parseUrl('/login');
  }
  const hasRole = requiredRoles.some((role) => user.roles.includes(role));
  return hasRole ? true : (router.parseUrl('/unauthorized') as UrlTree);
};
