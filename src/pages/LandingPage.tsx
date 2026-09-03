import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { UserRole } from '../App'
import Logo from '../components/Logo'

interface LandingPageProps {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

const suppliers = [
  { name: 'Mie Organik Halal Premium', supplier: 'PT Berkah Foods', price: 'Rp 35.000', img: '🍜' },
  { name: 'Bumbu Rendang Spesial', supplier: 'PT Bumbu Nusantara', price: 'Rp 28.000', img: '🫙' },
  { name: 'Beras Pandan Wangi 5kg', supplier: 'UD Jaya Beras', price: 'Rp 85.000', img: '🌾' },
]

export default function LandingPage({ onNavigate, onSetRole }: LandingPageProps) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'EN' : 'ID'
  const [activeNav, setActiveNav] = useState('Beranda')
  const [showLoginMenu, setShowLoginMenu] = useState(false)

  const navItems = [
    { label: t('nav.home', 'Beranda'), page: '' },
    { label: t('nav.productCatalog', 'Katalog'), page: 'product-catalog' },
    { label: t('nav.verification', 'Verifikasi'), page: 'verification' },
    { label: t('nav.tutorial', 'Tutorial'), page: 'tutorial' },
    { label: t('nav.marketing', 'Marketing'), page: 'marketing' },
  ]

  function handleNav(item: { label: string; page: string }) {
    setActiveNav(item.label)
    if (item.page) onNavigate(item.page)
  }

