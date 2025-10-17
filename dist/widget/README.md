# GeekWay Chat Widget

## Instalación

### Opción 1: CDN
```html
<script src="https://cdn.jsdelivr.net/gh/tuusuario/geekway-chat-widget@latest/dist/widget/geekway-chat-widget.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tuusuario/geekway-chat-widget@latest/dist/widget/geekway-chat-widget.min.css">

<!-- En el body -->
<geekway-chat-widget
  api-key="tu-api-key"
  theme="purple"
  position="bottom-right">
</geekway-chat-widget>
```

### Opción 2: JavaScript Initialization
```html
<script src="https://cdn.jsdelivr.net/gh/tuusuario/geekway-chat-widget@latest/dist/widget/geekway-chat-widget.min.js"></script>
<script>
  GeekWayChat.init({
    apiKey: 'tu-api-key',
    theme: 'purple',
    position: 'bottom-right',
    welcomeMessage: '¡Hola! ¿Cómo puedo ayudarte?'
  });
</script>
```

## Configuración

| Atributo | Valores | Descripción |
|----------|---------|-------------|
| api-key | string | Tu clave API de GeekWay |
| theme | purple/blue/green | Color del widget |
| position | bottom-right/bottom-left | Posición del botón |
| welcome-message | string | Mensaje inicial del bot |

