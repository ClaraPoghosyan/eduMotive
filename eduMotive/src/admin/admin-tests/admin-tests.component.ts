import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {TestService} from '../../shared/services/test.service';
import {TestDetail, TestQuestion, TestTopic} from '../../shared/interfaces/test.interface';

@Component({
  selector: 'app-admin-tests',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzInputNumberModule,
    NzPopconfirmModule,
    NzIconModule,
    NzTagModule,
    NzDividerModule,
    NzSpinModule,
  ],
  templateUrl: './admin-tests.component.html',
  styleUrl: './admin-tests.component.scss',
})
export class AdminTestsComponent implements OnInit {
  private readonly testService = inject(TestService);
  private readonly message = inject(NzMessageService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  public readonly difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  /* ── Tests table ── */
  public tests: TestTopic[] = [];
  public loading = false;

  /* ── Test modal ── */
  public testModalVisible = false;
  public testModalLoading = false;
  public editingTestId: number | null = null;
  public testForm: FormGroup = this.fb.group({
    title:       [null, [Validators.required]],
    topic:       [null, [Validators.required]],
    description: [null],
    difficulty:  [null, [Validators.required]],
  });

  /* ── Questions modal ── */
  public qModalVisible = false;
  public qLoading = false;
  public qModalLoading = false;
  public selectedTest: TestDetail | null = null;
  public editingQuestionId: number | null = null;
  public questionForm: FormGroup = this.fb.group({
    text:         [null, [Validators.required]],
    option0:      [null, [Validators.required]],
    option1:      [null, [Validators.required]],
    option2:      [null, [Validators.required]],
    option3:      [null, [Validators.required]],
    correctIndex: [null, [Validators.required]],
  });

  public ngOnInit(): void {
    this.loadTests();
  }

  /* ──────────── Tests CRUD ──────────── */

  public loadTests(): void {
    this.loading = true;
    this.testService.getTopics()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => { this.tests = data; this.loading = false; },
        error: () => { this.message.error('Failed to load tests.'); this.loading = false; },
      });
  }

  public openAddTestModal(): void {
    this.editingTestId = null;
    this.testForm.reset();
    this.testModalVisible = true;
  }

  public openEditTestModal(test: TestTopic): void {
    this.editingTestId = test.id;
    this.testForm.patchValue({
      title:       test.title,
      topic:       test.topic,
      description: test.description,
      difficulty:  test.difficulty,
    });
    this.testModalVisible = true;
  }

  public handleTestModalOk(): void {
    if (this.testForm.invalid) {
      Object.values(this.testForm.controls).forEach(c => { c.markAsDirty(); c.updateValueAndValidity(); });
      return;
    }
    this.testModalLoading = true;
    const isEditing = this.editingTestId !== null;
    const request$ = isEditing
      ? this.testService.updateTest(this.editingTestId!, this.testForm.value)
      : this.testService.createTest(this.testForm.value);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.message.success(isEditing ? 'Test updated.' : 'Test created.');
        this.testModalVisible = false;
        this.testModalLoading = false;
        this.editingTestId = null;
        this.loadTests();
      },
      error: () => { this.message.error('Operation failed.'); this.testModalLoading = false; },
    });
  }

  public handleTestModalCancel(): void {
    this.testModalVisible = false;
    this.editingTestId = null;
  }

  public deleteTest(id: number): void {
    this.testService.deleteTest(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => { this.message.success('Test deleted.'); this.tests = this.tests.filter(t => t.id !== id); },
      error: () => this.message.error('Failed to delete test.'),
    });
  }

  /* ──────────── Questions CRUD ──────────── */

  public openQuestionsModal(test: TestTopic): void {
    this.selectedTest = null;
    this.qModalVisible = true;
    this.qLoading = true;
    this.resetQuestionForm();

    this.testService.getTest(test.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (detail) => { this.selectedTest = detail; this.qLoading = false; },
      error: () => { this.message.error('Failed to load questions.'); this.qLoading = false; },
    });
  }

  public editQuestion(q: TestQuestion): void {
    this.editingQuestionId = q.id;
    this.questionForm.patchValue({
      text:         q.text,
      option0:      q.options[0],
      option1:      q.options[1],
      option2:      q.options[2],
      option3:      q.options[3],
      correctIndex: q.correctIndex,
    });
  }

  public saveQuestion(): void {
    if (this.questionForm.invalid) {
      Object.values(this.questionForm.controls).forEach(c => { c.markAsDirty(); c.updateValueAndValidity(); });
      return;
    }
    const v = this.questionForm.value;
    const payload = {
      text:         v.text,
      options:      [v.option0, v.option1, v.option2, v.option3],
      correctIndex: v.correctIndex,
    };
    this.qModalLoading = true;
    const isEditing = this.editingQuestionId !== null;
    const testId = this.selectedTest!.id;
    const request$ = isEditing
      ? this.testService.updateQuestion(testId, this.editingQuestionId!, payload)
      : this.testService.addQuestion(testId, payload);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.message.success(isEditing ? 'Question updated.' : 'Question added.');
        this.qModalLoading = false;
        this.resetQuestionForm();
        this.reloadQuestions(testId);
      },
      error: () => { this.message.error('Operation failed.'); this.qModalLoading = false; },
    });
  }

  public deleteQuestion(questionId: number): void {
    const testId = this.selectedTest!.id;
    this.testService.deleteQuestion(testId, questionId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.message.success('Question deleted.');
        this.selectedTest!.questions = this.selectedTest!.questions.filter(q => q.id !== questionId);
      },
      error: () => this.message.error('Failed to delete question.'),
    });
  }

  public cancelEditQuestion(): void {
    this.resetQuestionForm();
  }

  private reloadQuestions(testId: number): void {
    this.testService.getTest(testId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (detail) => { this.selectedTest = detail; },
    });
  }

  private resetQuestionForm(): void {
    this.editingQuestionId = null;
    this.questionForm.reset();
  }

  public difficultyColor(d: string): string {
    return d === 'Beginner' ? 'green' : d === 'Intermediate' ? 'blue' : 'red';
  }
}
