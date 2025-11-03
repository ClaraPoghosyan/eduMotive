import {Component, inject} from '@angular/core';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from 'ng-zorro-antd/menu';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzHeaderComponent} from 'ng-zorro-antd/layout';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-header',
  imports: [
    NzMenuDirective,
    NzMenuItemComponent,
    NzButtonComponent,
    NzHeaderComponent,
    RouterLink,
    RouterLinkActive,
    NzIconDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly router: Router = inject(Router);
  public isMenuOpen: boolean = false;

  public goToLogIn(isRegister: boolean): void {
    this.router.navigate(['/log-in'], { queryParams: { register: isRegister } });
  }
  public closeMenu() {
    this.isMenuOpen = false;
  }
}
