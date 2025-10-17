#!/bin/bash

echo "� Building GeekWay Chat Widget..."

# Limpiar directorio de distribución
rm -rf dist/

# Build para producción
echo "🏗️ Building Angular project..."
ng build --configuration production --output-hashing none

# Crear directorio para el widget
mkdir -p dist/widget

# Combinar archivos JS (incluyendo polyfills, main y widget-api)
echo "📦 Concatenating JavaScript files..."
cat dist/geekway_chat_bubble/browser/polyfills.js \
    dist/geekway_chat_bubble/browser/main.js > dist/widget/geekway-chat-widget.js

# Copiar CSS
echo "🎨 Processing CSS..."
cp dist/geekway_chat_bubble/browser/styles.css dist/widget/geekway-chat-widget.css

# Minificar archivos
echo "🗜️ Minifying files..."
npx terser dist/widget/geekway-chat-widget.js -o dist/widget/geekway-chat-widget.min.js --compress --mangle
npx clean-css-cli dist/widget/geekway-chat-widget.css -o dist/widget/geekway-chat-widget.min.css

# Crear ejemplo simple
cat > dist/widget/example.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GeekWay Chat Widget - Ejemplo</title>
    <link rel="stylesheet" href="geekway-chat-widget.min.css">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
        }
        .info {
            background: #e8f4fd;
            border-left: 4px solid #3498db;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .success {
            background: #d4edda;
            border-left: 4px solid #28a745;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 GeekWay Chat Widget</h1>
        <div class="success">
            ✅ Widget cargado correctamente desde CDN
        </div>
        <div class="info">
            💬 El widget de chat debería aparecer en la esquina inferior derecha de esta página.
        </div>
        <h2>Características del Widget:</h2>
        <ul>
            <li>🎨 Tema personalizable (púrpura/azul)</li>
            <li>📍 Posición configurable</li>
            <li>💬 Mensajes de bienvenida personalizados</li>
            <li>📱 Totalmente responsive</li>
            <li>🔒 Aislamiento de estilos (Shadow DOM)</li>
        </ul>
        
        <h2>Implementación:</h2>
        <pre><code>&lt;script src="geekway-chat-widget.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
    GeekWayChat.init({
        apiKey: 'tu-api-key',
        theme: 'purple',
        position: 'bottom-right',
        welcomeMessage: '¡Hola! ¿En qué puedo ayudarte?'
    });
&lt;/script&gt;</code></pre>
    </div>
    
    <script src="geekway-chat-widget.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            GeekWayChat.init({
                apiKey: 'demo-api-key-example',
                theme: 'purple',
                position: 'bottom-right',
                welcomeMessage: '¡Hola! Este es un ejemplo del widget GeekWay Chat. ¿En qué puedo ayudarte? 😊'
            });
        });
    </script>
</body>
</html>
EOF

# Crear documentación actualizada
cat > dist/widget/README.md << 'EOF'
# 🎯 GeekWay Chat Widget

Widget de chat embebible para sitios web, construido con Angular Elements.

## 🚀 Instalación vía CDN

### JavaScript + CSS
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@latest/dist/widget/geekway-chat-widget.min.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@latest/dist/widget/geekway-chat-widget.min.js"></script>
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
EOF

echo ""
echo "✅ Widget build completed successfully!"
echo ""
echo "📁 Files created:"
echo "   📄 dist/widget/geekway-chat-widget.js"
echo "   📄 dist/widget/geekway-chat-widget.min.js"
echo "   🎨 dist/widget/geekway-chat-widget.css"  
echo "   🎨 dist/widget/geekway-chat-widget.min.css"
echo "   📖 dist/widget/README.md"
echo "   🌐 dist/widget/example.html"
echo ""
echo "📊 File sizes:"
ls -lh dist/widget/ | grep -E '\.(js|css|html|md)$'
echo ""
echo "🔗 Test the widget locally:"
echo "   open dist/widget/example.html"
echo ""
echo "🌐 CDN URLs (after git push):"
echo "   CSS: https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@latest/dist/widget/geekway-chat-widget.min.css"
echo "   JS:  https://cdn.jsdelivr.net/gh/JacobD36/geekway_bubble_chat@latest/dist/widget/geekway-chat-widget.min.js"
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

EOF

# Crear ejemplo HTML
cat > dist/widget/example.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GeekWay Chat Widget - Demo</title>
    <link rel="stylesheet" href="geekway-chat-widget.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 40px;
            background: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Demo - GeekWay Chat Widget</h1>
        <p>Este es un ejemplo de cómo integrar el widget de chat de GeekWay en tu sitio web.</p>
        <p>El widget aparece como un botón flotante en la esquina inferior derecha.</p>

        <h2>Características:</h2>
        <ul>
            <li>✅ Fácil integración</li>
            <li>✅ Responsive design</li>
            <li>✅ Múltiples temas</li>
            <li>✅ Personalizable</li>
        </ul>
    </div>

    <!-- GeekWay Chat Widget -->
    <geekway-chat-widget
        api-key="demo-key"
        theme="purple"
        position="bottom-right"
        welcome-message="¡Hola! Este es el widget de GeekWay en modo demo. ¿Cómo puedo ayudarte?">
    </geekway-chat-widget>

    <script src="geekway-chat-widget.min.js"></script>
</body>
</html>
EOF

echo "✅ Build completed!"
echo ""
echo "📁 Files generated:"
echo "   dist/widget/geekway-chat-widget.js"
echo "   dist/widget/geekway-chat-widget.min.js"
echo "   dist/widget/geekway-chat-widget.css"
echo "   dist/widget/geekway-chat-widget.min.css"
echo "   dist/widget/README.md"
echo "   dist/widget/example.html"
echo ""
echo "🌐 Test locally: open dist/widget/example.html"
echo "📤 Ready for CDN deployment!"