  function changeLang(newLang: 'ID' | 'EN') {
    i18n.changeLanguage(newLang.toLowerCase())
  }

  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <Logo onClick={() => onNavigate('landing')} />

        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className={`text-sm font-medium pb-1 transition-colors ${
                activeNav === item.label
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
            <button 
              onClick={() => changeLang('ID')} 
              className={`transition-colors ${lang === 'ID' ? 'font-bold text-green-700' : 'hover:text-gray-900 text-gray-400'}`}
            >
              ID
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => changeLang('EN')} 
              className={`transition-colors ${lang === 'EN' ? 'font-bold text-green-700' : 'hover:text-gray-900 text-gray-400'}`}
            >
              EN
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowLoginMenu(!showLoginMenu)}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              {t('common.login', 'Masuk')} ▾
            </button>
            {showLoginMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 w-52 py-2 z-50">
                <button 
                  onClick={() => { onSetRole('seller'); onNavigate('login-seller'); setShowLoginMenu(false) }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 flex items-center gap-2 transition-colors">
                  🛒 <span className="font-medium">{t('auth.seller', 'Penjual (Seller)')}</span>
                </button>
                <button 
                  onClick={() => { onSetRole('distributor'); onNavigate('login-distributor'); setShowLoginMenu(false) }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2 transition-colors">
                  🚛 <span className="font-medium">{t('auth.distributor', 'Distributor')}</span>
                </button>
                <button 
                  onClick={() => { onSetRole('customer'); onNavigate('login-customer'); setShowLoginMenu(false) }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-2 transition-colors">
                  👤 <span className="font-medium">{t('auth.customer', 'Konsumen')}</span>
                </button>
                <div className="h-px bg-gray-100 my-1" />
                <button 
                  onClick={() => { onNavigate('register'); setShowLoginMenu(false) }}
                  className="w-full text-left px-4 py-2.5 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2 transition-colors font-semibold">
                  📝 {t('register.title', 'Daftar Baru')}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 via-amber-50 to-blue-50 px-8 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
            {t('landing.hero.title', 'Rantai Pasok Halal Transparan')}<br/>
            <span className="text-green-600">{t('landing.hero.subtitle', 'untuk UMKM Indonesia')}</span>
          </h1>
          <p className="text-gray-500 text-base mb-8 max-w-2xl mx-auto">
            {t('landing.hero.description', 'Dari hulu ke hilir – terverifikasi secara real-time dengan SUKAHALAL.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => { onSetRole('customer'); onNavigate('product-catalog'); }}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-7 py-3 rounded-xl text-sm transition-colors shadow-md"
            >
              {t('landing.hero.ctaGuest', 'Jelajahi Katalog')}
            </button>
            <button
              onClick={() => onNavigate('verification')}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-7 py-3 rounded-xl text-sm transition-colors shadow-md"
            >
              {t('landing.hero.cta', 'Ajukan Verifikasi')}
            </button>
          </div>

          {/* Supply chain illustration */}
          <div className="mt-12 flex items-center justify-center gap-0 overflow-x-auto pb-2">
            {[
              { icon: '🌾', label: 'Petani' },
              { icon: '🏭', label: 'Produsen' },
              { icon: '📦', label: 'Packager' },
              { icon: '🚛', label: 'Distributor' },
              { icon: '🏪', label: 'Retailer' }
            ].map((item, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-2xl border border-gray-100">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-600 font-medium mt-1.5 whitespace-nowrap">{item.label}</span>
                </div>
                {i < 4 && <div className="w-8 h-0.5 bg-green-300 mx-1 mt-[-14px]" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="px-8 py-10 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: '🛡️', title: t('landing.features.transparency', 'Transparansi Data'), desc: t('landing.features.transparencyDesc', 'Transparansi data yang dapat diverifikasi secara real-time'), bg: 'bg-blue-50', page: 'supply-chain' },
            { icon: '🤖', title: t('landing.features.aiAssist', 'AI-Assist Dokumen'), desc: t('landing.features.aiAssistDesc', 'Terverifikasi AI-Assist dokumen yang cepat dan akurat'), bg: 'bg-green-50', page: 'upload-dokumen' },
            { icon: '🏪', title: t('landing.features.marketplace', 'Marketplace B2B2C'), desc: t('landing.features.marketplaceDesc', 'Marketplace dan jaringan distribusi B2B2C terintegrasi'), bg: 'bg-amber-50', page: 'product-catalog' },
          ].map((f, i) => (
            <button
              key={i}
              onClick={() => onNavigate(f.page)}
              className={`${f.bg} rounded-2xl p-6 flex gap-4 items-start text-left hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="text-3xl">{f.icon}</div>
              <div>
                <div className="font-bold text-gray-800 text-sm mb-1">{f.title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{f.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Suppliers */}
      <section className="px-8 py-10 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900 text-lg">Featured Suppliers</h2>
            <button onClick={() => onNavigate('supplier-catalog')} className="text-sm text-green-600 hover:underline font-medium">
              {t('common.viewAll', 'Lihat Semua')} →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suppliers.map((s, i) => (
              <button
                key={i}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-3 items-center hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onNavigate('supplier-profile')}
              >
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-2xl">{s.img}</div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="font-semibold text-gray-800 text-sm truncate">{s.name}</div>
                  <div className="text-xs text-gray-500">Supplier : {s.supplier}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-green-700 font-bold text-sm">{s.price}</span>
                    <span className="text-green-600 text-xs font-semibold">✅ {t('common.halalCertified', 'Halal')}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Login Options */}
      <section className="px-8 py-12 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-extrabold text-2xl text-gray-900 mb-2">Masuk ke Platform SUKAHALAL</h2>
          <p className="text-gray-500 text-sm mb-8">Pilih peran Anda untuk mengakses fitur yang sesuai</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              { role: 'Penjual (Seller)', roleId: 'seller' as UserRole, desc: 'Kelola inventaris & verifikasi produk halal Anda', page: 'login-seller', color: 'bg-green-600 hover:bg-green-700', icon: '🛒' },
              { role: 'Distributor', roleId: 'distributor' as UserRole, desc: 'Kelola jaringan distribusi produk halal bersertifikat', page: 'login-distributor', color: 'bg-blue-600 hover:bg-blue-700', icon: '🚛' },
              { role: 'Konsumen', roleId: 'customer' as UserRole, desc: 'Temukan dan beli produk halal terpercaya', page: 'login-customer', color: 'bg-purple-600 hover:bg-purple-700', icon: '👤' },
            ].map((r, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center gap-3 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl">{r.icon}</div>
                <div className="font-bold text-gray-800">{r.role}</div>
                <div className="text-xs text-gray-500 text-center leading-relaxed">{r.desc}</div>
                <button
                  onClick={() => { onSetRole(r.roleId); onNavigate(r.page); }}
                  className={`${r.color} text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors w-full shadow-sm cursor-pointer`}
                >
                  {t('common.login', 'Masuk')}
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => onNavigate('register')} className="mt-6 text-green-600 font-semibold text-sm hover:underline cursor-pointer">
            {t('auth.noAccount', 'Belum punya akun?')} {t('register.registerNow', 'Daftar Sekarang')} →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 bg-gray-100 border-t border-gray-200 text-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2024 SUKAHALAL Indonesia. Semua hak dilindungi.</p>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('tutorial')} className="text-xs text-gray-500 hover:text-gray-700">{t('nav.tutorial', 'Tutorial')}</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => onNavigate('verification')} className="text-xs text-gray-500 hover:text-gray-700">{t('nav.verification', 'Verifikasi')}</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => onNavigate('product-catalog')} className="text-xs text-gray-500 hover:text-gray-700">{t('nav.productCatalog', 'Katalog')}</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => onNavigate('register')} className="text-xs text-gray-500 hover:text-gray-700">{t('register.title', 'Daftar')}</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
