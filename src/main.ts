import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { createCustomElement } from '@angular/elements';
import { ChatBubbleComponent } from './app/chat-bubble.component';
import { createApplication } from '@angular/platform-browser';

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

  // Hacer disponible globalmente para uso directo
  (window as any).GeekWayChat = {
    init: (config: any = {}) => {
      const widget = document.createElement('geekway-chat-widget');

      // Configurar propiedades
      if (config.apiKey) widget.setAttribute('api-key', config.apiKey);
      if (config.theme) widget.setAttribute('theme', config.theme);
      if (config.position) widget.setAttribute('position', config.position);
      if (config.welcomeMessage) widget.setAttribute('welcome-message', config.welcomeMessage);

      // Agregar al DOM
      document.body.appendChild(widget);

      return widget;
    }
  };
});
