import {Component, Input} from '@angular/core';
import {CardConfigComponent} from '../card-config/card-config.component';
import {Course} from '../shared/interfaces/courses.interface';
import {Blog} from '../shared/interfaces/blog.interface';

@Component({
  selector: 'app-courses-config',
  imports: [
    CardConfigComponent
  ],
  templateUrl: './courses-config.component.html',
  styleUrl: './courses-config.component.scss'
})
export class CoursesConfigComponent {
  @Input() sectionTitle: string = '';
  @Input() sectionSubTitle: string = '';
  @Input() cards: any[] = [];


}
