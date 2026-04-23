import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {HeaderComponent} from '../shared/components/header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {TestService} from '../shared/services/test.service';
import {TestDetail, TestQuestion, TestResult, TestTopic} from '../shared/interfaces/test.interface';

type Step = 'topics' | 'quiz' | 'results';

const TOPIC_ICONS: Record<string, string> = {
  JavaScript: '🟨', TypeScript: '🔷', Python: '🐍',
  Java: '☕', CSS: '🎨', HTML: '🌐', SQL: '🗄️',
  React: '⚛️', Angular: '🔴', default: '💻',
};

@Component({
  selector: 'app-test-page',
  imports: [
    HeaderComponent,
    FooterComponent,
    NzButtonModule,
    NzProgressModule,
    NzTagModule,
    NzSpinModule,
    NzIconModule,
  ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss',
})
export class TestPageComponent implements OnInit {
  private readonly testService = inject(TestService);
  private readonly destroyRef = inject(DestroyRef);

  public step: Step = 'topics';
  public topics: TestTopic[] = [];
  public currentTest: TestDetail | null = null;
  public result: TestResult | null = null;
  public currentIndex = 0;
  public selectedOption: number | null = null;
  public answers: number[] = [];
  public loading = false;
  public submitting = false;

  public get currentQuestion(): TestQuestion | null {
    return this.currentTest?.questions[this.currentIndex] ?? null;
  }

  public get progress(): number {
    if (!this.currentTest) return 0;
    return Math.round((this.currentIndex / this.currentTest.questions.length) * 100);
  }

  public get levelColor(): string {
    switch (this.result?.level) {
      case 'Expert':       return '#f5a623';
      case 'Advanced':     return '#52c41a';
      case 'Intermediate': return '#1890ff';
      default:             return '#aaa';
    }
  }

  public ngOnInit(): void {
    this.loadTopics();
  }

  public topicIcon(title: string): string {
    return TOPIC_ICONS[title] ?? TOPIC_ICONS['default'];
  }

  public difficultyColor(d: string): string {
    return d === 'Beginner' ? 'green' : d === 'Intermediate' ? 'blue' : 'red';
  }

  public loadTopics(): void {
    this.loading = true;
    this.testService.getTopics()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => { this.topics = data; this.loading = false; },
        error: ()     => { this.loading = false; },
      });
  }

  public startTest(topic: TestTopic): void {
    this.loading = true;
    this.testService.getTest(topic.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (test) => {
          this.currentTest = test;
          this.answers = new Array(test.questions.length).fill(-1);
          this.currentIndex = 0;
          this.selectedOption = null;
          this.step = 'quiz';
          this.loading = false;
        },
        error: () => { this.loading = false; },
      });
  }

  public selectOption(index: number): void {
    this.selectedOption = index;
  }

  public next(): void {
    if (this.selectedOption === null) return;
    this.answers[this.currentIndex] = this.selectedOption;

    if (this.currentIndex < this.currentTest!.questions.length - 1) {
      this.currentIndex++;
      this.selectedOption = null;
    } else {
      this.submit();
    }
  }

  private submit(): void {
    this.submitting = true;
    this.testService.submitTest(this.currentTest!.id, this.answers)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => { this.result = res; this.step = 'results'; this.submitting = false; },
        error: ()   => { this.submitting = false; },
      });
  }

  public retry(): void {
    if (!this.currentTest) return;
    this.answers = new Array(this.currentTest.questions.length).fill(-1);
    this.currentIndex = 0;
    this.selectedOption = null;
    this.result = null;
    this.step = 'quiz';
  }

  public restart(): void {
    this.step = 'topics';
    this.currentTest = null;
    this.result = null;
    this.answers = [];
    this.selectedOption = null;
    this.currentIndex = 0;
  }
}