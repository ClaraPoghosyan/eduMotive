import {
  Component, inject, OnInit, OnDestroy, OnChanges,
  ElementRef, ViewChild, AfterViewChecked, Input, Output, EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { ChatService, Conversation, Message, Instructor } from '../shared/services/chat.service';
import { UserAuthService } from '../shared/services/user-auth.service';
import { ChatStateService } from '../shared/services/chat-state.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-chat-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSpinModule],
  templateUrl: './chat-popup.component.html',
  styleUrl: './chat-popup.component.scss'
})
export class ChatPopupComponent implements OnInit, OnChanges, OnDestroy, AfterViewChecked {
  @ViewChild('messagesEnd') private messagesEnd!: ElementRef;
  @Input()  isOpen = false;
  @Output() closed = new EventEmitter<void>();

  private readonly chatService  = inject(ChatService);
  private readonly userAuth     = inject(UserAuthService);
  private readonly chatState    = inject(ChatStateService);

  public conversations: Conversation[]       = [];
  public messages: Message[]                 = [];
  public instructors: Instructor[]           = [];
  public activeConversation: Conversation | null = null;
  public newMessage    = '';
  public loading       = true;
  public sending       = false;
  public showNewChat   = false;
  public currentEmail  = this.userAuth.getUserEmail() ?? '';

  private pollSub?: Subscription;
  private shouldScroll = false;

  ngOnInit(): void {
    this.loadConversations();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) { this.scrollToBottom(); this.shouldScroll = false; }
  }

  ngOnDestroy(): void { this.pollSub?.unsubscribe(); }

  close(): void { this.chatState.close(); this.closed.emit(); }

  ngOnChanges(): void {
    if (this.isOpen) this.chatState.open();
    else             this.chatState.close();
  }

  loadConversations(): void {
    this.chatService.getConversations().subscribe({
      next: c => { this.conversations = c; this.loading = false; },
      error: ()  => { this.loading = false; }
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
      const changed = msgs.length !== this.messages.length;
      this.messages = msgs;
      if (changed) this.shouldScroll = true;
    });
    this.chatService.markAsRead(conv.id).subscribe();
  }

  backToList(): void {
    this.pollSub?.unsubscribe();
    this.activeConversation = null;
    this.messages = [];
    this.loadConversations();
  }

  openNewChat(): void {
    this.showNewChat = true;
    this.chatService.getInstructors().subscribe({ next: l => this.instructors = l });
  }

  startChat(inst: Instructor): void {
    this.showNewChat = false;
    this.chatService.startConversation(inst.email).subscribe({
      next: conv => { this.loadConversations(); this.selectConversation(conv); }
    });
  }

  sendMessage(): void {
    const content = this.newMessage.trim();
    if (!content || !this.activeConversation || this.sending) return;
    this.sending = true;
    this.chatService.sendMessage(this.activeConversation.id, content).subscribe({
      next: msg => {
        this.messages.push(msg);
        this.newMessage = '';
        this.sending = false;
        this.shouldScroll = true;
        this.loadConversations();
      },
      error: () => { this.sending = false; }
    });
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendMessage(); }
  }

  getInitial(name: string): string { return name ? name[0].toUpperCase() : '?'; }
  isMyMessage(msg: Message): boolean { return msg.senderEmail === this.currentEmail; }
  private scrollToBottom(): void { this.messagesEnd?.nativeElement.scrollIntoView({ behavior: 'smooth' }); }
}