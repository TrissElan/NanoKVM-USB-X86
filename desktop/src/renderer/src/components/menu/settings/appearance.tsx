import { ReactElement, useEffect, useState } from 'react'
import { Divider, Select, Switch } from 'antd'
import { LanguagesIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import languages from '@renderer/i18n/languages'
import { setLanguage } from '@renderer/libs/storage'
import * as storage from '@renderer/libs/storage'

export const Appearance = (): ReactElement => {
  const { t, i18n } = useTranslation()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const options = languages.map((language) => ({
    value: language.key,
    label: language.name
  }))

  useEffect(() => {
    const isOpen = storage.getIsMenuOpen()
    setIsMenuOpen(isOpen)
  }, [])

  function changeLanguage(value: string): void {
    if (i18n.language === value) return

    i18n.changeLanguage(value)
    setLanguage(value)
  }

  function toggleMenu(): void {
    const isOpen = !isMenuOpen

    setIsMenuOpen(isOpen)
    storage.setIsMenuOpen(isOpen)
  }

  return (
    <>
      <div className="text-base font-bold">{t('settings.appearance.title')}</div>
      <Divider />

      {/* language */}
      <div className="flex items-center justify-between pt-3">
        <div className="flex items-center space-x-1">
          <LanguagesIcon size={16} />
          <span>{t('settings.appearance.language')}</span>
        </div>

        <Select
          defaultValue={i18n.language}
          style={{ width: 180 }}
          options={options}
          onSelect={changeLanguage}
        />
      </div>

      {/* menu bar */}
      <div className="flex items-center justify-between pt-6">
        <div className="flex flex-col">
          <span>{t('settings.appearance.menu')}</span>
          <span className="text-xs text-neutral-500">{t('settings.appearance.menuTips')}</span>
        </div>

        <Switch value={isMenuOpen} onChange={toggleMenu} />
      </div>
    </>
  )
}
