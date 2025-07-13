import { ReactElement, useState } from 'react'
import { ClipboardIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { IpcEvents } from '@common/ipc-events'
import { CharCodes, ShiftChars } from '@renderer/libs/keyboard'

export const Paste = (): ReactElement => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  async function paste(): Promise<void> {
    if (isLoading) return
    setIsLoading(true)

    try {
      const text = await navigator.clipboard.readText()
      if (!text) return

      for (const char of text) {
        const ascii = char.charCodeAt(0)

        const code = CharCodes.get(ascii)
        if (!code) continue

        const modifier = (ascii >= 65 && ascii <= 90) || ShiftChars.has(ascii) ? 2 : 0
        await send(modifier, code)

        await send(0, 0)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  async function send(modifier: number, key: number): Promise<void> {
    await window.electron.ipcRenderer.invoke(IpcEvents.SEND_KEYBOARD, modifier, key)
  }

  return (
    <div
      className="flex h-[30px] cursor-pointer items-center space-x-1 rounded px-3 text-neutral-300 hover:bg-neutral-700/60"
      onClick={paste}
    >
      <ClipboardIcon size={18} />
      <span>{t('keyboard.paste')}</span>
    </div>
  )
}
