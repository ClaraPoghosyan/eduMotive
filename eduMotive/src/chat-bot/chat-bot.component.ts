import {Component, DestroyRef, ElementRef, inject, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgClass} from '@angular/common';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are an AI assistant for eduMotive, an Armenian online learning platform.

About eduMotive:
- An online education platform offering courses in programming, design, marketing, and more
- Courses are taught by expert instructors
- Accessible to learners worldwide, focused on Armenian-speaking users
- Features: course enrollment, blog articles, instructor profiles, contact and Q&A

Rules:
1. ALWAYS respond in Armenian (Հայերեն)
2. Be friendly, warm, and encouraging
3. Help users find courses, understand enrollment, and navigate the platform
4. If asked something unrelated to education, gently redirect to educational topics
5. Use clear, simple Armenian`;

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss',
  imports: [ReactiveFormsModule, NgClass]
})
export class ChatBotComponent {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  private readonly http: HttpClient = inject(HttpClient);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  private readonly apiKey = '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';

  public isOpen = false;
  public loading = false;
  public messages: { from: 'user' | 'ai'; text: string | SafeHtml }[] = [];
  public input = new FormControl('');

  private conversationHistory: ChatMessage[] = [];

  public toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.messages.push({
        from: 'ai',
        text: 'Բարև, ես քո օգնականն եմ EduMotive-ում',
      });
    }
  }

  public sendMessage(): void {
    const text = this.input.value?.trim();
    if (!text || this.loading) return;

    this.messages.push({ from: 'user', text });
    this.conversationHistory.push({ role: 'user', content: text });
    this.input.setValue('');
    this.loading = true;
    this.scrollToBottom();

    const headers = new HttpHeaders({
      'x-api-key': this.apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true'
    });

    this.http.post<any>('/anthropic/v1/messages', {
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: this.conversationHistory
    }, { headers }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        const aiText: string = res.content[0].text;
        const formatted = this.formatMarkdown(aiText);
        const safeHtml = this.sanitizer.bypassSecurityTrustHtml(formatted);
        this.messages.push({ from: 'ai', text: safeHtml });
        this.conversationHistory.push({ role: 'assistant', content: aiText });
        this.loading = false;
        this.scrollToBottom();
      },
      error: () => {
        this.messages.push({ from: 'ai', text: 'Կներեք,ինչ-որ բան այն չէ։Խնդրում եմ փորձեք կրկին։' });
        this.loading = false;
        this.scrollToBottom();
      }
    });
  }


  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 50);
  }

  private formatMarkdown(text: string): string {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/•\s*(.*?)($|<br>)/g, '<ul><li>$1</li></ul>')
      .replace(/(?:^|\n)\*\s*(.*?)(?=\n|$)/g, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  }
}
