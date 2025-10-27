import {AfterViewChecked, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss',
  imports: [
    ReactiveFormsModule,
    HeaderComponent
  ]
})
export class ChatBotComponent implements  AfterViewChecked {
  private readonly http: HttpClient = inject(HttpClient);

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  messages: { user: string, ai?: string }[] = [];
  input = new FormControl('');
  loading = false;

  apiKey = '';
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }

  sendMessage() {
    const message = this.input.value;
    if (!message) return;

    this.messages.push({ user: message });
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
        this.messages.push({ user: message, ai: aiResponse });
        this.loading = false;
      },
      error: (err: any) => {
        this.messages.push({ user: message, ai: 'Error: Unable to fetch response.' });
        this.loading = false;
      }
    });
  }
}
