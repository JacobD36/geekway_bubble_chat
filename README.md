# GeekWay Chat Widget

Un widget de chat embebible y personalizable construido con Angular 20.

## 🚀 Características

- ✅ **Fácil integración** - Solo una línea de código
- ✅ **Responsive design** - Se adapta a cualquier pantalla
- ✅ **Personalizable** - Múltiples temas y posiciones
- ✅ **Sin dependencias** - Funciona en cualquier sitio web
- ✅ **Aislamiento de estilos** - No interfiere con tu CSS
- ✅ **CDN ready** - Listo para distribuir

## 📦 Instalación

### Opción 1: HTML Directo
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/TU_USUARIO/geekway-chat-widget@latest/dist/widget/geekway-chat-widget.min.css">
</head>
<body>
    <!-- Tu contenido aquí -->
    
    <!-- Widget de GeekWay Chat -->
    <geekway-chat-widget 
        api-key="tu-api-key"
        theme="purple"
        position="bottom-right"
        welcome-message="¡Hola! ¿Cómo puedo ayudarte?">
    </geekway-chat-widget>
    
    <script src="https://cdn.jsdelivr.net/gh/TU_USUARIO/geekway-chat-widget@latest/dist/widget/geekway-chat-widget.min.js"></script>
</body>
</html>
```

### Opción 2: JavaScript Initialization
```html
<script src="https://cdn.jsdelivr.net/gh/TU_USUARIO/geekway-chat-widget@latest/dist/widget/geekway-chat-widget.min.js"></script>
<script>
  GeekWayChat.init({
    apiKey: 'tu-api-key',
    theme: 'purple',
    position: 'bottom-right',
    welcomeMessage: '¡Hola! ¿Cómo puedo ayudarte?'
  });
</script>
```

## ⚙️ Configuración

| Atributo | Tipo | Valores | Descripción |
|----------|------|---------|-------------|
| `api-key` | string | - | Tu clave API de GeekWay |
| `theme` | string | `purple`, `blue`, `green` | Color del widget |
| `position` | string | `bottom-right`, `bottom-left` | Posición del botón flotante |
| `welcome-message` | string | - | Mensaje inicial del bot |

## 🛠️ Desarrollo

### Build del Widget
```bash
./build-widget.sh
```

## 🚀 Deployment con GitHub + jsDelivr

1. **Push a GitHub:**
```bash
git add .
git commit -m "Widget release"
git tag v1.0.0
git push origin main --tags
```

2. **Usar CDN automático:**
```html
<script src="https://cdn.jsdelivr.net/gh/TU_USUARIO/geekway-chat-widget@latest/dist/widget/geekway-chat-widget.min.js"></script>
```
