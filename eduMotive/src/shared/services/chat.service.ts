import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

export interface Conversation {
  id: number;
  studentEmail: string;
  instructorEmail: string;
  instructorName: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface Instructor {
  email: string;
  fullName: string;
}

export interface Message {
  id: number;
  conversationId: number;
  senderEmail: string;
  senderName: string;
  content: string;
  sentAt: string;
  isRead: boolean;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/chat';

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${environment.apiUrl}${this.base}/conversations`);
  }

  startConversation(instructorEmail: string): Observable<Conversation> {
    return this.http.post<Conversation>(`${environment.apiUrl}${this.base}/conversations`, { instructorEmail });
  }

  getMessages(conversationId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiUrl}${this.base}/conversations/${conversationId}/messages`);
  }

  sendMessage(conversationId: number, content: string): Observable<Message> {
    return this.http.post<Message>(`${environment.apiUrl}${this.base}/conversations/${conversationId}/messages`, { content });
  }

  markAsRead(conversationId: number): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${this.base}/conversations/${conversationId}/read`, {});
  }

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(`${environment.apiUrl}${this.base}/instructors`);
  }
}
