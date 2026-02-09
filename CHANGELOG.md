# Changelog

All notable changes to InkBridge PC Companion will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- 🚀 CI/CD Pipeline with GitHub Actions
  - Automated builds for Windows, macOS, and Linux
  - Automatic release creation on version tags
  - Multi-platform testing on Node.js 18 and 20
  - Nightly builds for development testing
  - GitHub Actions workflows for build, test, and release
  - Issue templates for bugs and feature requests
  - Pull request template
  - Dependabot configuration for automated dependency updates
  - Comprehensive CI/CD documentation

### Changed
- Enhanced README with build status badges
- Updated .gitignore with CI/CD artifacts

## [1.0.0] - 2026-02-09

### Added
- 🎉 Initial release of InkBridge PC Companion
- Real-time WebSocket communication with mobile app
- QR code generation for easy device pairing
- Electron-based desktop interface
- RobotJS integration for keyboard simulation
- Clipboard integration with Clipboardy
- Support for handwriting strokes transmission
- Gesture recognition (space, backspace, enter, undo)
- Punctuation support
- Cross-platform support (Windows, macOS, Linux)
- Express HTTP server for status endpoints
- Connection status tracking
- Network interface detection for local IP
- Session type detection (Wayland/X11)
- Professional build system with electron-builder
- Comprehensive documentation

### Features
- `/status` endpoint for health checks
- `/qr` endpoint for QR code retrieval
- WebSocket events:
  - `handwriting` - Receive handwriting strokes
  - `text` - Receive recognized text
  - `gesture` - Handle gestures
  - `punctuation` - Handle punctuation marks
  - `connection` - Track client connections
  - `disconnect` - Handle disconnections

### Developer Features
- Professional package.json configuration
- Build scripts for all platforms
- Documentation structure
- Git repository setup
- MIT License

## [Unreleased]

### Planned Features
- Text recognition with ML Kit integration
- Multi-device support
- Session history
- Customizable shortcuts
- Dark mode support
- Settings panel
- Auto-update functionality
- Internationalization (i18n)
- Performance metrics
- Advanced clipboard management

---

## Version History Legend

- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` for vulnerability fixes
