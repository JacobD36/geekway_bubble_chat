// GeekWay Chat Widget - Versión Vanilla JavaScript
// Completamente independiente sin dependencias

class GeekWayChat {
  constructor() {
    this.widget = null;
    this.isOpen = false;
    this.messages = [];
    this.apiKey = null;
    this.apiBaseUrl = 'https://gogeekwayapi-production.up.railway.app/api/v1';
    this.isLoading = false;
    this.sessionId = null; // Gestión de sesión en memoria
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

    // Configurar API
    this.apiKey = config.apiKey;
    this.apiBaseUrl = config.apiBaseUrl || 'https://gogeekwayapi-production.up.railway.app/api/v1';

    // Validar API Key
    if (!this.apiKey) {
      console.error('❌ GeekWay Chat: API Key es requerida');
      return;
    }

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
        <div class="message-avatar">
          ${msg.sender === 'bot' ? this.getBotIcon() : this.getUserIcon()}
        </div>
        <div class="message-content">
          <span class="message-text">${msg.isHTML ? msg.text : this.escapeHtml(msg.text)}</span>
        </div>
      </div>
    `).join('');
  }

  // Función para escapar HTML cuando no es contenido HTML intencional
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  getBotIcon() {
    return `
      <svg class="avatar-icon bot-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        <circle cx="9" cy="10" r="1.5"/>
        <circle cx="15" cy="10" r="1.5"/>
        <path d="M8 14c0 2.21 1.79 4 4 4s4-1.79 4-4H8z"/>
      </svg>
    `;
  }

  getUserIcon() {
    return `
      <svg class="avatar-icon user-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    `;
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
    const sendMessage = async () => {
      const text = messageInput.value.trim();
      if (!text || this.isLoading) return;

      // Deshabilitar input mientras se procesa
      this.isLoading = true;
      messageInput.disabled = true;
      sendButton.disabled = true;

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

      // Mostrar indicador de escritura
      this.showTypingIndicator();

      try {
        // Llamar a la API
        const response = await this.callChatAPI(text);

        // Remover indicador de escritura
        this.hideTypingIndicator();

        // Agregar respuesta del bot
        if (response && response.data) {
          let botResponse = '';

          // Usar data.message directamente si existe
          if (response.data.message) {
            botResponse = response.data.message;

            // Si hay productos, agregarlos al mensaje
            if (response.data.products && response.data.products.length > 0) {
              botResponse += this.formatProductsHTML(response.data.products);
            }

            this.messages.push({
              id: Date.now(),
              text: botResponse,
              sender: 'bot',
              timestamp: new Date(),
              isHTML: true // Marcar como HTML para renderizado
            });

            // Actualizar sessionId para próximas conversaciones
            if (response.data.session_id) {
              this.sessionId = response.data.session_id;
              console.log('💾 Session ID guardado en memoria:', this.sessionId);
            }
          } else {
            throw new Error('No se encontró mensaje en la respuesta');
          }
        } else {
          throw new Error('Respuesta inválida de la API');
        }

      } catch (error) {
        console.error('❌ Error al enviar mensaje:', error);

        // Remover indicador de escritura si está presente
        this.hideTypingIndicator();

        // Agregar mensaje de error
        this.messages.push({
          id: Date.now(),
          text: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.',
          sender: 'bot',
          timestamp: new Date(),
          isError: true
        });
      } finally {
        // Rehabilitar input
        this.isLoading = false;
        messageInput.disabled = false;
        sendButton.disabled = false;
        messageInput.focus();

        this.updateMessages();
        this.scrollToBottom();
      }
    };

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }

  // Función para formatear productos en HTML estético
  formatProductsHTML(products) {
    if (!products || products.length === 0) return '';

    let html = '<div class="products-container"><h4>🛍️ Productos encontrados:</h4><ul class="products-list">';

    products.forEach(product => {
      html += '<li class="product-item">';
      html += `<div class="product-header">`;
      html += `<strong class="product-name">${product.nombre_producto || 'Sin nombre'}</strong>`;
      html += `<span class="product-price">${product.precio || 'Precio no disponible'}</span>`;
      html += `</div>`;

      if (product.descripcion) {
        html += `<p class="product-description">${product.descripcion}</p>`;
      }

      html += `<div class="product-details">`;
      if (product.categoria) html += `<span class="product-tag">📂 ${product.categoria}</span>`;
      if (product.color) html += `<span class="product-tag">🎨 ${product.color}</span>`;
      if (product.proveedor) html += `<span class="product-tag">🏭 ${product.proveedor}</span>`;
      if (product.estado_producto) html += `<span class="product-tag">📦 ${product.estado_producto}</span>`;
      html += `</div>`;

      if (product.url_articulo) {
        html += `<div class="product-actions">`;
        html += `<a href="${product.url_articulo}" target="_blank" class="product-link">🔗 Ver producto</a>`;
        html += `</div>`;
      }

      html += '</li>';
    });

    html += '</ul></div>';
    return html;
  }

