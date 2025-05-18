import { atom } from 'jotai'

import { Resolution } from '@renderer/types'

type VideoState = 'disconnected' | 'connecting' | 'connected'

export const resolutionAtom = atom<Resolution>({
  width: 1920,
  height: 1080
})

export const videoDeviceIdAtom = atom('')
export const videoStateAtom = atom<VideoState>('disconnected')

// These atoms are kept for compatibility but are not used in Windows ARM64 build
export const serialPortAtom = atom('')
export const serialPortStateAtom = atom('notSupported')
