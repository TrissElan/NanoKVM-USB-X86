import { ReactElement } from 'react'
import { useSetAtom } from 'jotai'
import { KeyboardIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { isKeyboardOpenAtom } from '@renderer/jotai/keyboard'

export const VirtualKeyboard = (): ReactElement => {
  const { t } = useTranslation()
  const setIsKeyboardOpen = useSetAtom(isKeyboardOpenAtom)

  return (
    <div
      className="flex h-[30px] cursor-pointer items-center space-x-1 rounded px-3 text-neutral-300 hover:bg-neutral-700/60"
      onClick={() => setIsKeyboardOpen(true)}
    >
      <KeyboardIcon size={18} />
      <span>{t('keyboard.virtualKeyboard')}</span>
    </div>
  )
}
