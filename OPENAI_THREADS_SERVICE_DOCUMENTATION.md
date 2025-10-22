# 📡 **OpenAI Threads Service - Documentación API**

## 🎯 **Resumen General**

El servicio OpenAI Threads proporciona funcionalidad de chat conversacional persistente utilizando la API de Assistants de OpenAI. Permite crear sesiones de conversación que mantienen contexto durante 30 minutos y se integran con agentes específicos.

---

## 🏗️ **Arquitectura del Servicio**

### **Componentes Principales:**

- **Handler**: `OpenAIThreadsHandler` - Maneja las solicitudes HTTP
- **Service**: `OpenAIThreadsService` - Lógica de negocio para threads
- **Middleware**: `ApiKeyMiddleware` - Autenticación por API Key
- **DTOs**: Estructuras de datos para requests/responses
- **Domain**: `ThreadSession` - Gestión de sesiones persistentes

---

## 🛣️ **Rutas y Endpoints**

### **Base URL**: `/api/v1/threads`

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `POST` | `/chat` | Chat con asistente usando sessiones persistentes | API Key |
| `GET` | `/sessions/{session_id}/status` | Obtener estado de una sesión | API Key |

---

## 🔐 **Autenticación**

### **Tipo**: API Key Authentication

- **Header requerido**: `x-key`
- **Formato**: `x-key: tu_api_key_aqui`
- **Validación**: La API key debe estar activa y asociada a un agente válido

### **Configuración en Router:**
```go
threadsGroup := v1.Group("/threads")
threadsGroup.Use(apiKeyMw.Authenticate()) // API Key authentication
```

### **Middleware de Validación:**
```go
type ApiKeyMiddleware struct {
    apiKeyService interfaces.ApiKeyService
}

// Valida API key y establece agent_id en contexto
func (m *ApiKeyMiddleware) Authenticate() echo.MiddlewareFunc
```

---

## 📋 **Endpoint: POST /api/v1/threads/chat**

### **Descripción**
Crea o reutiliza una sesión de conversación con un asistente de OpenAI.

### **Request Body**
```json
{
  "message": "string (required, 1-4000 chars)",
  "session_id": "string (optional, UUID format)",
  "reset_context": "boolean (optional, default: false)"
}
```

### **Parámetros Explicados:**
- **`message`**: Mensaje del usuario (obligatorio, 1-4000 caracteres)
- **`session_id`**: ID de sesión existente para continuar conversación (opcional)
- **`reset_context`**: Fuerza crear nuevo thread manteniendo misma sesión (opcional)

### **Headers Requeridos:**
```http
Content-Type: application/json
x-key: your_api_key_here
```

### **Response Body**
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

### **Códigos de Respuesta:**

| Código | Descripción |
|--------|-------------|
| `200` | Chat procesado exitosamente |
| `400` | Formato de solicitud inválido / Agente sin assistant configurado |
| `401` | API Key inválida o faltante |
| `404` | Agente no encontrado |
| `500` | Error interno del servidor |

### **Ejemplo de Uso:**

#### **Primera Conversación:**
```bash
curl -X POST "https://api.example.com/api/v1/threads/chat" \
  -H "Content-Type: application/json" \
  -H "x-key: your_api_key_here" \
  -d '{
    "message": "Hola, ¿qué productos tienes disponibles?"
  }'
```

#### **Continuar Conversación:**
```bash
curl -X POST "https://api.example.com/api/v1/threads/chat" \
  -H "Content-Type: application/json" \
  -H "x-key: your_api_key_here" \
  -d '{
    "message": "¿Cuál es el precio del primer producto?",
    "session_id": "uuid_from_previous_response"
  }'
```

#### **Reset Context:**
```bash
curl -X POST "https://api.example.com/api/v1/threads/chat" \
  -H "Content-Type: application/json" \
  -H "x-key: your_api_key_here" \
  -d '{
    "message": "Empecemos de nuevo",
    "session_id": "uuid_from_previous_response",
    "reset_context": true
  }'
```

---

## 📊 **Endpoint: GET /api/v1/threads/sessions/{session_id}/status**

### **Descripción**
Obtiene el estado actual de una sesión de thread.

### **Parámetros de URL:**
- **`session_id`**: UUID de la sesión (requerido)

### **Headers Requeridos:**
```http
x-key: your_api_key_here
```

### **Response Body**
```json
{
  "code": 200,
  "message": "Estado de la sesión obtenido exitosamente",
  "status": "OK",
  "data": {
    "session_id": "uuid",
    "status": "active",
    "message": "Las sesiones mantienen contexto por 30 minutos"
  }
}
```

### **Códigos de Respuesta:**

| Código | Descripción |
|--------|-------------|
| `200` | Estado obtenido exitosamente |
| `400` | Session ID faltante |
| `401` | API Key inválida |
| `404` | Sesión no encontrada |
| `500` | Error interno del servidor |

### **Ejemplo de Uso:**
```bash
curl -X GET "https://api.example.com/api/v1/threads/sessions/uuid_here/status" \
  -H "x-key: your_api_key_here"
```

---

