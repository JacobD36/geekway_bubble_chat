# 🎯 GeekWay Chat Widget

Widget de chat embebible para sitios web, construido con Angular Elements.

## 🚀 Instalación vía CDN

### JavaScript + CSS
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v1.2.0/dist/widget/geekway-chat-widget.min.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v1.2.0/dist/widget/geekway-chat-widget.min.js"></script>
```

## 🔧 Inicialización

### Método recomendado (JavaScript API)
```html
<script>
document.addEventListener('DOMContentLoaded', function() {
    GeekWayChat.init({
        apiKey: 'tu-api-key',
        theme: 'purple',                    // 'purple' | 'blue'
        position: 'bottom-right',           // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
        welcomeMessage: 'Tu mensaje'        // Mensaje personalizado
    });
});
</script>
```

### Método alternativo (Custom Element)
```html
<geekway-chat-widget
    api-key="tu-api-key"
    theme="purple"
    position="bottom-right"
    welcome-message="¡Hola! ¿En qué puedo ayudarte?">
</geekway-chat-widget>
```

## ⚙️ Configuración

| Opción | Tipo | Valores | Por Defecto | Descripción |
|--------|------|---------|-------------|-------------|
| `apiKey` | string | - | - | Tu clave API única |
| `theme` | string | `'purple'` \| `'blue'` | `'purple'` | Tema de colores |
| `position` | string | `'bottom-right'` \| `'bottom-left'` \| `'top-right'` \| `'top-left'` | `'bottom-right'` | Posición del botón |
| `welcomeMessage` | string | - | `'¡Hola! ¿En qué puedo ayudarte?'` | Mensaje inicial |

## 🎨 Temas Disponibles

- **Purple** (por defecto): Tema principal de GeekWay
- **Blue**: Tema azul alternativo

## 📱 Compatibilidad

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Dispositivos móviles

## 🔧 Métodos de la API

```javascript
// Inicializar widget
GeekWayChat.init(config);

// Mostrar widget
GeekWayChat.show();

// Ocultar widget
GeekWayChat.hide();

// Destruir widget
GeekWayChat.destroy();
```

---

🎯 **Creado por GeekWay** - Soluciones tecnológicas innovadoras
