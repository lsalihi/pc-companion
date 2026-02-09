# CI/CD Pipeline Documentation

This document describes the automated build and deployment pipelines for InkBridge PC Companion.

## Overview

The project uses **GitHub Actions** for continuous integration and deployment. Three main workflows are configured:

1. **Build and Release** - Builds executables for all platforms and creates releases
2. **Test** - Runs tests on multiple platforms and Node versions
3. **Nightly Build** - Creates nightly builds for testing

## Workflows

### 1. Build and Release (`build.yml`)

**Triggers:**
- Push to tags matching `v*` (e.g., `v1.0.0`)
- Pull requests to `main`
- Manual trigger via workflow_dispatch

**What it does:**
- Builds executables for Linux, Windows, and macOS
- Creates platform-specific artifacts:
  - **Linux**: AppImage, DEB
  - **Windows**: NSIS installer, Portable EXE
  - **macOS**: DMG, ZIP
- Automatically creates GitHub Release with all artifacts (on tag push)

**Usage:**
```bash
# Create and push a new version tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# GitHub Actions will automatically:
# 1. Build for all platforms
# 2. Create a release
# 3. Upload all executables
```

### 2. Test (`test.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

**What it does:**
- Tests on Linux, Windows, and macOS
- Tests with Node.js 18 and 20
- Runs linting
- Runs tests
- Verifies builds work

**Matrix:**
```yaml
os: [ubuntu-latest, windows-latest, macos-latest]
node-version: [18, 20]
# Total: 6 test combinations
```

### 3. Nightly Build (`nightly.yml`)

**Triggers:**
- Scheduled: Every day at 2 AM UTC
- Manual trigger via workflow_dispatch

**What it does:**
- Builds latest code from main branch
- Creates artifacts with date stamp
- Retains artifacts for 7 days
- Useful for testing unreleased changes

## Creating a Release

### Automatic Release (Recommended)

1. **Update Version**
   ```bash
   # Update version in package.json
   npm version patch  # or minor, or major
   ```

2. **Update CHANGELOG.md**
   ```bash
   # Add version entry and changes
   vim CHANGELOG.md
   ```

3. **Commit and Tag**
   ```bash
   git add .
   git commit -m "chore: bump version to 1.0.1"
   git push
   
   # Create and push tag
   git tag -a v1.0.1 -m "Release 1.0.1"
   git push origin v1.0.1
   ```

4. **Wait for GitHub Actions**
   - Go to: https://github.com/lsalihi/pc-companion/actions
   - Monitor the build progress
   - Check the release: https://github.com/lsalihi/pc-companion/releases

### Manual Release

1. **Build Locally**
   ```bash
   ./build.sh all
   ```

2. **Create Release Manually**
   - Go to GitHub → Releases → "Draft a new release"
   - Create tag: `v1.0.1`
   - Add release notes
   - Upload files from `dist/` directory
   - Publish release

## Build Artifacts

### Artifact Structure

```
dist-all/
├── linux-build/
│   ├── InkBridge-PC-Companion-1.0.0.AppImage
│   └── inkbridge-pc-companion_1.0.0_amd64.deb
├── windows-build/
│   ├── InkBridge-PC-Companion-Setup-1.0.0.exe
│   └── InkBridge-PC-Companion-1.0.0.exe (portable)
└── macos-build/
    ├── InkBridge-PC-Companion-1.0.0.dmg
    └── InkBridge-PC-Companion-1.0.0-mac.zip
```

### Download Artifacts

From GitHub Actions:
1. Go to Actions tab
2. Click on a completed workflow run
3. Scroll to "Artifacts" section
4. Download the artifacts you need

From Releases:
1. Go to Releases tab
2. Click on the version
3. Download from "Assets" section

## Environment Variables

### Required Secrets

Add these in GitHub repository settings (Settings → Secrets → Actions):

| Secret | Required For | Description |
|--------|-------------|-------------|
| `GITHUB_TOKEN` | All workflows | Auto-provided by GitHub |
| `CSC_LINK` | macOS signing | Certificate file (base64) |
| `CSC_KEY_PASSWORD` | macOS signing | Certificate password |
| `WIN_CSC_LINK` | Windows signing | Certificate file (base64) |
| `WIN_CSC_KEY_PASSWORD` | Windows signing | Certificate password |

