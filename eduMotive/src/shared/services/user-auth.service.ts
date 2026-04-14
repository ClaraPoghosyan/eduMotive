import { Injectable } from '@angular/core';

const USER_KEY = 'edumotive_user';

@Injectable({ providedIn: 'root' })
export class UserAuthService {
  public login(email: string): void {
    localStorage.setItem(USER_KEY, email);
  }

  public logout(): void {
    localStorage.removeItem(USER_KEY);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(USER_KEY);
  }

  public getUserEmail(): string | null {
    return localStorage.getItem(USER_KEY);
  }
}
