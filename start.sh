#!/bin/bash

echo "🚀 Démarrage du serveur InkBridge Pro PC Companion..."
echo "=================================================="

cd "$(dirname "$0")"

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé !"
    exit 1
fi

# Vérifier si les dépendances sont installées
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Libérer le port 3001 si occupé
PORT=3001
echo "🔍 Vérification du port $PORT..."
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Port $PORT occupé, libération..."
    lsof -ti:$PORT | xargs kill -9 2>/dev/null
    sleep 1
    echo "✅ Port $PORT libéré"
else
    echo "✅ Port $PORT disponible"
fi

# Démarrer le serveur
echo "🌐 Démarrage du serveur sur le port $PORT..."
node server.js
