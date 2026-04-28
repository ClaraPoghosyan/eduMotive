import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

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
    return this.http.post<AuthResponse>(`${environment.apiUrl}${this.base}/login`, { email, password });
  }

  register(email: string, password: string, fullName: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}${this.base}/register`, { email, password, fullName });
  }

  forgotPassword(email: string): Observable<string> {
    return this.http.post(`${environment.apiUrl}${this.base}/forgot-password`, { email }, { responseType: 'text' });
  }

  resetPassword(token: string, password: string): Observable<string> {
    return this.http.post(`${environment.apiUrl}${this.base}/reset-password`, { token, password }, { responseType: 'text' });
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.apiUrl}/api/user/profile`);
  }
}
