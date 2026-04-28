import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Blog} from '../interfaces/blog.interface';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http: HttpClient = inject(HttpClient);

  public getBlogs(): Observable<Blog[]> {
   return this.http.get<Blog[]>(`${environment.apiUrl}/api/blogs`)
  }

  public getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${environment.apiUrl}/api/blogs/${id}`);
  }

  public createBlog(blog: Partial<Blog>): Observable<Blog> {
    return this.http.post<Blog>(`${environment.apiUrl}/api/blogs`, blog);
  }

  public updateBlog(id: number, blog: Partial<Blog>): Observable<Blog> {
    return this.http.put<Blog>(`${environment.apiUrl}/api/blogs/${id}`, blog);
  }

  public deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/blogs/${id}`);
  }
}
