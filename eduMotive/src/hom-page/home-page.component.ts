import { Component } from '@angular/core';
import {CoursesConfigComponent} from '../courses-config/courses-config.component';
import {BenefitsSectionComponent} from "../benefits-section/benefits-section.component";
import {StepsSectionComponent} from "../steps-section/steps-section.component";
import {AppFaqComponent} from "../app-faq/app-faq.component";
import {WhyChooseComponent} from '../why-choose.component/why-choose.component';

@Component({
  selector: 'app-home-page',
  imports: [
    CoursesConfigComponent,
    BenefitsSectionComponent,
    StepsSectionComponent,
    AppFaqComponent,
    WhyChooseComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  public featuredCoursesTitle: string= 'Our featured courses';
  public featuredCoursesSubTitle: string = 'Our featured courses inspire growth with expert instruction and practical skills.';
  public cards = [
    { title: 'Card title 1', content: 'Card content 1' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 2', content: 'Card content 2' },
    { title: 'Card title 3', content: 'Card content 3' }
  ];
}
