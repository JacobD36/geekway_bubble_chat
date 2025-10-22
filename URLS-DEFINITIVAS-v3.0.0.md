# 🚀 GeekWay Chat Widget v3.0.0 - URLs CDN Definitivas
## Integración API REST - OpenAI Threads Service

**Fecha:** 22 de Octubre 2025  
**Versión:** v3.0.0 (API Integration - Breaking Change)  
**Tipo:** Nueva funcionalidad mayor con integración API REST  

---

## 🌟 NUEVA FUNCIONALIDAD v3.0.0

### **🔗 Integración con API REST**
- **Endpoint:** `POST http://localhost:3000/api/v1/threads/chat`
- **Autenticación:** API Key via header `x-key`
- **OpenAI:** Respuestas generadas por OpenAI Assistant
- **Sesiones:** Conversaciones persistentes por 30 minutos

### **⚠️ BREAKING CHANGE**
**API Key ahora es REQUERIDA** para inicializar el widget. Sin API Key válida, el widget no funcionará.

---

## 🚀 URLs CDN de Producción v3.0.0

### **JavaScript (Minificado - Recomendado para Producción)**
```html
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v3.0.0/dist/widget/geekway-chat-widget.min.js"></script>
```

### **CSS (Opcional - Estilos adicionales)**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v3.0.0/dist/widget/geekway-chat-widget.css">
```

### **JavaScript (No minificado - Para desarrollo)**
```html
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v3.0.0/dist/widget/geekway-chat-widget.js"></script>
```

---

## 🎯 Nuevas Características v3.0.0

### **🔑 Autenticación API Key (REQUERIDA)**
```javascript
GeekWayChat.init({
    apiKey: 'tu-api-key-aqui',  // ✅ OBLIGATORIO
    // ... otras opciones
});
```

### **📡 Configuración de API (Opcional)**
```javascript
GeekWayChat.init({
    apiKey: 'tu-api-key-aqui',
    apiBaseUrl: 'http://localhost:3000/api/v1',  // Opcional - URL personalizada
    // ... otras opciones
});
```

### **🔄 Sesiones Persistentes**
- **Duración:** 30 minutos de inactividad
- **Contexto:** Mantiene historia de conversación
- **Auto-gestión:** Se maneja automáticamente por session_id

### **⚡ Indicador de Escritura**
- **Animación:** Puntos animados mientras se procesa
- **UX:** Feedback visual inmediato al usuario
- **Auto-remove:** Se quita automáticamente al recibir respuesta

### **🤖 Respuestas OpenAI**
- **Inteligencia:** Respuestas generadas por OpenAI Assistant
- **Contexto:** Mantiene conversación coherente
- **Personalización:** Configurable via agente en backend

---

## 🧪 Integración Completa

### **Configuración Mínima (Requerida):**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Mi Sitio Web</title>
</head>
<body>
    <!-- Tu contenido aquí -->
    
    <!-- Widget GeekWay Chat v3.0.0 con API -->
    <script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v3.0.0/dist/widget/geekway-chat-widget.min.js"></script>
    
    <script>
        GeekWayChat.init({
            apiKey: 'tu-api-key-aqui',  // ✅ OBLIGATORIO
            theme: 'purple',
            position: 'bottom-right',
            welcomeMessage: '¡Hola! Soy tu asistente con IA. ¿En qué puedo ayudarte? 🤖'
        });
    </script>
</body>
</html>
```

### **Configuración Avanzada (Completa):**
```html
<script>
    GeekWayChat.init({
        // ✅ OBLIGATORIO
        apiKey: 'tu-api-key-valida',
        
        // 🔧 CONFIGURACIÓN API (Opcional)
        apiBaseUrl: 'https://tu-api.com/api/v1',  // Default: http://localhost:3000/api/v1
        
        // 🎨 PERSONALIZACIÓN (Opcional)
        theme: 'purple',                          // purple | blue | green | red
        position: 'bottom-right',                 // bottom-right | bottom-left | top-right | top-left
        welcomeMessage: 'Mensaje personalizado'   // Mensaje inicial del bot
    });
</script>
```

---

## 📋 Requisitos del Backend

### **API Endpoint Requerido:**
```
POST /api/v1/threads/chat
```

### **Headers:**
```http
Content-Type: application/json
x-key: tu-api-key-aqui
```

### **Request Body:**
```json
{
  "message": "Mensaje del usuario",
  "session_id": "uuid-opcional",
  "reset_context": false
}
```

