import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../shared/services/user-auth.service';

export const adminGuard: CanActivateFn = () => {
  const userAuth = inject(UserAuthService);
  const router   = inject(Router);

  if (userAuth.isLoggedIn() && userAuth.isAdmin()) {
    return true;
  }
  router.navigate(['/log-in']);
  return false;
};