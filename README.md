# NanoKVM-USB Win32 Desktop

A Windows 32-bit fork of the [NanoKVM-USB](https://github.com/sipeed/NanoKVM-USB) desktop application by Sipeed.

**Win32 fork by TrissElan** - Optimized for Windows 32-bit systems with enhanced video/audio processing and FPS control.

## Features

- ✅ **Windows 32-bit optimized build** (ia32 architecture)
- ✅ **Enhanced video/audio processing** with configurable settings
- ✅ **FPS selection** (15/30/45/60 FPS) in video menu with GaugeIcon
- ✅ **Audio optimization** (disabled echo cancellation, auto gain control, noise suppression)
- ✅ **Dual monitor support** with fixed mouse coordinate issues
- ✅ **Update functionality removed** for lightweight operation
- ✅ **Serial port support** for keyboard/mouse capture (full KVM functionality)
- ✅ **Seamless FPS switching** without video disconnection
- ✅ **Clean production code** (all console.log removed)

## Improvements Over ARM64 Version

Unlike the ARM64 fork which had serialport compatibility issues, this Win32 version:

- ✅ **Full KVM functionality** - Video, Keyboard, and Mouse capture all working
- ✅ **Stable serialport support** - No compatibility issues with Windows 32-bit
- ✅ **Enhanced user experience** - Smooth FPS changes, dual monitor support
- ✅ **Production ready** - Clean code without debug logs

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

## Mouse Support

- **Absolute Mode**: Fixed dual monitor coordinate issues
- **Relative Mode**: Improved sensitivity and stability
- **Seamless switching**: Between absolute and relative modes

## Repository

- **Original**: [sipeed/NanoKVM-USB](https://github.com/sipeed/NanoKVM-USB)
- **ARM64 Fork**: [TrissElan/NanoKVM-USB-ARM64](https://github.com/TrissElan/NanoKVM-USB-ARM64)
- **Win32 Fork**: [TrissElan/NanoKVM-USB-Win32](https://github.com/TrissElan/NanoKVM-USB-Win32)

## Credits

- Original project: [Sipeed NanoKVM-USB](https://github.com/sipeed/NanoKVM-USB)
- Win32 fork by: TrissElan

## License

This project is licensed under the same license as the original Sipeed NanoKVM-USB project.

## Support

If you find this project useful, please consider supporting it by starring the repository or contributing to the development.

[![donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WFXTNDJ3LYB2U)
