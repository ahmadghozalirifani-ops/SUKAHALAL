import { useTranslation } from 'react-i18next'
import Logo from './Logo'
import LanguageToggle from './LanguageToggle'

type Page = string

interface BreadcrumbItem {
  label: string
  page?: Page
}

interface Props {
  items: BreadcrumbItem[]
  onNavigate: (page: string) => void
  userRole?: string
  rightContent?: React.ReactNode
}

export default function Breadcrumb({ items, onNavigate, userRole, rightContent }: Props) {
  const roleColors: Record<string, string> = {
    seller: 'bg-green-100 text-green-700',
    distributor: 'bg-blue-100 text-blue-700',
    customer: 'bg-violet-100 text-violet-700',
    guest: 'bg-gray-100 text-gray-600',
  }
  const roleLabels: Record<string, string> = {
    seller: '🛒 Penjual',
    distributor: '🚛 Distributor',
    customer: '👤 Konsumen',
    guest: '🌐 Tamu',
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button onClick={() => onNavigate('landing')} className="text-gray-400 hover:text-gray-600 transition-colors">
        🏠
      </button>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="text-gray-300 text-sm">/</span>
          {item.page ? (
            <button
              onClick={() => onNavigate(item.page!)}
              className="text-sm text-green-600 hover:text-green-700 font-medium hover:underline transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-sm text-gray-700 font-semibold">{item.label}</span>
          )}
        </span>
      ))}
      {rightContent}
    </div>
  )
}
