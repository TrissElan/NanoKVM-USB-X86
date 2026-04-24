# MAIN PROCESS

Electron main process — window management, IPC handlers, serial port device communication.

## STRUCTURE

```
main/
├── index.ts           # App entry: BrowserWindow, permissions, event registration
├── device/            # NanoKVM hardware communication
│   ├── index.ts       # Device class: keyboard/mouse data encoding
│   ├── proto.ts       # Binary protocol: CmdPacket, InfoPacket, CmdEvent enum
│   ├── serial-port.ts # SerialPort wrapper with open/close/read/write
│   └── utils.ts       # Byte manipulation helpers
└── events/            # IPC handler registration
    ├── index.ts       # Barrel re-export
    ├── app.ts         # GET_APP_VERSION, OPEN_EXTERNAL_URL, SET_FULL_SCREEN
    ├── serial-port.ts # GET_SERIAL_PORTS, OPEN/CLOSE, SEND_KEYBOARD/MOUSE
    └── updater.ts     # STUB — update functionality disabled for X86 fork
```

## WHERE TO LOOK

| Task | File | Notes |
|------|------|-------|
| Add new IPC event | `events/` + `../common/ipc-events.ts` | Register handler + add enum value |
| Modify KVM protocol | `device/proto.ts` | CmdEvent enum, CmdPacket encode/decode |
| Change serial settings | `device/serial-port.ts` | Default baud: 57600 |
| Add keyboard command | `device/index.ts` → `sendKeyboardData()` | 8-byte HID report |
| Add mouse command | `device/index.ts` → `sendMouseRelativeData/AbsoluteData()` | Relative: 5-byte, Absolute: 11-byte |

## DEVICE PROTOCOL

Binary serial protocol with checksum:
```
[HEAD1=0x57] [HEAD2=0xAB] [ADDR] [CMD] [LEN] [DATA...] [SUM]
```

Key commands (`CmdEvent`):
- `GET_INFO` (0x01) — Returns chip version, lock key states
- `SEND_KB_GENERAL_DATA` (0x02) — 8-byte HID keyboard report
- `SEND_MS_REL_DATA` (0x05) — Relative mouse: [0x01, key, x, y, scroll]
- `SEND_MS_ABS_DATA` (0x04) — Absolute mouse: [0x02, key, xLo, xHi, yLo, yHi, scroll]

## CONVENTIONS

- All IPC handlers use `ipcMain.handle()` (invoke/handle pattern, not send/on)
- Device is singleton: `export const device = new Device()`
- Serial port errors logged via `console.error`, not thrown
- `updater.ts` is intentionally a stub — do not restore auto-update

## ANTI-PATTERNS

- **BUG**: `device/index.ts` line 49 — `width === 0` guard should be `height === 0`
- **Silent failure**: `serial-port.ts` write() returns silently when port closed (throw commented out)
- **Bare catch**: `proto.ts` line 65 — catch block has no error variable