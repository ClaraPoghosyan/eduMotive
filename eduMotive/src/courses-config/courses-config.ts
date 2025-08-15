import {Component, Input} from '@angular/core';
import {CardConfig} from '../card-config/card-config';

@Component({
  selector: 'app-courses-config',
  imports: [
    CardConfig
  ],
  templateUrl: './courses-config.html',
  styleUrl: './courses-config.scss'
})
export class CoursesConfig {
  @Input() sectionTitle: string = '';
  @Input() sectionSubTitle: string = '';
  @Input() cards: any[] = [];


}
