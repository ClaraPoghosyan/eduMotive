import { Component } from '@angular/core';
import {FooterComponent} from '../../footer/footer.component';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {HomePageComponent} from '../../hom-page/home-page.component';
import {NzLayoutComponent} from 'ng-zorro-antd/layout';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main.component',
  imports: [
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    NzLayoutComponent,
    RouterOutlet
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
