import { Component, signal, Input, ViewEncapsulation, OnInit } from '@angular/core';
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
export class ChatBubbleComponent implements OnInit {
  @Input() apiKey?: string;
  @Input() theme?: 'purple' | 'blue' | 'green' = 'purple';
  @Input() position?: 'bottom-right' | 'bottom-left' = 'bottom-right';
  @Input() welcomeMessage?: string = '¡Hola! Soy el asistente de GeekWay. ¿En qué puedo ayudarte?';

  isOpen = signal(false);
  inputMessage = signal('');
  messages = signal<Message[]>([]);

  ngOnInit() {
    // Configurar mensaje inicial
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
      const botResponse: Message = {
        id: Date.now() + 1,
        text: 'Gracias por escribir. El equipo de GeekWay te responderá pronto.',
        sender: 'bot',
        timestamp: new Date()
      };
      this.messages.update(messages => [...messages, botResponse]);
      this.scrollToBottom();
    }, 1000);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
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
