class Camera {
  id: string = ''
  width: number = 1920
  height: number = 1080
  fps: number = 30
  audioId: string = ''
  stream: MediaStream | null = null

  public async open(id: string, width: number, height: number, fps: number = 30, audioId?: string): Promise<void> {
    if (!id && !this.id) {
      return
    }

    this.close()

    const constraints = {
      video: { 
        deviceId: { exact: id }, 
        width: { ideal: width }, 
        height: { ideal: height },
        frameRate: { ideal: fps, max: 60 }
      },
      audio: audioId ? { 
        deviceId: { exact: audioId },
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
        sampleRate: 44100,
        channelCount: 2
      } : false
    }

    this.id = id
    this.width = width
    this.height = height
    this.fps = fps
    if (audioId) this.audioId = audioId
    this.stream = await navigator.mediaDevices.getUserMedia(constraints)
  }

  public async updateResolution(width: number, height: number, fps?: number): Promise<void> {
    return this.open(this.id, width, height, fps || this.fps, this.audioId)
  }

  public async updateFPS(fps: number): Promise<void> {
    await this.open(this.id, this.width, this.height, fps, this.audioId)
    
    // 비디오 요소 자동 재연결
    const video = document.getElementById('video') as HTMLVideoElement
    if (video && this.stream) {
      video.srcObject = this.stream
      try {
        await video.play()
      } catch (playError) {
        // 자동 재생 실패는 무시 (사용자 상호작용 필요할 수 있음)
      }
    }
  }

  public close(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop())
      this.stream = null
    }
  }

  public getStream(): MediaStream | null {
    return this.stream
  }

  public isOpen(): boolean {
    return this.stream !== null
  }
}

export const camera = new Camera()
