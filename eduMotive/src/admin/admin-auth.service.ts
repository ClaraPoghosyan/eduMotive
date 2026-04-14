import { Injectable } from '@angular/core';

const ADMIN_KEY = 'edumotive_admin';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly CREDENTIALS = { email: 'admin@edumotive.com', password: 'admin123' };

  public login(email: string, password: string): boolean {
    if (email === this.CREDENTIALS.email && password === this.CREDENTIALS.password) {
      localStorage.setItem(ADMIN_KEY, 'true');
      return true;
    }
    return false;
  }

  public logout(): void {
    localStorage.removeItem(ADMIN_KEY);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem(ADMIN_KEY) === 'true';
  }
}
