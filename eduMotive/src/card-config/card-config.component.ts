import {Component, inject, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Router} from '@angular/router';
import {UserAuthService} from '../shared/services/user-auth.service';
import {AdminAuthService} from '../admin/admin-auth.service';

@Component({
  selector: 'app-card-config',
  imports: [
    DatePipe,
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
  private readonly userAuth: UserAuthService = inject(UserAuthService);
  private readonly adminAuth: AdminAuthService = inject(AdminAuthService);

  @Input() cards: any[] = [];

  ngOnInit() {
    console.log(this.cards);
  }

  private get isLoggedIn(): boolean {
    return this.userAuth.isLoggedIn() || this.adminAuth.isLoggedIn();
  }

  goToCourse(courseId: number): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/course', courseId]);
    } else {
      this.router.navigate(['/log-in']);
    }
  }

  goToBlog(blogId: number): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/blog', blogId]);
    } else {
      this.router.navigate(['/log-in']);
    }
  }
}
