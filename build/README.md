# Build Resources

This directory contains resources used during the build process.

## Icons

Icons are required for building platform-specific packages:

- `icon.png` - Linux icon (512x512 or 256x256 PNG)
- `icon.ico` - Windows icon (256x256 ICO)
- `icon.icns` - macOS icon (512x512 ICNS)

## Creating Icons

### From PNG

1. **Windows (.ico)**
   ```bash
   # Using ImageMagick
   convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico
   ```

2. **macOS (.icns)**
   ```bash
   # Using iconutil (macOS only)
   mkdir icon.iconset
   sips -z 16 16     icon.png --out icon.iconset/icon_16x16.png
   sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
   sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
   sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
   sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
   sips -z 256 256   icon.png --out icon.iconset/icon_128x128@2x.png
   sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
   sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
   sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
   iconutil -c icns icon.iconset
   ```

3. **Linux (.png)**
   - Use PNG directly, no conversion needed

## Online Tools

If you don't have the tools installed:
- https://cloudconvert.com/ico-converter
- https://iconverticons.com/online/

## Guidelines

- Use simple, recognizable designs
- Ensure good contrast
- Test on light and dark backgrounds
- Follow platform-specific design guidelines
