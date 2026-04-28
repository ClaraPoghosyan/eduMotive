import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Author} from '../interfaces/author.interface';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private http: HttpClient = inject(HttpClient);

  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.apiUrl}/api/authors`);
  }

  public getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`${environment.apiUrl}/api/authors/${id}`);
  }

  public createAuthor(payload: Partial<Author>): Observable<Author> {
    return this.http.post<Author>(`${environment.apiUrl}/api/authors`, payload);
  }

  public updateAuthor(id: number, payload: Partial<Author>): Observable<Author> {
    return this.http.put<Author>(`${environment.apiUrl}/api/authors/${id}`, payload);
  }

  public deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/authors/${id}`);
  }
}
