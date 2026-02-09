# Contributing to InkBridge PC Companion

First off, thank you for considering contributing to InkBridge PC Companion! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the proposed feature**
- **Explain why this enhancement would be useful**
- **List any alternative solutions you've considered**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description

## Development Setup

```bash
# Clone your fork
git clone https://github.com/lsalihi/pc-companion.git
cd pc-companion

# Install dependencies
npm install

# Start development
npm start
```

## Coding Standards

### JavaScript Style Guide

- Use ES6+ features
- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Add comments for complex logic
- Keep functions small and focused

### Example:

```javascript
// Good
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    // Process each interface
  }
}

// Avoid
function getLocalIP(){
    var interfaces=os.networkInterfaces()
    for(var name in interfaces){
        // ...
    }
}
```

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

**Examples:**
```
feat: add dark mode support
fix: resolve connection timeout issue
docs: update installation instructions
```

## Testing

```bash
# Run tests (when available)
npm test

# Run linting
npm run lint
```

## Building

```bash
# Build for all platforms
npm run build

# Build for specific platform
npm run build:linux
npm run build:windows
npm run build:mac
```

## Project Structure

```
pc-companion/
├── main.js              # Electron main process
├── server.js            # WebSocket/HTTP server
├── docs/                # Documentation
├── build/               # Build resources (icons, etc.)
├── dist/                # Build output
└── node_modules/        # Dependencies
```

## Documentation

- Update README.md for user-facing changes
- Update docs/ for detailed documentation
- Add JSDoc comments for new functions
- Update CHANGELOG.md for notable changes

## Questions?

Feel free to open an issue with the `question` label or reach out to:
- Email: contact@inkbridge.app
- GitHub Discussions

## Recognition

Contributors will be recognized in:
- README.md Contributors section
- Release notes
- Project documentation

Thank you for contributing! 🙏
