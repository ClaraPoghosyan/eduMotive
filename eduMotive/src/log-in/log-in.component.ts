import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, Router} from '@angular/router';
import {UserAuthService} from '../shared/services/user-auth.service';
import {AuthService} from '../shared/services/auth.service';

type AuthMode = 'login' | 'register' | 'reset';

@Component({
  selector: 'app-log-in',
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputDirective,
    NzCheckboxComponent,
    NzButtonComponent
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit {
  private readonly router      = inject(Router);
  private readonly fb          = inject(FormBuilder);
  private readonly route       = inject(ActivatedRoute);
  private readonly userAuth    = inject(UserAuthService);
  private readonly authService = inject(AuthService);

  public form!: FormGroup;
  public mode: AuthMode = 'login';
  public resetSent      = false;
  public loading        = false;
  public errorMsg       = '';

  ngOnInit() {
    this.form = this.fb.group({
      fullName: [''],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.route.queryParams.subscribe(params => {
      if (params['register'] === 'true') this.setMode('register');
    });
  }

  public setMode(mode: AuthMode): void {
    this.mode      = mode;
    this.resetSent = false;
    this.errorMsg  = '';
    this.form.reset();
  }

  public onSubmit(): void {
    this.errorMsg = '';
    const { email, password, fullName } = this.form.value;

    if (this.mode === 'reset') {
      this.loading = true;
      this.authService.forgotPassword(email).subscribe({
        next: () => { this.resetSent = true; this.loading = false; },
        error: () => { this.errorMsg = 'Սխալ է տեղի ունեցել։ Փորձիր կրկին։'; this.loading = false; }
      });
      return;
    }

    if (this.mode === 'register') {
      this.loading = true;
      this.authService.register(email, password, fullName ?? '').subscribe({
        next: res => {
          this.userAuth.login(res.token, res.email, res.fullName, res.role);
          this.router.navigate(['/user']);
        },
        error: err => {
          this.errorMsg = err.status === 400
            ? 'Այս էլ. հասցեն արդեն գրանցված է։'
            : 'Գրանցումը ձախողվեց։ Փորձիր կրկին։';
          this.loading = false;
        }
      });
      return;
    }

    this.loading = true;
    this.authService.login(email, password).subscribe({
      next: res => {
        this.userAuth.login(res.token, res.email, res.fullName, res.role);
        this.router.navigate(res.role === 'ADMIN' ? ['/admin/dashboard'] : ['/user']);
      },
      error: () => {
        this.errorMsg = 'Սխալ էլ. հասցե կամ գաղտնաբառ։';
        this.loading  = false;
      }
    });
  }

  public goToHome(): void {
    this.router.navigate(['/home']);
  }

  get isFormValid(): boolean {
    if (this.mode === 'reset') return !!this.form.get('email')?.valid;
    return this.form.valid;
  }
}
