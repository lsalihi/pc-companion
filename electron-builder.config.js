// Electron Builder configuration
// Can be placed in package.json or electron-builder.yml

module.exports = {
  appId: 'com.inkbridge.pccompanion',
  productName: 'InkBridge PC Companion',
  copyright: 'Copyright © 2026 InkBridge Team',
  
  directories: {
    output: 'dist',
    buildResources: 'build'
  },
  
  files: [
    'main.js',
    'server.js',
    'package.json',
    'node_modules/**/*'
  ],
  
  // macOS configuration
  mac: {
    category: 'public.app-category.utilities',
    icon: 'build/icon.icns',
    target: [
      {
        target: 'dmg',
        arch: ['x64', 'arm64']
      },
      {
        target: 'zip',
        arch: ['x64', 'arm64']
      }
    ],
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: 'build/entitlements.mac.plist',
    entitlementsInherit: 'build/entitlements.mac.plist'
  },
  
  dmg: {
    contents: [
      {
        x: 130,
        y: 220
      },
      {
        x: 410,
        y: 220,
        type: 'link',
        path: '/Applications'
      }
    ]
  },
  
  // Windows configuration
  win: {
    icon: 'build/icon.ico',
    target: [
      {
        target: 'nsis',
        arch: ['x64', 'ia32']
      },
      {
        target: 'portable',
        arch: ['x64']
      }
    ]
  },
  
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: false,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'InkBridge PC Companion'
  },
  
  // Linux configuration
  linux: {
    icon: 'build/icon.png',
    target: [
      {
        target: 'AppImage',
        arch: ['x64']
      },
      {
        target: 'deb',
        arch: ['x64']
      }
    ],
    category: 'Utility',
    synopsis: 'Handwriting input companion for InkBridge Pro',
    description: 'Desktop application to receive handwriting input from mobile devices'
  },
  
  deb: {
    depends: [
      'gconf2',
      'gconf-service',
      'libnotify4',
      'libappindicator1',
      'libxtst6',
      'libnss3'
    ]
  },
  
  appImage: {
    license: 'LICENSE'
  },
  
  // Publishing (for auto-update)
  publish: {
    provider: 'github',
    owner: 'lsalihi',
    repo: 'pc-companion'
  }
};
