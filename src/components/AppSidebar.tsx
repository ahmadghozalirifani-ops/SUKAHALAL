import { useTranslation } from 'react-i18next'
import KPIWidget from './KPIWidget'
import Logo from './Logo'

interface Props {
  onNavigate: (page: string) => void
  userRole: string
  currentPage?: string
  currentRoute?: string
  onSetRole?: (role: any) => void
}

const sellerNav = [
  { icon: '⊞', label: 'nav.dashboard', page: 'dashboard' },
  { icon: '📦', label: 'nav.productCatalog', page: 'product-catalog' },
  { icon: '🛠️', label: 'nav.productManagement', page: 'product-management' },
  { icon: '🛒', label: 'nav.orders', page: 'pesanan' },
  { icon: '📋', label: 'nav.inventory', page: 'inventaris' },
  { icon: '🛡️', label: 'nav.verification', page: 'verification' },
  { icon: '📄', label: 'nav.uploadDocument', page: 'upload-dokumen' },
  { icon: '📢', label: 'nav.marketing', page: 'marketing' },
  { icon: '📊', label: 'nav.reports', page: 'laporan' },
  { icon: '📖', label: 'nav.tutorial', page: 'tutorial' },
]

const distributorNav = [
  { icon: '⊞', label: 'nav.dashboard', page: 'dashboard' },
  { icon: '🔗', label: 'nav.supplyChain', page: 'supply-chain' },
  { icon: '🏢', label: 'nav.supplierCatalog', page: 'supplier-catalog' },
  { icon: '🛒', label: 'nav.orders', page: 'pesanan' },
  { icon: '📋', label: 'nav.inventory', page: 'inventaris' },
  { icon: '🛡️', label: 'nav.verification', page: 'verification' },
  { icon: '📊', label: 'nav.reports', page: 'laporan' },
  { icon: '📖', label: 'nav.tutorial', page: 'tutorial' },
]

const customerNav = [
  { icon: '⊞', label: 'nav.dashboard', page: 'dashboard' },
  { icon: '📦', label: 'nav.productCatalog', page: 'product-catalog' },
  { icon: '🏢', label: 'nav.supplierCatalog', page: 'supplier-catalog' },
  { icon: '🛒', label: 'nav.cart', page: 'cart' },
  { icon: '📋', label: 'nav.orders', page: 'pesanan' },
  { icon: '📖', label: 'nav.tutorial', page: 'tutorial' },
]

const sellerKPIs = [
  { icon: '💰', label: 'dashboard.kpi.revenue', value: 'Rp 24,8 Jt', color: 'bg-green-500', trend: { value: '+12%', positive: true } },
  { icon: '🛒', label: 'dashboard.kpi.orders', value: '48', color: 'bg-amber-500', trend: { value: '+5', positive: true } },
  { icon: '📦', label: 'dashboard.kpi.products', value: '127', color: 'bg-blue-500' },
  { icon: '🛡️', label: 'dashboard.kpi.certValid', value: '23', color: 'bg-green-500' },
  { icon: '⚠️', label: 'dashboard.kpi.stockAlert', value: '4', color: 'bg-red-500', trend: { value: 'perlu restok', positive: false } },
]

const distributorKPIs = [
  { icon: '🚛', label: 'dashboard.kpi.deliveries', value: '67', color: 'bg-blue-500', trend: { value: '+8', positive: true } },
  { icon: '🤝', label: 'dashboard.kpi.partners', value: '34', color: 'bg-cyan-500' },
  { icon: '🗺️', label: 'dashboard.kpi.coverage', value: '12 Prov', color: 'bg-indigo-500' },
  { icon: '🛡️', label: 'dashboard.kpi.certValid', value: '19', color: 'bg-green-500' },
]

const customerKPIs = [
  { icon: '🛒', label: 'dashboard.kpi.cartItems', value: '3', color: 'bg-violet-500' },
  { icon: '❤️', label: 'dashboard.kpi.wishlist', value: '12', color: 'bg-pink-500' },
  { icon: '📋', label: 'dashboard.kpi.orderHistory', value: '8', color: 'bg-purple-500' },
]

export default function AppSidebar({ onNavigate, userRole, currentPage, currentRoute }: Props) {
  const { t } = useTranslation()
  const activePage = currentPage || currentRoute

  const navItems = userRole === 'seller' ? sellerNav : userRole === 'distributor' ? distributorNav : customerNav
  const kpis = userRole === 'seller' ? sellerKPIs : userRole === 'distributor' ? distributorKPIs : customerKPIs

  const activeBg: Record<string, string> = {
    seller: 'bg-green-600 text-white',
    distributor: 'bg-blue-600 text-white',
    customer: 'bg-violet-600 text-white',
  }
  const hoverBg: Record<string, string> = {
    seller: 'hover:bg-green-50 hover:text-green-700',
    distributor: 'hover:bg-blue-50 hover:text-blue-700',
    customer: 'hover:bg-violet-50 hover:text-violet-700',
  }

  const roleGradient: Record<string, string> = {
    seller: 'from-green-600 to-teal-500',
    distributor: 'from-blue-600 to-cyan-500',
    customer: 'from-violet-600 to-purple-500',
  }

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Brand Header */}
      <div className="px-4 py-3.5 border-b border-gray-100 bg-white flex items-center justify-between">
        <Logo size="sm" onClick={() => onNavigate('landing')} />
      </div>

      {/* Role Banner */}
      <div className={`bg-gradient-to-r ${roleGradient[userRole] || 'from-green-600 to-teal-500'} p-4 text-white`}>
        <div className="text-xs font-semibold opacity-80 mb-1">{t('common.dashboard', 'Dashboard')}</div>
        <div className="font-extrabold text-sm">
          {userRole === 'seller' ? '🛒 ' + t('roles.seller', 'Penjual')
          : userRole === 'distributor' ? '🚛 ' + t('roles.distributor', 'Distributor')
          : '👤 ' + t('roles.customer', 'Konsumen')}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(item => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activePage === item.page
                ? (activeBg[userRole] || activeBg.seller)
                : 'text-gray-600 ' + (hoverBg[userRole] || hoverBg.seller)
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span>{t(item.label)}</span>
          </button>
        ))}
      </nav>

      {/* KPI Section */}
      <div className="p-3 border-t border-gray-100">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 px-1">KPI</div>
        <div className="space-y-2">
          {kpis.map((kpi, i) => (
            <KPIWidget key={i} {...kpi} label={t(kpi.label)} />
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={() => onNavigate('logout')}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          🚪 {t('common.logout', 'Keluar')}
        </button>
      </div>
    </aside>
  )
}
