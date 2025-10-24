import {Component, Input} from '@angular/core';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-card-config',
  imports: [
    NzRowDirective,
    NzColDirective,
    NzCardComponent,
    NzButtonComponent
  ],
  templateUrl: './card-config.component.html',
  styleUrl: './card-config.component.scss'
})
export class CardConfigComponent {
  @Input() cards: any[] = [];

}
