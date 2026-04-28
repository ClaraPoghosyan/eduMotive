import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TestDetail, TestQuestion, TestResult, TestTopic} from '../interfaces/test.interface';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class TestService {
  private readonly http = inject(HttpClient);

  public getTopics(): Observable<TestTopic[]> {
    return this.http.get<TestTopic[]>(`${environment.apiUrl}/api/tests`);
  }

  public getTest(id: number): Observable<TestDetail> {
    return this.http.get<TestDetail>(`${environment.apiUrl}/api/tests/${id}`);
  }

  public submitTest(id: number, answers: number[]): Observable<TestResult> {
    return this.http.post<TestResult>(`${environment.apiUrl}/api/tests/${id}/submit`, {answers});
  }

  public createTest(payload: Partial<TestTopic>): Observable<TestTopic> {
    return this.http.post<TestTopic>(`${environment.apiUrl}/api/tests`, payload);
  }

  public updateTest(id: number, payload: Partial<TestTopic>): Observable<TestTopic> {
    return this.http.put<TestTopic>(`${environment.apiUrl}/api/tests/${id}`, payload);
  }

  public deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/tests/${id}`);
  }

  public addQuestion(testId: number, payload: Partial<TestQuestion>): Observable<TestQuestion> {
    return this.http.post<TestQuestion>(`${environment.apiUrl}/api/tests/${testId}/questions`, payload);
  }

  public updateQuestion(testId: number, questionId: number, payload: Partial<TestQuestion>): Observable<TestQuestion> {
    return this.http.put<TestQuestion>(`${environment.apiUrl}/api/tests/${testId}/questions/${questionId}`, payload);
  }

  public deleteQuestion(testId: number, questionId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/tests/${testId}/questions/${questionId}`);
  }
}
