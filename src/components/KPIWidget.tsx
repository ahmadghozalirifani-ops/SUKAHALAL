interface Props {
  icon?: string
  label?: string
  title?: string
  value: string | number
  sub?: string
  trend?: { value: string; positive: boolean } | string | number
  color?: string
  status?: string
  alert?: boolean
}

export default function KPIWidget({ 
  icon, 
  label, 
  title, 
  value, 
  sub, 
  trend, 
  color = 'bg-green-500',
  alert = false
}: Props) {
  const displayLabel = label || title || ''
  const displayIcon = icon || (alert ? '⚠️' : '📊')

  const parsedTrend = typeof trend === 'object' && trend !== null
    ? trend
    : typeof trend === 'number'
    ? { value: `${trend > 0 ? '+' : ''}${trend}%`, positive: trend >= 0 }
    : typeof trend === 'string'
    ? { 
        value: trend, 
        positive: !trend.includes('-') && !trend.toLowerCase().includes('turun') && !trend.toLowerCase().includes('restok') && !trend.toLowerCase().includes('perlu') 
      }
    : null

  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm border ${alert ? 'border-amber-200 bg-amber-50/20' : 'border-gray-100'} hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${color} bg-opacity-10 flex items-center justify-center text-xl`}>
          {displayIcon}
        </div>
        {parsedTrend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            parsedTrend.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {parsedTrend.positive ? '↑' : '↓'} {parsedTrend.value}
          </span>
        )}
      </div>
      <div className="text-2xl font-extrabold text-gray-900 font-heading">{value}</div>
      <div className="text-xs font-medium text-gray-500 mt-0.5">{displayLabel}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  )
}
