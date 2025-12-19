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
    TabComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  private readonly router: Router = inject(Router);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly coursesService: CoursesService = inject(CoursesService);
  public courses: { name: string; value: string }[] = [];
  public coursesTitle: string = 'Մեր լավագույն դասընթացները';
  public coursesSubTitle: string = 'Սովորեք լավագույններից և ձեռք բերեք գործնական գիտելիքներ՝ ձեր առաջընթացի համար';
  public cards = [
    {
      title: 'SEO',
      price: 5000,
      groupName: 'Marketing',
      writer: 'Anahit Manukyan',
      content: 'Card content 1',
      lessons: '22',
      time: '6h 30m',
      isBlog: false
    },
    {
      title: 'SEO',
      price: 5000,
      groupName: 'Marketing',
      writer: 'Anahit Manukyan',
      content: 'Card content 1',
      lessons: '22',
      time: '6h 30m',
      isBlog: false
    },
    {
      title: 'SEO',
      price: 5000,
      groupName: 'Marketing',
      writer: 'Anahit Manukyan',
      content: 'Card content 1',
      lessons: '22',
      time: '6h 30m',
      isBlog: false
    },
    {
      title: 'SEO',
      price: 5000,
      groupName: 'Marketing',
      writer: 'Anahit Manukyan',
      content: 'Card content 1',
      lessons: '22',
      time: '6h 30m',
      isBlog: false
    },

  ];

  public ngOnInit() {
    this.getCourses();
  }

  public getCourses() {
    this.coursesService.getCourses()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => this.courses = res)
  }

  public goToCourses(): void {
    this.router.navigate(['/courses'])
  }
}
