# 📥 Téléchargement - InkBridge PC Companion

## Liens de Téléchargement Directs

### 🔥 Version Stable (Recommandée)

**Version actuelle : 1.0.0**

#### Windows
- **[Télécharger l'installateur (recommandé)](https://github.com/lsalihi/pc-companion/releases/latest/download/InkBridge-PC-Companion-Setup-1.0.0.exe)**
  - Installation complète avec raccourcis
  - ~120 MB
  
- **[Télécharger portable](https://github.com/lsalihi/pc-companion/releases/latest/download/InkBridge-PC-Companion-1.0.0.exe)**
  - Pas d'installation requise
  - ~115 MB

#### macOS
- **[Télécharger DMG (recommandé)](https://github.com/lsalihi/pc-companion/releases/latest/download/InkBridge-PC-Companion-1.0.0.dmg)**
  - Double-clic → Glisser dans Applications
  - ~140 MB
  
- **[Télécharger ZIP](https://github.com/lsalihi/pc-companion/releases/latest/download/InkBridge-PC-Companion-1.0.0-mac.zip)**
  - Archive compressée
  - ~130 MB

#### Linux
- **[Télécharger AppImage (recommandé)](https://github.com/lsalihi/pc-companion/releases/latest/download/InkBridge-PC-Companion-1.0.0.AppImage)**
  - Fonctionne sur toutes les distributions
  - Portable, pas d'installation
  - ~150 MB
  
- **[Télécharger DEB](https://github.com/lsalihi/pc-companion/releases/latest/download/inkbridge-pc-companion_1.0.0_amd64.deb)**
  - Pour Ubuntu/Debian
  - Installation via dpkg
  - ~70 MB

---

## 📋 Toutes les Versions

**[Voir toutes les versions disponibles →](https://github.com/lsalihi/pc-companion/releases)**

---

## 🚀 Installation

### Windows

#### Option 1 : Installateur (Recommandé)
1. Téléchargez `InkBridge-PC-Companion-Setup-1.0.0.exe`
2. Double-cliquez sur le fichier
3. Suivez l'assistant d'installation
4. Lancez depuis le menu Démarrer ou le raccourci Bureau

#### Option 2 : Portable
1. Téléchargez `InkBridge-PC-Companion-1.0.0.exe`
2. Mettez le fichier où vous voulez
3. Double-cliquez pour lancer
4. Aucune installation requise

### macOS

1. Téléchargez `InkBridge-PC-Companion-1.0.0.dmg`
2. Double-cliquez pour ouvrir
3. Glissez l'icône InkBridge dans le dossier Applications
4. Lancez depuis le Launchpad ou Applications

**⚠️ Si macOS bloque l'application :**
```bash
# Méthode 1 : Dans Préférences Système
Sécurité et confidentialité → Cliquez "Ouvrir quand même"

# Méthode 2 : En ligne de commande
xattr -cr /Applications/InkBridge\ PC\ Companion.app
```

### Linux

#### Option 1 : AppImage (Plus Simple)
```bash
# 1. Téléchargez le fichier
wget https://github.com/lsalihi/pc-companion/releases/latest/download/InkBridge-PC-Companion-1.0.0.AppImage

# 2. Rendez-le exécutable
chmod +x InkBridge-PC-Companion-1.0.0.AppImage

# 3. Lancez
./InkBridge-PC-Companion-1.0.0.AppImage
```

#### Option 2 : DEB (Ubuntu/Debian)
```bash
# 1. Téléchargez le fichier
wget https://github.com/lsalihi/pc-companion/releases/latest/download/inkbridge-pc-companion_1.0.0_amd64.deb

# 2. Installez
sudo dpkg -i inkbridge-pc-companion_1.0.0_amd64.deb

# 3. Si des dépendances manquent
sudo apt-get install -f

# 4. Lancez depuis le menu Applications ou
inkbridge-pc-companion
```

---

## ✅ Vérification de l'Installation

Après l'installation, vérifiez que tout fonctionne :

1. **Lancez l'application**
   - Windows : Menu Démarrer → InkBridge PC Companion
   - macOS : Launchpad → InkBridge PC Companion
   - Linux : Menu Applications → InkBridge PC Companion

2. **Vérifiez le QR Code**
   - Une fenêtre avec un QR code devrait s'afficher
   - L'adresse IP de votre PC devrait être visible

3. **Testez la connexion**
   - Ouvrez InkBridge Pro sur votre mobile
   - Scannez le QR code
   - Écrivez quelque chose pour tester

---

## 🔄 Mise à Jour

### Mise à jour automatique (Futur)
Les futures versions incluront des mises à jour automatiques. L'application vous notifiera quand une nouvelle version est disponible.

### Mise à jour manuelle
1. Désinstallez l'ancienne version (Windows/macOS) ou téléchargez simplement la nouvelle (Linux AppImage)
2. Téléchargez la dernière version depuis la page des releases
3. Installez comme décrit ci-dessus

---

## 📊 Configuration Système

### Configuration Minimale
- **OS** : Windows 10+, macOS 10.13+, Ubuntu 18.04+ (ou équivalent)
- **RAM** : 2 GB
- **Espace disque** : 200 MB
- **Réseau** : WiFi (même réseau que le mobile)

### Configuration Recommandée
- **OS** : Dernière version
- **RAM** : 4 GB ou plus
- **Réseau** : WiFi 5 GHz pour meilleures performances

---

## 🔐 Sécurité

### Vérification des Téléchargements

Tous les fichiers sont signés et peuvent être vérifiés :

**Checksums (à venir) :**
```bash
# Linux/macOS
sha256sum InkBridge-PC-Companion-*.AppImage

# Comparer avec le checksum publié sur GitHub Releases
```

### Antivirus

Certains antivirus peuvent bloquer l'application car elle :
- Utilise le réseau local
- Simule des frappes clavier
- N'est pas encore signée par un certificat reconnu

**C'est normal et sans danger.** Ajoutez une exception dans votre antivirus si nécessaire.

---

## 🆘 Problèmes de Téléchargement ?

### Téléchargement lent
- Essayez avec un autre navigateur
- Utilisez un gestionnaire de téléchargement
- Téléchargez pendant les heures creuses

### Fichier corrompu
- Re-téléchargez le fichier
- Vérifiez l'espace disque disponible
- Désactivez temporairement l'antivirus

### Lien brisé / Erreur 404
- Vérifiez que la version existe sur [la page Releases](https://github.com/lsalihi/pc-companion/releases)
- Utilisez le lien "latest" pour toujours avoir la dernière version

---

## 🌟 Versions Alternatives

### Version Nightly (Développement)
Pour tester les dernières fonctionnalités (peut être instable) :
- [Télécharger les builds nightly](https://github.com/lsalihi/pc-companion/actions/workflows/nightly.yml)
- Nécessite un compte GitHub
- Cliquez sur le dernier run → Artifacts

### Build depuis les Sources
Pour les développeurs :
```bash
git clone https://github.com/lsalihi/pc-companion.git
cd pc-companion
npm install
npm start
```

---

## 📱 Application Mobile

N'oubliez pas de télécharger aussi l'application mobile InkBridge Pro :
- **Android** : [Google Play Store](#)
- **iOS** : [App Store](#)

---

## 💬 Support

Besoin d'aide ?
- **Guide utilisateur** : [USER_GUIDE.md](docs/USER_GUIDE.md)
- **Dépannage** : [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
- **Issues** : [Signaler un problème](https://github.com/lsalihi/pc-companion/issues)
- **Email** : support@inkbridge.app

---

## 📢 Notifications de Mise à Jour

Pour être notifié des nouvelles versions :
1. **Watch** le repository sur GitHub
2. Sélectionnez "Releases only"
3. Recevez un email à chaque nouvelle version

Ou suivez-nous :
- Twitter : [@InkBridgeApp](#)
- Discord : [Rejoindre la communauté](#)

---

**Version de ce guide : 1.0.0**  
**Dernière mise à jour : 2026-02-09**
