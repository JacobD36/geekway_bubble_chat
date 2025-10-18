import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { ChatBubbleComponent } from './app/chat-bubble.component';
import { appConfig } from './app/app.config';

interface ChatConfig {
  apiKey: string;
  theme?: 'purple' | 'blue';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  welcomeMessage?: string;
}

class GeekWayChat {
  private static instance: GeekWayChat | null = null;
  public static isAngularReady = false;
  private widget: HTMLElement | null = null;

  static init(config: ChatConfig): GeekWayChat {
    console.log('🚀 Inicializando GeekWayChat...', config);
    
    if (GeekWayChat.instance) {
      GeekWayChat.instance.destroy();
    }

    GeekWayChat.instance = new GeekWayChat();
    
    if (GeekWayChat.isAngularReady) {
      GeekWayChat.instance.createWidget(config);
    } else {
      document.addEventListener('angular-ready', () => {
        if (GeekWayChat.instance) {
          GeekWayChat.instance.createWidget(config);
        }
      });
    }
    
    return GeekWayChat.instance;
  }

  private createWidget(config: ChatConfig): void {
    this.destroy();

    if (customElements.get('geekway-chat-widget')) {
      this.doCreateWidget(config);
    } else {
      setTimeout(() => this.doCreateWidget(config), 100);
    }
  }

  private doCreateWidget(config: ChatConfig): void {
    this.widget = document.createElement('geekway-chat-widget');

    this.widget.setAttribute('api-key', config.apiKey);
    
    if (config.theme) {
      this.widget.setAttribute('theme', config.theme);
    }
    
    if (config.position) {
      this.widget.setAttribute('position', config.position);
    }
    
    if (config.welcomeMessage) {
      this.widget.setAttribute('welcome-message', config.welcomeMessage);
    }

    document.body.appendChild(this.widget);
    console.log('✅ GeekWay Chat Widget inicializado:', config);
  }

  destroy(): void {
    const existingWidgets = document.querySelectorAll('geekway-chat-widget');
    existingWidgets.forEach(widget => {
      if (widget.parentNode) {
        widget.parentNode.removeChild(widget);
      }
    });
    this.widget = null;
  }

  show(): void {
    if (this.widget) {
      this.widget.style.display = 'block';
    }
  }

  hide(): void {
    if (this.widget) {
      this.widget.style.display = 'none';
    }
  }
}

(window as any).GeekWayChat = GeekWayChat;
console.log('✅ GeekWayChat disponible globalmente');

createApplication(appConfig).then(appRef => {
  console.log('🔧 Angular inicializado, registrando custom element...');
  
  const chatElement = createCustomElement(ChatBubbleComponent, {
    injector: appRef.injector
  });

  if (!customElements.get('geekway-chat-widget')) {
    customElements.define('geekway-chat-widget', chatElement);
    console.log('✅ Custom element registrado');
  }

  GeekWayChat.isAngularReady = true;
  document.dispatchEvent(new CustomEvent('angular-ready'));
  console.log('🚀 GeekWay Chat Widget listo!');

}).catch(err => {
  console.error('❌ Error:', err);
});
