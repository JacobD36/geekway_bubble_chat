# 🔄 CHANGELOG v3.0.4 - Soporte para Productos API

## 📅 Fecha: 22 de Octubre 2025

## 🎯 Objetivo
Implementar soporte para el nuevo formato de respuesta de la API que incluye `data.message` y `data.products`, mostrando tanto el mensaje del asistente como una lista estética de productos con enlaces.

## ✅ Cambios Implementados

### 1. Nueva Estructura de Respuesta API
```javascript
// ANTES - Procesaba data.messages con estructura compleja:
if (response && response.data && response.data.messages) {
  const assistantMessages = response.data.messages.filter(msg => msg.role === 'assistant');
  // ... procesamiento complejo
}

// DESPUÉS - Usa data.message y data.products directamente:
if (response && response.data) {
  let botResponse = '';
  
  if (response.data.message) {
    botResponse = response.data.message;
    
    if (response.data.products && response.data.products.length > 0) {
      botResponse += this.formatProductsHTML(response.data.products);
    }
  }
}
```

### 2. Función de Formateo de Productos
```javascript
formatProductsHTML(products) {
  if (!products || products.length === 0) return '';
  
  let html = '<div class="products-container"><h4>🛍️ Productos encontrados:</h4><ul class="products-list">';
  
  products.forEach(product => {
    html += '<li class="product-item">';
    html += `<div class="product-header">`;
    html += `<strong class="product-name">${product.nombre_producto || 'Sin nombre'}</strong>`;
    html += `<span class="product-price">${product.precio || 'Precio no disponible'}</span>`;
    html += `</div>`;
    
    // Descripción, detalles y enlace
    if (product.descripcion) {
      html += `<p class="product-description">${product.descripcion}</p>`;
    }
    
    // Tags de información
    html += `<div class="product-details">`;
    if (product.categoria) html += `<span class="product-tag">📂 ${product.categoria}</span>`;
    if (product.color) html += `<span class="product-tag">🎨 ${product.color}</span>`;
    if (product.proveedor) html += `<span class="product-tag">🏭 ${product.proveedor}</span>`;
    html += `</div>`;
    
    // Enlace del producto
    if (product.url_articulo) {
      html += `<a href="${product.url_articulo}" target="_blank" class="product-link">🔗 Ver producto</a>`;
    }
  });
  
  return html;
}
```

### 3. Soporte para HTML en Mensajes
```javascript
// renderMessages actualizado para soportar HTML:
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

// Nueva función para escapar HTML seguro:
escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

### 4. Estilos CSS para Productos
```css
/* Container principal de productos */
.products-container {
  margin-top: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

/* Cada producto individual */
.product-item {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
}

.product-item:hover {
  border-color: #8b5cf6;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.1);
}

/* Header con nombre y precio */
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
}

.product-price {
  color: #059669;
  font-weight: 600;
  font-size: 14px;
}

/* Tags de información */
.product-tag {
  background: #f1f5f9;
  color: #475569;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  border: 1px solid #e2e8f0;
}

/* Enlace del producto */
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
```

## 📊 Estructura de Respuesta API Soportada

```json
{
  "code": 200,
  "message": "Chat procesado exitosamente",
  "status": "OK",
  "data": {
    "session_id": "faa8fdc0-d458-492e-a554-36e798054c74",
    "message": "Aquí tienes la información del monitor Samsung más barato: Samsung Monitor 8",
    "products": [
      {
        "codigo_producto": "P108",
        "nombre_producto": "Samsung Monitor 8",
        "descripcion": "Dispositivo de última generación con tecnología avanzada.",
        "categoria": "Monitor",
        "precio": "2139 PEN",
        "color": "Verde",
        "proveedor": "Samsung",
        "estado_producto": "Nuevo",
        "url_articulo": "https://example.com/SamsungMonitor8"
      }
    ]
  }
}
```

## 🎨 Resultado Visual

### Mensaje del Asistente
El widget ahora muestra primero el mensaje del asistente (`data.message`) y después una lista estéticamente formateada de productos con:

- ✅ **Header con nombre y precio** destacados
- ✅ **Descripción del producto** en texto secundario
- ✅ **Tags informativos** con iconos (categoría, color, proveedor, estado)
- ✅ **Enlace del producto** como botón interactivo
- ✅ **Efectos hover** para mejor interacción
- ✅ **Diseño responsivo** para móviles

### Enlaces de Productos
Los campos `url_articulo` se convierten automáticamente en enlaces con:
- `target="_blank"` para abrir en nueva pestaña
- Estilo de botón con hover effects
- Icono 🔗 para identificación visual

## 🧪 Testing

### Archivo de Prueba
- **Creado**: `test-api-products.html`
- **Funciones**: Simulación completa de respuestas API
- **Casos de prueba**: Productos múltiples, solo mensaje, respuestas vacías

### Casos Soportados
1. ✅ Solo mensaje (sin productos)
2. ✅ Mensaje + productos (lista completa)
3. ✅ Productos sin algunos campos opcionales
4. ✅ Enlaces de productos funcionales

## 📦 Archivos Modificados
- `src/widget-vanilla.js`: Lógica principal actualizada
- `dist/widget/geekway-chat-widget.js`: Versión construida
- `dist/widget/geekway-chat-widget.min.js`: Versión minificada (18.4KB)
- `test-api-products.html`: Test específico para productos

## 🔄 Compatibilidad
- ✅ **Retrocompatible**: Funciona con respuestas que solo tengan `data.message`
- ✅ **Gestión de sesión**: Mantiene `this.sessionId` en memoria
- ✅ **Escape HTML**: Seguro contra XSS en contenido no-HTML
- ✅ **Responsive**: Estilos adaptados para móviles

---

**Resultado**: Widget con soporte completo para mostrar productos de forma estética junto con mensajes del asistente, manteniendo todos los beneficios de gestión de sesión en memoria.
