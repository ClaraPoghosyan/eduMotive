import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private http: HttpClient = inject(HttpClient);

  public getCourses(): Observable<{name: string;value: string}[]> {
   return this.http.get<{name: string;value: string}[]>('/api/courses')
  }
}