### Optional Secrets

| Secret | Optional For | Description |
|--------|--------------|-------------|
| `APPLE_ID` | macOS notarization | Apple ID email |
| `APPLE_ID_PASSWORD` | macOS notarization | App-specific password |
| `APPLE_TEAM_ID` | macOS notarization | Team ID |

## Code Signing

### macOS Code Signing

```yaml
# In build.yml, add:
- name: Import Code Signing Certificate
  if: matrix.os == 'macos-latest'
  env:
    CSC_LINK: ${{ secrets.CSC_LINK }}
    CSC_KEY_PASSWORD: ${{ secrets.CSC_KEY_PASSWORD }}
  run: |
    echo "$CSC_LINK" | base64 --decode > certificate.p12
    security create-keychain -p actions build.keychain
    security import certificate.p12 -k build.keychain -P "$CSC_KEY_PASSWORD"
```

### Windows Code Signing

```yaml
# In electron-builder.config.js
win: {
  certificateFile: process.env.WIN_CSC_LINK,
  certificatePassword: process.env.WIN_CSC_KEY_PASSWORD,
  signDlls: true
}
```

## Troubleshooting

### Build Fails

**Check the logs:**
1. Go to Actions tab
2. Click on the failed workflow
3. Click on the failed job
4. Expand the failed step

**Common issues:**

1. **Node modules installation fails**
   ```bash
   # Solution: Clear cache
   # In workflow, add:
   - name: Clear npm cache
     run: npm cache clean --force
   ```

2. **Build fails on specific platform**
   ```bash
   # Solution: Test locally with Docker
   docker run -it --rm -v $(pwd):/app -w /app node:18 npm run build
   ```

3. **Artifact upload fails**
   ```bash
   # Solution: Check paths in workflow
   # Ensure dist/ directory exists and has files
   ```

### Release Not Created

**Check:**
1. Tag format is correct (`v*`)
2. Workflow has completed successfully
3. GitHub token has necessary permissions
4. Release step didn't fail (check logs)

## Performance Optimization

### Caching

The workflows use caching for faster builds:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'  # Caches node_modules
```

### Parallel Builds

Builds run in parallel using matrix strategy:

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
# All 3 OS builds run simultaneously
```

### Build Time

Typical build times:
- **Linux**: ~5-8 minutes
- **Windows**: ~8-12 minutes
- **macOS**: ~10-15 minutes

Total pipeline time: ~15-20 minutes (parallel execution)

## Monitoring

### Status Badges

Add to README.md:

```markdown
[![Build](https://github.com/lsalihi/pc-companion/actions/workflows/build.yml/badge.svg)](https://github.com/lsalihi/pc-companion/actions/workflows/build.yml)
[![Test](https://github.com/lsalihi/pc-companion/actions/workflows/test.yml/badge.svg)](https://github.com/lsalihi/pc-companion/actions/workflows/test.yml)
```

### Notifications

Configure in repository settings:
- Settings → Notifications
- Choose notification preferences
- Add email or webhook URLs

## Local Testing

Before pushing tags, test locally:

```bash
# Test build script
./build.sh linux

# Verify package.json scripts
npm run build:linux
npm run build:windows  # (on Windows)
npm run build:mac      # (on macOS)

# Test installation
npm ci  # Use same command as CI
npm test
```

## Best Practices

1. **Always test locally first**
2. **Update CHANGELOG.md before tagging**
3. **Use semantic versioning** (major.minor.patch)
4. **Create release notes** with meaningful descriptions
5. **Test artifacts** before publishing
6. **Keep workflows updated** with Dependabot

## Future Enhancements

- [ ] Add automated testing with Jest
- [ ] Implement E2E tests with Playwright
- [ ] Add code coverage reporting
- [ ] Set up auto-update mechanism
- [ ] Add Docker builds
- [ ] Implement beta/alpha release channels

## Resources

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Electron Builder CI](https://www.electron.build/multi-platform-build)
- [Action: Setup Node](https://github.com/actions/setup-node)
- [Action: Upload Artifact](https://github.com/actions/upload-artifact)
- [Action: Create Release](https://github.com/softprops/action-gh-release)

## Support

For CI/CD issues:
- Open an issue with `ci` label
- Include workflow run link
- Attach relevant logs

---

**Last Updated**: 2026-02-09
