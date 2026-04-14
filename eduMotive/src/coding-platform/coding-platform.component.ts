import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageService } from 'ng-zorro-antd/message';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import { HeaderComponent } from '../shared/components/header/header.component';
import {
  CodeRunnerService,
  ExecuteResponse,
  Language,
  LANGUAGES,
  PistonRuntime,
} from '../shared/services/code-runner.service';

@Component({
  selector: 'app-coding-platform',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzSpinModule,
    NzTagModule,
    HeaderComponent,
    NzTooltipDirective,
  ],
  templateUrl: './coding-platform.component.html',
  styleUrl: './coding-platform.component.scss',
})
export class CodingPlatformComponent implements OnInit {
  @ViewChild('editorTextarea') editorTextarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('lineNumbersEl') lineNumbersRef!: ElementRef<HTMLElement>;

  private readonly codeRunner = inject(CodeRunnerService);
  private readonly message = inject(NzMessageService);
  private readonly destroyRef = inject(DestroyRef);

  /** Working copy — versions replaced by live runtimes data */
  public languages: Language[] = LANGUAGES.map(l => ({ ...l }));
  public selectedLanguage: Language = this.languages[0];
  public code: string = this.languages[0].template;

  public runtimesLoading = true;
  public running = false;
  public output: ExecuteResponse['run'] | null = null;
  public hasRun = false;

  public ngOnInit(): void {
    this.fetchRuntimes();
  }

  // ── Runtimes ────────────────────────────────────────────

  private fetchRuntimes(): void {
    this.codeRunner
      .getRuntimes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (runtimes: PistonRuntime[]) => {
          this.resolveVersions(runtimes);
          this.runtimesLoading = false;
        },
        error: () => {
          // Fall through with hardcoded versions — still usable
          this.runtimesLoading = false;
        },
      });
  }

  private resolveVersions(runtimes: PistonRuntime[]): void {
    this.languages = this.languages.map(lang => {
      const match = runtimes.find(
        r => r.language === lang.value || (r.aliases ?? []).includes(lang.value)
      );
      return match ? { ...lang, version: match.version } : lang;
    });
    // Re-point selectedLanguage to the updated object
    const idx = this.languages.findIndex(l => l.value === this.selectedLanguage.value);
    if (idx !== -1) this.selectedLanguage = this.languages[idx];
  }

  // ── Editor helpers ──────────────────────────────────────

  public get lineNumbers(): number[] {
    const count = (this.code.match(/\n/g) ?? []).length + 1;
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  public onLanguageChange(): void {
    this.code = this.selectedLanguage.template;
    this.output = null;
    this.hasRun = false;
  }

  public onScroll(): void {
    if (this.lineNumbersRef && this.editorTextarea) {
      this.lineNumbersRef.nativeElement.scrollTop =
        this.editorTextarea.nativeElement.scrollTop;
    }
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      event.preventDefault();
      const el = event.target as HTMLTextAreaElement;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      this.code =
        this.code.substring(0, start) + '  ' + this.code.substring(end);
      setTimeout(() => {
        el.selectionStart = el.selectionEnd = start + 2;
      }, 0);
    }

    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      this.runCode();
    }
  }

  // ── Actions ─────────────────────────────────────────────

  public runCode(): void {
    if (!this.code.trim()) {
      this.message.warning('Write some code first.');
      return;
    }
    this.running = true;
    this.hasRun = false;
    this.output = null;

    this.codeRunner
      .execute(this.selectedLanguage, this.code)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: ExecuteResponse) => {
          this.output = res.run;
          this.hasRun = true;
          this.running = false;
        },
        error: (err) => {
          const detail = err?.message ?? 'Network error';
          this.message.error(`Code runner error: ${detail}`);
          this.running = false;
        },
      });
  }

  public copyCode(): void {
    navigator.clipboard.writeText(this.code).then(() => {
      this.message.success('Code copied to clipboard.');
    });
  }

  public downloadCode(): void {
    const blob = new Blob([this.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.selectedLanguage.filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  public clearOutput(): void {
    this.output = null;
    this.hasRun = false;
  }

  public get exitSuccess(): boolean {
    return this.output?.code === 0;
  }
}
