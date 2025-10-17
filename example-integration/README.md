# 🎯 Ejemplos de Integración - GeekWay Chat Widget

Esta carpeta contiene ejemplos prácticos de cómo integrar el widget de chat GeekWay en diferentes tipos de sitios web.

## 📁 Archivos de Ejemplo

### 1. `index.html` - TechCorp Solutions
**Configuración:** Tema púrpura, posición derecha
- Simula el sitio web de una empresa de tecnología
- Widget configurado con tema por defecto (púrpura)
- Posición: `bottom-right`
- Mensaje personalizado para sector tecnológico

### 2. `ecoverde.html` - EcoVerde Consultoría
**Configuración:** Tema azul, posición izquierda  
- Simula el sitio web de una consultoría ambiental
- Widget configurado con tema azul alternativo
- Posición: `bottom-left`
- Mensaje personalizado para sector ambiental

## 🚀 Cómo Probar los Ejemplos

### Opción 1: Abrir directamente en el navegador
```bash
open index.html
open ecoverde.html
```

### Opción 2: Servidor local (recomendado)
```bash
# Con Python
python -m http.server 8000

# Con Node.js (si tienes live-server instalado)
npx live-server

# Con PHP
php -S localhost:8000
```

Luego visita:
- `http://localhost:8000/index.html`
- `http://localhost:8000/ecoverde.html`

## 🎨 Configuraciones Demostradas

### Ejemplo 1 (TechCorp)
```javascript
GeekWayChat.init({
    apiKey: 'demo-api-key-techcorp-2025',
    theme: 'purple',                    // Tema púrpura GeekWay
    position: 'bottom-right',           // Esquina inferior derecha
    welcomeMessage: '¡Hola! Soy el asistente virtual de TechCorp...'
});
```

### Ejemplo 2 (EcoVerde)
```javascript
GeekWayChat.init({
    apiKey: 'demo-api-key-ecoverde-2025',
    theme: 'blue',                      // Tema azul alternativo
    position: 'bottom-left',            // Esquina inferior izquierda
    welcomeMessage: '🌱 ¡Hola! Soy tu consultor ambiental virtual...'
});
```

## 🔧 Código de Integración Base

Para integrar el widget en cualquier sitio web, usa este código:

```html
<!-- En el <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@43cb379/dist/widget/geekway-chat-widget.min.css">

<!-- Antes del </body> -->
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@43cb379/dist/widget/geekway-chat-widget.min.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        GeekWayChat.init({
            apiKey: 'tu-api-key',
            theme: 'purple',              // 'purple' o 'blue'
            position: 'bottom-right',     // posición del botón
            welcomeMessage: 'Tu mensaje'  // mensaje personalizado
        });
    });
</script>
```

## ⚙️ Opciones de Configuración

| Parámetro | Valores | Descripción |
|-----------|---------|-------------|
| `apiKey` | string | Tu clave API única |
| `theme` | `'purple'` \| `'blue'` | Tema de colores del widget |
| `position` | `'bottom-right'` \| `'bottom-left'` \| `'top-right'` \| `'top-left'` | Posición del botón flotante |
| `welcomeMessage` | string | Mensaje inicial que verá el usuario |

## 🎯 Características Visibles en los Ejemplos

✅ **Botón flotante circular** con el logo GeekWay
✅ **Animación de apertura** suave del chat
✅ **Estilos aislados** (no interfiere con el CSS del sitio)
✅ **Responsive design** que se adapta a móviles
✅ **Mensajes automáticos** de respuesta
✅ **Temas personalizables** (púrpura y azul)
✅ **Posicionamiento flexible**

## 🐛 Debugging

Si el widget no aparece, verifica:

1. **Consola del navegador** - busca errores de JavaScript
2. **Red** - confirma que los archivos CSS/JS se cargan correctamente
3. **CDN** - verifica que las URLs de jsDelivr respondan (código 200)
4. **Inicialización** - asegúrate de llamar `GeekWayChat.init()` después del DOM

## 📱 Compatibilidad

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Dispositivos móviles iOS/Android

---

🎉 **¡Explora los ejemplos y adapta el código a tus necesidades!**
