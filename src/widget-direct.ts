import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { ChatBubbleComponent } from './app/chat-bubble.component';
import { appConfig } from './app/app.config';

// Clase GeekWayChat simplificada para exposición directa
class GeekWayChat {
  private static instance: GeekWayChat | null = null;
  private widget: HTMLElement | null = null;

  static init(config: any) {
    console.log('🚀 GeekWayChat.init() called with config:', config);

    // Destruir instancia anterior si existe
    if (GeekWayChat.instance) {
      GeekWayChat.instance.destroy();
    }

    // Crear nueva instancia
    GeekWayChat.instance = new GeekWayChat();
    GeekWayChat.instance.createWidget(config);

    return GeekWayChat.instance;
  }

  private createWidget(config: any) {
    console.log('📡 Creando widget con config:', config);

    // Verificar si el custom element ya está definido
    if (!customElements.get('geekway-chat-widget')) {
      console.error('❌ Custom element geekway-chat-widget no está definido');
      return;
    }

    // Crear el elemento del widget
    this.widget = document.createElement('geekway-chat-widget');

    // Establecer atributos
    if (config.apiKey) {
      this.widget.setAttribute('api-key', config.apiKey);
    }
    if (config.theme) {
      this.widget.setAttribute('theme', config.theme);
    }
    if (config.position) {
      this.widget.setAttribute('position', config.position);
    }
    if (config.welcomeMessage) {
      this.widget.setAttribute('welcome-message', config.welcomeMessage);
    }

    // Añadir al DOM
    document.body.appendChild(this.widget);
    console.log('✅ Widget añadido al DOM');
  }

  destroy() {
    // Limpiar widgets existentes
    document.querySelectorAll('geekway-chat-widget').forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    this.widget = null;
  }

  show() {
    if (this.widget) {
      this.widget.style.display = 'block';
    }
  }

  hide() {
    if (this.widget) {
      this.widget.style.display = 'none';
    }
  }
}

// Inicialización inmediata de Angular y registro del custom element
console.log('🔧 Iniciando Angular bootstrap...');

createApplication(appConfig).then(app => {
  console.log('✅ Angular app creada');

  // Crear custom element
  const chatElement = createCustomElement(ChatBubbleComponent, { injector: app.injector });

  // Registrar custom element si no está ya registrado
  if (!customElements.get('geekway-chat-widget')) {
    customElements.define('geekway-chat-widget', chatElement);
    console.log('✅ Custom element geekway-chat-widget registrado');
  }

  // Exponer GeekWayChat globalmente INMEDIATAMENTE
  (window as any).GeekWayChat = GeekWayChat;
  console.log('🌍 GeekWayChat expuesto globalmente');

}).catch(error => {
  console.error('❌ Error durante el bootstrap de Angular:', error);
});

// Verificación de exposición
console.log('🔍 Verificando exposición de GeekWayChat...');
console.log('GeekWayChat está definido:', typeof GeekWayChat !== 'undefined');

// EXPOSICIÓN INMEDIATA - LÍNEA CRÍTICA
(window as any).GeekWayChat = GeekWayChat;
console.log('⚡ GeekWayChat expuesto INMEDIATAMENTE en window');
