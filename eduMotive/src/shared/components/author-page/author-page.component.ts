import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ActivatedRoute} from '@angular/router';
import {JoinPartComponent} from '../../../join-part.component/join-part.component';
import {FooterComponent} from '../../../footer/footer.component';
import {AuthorService} from '../../services/author.service';
import {Author} from '../../interfaces/author.interface';
import {CoursesService} from '../../services/courses.service';
import {Course} from '../../interfaces/courses.interface';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {switchMap, forkJoin, of, catchError} from 'rxjs';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {CoursesConfigComponent} from '../../../courses-config/courses-config.component';

@Component({
  selector: 'app-author-page',
  imports: [
    HeaderComponent,
    JoinPartComponent,
    FooterComponent,
    NzSpinModule,
    CoursesConfigComponent,
  ],
  templateUrl: './author-page.component.html',
  styleUrl: './author-page.component.scss'
})
export class AuthorPageComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly authorService: AuthorService = inject(AuthorService);
  private readonly coursesService: CoursesService = inject(CoursesService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  public author: Author | null = null;
  public authorCourses: Course[] = [];

  public ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.authorService.getAuthorById(id).pipe(
      switchMap((data: Author) => {
        this.author = data;
        if (!data.courses?.length) return of([]);
        return forkJoin(
          data.courses.map(c => this.coursesService.getCourseById(Number(c.id)))
        ).pipe(catchError(() => of([])));
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (courses: Course[]) => {
        this.authorCourses = courses.map(c => ({ ...c, isBlog: false }));
      },
      error: () => {}
    });
  }
}