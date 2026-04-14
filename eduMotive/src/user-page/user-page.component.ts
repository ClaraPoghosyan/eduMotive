import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../shared/services/user-auth.service';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  private readonly userAuth = inject(UserAuthService);
  private readonly router = inject(Router);

  public email: string = this.userAuth.getUserEmail() ?? '';

  public get initials(): string {
    return this.email ? this.email[0].toUpperCase() : 'U';
  }

  public goToCourses(): void {
    this.router.navigate(['/courses']);
  }

  public logout(): void {
    this.userAuth.logout();
    this.router.navigate(['/home']);
  }
}
