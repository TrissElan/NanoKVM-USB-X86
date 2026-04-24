import { ReactElement, useCallback, useState } from 'react'
import { MaximizeIcon, MinimizeIcon } from 'lucide-react'

import { IpcEvents } from '@common/ipc-events'

export const Fullscreen = (): ReactElement => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = useCallback((): void => {
    const nextState = !isFullscreen
    setIsFullscreen(nextState)
    window.electron.ipcRenderer.send(IpcEvents.SET_FULL_SCREEN, nextState)
  }, [isFullscreen])

  return (
    <div
      className="flex h-[28px] cursor-pointer items-center justify-center rounded px-2 text-white hover:bg-neutral-700/70"
      onClick={toggleFullscreen}
      title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
    >
      {isFullscreen ? <MinimizeIcon size={18} /> : <MaximizeIcon size={18} />}
    </div>
  )
}