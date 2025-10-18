#!/bin/bash

echo "🔨 Build Simple - GeekWay Chat Widget (Vanilla JS)..."

# Crear directorio de distribución
mkdir -p dist/widget

# Copiar el archivo JavaScript vanilla directamente
echo "📦 Copiando widget vanilla..."
cp src/widget-vanilla.js dist/widget/geekway-chat-widget.js

# Minificar usando terser
echo "📦 Minificando JavaScript..."
npx terser dist/widget/geekway-chat-widget.js \
  --output dist/widget/geekway-chat-widget.min.js \
  --compress \
  --mangle

# Crear CSS vacío (ya que los estilos están incluidos en el JS)
echo "🎨 Creando archivo CSS vacío..."
echo "/* Estilos incluidos en el JavaScript */" > dist/widget/geekway-chat-widget.css
echo "/* Estilos incluidos en el JavaScript */" > dist/widget/geekway-chat-widget.min.css

# Verificar archivos creados
echo "✅ Build completado! Archivos generados:"
ls -la dist/widget/

echo "🎉 Widget GeekWay Chat (Vanilla JS) build exitoso!"
