import {Component, inject, Input} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Router} from '@angular/router';
import {FoldableContainerComponent} from '../foldable-container/foldable-container.component';
import {JoinPartComponent} from '../../../join-part.component/join-part.component';
import {FooterComponent} from '../../../footer/footer.component';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {SafeUrlPipe} from '../../pipes/safe-url-pipe';

@Component({
  selector: 'app-course-page',
  imports: [
    HeaderComponent,
    NzButtonComponent,
    FoldableContainerComponent,
    JoinPartComponent,
    FooterComponent,
    NzCardComponent,
    NzColDirective,
    NzRowDirective,
    SafeUrlPipe
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.scss'
})
export class CoursePageComponent {
  private readonly router: Router = inject(Router);
  @Input() faqs = [
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
  @Input() card: any = {
    lessons: 10,
    time: 8,
  };
  @Input() videos: any = [
    {
      title: 'SMM',
      url: this.toEmbedUrl('https://youtu.be/Qmd-AjiHwVY?si=Vaacepo9r1raXX-9')
    },
    {
      title: 'SMM',
      url: this.toEmbedUrl('https://youtu.be/Qmd-AjiHwVY?si=Vaacepo9r1raXX-9')
    },
    {
      title: 'SMM',
      url: this.toEmbedUrl('https://youtu.be/Qmd-AjiHwVY?si=Vaacepo9r1raXX-9')
    },
    {
      title: 'SMM',
      url: this.toEmbedUrl('https://youtu.be/Qmd-AjiHwVY?si=Vaacepo9r1raXX-9')
    },


  ]

  private toEmbedUrl(url: string): string {
    const videoIdMatch = url.match(/(?:youtu\.be\/|v=)([^?&]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  }

  public goOnAuthor(): void {
    this.router.navigate(['/author'])
  }
}
