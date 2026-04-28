import { Injectable, inject } from '@angular/core';
import { UserAuthService } from '../shared/services/user-auth.service';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly userAuth = inject(UserAuthService);

  public isLoggedIn(): boolean {
    return this.userAuth.isLoggedIn() && this.userAuth.isAdmin();
  }

  public logout(): void {
    this.userAuth.logout();
  }
}
