import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private http: HttpClient = inject(HttpClient);

  public getCourses(): Observable<{slug: string;title: string}[]> {
   return this.http.get<{slug: string;title: string}[]>('/api/courses')
  }
}
