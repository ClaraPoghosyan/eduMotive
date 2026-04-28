import { Component, inject, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { ChatService, Conversation, Message, Instructor } from '../shared/services/chat.service';
import { UserAuthService } from '../shared/services/user-auth.service';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, NzSpinModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesEnd') private messagesEnd!: ElementRef;

  private readonly chatService = inject(ChatService);
  private readonly userAuth    = inject(UserAuthService);
  private readonly route       = inject(ActivatedRoute);

  public conversations: Conversation[]  = [];
  public messages: Message[]            = [];
  public instructors: Instructor[]      = [];
  public activeConversation: Conversation | null = null;
  public newMessage       = '';
  public loading          = true;
  public sending          = false;
  public showNewChat      = false;
  public currentEmail     = this.userAuth.getUserEmail() ?? '';

  private pollSub?: Subscription;
  private shouldScroll = false;

  ngOnInit(): void {
    this.loadConversations();

    const instructorEmail = this.route.snapshot.queryParamMap.get('instructor');
    if (instructorEmail) {
      this.chatService.startConversation(instructorEmail).subscribe({
        next: conv => {
          this.loadConversations();
          this.selectConversation(conv);
        }
      });
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
  }

  loadConversations(): void {
    this.chatService.getConversations().subscribe({
      next: convs => { this.conversations = convs; this.loading = false; },
      error: ()   => { this.loading = false; }
    });
  }

  openNewChat(): void {
    this.showNewChat = true;
    this.chatService.getInstructors().subscribe({
      next: list => this.instructors = list
    });
  }

  startChat(instructor: Instructor): void {
    this.showNewChat = false;
    this.chatService.startConversation(instructor.email).subscribe({
      next: conv => {
        this.loadConversations();
        this.selectConversation(conv);
      }
    });
  }

  selectConversation(conv: Conversation): void {
    this.activeConversation = conv;
    this.messages = [];
    this.pollSub?.unsubscribe();

    this.pollSub = interval(3000).pipe(
      startWith(0),
      switchMap(() => this.chatService.getMessages(conv.id))
    ).subscribe(msgs => {
      const wasAtBottom = this.messages.length !== msgs.length;
      this.messages = msgs;
      if (wasAtBottom) this.shouldScroll = true;
    });

    this.chatService.markAsRead(conv.id).subscribe();
  }

  sendMessage(): void {
    const content = this.newMessage.trim();
    if (!content || !this.activeConversation || this.sending) return;

    this.sending = true;
    this.chatService.sendMessage(this.activeConversation.id, content).subscribe({
      next: msg => {
        this.messages.push(msg);
        this.newMessage  = '';
        this.sending     = false;
        this.shouldScroll = true;
        this.loadConversations();
      },
      error: () => { this.sending = false; }
    });
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  getInitial(email: string): string {
    return email ? email[0].toUpperCase() : '?';
  }

  isMyMessage(msg: Message): boolean {
    return msg.senderEmail === this.currentEmail;
  }

  private scrollToBottom(): void {
    this.messagesEnd?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}