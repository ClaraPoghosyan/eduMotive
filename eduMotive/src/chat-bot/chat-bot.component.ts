import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgClass} from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss',
  imports: [
    ReactiveFormsModule,
    NgClass
  ]
})
export class ChatBotComponent  {
  private readonly http: HttpClient = inject(HttpClient);
  private sanitizer:DomSanitizer = inject(DomSanitizer);

  public isOpen: boolean = false;

  messages: { from: 'user' | 'ai', text: string | SafeHtml }[] = [];
  input = new FormControl('');
  loading = false;
  // private apiKey = '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';
private apiKey: string = 'df';
  public toggleChat() {
    this.isOpen = !this.isOpen;

  }

  sendMessage() {
    const message = this.input.value;
    if (!message) return;

    this.messages.push({ from: 'user', text: message });
    this.input.setValue('');
    this.loading = true;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`

    });

    this.http.post<any>('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }]
    }, { headers }).subscribe({
      next: (res:any) => {
        const aiResponse = res.choices[0].message.content;
        const formatted = this.formatMarkdown(aiResponse);
        const safeHtml = this.sanitizer.bypassSecurityTrustHtml(formatted);
        this.messages.push({ from: 'ai',text: safeHtml });
        this.loading = false;
      },
      error: (err: any) => {
        this.messages.push({from: 'user',text:  message},{ from: 'ai', text: 'Error: Unable to fetch response.' });
        this.loading = false;
      }
    });
  }

  private formatMarkdown(text: string): string {
    if (!text) return '';

    return text
      // Bold **text**
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic *text*
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Line breaks
      .replace(/\n/g, '<br>')
      // Bullet points
      .replace(/•\s*(.*?)($|<br>)/g, '<ul><li>$1</li></ul>')
      // Simple lists with *
      .replace(/(?:^|\n)\*\s*(.*?)(?=\n|$)/g, '<li>$1</li>')
      // Wrap consecutive <li> items in <ul>
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  }

}
