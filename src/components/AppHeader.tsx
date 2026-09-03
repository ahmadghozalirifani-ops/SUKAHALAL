import { useTranslation } from 'react-i18next'
import Logo from './Logo'
import LanguageToggle from './LanguageToggle'
import Breadcrumb from './Breadcrumb'

interface BreadcrumbItem {
  label: string
  page?: string
}

interface Props {
  onNavigate?: (page: string) => void
  userRole?: string
  breadcrumbs?: BreadcrumbItem[]
  title?: string
  breadcrumb?: string
  onSetRole?: (role: any) => void
  notifCount?: number
}

export default function AppHeader({ 
  onNavigate = () => {}, 
  userRole = 'guest', 
  breadcrumbs = [], 
  title,
  breadcrumb,
  notifCount = 3 
}: Props) {
  const { t } = useTranslation()

  const effectiveBreadcrumbs: BreadcrumbItem[] = breadcrumbs.length > 0
    ? breadcrumbs
    : (breadcrumb || title)
    ? [{ label: t('breadcrumbs.dashboard', 'Dashboard'), page: 'dashboard' }, { label: breadcrumb || title || '' }]
    : []

  const roleBadgeColor: Record<string, string> = {
    seller: 'bg-green-100 text-green-700 border-green-200',
    distributor: 'bg-blue-100 text-blue-700 border-blue-200',
    customer: 'bg-violet-100 text-violet-700 border-violet-200',
    guest: 'bg-gray-100 text-gray-600 border-gray-200',
  }
  const roleLabels: Record<string, string> = {
    seller: '🛒 ' + t('roles.seller', 'Penjual'),
    distributor: '🚛 ' + t('roles.distributor', 'Distributor'),
    customer: '👤 ' + t('roles.customer', 'Konsumen'),
    guest: '🌐 ' + t('roles.guest', 'Tamu'),
  }

  const headerBg: Record<string, string> = {
    seller: 'border-green-100',
    distributor: 'border-blue-100',
    customer: 'border-violet-100',
    guest: 'border-gray-100',
  }

  return (
    <header className={`bg-white border-b ${headerBg[userRole] || 'border-gray-100'} sticky top-0 z-30 shadow-sm`}>
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Logo + Breadcrumb */}
          <div className="flex items-center gap-4 min-w-0">
            <Logo size="sm" onClick={() => onNavigate('landing')} />
            {effectiveBreadcrumbs.length > 0 && (
              <div className="hidden sm:block">
                <Breadcrumb items={effectiveBreadcrumbs} onNavigate={onNavigate} userRole={userRole} />
              </div>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <LanguageToggle />
            {userRole !== 'guest' && (
              <>
                <button
                  onClick={() => onNavigate('notifikasi')}
                  className="relative w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
                >
                  🔔
                  {notifCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {notifCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => onNavigate('settings')}
                  className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
                >
                  ⚙️
                </button>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${
                    roleBadgeColor[userRole] || roleBadgeColor.guest
                  }`}
                >
                  {roleLabels[userRole] || roleLabels.guest}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
