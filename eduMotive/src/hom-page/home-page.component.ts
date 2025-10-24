import {Component, inject} from '@angular/core';
import {CoursesConfigComponent} from '../courses-config/courses-config.component';
import {BenefitsSectionComponent} from "../benefits-section/benefits-section.component";
import {StepsSectionComponent} from "../steps-section/steps-section.component";
import {AppFaqComponent} from "../app-faq/app-faq.component";
import {WhyChooseComponent} from '../why-choose.component/why-choose.component';
import {ReviewsComponent} from '../reviews.component/reviews.component';
import {JoinPartComponent} from '../join-part.component/join-part.component';
import {FooterComponent} from '../footer/footer.component';
import {HeaderComponent} from '../header/header.component';
import {NzLayoutComponent} from 'ng-zorro-antd/layout';
import {Router} from '@angular/router';

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
    NzLayoutComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private readonly router: Router = inject(Router);

  public featuredCoursesTitle: string = 'Our featured courses';
  public featuredCoursesSubTitle: string = 'Our featured courses inspire growth with expert instruction and practical skills.';
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
    }

  ];

  public goToCourses(): void {
    this.router.navigate(['/courses'])
  }
}
