import { ReactElement } from 'react'
import { Popover } from 'antd'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import { ArrowDownUpIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { scrollDirectionAtom } from '@renderer/jotai/mouse'
import * as storage from '@renderer/libs/storage'

export const Direction = (): ReactElement => {
  const { t } = useTranslation()

  const [scrollDirection, setScrollDirection] = useAtom(scrollDirectionAtom)

  const directions = [
    { name: t('mouse.scrollUp'), value: '1' },
    { name: t('mouse.scrollDown'), value: '-1' }
  ]

  function update(direction: string): void {
    const value = Number(direction);

    setScrollDirection(value)
    storage.setMouseScrollDirection(value)
  }

  const content = (
    <>
      {directions.map((direction) => (
        <div
          key={direction.value}
          className={clsx(
            'my-1 flex cursor-pointer items-center space-x-1 rounded py-1 pr-5 pl-2 hover:bg-neutral-700/60',
            direction.value === scrollDirection.toString() ? 'text-blue-500' : 'text-neutral-300'
          )}
          onClick={() => update(direction.value)}
        >
          {direction.name}
        </div>
      ))}
    </>
  )

  return (
    <Popover content={content} placement="rightTop" arrow={false} align={{ offset: [13, 0] }}>
      <div className="flex h-[30px] cursor-pointer items-center space-x-1 rounded px-3 text-neutral-300 hover:bg-neutral-700/60">
        <div className="flex h-[14px] w-[20px] items-end">
          <ArrowDownUpIcon size={16} />
        </div>
        <span>{t('mouse.direction')}</span>
      </div>
    </Popover>
  )
}
