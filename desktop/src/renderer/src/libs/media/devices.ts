import type { MediaDevice } from '@renderer/types'

/**
 * Enumerate media devices and pair video inputs with their associated audio inputs
 * by matching on groupId.
 */
export async function enumerateMediaDevices(): Promise<MediaDevice[]> {
  const allDevices = await navigator.mediaDevices.enumerateDevices()
  const videoDevices = allDevices.filter((device) => device.kind === 'videoinput')
  const audioDevices = allDevices.filter((device) => device.kind === 'audioinput')

  return videoDevices.map((videoDevice) => {
    const device: MediaDevice = {
      videoId: videoDevice.deviceId,
      videoName: videoDevice.label
    }

    if (videoDevice.groupId) {
      const matchedAudioDevice = audioDevices.find(
        (audioDevice) => audioDevice.groupId === videoDevice.groupId
      )
      if (matchedAudioDevice) {
        device.audioId = matchedAudioDevice.deviceId
        device.audioName = matchedAudioDevice.label
      }
    }

    return device
  })
}