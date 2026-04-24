# NanoKVM-USB X86

<div align="center">

![NanoKVM-USB](https://wiki.sipeed.com/hardware/assets/NanoKVM/usb/NanoKVM-USB.png)

</div>

> X86 fork of the finger-sized 4K USB KVM by [Sipeed](https://github.com/sipeed/NanoKVM-USB)

## About This Fork

This is the **X86 (Windows ia32)** fork of NanoKVM-USB. It is based on the upstream desktop version, removes the browser version, and adds Windows-specific optimizations.

### Key Changes from Upstream

- **Win32 ia32 build target** — NSIS installer for 32-bit Windows
- **FPS selection** — Choose 15/30/45/60 fps from the video menu (keyboard shortcuts F1-F4)
- **Auto-updater disabled** — Distributes via direct download, not in-app updates
- **npm instead of pnpm** — Simplified dependency management
- **Browser version removed** — Not needed for the X86 desktop use case
- **English only** — Removed all non-English translations
- **Connection status** — Video and serial port status indicators in menu bar
- **Auto-reconnect** — Exponential backoff retry on serial port disconnect
- **Quick toggle** — Ctrl+Shift+K (keyboard), Ctrl+Shift+M (mouse)
- **Fullscreen toggle** — F11 or menu button

## Introduction

The NanoKVM-USB is a convenient tool for operations and multi-device collaboration. It allows you to perform maintenance tasks without the need for a keyboard, mouse, or monitor. Using just a single computer and no additional software downloads, you can start graphical operations directly through the Chrome browser.

NanoKVM-USB captures HDMI video signals and transmits them to the host via USB 3.0. Unlike typical USB capture cards, NanoKVM-USB also captures keyboard and mouse input from the host and sends it to the target machine in real-time, eliminating the need for traditional screen and peripheral connections. It also supports HDMI loop-out, with a maximum resolution of 4K@30Hz, making it easy to connect to a large display.

![wiring](https://wiki.sipeed.com/hardware/assets/NanoKVM/usb/wiring.png)
<br>

## Technical Specifications

| | NanoKVM-USB | Mini-KVM | KIWI-KVM |
| --- | :---: | :---: | :---: |
| HDMI Input | 4K@30fps / Pro 4K@60fps  | 1080P@60fps | 4K@30fps |
| HDMI Loopout | 4K@30fps / Pro 4K@60fps | None | None |
| USB Capture | 1080P@60fps / Pro 4K@60fps | 1080P@60fps | 1080P@60fps |
| USB Interface | USB3.0 | USB2.0 | USB3.0 |
| USB Switch | Yes | Yes | No |
| Keyboard & Mouse | Yes | Yes | Yes |
| Clipboard | Yes | Yes | Yes |
| Software | No setup needed, works in Chrome | Host App required | Host App required |
| Latency | 50-100ms | 50-100ms | 50-100ms |
| Volume | 57x25x23mm | 61x13.5x53mm | 80x80x10mm |
| Shell Material | Aluminum Alloy | Aluminum Alloy | Plastics |
| Color | Black / Blue / Red | Black | Black |
| Price | `$39.9/$49.9`, Pro `$59.9/$69.9` | `$89 / $109` | `$69 / $99` |

<br>

![interface](https://wiki.sipeed.com/hardware/assets/NanoKVM/usb/interface.jpg)

> **Note:** For the best experience, please use a USB 3.0 cable to connect the device.

## Getting Started

### Prerequisites

- Node.js 18+
- npm (not pnpm)
- Windows (for building the installer)

### Development

```shell
cd desktop
npm install
npm run dev
```

### Build

```shell
cd desktop
npm run build        # Typecheck + compile
npm run build:win    # Build Win32 ia32 NSIS installer
```

### Quality

```shell
cd desktop
npm run lint         # ESLint
npm run format       # Prettier
npm run typecheck    # TypeScript check
```

## Project Structure

```
├── src/               # Fork's active source code (NOT used - see desktop/)
├── desktop/           # Upstream desktop source (active codebase)
│   ├── src/
│   │   ├── main/      # Electron main process, device protocol, IPC
│   │   ├── preload/   # Context bridge
│   │   ├── renderer/  # React UI
│   │   └── common/    # Shared IPC events
│   └── build/         # App icons
└── resources/         # Additional assets
```

## X86-Specific Features

### FPS Selection

The video menu includes an FPS selector with four options: 15, 30, 45, and 60 fps. Keyboard shortcuts F1-F4 provide quick switching. The selection persists across sessions via localStorage.

### Connection Status

The menu bar displays real-time connection status for both video and serial port connections. Green indicates connected, yellow indicates connecting, red indicates disconnected.

### Auto-Reconnect

When the serial port disconnects, the application automatically attempts to reconnect with exponential backoff (1s, 2s, 4s, 8s) up to 5 retries.

### Quick Toggle

- **Ctrl+Shift+K** — Toggle keyboard capture on/off
- **Ctrl+Shift+M** — Toggle mouse capture on/off

### Fullscreen Toggle

Click the maximize/minimize icon in the menu bar or use F11 to toggle fullscreen mode.

### Mouse Modes

- **Absolute mode** — Click-to-point positioning (default)
- **Relative mode** — Pointer-lock based movement
- Touch gesture support for touchscreen devices in absolute mode

## Removed Features

The following upstream features have been removed in the X86 fork:

- **Browser version** — Not needed for desktop KVM use
- **Recorder** — Screen recording functionality removed
- **Mouse jiggler** — Anti-sleep feature removed
- **Virtual keyboard** — On-screen keyboard removed
- **Auto-updater** — In-app updates disabled
- **Non-English translations** — English only

## Resources

- **Upstream project:** [sipeed/NanoKVM-USB](https://github.com/sipeed/NanoKVM-USB)
- **Upstream browser version:** [usbkvm.sipeed.com](https://usbkvm.sipeed.com)
- **Upstream releases:** [Releases page](https://github.com/sipeed/NanoKVM-USB/releases)

## Where to Buy

* [AliExpress Store]() (To be released)
* [Taobao Store]() (To be released)
* [Pre-sale Page](https://sipeed.com/nanokvm/usb)

## Credits

Based on [NanoKVM-USB](https://github.com/sipeed/NanoKVM-USB) by [Sipeed](https://www.sipeed.com).