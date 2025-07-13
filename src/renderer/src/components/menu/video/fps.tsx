import { ReactElement } from 'react'
import { Select } from 'antd'
import { GaugeIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { camera } from '@renderer/libs/camera'

const FPS_OPTIONS = [
  { label: '15 FPS', value: 15 },
  { label: '30 FPS', value: 30 },
  { label: '45 FPS', value: 45 },
  { label: '60 FPS', value: 60 }
]

export const FPS = (): ReactElement => {
  const { t } = useTranslation()

  const handleChange = async (fps: number): Promise<void> => {
    try {
      await camera.updateFPS(fps)
    } catch (error) {
      // FPS 변경 실패 시 무시 (사용자에게 별도 알림 불필요)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <GaugeIcon size={16} className="text-white" />
      <span className="text-sm text-white">{t('video.fps')}:</span>
      <Select
        defaultValue={30}
        size="small"
        style={{ width: 80 }}
        options={FPS_OPTIONS}
        onChange={handleChange}
      />
    </div>
  )
}
