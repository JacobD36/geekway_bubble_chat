# 🎯 GeekWay Chat Widget - URLs Finales de CDN

## 🌐 URLs de Producción v1.3.0 (FINAL)

### JavaScript + CSS
```html
<!-- CSS del Widget -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v1.3.0/dist/widget/geekway-chat-widget.min.css">

<!-- JavaScript del Widget -->
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v1.3.0/dist/widget/geekway-chat-widget.min.js"></script>
```

## 🚀 Código de Integración Completo

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Sitio Web</title>
    
    <!-- GeekWay Chat Widget CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v1.3.0/dist/widget/geekway-chat-widget.min.css">
</head>
<body>
    <!-- Tu contenido aquí -->
    <h1>Mi Sitio Web</h1>
    <p>Contenido de tu página...</p>

    <!-- GeekWay Chat Widget JavaScript -->
    <script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v1.3.0/dist/widget/geekway-chat-widget.min.js"></script>
    
    <!-- Inicialización del Widget -->
    <script>
        GeekWayChat.init({
            apiKey: 'tu-api-key-aqui',
            theme: 'purple',
            position: 'bottom-right',
            welcomeMessage: '¡Hola! ¿En qué puedo ayudarte hoy?'
        });
    </script>
</body>
</html>
```

## ⚙️ Opciones de Configuración

```javascript
GeekWayChat.init({
    apiKey: 'tu-api-key',              // REQUERIDO: Tu clave API
    theme: 'purple',                   // OPCIONAL: 'purple' | 'blue' (default: 'purple')
    position: 'bottom-right',          // OPCIONAL: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' (default: 'bottom-right')
    welcomeMessage: 'Tu mensaje'       // OPCIONAL: Mensaje personalizado (default: '¡Hola! ¿En qué puedo ayudarte?')
});
```

## 🔧 Métodos de la API

```javascript
// Mostrar el widget
GeekWayChat.show();

// Ocultar el widget
GeekWayChat.hide();

// Destruir el widget completamente
GeekWayChat.destroy();
```

## ✅ Estado: LISTO PARA PRODUCCIÓN

- ✅ **Compilado y optimizado**
- ✅ **Disponible en CDN público**
- ✅ **API GeekWayChat verificada**
- ✅ **Versión estable v1.3.0**
- ✅ **Documentación completa**
- ✅ **Ejemplos de integración**

## 📞 Para Integrar en Tu Sitio Web

**Paso 1:** Agrega el CSS en el `<head>`:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v1.3.0/dist/widget/geekway-chat-widget.min.css">
```

**Paso 2:** Agrega el JavaScript antes del `</body>`:
```html
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@v1.3.0/dist/widget/geekway-chat-widget.min.js"></script>
<script>
GeekWayChat.init({
    apiKey: 'tu-clave-api',
    theme: 'purple',
    position: 'bottom-right',
    welcomeMessage: '¡Hola! ¿En qué puedo ayudarte?'
});
</script>
```

**¡Listo!** El chat aparecerá automáticamente en tu sitio.

---

🎯 **GeekWay** - Chat Widget v1.3.0 | Octubre 2025
