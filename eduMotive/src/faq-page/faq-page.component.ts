import {Component, DestroyRef, inject, Input, input, OnInit} from '@angular/core';
import {HeaderComponent} from '../shared/components/header/header.component';
import {NzLayoutComponent} from 'ng-zorro-antd/layout';
import {FooterComponent} from '../footer/footer.component';
import {AppFaqComponent} from '../app-faq/app-faq.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Course} from '../shared/interfaces/courses.interface';
import {CoursesService} from '../shared/services/courses.service';
import {FaqService} from '../shared/services/faq.service';
import {Faq} from '../shared/interfaces/faq.interface';

@Component({
  selector: 'app-faq-page',
  imports: [
    HeaderComponent,
    NzLayoutComponent,
    FooterComponent,
    AppFaqComponent
  ],
  templateUrl: './faq-page.component.html',
  styleUrl: './faq-page.component.scss'
})
export class FaqPageComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly faqService: FaqService = inject(FaqService);

  public faqs: Faq[] = [];

  ngOnInit() {
    this.getFAQ();
  }

  public getFAQ(): void {
    this.faqService.getFAQ()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: Faq[]) => {
          this.faqs = res;
        })
  }
}
