#!/bin/bash

echo "🛑 Arrêt du serveur InkBridge Pro PC Companion..."
echo "=================================================="

PORT=3001

# Chercher les processus utilisant le port
PIDS=$(lsof -ti:$PORT 2>/dev/null)

if [ -z "$PIDS" ]; then
    echo "ℹ️  Aucun serveur en cours d'exécution sur le port $PORT"
else
    echo "🔍 Processus trouvés : $PIDS"
    echo "$PIDS" | xargs kill -9 2>/dev/null
    sleep 1
    echo "✅ Serveur arrêté"
fi

# Nettoyer les processus node orphelins
NODE_PIDS=$(pgrep -f "node server.js" 2>/dev/null)
if [ ! -z "$NODE_PIDS" ]; then
    echo "🧹 Nettoyage des processus Node orphelins..."
    echo "$NODE_PIDS" | xargs kill -9 2>/dev/null
    echo "✅ Processus nettoyés"
fi

echo "=================================================="
echo "✅ Arrêt complet"