  // Función para llamar a la API de chat
  async callChatAPI(message) {
    const url = `${this.apiBaseUrl}/threads/chat`;

    // Preparar el body del request
    const requestBody = {
      message: message
    };

    // Si tenemos sessionId en memoria, incluirlo en el body
    if (this.sessionId) {
      requestBody.session_id = this.sessionId;
    }

    // Headers solo contienen x-key
    const headers = {
      'Content-Type': 'application/json',
      'x-key': this.apiKey
    };

    console.log('📡 Enviando mensaje a API:', {
      url,
      body: requestBody,
      headers: { ...headers, 'x-key': '[OCULTA]' }
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Respuesta de API recibida:', data);

    return data;
  }  // Mostrar indicador de escritura
  showTypingIndicator() {
    // Remover indicador existente si existe
    this.hideTypingIndicator();

    const typingMessage = {
      id: 'typing-indicator',
      text: '<div class="typing-indicator"><span></span><span></span><span></span></div>',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true,
      isHTML: true // Marcar como HTML para renderizado correcto
    };

    this.messages.push(typingMessage);
    this.updateMessages();
    this.scrollToBottom();
  }

  // Ocultar indicador de escritura
  hideTypingIndicator() {
    this.messages = this.messages.filter(msg => msg.id !== 'typing-indicator');
    this.updateMessages();
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
        box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3);
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
        box-shadow: 0 12px 32px rgba(139, 92, 246, 0.5), 0 6px 16px rgba(0, 0, 0, 0.4);
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
        display: flex;
        flex-direction: column;
      }

      .message {
        margin-bottom: 16px;
        display: flex;
        align-items: flex-end;
        gap: 8px;
        width: 100%;
      }

      .message.bot {
        justify-content: flex-start;
        flex-direction: row;
      }

      .message.user {
        justify-content: flex-end;
        flex-direction: row-reverse;
        margin-left: auto;
        text-align: right;
      }

      .message-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-bottom: 2px;
      }

      .message.bot .message-avatar {
        background: #8b5cf6;
        color: white;
        order: 1;
      }

      .message.user .message-avatar {
        background: #3b82f6;
        color: white;
        order: 1;
      }

      .avatar-icon {
        width: 18px;
        height: 18px;
      }

      .bot-icon {
        color: white;
      }

      .user-icon {
        color: white;
      }

      .message-content {
        max-width: calc(100% - 40px);
        padding: 12px 16px;
        border-radius: 18px;
        font-size: 14px;
        line-height: 1.4;
        order: 2;
      }

      .message.bot .message-content {
        background: #e5e7eb;
        color: #1f2937;
        border-bottom-left-radius: 4px;
        margin-left: 0;
        margin-right: auto;
        border: 1px solid #d1d5db;
      }

      .message.user .message-content {
        background: #3b82f6;
        color: white;
        border-bottom-right-radius: 4px;
        margin-right: 0;
        margin-left: auto;
        text-align: left;
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

      #send-button:disabled {
        background: #9ca3af;
        cursor: not-allowed;
      }

      #message-input:disabled {
        background: #f3f4f6;
        cursor: not-allowed;
      }

      /* Indicador de escritura */
      .typing-indicator {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 8px 0;
      }

      .typing-indicator span {
        width: 8px;
        height: 8px;
        background: #9ca3af;
        border-radius: 50%;
        animation: typing 1.5s infinite;
      }

      .typing-indicator span:nth-child(2) {
        animation-delay: 0.3s;
      }

      .typing-indicator span:nth-child(3) {
        animation-delay: 0.6s;
      }

      @keyframes typing {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.4;
        }
        30% {
          transform: translateY(-10px);
          opacity: 1;
        }
      }

      .hidden {
        display: none !important;
      }

      /* Estilos para productos */
      .products-container {
        margin-top: 12px;
        padding: 12px;
        background: #f8fafc;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
      }

      .products-container h4 {
        margin: 0 0 12px 0;
        color: #1e293b;
        font-size: 14px;
        font-weight: 600;
      }

      .products-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .product-item {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 8px;
        transition: all 0.2s ease;
      }

      .product-item:last-child {
        margin-bottom: 0;
      }

      .product-item:hover {
        border-color: #8b5cf6;
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.1);
      }

      .product-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
      }

      .product-name {
        color: #1e293b;
        font-size: 14px;
        font-weight: 600;
        flex: 1;
        margin-right: 8px;
      }

      .product-price {
        color: #059669;
        font-weight: 600;
        font-size: 14px;
        white-space: nowrap;
      }

      .product-description {
        color: #64748b;
        font-size: 12px;
        margin-bottom: 8px;
        line-height: 1.4;
      }

      .product-details {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-bottom: 8px;
      }

      .product-tag {
        background: #f1f5f9;
        color: #475569;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 11px;
        border: 1px solid #e2e8f0;
      }

      .product-actions {
        text-align: right;
      }

      .product-link {
        display: inline-flex;
        align-items: center;
        color: #8b5cf6;
        text-decoration: none;
        font-size: 12px;
        font-weight: 500;
        padding: 4px 8px;
        border: 1px solid #8b5cf6;
        border-radius: 4px;
        transition: all 0.2s ease;
      }

      .product-link:hover {
        background: #8b5cf6;
        color: white;
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
