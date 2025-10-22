# 🔧 GeekWay Chat Widget v3.0.2 - Corrección Session ID
## Session ID en BODY según Documentación API

**Fecha:** 22 de Octubre 2025  
**Versión:** v3.0.2 (Session ID Correction)  
**Tipo:** Bug fix crítico - Cumplimiento de especificaciones API  

---

## 🎯 **Problema Corregido en v3.0.2**

### **❌ Error en v3.0.1:**
El `session_id` se enviaba incorrectamente en **headers** en lugar del **body** del request.

### **✅ Corrección en v3.0.2:**
El `session_id` ahora se envía correctamente en el **body** del request según la documentación API.

---

## 📋 **Comportamiento Correcto Implementado**

### **🔄 ANTES (v3.0.1 - Incorrecto):**
```javascript
// ❌ session_id en headers (INCORRECTO)
const headers = {
    'Content-Type': 'application/json',
    'x-key': this.apiKey,
    'session_id': sessionId  // ❌ En header
};

const requestBody = {
    message: message  // Solo mensaje
};
```

### **🔄 DESPUÉS (v3.0.2 - Correcto):**
```javascript
// ✅ session_id en body (CORRECTO según documentación)
const headers = {
    'Content-Type': 'application/json',
    'x-key': this.apiKey  // Solo x-key
};

const requestBody = {
    message: message,
    session_id: sessionId  // ✅ En body
};
```

---

## 📡 **Estructura de Requests Correcta**

### **Primera Conversación:**
```javascript
POST /api/v1/threads/chat
Headers: {
    "Content-Type": "application/json",
    "x-key": "tu-api-key"
}
Body: {
    "message": "Hola, este es mi primer mensaje"
}
```

### **Conversaciones Posteriores:**
```javascript
POST /api/v1/threads/chat
Headers: {
    "Content-Type": "application/json",
    "x-key": "tu-api-key"
}
Body: {
    "message": "Mi segundo mensaje",
    "session_id": "uuid-desde-localStorage"
}
```

---

## 🚀 **URLs CDN v3.0.2**

### **JavaScript (Minificado - Recomendado):**
```html
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v3.0.2/dist/widget/geekway-chat-widget.min.js"></script>
```

### **CSS (Opcional):**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v3.0.2/dist/widget/geekway-chat-widget.css">
```

---

## 🔧 **Configuración (Sin Cambios)**

La configuración del widget **NO ha cambiado**. La corrección es interna:

```javascript
GeekWayChat.init({
    apiKey: 'tu-api-key-aqui',  // ✅ OBLIGATORIO
    apiBaseUrl: 'http://localhost:3000/api/v1',  // Opcional
    theme: 'purple',
    position: 'bottom-right',
    welcomeMessage: 'Mensaje personalizado'
});
```

---

## 📊 **Comparación de Versiones**

| Aspecto | v3.0.1 | **v3.0.2** |
|---------|--------|-------------|
| **Session ID Location** | ❌ Headers | ✅ **Body** |
| **Headers Content** | ❌ x-key + session_id | ✅ **Solo x-key** |
| **Body Content** | ❌ Solo message | ✅ **message + session_id** |
| **Cumple Documentación** | ❌ No | ✅ **Sí** |
| **localStorage** | ✅ Funciona | ✅ **Funciona** |
| **Configuración** | ✅ Igual | ✅ **Igual** |
| **Compatibilidad** | ✅ Universal | ✅ **Universal** |

---

## ⚡ **Migración Automática**

### **✅ NO requiere cambios de código:**
Simplemente actualiza la URL del CDN:

```html
<!-- Cambiar de v3.0.1 a v3.0.2 -->
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v3.0.2/dist/widget/geekway-chat-widget.min.js"></script>
```

### **✅ Cambios automáticos internos:**
- Session ID se envía en body automáticamente
- Headers se limpian automáticamente
- localStorage sigue funcionando igual
- Configuración idéntica

---

## 🧪 **Testing Actualizado**

### **Test específico:** `test-session-management.html`

**Características actualizadas:**
- ✅ **Simulación correcta** de requests con session_id en body
- ✅ **Visualización clara** del antes/después corregido
- ✅ **Botones de testing** para validar comportamiento
- ✅ **Monitor automático** de localStorage

### **Verificación Manual:**
```javascript
// En DevTools Console después de enviar mensaje:
// Debería mostrar:
// 📡 Enviando mensaje a API: { 
//   body: { message: "texto", session_id: "uuid" },
//   headers: { "x-key": "[OCULTA]" }
// }
```

---

## 🔍 **Logs de Debugging Correctos**

### **Primer mensaje:**
```
📡 Enviando mensaje a API: {
  url: "http://localhost:3000/api/v1/threads/chat",
  body: { message: "Hola" },
  headers: { "x-key": "[OCULTA]" }
}
```

### **Mensajes posteriores:**
```
📡 Enviando mensaje a API: {
  url: "http://localhost:3000/api/v1/threads/chat", 
  body: { message: "Segundo mensaje", session_id: "uuid" },
  headers: { "x-key": "[OCULTA]" }
}
```

---

## ✅ **Beneficios de v3.0.2**

### **🎯 Cumplimiento Total:**
- **100% compatible** con documentación API
- **Estructura exacta** de requests esperada por backend
- **Headers limpios** solo con información necesaria

### **🔧 Funcionamiento Robusto:**
- **Session management** funciona perfectamente
- **localStorage** persiste entre reloads
- **Continuidad de conversación** mantenida

### **🚀 Estabilidad:**
- **Backward compatible** con configuraciones existentes
- **Sin breaking changes** en la API del widget
- **Actualización transparente** para desarrolladores

---

## 📞 **Soporte y Validación**

### **Verificar Corrección:**
1. **Abrir DevTools** → Network tab
2. **Enviar mensaje** en el widget
3. **Verificar request** a `/threads/chat`
4. **Confirmar** que session_id está en **body**, no en headers

### **Testing Recomendado:**
- Usar `test-session-management.html` para validación
- Verificar localStorage con botones de testing
- Simular diferentes escenarios de conversación
- Confirmar persistencia entre reloads

---

## 🎉 **¡Actualización Recomendada!**

**Esta corrección es crítica para el funcionamiento correcto con la API.**

### **URL de Producción v3.0.2:**
```
https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v3.0.2/dist/widget/geekway-chat-widget.min.js
```

### **Configuración Mínima:**
```javascript
GeekWayChat.init({
    apiKey: 'tu-api-key-aqui',
    theme: 'purple',
    position: 'bottom-right'
});
```

---

*Última actualización: 22 de Octubre 2025*  
*Versión del documento: v3.0.2-correction*  
*Corrección crítica: Session ID en body según documentación API*
