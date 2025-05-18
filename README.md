# NanoKVM-USB ARM64

A Windows ARM64 fork of the [NanoKVM-USB](https://github.com/sipeed/NanoKVM-USB) desktop application by Sipeed.

## Features

- Windows ARM64 exclusive build
- Removed serialport functionality (not compatible with ARM64)
- Removed keyboard/mouse capture functionality
- Removed auto-update functionality
- Improved audio processing with disabled echo cancellation, auto gain control, and noise suppression

## Limitations

- This fork only supports Windows ARM64 platform
- Only video and audio functionality is available (no serialport, keyboard, or mouse capture)

## How to Build

```bash
# Install dependencies
npm install

# Build for Windows ARM64
npm run build:win
```

## Credits

- Original project: [Sipeed NanoKVM-USB](https://github.com/sipeed/NanoKVM-USB)
- ARM64 fork by: TrissElan

## License

This project is licensed under the same license as the original Sipeed NanoKVM-USB project.

## Support

If you find this project useful, please consider supporting it.

[![donate](https://example.com/buy-me-a-coffee.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WFXTNDJ3LYB2U)
