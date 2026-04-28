import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {AuthService} from '../shared/services/auth.service';

function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirm  = control.get('confirm')?.value;
  return password && confirm && password !== confirm ? { mismatch: true } : null;
}

@Component({
  selector: 'app-reset-password',
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputDirective,
    NzButtonComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl:    './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  private readonly route       = inject(ActivatedRoute);
  private readonly router      = inject(Router);
  private readonly fb          = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  public form!: FormGroup;
  public token: string  = '';
  public loading        = false;
  public success        = false;
  public errorMsg       = '';
  public invalidToken   = false;

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    if (!this.token) this.invalidToken = true;

    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm:  ['', Validators.required],
    }, { validators: passwordsMatch });
  }

  public onSubmit(): void {
    this.errorMsg = '';
    this.loading  = true;
    const { password } = this.form.value;

    this.authService.resetPassword(this.token, password).subscribe({
      next: () => { this.success = true; this.loading = false; },
      error: err => {
        this.errorMsg = err.status === 400
          ? 'Հղումն անվավեր է կամ ժամկետն անցել է։'
          : 'Սխալ է տեղի ունեցել։ Փորձիր կրկին։';
        this.loading = false;
      }
    });
  }

  public goToLogin(): void {
    this.router.navigate(['/log-in']);
  }
}