### **Response Esperada:**
```json
{
  "code": 200,
  "message": "Chat procesado exitosamente",
  "status": "OK",
  "data": {
    "session_id": "uuid",
    "thread_id": "thread_abc123",
    "messages": [
      {
        "id": "msg_abc123",
        "role": "assistant",
        "content": [
          {
            "type": "text",
            "text": {
              "value": "Respuesta del asistente",
              "annotations": []
            }
          }
        ],
        "created_at": 1635724800,
        "metadata": {}
      }
    ],
    "status": "completed",
    "agent_id": "agent_uuid",
    "assistant_id": "asst_abc123",
    "created_at": "2023-11-01T10:00:00Z",
    "expires_at": "2023-11-01T10:30:00Z",
    "response_time_ms": 1500
  }
}
```

---

## 🔄 Migración desde v2.x.x

### **Cambios BREAKING:**

#### **1. API Key ahora es OBLIGATORIA:**
```javascript
// ❌ ANTES (v2.x.x) - Funcionaba sin API Key
GeekWayChat.init({
    theme: 'purple',
    position: 'bottom-right'
});

// ✅ DESPUÉS (v3.0.0) - API Key REQUERIDA
GeekWayChat.init({
    apiKey: 'tu-api-key-aqui',  // ✅ NUEVO Y OBLIGATORIO
    theme: 'purple',
    position: 'bottom-right'
});
```

#### **2. Respuestas Dinámicas (No más hardcoded):**
```javascript
// ❌ ANTES: Respuestas hardcodeadas predefinidas
// ✅ DESPUÉS: Respuestas dinámicas de OpenAI Assistant
```

#### **3. Configuración de API (Nueva opción):**
```javascript
// ✅ NUEVO en v3.0.0
GeekWayChat.init({
    apiKey: 'tu-api-key',
    apiBaseUrl: 'https://mi-api.com/api/v1',  // Opcional
    // ... resto de configuración
});
```

### **Guía de Migración Paso a Paso:**

1. **Obtener API Key**
   - Registrarse en el servicio
   - Obtener API Key válida
   - Configurar agente con OpenAI Assistant

2. **Actualizar URLs CDN**
   ```html
   <!-- Cambiar de v2.x.x a v3.0.0 -->
   <script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v3.0.0/dist/widget/geekway-chat-widget.min.js"></script>
   ```

3. **Agregar API Key a configuración**
   ```javascript
   GeekWayChat.init({
       apiKey: 'tu-api-key-aqui',  // ✅ AGREGAR ESTO
       // ... resto de configuración existente
   });
   ```

4. **Configurar backend API**
   - Endpoint `/api/v1/threads/chat` funcionando
   - API Key configurada en base de datos
   - OpenAI Assistant configurado

---

## 🎨 Nuevas Características Visuales

### **⚡ Indicador de Escritura:**
- Animación de puntos mientras se procesa el mensaje
- Se muestra automáticamente al enviar mensaje
- Se oculta al recibir respuesta

### **🔄 Estados de Input:**
- Input se deshabilita mientras se procesa
- Botón de envío se deshabilita durante API call
- Feedback visual claro del estado

### **❌ Manejo de Errores:**
- Mensajes de error user-friendly
- Recuperación automática de errores temporales
- Logs detallados en consola para debugging

---

## 📊 Comparación de Versiones

| Aspecto | v2.2.4 | **v3.0.0** |
|---------|--------|-------------|
| **API Integration** | ❌ No | ✅ **OpenAI Threads** |
| **Respuestas** | ❌ Hardcoded | ✅ **IA Dinámica** |
| **Sesiones** | ❌ No persistentes | ✅ **30 min persistentes** |
| **API Key** | ❌ No requerida | ✅ **OBLIGATORIA** |
| **Indicador Escritura** | ❌ No | ✅ **Animado** |
| **Tamaño** | 12KB | ~15KB (+3KB) |
| **Compatibilidad** | ✅ Universal | ✅ Universal |
| **UX Alineación** | ✅ Corregida | ✅ Mantenida |

---

## 🔧 Configuración del Backend

### **Variables de Entorno Requeridas:**
```env
OPENAI_API_KEY=sk-...                    # API key de OpenAI
POSTGRES_DATABASE_URL=postgres://...     # Base de datos para sesiones
```

### **Tabla de Agentes (Ejemplo):**
```sql
CREATE TABLE agents (
    id UUID PRIMARY KEY,
    api_key VARCHAR(255) UNIQUE NOT NULL,
    assistant_id VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    active BOOLEAN DEFAULT true
);
```

### **Documentación API Completa:**
Ver archivo `OPENAI_THREADS_SERVICE_DOCUMENTATION.md` para detalles completos del backend.

---

## 🚀 Beneficios de la v3.0.0

### **Para Desarrolladores:**
- ✅ **Respuestas inteligentes** - Sin necesidad de programar lógica de chat
- ✅ **Sesiones automáticas** - Contexto mantenido automáticamente
- ✅ **API REST estándar** - Fácil integración con cualquier backend
- ✅ **Manejo de errores** - Recuperación automática y mensajes claros

