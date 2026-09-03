import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LandingPage from './pages/LandingPage'
import LoginSeller from './pages/LoginSeller'
import LoginDistributor from './pages/LoginDistributor'
import LoginCustomer from './pages/LoginCustomer'
import Dashboard from './pages/Dashboard'
import SupplierCatalog from './pages/SupplierCatalog'
import SupplierProfile from './pages/SupplierProfile'
import ProductCatalog from './pages/ProductCatalog'
import ProductDetail from './pages/ProductDetail'
import ProductManagement from './pages/ProductManagement'
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
  | 'product-catalog' | 'product-detail' | 'product-management' | 'verification'
  | 'upload-dokumen' | 'tutorial' | 'marketing' | 'pesanan'
  | 'laporan' | 'inventaris' | 'supply-chain' | 'settings'
  | 'cart' | 'notifikasi' | 'register'

const ALL_PAGES: Page[] = [
  'landing', 'login-seller', 'login-distributor', 'login-customer',
  'dashboard', 'supplier-catalog', 'supplier-profile',
  'product-catalog', 'product-detail', 'product-management', 'verification',
  'upload-dokumen', 'tutorial', 'marketing', 'pesanan',
  'laporan', 'inventaris', 'supply-chain', 'settings',
  'cart', 'notifikasi', 'register',
]

export default function App() {
  const [current, setCurrent] = useState<Page>('landing')
  const [userRole, setUserRole] = useState<UserRole>('guest')
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false)
  const { i18n } = useTranslation()

  function navigate(page: string) {
    if (page === 'logout') {
      setUserRole('guest')
      setCurrent('landing')
      return
    }

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
      'product-management': 'product-management',
    }
    const target = (mapped[page] ?? page) as Page

    if (ALL_PAGES.includes(target)) {
      setCurrent(target)
      window.scrollTo(0, 0)
    }
  }

  function handleSetRole(role: UserRole) {
    setUserRole(role)
  }

  function handleQuickRoleSwitch(role: UserRole) {
    setUserRole(role)
    if (role === 'guest') {
      setCurrent('landing')
    } else {
      setCurrent('dashboard')
    }
    setShowRoleSwitcher(false)
  }

  const props = { onNavigate: navigate, userRole, onSetRole: handleSetRole }

  return (
    <div className="h-full relative font-['Inter',sans-serif]">
      {/* Dynamic Main Page Content */}
      {current === 'landing' && <LandingPage {...props} />}
      {current === 'login-seller' && <LoginSeller {...props} />}
      {current === 'login-distributor' && <LoginDistributor {...props} />}
      {current === 'login-customer' && <LoginCustomer {...props} />}
      {current === 'dashboard' && <Dashboard {...props} />}
      {current === 'supplier-catalog' && <SupplierCatalog {...props} />}
      {current === 'supplier-profile' && <SupplierProfile {...props} />}
      {current === 'product-catalog' && <ProductCatalog {...props} />}
      {current === 'product-detail' && <ProductDetail {...props} />}
      {current === 'product-management' && <ProductManagement {...props} />}
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

      {/* Floating Demo Role Switcher Bar for Prototype Testing */}
      <div className="fixed bottom-4 right-4 z-[9999]">
        {showRoleSwitcher ? (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-4 w-72 mb-2 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-green-700">
                <span>⚡</span> PROTOYPE ROLE SWITCHER
              </div>
              <button onClick={() => setShowRoleSwitcher(false)} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
            </div>
            <p className="text-[11px] text-gray-500 leading-tight">
              Pilih peran untuk menguji tampilan & kebutuhan masing-masing akun:
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              <button onClick={() => handleQuickRoleSwitch('seller')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  userRole === 'seller' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-800 hover:bg-green-100'
                }`}>
                <span>🛒 Penjual (Seller UMKM)</span>
                {userRole === 'seller' && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Aktif</span>}
              </button>
              <button onClick={() => handleQuickRoleSwitch('distributor')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  userRole === 'distributor' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                }`}>
                <span>🚛 Distributor</span>
                {userRole === 'distributor' && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Aktif</span>}
              </button>
              <button onClick={() => handleQuickRoleSwitch('customer')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  userRole === 'customer' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
                }`}>
                <span>👤 Konsumen (Customer)</span>
                {userRole === 'customer' && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Aktif</span>}
              </button>
              <button onClick={() => handleQuickRoleSwitch('guest')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  userRole === 'guest' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                <span>🌐 Tamu / Guest (Landing)</span>
                {userRole === 'guest' && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Aktif</span>}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowRoleSwitcher(true)}
            className="bg-gray-900/90 hover:bg-gray-900 text-white px-3.5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold transition-all border border-gray-700 backdrop-blur-md hover:scale-105"
          >
            <span>⚡ Mode:</span>
            <span className={`px-2 py-0.5 rounded-md text-[11px] ${
              userRole === 'seller' ? 'bg-green-500 text-white' : userRole === 'distributor' ? 'bg-blue-500 text-white' : userRole === 'customer' ? 'bg-purple-500 text-white' : 'bg-gray-600 text-white'
            }`}>
              {userRole === 'seller' ? '🛒 Seller' : userRole === 'distributor' ? '🚛 Distributor' : userRole === 'customer' ? '👤 Customer' : '🌐 Guest'}
            </span>
            <span className="text-gray-400">⚙️</span>
          </button>
        )}
      </div>
    </div>
  )
}
