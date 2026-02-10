import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NzTabComponent, NzTabsComponent} from 'ng-zorro-antd/tabs';
import {CoursesConfigComponent} from '../../../courses-config/courses-config.component';
import {CardConfigComponent} from '../../../card-config/card-config.component';
import {Course} from '../../interfaces/courses.interface';
import {log} from 'ng-zorro-antd/core/logger';

@Component({
  selector: 'app-tab',
  imports: [
    NzTabsComponent,
    NzTabComponent,
    CardConfigComponent
  ],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent implements OnChanges {
  @Input() cards: Course[] = [];
  public programmingCards: Course[] = [];
  public dataCards: Course[] = [];
  public designCards: Course[] = [];
  public marketingCards: Course[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cards']?.currentValue) {
      this.splitCardsByGroup(changes['cards'].currentValue);
    }
  }

  private splitCardsByGroup(courses: Course[]): void {
    this.programmingCards = courses.filter(c => c.groupName === 'Programming');
    this.dataCards = courses.filter(c => c.groupName === 'Data');
    this.designCards = courses.filter(c => c.groupName === 'Design');
    this.marketingCards = courses.filter(c => c.groupName === 'Marketing');
  }}
