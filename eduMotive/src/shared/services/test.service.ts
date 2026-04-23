import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TestDetail, TestQuestion, TestResult, TestTopic} from '../interfaces/test.interface';

@Injectable({providedIn: 'root'})
export class TestService {
  private readonly http = inject(HttpClient);

  public getTopics(): Observable<TestTopic[]> {
    return this.http.get<TestTopic[]>('/api/tests');
  }

  public getTest(id: number): Observable<TestDetail> {
    return this.http.get<TestDetail>(`/api/tests/${id}`);
  }

  public submitTest(id: number, answers: number[]): Observable<TestResult> {
    return this.http.post<TestResult>(`/api/tests/${id}/submit`, {answers});
  }

  public createTest(payload: Partial<TestTopic>): Observable<TestTopic> {
    return this.http.post<TestTopic>('/api/tests', payload);
  }

  public updateTest(id: number, payload: Partial<TestTopic>): Observable<TestTopic> {
    return this.http.put<TestTopic>(`/api/tests/${id}`, payload);
  }

  public deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`/api/tests/${id}`);
  }

  public addQuestion(testId: number, payload: Partial<TestQuestion>): Observable<TestQuestion> {
    return this.http.post<TestQuestion>(`/api/tests/${testId}/questions`, payload);
  }

  public updateQuestion(testId: number, questionId: number, payload: Partial<TestQuestion>): Observable<TestQuestion> {
    return this.http.put<TestQuestion>(`/api/tests/${testId}/questions/${questionId}`, payload);
  }

  public deleteQuestion(testId: number, questionId: number): Observable<void> {
    return this.http.delete<void>(`/api/tests/${testId}/questions/${questionId}`);
  }
}
