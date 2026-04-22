import {Component, inject} from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {Router} from '@angular/router';
import {UserAuthService} from '../shared/services/user-auth.service';

@Component({
  selector: 'app-steps-section',
  imports: [
    NzCardComponent
  ],
  templateUrl: './steps-section.component.html',
  styleUrl: './steps-section.component.scss'
})
export class StepsSectionComponent {
  private readonly router: Router = inject(Router);
  private readonly userAuth: UserAuthService = inject(UserAuthService);

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
  ];

  public onStart(): void {
    this.router.navigate([this.userAuth.isLoggedIn() ? '/courses' : '/log-in']);
  }
}
