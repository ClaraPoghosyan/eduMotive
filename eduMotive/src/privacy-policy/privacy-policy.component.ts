import { Component } from '@angular/core';
import {HeaderComponent} from '../shared/components/header/header.component';
import {NzLayoutComponent} from 'ng-zorro-antd/layout';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-privacy-policy',
  imports: [
    HeaderComponent,
    NzLayoutComponent,
    FooterComponent
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

}
