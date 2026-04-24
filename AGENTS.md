# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-24
**Project:** NanoKVM-USB X86 (Win32 Desktop Fork)
**Stack:** Electron 37 + React 18 + TypeScript + TailwindCSS v4 + Jotai
**Upstream:** [sipeed/NanoKVM-USB](https://github.com/sipeed/NanoKVM-USB) v1.1.4

## OVERVIEW

Win32 fork of sipeed/NanoKVM-USB. Captures video via WebRTC getUserMedia, sends keyboard/mouse input over serial port to NanoKVM hardware device. This fork targets Windows ia32 only, removes the browser version, and adds FPS selection.

## FORK DIFFERENCES FROM UPSTREAM

| Area | Upstream | X86 Fork |
|------|----------|----------|
| Package manager | pnpm | npm |
| Build target | mac/win/linux | Win32 ia32 NSIS |
| Auto-updater | Enabled (electron-updater) | Disabled (stub) |
| FPS | Hardcoded 60 | Selectable 15/30/45/60 |
| Browser version | Included | Removed |
| Electron | 35 | 37 |
| Source layout | `desktop/src/` | Root `src/` |

## STRUCTURE

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

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| KVM device protocol | `src/main/device/` | Binary serial protocol, CmdPacket encode/decode |
| IPC event handlers | `src/main/events/` | Serial port, app, updater (stub) |
| UI components | `src/renderer/src/components/` | device-modal, keyboard, menu, mouse, virtual-keyboard |
| State management | `src/renderer/src/jotai/` | Jotai atoms: device, keyboard, mouse |
| Video capture | `src/renderer/src/libs/camera/` | WebRTC getUserMedia wrapper |
| Keyboard mapping | `src/renderer/src/libs/keyboard/` | HID keycodes, char codes |
| i18n | `src/renderer/src/i18n/` | 6 languages: en, ru, zh, de, nl, be |
| FPS selection | `src/renderer/src/components/menu/video/fps.tsx` | Fork-specific: 15/30/45/60 fps selector |

## CONVENTIONS

- **No semicolons** — Prettier `semi: false`
- **Single quotes** — Prettier `singleQuote: true`
- **100 char line width** — Prettier `printWidth: 100`
- **No trailing commas** — Prettier `trailingComma: none`
- **Import order**: react → third-party → `@common/*` → `@renderer/*` → relative
- **Path aliases**: `@common/` → `src/common/`, `@renderer/` → `src/renderer/src/`
- **React 17+ JSX runtime** — No `import React` needed
- **TailwindCSS v4** — No config file, uses `@tailwindcss/vite` plugin

## ANTI-PATTERNS (THIS PROJECT)

- **DO NOT** edit `desktop/` — it's a frozen upstream reference copy
- **DO NOT** add `console.log` in production code (README claims "clean production code")
- **DO NOT** use `electron-updater` — auto-update is disabled in X86 fork
- **NEVER** commit `.env` files — contains Apple credentials for notarization
- **KNOWN BUG**: `src/main/device/index.ts` line 49 — division-by-zero guard checks `width` but divides by `height`
- **KNOWN TYPO**: `IpcEvents.OPEN_EXTERNAL_RUL` should be `OPEN_EXTERNAL_URL`

## COMMANDS

```bash
# Development
npm install          # Install dependencies (project uses npm, NOT pnpm)
npm run dev          # Start dev server (electron-vite dev)

# Build
npm run build        # Typecheck + compile (electron-vite build)
npm run build:win    # Build Win32 ia32 NSIS installer

# Quality
npm run lint         # ESLint (flat config, TS + React)
npm run format       # Prettier
npm run typecheck    # TypeScript (node + web configs)
```

## NOTES

- **Dual lock files**: Both `package-lock.json` and `pnpm-lock.yaml` exist — use npm
- **`sandbox: false`**: BrowserWindow disables sandbox for serialport compatibility
- **`shamefully-hoist=true`**: .npmrc forces pnpm hoisting (legacy from upstream)
- **Electron mirror**: Uses npmmirror.com (Chinese CDN) for faster downloads
- **No tests**: Zero test infrastructure exists
- **No CI/CD**: Builds are manual/local only