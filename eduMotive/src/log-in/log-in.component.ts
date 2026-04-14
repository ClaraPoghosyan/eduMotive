import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminAuthService} from '../admin/admin-auth.service';
import {UserAuthService} from '../shared/services/user-auth.service';

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
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly adminAuth: AdminAuthService = inject(AdminAuthService);
  private readonly userAuth: UserAuthService = inject(UserAuthService);

  form!: FormGroup;
  isForgotPass: boolean = false;

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.route.queryParams.subscribe(params => {
      this.isForgotPass = params['register'] === 'true';
    });
  }

  public onSubmit() {
    const { email, password } = this.form.value;

    if (this.isForgotPass) {
      this.userAuth.login(email);
      this.router.navigate(['/user']);
    } else {
      if (this.adminAuth.login(email, password)) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.userAuth.login(email);
        this.router.navigate(['/user']);
      }
    }
  }

  public goToHome(): void {
    this.router.navigate(['/home'])
  }
}
