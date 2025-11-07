import {Component, inject} from '@angular/core';
import {HeaderComponent} from '../shared/components/header/header.component';
import {NzLayoutComponent} from 'ng-zorro-antd/layout';
import {FooterComponent} from '../footer/footer.component';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [
    HeaderComponent,
    NzLayoutComponent,
    FooterComponent,
    NzButtonComponent
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  private readonly router: Router = inject(Router);


  public goToHome(): void {
    this.router.navigate(['/home'])
  }
}
