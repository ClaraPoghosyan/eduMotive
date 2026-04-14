import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../interfaces/courses.interface';
import {Author} from '../interfaces/author.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private http: HttpClient = inject(HttpClient);

  public getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`/api/authors/${id}`);
  }

}
