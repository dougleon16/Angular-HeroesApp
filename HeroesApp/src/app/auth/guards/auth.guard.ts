import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, tap } from 'rxjs';

const checkAuthStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticaded) => console.log('Authenticaded: ', isAuthenticaded)),
    tap((isAuthenticaded) => {
      if (!isAuthenticaded) router.navigateByUrl('auth/login');
    })
  );
};

export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkAuthStatus();
};

// export const canMatchGuard: CanMatchFn = (
//   route: Route,
//   segment: UrlSegment[]
// ) => {
//   return false;
// };
