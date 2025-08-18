import { Component } from '@angular/core';
import {CoursesConfig} from '../courses-config/courses-config';

@Component({
  selector: 'app-home-page',
  imports: [
    CoursesConfig
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
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
