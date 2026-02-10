import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../interfaces/courses.interface';
import {Faq} from '../interfaces/faq.interface';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private http: HttpClient = inject(HttpClient);

  public getFAQ(): Observable<Faq[]> {
   return this.http.get<Faq[]>('/api/faq')
  }
}
