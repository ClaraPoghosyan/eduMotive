import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../shared/components/header/header.component';
import {NzLayoutComponent} from 'ng-zorro-antd/layout';
import {FooterComponent} from '../footer/footer.component';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';

@Component({
  selector: 'app-contact-us',
  imports: [
    HeaderComponent,
    NzLayoutComponent,
    FooterComponent,
    NzButtonComponent,
    FormsModule,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzInputDirective,
    ReactiveFormsModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit {

  private readonly fb: FormBuilder = inject(FormBuilder);

  form!: FormGroup;
  isForgotPass: boolean = false;

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  public onSubmit() {

    console.log('Login flow');

  }
}
