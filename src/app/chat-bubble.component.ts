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
  @Input() theme: 'purple' | 'blue' = 'purple';
  @Input() position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' = 'bottom-right';
  @Input() welcomeMessage: string = '¡Hola! Soy el asistente de GeekWay. ¿En qué puedo ayudarte?';

  isOpen = signal(false);
  inputMessage = signal('');
  messages = signal<Message[]>([]);

  ngOnInit() {
    this.initializeMessages();
    console.log('🎯 GeekWay Chat Widget initialized with config:', {
      apiKey: this.apiKey,
      theme: this.theme,
      position: this.position,
      welcomeMessage: this.welcomeMessage
    });
  }

  ngOnChanges() {
    // Re-inicializar mensajes si cambia el welcomeMessage
    if (this.messages().length === 0) {
      this.initializeMessages();
    }
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

  sendMessage(): void {
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

    // Simular respuesta del bot después de 1 segundo
    setTimeout(() => {
      const responses = [
        'Gracias por escribir. El equipo de GeekWay te responderá pronto.',
        '¡Perfecto! Hemos recibido tu mensaje. Te contactaremos en breve.',
        'Mensaje recibido. Un especialista de GeekWay se comunicará contigo.',
        'Tu consulta es importante para nosotros. Te responderemos a la brevedad.'
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const botResponse: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      this.messages.update(messages => [...messages, botResponse]);
      this.scrollToBottom();
    }, 1000);
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
