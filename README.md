# NanoKVM-USB-X86

X86 fork of the finger-sized 4K USB KVM by [Sipeed](https://github.com/sipeed/NanoKVM-USB)

# About This Fork

This is the **X86 (Windows ia32)** fork of NanoKVM-USB. It is based on the upstream desktop version, removes the browser version, and adds Windows-specific optimizations.

# Key Changes from Upstream

- **Modified : Win32 ia32 build target** — NSIS installer for 32-bit Windows
- **Modified : English only** — Removed all non-English translations
- **Modified : npm instead of pnpm** — Simplified dependency management
- **Added : Fullscreen toggle** — F11 or menu button
- **Added : FPS selection** — Choose 15/30/45/60 fps from the video menu (keyboard shortcuts F1-F4)
- **Added : Connection status** — Video and serial port status indicators in menu bar
- **Added : Auto-reconnect** — Exponential backoff retry on serial port disconnect
- **Added : Quick toggle** — Ctrl+Shift+K (keyboard), Ctrl+Shift+M (mouse)
- **Removed : Auto-updater** — Distributes via direct download, not in-app updates
- **Removed : Recorder** — Screen recording functionality removed
- **Removed : Mouse jiggler** — Anti-sleep feature removed
- **Removed : Virtual keyboard** — On-screen keyboard removed
- **Removed : Browser version** — Not needed for the X86 desktop use case

# Project Structure

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

# Build

```shell
cd desktop
npm run build        # Typecheck + compile
npm run build:win    # Build Win32 ia32 NSIS installer
```

#  Credits

- **Upstream project:** [sipeed/NanoKVM-USB](https://github.com/sipeed/NanoKVM-USB)
- **fork by**: TrissElan


# Support

If you find this project useful, please consider supporting it.

[![donate](https://example.com/buy-me-a-coffee.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WFXTNDJ3LYB2U)

# License

This project is licensed under the same license as the original project.
