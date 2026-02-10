import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CoursesConfigComponent} from '../courses-config/courses-config.component';
import {BenefitsSectionComponent} from "../benefits-section/benefits-section.component";
import {StepsSectionComponent} from "../steps-section/steps-section.component";
import {AppFaqComponent} from "../app-faq/app-faq.component";
import {WhyChooseComponent} from '../why-choose.component/why-choose.component';
import {ReviewsComponent} from '../reviews.component/reviews.component';
import {JoinPartComponent} from '../join-part.component/join-part.component';
import {FooterComponent} from '../footer/footer.component';
import {HeaderComponent} from '../shared/components/header/header.component';
import {NzLayoutComponent} from 'ng-zorro-antd/layout';
import {Router} from '@angular/router';
import {TabComponent} from '../shared/components/tab.component/tab.component';
import {HttpClient} from '@angular/common/http';
import {CoursesService} from '../shared/services/courses.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Course} from '../shared/interfaces/courses.interface';
import {FaqService} from '../shared/services/faq.service';
import {Faq} from '../shared/interfaces/faq.interface';

@Component({
  selector: 'app-home-page',
  imports: [
    CoursesConfigComponent,
    BenefitsSectionComponent,
    StepsSectionComponent,
    AppFaqComponent,
    WhyChooseComponent,
    ReviewsComponent,
    JoinPartComponent,
    FooterComponent,
    HeaderComponent,
    NzLayoutComponent,
    TabComponent,
    NzButtonComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  private readonly router: Router = inject(Router);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly faqService: FaqService = inject(FaqService);
  private readonly coursesService: CoursesService = inject(CoursesService);

  public faqs: Faq[] = [];
  public courses:Course[] = [];
  public coursesTitle: string = 'Մեր լավագույն դասընթացները';
  public coursesSubTitle: string = 'Սովորեք լավագույններից և ձեռք բերեք գործնական գիտելիքներ՝ ձեր առաջընթացի համար';
  public bestCourses : Course[] = []

  public ngOnInit() {
    this.getFAQ();
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

        this.bestCourses = [...this.courses]
          .filter(course => course.rating != null)
          .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
          .slice(0, 4);
      });
  }

  public getFAQ(): void {
    this.faqService.getFAQ()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: Faq[]) => {
        this.faqs = res;
      })
  }

  public goToCourses(): void {
    this.router.navigate(['/courses'])
  }

}
