import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Blog} from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http: HttpClient = inject(HttpClient);

  public getBlogs(): Observable<Blog[]> {
   return this.http.get<Blog[]>('/api/blogs')
  }

  public getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`/api/blogs/${id}`);
  }

  public createBlog(blog: Partial<Blog>): Observable<Blog> {
    return this.http.post<Blog>('/api/blogs', blog);
  }

  public updateBlog(id: number, blog: Partial<Blog>): Observable<Blog> {
    return this.http.put<Blog>(`/api/blogs/${id}`, blog);
  }

  public deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`/api/blogs/${id}`);
  }
}
