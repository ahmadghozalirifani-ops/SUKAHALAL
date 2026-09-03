import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import LoginSeller from './pages/LoginSeller'
import LoginDistributor from './pages/LoginDistributor'
import LoginCustomer from './pages/LoginCustomer'
import Dashboard from './pages/Dashboard'
import SupplierCatalog from './pages/SupplierCatalog'
import SupplierProfile from './pages/SupplierProfile'
import ProductCatalog from './pages/ProductCatalog'
import ProductDetail from './pages/ProductDetail'
import VerificationCenter from './pages/VerificationCenter'
import UploadDokumen from './pages/UploadDokumen'
import Tutorial from './pages/Tutorial'
import Marketing from './pages/Marketing'
import Pesanan from './pages/Pesanan'
import Laporan from './pages/Laporan'
import Inventaris from './pages/Inventaris'
import SupplyChain from './pages/SupplyChain'
import Settings from './pages/Settings'
import Keranjang from './pages/Keranjang'
import Notifikasi from './pages/Notifikasi'
import Register from './pages/Register'

export type UserRole = 'guest' | 'seller' | 'distributor' | 'customer'

type Page =
  | 'landing' | 'login-seller' | 'login-distributor' | 'login-customer'
  | 'dashboard' | 'supplier-catalog' | 'supplier-profile'
  | 'product-catalog' | 'product-detail' | 'verification'
  | 'upload-dokumen' | 'tutorial' | 'marketing' | 'pesanan'
  | 'laporan' | 'inventaris' | 'supply-chain' | 'settings'
  | 'cart' | 'notifikasi' | 'register'

const PAGE_LABELS: Record<Page, string> = {
  'landing': '🏠 Landing Page',
  'login-seller': '🛒 Login Penjual',
  'login-distributor': '🚛 Login Distributor',
  'login-customer': '👤 Login Konsumen',
  'dashboard': '⊞ Dashboard',
  'supplier-catalog': '🏢 Katalog Supplier',
  'supplier-profile': '👤 Profil Supplier',
  'product-catalog': '📦 Katalog Produk',
  'product-detail': '🏷 Detail Produk',
  'verification': '🛡️ Pusat Verifikasi',
  'upload-dokumen': '📄 Upload Dokumen',
  'tutorial': '📖 Tutorial',
  'marketing': '📢 Marketing',
  'pesanan': '🛒 Pesanan',
  'laporan': '📊 Laporan',
  'inventaris': '📦 Inventaris',
  'supply-chain': '🔗 Rantai Pasok',
  'settings': '⚙️ Pengaturan',
  'cart': '🛒 Keranjang',
  'notifikasi': '🔔 Notifikasi',
  'register': '📝 Daftar',
}

const ALL_PAGES: Page[] = [
  'landing', 'login-seller', 'login-distributor', 'login-customer',
  'dashboard', 'supplier-catalog', 'supplier-profile',
  'product-catalog', 'product-detail', 'verification',
  'upload-dokumen', 'tutorial', 'marketing', 'pesanan',
  'laporan', 'inventaris', 'supply-chain', 'settings',
  'cart', 'notifikasi', 'register',
]

const PAGE_GROUPS = [
  { label: 'Publik', pages: ['landing', 'login-seller', 'login-distributor', 'login-customer', 'register'] as Page[] },
  { label: 'Dashboard', pages: ['dashboard', 'supplier-catalog', 'supplier-profile', 'product-catalog', 'product-detail'] as Page[] },
  { label: 'Operasional', pages: ['verification', 'upload-dokumen', 'pesanan', 'inventaris', 'supply-chain', 'cart'] as Page[] },
  { label: 'Lainnya', pages: ['laporan', 'tutorial', 'marketing', 'notifikasi', 'settings'] as Page[] },
]

export default function App() {
  const [current, setCurrent] = useState<Page>('landing')
  const [navOpen, setNavOpen] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>('guest')

  function navigate(page: string) {
    const mapped: Record<string, Page> = {
      'orders': 'pesanan',
      'logistics': 'inventaris',
      'analytics': 'laporan',
      'certifications': 'verification',
      'support': 'tutorial',
      'support2': 'tutorial',
      'settings': 'settings',
      'settings2': 'settings',
      'upload': 'upload-dokumen',
      'inventory': 'inventaris',
      'cart': 'cart',
      'keranjang': 'cart',
      'notifikasi': 'notifikasi',
      'register': 'register',
      'daftar': 'register',
      'logout': 'landing',
    }
    const target = mapped[page] ?? page

    // Handle logout
    if (page === 'logout') {
      setUserRole('guest')
      setCurrent('landing')
      return
    }

    if (ALL_PAGES.includes(target as Page)) {
      setCurrent(target as Page)
    }
  }

  function handleSetRole(role: UserRole) {
    setUserRole(role)
  }

  const props = { onNavigate: navigate, userRole, onSetRole: handleSetRole }

  return (
    <div className="h-full relative">
      {/* Floating nav */}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end gap-2">
        {navOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 w-56 mb-1 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-6 h-6 bg-green-600 rounded-md flex items-center justify-center text-white font-extrabold text-[10px]">S</div>
              <span className="font-extrabold text-green-700 text-xs">SUKAHALAL</span>
              <span className="ml-auto text-xs text-gray-400">
                {userRole === 'guest' ? 'Guest' : userRole === 'seller' ? '🛒 Seller' : userRole === 'distributor' ? '🚛 Distributor' : '👤 Customer'}
              </span>
            </div>
            {PAGE_GROUPS.map(group => (
              <div key={group.label} className="mb-3">
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wide px-2 py-1 mb-1">{group.label}</div>
                {group.pages.map(page => (
                  <button key={page} onClick={() => { setCurrent(page); setNavOpen(false) }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      current === page ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {PAGE_LABELS[page]}
                  </button>
                ))}
              </div>
            ))}
            {userRole !== 'guest' && (
              <button onClick={() => { setUserRole('guest'); setCurrent('landing'); setNavOpen(false) }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                🚪 Logout
              </button>
            )}
          </div>
        )}
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-xl flex items-center justify-center text-xl transition-all"
          title="Navigasi halaman"
        >
          {navOpen ? '✕' : '☰'}
        </button>
      </div>

      {current === 'landing' && <LandingPage {...props} />}
      {current === 'login-seller' && <LoginSeller {...props} />}
      {current === 'login-distributor' && <LoginDistributor {...props} />}
      {current === 'login-customer' && <LoginCustomer {...props} />}
      {current === 'dashboard' && <Dashboard {...props} />}
      {current === 'supplier-catalog' && <SupplierCatalog {...props} />}
      {current === 'supplier-profile' && <SupplierProfile {...props} />}
      {current === 'product-catalog' && <ProductCatalog {...props} />}
      {current === 'product-detail' && <ProductDetail {...props} />}
      {current === 'verification' && <VerificationCenter {...props} />}
      {current === 'upload-dokumen' && <UploadDokumen {...props} />}
      {current === 'tutorial' && <Tutorial {...props} />}
      {current === 'marketing' && <Marketing {...props} />}
      {current === 'pesanan' && <Pesanan {...props} />}
      {current === 'laporan' && <Laporan {...props} />}
      {current === 'inventaris' && <Inventaris {...props} />}
      {current === 'supply-chain' && <SupplyChain {...props} />}
      {current === 'settings' && <Settings {...props} />}
      {current === 'cart' && <Keranjang {...props} />}
      {current === 'notifikasi' && <Notifikasi {...props} />}
      {current === 'register' && <Register {...props} />}
    </div>
  )
}
