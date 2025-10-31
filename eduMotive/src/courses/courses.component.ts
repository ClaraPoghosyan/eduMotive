import { Component } from '@angular/core';
import {HeaderComponent} from '../shared/components/header/header.component';
import {AppFaqComponent} from '../app-faq/app-faq.component';
import {FooterComponent} from '../footer/footer.component';
import {JoinPartComponent} from '../join-part.component/join-part.component';
import {ReviewsComponent} from '../reviews.component/reviews.component';
import {CoursesConfigComponent} from '../courses-config/courses-config.component';

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
export class CoursesComponent {
  public featuredCoursesTitle: string= 'Մտքեր, խորհուրդներ հատուկ Ձեզ համար';
  public featuredCoursesSubTitle: string = '';
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
