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
  const [dockTab, setDockTab] = useState<'role' | 'pages'>('pages')
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
      'ProductDetail': 'product-detail',
      'katalog': 'product-catalog',
      'products': 'product-catalog',
      'suppliers': 'supplier-catalog',
      'verification-center': 'verification',
    }
    const target = (mapped[page] ?? page) as Page

    if (ALL_PAGES.includes(target)) {
      setCurrent(target)
      window.scrollTo(0, 0)
    }
  }

  function handleSetRole(role: UserRole, targetPage?: string) {
    setUserRole(role)
    if (targetPage && ALL_PAGES.includes(targetPage as Page)) {
      setCurrent(targetPage as Page)
    } else if (role === 'guest') {
      setCurrent('landing')
    } else {
      setCurrent('dashboard')
    }
    window.scrollTo(0, 0)
  }

  function handleQuickRoleSwitch(role: UserRole) {
    handleSetRole(role)
    setShowRoleSwitcher(false)
  }

  const props = { onNavigate: navigate, userRole, onSetRole: handleSetRole }

  const quickNavPages: { label: string; page: Page; icon: string; roleOnly?: UserRole }[] = [
    { label: 'Beranda Publik', page: 'landing', icon: '🌐' },
    { label: 'Dashboard Utama', page: 'dashboard', icon: '📊' },
    { label: 'Katalog Produk Halal', page: 'product-catalog', icon: '📦' },
    { label: 'Detail Produk & Trace', page: 'product-detail', icon: '🔍' },
    { label: 'Katalog Supplier', page: 'supplier-catalog', icon: '🏢' },
    { label: 'Profil Supplier', page: 'supplier-profile', icon: '🌾' },
    { label: 'Rantai Pasok & IoT', page: 'supply-chain', icon: '🚚' },
    { label: 'Pusat Verifikasi BPJPH', page: 'verification', icon: '🛡️' },
    { label: 'Inventaris & Stok', page: 'inventaris', icon: '📋' },
    { label: 'Pesanan Masuk', page: 'pesanan', icon: '🛒' },
    { label: 'Keranjang Belanja', page: 'cart', icon: '🛍️' },
    { label: 'Upload Dokumen Halal', page: 'upload-dokumen', icon: '📄' },
    { label: 'Panduan & Edukasi', page: 'tutorial', icon: '📖' },
  ]

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

      {/* Floating Demo Role Switcher & Quick Navigation Dock */}
      <div className="fixed bottom-4 right-4 z-[9999]">
        {showRoleSwitcher ? (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 p-4 w-80 mb-2 space-y-3 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-green-700">
                <span>⚡</span> SUKAHALAL NAVIGATOR
              </div>
              <button 
                onClick={() => setShowRoleSwitcher(false)} 
                className="text-gray-400 hover:text-gray-600 text-xs font-bold w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Sub Tabs: Ganti Peran vs Lompat Halaman */}
            <div className="flex bg-gray-100 p-1 rounded-xl text-[11px] font-bold">
              <button
                onClick={() => setDockTab('pages')}
                className={`flex-1 py-1 rounded-lg transition-colors ${dockTab === 'pages' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-800'}`}
              >
                🚀 Lompat Halaman
              </button>
              <button
                onClick={() => setDockTab('role')}
                className={`flex-1 py-1 rounded-lg transition-colors ${dockTab === 'role' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-800'}`}
              >
                🎭 Ganti Peran
              </button>
            </div>

            {/* Tab 1: Lompat Halaman Langsung */}
            {dockTab === 'pages' && (
              <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                {quickNavPages.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      navigate(item.page);
                      setShowRoleSwitcher(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                      current === item.page 
                        ? 'bg-green-700 text-white font-bold' 
                        : 'bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                    {current === item.page && <span className="text-[9px] bg-white/25 px-1.5 py-0.5 rounded">Aktif</span>}
                  </button>
                ))}
              </div>
            )}

            {/* Tab 2: Pilih Peran Akun */}
            {dockTab === 'role' && (
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
                  <span>🚛 Distributor Cold Chain</span>
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
            )}

            {/* Current Page Status Footer */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
              <span>Halaman aktif: <strong>{current}</strong></span>
              <button 
                onClick={() => navigate('landing')}
                className="text-green-700 font-bold hover:underline"
              >
                Ke Beranda
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowRoleSwitcher(true)}
            className="bg-gray-900/95 hover:bg-black text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-bold transition-all border border-gray-700 backdrop-blur-md hover:scale-105 cursor-pointer"
            title="Buka Navigasi & Switcher Peran"
          >
            <span className="text-amber-400">⚡ Navigasi:</span>
            <span className={`px-2 py-0.5 rounded-md text-[11px] ${
              userRole === 'seller' ? 'bg-green-600 text-white' : userRole === 'distributor' ? 'bg-blue-600 text-white' : userRole === 'customer' ? 'bg-purple-600 text-white' : 'bg-gray-600 text-white'
            }`}>
              {userRole === 'seller' ? '🛒 Seller' : userRole === 'distributor' ? '🚛 Distributor' : userRole === 'customer' ? '👤 Customer' : '🌐 Guest'}
            </span>
            <span className="text-gray-400">☰</span>
          </button>
        )}
      </div>
    </div>
  )
}
