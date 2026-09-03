import { useTranslation } from 'react-i18next'

export type TLSStatus = 'green' | 'yellow' | 'red'

interface Props {
  status: TLSStatus
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function TrafficLightStatus({ status, showLabel = true, size = 'md' }: Props) {
  const { t } = useTranslation()
  const dotSizes = { sm: 'w-2.5 h-2.5', md: 'w-3.5 h-3.5', lg: 'w-5 h-5' }
  const config = {
    green: { dot: 'bg-green-500 shadow-green-300', label: t('verification.trafficLight.green'), bg: 'bg-green-50 text-green-700 border-green-200' },
    yellow: { dot: 'bg-amber-400 shadow-amber-200', label: t('verification.trafficLight.yellow'), bg: 'bg-amber-50 text-amber-700 border-amber-200' },
    red: { dot: 'bg-red-500 shadow-red-300', label: t('verification.trafficLight.red'), bg: 'bg-red-50 text-red-700 border-red-200' },
  }[status]

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${config.bg}`}>
      <span className={`rounded-full shadow-sm animate-pulse ${dotSizes[size]} ${config.dot}`} />
      {showLabel && config.label}
    </span>
  )
}
