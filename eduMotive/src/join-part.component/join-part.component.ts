import {Component, inject} from '@angular/core';
import {ScrollerFormComponent} from '../shared/components/scroller-form.component/scroller-form.component';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-join-part',
  templateUrl: './join-part.component.html',
  styleUrl: './join-part.component.scss',
  imports: [
    ScrollerFormComponent,
    NzButtonComponent
  ]
})
export class JoinPartComponent {
  private readonly router: Router = inject(Router);

  testimonials = [
    {
      // name: '@davemccall',
      // text: "Edumile’s courses provided practical skills and real-world experience, transforming my career growth.",
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      // name: '@mervincobb01',
      // text: "Edumile’s interactive content and sup made online learning enjoyable and rewarding.",
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      // name: '@asarco',
      // text: "The flexible schedule and support made learning accessible and effective for me.",
      img: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      // name: '@elwood60',
      // text: "I transitioned careers successfully thanks to the skills learned through Edumile’s programs.",
      img: 'https://randomuser.me/api/portraits/men/76.jpg',
    },
    {
      // name: '@julianmunoz63',
      // text: "Edumile combines engaging lessons, hands-on projects, and certifications that employers truly value.",
      img: 'https://randomuser.me/api/portraits/men/27.jpg',
    },
    {
      // name: '@robsanchez',
      // text: "Edumile’s interactive content and community kept me motivated during my learning journey.",
      img: 'https://randomuser.me/api/portraits/men/91.jpg',
    },
    {
      // name: '@chester3',
      // text: "The hands-on projects and mentorship helped me build a strong portfolio.",
      img: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
  ];

  public onGo(): void {
    this.router.navigate(['/courses']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
