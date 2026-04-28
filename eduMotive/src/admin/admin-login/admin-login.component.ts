import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../shared/services/auth.service';
import { UserAuthService } from '../../shared/services/user-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  private readonly fb          = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly userAuth    = inject(UserAuthService);
  private readonly router      = inject(Router);
  private readonly message     = inject(NzMessageService);

  public form: FormGroup = this.fb.group({
    email:    [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });

  public loading = false;

  public onSubmit(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(c => {
        c.markAsDirty();
        c.updateValueAndValidity();
      });
      return;
    }

    this.loading = true;
    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: res => {
        if (res.role !== 'ADMIN') {
          this.message.error('Մուտքը թույլատրված չէ։ Ադմինի իրավունք չունեք։');
          this.loading = false;
          return;
        }
        this.userAuth.login(res.token, res.email, res.fullName, res.role);
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => {
        this.message.error('Սխալ էլ. հասցե կամ գաղտնաբառ։');
        this.loading = false;
      }
    });
  }
}
