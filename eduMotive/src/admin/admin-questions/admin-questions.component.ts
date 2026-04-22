import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageService } from 'ng-zorro-antd/message';
import { QuestionService, Question } from '../../shared/services/question.service';

@Component({
  selector: 'app-admin-questions',
  standalone: true,
  imports: [DatePipe, NzTableModule, NzTagModule],
  templateUrl: './admin-questions.component.html',
  styleUrl: './admin-questions.component.scss',
})
export class AdminQuestionsComponent implements OnInit {
  private readonly questionService = inject(QuestionService);
  private readonly message = inject(NzMessageService);
  private readonly destroyRef = inject(DestroyRef);

  public questions: Question[] = [];
  public loading = false;

  public ngOnInit(): void {
    this.loading = true;
    this.questionService.getQuestions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => { this.questions = data; this.loading = false; },
        error: () => { this.message.error('Failed to load questions.'); this.loading = false; },
      });
  }
}
