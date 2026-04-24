import { ReactElement } from 'react'
import { useAtomValue } from 'jotai'

import { reconnectAttemptAtom, serialPortStateAtom, videoStateAtom } from '@renderer/jotai/device'

import { Connect } from './connect'
import { Disconnect } from './disconnect'

export const Device = (): ReactElement => {
  const videoState = useAtomValue(videoStateAtom)
  const serialPortState = useAtomValue(serialPortStateAtom)
  const reconnectAttempt = useAtomValue(reconnectAttemptAtom)

  const isConnected = videoState === 'connected' && serialPortState === 'connected'
  const isReconnecting = reconnectAttempt > 0

  if (isReconnecting) {
    return <Disconnect />
  }

  return isConnected ? <Disconnect /> : <Connect />
}