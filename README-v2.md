# 🚀 GeekWay Chat Widget v2.1.0 - Vanilla JS Universal Edition with Avatar Icons

[![CDN](https://img.shields.io/badge/CDN-jsDelivr-orange)](https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v2.1.0/dist/widget/)
[![Version](https://img.shields.io/badge/version-v2.1.0-blue)](https://github.com/JacobD36/geekway_bubble_chat/releases/tag/v2.1.0)
[![Size](https://img.shields.io/badge/size-12KB-green)](https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v2.1.0/dist/widget/geekway-chat-widget.min.js)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](LICENSE)

Un widget de chat moderno, liviano y universal que funciona en cualquier sitio web sin dependencias de frameworks.

## 🎨 **¡NUEVO en v2.1.0! - Iconos de Avatar**

- **🤖 Icono del Bot** - Avatar distintivo con escudo para mensajes del sistema
- **👤 Icono del Usuario** - Avatar personal para mensajes del cliente  
- **💬 UX Mejorada** - Identificación visual clara de roles en la conversación
- **📦 SVG Integrado** - Sin dependencias externas, iconos incluidos en el widget

## ✨ **Características principales**

- 🚀 **Vanilla JavaScript puro** - Sin dependencias de Angular, React o Vue
- 📦 **Ultra liviano** - Solo 12KB minificado (incluye nuevos iconos)
- 🌐 **Compatibilidad universal** - Funciona en cualquier sitio web
- 🎨 **Diseño moderno** - Interfaz elegante con tema púrpura de GeekWay + avatares
- 📱 **Responsive** - Se adapta a dispositivos móviles
- 🔧 **Fácil integración** - Solo dos líneas de código
- ⚡ **Carga instantánea** - Sin bootstrap de frameworks
- 🎯 **Posicionamiento perfecto** - Esquina inferior derecha con animación suave

## 🌐 **Integración vía CDN (Recomendado)**

### 📋 **Opción 1: Integración básica**

```html
<!-- CSS (opcional - estilos incluidos en JS) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v2.1.0/dist/widget/geekway-chat-widget.min.css">

<!-- JavaScript del widget -->
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v2.1.0/dist/widget/geekway-chat-widget.min.js"></script>

<!-- Inicializar el widget -->
<script>
  GeekWayChat.init({
    apiKey: 'tu-api-key-aqui',
    theme: 'purple',
    position: 'bottom-right',
    welcomeMessage: '¡Hola! ¿En qué puedo ayudarte?'
  });
</script>
```

### 🔗 **Opción 2: Una sola línea (solo JS)**

```html
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v2.1.0/dist/widget/geekway-chat-widget.min.js" onload="GeekWayChat.init({apiKey: 'tu-api-key', welcomeMessage: '¡Hola desde GeekWay!'})"></script>
```

## ⚙️ **Configuración**

```javascript
GeekWayChat.init({
  // Requerido
  apiKey: 'tu-api-key-aqui',
  
  // Opcional
  theme: 'purple',                    // 'purple' | 'blue'
  position: 'bottom-right',           // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  welcomeMessage: 'Tu mensaje aquí'   // Mensaje inicial del bot
});
```

## 🎯 **Métodos disponibles**

```javascript
// Inicializar widget
const widget = GeekWayChat.init(config);

// Mostrar widget
GeekWayChat.show();

// Ocultar widget
GeekWayChat.hide();

// Destruir widget
GeekWayChat.destroy();
```

## 🌍 **URLs del CDN**

### 📦 **Versión estable (v2.0.0)**

| Archivo | URL | Tamaño |
|---------|-----|--------|
| **JavaScript minificado** | [`geekway-chat-widget.min.js`](https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v2.0.0/dist/widget/geekway-chat-widget.min.js) | ~10KB |
| **JavaScript normal** | [`geekway-chat-widget.js`](https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v2.0.0/dist/widget/geekway-chat-widget.js) | ~12KB |
| **CSS (opcional)** | [`geekway-chat-widget.min.css`](https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v2.0.0/dist/widget/geekway-chat-widget.min.css) | <1KB |

### 🔄 **Versión de desarrollo (latest)**

```html
<!-- Siempre la última versión (puede tener cambios) -->
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@main/dist/widget/geekway-chat-widget.min.js"></script>
```

## 💡 **Ejemplos de uso**

### 🏢 **Para sitio web corporativo**

```html
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v2.0.0/dist/widget/geekway-chat-widget.min.js"></script>
<script>
  GeekWayChat.init({
    apiKey: 'empresa-corp-2024',
    theme: 'purple',
    position: 'bottom-right',
    welcomeMessage: '¡Bienvenido a nuestra empresa! ¿Cómo podemos ayudarte hoy?'
  });
</script>
```

### 🛒 **Para e-commerce**

```html
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v2.0.0/dist/widget/geekway-chat-widget.min.js"></script>
<script>
  GeekWayChat.init({
    apiKey: 'tienda-online-2024',
    theme: 'blue',
    position: 'bottom-left',
    welcomeMessage: '¿Necesitas ayuda con tu compra? ¡Estamos aquí para ti!'
  });
</script>
```

## 🆚 **Comparación de versiones**

| Característica | v1.x (Angular) | v2.0 (Vanilla) |
|---------------|----------------|-----------------|
| **Tamaño** | 277KB | 10KB |
| **Dependencias** | Angular 20 | Ninguna |
| **Compatibilidad** | Limitada | Universal |
| **Carga** | Bootstrap + Framework | Instantánea |
| **Conflictos** | Posibles | Ninguno |
| **Rendimiento** | Bueno | Excelente |

## 🔧 **Desarrollo local**

```bash
# Clonar repositorio
git clone https://github.com/JacobD36/geekway_bubble_chat.git
cd geekway_bubble_chat

# Build vanilla JS
./build-simple.sh

# Servidor de desarrollo
python3 -m http.server 8080

# Test en navegador
open http://localhost:8080/test-vanilla.html
```

## 🐛 **Solución de problemas**

### ❌ **GeekWayChat no está definido**

```javascript
// ✅ Correcto: Esperar a que se cargue el script
<script src="...geekway-chat-widget.min.js" onload="initWidget()"></script>
<script>
function initWidget() {
  GeekWayChat.init({apiKey: 'tu-key'});
}
</script>

// ❌ Incorrecto: Llamar antes de cargar
<script>GeekWayChat.init({apiKey: 'tu-key'});</script>
<script src="...geekway-chat-widget.min.js"></script>
```

### 🎯 **Widget no aparece en la posición correcta**

Verifica que no hay CSS conflictivo en tu sitio:

```css
/* En tu CSS, evita sobrescribir: */
.geekway-chat-widget * {
  /* Estilos del widget */
}
```

## 📈 **Changelog v2.0.0**

### ✨ **Nuevas características**
- ✅ Versión vanilla JavaScript sin dependencias
- ✅ Tamaño reducido de 277KB a 10KB
- ✅ Compatibilidad universal
- ✅ Animación suave de slide-up
- ✅ CSS embebido para portabilidad

### 🔧 **Correcciones**
- ✅ Posicionamiento correcto en esquina inferior derecha
- ✅ Eliminados errores de LFrame/Angular
- ✅ Mejorada especificidad de CSS
- ✅ Conflictos de frameworks resueltos

### 💥 **Breaking Changes**
- ⚠️ Reescrito completamente en vanilla JS
- ⚠️ Nueva API (mantiene compatibilidad básica)
- ⚠️ Nuevo sistema de build

## 📄 **Licencia**

MIT © 2024 GeekWay - Jacob D36

## 🤝 **Contribuir**

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📞 **Soporte**

- 📧 **Email**: soporte@geekway.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/JacobD36/geekway_bubble_chat/issues)
- 📖 **Documentación**: [Wiki del proyecto](https://github.com/JacobD36/geekway_bubble_chat/wiki)

---

### 🎉 **¡Gracias por usar GeekWay Chat Widget v2.0.0!**

**Hecho con ❤️ por el equipo de GeekWay**