## 🔄 **Gestión de Sesiones**

### **Ciclo de Vida de Sesiones:**

1. **Creación**: Primera llamada crea nueva sesión y thread
2. **Reutilización**: Llamadas posteriores con `session_id` reutilizan thread
3. **Extensión**: Cada uso extiende expiración 30 minutos
4. **Reset**: `reset_context: true` crea nuevo thread manteniendo sesión
5. **Expiración**: Sesiones inactivas >30 min se consideran expiradas

### **Características de Sesiones:**

```go
type ThreadSession struct {
    SessionID   string    // UUID único de sesión
    ThreadID    string    // ID del thread de OpenAI
    AgentID     string    // ID del agente asociado
    AssistantID string    // ID del assistant de OpenAI
    CreatedAt   time.Time // Timestamp de creación
    LastUsed    time.Time // Último uso
    ExpiresAt   time.Time // Expiración (30 min por defecto)
    IsActive    bool      // Estado activo/inactivo
}
```

### **Métodos de Sesión:**
- `IsExpired()` - Verifica si sesión expiró
- `UpdateLastUsed()` - Actualiza timestamp de uso
- `ExtendExpiration()` - Extiende 30 minutos desde ahora
- `Deactivate()` - Marca como inactiva

---

## 📝 **DTOs y Estructuras de Datos**

### **Request DTOs:**

#### **CreateThreadChatRequest**
```go
type CreateThreadChatRequest struct {
    Message      string `json:"message" validate:"required,min=1,max=4000"`
    SessionID    string `json:"session_id" validate:"omitempty,uuid"`
    ResetContext bool   `json:"reset_context"`
}
```

### **Response DTOs:**

#### **ThreadChatResponse**
```go
type ThreadChatResponse struct {
    SessionID    string          `json:"session_id"`
    ThreadID     string          `json:"thread_id"`
    Messages     []ThreadMessage `json:"messages"`
    Status       string          `json:"status"`
    AgentID      string          `json:"agent_id"`
    AssistantID  string          `json:"assistant_id"`
    CreatedAt    time.Time       `json:"created_at"`
    ExpiresAt    time.Time       `json:"expires_at"`
    ResponseTime int64           `json:"response_time_ms"`
}
```

#### **ThreadMessage**
```go
type ThreadMessage struct {
    ID        string           `json:"id"`
    Role      string           `json:"role"`
    Content   []MessageContent `json:"content"`
    CreatedAt int64            `json:"created_at"`
    Metadata  map[string]any   `json:"metadata"`
}
```

#### **MessageContent**
```go
type MessageContent struct {
    Type string     `json:"type"`
    Text *TextValue `json:"text,omitempty"`
}

type TextValue struct {
    Value       string           `json:"value"`
    Annotations []TextAnnotation `json:"annotations"`
}
```

---

## ⚠️ **Manejo de Errores**

### **Errores Comunes:**

| Error | Causa | Solución |
|-------|-------|----------|
| `API Key requerida` | Header `x-key` faltante | Incluir header con API key válida |
| `Agente no encontrado` | API key no asociada a agente | Verificar API key y agente |
| `Assistant no configurado` | Agente sin OpenAI Assistant | Configurar assistant en el agente |
| `Formato inválido` | JSON malformado o campos faltantes | Validar estructura de request |
| `Sesión no encontrada` | Session ID inválido o expirado | Usar session ID válido o crear nueva |

### **Estructura de Error:**
```json
{
  "code": 400,
  "message": "Descripción del error",
  "status": "Bad Request",
  "data": null
}
```

---

## 🔧 **Configuración y Dependencias**

### **Variables de Entorno Requeridas:**
```env
OPENAI_API_KEY=sk-...                    # API key de OpenAI
POSTGRES_DATABASE_URL=postgres://...     # Base de datos para sesiones
```

### **Dependencias del Servicio:**
- `OpenAIClient` - Cliente para API de OpenAI
- `UnitOfWorkFactory` - Gestión de transacciones DB
- `ThreadSessionRepository` - Persistencia de sesiones
- `AgentRepository` - Datos de agentes

### **Inicialización:**
```go
func NewOpenAIThreadsService(
    uowFactory interfaces.UnitOfWorkFactory,
    openaiClient *openai.OpenAIClient,
    threadSessionRepo interfaces.ThreadSessionRepository,
) *OpenAIThreadsService
```

---

## 🚀 **Flujo de Procesamiento**

### **Flujo Completo de Chat:**

1. **Autenticación**
   - Validar API key via middleware
   - Extraer `agent_id` del contexto

2. **Validación de Request**
   - Validar estructura JSON
   - Validar campos requeridos

3. **Gestión de Sesión**
   - Si `session_id` proporcionado: buscar sesión existente
   - Si `reset_context`: crear nuevo thread en sesión existente
   - Si nueva conversación: crear nueva sesión y thread

4. **Interacción con OpenAI**
   - Agregar mensaje del usuario al thread
   - Ejecutar run con el assistant
   - Polling hasta completar (máx 30 intentos)
   - Extraer respuesta del assistant

