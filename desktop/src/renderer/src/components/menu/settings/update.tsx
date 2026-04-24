import { ReactElement } from 'react'
import { Divider, Result } from 'antd'
import { useTranslation } from 'react-i18next'

export const Update = (): ReactElement => {
  const { t } = useTranslation()

  return (
    <>
      <div className="text-base font-bold">{t('settings.update.title')}</div>
      <Divider />

      <Result
        subTitle="Auto-update is disabled for the X86 fork"
      />
    </>
  )
}