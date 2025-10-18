#!/bin/bash

echo "🔨 Iniciando build del widget GeekWay Chat..."

# Crear directorio de distribución
mkdir -p dist/widget

# Hacer backup de main.ts original
echo "📦 Haciendo backup de main.ts..."
cp src/main.ts src/main.ts.backup

# Copiar el widget-direct.ts como main.ts temporalmente
echo "🔄 Usando widget-direct.ts como entrada..."
cp src/widget-direct.ts src/main.ts

# Build de la aplicación Angular
echo "⚙️ Ejecutando ng build..."
ng build

# Verificar que el build fue exitoso
if [ ! -f dist/geekway_chat_bubble/browser/main-*.js ]; then
  echo "❌ Build falló - main.js no encontrado"
  mv src/main.ts.backup src/main.ts
  exit 1
fi

# Encontrar los archivos con hash
MAIN_JS=$(ls dist/geekway_chat_bubble/browser/main-*.js | head -1)
POLYFILLS_JS=$(ls dist/geekway_chat_bubble/browser/polyfills-*.js | head -1)
STYLES_CSS=$(ls dist/geekway_chat_bubble/browser/styles-*.css | head -1)

# Concatenar archivos JavaScript en el orden correcto
echo "🔗 Concatenando archivos JavaScript..."
cat "$POLYFILLS_JS" "$MAIN_JS" > dist/widget/geekway-chat-widget.js

# Minificar usando terser
echo "� Minificando JavaScript..."
npx terser dist/widget/geekway-chat-widget.js \
  --output dist/widget/geekway-chat-widget.min.js \
  --compress \
  --mangle

# Copiar CSS
echo "🎨 Copiando estilos CSS..."
if [ -f "$STYLES_CSS" ]; then
  cp "$STYLES_CSS" dist/widget/geekway-chat-widget.css
  npx terser dist/widget/geekway-chat-widget.css \
    --output dist/widget/geekway-chat-widget.min.css \
    --compress
fi

# Restaurar main.ts original
echo "� Restaurando main.ts original..."
mv src/main.ts.backup src/main.ts

# Verificar archivos creados
echo "✅ Build completado! Archivos generados:"
ls -la dist/widget/

echo "� Widget GeekWay Chat build exitoso!"