5. **Actualización de Sesión**
   - Actualizar `last_used` y `expires_at`
   - Persistir cambios en base de datos

6. **Respuesta**
   - Formatear respuesta con datos de sesión
   - Incluir tiempo de respuesta y metadata

### **Polling Inteligente:**
- **Intervalo inicial**: 1 segundo
- **Backoff gradual**: Incremento de 1.2x hasta máximo 5 segundos
- **Logging reducido**: Solo cada 5 intentos para reducir ruido
- **Timeout**: Máximo 30 intentos

---

## 📚 **Ejemplos de Integración**

### **JavaScript/TypeScript:**
```typescript
class OpenAIThreadsClient {
  constructor(private apiKey: string, private baseUrl: string) {}

  async sendMessage(message: string, sessionId?: string): Promise<ThreadChatResponse> {
    const response = await fetch(`${this.baseUrl}/api/v1/threads/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-key': this.apiKey
      },
      body: JSON.stringify({
        message,
        session_id: sessionId
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    return response.json();
  }
}
```

### **Python:**
```python
import requests
from typing import Optional, Dict, Any

class OpenAIThreadsClient:
    def __init__(self, api_key: str, base_url: str):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            'Content-Type': 'application/json',
            'x-key': api_key
        }
    
    def send_message(self, message: str, session_id: Optional[str] = None) -> Dict[str, Any]:
        payload = {'message': message}
        if session_id:
            payload['session_id'] = session_id
            
        response = requests.post(
            f"{self.base_url}/api/v1/threads/chat",
            headers=self.headers,
            json=payload
        )
        response.raise_for_status()
        return response.json()
```

---

## 🎯 **Mejores Prácticas**

### **Para Desarrolladores:**

1. **Gestión de Sesiones**
   - Almacenar `session_id` en el cliente para conversaciones continuadas
   - Manejar expiración de sesiones (30 minutos)
   - Implementar recuperación graceful cuando sesión expira

2. **Manejo de Errores**
   - Implementar retry logic para errores 429 (rate limiting)
   - Validar responses antes de mostrar al usuario
   - Mostrar mensajes de error user-friendly

3. **Performance**
   - Implementar timeout en cliente (>30 segundos recomendado)
   - Mostrar indicadores de carga durante polling
   - Cachear metadata de sesión cuando sea posible

4. **Seguridad**
   - Nunca exponer API keys en frontend
   - Usar proxy/middleware en backend para manejar authentication
   - Validar permisos de acceso a sesiones

### **Para Administradores:**

1. **Monitoreo**
   - Monitorear uso de tokens OpenAI
   - Tracking de sesiones activas/expiradas
   - Alertas por errores frecuentes

2. **Optimización**
   - Configurar rate limiting apropiado
   - Implementar cleanup de sesiones expiradas
   - Monitorear latencia de responses

---

## 🔍 **Debugging y Troubleshooting**

### **Logs Importantes:**
```go
// Polling con logging reducido
if attempt%5 == 0 && runStatus.Status != "completed" {
    fmt.Printf("🔄 Polling run status: %s (attempt %d)\n", runStatus.Status, attempt+1)
}
```

### **Comandos de Debug:**
```bash
# Verificar conectividad
curl -X GET "https://api.example.com/health" -H "x-key: your_key"

# Test de chat básico
curl -X POST "https://api.example.com/api/v1/threads/chat" \
  -H "Content-Type: application/json" \
  -H "x-key: your_key" \
  -d '{"message": "test"}'

# Verificar estado de sesión
curl -X GET "https://api.example.com/api/v1/threads/sessions/{session_id}/status" \
  -H "x-key: your_key"
```

### **Problemas Comunes:**

| Problema | Síntoma | Solución |
|----------|---------|----------|
| Timeout en chat | Response >30s | Verificar conexión OpenAI / rate limits |
| Sesión no encontrada | 404 en status | Verificar UUID de sesión / expiración |
| Assistant error | 400 sin assistant | Configurar OpenAI Assistant en agente |
| Token agotado | 429 responses | Verificar límites OpenAI / billing |

---

## 📈 **Roadmap y TODOs**

### **Funcionalidad Actual:**
- ✅ Chat básico con sesiones persistentes
- ✅ Gestión automática de expiración
- ✅ Reset de contexto manteniendo sesión
- ✅ Polling inteligente con backoff

### **Mejoras Planificadas:**
- 🔲 **Implementación completa de GetSessionStatus** (actualmente placeholder)
- 🔲 **WebSocket support** para responses en tiempo real
- 🔲 **Streaming responses** para mejor UX
- 🔲 **Metrics y analytics** de uso de sesiones
- 🔲 **Gestión de memoria** para threads largos
- 🔲 **Multi-tenant isolation** por API key

---

## 📞 **Soporte y Contacto**

Para dudas técnicas o problemas de integración:

- **Documentación técnica**: Ver carpeta `/docs` del proyecto
- **Logs de aplicación**: Disponibles en formato JSON estructurado
- **Testing**: Usar endpoints de health check antes de debugging

---

*Documentación generada para GeekWay Playground API - OpenAI Threads Service v1.0*