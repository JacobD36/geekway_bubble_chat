#!/bin/bash

echo "🚀 Building GeekWay Chat Widget..."

# Limpiar directorio de distribución
rm -rf dist/

# Build para producción
ng build --configuration production --output-hashing none

# Crear directorio para el widget
mkdir -p dist/widget

# Combinar archivos JS
echo "📦 Combining JavaScript files..."
cat dist/geekway_chat_bubble/browser/polyfills.js \
    dist/geekway_chat_bubble/browser/main.js > dist/widget/geekway-chat-widget.js

# Copiar CSS
echo "🎨 Processing CSS..."
cp dist/geekway_chat_bubble/browser/styles.css dist/widget/geekway-chat-widget.css

# Minificar archivos
echo "🗜️ Minifying files..."
npx terser dist/widget/geekway-chat-widget.js -o dist/widget/geekway-chat-widget.min.js --compress --mangle
npx clean-css-cli dist/widget/geekway-chat-widget.css -o dist/widget/geekway-chat-widget.min.css

# Crear documentación
cat > dist/widget/README.md << 'EOF'
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
