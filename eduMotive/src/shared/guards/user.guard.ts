import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

export const userGuard: CanActivateFn = () => {
  const userAuth = inject(UserAuthService);
  const router = inject(Router);

  if (userAuth.isLoggedIn()) {
    return true;
  }
  router.navigate(['/log-in']);
  return false;
};
