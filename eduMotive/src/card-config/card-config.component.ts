import {Component, inject, Input, OnInit} from '@angular/core';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-config',
  imports: [
    NzRowDirective,
    NzColDirective,
    NzCardComponent,
    NzButtonComponent
  ],
  templateUrl: './card-config.component.html',
  styleUrl: './card-config.component.scss'
})
export class CardConfigComponent implements OnInit {
  private readonly router: Router = inject(Router);

  @Input() cards: any[] = [];

  ngOnInit() {
    console.log(this.cards);
  }


  goToCourse(courseId: number): void {
    this.router.navigate(['/course', courseId]);
  }
}
