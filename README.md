# NanoKVM-USB X86

<div align="center">

![NanoKVM-USB](https://wiki.sipeed.com/hardware/assets/NanoKVM/usb/NanoKVM-USB.png)

</div>

> Win32 fork of the finger-sized 4K USB KVM by [Sipeed](https://github.com/sipeed/NanoKVM-USB)

## About This Fork

This is the **X86 (Windows ia32)** fork of NanoKVM-USB. It restructures the upstream monorepo into a standalone Electron desktop app, removes the browser version, and adds Windows-specific features.

### Key Changes from Upstream

- **Win32 ia32 build target** — NSIS installer for 32-bit Windows
- **FPS selection** — Choose 15/30/45/60 fps from the video menu
- **Auto-updater disabled** — Distributes via direct download, not in-app updates
- **npm instead of pnpm** — Simplified dependency management
- **Electron 37** — Ahead of upstream's Electron 35
- **Browser version removed** — Not needed for the X86 desktop use case
- **Source restructured** — `desktop/` flattened to root `src/`

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
npm install
npm run dev
```

### Build

```shell
npm run build        # Typecheck + compile
npm run build:win    # Build Win32 ia32 NSIS installer
```

### Quality

```shell
npm run lint         # ESLint
npm run format       # Prettier
npm run typecheck    # TypeScript check
```

## Project Structure

```
├── src/
│   ├── main/        # Electron main process, device protocol, IPC handlers
│   ├── preload/     # Context bridge (electronAPI exposure)
│   ├── renderer/    # React UI (video, keyboard, mouse capture)
│   └── common/      # Shared IPC event enum
├── desktop/         # ⚠️ REFERENCE COPY of upstream (do NOT edit)
├── build/           # App icons for electron-builder
└── resources/       # Additional assets
```

## X86-Specific Features

### FPS Selection

The video menu includes an FPS selector with four options: 15, 30, 45, and 60 fps. The selection persists across sessions via localStorage and takes effect when the camera stream opens or reopens.

### Auto-Updater Disabled

The auto-updater has been replaced with a stub. The Settings page displays "Auto-update is disabled for the X86 fork" instead of update controls. This is intentional: the fork distributes via direct download rather than in-app updates.

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