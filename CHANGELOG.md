# Changelog

All notable changes to the NanoKVM-USB X86 fork.

## [1.1.4-x86] — 2026-04-24

Based on upstream [sipeed/NanoKVM-USB](https://github.com/sipeed/NanoKVM-USB) v1.1.4.

### Added

- **FPS selection** — Video menu now offers 15/30/45/60 fps options (upstream hardcodes 60fps). Selection persists across sessions via localStorage.
- **Win32 ia32 build target** — NSIS installer configuration for 32-bit Windows.
- **Electron 37** — Upgraded from upstream's Electron 35.

### Changed

- **Source restructured** — `desktop/src/` flattened to root `src/` for simpler project layout.
- **Package manager** — Switched from pnpm to npm.
- **Browser version removed** — The browser/ directory is not included in this fork.
- **Auto-updater disabled** — Replaced `electron-updater` with a stub. Settings page shows "Auto-update is disabled for the X86 fork" instead of update controls.
- **FPS in camera** — `Camera` class now uses configurable `this.fps` instead of hardcoded 60 for the `frameRate` constraint.

### Fixed

- Suppressed unused parameter lint error in updater stub (`_win` parameter).

### Known Issues

- `src/main/device/index.ts` line 49 — division-by-zero guard checks `width` but divides by `height`.
- `src/common/ipc-events.ts` — typo `OPEN_EXTERNAL_RUL` should be `OPEN_EXTERNAL_URL`.

---

## Upstream v1.1.4 Changes (not yet merged into X86 fork)

The following features exist in upstream v1.1.4 but have not been ported to this fork:

- Video Recorder (MediaRecorder + File System Access API, saves .webm)
- Mouse Jiggler (anti-sleep, sends relative moves every 15s of inactivity)
- Keyboard Shortcuts (custom shortcut recorder, up to 6 keys, persisted)
- Video Scaling (50%/75%/100%/150%/200%/Auto, persisted)
- Touchpad Support (touch events, long-press=right-click, two-finger scroll)
- Audio Menu (microphone device selection + permission handling)
- Permission System (macOS IPC + navigator.permissions, split camera/mic)
- Serial Port Disconnect (new IPC event + error pattern detection)
- Baud Rate Config (configurable, persisted, default 57600)
- Storage Module (centralized localStorage with TTL expiry)
- Expanded i18n (11 languages: +ja, +ko, +pl, +pt_br, +zh_tw)