import { Component } from '@angular/core';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzFooterComponent} from 'ng-zorro-antd/layout';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-footer',
  imports: [
    NzInputDirective,
    NzButtonComponent,
    NzFooterComponent,
    NzIconDirective
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

}
