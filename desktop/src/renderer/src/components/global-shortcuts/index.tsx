import { ReactElement, useEffect } from 'react'
import { message } from 'antd'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { isKeyboardEnableAtom } from '@renderer/jotai/keyboard'
import { isMouseEnableAtom } from '@renderer/jotai/mouse'

export const GlobalShortcuts = (): ReactElement => {
  const { t } = useTranslation()
  const [isKeyboardEnable, setIsKeyboardEnable] = useAtom(isKeyboardEnableAtom)
  const [isMouseEnable, setIsMouseEnable] = useAtom(isMouseEnableAtom)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      const isCtrl = event.ctrlKey || event.metaKey
      const isShift = event.shiftKey

      if (!isCtrl || !isShift) return

      // Ctrl+Shift+K: toggle keyboard capture
      if (event.code === 'KeyK') {
        event.preventDefault()
        event.stopPropagation()

        const next = !isKeyboardEnable
        setIsKeyboardEnable(next)
        showToggleMessage(next ? t('shortcut.keyboardEnabled') : t('shortcut.keyboardDisabled'))
        return
      }

      // Ctrl+Shift+M: toggle mouse capture
      if (event.code === 'KeyM') {
        event.preventDefault()
        event.stopPropagation()

        const next = !isMouseEnable
        setIsMouseEnable(next)
        showToggleMessage(next ? t('shortcut.mouseEnabled') : t('shortcut.mouseDisabled'))
        return
      }
    }

    // Use capture phase so this fires BEFORE the keyboard capture component's bubble-phase listeners
    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [isKeyboardEnable, isMouseEnable, t])

  function showToggleMessage(content: string): void {
    message.open({
      key: 'global-shortcut-toggle',
      type: 'info',
      content,
      duration: 1.5,
      style: { marginTop: '40vh' }
    })
  }

  return <></>
}
