import { ReactElement, useEffect, useState } from 'react'
import { Result, Spin } from 'antd'
// import clsx from 'clsx'
import { useAtomValue, useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { IpcEvents } from '@common/ipc-events'
import { DeviceModal } from '@renderer/components/device-modal'
import { Menu } from '@renderer/components/menu'
import { resolutionAtom, videoStateAtom } from '@renderer/jotai/device'
import { camera } from '@renderer/libs/camera'
import { getVideoResolution } from '@renderer/libs/storage'
import type { Resolution } from '@renderer/types'

type State = 'loading' | 'success' | 'failed'

const App = (): ReactElement => {
  const { t } = useTranslation()

  const videoState = useAtomValue(videoStateAtom)
  const setResolution = useSetAtom(resolutionAtom)

  const [state, setState] = useState<State>('loading')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const resolution = getVideoResolution()
    if (resolution) {
      setResolution(resolution)
    }

    requestMediaPermissions(resolution)

    return (): void => {
      camera.close()
    }
  }, [])

  useEffect(() => {
    // Only video is supported in Windows ARM64 build
    setIsConnected(videoState === 'connected')
  }, [videoState])

  async function requestMediaPermissions(resolution?: Resolution): Promise<void> {
    try {
      if (window.electron.process.platform === 'darwin') {
        const res = await window.electron.ipcRenderer.invoke(IpcEvents.REQUEST_MEDIA_PERMISSIONS)

        if (!res.camera) {
          setState('failed')
          return
        }
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: resolution?.width || 1920 },
            height: { ideal: resolution?.height || 1080 }
          },
          audio: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false
          }
        })
        stream.getTracks().forEach((track) => track.stop())
      }

      setState('success')
    } catch (err) {
      console.log('failed to request media permissions: ', err)
      if (err instanceof Error && ['NotAllowedError', 'PermissionDeniedError'].includes(err.name)) {
        setState('failed')
      } else {
        setState('success')
      }
    }
  }

  if (state === 'loading') {
    return <Spin size="large" spinning={true} tip={t('camera.tip')} fullscreen />
  }

  if (state === 'failed') {
    return (
      <Result
        status="info"
        title={t('camera.denied')}
        extra={[
          <h2 key="desc" className="text-xl text-white">
            {t('camera.authorize')}
          </h2>
        ]}
      />
    )
  }

  return (
    <>
      {isConnected ? (
        <>
          <Menu />
        </>
      ) : (
        <DeviceModal />
      )}

      <video
        id="video"
        className="block min-h-[480px] min-w-[640px] select-none"
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'scale-down' }}
        autoPlay
        playsInline
      />
    </>
  )
}

export default App