### **Para Usuarios Finales:**
- ✅ **IA conversacional** - Respuestas inteligentes y contextuales
- ✅ **Continuidad** - Conversación se mantiene por 30 minutos
- ✅ **Feedback visual** - Indicadores de escritura y estado
- ✅ **UX familiar** - Sigue manteniendo alineación estándar

### **Para Empresas:**
- ✅ **Escalabilidad** - Backend profesional con base de datos
- ✅ **Personalización** - Cada agente puede tener assistant diferente
- ✅ **Analytics** - Tracking de sesiones y conversaciones
- ✅ **Seguridad** - Autenticación por API Key

---

## ⚠️ Consideraciones Importantes

### **🔑 Seguridad:**
- **Nunca exponer API Keys** en frontend de producción
- **Usar proxy/middleware** en backend para manejar authentication
- **Validar permisos** de acceso a sesiones por API Key

### **💰 Costos:**
- **OpenAI API** tiene costos por token/request
- **Monitorear uso** para evitar cargos inesperados
- **Configurar límites** apropiados en el backend

### **🌐 Conectividad:**
- **Backend debe estar disponible** en URL configurada
- **CORS configurado** si frontend está en dominio diferente
- **Timeout apropiado** para respuestas lentas

---

## 🧪 Testing y Debugging

### **Testing Local:**
```bash
# 1. Levantar backend API
npm start  # o yarn start

# 2. Verificar endpoint
curl -X POST "http://localhost:3000/api/v1/threads/chat" \
  -H "Content-Type: application/json" \
  -H "x-key: tu-api-key" \
  -d '{"message": "Hola"}'

# 3. Abrir test de integración
# http://localhost:8080/test-api-integration.html
```

### **Debugging Common Issues:**

| Error | Causa | Solución |
|-------|-------|----------|
| `API Key requerida` | API Key no proporcionada | Agregar `apiKey` a configuración |
| `Fetch failed` | Backend no disponible | Verificar que API esté corriendo |
| `401 Unauthorized` | API Key inválida | Verificar API Key en base de datos |
| `CORS error` | Política CORS | Configurar CORS en backend |
| `Timeout` | Respuesta lenta | Aumentar timeout o verificar OpenAI |

### **Logs de Debug:**
```javascript
// El widget loggea automáticamente:
// 📡 Enviando mensaje a API: {...}
// ✅ Respuesta de API recibida: {...}
// 💾 Session ID guardado: uuid
// ❌ Error al enviar mensaje: error
```

---

## 📈 Roadmap v3.x.x

### **v3.0.0 - ✅ Completado:**
- ✅ Integración API REST
- ✅ Sesiones persistentes
- ✅ OpenAI Assistant integration
- ✅ Indicador de escritura
- ✅ Manejo de errores

### **v3.1.0 - 🔄 Planificado:**
- 🔲 **Streaming responses** para respuestas en tiempo real
- 🔲 **WebSocket support** para mejor performance
- 🔲 **Archivos adjuntos** en mensajes
- 🔲 **Mensajes rich text** con markdown

### **v3.2.0 - 🔄 Futuro:**
- 🔲 **Multi-idioma** con detección automática
- 🔲 **Temas personalizados** avanzados
- 🔲 **Analytics integrados** en el widget
- 🔲 **Integración voice** para mensajes de voz

---

## 📞 Soporte y Contacto

### **🐛 Reportar Issues:**
- **GitHub Issues:** [https://github.com/JacobD36/geekway_bubble_chat/issues](https://github.com/JacobD36/geekway_bubble_chat/issues)
- **Template:** Incluir versión, configuración y logs de error

### **💬 Soporte Técnico:**
- **Email:** soporte@geekway.com
- **Chat:** Usar el widget en nuestro sitio web
- **Documentación:** Ver `OPENAI_THREADS_SERVICE_DOCUMENTATION.md`

### **🚀 Servicios Profesionales:**
- **Setup completo** de backend y frontend
- **Personalización** de asistentes OpenAI
- **Integración empresarial** con sistemas existentes

---

## 🎉 ¡Actualiza a v3.0.0 Ahora!

**Esta versión representa un cambio mayor en funcionalidad.** 
La integración con IA real mejora significativamente la experiencia del usuario.

### **URLs de Producción v3.0.0:**
```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v3.0.0/dist/widget/geekway-chat-widget.min.js"></script>

<!-- CSS (Opcional) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v3.0.0/dist/widget/geekway-chat-widget.css">
```

### **Configuración Mínima:**
```javascript
GeekWayChat.init({
    apiKey: 'tu-api-key-aqui',  // ✅ REQUERIDO
    theme: 'purple',
    position: 'bottom-right',
    welcomeMessage: '¡Hola! Soy tu asistente con IA 🤖'
});
```

---

*Última actualización: 22 de Octubre 2025*  
*Versión del documento: v3.0.0-final*  
*Breaking Changes: API Key requerida, Integración API REST*
