import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {AppFaqComponent} from '../app-faq/app-faq.component';
import {FooterComponent} from '../footer/footer.component';
import {JoinPartComponent} from '../join-part.component/join-part.component';
import {ReviewsComponent} from '../reviews.component/reviews.component';
import {CoursesConfigComponent} from '../courses-config/courses-config.component';

@Component({
  selector: 'app-blog',
  imports: [
    HeaderComponent,
    AppFaqComponent,
    FooterComponent,
    JoinPartComponent,
    ReviewsComponent,
    CoursesConfigComponent,

  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
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
