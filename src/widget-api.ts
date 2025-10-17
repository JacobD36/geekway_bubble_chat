// GeekWay Chat Widget API
// Este archivo proporciona una API JavaScript simple para inicializar el widget

export interface ChatConfig {
  apiKey: string;
  theme?: 'purple' | 'blue';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  welcomeMessage?: string;
}

export class GeekWayChat {
  private static instance: GeekWayChat | null = null;
  private widget: HTMLElement | null = null;

  static init(config: ChatConfig): GeekWayChat {
    if (GeekWayChat.instance) {
      GeekWayChat.instance.destroy();
    }

    GeekWayChat.instance = new GeekWayChat();
    GeekWayChat.instance.createWidget(config);
    return GeekWayChat.instance;
  }

  private createWidget(config: ChatConfig): void {
    // Remover widget existente
    this.destroy();

    // Crear el elemento
    this.widget = document.createElement('geekway-chat-widget');
    
    // Configurar atributos
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

    // Agregar al DOM
    document.body.appendChild(this.widget);
    
    console.log('✅ GeekWay Chat Widget inicializado:', config);
  }

  destroy(): void {
    if (this.widget && this.widget.parentNode) {
      this.widget.parentNode.removeChild(this.widget);
      this.widget = null;
    }
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

// Exponer globalmente
declare global {
  interface Window {
    GeekWayChat: typeof GeekWayChat;
  }
}

if (typeof window !== 'undefined') {
  window.GeekWayChat = GeekWayChat;
}