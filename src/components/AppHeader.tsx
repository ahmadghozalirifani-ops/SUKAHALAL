import React from 'react'
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
  showBackButton?: boolean
  backPage?: string
}

export default function AppHeader({ 
  onNavigate = () => {}, 
  userRole = 'guest', 
  breadcrumbs = [], 
  title,
  breadcrumb,
  notifCount = 3,
  showBackButton = false,
  backPage = 'dashboard'
}: Props) {
  const { t } = useTranslation()

  const effectiveBreadcrumbs: BreadcrumbItem[] = breadcrumbs.length > 0
    ? breadcrumbs
    : (breadcrumb || title)
    ? [{ label: t('breadcrumbs.dashboard', 'Dashboard'), page: 'dashboard' }, { label: breadcrumb || title || '' }]
    : []

  const roleBadgeColor: Record<string, string> = {
    seller: 'bg-green-100 text-green-800 border-green-200',
    distributor: 'bg-blue-100 text-blue-800 border-blue-200',
    customer: 'bg-purple-100 text-purple-800 border-purple-200',
    guest: 'bg-gray-100 text-gray-700 border-gray-200',
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
    customer: 'border-purple-100',
    guest: 'border-gray-100',
  }

  return (
    <header className={`bg-white border-b ${headerBg[userRole] || 'border-gray-100'} sticky top-0 z-30 shadow-2xs`}>
      <div className="max-w-screen-xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Logo + Back button + Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            {showBackButton && (
              <button
                onClick={() => onNavigate(backPage)}
                className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 text-xs font-bold transition-colors cursor-pointer"
                title="Kembali"
              >
                ←
              </button>
            )}

            <Logo size="sm" onClick={() => onNavigate('landing')} />

            {effectiveBreadcrumbs.length > 0 && (
              <div className="hidden sm:block">
                <Breadcrumb items={effectiveBreadcrumbs} onNavigate={onNavigate} userRole={userRole} />
              </div>
            )}
          </div>

          {/* Quick Header Jump Links */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-gray-600">
            <button 
              onClick={() => onNavigate('product-catalog')} 
              className="px-2.5 py-1.5 rounded-lg hover:bg-gray-100 hover:text-green-700 transition-colors"
            >
              📦 Produk
            </button>
            <button 
              onClick={() => onNavigate('supplier-catalog')} 
              className="px-2.5 py-1.5 rounded-lg hover:bg-gray-100 hover:text-green-700 transition-colors"
            >
              🏢 Supplier
            </button>
            <button 
              onClick={() => onNavigate('supply-chain')} 
              className="px-2.5 py-1.5 rounded-lg hover:bg-gray-100 hover:text-blue-700 transition-colors"
            >
              🚚 Rantai Pasok
            </button>
            <button 
              onClick={() => onNavigate('verification')} 
              className="px-2.5 py-1.5 rounded-lg hover:bg-gray-100 hover:text-amber-700 transition-colors"
            >
              🛡️ Verifikasi
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <LanguageToggle />
            
            {userRole !== 'guest' ? (
              <>
                <button
                  onClick={() => onNavigate('cart')}
                  className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-700 text-xs transition-colors"
                  title="Keranjang Belanja"
                >
                  🛒
                </button>
                <button
                  onClick={() => onNavigate('notifikasi')}
                  className="relative w-8 h-8 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
                  title="Notifikasi"
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
                  className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
                  title="Pengaturan"
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
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('login-seller')}
                  className="px-3 py-1.5 bg-green-700 text-white text-xs font-semibold rounded-lg hover:bg-green-800 transition-colors"
                >
                  Masuk Penjual
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
