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
  const { i18n } = useTranslation()

  function navigate(page: string) {
    // Handle logout
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
      // Scroll to top on navigation
      window.scrollTo(0, 0)
    }
  }

  function handleSetRole(role: UserRole) {
    setUserRole(role)
  }

  const props = { onNavigate: navigate, userRole, onSetRole: handleSetRole }

  return (
    <div className="h-full relative">
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
    </div>
  )
}
