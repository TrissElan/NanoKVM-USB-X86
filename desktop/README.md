# NanoKVM-USB X86

This is the **X86 fork** of the NanoKVM-USB desktop application, adapted for Windows (ia32) builds.

> **Note:** This directory is a reference copy of the upstream `desktop/` source. The fork's active source code lives in the root `src/` directory.

## Differences from Upstream

| Feature | Upstream | X86 Fork |
|---------|----------|----------|
| Package manager | pnpm | npm |
| Build target | mac/win/linux | Win32 ia32 (NSIS) |
| Auto-updater | Enabled (electron-updater) | **Disabled** (stub) |
| FPS selection | Hardcoded 60fps | **15/30/45/60 selectable** |
| Browser version | Included | Removed (not needed) |
| Electron version | 35 | 37 |

## Development

```shell
cd desktop
npm install
npm run dev
```

> The fork uses **npm** instead of pnpm. Do not use pnpm commands.

## Compile

```shell
# For Windows (ia32 NSIS installer)
npm run build:win
```

> The X86 fork only targets Windows. macOS and Linux builds are not configured.

## X86-Specific Features

### FPS Selection

The video menu includes an FPS selector with four options: 15, 30, 45, and 60 fps. The selection is persisted to localStorage and applied when the camera stream opens or reopens.

### Auto-Updater Disabled

The auto-updater (`electron-updater`) has been replaced with a stub. The Settings page shows "Auto-update is disabled for the X86 fork" instead of update controls. This is intentional: the fork distributes via direct download, not auto-update.

## Upstream Credits

Based on [sipeed/NanoKVM-USB](https://github.com/sipeed/NanoKVM-USB) by Sipeed.