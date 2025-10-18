// GeekWay Chat Widget - Versión Vanilla JavaScript
// Completamente independiente sin dependencias de Angular

class GeekWayChat {
  private static instance: GeekWayChat | null = null;
  private widget: HTMLElement | null = null;
  private isOpen = false;
  private messages: Array<{id: number, text: string, sender: 'bot' | 'user', timestamp: Date}> = [];

  static init(config: {
    apiKey: string;
    theme?: 'purple' | 'blue';
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    welcomeMessage?: string;
  }) {
    console.log('🚀 GeekWayChat.init() - Vanilla JS version', config);

    // Destruir instancia anterior
    if (GeekWayChat.instance) {
      GeekWayChat.instance.destroy();
    }

    // Crear nueva instancia
    GeekWayChat.instance = new GeekWayChat();
    GeekWayChat.instance.createWidget(config);

    return GeekWayChat.instance;
  }

  private createWidget(config: any) {
    const theme = config.theme || 'purple';
    const position = config.position || 'bottom-right';
    const welcomeMessage = config.welcomeMessage || '¡Hola! Soy el asistente de GeekWay. ¿En qué puedo ayudarte?';

    // Inicializar mensajes
    this.messages = [{
      id: 1,
      text: welcomeMessage,
      sender: 'bot',
      timestamp: new Date()
    }];

    // Crear estilos CSS
    this.injectStyles();

    // Crear el widget HTML
    this.widget = document.createElement('div');
    this.widget.className = 'geekway-chat-widget';
    this.widget.innerHTML = `
      <button class="chat-button ${this.getPositionClass(position)}">
        <svg class="chat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <svg class="close-icon hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <div class="chat-window hidden ${this.getPositionClass(position)}">
        <div class="chat-header">
          <h3>GeekWay Chat</h3>
        </div>
        <div class="chat-messages" id="chat-messages">
          ${this.renderMessages()}
        </div>
        <div class="chat-input">
          <input type="text" id="message-input" placeholder="Escribe aquí tu mensaje..." />
          <button id="send-button">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    // Agregar al DOM
    document.body.appendChild(this.widget);

    // Configurar eventos
    this.setupEvents();

    console.log('✅ GeekWay Chat Widget creado (Vanilla JS)');
  }

  private getPositionClass(position: string): string {
    switch (position) {
      case 'bottom-left': return 'position-bottom-left';
      case 'top-right': return 'position-top-right';
      case 'top-left': return 'position-top-left';
      default: return 'position-bottom-right';
    }
  }

  private renderMessages(): string {
    return this.messages.map(msg => `
      <div class="message ${msg.sender}">
        <div class="message-content">
          <span class="message-text">${msg.text}</span>
        </div>
      </div>
    `).join('');
  }

  private setupEvents() {
    if (!this.widget) return;

    const button = this.widget.querySelector('.chat-button') as HTMLElement;
    const chatWindow = this.widget.querySelector('.chat-window') as HTMLElement;
    const messageInput = this.widget.querySelector('#message-input') as HTMLInputElement;
    const sendButton = this.widget.querySelector('#send-button') as HTMLElement;
    const chatIcon = this.widget.querySelector('.chat-icon') as HTMLElement;
    const closeIcon = this.widget.querySelector('.close-icon') as HTMLElement;

    // Toggle chat
    button.addEventListener('click', () => {
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        chatWindow.classList.remove('hidden');
        chatIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        setTimeout(() => this.scrollToBottom(), 100);
      } else {
        chatWindow.classList.add('hidden');
        chatIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });

    // Send message
    const sendMessage = () => {
      const text = messageInput.value.trim();
      if (!text) return;

      // Agregar mensaje del usuario
      this.messages.push({
        id: Date.now(),
        text: text,
        sender: 'user',
        timestamp: new Date()
      });

      messageInput.value = '';
      this.updateMessages();
      this.scrollToBottom();

      // Respuesta automática del bot
      setTimeout(() => {
        const responses = [
          'Gracias por escribir. El equipo de GeekWay te responderá pronto.',
          '¡Perfecto! Hemos recibido tu mensaje. Te contactaremos en breve.',
          'Mensaje recibido. Un especialista de GeekWay se comunicará contigo.',
          'Tu consulta es importante para nosotros. Te responderemos a la brevedad.'
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        this.messages.push({
          id: Date.now(),
          text: randomResponse,
          sender: 'bot',
          timestamp: new Date()
        });

        this.updateMessages();
        this.scrollToBottom();
      }, 1000);
    };

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }

  private updateMessages() {
    const messagesContainer = this.widget?.querySelector('#chat-messages');
    if (messagesContainer) {
      messagesContainer.innerHTML = this.renderMessages();
    }
  }

  private scrollToBottom() {
    const messagesContainer = this.widget?.querySelector('#chat-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  private injectStyles() {
    if (document.getElementById('geekway-chat-styles')) return;

    const style = document.createElement('style');
    style.id = 'geekway-chat-styles';
    style.textContent = `
      .geekway-chat-widget * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .chat-button {
        position: fixed;
        width: 56px;
        height: 56px;
        background: #8b5cf6;
        border: none;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: all 0.3s ease;
      }

      .chat-button:hover {
        background: #7c3aed;
        transform: scale(1.1);
      }

      .chat-button svg {
        width: 24px;
        height: 24px;
        color: white;
      }

      .chat-window {
        position: fixed;
        width: 384px;
        height: 650px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 9998;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .chat-window.hidden {
        display: none;
      }

      .position-bottom-right .chat-button {
        bottom: 24px;
        right: 24px;
      }

      .position-bottom-right .chat-window {
        bottom: 96px;
        right: 24px;
      }

      .position-bottom-left .chat-button {
        bottom: 24px;
        left: 24px;
      }

      .position-bottom-left .chat-window {
        bottom: 96px;
        left: 24px;
      }

      .chat-header {
        background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        color: white;
        padding: 16px;
        text-align: center;
      }

      .chat-header h3 {
        font-size: 18px;
        font-weight: bold;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }

      .chat-messages {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        background: #f9fafb;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }

      .message {
        margin-bottom: 16px;
        display: flex;
      }

      .message.bot {
        justify-content: flex-start;
      }

      .message.user {
        justify-content: flex-end;
      }

      .message-content {
        max-width: 80%;
        padding: 12px 16px;
        border-radius: 18px;
        font-size: 14px;
        line-height: 1.4;
      }

      .message.bot .message-content {
        background: #8b5cf6;
        color: white;
        border-bottom-left-radius: 4px;
      }

      .message.user .message-content {
        background: #3b82f6;
        color: white;
        border-bottom-right-radius: 4px;
      }

      .chat-input {
        display: flex;
        padding: 16px;
        background: white;
        border-top: 1px solid #e5e7eb;
        gap: 8px;
      }

      #message-input {
        flex: 1;
        padding: 12px 16px;
        border: 1px solid #d1d5db;
        border-radius: 24px;
        outline: none;
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }

      #message-input:focus {
        border-color: #8b5cf6;
        box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
      }

      #send-button {
        width: 40px;
        height: 40px;
        background: #8b5cf6;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      #send-button:hover {
        background: #7c3aed;
      }

      #send-button svg {
        width: 20px;
        height: 20px;
        color: white;
      }

      .hidden {
        display: none !important;
      }

      @media (max-width: 640px) {
        .chat-window {
          width: calc(100vw - 32px);
          height: 80vh;
          right: 16px !important;
          left: 16px !important;
          bottom: 96px !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  destroy() {
    if (this.widget) {
      this.widget.remove();
      this.widget = null;
    }

    const styles = document.getElementById('geekway-chat-styles');
    if (styles) {
      styles.remove();
    }
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

// Exposición global INMEDIATA
(window as any).GeekWayChat = GeekWayChat;

console.log('🌍 GeekWayChat (Vanilla JS) disponible globalmente');
console.log('✅ Sin dependencias de Angular - Compatibilidad universal');
