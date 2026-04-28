import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  token: string;
  email: string;
  fullName: string;
  role: string;
}

export interface UserProfile {
  id: number;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/auth';

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login`, { email, password });
  }

  register(email: string, password: string, fullName: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/register`, { email, password, fullName });
  }

  forgotPassword(email: string): Observable<string> {
    return this.http.post(`${this.base}/forgot-password`, { email }, { responseType: 'text' });
  }

  resetPassword(token: string, password: string): Observable<string> {
    return this.http.post(`${this.base}/reset-password`, { token, password }, { responseType: 'text' });
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>('/api/user/profile');
  }
}
