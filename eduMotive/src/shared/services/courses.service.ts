import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../interfaces/courses.interface';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private http: HttpClient = inject(HttpClient);

  public getCourses(): Observable<Course[]> {
   return this.http.get<Course[]>(`${environment.apiUrl}/api/courses`)
  }

  public getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${environment.apiUrl}/api/courses/${id}`);
  }

  public createCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(`${environment.apiUrl}/api/courses`, course);
  }

  public updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${environment.apiUrl}/api/courses/${id}`, course);
  }

  public deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/courses/${id}`);
  }
}
