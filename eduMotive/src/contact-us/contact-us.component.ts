import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../shared/components/header/header.component';
import {NzLayoutComponent} from 'ng-zorro-antd/layout';
import {FooterComponent} from '../footer/footer.component';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {QuestionService} from '../shared/services/question.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  private readonly message: NzMessageService = inject(NzMessageService);
  private readonly questionService: QuestionService = inject(QuestionService);

  form!: FormGroup;
  isSubmitting = false;

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  public onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    const { fullName, email, subject, message } = this.form.value;

    this.questionService.sendQuestion({ fullName, email, title: subject, message })
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((res)=>{
        if(res ==='Question submitted successfully'){
          this.message.success('Ձեր հաղորդագրությունը հաջողությամբ ուղարկվեց։');
          this.form.reset();
          this.isSubmitting = false;
          return
        }
        this.message.error('Սխալ տեղի ունեցավ։ Խնդրում ենք կրկին փորձել։');
        this.isSubmitting = false;
    });
  }
}
