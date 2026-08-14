import { Component, signal, Input, ViewEncapsulation, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

@Component({
  selector: 'geekway-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ChatBubbleComponent implements OnInit, OnChanges {
  @Input() apiKey?: string;
  @Input() apiUrl?: string;
  @Input() apiBaseUrl?: string;
  @Input() agentId?: string;
  @Input() userId?: string;
  @Input() theme: 'purple' | 'blue' = 'purple';
  @Input() position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' = 'bottom-right';
  @Input() welcomeMessage: string = '¡Hola! Soy el asistente de GeekWay. ¿En qué puedo ayudarte?';

  isOpen = signal(false);
  inputMessage = signal('');
  messages = signal<Message[]>([]);
  private readonly sessionId = this.createSessionId();

  ngOnInit() {
    this.syncRuntimeConfig();
    this.initializeMessages();
    console.log('🎯 GeekWay Chat Widget initialized with config:', {
      apiKey: this.apiKey,
      apiBaseUrl: this.resolveApiBaseUrl(),
      agentId: this.agentId,
      userId: this.userId,
      theme: this.theme,
      position: this.position,
      welcomeMessage: this.welcomeMessage
    });
  }

  ngOnChanges() {
    this.syncRuntimeConfig();
    if (this.messages().length === 0) {
      this.initializeMessages();
    }
  }

  private syncRuntimeConfig(): void {
    if (!this.apiBaseUrl && this.apiUrl) {
      this.apiBaseUrl = this.apiUrl;
    }
    if (!this.apiUrl && this.apiBaseUrl) {
      this.apiUrl = this.apiBaseUrl;
    }
    if (!this.apiBaseUrl) {
      this.apiBaseUrl = 'https://gogeekwayapi-production.up.railway.app/api/v1';
    }
  }

  private resolveApiBaseUrl(): string {
    return (this.apiBaseUrl || this.apiUrl || 'https://gogeekwayapi-production.up.railway.app/api/v1').replace(/\/+$/, '');
  }

  private createSessionId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `gw-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  private initializeMessages() {
    this.messages.set([
      {
        id: 1,
        text: this.welcomeMessage || '¡Hola! Soy el asistente de GeekWay. ¿En qué puedo ayudarte?',
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }

  toggleChat(): void {
    this.isOpen.update(value => !value);
    if (this.isOpen()) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  async sendMessage(): Promise<void> {
    const messageText = this.inputMessage().trim();
    if (!messageText) return;

    const newMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    this.messages.update(messages => [...messages, newMessage]);
    this.inputMessage.set('');
    this.scrollToBottom();

    const endpoint = `${this.resolveApiBaseUrl()}/widget/chat`;
    const params = new URLSearchParams();
    if (this.agentId) params.set('agent_id', this.agentId);
    if (this.userId) params.set('user_id', this.userId);
    if (this.sessionId) params.set('session_id', this.sessionId);

    const body = JSON.stringify({
      session_id: this.sessionId,
      message: messageText
    });

    try {
      const response = await fetch(`${endpoint}?${params.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {})
        },
        body
      });

      const data = await response.json().catch(() => ({}));
      const reply = data?.response || data?.reply || data?.message || 'Gracias por tu mensaje. En breve te responderemos.';

      const botResponse: Message = {
        id: Date.now() + 1,
        text: reply,
        sender: 'bot',
        timestamp: new Date()
      };
      this.messages.update(messages => [...messages, botResponse]);
      this.scrollToBottom();
    } catch (error) {
      const fallbackResponse: Message = {
        id: Date.now() + 1,
        text: 'No pude completar la respuesta en este momento. Inténtalo nuevamente en unos segundos.',
        sender: 'bot',
        timestamp: new Date()
      };
      this.messages.update(messages => [...messages, fallbackResponse]);
      this.scrollToBottom();
      console.error('GeekWay widget request failed:', error);
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  }
}
