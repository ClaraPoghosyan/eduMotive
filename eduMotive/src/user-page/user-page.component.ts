import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../shared/services/user-auth.service';
import { AuthService, UserProfile } from '../shared/services/auth.service';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DatePipe } from '@angular/common';
import { ChatPopupComponent } from '../chat/chat-popup.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DatePipe, ChatPopupComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  private readonly userAuth    = inject(UserAuthService);
  private readonly authService = inject(AuthService);
  private readonly router      = inject(Router);

  public profile: UserProfile | null = null;
  public chatOpen = false;

  public get initials(): string {
    const name = this.profile?.fullName || this.userAuth.getUserEmail() || 'U';
    return name[0].toUpperCase();
  }

  public get roleLabel(): string {
    switch (this.profile?.role) {
      case 'ADMIN':       return 'Ադմին';
      case 'INSTRUCTOR':  return 'Ուսուցիչ';
      default:            return 'Ուսանող';
    }
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: profile => this.profile = profile,
      error: () => {
        this.userAuth.logout();
        this.router.navigate(['/log-in']);
      }
    });
  }

  public goToCourses(): void { this.router.navigate(['/courses']); }

  public logout(): void {
    this.userAuth.logout();
    this.router.navigate(['/home']);
  }
}