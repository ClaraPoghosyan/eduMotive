import { Component } from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzColDirective} from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-steps-section',
  imports: [
    NzCardComponent
  ],
  templateUrl: './steps-section.component.html',
  styleUrl: './steps-section.component.scss'
})
export class StepsSectionComponent {

  public steps = [
    {
      id: '01',
      title: 'Գրանցվիր',
      content: 'Ստեղծիր անվճար հաշիվ ընդամենը մի քանի րոպեում և անմիջապես ստացիր հասանելիություն մեր դասընթացների գրադարանին։',
    },
    {
      id: '02',
      title: 'Ընտրիր դասընթացը',
      content: 'Ուսումնասիրիր լայն ընտրանի և գտիր այն դասընթացը, որը համապատասխանում է քո նպատակներին։',
    },
    {
      id: '03',
      title: 'Սկսիր սովորել',
      content: 'Վայելիր հետաքրքիր ու ինտերակտիվ դասերը, որոնք ուսուցումը դարձնում են հաճելի և արդյունավետ։',
    },
    {
      id: '04',
      title: 'Ստացիր վկայական',
      content: 'Ավարտիր դասընթացը և ստացիր պրոֆեսիոնալ վկայական՝ քո ձեռքբերումները ներկայացնելու համար։',
    }
  ]
}
