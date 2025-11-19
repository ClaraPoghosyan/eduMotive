import {Component, Input, input} from '@angular/core';
import {HeaderComponent} from '../shared/components/header/header.component';
import {NzLayoutComponent} from 'ng-zorro-antd/layout';
import {FooterComponent} from '../footer/footer.component';
import {AppFaqComponent} from '../app-faq/app-faq.component';

@Component({
  selector: 'app-faq-page',
  imports: [
    HeaderComponent,
    NzLayoutComponent,
    FooterComponent,
    AppFaqComponent
  ],
  templateUrl: './faq-page.component.html',
  styleUrl: './faq-page.component.scss'
})
export class FaqPageComponent {
}
