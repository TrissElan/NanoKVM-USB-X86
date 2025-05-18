// This file is kept for compatibility but all functionality has been removed
// for Windows ARM64 build

import { ReactElement } from 'react'
import { Divider } from 'antd'
import { useTranslation } from 'react-i18next'

export const Update = (): ReactElement => {
  const { t } = useTranslation()

  return (
    <>
      <div className="text-base font-bold">{t('settings.update.title')}</div>
      <Divider />
      <div className="p-4 text-center">
        Auto-update is not supported in Windows ARM64 version.
      </div>
    </>
  )
}
