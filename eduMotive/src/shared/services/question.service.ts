import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

export interface QuestionRequest {
  fullName: string;
  email: string;
  title: string;
  message: string;
}

export interface Question {
  id: number;
  fullName: string;
  email: string;
  title: string;
  message: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private http: HttpClient = inject(HttpClient);

  public sendQuestion(payload: QuestionRequest): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/api/questions`, payload);
  }

  public getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.apiUrl}/api/questions`);
  }
}
