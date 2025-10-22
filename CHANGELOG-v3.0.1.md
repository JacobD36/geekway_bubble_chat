# 🔄 GeekWay Chat Widget v3.0.1 - Session ID Management
## Refactorización: localStorage + Headers

**Fecha:** 22 de Octubre 2025  
**Versión:** v3.0.1 (Session Management Refactoring)  
**Tipo:** Refactorización de comportamiento según especificaciones API  

---

## 🔧 Cambios Implementados en v3.0.1

### **⚠️ CAMBIO DE COMPORTAMIENTO:**
Se modificó completamente cómo se maneja el `session_id` para cumplir las especificaciones exactas de la API.

### **🔄 ANTES vs DESPUÉS:**

#### **❌ ANTES (v3.0.0):**
```javascript
// Session ID se guardaba en propiedad de clase
this.sessionId = response.data.session_id;

// Session ID se enviaba en el BODY
const requestBody = {
    message: "Hola",
    session_id: this.sessionId  // ❌ En body
};
```

#### **✅ DESPUÉS (v3.0.1):**
```javascript
// Session ID se guarda en localStorage
localStorage.setItem('session_id', response.data.session_id);

// Session ID se envía en HEADERS
const headers = {
    'x-key': this.apiKey,
    'session_id': localStorage.getItem('session_id')  // ✅ En header
};

const requestBody = {
    message: "Hola"  // ✅ Solo mensaje en body
};
```

---

## 📋 Comportamiento Detallado

### **1. Primera Conversación (Sin session_id):**
```javascript
// Request
POST /api/v1/threads/chat
Headers: {
    "Content-Type": "application/json",
    "x-key": "tu-api-key"
}
Body: {
    "message": "Hola, este es mi primer mensaje"
}

// Response
{
    "data": {
        "session_id": "uuid-generado-por-api",
        "messages": [...],
        // ... otros campos
    }
}
```

### **2. Guardar session_id en localStorage:**
```javascript
// Automáticamente después de la respuesta
localStorage.setItem('session_id', response.data.session_id);
console.log('💾 Session ID guardado en localStorage:', sessionId);
```

### **3. Conversaciones Posteriores (Con session_id):**
```javascript
// Request
POST /api/v1/threads/chat
Headers: {
    "Content-Type": "application/json",
    "x-key": "tu-api-key",
    "session_id": "uuid-desde-localStorage"  // ✅ En header
}
Body: {
    "message": "Mi segundo mensaje"
}
```

---

## 🛠️ Funciones Implementadas

### **getSessionId():**
```javascript
getSessionId() {
    return localStorage.getItem('session_id');
}
```

### **setSessionId(sessionId):**
```javascript
setSessionId(sessionId) {
    localStorage.setItem('session_id', sessionId);
    console.log('💾 Session ID guardado en localStorage:', sessionId);
}
```

### **callChatAPI() Refactorizada:**
```javascript
async callChatAPI(message) {
    const url = `${this.apiBaseUrl}/threads/chat`;
    
    // Body siempre contiene solo el mensaje
    const requestBody = {
        message: message
    };

    // Headers base
    const headers = {
        'Content-Type': 'application/json',
        'x-key': this.apiKey
    };

    // Si existe session_id en localStorage, agregarlo al header
    const sessionId = this.getSessionId();
    if (sessionId) {
        headers['session_id'] = sessionId;
    }

    // Realizar petición...
}
```

---

## 🔍 Testing y Debugging

### **Test Específico:**
`test-session-management.html` - Incluye:
- **Verificación de localStorage** en tiempo real
- **Simulación de requests** con/sin session_id
- **Botones de testing** para diferentes escenarios
- **Monitor automático** de cambios en localStorage

### **Debugging en Console:**
```javascript
// Logs automáticos del widget:
// 📡 Enviando mensaje a API: { url, body, headers }
// ✅ Respuesta de API recibida: { data }
// 💾 Session ID guardado en localStorage: uuid
```

### **Verificación Manual:**
```javascript
// En DevTools Console:
localStorage.getItem('session_id');  // Ver session_id actual
localStorage.removeItem('session_id');  // Limpiar para testing
```

---

## 🚀 URLs CDN v3.0.1

