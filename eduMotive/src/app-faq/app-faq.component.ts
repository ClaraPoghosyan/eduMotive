import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FoldableContainerComponent} from '../shared/components/foldable-container/foldable-container.component';

@Component({
  selector: 'app-app-faq',
  imports: [
    FoldableContainerComponent
  ],
  templateUrl: './app-faq.component.html',
  styleUrl: './app-faq.component.scss'
})
export class AppFaqComponent {
  @Input() showTitle: boolean = true;

  public faqs = [
    {
      question: 'Ի՞նչ տեսակի դասընթացներ եք առաջարկում։',
      answer: 'Մենք առաջարկում ենք լայն ընտրանի տարբեր ոլորտներում՝ ծրագրավորում, դիզայն, մարքեթինգ, տվյալների վերլուծություն և ավելին։',
      open: false
    },
    {
      question: 'Ձեր դասընթացները սկսնակների՞ համար են։',
      answer: 'Այո, մեր դասընթացները նախատեսված են բոլոր մակարդակների համար՝ սկսած լրիվ սկսնակներից մինչև առաջադեմ ուսանողներ։ Յուրաքանչյուր դասընթացի նկարագրության մեջ նշված է բարդության մակարդակը։',
      open: false
    },
    {
      question: 'Ինչպե՞ս կարող եմ մուտք գործել դասընթացները։',
      answer: 'Պարզապես գրանցվեք, ընտրեք դասընթաց և սկսեք սովորել։ Մուտք կարող եք ունենալ ցանկացած սարքից։',
      open: false
    },
    {
      question: 'Ի՞նչ վճարման մեթոդներ եք ընդունում։',
      answer: 'Մենք ընդունում ենք բանկային քարտեր, օնլայն վճարային համակարգեր և տեղային տարբերակներ՝ կախված տարածաշրջանից։',
      open: false
    }
  ];

}
