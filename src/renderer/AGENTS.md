# RENDERER PROCESS

React UI — video display, keyboard/mouse capture, device connection modal, settings.

## STRUCTURE

```
renderer/src/
├── main.tsx              # ReactDOM entry, ConfigProvider (dark theme)
├── App.tsx               # Root: media permissions, connection state, layout
├── types.ts              # Resolution, MediaDevice, Mouse types
├── components/
│   ├── device-modal/     # Connection dialog (serial port + video device selection)
│   ├── keyboard/         # Keyboard input capture (HID keycodes)
│   ├── menu/             # Top menu bar (7 submenus)
│   │   ├── video/        # FPS, resolution, device selection
│   │   ├── mouse/        # Absolute/relative mode toggle
│   │   ├── keyboard/     # Keyboard enable/disable
│   │   ├── serial-port/  # Serial port reconnection
│   │   ├── settings/     # About, appearance (update UI disabled)
│   │   ├── language/     # i18n language picker
│   │   └── fullscreen/   # Fullscreen toggle
│   ├── mouse/            # Mouse capture (absolute.tsx, relative.tsx)
│   └── virtual-keyboard/ # On-screen keyboard (react-simple-keyboard)
├── jotai/                # State atoms
│   ├── device.ts         # resolutionAtom, videoStateAtom, serialPortStateAtom, videoFpsAtom
│   ├── keyboard.ts       # isKeyboardEnableAtom
│   └── mouse.ts          # mouseStyleAtom (cursor CSS), scrollIntervalAtom
├── libs/
│   ├── camera/           # WebRTC getUserMedia wrapper (with FPS support)
│   ├── keyboard/         # HID keycode mapping (charCodes, keyboardCodes)
│   └── storage/          # localStorage with expiry (video resolution + FPS persistence)
├── i18n/                 # i18next setup, 6 locales (en/ru/zh/de/nl/be)
└── assets/
    ├── images/           # Static images
    └── styles/           # main.css (TailwindCSS imports)
```

## WHERE TO LOOK

| Task | File | Notes |
|------|------|-------|
| Add menu item | `components/menu/` | Create subdir, add to menu/index.ts |
| Change video settings | `components/menu/video/` | FPS (15/30/45/60), resolution, device |
| Modify mouse behavior | `components/mouse/` | absolute.tsx (single monitor), relative.tsx (dual) |
| Add state atom | `jotai/` | Jotai atom pattern: `atom<Type>(defaultValue)` |
| Add i18n string | `i18n/locales/{lang}.json` | 6 language files |
| Change keyboard mapping | `libs/keyboard/` | keyboardCodes.ts (HID), charCodes.ts (JS→HID) |
| Persist setting | `libs/storage/` | expiry.ts for TTL-based localStorage |

## STATE MANAGEMENT (Jotai)

Atoms in `jotai/`:
- `resolutionAtom` — `{width, height}` (default 1920x1080)
- `videoDeviceIdAtom` — Selected video device ID
- `videoStateAtom` — `'disconnected' | 'connecting' | 'connected'`
- `videoFpsAtom` — Selected FPS (default 60, options: 15/30/45/60)
- `serialPortAtom` — Selected serial port path
- `serialPortStateAtom` — `'notSupported' | 'disconnected' | 'connecting' | 'connected'`
- `isKeyboardEnableAtom` — Keyboard capture toggle
- `mouseStyleAtom` — CSS cursor class (`'mouse-absolute'` or `'mouse-relative'`)
- `scrollIntervalAtom` — Scroll throttle interval for mouse

## X86 FORK ADDITIONS

- **FPS selector** (`components/menu/video/fps.tsx`) — Popover with 15/30/45/60 options, persisted via `videoFpsAtom` + `storage.setVideoFps()`
- **Camera FPS support** (`libs/media/camera.ts`) — `setFps()` and `updateFps()` methods, `frameRate` constraint uses `this.fps` instead of hardcoded 60
- **Update UI disabled** (`components/menu/settings/update.tsx`) — Shows "Auto-update is disabled for the X86 fork" message

## CONVENTIONS

- **Ant Design** for UI components (ConfigProvider with darkAlgorithm)
- **TailwindCSS v4** utility classes for layout/spacing
- **clsx** for conditional classNames
- **lucide-react** for icons (not Ant Design icons)
- **react-responsive** for screen size detection (`isBigScreen` = minWidth 850)
- **vaul** for drawer/modal overlays

## ANTI-PATTERNS

- **console.log remains**: App.tsx line 83 and others — contradicts "clean code" claim
- **Math.abs on coords**: mouse/absolute.tsx — unnecessary, could flip coordinates at edges
- **Swallowed errors**: menu/video/fps.tsx — catch block with no logging or feedback