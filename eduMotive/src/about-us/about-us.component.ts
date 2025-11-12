import { Component } from '@angular/core';
import {HeaderComponent} from '../shared/components/header/header.component';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {WhyChooseComponent} from '../why-choose.component/why-choose.component';
import {AppFaqComponent} from '../app-faq/app-faq.component';
import {FooterComponent} from '../footer/footer.component';
import {JoinPartComponent} from '../join-part.component/join-part.component';
import {ReviewsComponent} from '../reviews.component/reviews.component';

@Component({
  selector: 'app-about-us',
  imports: [
    HeaderComponent,
    NzButtonComponent,
    WhyChooseComponent,
    AppFaqComponent,
    FooterComponent,
    JoinPartComponent,
    ReviewsComponent,
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
