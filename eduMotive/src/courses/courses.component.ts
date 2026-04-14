import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../shared/components/header/header.component';
import {AppFaqComponent} from '../app-faq/app-faq.component';
import {FooterComponent} from '../footer/footer.component';
import {JoinPartComponent} from '../join-part.component/join-part.component';
import {ReviewsComponent} from '../reviews.component/reviews.component';
import {CoursesConfigComponent} from '../courses-config/courses-config.component';
import {Course} from '../shared/interfaces/courses.interface';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FaqService} from '../shared/services/faq.service';
import {CoursesService} from '../shared/services/courses.service';

@Component({
  selector: 'app-courses',
  imports: [
    HeaderComponent,
    FooterComponent,
    JoinPartComponent,
    CoursesConfigComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly coursesService: CoursesService = inject(CoursesService);

  public featuredCoursesTitle: string = 'Ձեր առաջընթացի լավագույն օգնականները';
  public featuredCoursesSubTitle: string = '';
  public courses: Course[] = [];

  ngOnInit() {
    this.getCourses();
  }

  public getCourses(): void {
    this.coursesService.getCourses()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: Course[]) => {

        this.courses = res.map(course => ({
          ...course,
          isBlog: false
        }));
      })
  }
}
