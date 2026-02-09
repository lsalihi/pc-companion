# 📦 Guide de Déploiement - InkBridge PC Companion

Ce guide vous explique comment créer des exécutables distributablesnpour InkBridge PC Companion.

## 🎯 Résumé Rapide

```bash
# 1. Installation des dépendances
./install.sh

# 2. Construction des paquets
./build.sh all

# 3. Les exécutables sont dans dist/
ls -lh dist/
```

---

## 📋 Prérequis

### Tous les systèmes

- **Node.js 18+** : https://nodejs.org/
- **npm** (inclus avec Node.js)
- **Git**

### Spécifique par plateforme

#### Linux
```bash
sudo apt-get install build-essential
```

#### Windows
- Visual Studio Build Tools
- Python 2.7 ou 3.x

#### macOS
```bash
xcode-select --install
```

---

## 🔧 Installation

### 1. Cloner le repository
```bash
git clone https://github.com/lsalihi/pc-companion.git
cd pc-companion
```

### 2. Installer les dépendances
```bash
./install.sh
# Ou manuellement:
npm install
```

### 3. Installer les dépendances de développement
```bash
npm install --save-dev electron-builder pkg
```

---

## 🏗️ Construction des Exécutables

### Option 1: Build Automatique (Recommandé)

```bash
# Construire pour toutes les plateformes
./build.sh all

# Ou pour une plateforme spécifique
./build.sh linux
./build.sh windows
./build.sh mac
```

### Option 2: Build Manuel

#### Linux (AppImage + DEB)
```bash
npm run build:linux
```

**Sortie:**
- `dist/InkBridge-PC-Companion-1.0.0.AppImage` (portable)
- `dist/inkbridge-pc-companion_1.0.0_amd64.deb` (installation)

#### Windows (NSIS + Portable)
```bash
npm run build:windows
```

**Sortie:**
- `dist/InkBridge-PC-Companion-Setup-1.0.0.exe` (installateur)
- `dist/InkBridge-PC-Companion-1.0.0-win.exe` (portable)

#### macOS (DMG + ZIP)
```bash
npm run build:mac
```

**Sortie:**
- `dist/InkBridge-PC-Companion-1.0.0.dmg` (image disque)
- `dist/InkBridge-PC-Companion-1.0.0-mac.zip` (archive)

---

## 📦 Types de Paquets

### Linux

#### AppImage (Recommandé)
- ✅ Portable, pas d'installation requise
- ✅ Fonctionne sur toutes les distributions
- ✅ Auto-containé avec toutes les dépendances
- 📌 Utilisation : `chmod +x *.AppImage && ./InkBridge*.AppImage`

#### DEB
- ✅ Installation système via `dpkg` ou double-clic
- ✅ Intégration au menu d'applications
- 📌 Utilisation : `sudo dpkg -i *.deb`

### Windows

#### NSIS Installer
- ✅ Installation guidée
- ✅ Raccourcis Bureau/Menu Démarrer
- ✅ Désinstallation propre
- 📌 Double-clic sur l'exe

#### Portable
- ✅ Pas d'installation
- ✅ Exécution depuis USB possible
- 📌 Double-clic sur l'exe

### macOS

#### DMG
- ✅ Interface de glisser-déposer standard
- ✅ Format Mac natif
- 📌 Ouvrir → Glisser dans Applications

#### ZIP
- ✅ Archive simple
- ✅ Extraction et exécution
- 📌 Décompresser → Glisser dans Applications

---

## 🎨 Personnalisation

### Icônes

Placez vos icônes dans `build/`:
- `icon.png` (512x512) pour Linux
- `icon.ico` (256x256) pour Windows  
- `icon.icns` pour macOS

```bash
# Générer les icônes à partir d'un PNG
# Voir build/README.md pour les détails
```

### Configuration

Éditez `electron-builder.config.js` pour :
- Changer l'App ID
- Personnaliser les cibles de build
- Modifier les options NSIS
- Configurer la signature de code

---

## 🔐 Signature de Code (Production)

### Windows
```javascript
// electron-builder.config.js
win: {
  certificateFile: 'path/to/cert.pfx',
  certificatePassword: process.env.CSC_PASSWORD
}
```

