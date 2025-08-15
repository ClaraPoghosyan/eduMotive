import { Component } from '@angular/core';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from 'ng-zorro-antd/menu';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzHeaderComponent} from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-header',
  imports: [
    NzMenuDirective,
    NzMenuItemComponent,
    NzSubMenuComponent,
    NzButtonComponent,
    NzHeaderComponent
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
