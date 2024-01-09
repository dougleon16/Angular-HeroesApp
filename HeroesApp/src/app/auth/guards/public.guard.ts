import { CanActivateFn, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

const publicAuthentication = (): Observable<boolean> => {
  const autheService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return autheService.checkAuthentication().pipe(
    tap((isAuthenticaded) => console.log('Authenticaded: ', isAuthenticaded)),
    tap((isAuthenticaded) => {
      if (isAuthenticaded) router.navigateByUrl('/');
    }),
    map((isAuthenticaded) => !isAuthenticaded)
  );
};

export const publicGuard: CanActivateFn = (route, state) => {
  return publicAuthentication();
};
