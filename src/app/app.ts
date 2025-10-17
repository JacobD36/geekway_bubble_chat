import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatBubbleComponent } from './chat-bubble.component';

@Component({
  selector: 'app-root',
  imports: [ChatBubbleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('GeekWay Chat Bubble');
}
