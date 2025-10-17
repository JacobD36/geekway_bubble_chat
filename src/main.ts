import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { createCustomElement } from '@angular/elements';
import { ChatBubbleComponent } from './app/chat-bubble.component';
import { createApplication } from '@angular/platform-browser';

// Importar la API del widget
import './widget-api';

// Para desarrollo local
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

// Para el widget embebible
createApplication(appConfig).then(appRef => {
  const chatElement = createCustomElement(ChatBubbleComponent, {
    injector: appRef.injector
  });

  // Registrar el custom element
  if (!customElements.get('geekway-chat-widget')) {
    customElements.define('geekway-chat-widget', chatElement);
  }

  console.log('🚀 GeekWay Chat Widget ready for CDN distribution!');
}).catch(err => console.error('Error initializing widget:', err));
