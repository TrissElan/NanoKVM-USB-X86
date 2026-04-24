import { ReactElement, useEffect, useRef } from 'react'
import { Spin } from 'antd'
import { useAtom, useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { IpcEvents } from '@common/ipc-events'
import {
  reconnectAttemptAtom,
  serialPortAtom,
  serialPortStateAtom,
  videoDeviceIdAtom,
  videoStateAtom
} from '@renderer/jotai/device'
import * as storage from '@renderer/libs/storage'

const MAX_RETRIES = 5
const MAX_DELAY = 8000

function getDelay(attempt: number): number {
  return Math.min(Math.pow(2, attempt - 1) * 1000, MAX_DELAY)
}

export const Disconnect = (): ReactElement => {
  const { t } = useTranslation()

  const setVideoState = useSetAtom(videoStateAtom)
  const setVideoDeviceId = useSetAtom(videoDeviceIdAtom)
  const setSerialPortState = useSetAtom(serialPortStateAtom)
  const setSerialPort = useSetAtom(serialPortAtom)
  const [reconnectAttempt, setReconnectAttempt] = useAtom(reconnectAttemptAtom)

  const reconnectingRef = useRef(false)
  const cancelledRef = useRef(false)

  useEffect(() => {
    const rmListener = window.electron.ipcRenderer.on(IpcEvents.SERIAL_PORT_DISCONNECTED, () => {
      if (reconnectingRef.current) return
      startReconnect()
    })

    return () => {
      rmListener()
      cancelledRef.current = true
    }
  }, [])

  async function startReconnect(): Promise<void> {
    const savedPort = storage.getSerialPort()
    const savedBaudRate = storage.getBaudRate()

    if (!savedPort) {
      resetStates()
      return
    }

    reconnectingRef.current = true
    setReconnectAttempt(1)
    setSerialPortState('connecting')

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      if (cancelledRef.current) {
        reconnectingRef.current = false
        return
      }

      setReconnectAttempt(attempt)

      const delay = getDelay(attempt)
      await new Promise((resolve) => setTimeout(resolve, delay))

      if (cancelledRef.current) {
        reconnectingRef.current = false
        return
      }

      try {
        const success = await window.electron.ipcRenderer.invoke(
          IpcEvents.OPEN_SERIAL_PORT,
          savedPort,
          savedBaudRate
        )

        if (success) {
          setSerialPortState('connected')
          setSerialPort(savedPort)
          setReconnectAttempt(0)
          reconnectingRef.current = false
          return
        }
      } catch {
        // Continue to next retry
      }
    }

    resetStates()
    setReconnectAttempt(0)
    reconnectingRef.current = false
  }

  function resetStates(): void {
    setVideoState('disconnected')
    setSerialPortState('disconnected')
    setVideoDeviceId('')
    setSerialPort('')
  }

  if (reconnectAttempt > 0) {
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
        <div className="flex flex-col items-center gap-3 rounded-lg bg-neutral-800 p-6">
          <Spin size="large" />
          <div className="text-sm text-white">
            {t('reconnect.reconnecting')} ({t('reconnect.attempt')} {reconnectAttempt}/{MAX_RETRIES})
          </div>
        </div>
      </div>
    )
  }

  return <></>
}