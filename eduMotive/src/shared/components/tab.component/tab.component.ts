import { Component } from '@angular/core';
import {NzTabComponent, NzTabsComponent} from 'ng-zorro-antd/tabs';
import {CoursesConfigComponent} from '../../../courses-config/courses-config.component';
import {CardConfigComponent} from '../../../card-config/card-config.component';

@Component({
  selector: 'app-tab',
  imports: [
    NzTabsComponent,
    NzTabComponent,
    CoursesConfigComponent,
    CardConfigComponent
  ],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {
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

}
