import { Component } from '@angular/core';

@Component({
  selector: 'app-why-choose',
  imports: [],
  templateUrl: './why-choose.component.html',
  styleUrl: './why-choose.component.scss'
})
export class WhyChooseComponent {
  public cards = [
    {
      icon: 'assets/icons/puzzle.png',
      title: 'Ճկուն և պահանջով ուսուցում',
      text: 'Մուտք գործիր դասընթացներին ցանկացած ժամանակ, ցանկացած սարքից և սովորիր քեզ հարմար տեմպով։',
      img: 'assets/flexible-lessons.jpg'
    },
    {
      icon: 'assets/icons/user-trust.png',
      title: 'Փորձառու դասախոսներ',
      text: 'Սովորիր ոլորտի մասնագետներից, ովքեր տրամադրում են իրական գիտելիքներ քո հմտությունները զարգացնելու համար։',
      img: 'assets/teachers.jpg'
    },
    {
      icon: 'assets/icons/graduation-cap.png',
      title: 'Մատչելի և հասանելի կրթություն',
      text: 'Վայելիր մատչելի, բարձր որակի դասընթացներ առանց թաքնված վճարների և ստացիր վկայականներ՝ քո կարիերան առաջ տանելու համար։',
      img: 'assets/money.jpg'
    }
  ];
}