### **JavaScript (Minificado):**
```html
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v3.0.1/dist/widget/geekway-chat-widget.min.js"></script>
```

### **CSS (Opcional):**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v3.0.1/dist/widget/geekway-chat-widget.css">
```

---

## ⚡ Beneficios de v3.0.1

### **✅ Cumplimiento de Especificaciones:**
- **Exactamente** como especifica la documentación API
- Session ID en **headers** según requerimientos
- Body **limpio** con solo el mensaje

### **✅ Persistencia Mejorada:**
- **localStorage** sobrevive refresh/reload
- **Conversaciones continuas** entre sesiones del navegador
- **Manejo automático** sin intervención del desarrollador

### **✅ Debugging Mejorado:**
- **Logs específicos** para cada operación
- **Headers ofuscados** (API key no se muestra en logs)
- **Test dedicado** para validar comportamiento

### **✅ Compatibilidad Mantenida:**
- **API de inicialización** sin cambios
- **UX idéntica** para el usuario final
- **Funcionalidad completa** preservada

---

## 🔧 Migración desde v3.0.0

### **✅ NO requiere cambios de código:**
```javascript
// La configuración sigue siendo idéntica
GeekWayChat.init({
    apiKey: 'tu-api-key-aqui',
    apiBaseUrl: 'http://localhost:3000/api/v1',
    theme: 'purple',
    position: 'bottom-right',
    welcomeMessage: 'Mensaje personalizado'
});
```

### **✅ Cambios automáticos internos:**
- Session ID se guarda en localStorage automáticamente
- Headers se construyen dinámicamente
- Comportamiento transparente para el desarrollador

### **🔄 Actualización recomendada:**
```html
<!-- Cambiar de v3.0.0 a v3.0.1 -->
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v3.0.1/dist/widget/geekway-chat-widget.min.js"></script>
```

---

## 🧪 Casos de Uso de Testing

### **Escenario 1: Primera conversación**
1. Limpiar localStorage: `localStorage.removeItem('session_id')`
2. Enviar mensaje → Solo headers con `x-key`
3. Recibir respuesta → session_id se guarda automáticamente

### **Escenario 2: Conversación continua**
1. Verificar localStorage: `localStorage.getItem('session_id')`
2. Enviar mensaje → Headers incluyen `x-key` + `session_id`
3. Contexto mantenido por la API

### **Escenario 3: Persistencia entre reloads**
1. Conversar normalmente (session_id se guarda)
2. Hacer refresh de página
3. Enviar nuevo mensaje → session_id persiste desde localStorage

---

## 📊 Comparación Técnica

| Aspecto | v3.0.0 | **v3.0.1** |
|---------|--------|-------------|
| **Session ID Storage** | ❌ Propiedad clase | ✅ **localStorage** |
| **Session ID Location** | ❌ Body | ✅ **Headers** |
| **Persistencia Reload** | ❌ Se pierde | ✅ **Persiste** |
| **Cumple Specs API** | ❌ Parcial | ✅ **Completo** |
| **Body Request** | ❌ message + session_id | ✅ **Solo message** |
| **Headers Dinámicos** | ❌ Estáticos | ✅ **Dinámicos** |
| **Debugging** | ✅ Básico | ✅ **Mejorado** |
| **Testing Tools** | ❌ No específicos | ✅ **Dedicados** |

---

## 🎯 Próximos Pasos

### **Testing Completo:**
1. **Probar con backend real** funcionando
2. **Validar session management** end-to-end
3. **Verificar persistencia** en diferentes browsers

### **Documentación API:**
1. **Actualizar** documentación de integración
2. **Ejemplos actualizados** con headers correctos
3. **Guías de debugging** específicas

---

## 📞 Soporte

### **Testing Issues:**
- Usar `test-session-management.html` para debugging
- Verificar localStorage en DevTools
- Revisar Network tab para structure de requests

### **Implementación:**
- Session management es automático
- No requiere cambios en código existente
- Backward compatible con configuraciones anteriores

---

*Última actualización: 22 de Octubre 2025*  
*Versión del documento: v3.0.1-session-management*  
*Cambio principal: Session ID en localStorage + headers según especificaciones API*
