import {Component, inject} from '@angular/core';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzHeaderComponent} from 'ng-zorro-antd/layout';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {UserAuthService} from '../../services/user-auth.service';

@Component({
  selector: 'app-header',
  imports: [
    NzMenuDirective,
    NzMenuItemComponent,
    NzButtonComponent,
    NzHeaderComponent,
    RouterLink,
    RouterLinkActive,
    NzTooltipDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly router: Router = inject(Router);
  public readonly userAuth: UserAuthService = inject(UserAuthService);
  public isMenuOpen: boolean = false;

  public get userInitial(): string {
    const email = this.userAuth.getUserEmail();
    return email ? email[0].toUpperCase() : '';
  }

  public goToLogIn(isRegister: boolean): void {
    this.router.navigate(['/log-in'], { queryParams: { register: isRegister } });
  }

  public goToProfile(): void {
    this.router.navigate(['/user']);
  }

  public goToAdmin(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  public logout(): void {
    this.userAuth.logout();
    this.router.navigate(['/home']);
  }

  public closeMenu() {
    this.isMenuOpen = false;
  }
}