### macOS
```javascript
// electron-builder.config.js
mac: {
  identity: 'Developer ID Application: Your Name (TEAM_ID)',
  hardenedRuntime: true,
  provisioningProfile: 'path/to/profile.provisionprofile'
}
```

---

## 📤 Distribution

### Option 1: GitHub Releases

1. **Créer un tag de version**
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

2. **Créer une release sur GitHub**
- Aller sur https://github.com/lsalihi/pc-companion/releases
- "Create new release"
- Upload les fichiers depuis `dist/`

3. **Auto-update** (optionnel)
```javascript
// main.js
const { autoUpdater } = require('electron-updater');
autoUpdater.checkForUpdatesAndNotify();
```

### Option 2: Site Web

Uploadez sur votre serveur:
```bash
scp dist/* user@server:/var/www/downloads/
```

### Option 3: Autres Stores

- **Snapcraft** (Linux): https://snapcraft.io/
- **Microsoft Store** (Windows): https://developer.microsoft.com/
- **Mac App Store** (macOS): https://developer.apple.com/

---

## ✅ Checklist de Release

- [ ] Version bumped dans `package.json`
- [ ] `CHANGELOG.md` mis à jour
- [ ] Tests passent sur toutes les plateformes
- [ ] Documentation à jour
- [ ] Icônes personnalisées créées
- [ ] Builds testés sur OS cibles
- [ ] Signature de code (si production)
- [ ] Release notes rédigées
- [ ] Tag Git créé
- [ ] Release GitHub publiée

---

## 🧪 Tests

### Test Local
```bash
# Démarrer en mode dev
npm run dev

# Test de l'exécutable
cd dist
./InkBridge-PC-Companion-1.0.0.AppImage  # Linux
# ou double-clic sur .exe/.dmg
```

### Test sur Machine Virtuelle

Recommandé pour tester sur OS différent:
- **VirtualBox**: https://www.virtualbox.org/
- **VMware**: https://www.vmware.com/
- **Parallels** (macOS): https://www.parallels.com/

---

## 🐛 Dépannage

### Build échoue sur Linux

**Erreur:** `Cannot find module 'electron-builder'`
```bash
npm install --save-dev electron-builder
```

**Erreur:** Permission denied
```bash
chmod +x build.sh install.sh
```

### Build échoue sur Windows

**Erreur:** Python not found
```bash
# Installer Python depuis python.org
npm config set python python2.7
```

**Erreur:** Visual Studio Build Tools
- Installer depuis : https://visualstudio.microsoft.com/downloads/

### Build échoue sur macOS

**Erreur:** xcrun: error
```bash
xcode-select --install
```

**Erreur:** Codesign wants to access keychain
- Normal, cliquez "Toujours autoriser"

---

## 📊 Tailles Approximatives

| Plateforme | Format | Taille |
|------------|--------|---------|
| Linux | AppImage | ~150 MB |
| Linux | DEB | ~70 MB |
| Windows | NSIS | ~120 MB |
| Windows | Portable | ~115 MB |
| macOS | DMG | ~140 MB |
| macOS | ZIP | ~130 MB |

*Les tailles incluent Electron + Node.js + dépendances*

---

## 🚀 Optimisations

### Réduire la taille

```javascript
// electron-builder.config.js
compression: 'maximum',
files: [
  '!**/node_modules/*/{CHANGELOG.md,README.md,README}',
  '!**/node_modules/.bin',
  '!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}',
]
```

### Build plus rapide

```bash
# Build seulement pour l'architecture actuelle
npm run build:linux -- --x64
```

---

## 📚 Ressources

- **Electron Builder Docs**: https://www.electron.build/
- **Electron Docs**: https://www.electronjs.org/docs
- **Node.js Packaging**: https://nodejs.org/en/docs/

---

## 💡 Prochaines Étapes

Après avoir créé vos exécutables :

1. **Tester** sur les OS cibles
2. **Créer une release** sur GitHub
3. **Annoncer** sur vos canaux de communication
4. **Recueillir feedback** des utilisateurs
5. **Itérer** et améliorer

---

## 📧 Support

Besoin d'aide pour le déploiement ?

- **Issues**: https://github.com/lsalihi/pc-companion/issues
- **Email**: contact@inkbridge.app
- **Documentation**: https://github.com/lsalihi/pc-companion/wiki

---

**Bon déploiement! 🎉**
