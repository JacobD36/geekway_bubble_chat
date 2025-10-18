import { bootstrapApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { ChatBubbleComponent } from './app/chat-bubble.component';
import { Injector } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';

// Bootstrap para Angular Elements
bootstrapApplication(ChatBubbleComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
})
.then(() => {
  console.log('GeekWay Chat Widget (Angular Elements) cargado correctamente');
})
.catch(err => console.error('Error al cargar GeekWay Chat Widget:', err));