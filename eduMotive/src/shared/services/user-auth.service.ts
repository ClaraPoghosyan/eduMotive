import { Injectable } from '@angular/core';

const TOKEN_KEY = 'edumotive_token';
const USER_KEY  = 'edumotive_user';
const NAME_KEY  = 'edumotive_fullname';
const ROLE_KEY  = 'edumotive_role';

@Injectable({ providedIn: 'root' })
export class UserAuthService {

  public login(token: string, email: string, fullName: string, role: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY,  email);
    localStorage.setItem(NAME_KEY,  fullName ?? '');
    localStorage.setItem(ROLE_KEY,  role ?? 'USER');
  }

  public logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(NAME_KEY);
    localStorage.removeItem(ROLE_KEY);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public getUserEmail(): string | null {
    return localStorage.getItem(USER_KEY);
  }

  public getFullName(): string | null {
    return localStorage.getItem(NAME_KEY);
  }

  public getRole(): string | null {
    return localStorage.getItem(ROLE_KEY);
  }

  public isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
}