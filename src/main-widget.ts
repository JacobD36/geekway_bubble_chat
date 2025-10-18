import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { ChatBubbleComponent } from './app/chat-bubble.component';
import { provideZoneChangeDetection } from '@angular/core';

// Crear aplicación Angular para Elements
createApplication({
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
})
.then(appRef => {
  // Crear custom element
  const chatElement = createCustomElement(ChatBubbleComponent, {
    injector: appRef.injector
  });

  // Registrar el custom element
  if (!customElements.get('geekway-chat-bubble')) {
    customElements.define('geekway-chat-bubble', chatElement);
    console.log('✅ GeekWay Chat Widget (Angular Elements) registrado correctamente');
  }

  // API simple para compatibilidad
  (window as any).GeekWayChat = {
    init: function(config: any = {}) {
      const chatWidget = document.createElement('geekway-chat-bubble');
      if (config.position) chatWidget.setAttribute('position', config.position);
      if (config.theme) chatWidget.setAttribute('theme', config.theme);
      document.body.appendChild(chatWidget);
      console.log('GeekWay Chat inicializado con Angular Elements');
      return { widget: chatWidget };
    }
  };
})
.catch(err => console.error('❌ Error al cargar GeekWay Chat Widget:', err));
