# 🖊️ InkBridge Pro - PC Companion

Application desktop pour recevoir l'écriture manuscrite depuis l'application mobile InkBridge Pro.

## 🚀 Installation

```bash
cd pc-companion
npm install
```

## 📱 Utilisation

### Démarrer le serveur

```bash
npm start
```

Cela va :
1. Démarrer le serveur Socket.IO sur le port 3001
2. Ouvrir une fenêtre Electron avec le QR code à scanner
3. Afficher l'adresse IP locale dans la console

### Scanner le QR Code

1. Lancez l'application mobile InkBridge Pro sur votre téléphone
2. Appuyez sur "Connecter au PC"
3. Scannez le QR code affiché sur votre ordinateur
4. Une fois connecté, vous pouvez commencer à écrire !

## 🔧 Fonctionnalités

- ✅ Génération automatique de QR code avec l'IP locale
- ✅ Communication temps réel via WebSocket (Socket.IO)
- ✅ Réception de l'écriture manuscrite
- ✅ Réception des gestes (espace, retour arrière, entrée, annuler)
- ✅ Réception de la ponctuation
- ✅ Interface utilisateur Electron moderne

## 🛠️ Architecture

```
pc-companion/
├── main.js          # Application Electron principale
├── server.js        # Serveur Socket.IO + Express
├── package.json     # Dépendances
└── README.md        # Ce fichier
```

## 📡 Communication

Le serveur écoute sur tous les événements suivants depuis l'application mobile :

- `handwriting` : Données de tracé manuscrit
- `gesture` : Gestes (space, backspace, enter, undo)
- `punctuation` : Symboles de ponctuation

## 🔒 Sécurité

⚠️ **Note** : Cette version utilise CORS avec `origin: "*"` pour le développement.
Pour la production, configurez des origines spécifiques.

## 📝 Développement futur

- [ ] Intégration de RobotJS pour simuler vraiment le clavier
- [ ] Reconnaissance de texte manuscrit avec ML Kit
- [ ] Support multi-langues
- [ ] Historique des sessions
- [ ] Paramètres avancés

## 🐛 Debug

Pour voir les logs détaillés :
- Les événements Socket.IO sont affichés dans la console
- Les données reçues sont loggées avec des emojis pour une meilleure lisibilité

## 💡 Astuce

Si le QR code ne se charge pas, vérifiez que :
1. Votre PC et téléphone sont sur le même réseau WiFi
2. Le pare-feu n'bloque pas le port 3001
3. L'adresse IP affichée est correcte
