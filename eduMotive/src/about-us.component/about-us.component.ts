import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {WhyChooseComponent} from '../why-choose.component/why-choose.component';
import {AppFaqComponent} from '../app-faq/app-faq.component';
import {FooterComponent} from '../footer/footer.component';
import {JoinPartComponent} from '../join-part.component/join-part.component';
import {ReviewsComponent} from '../reviews.component/reviews.component';
import {StepsSectionComponent} from '../steps-section/steps-section.component';

@Component({
  selector: 'app-about-us.component',
  imports: [
    HeaderComponent,
    NzButtonComponent,
    NzDividerComponent,
    WhyChooseComponent,
    AppFaqComponent,
    FooterComponent,
    JoinPartComponent,
    ReviewsComponent,
    StepsSectionComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
