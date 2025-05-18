import { InfoPacket } from './proto'

export class Device {
  constructor() {}

  // Dummy methods for Windows ARM64 build
  async getInfo(): Promise<InfoPacket> {
    return new InfoPacket([])
  }

  async sendKeyboardData(_modifier: number, _key: number): Promise<void> {
    return
  }

  async sendMouseRelativeData(_key: number, _x: number, _y: number, _scroll: number): Promise<void> {
    return
  }

  async sendMouseAbsoluteData(
    _key: number,
    _width: number,
    _height: number,
    _x: number,
    _y: number,
    _scroll: number
  ): Promise<void> {
    return
  }
}

export const device = new Device()
