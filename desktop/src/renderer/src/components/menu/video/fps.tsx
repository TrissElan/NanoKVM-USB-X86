import { ReactElement, useCallback, useEffect } from 'react'
import { Popover, message } from 'antd'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import { GaugeIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { videoFpsAtom } from '@renderer/jotai/device'
import { camera } from '@renderer/libs/media/camera'
import * as storage from '@renderer/libs/storage'

const FpsList = [
  { label: '15', value: 15 },
  { label: '30', value: 30 },
  { label: '45', value: 45 },
  { label: '60', value: 60 }
]

const FpsShortcutMap: Record<string, number> = {
  F1: 15,
  F2: 30,
  F3: 45,
  F4: 60
}

export const Fps = (): ReactElement => {
  const { t } = useTranslation()

  const [videoFps, setVideoFps] = useAtom(videoFpsAtom)

  useEffect(() => {
    const fps = storage.getVideoFps()
    if (fps) {
      setVideoFps(fps)
      camera.setFps(fps)
    }
  }, [setVideoFps])

  const updateFps = useCallback(
    async (fps: number): Promise<void> => {
      setVideoFps(fps)
      storage.setVideoFps(fps)

      if (camera.isOpen()) {
        try {
          await camera.updateFps(fps)

          const video = document.getElementById('video') as HTMLVideoElement
          if (video) {
            video.srcObject = camera.getStream()
          }
        } catch (err) {
          console.error(err)
        }
      }
    },
    [setVideoFps]
  )

  useEffect(() => {
    function handleFpsShortcut(event: KeyboardEvent): void {
      const fps = FpsShortcutMap[event.code]
      if (!fps) return

      event.preventDefault()
      event.stopImmediatePropagation()

      updateFps(fps)
      message.success(t('video.fpsChanged', { fps }), 1.5)
    }

    document.addEventListener('keydown', handleFpsShortcut, true)
    return () => document.removeEventListener('keydown', handleFpsShortcut, true)
  }, [updateFps, t])

  const content = (
    <>
      {FpsList.map((item) => (
        <div
          key={item.value}
          className={clsx(
            'flex cursor-pointer items-center space-x-1 rounded px-5 py-1.5 select-none hover:bg-neutral-700/60',
            item.value === videoFps ? 'text-blue-500' : 'text-white'
          )}
          onClick={() => updateFps(item.value)}
        >
          <span>{item.label}</span>
          <span className="text-xs text-neutral-400">FPS</span>
        </div>
      ))}
    </>
  )

  return (
    <Popover content={content} placement="rightTop" arrow={false} align={{ offset: [13, 0] }}>
      <div className="flex h-[30px] cursor-pointer items-center space-x-2 rounded px-3 text-neutral-300 hover:bg-neutral-700/50">
        <GaugeIcon size={16} />
        <span className="text-sm select-none">{t('video.fps')}</span>
      </div>
    </Popover>
  )
}