import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../interfaces/courses.interface';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private http: HttpClient = inject(HttpClient);

  public getCourses(): Observable<Course[]> {
   return this.http.get<Course[]>('/api/courses')
  }

  public getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${id}`);
  }

  public createCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>('/api/courses', course);
  }

  public updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`/api/courses/${id}`, course);
  }

  public deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`/api/courses/${id}`);
  }
}
