import {Component, Input} from '@angular/core';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzCardComponent} from 'ng-zorro-antd/card';

@Component({
  selector: 'app-card-config',
  imports: [
    NzRowDirective,
    NzColDirective,
    NzCardComponent
  ],
  templateUrl: './card-config.html',
  styleUrl: './card-config.scss'
})
export class CardConfig {
  @Input() cards: any[] = [];
// public cards = [
//   { title: 'Card title 1', content: 'Card content 1' },
//   { title: 'Card title 2', content: 'Card content 2' },
//   { title: 'Card title 3', content: 'Card content 3' }
// ];
}
