# NanoKVM-USB Win32 Desktop

This is the NanoKVM-USB Win32 desktop version project.

**Win32 fork by TrissElan** - Optimized for Windows 32-bit systems with enhanced video/audio processing and FPS control.

## Features

- ✅ **Windows 32-bit optimized build**
- ✅ **Enhanced video/audio processing** with configurable settings
- ✅ **FPS selection** (15/30/45/60 FPS) in video menu
- ✅ **Audio optimization** (disabled echo cancellation, auto gain control, noise suppression)
- ✅ **Update functionality removed** for lightweight operation
- ✅ **Serial port support** for keyboard/mouse capture

## Development

Windows build tool chain:

```shell
# Install dependencies
npm install

# Start development server
npm run dev
```

## Compile

```shell
# For Windows 32-bit (ia32)
npm run build:win
```

## Installation

After building, you'll find the installer in the `dist` folder:
- `NanoKVM-USB Win32-1.0.0-win32-setup.exe`

## Video Settings

The application now includes enhanced video processing options:

- **FPS Control**: Select between 15, 30, 45, or 60 FPS in the video menu
- **Audio Optimization**: Disabled processing for better performance
  - Echo cancellation: OFF
  - Auto gain control: OFF  
  - Noise suppression: OFF
- **High-quality audio**: 44.1kHz, 2-channel stereo

## Repository

- **Original**: [sipeed/NanoKVM-USB](https://github.com/sipeed/NanoKVM-USB)
- **Win32 Fork**: [TrissElan/NanoKVM-USB-Win32](https://github.com/TrissElan/NanoKVM-USB-Win32)
