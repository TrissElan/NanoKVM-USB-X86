import { ReactElement } from 'react'
import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import { MonitorIcon, CpuIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { videoStateAtom, serialPortStateAtom } from '@renderer/jotai/device'

type VideoState = 'disconnected' | 'connecting' | 'connected'
type SerialState = 'notSupported' | 'disconnected' | 'connecting' | 'connected'

function getStatusColor(state: VideoState | SerialState): string {
  switch (state) {
    case 'connected':
      return 'bg-green-500'
    case 'connecting':
      return 'bg-yellow-500'
    default:
      return 'bg-red-500'
  }
}

function getStatusLabel(
  t: (key: string) => string,
  prefix: 'video' | 'serial',
  state: VideoState | SerialState
): string {
  return t(`connectionStatus.${prefix}.${state}`)
}

export const ConnectionStatus = (): ReactElement => {
  const { t } = useTranslation()
  const videoState = useAtomValue(videoStateAtom)
  const serialState = useAtomValue(serialPortStateAtom)

  return (
    <div className="flex items-center space-x-1.5">
      <div
        className="flex items-center space-x-1"
        title={getStatusLabel(t, 'video', videoState)}
      >
        <MonitorIcon size={14} className="text-neutral-400" />
        <span
          className={clsx(
            'inline-block size-[8px] rounded-full',
            getStatusColor(videoState)
          )}
        />
      </div>
      <div
        className="flex items-center space-x-1"
        title={getStatusLabel(t, 'serial', serialState)}
      >
        <CpuIcon size={14} className="text-neutral-400" />
        <span
          className={clsx(
            'inline-block size-[8px] rounded-full',
            getStatusColor(serialState)
          )}
        />
      </div>
    </div>
  )
}