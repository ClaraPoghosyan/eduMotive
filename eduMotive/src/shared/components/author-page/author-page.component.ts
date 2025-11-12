import {Component, inject, Input} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Router} from '@angular/router';
import {FoldableContainerComponent} from '../foldable-container/foldable-container.component';
import {JoinPartComponent} from '../../../join-part.component/join-part.component';
import {FooterComponent} from '../../../footer/footer.component';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {SafeUrlPipe} from '../../pipes/safe-url-pipe';
import {CoursesConfigComponent} from '../../../courses-config/courses-config.component';

@Component({
  selector: 'app-author-page',
  imports: [
    HeaderComponent,
    NzButtonComponent,
    JoinPartComponent,
    FooterComponent,
    NzCardComponent,
    NzColDirective,
    NzRowDirective,
    SafeUrlPipe,
    CoursesConfigComponent
  ],
  templateUrl: './author-page.component.html',
  styleUrl: './author-page.component.scss'
})
export class AuthorPageComponent {
  public coursesTitle: string = 'Դասընթացներ Ռ․Մեսչյանից';
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
  ];
}
