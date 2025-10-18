// GeekWay Chat Widget - Versión Vanilla JavaScript
// Completamente independiente sin dependencias

class GeekWayChat {
  constructor() {
    this.widget = null;
    this.isOpen = false;
    this.messages = [];
  }

  static init(config) {
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

  createWidget(config) {
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
    this.widget.className = `geekway-chat-widget ${this.getPositionClass(position)}`;
    this.widget.innerHTML = `
      <button class="chat-button">
        <svg class="chat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <svg class="close-icon hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <div class="chat-window hidden">
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

    console.log('✅ GeekWay Chat Widget creado (Vanilla JS)', {position: position, class: this.getPositionClass(position)});
  }  getPositionClass(position) {
    switch (position) {
      case 'bottom-left': return 'position-bottom-left';
      case 'top-right': return 'position-top-right';
      case 'top-left': return 'position-top-left';
      default: return 'position-bottom-right';
    }
  }

  renderMessages() {
    return this.messages.map(msg => `
      <div class="message ${msg.sender}">
        <div class="message-content">
          <span class="message-text">${msg.text}</span>
        </div>
      </div>
    `).join('');
  }

  setupEvents() {
    if (!this.widget) return;

    const button = this.widget.querySelector('.chat-button');
    const chatWindow = this.widget.querySelector('.chat-window');
    const messageInput = this.widget.querySelector('#message-input');
    const sendButton = this.widget.querySelector('#send-button');
    const chatIcon = this.widget.querySelector('.chat-icon');
    const closeIcon = this.widget.querySelector('.close-icon');

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

  updateMessages() {
    const messagesContainer = this.widget?.querySelector('#chat-messages');
    if (messagesContainer) {
      messagesContainer.innerHTML = this.renderMessages();
    }
  }

  scrollToBottom() {
    const messagesContainer = this.widget?.querySelector('#chat-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  injectStyles() {
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
        animation: slideUp 0.3s ease-out;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .chat-window.hidden {
        display: none;
      }

      /* POSICIONAMIENTO BOTTOM-RIGHT (por defecto) */
      .geekway-chat-widget .position-bottom-right .chat-button,
      .geekway-chat-widget.position-bottom-right .chat-button {
        bottom: 24px;
        right: 24px;
      }

      .geekway-chat-widget .position-bottom-right .chat-window,
      .geekway-chat-widget.position-bottom-right .chat-window {
        bottom: 96px;
        right: 24px;
      }

      /* POSICIONAMIENTO BOTTOM-LEFT */
      .geekway-chat-widget .position-bottom-left .chat-button,
      .geekway-chat-widget.position-bottom-left .chat-button {
        bottom: 24px;
        left: 24px;
      }

      .geekway-chat-widget .position-bottom-left .chat-window,
      .geekway-chat-widget.position-bottom-left .chat-window {
        bottom: 96px;
        left: 24px;
      }

      /* POSICIONAMIENTO TOP-RIGHT */
      .geekway-chat-widget .position-top-right .chat-button,
      .geekway-chat-widget.position-top-right .chat-button {
        top: 24px;
        right: 24px;
      }

      .geekway-chat-widget .position-top-right .chat-window,
      .geekway-chat-widget.position-top-right .chat-window {
        top: 96px;
        right: 24px;
      }

      /* POSICIONAMIENTO TOP-LEFT */
      .geekway-chat-widget .position-top-left .chat-button,
      .geekway-chat-widget.position-top-left .chat-button {
        top: 24px;
        left: 24px;
      }

      .geekway-chat-widget .position-top-left .chat-window,
      .geekway-chat-widget.position-top-left .chat-window {
        top: 96px;
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
  }  destroy() {
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

// Instancia estática
GeekWayChat.instance = null;

// Exposición global INMEDIATA
window.GeekWayChat = GeekWayChat;

console.log('🌍 GeekWayChat (Vanilla JS) disponible globalmente');
console.log('✅ Sin dependencias - Compatibilidad universal');
