import { useState } from 'react'
import type { UserRole } from '../App'

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

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [lang, setLang] = useState<'ID' | 'EN'>('ID')
  const [activeNav, setActiveNav] = useState('Beranda')
  const [showLoginMenu, setShowLoginMenu] = useState(false)

  const navItems = [
    { label: 'Beranda', page: '' },
    { label: 'Katalog', page: 'product-catalog' },
    { label: 'Verifikasi', page: 'verification' },
    { label: 'Tutorial', page: 'tutorial' },
    { label: 'Marketing', page: 'marketing' },
  ]

  function handleNav(item: { label: string; page: string }) {
    setActiveNav(item.label)
    if (item.page) onNavigate(item.page)
  }

  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center text-white font-extrabold text-lg">S</div>
          <span className="text-green-700 font-extrabold text-lg tracking-tight">SUKAHALAL</span>
        </div>
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
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <button onClick={() => setLang('ID')} className={lang === 'ID' ? 'font-bold text-gray-900' : 'hover:text-gray-900'}>ID</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => setLang('EN')} className={lang === 'EN' ? 'font-bold text-gray-900' : 'hover:text-gray-900'}>EN</button>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowLoginMenu(!showLoginMenu)}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
            >
              Login ▾
            </button>
            {showLoginMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 w-52 py-2 z-50">
                <button onClick={() => { onNavigate('login-seller'); setShowLoginMenu(false) }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 flex items-center gap-2 transition-colors">
                  🛒 <span className="font-medium">Penjual (Seller)</span>
                </button>
                <button onClick={() => { onNavigate('login-distributor'); setShowLoginMenu(false) }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2 transition-colors">
                  🚛 <span className="font-medium">Distributor</span>
                </button>
                <button onClick={() => { onNavigate('login-customer'); setShowLoginMenu(false) }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-2 transition-colors">
                  👤 <span className="font-medium">Konsumen</span>
                </button>
                <div className="h-px bg-gray-100 my-1" />
                <button onClick={() => { onNavigate('register'); setShowLoginMenu(false) }}
                  className="w-full text-left px-4 py-2.5 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2 transition-colors font-semibold">
                  📝 Daftar Baru
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
            Rantai Pasok Halal Transparan<br/>
            <span className="text-green-600">untuk UMKM</span>
          </h1>
          <p className="text-gray-500 text-base mb-8">Dari hulu ke hilir – terverifikasi secara real-time dengan SUKAHALAL</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('product-catalog')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-7 py-3 rounded-xl text-sm transition-colors shadow-md"
            >
              Jelajahi Katalog
            </button>
            <button
              onClick={() => onNavigate('verification')}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-7 py-3 rounded-xl text-sm transition-colors shadow-md"
            >
              Ajukan Verifikasi
            </button>
          </div>

          {/* Supply chain illustration */}
          <div className="mt-12 flex items-center justify-center gap-0 overflow-x-auto pb-2">
            {['🌾 Petani', '🏭 Produsen', '📦 Packager', '🚛 Distributor', '🏪 Retailer'].map((item, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-2xl">
                    {item.split(' ')[0]}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 whitespace-nowrap">{item.split(' ')[1]}</span>
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
            { icon: '🛡️', title: 'Transparansi Data', desc: 'Transparansi data yang dapat diverifikasi secara real-time', bg: 'bg-blue-50', page: 'supply-chain' },
            { icon: '🤖', title: 'AI-Assist Dokumen', desc: 'Terverifikasi AI-Assist dokumen yang cepat dan akurat', bg: 'bg-green-50', page: 'upload-dokumen' },
            { icon: '🏪', title: 'Marketplace B2B2C', desc: 'Marketplace dan jaringan distribusi B2B2C terintegrasi', bg: 'bg-amber-50', page: 'product-catalog' },
          ].map((f, i) => (
            <button
              key={i}
              onClick={() => onNavigate(f.page)}
              className={`${f.bg} rounded-2xl p-6 flex gap-4 items-start text-left hover:shadow-md transition-shadow`}
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
              Lihat Semua →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suppliers.map((s, i) => (
              <button
                key={i}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-3 items-center hover:shadow-md transition-shadow"
                onClick={() => onNavigate('supplier-profile')}
              >
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-2xl">{s.img}</div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="font-semibold text-gray-800 text-sm truncate">{s.name}</div>
                  <div className="text-xs text-gray-500">Supplier : {s.supplier}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-green-700 font-bold text-sm">{s.price}</span>
                    <span className="text-green-600 text-xs font-semibold">✅ Halal</span>
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
              { role: 'Penjual (Seller)', desc: 'Kelola inventaris & verifikasi produk halal Anda', page: 'login-seller', color: 'bg-green-600 hover:bg-green-700', icon: '🛒' },
              { role: 'Distributor', desc: 'Kelola jaringan distribusi produk halal bersertifikat', page: 'login-distributor', color: 'bg-blue-600 hover:bg-blue-700', icon: '🚛' },
              { role: 'Konsumen', desc: 'Temukan dan beli produk halal terpercaya', page: 'login-customer', color: 'bg-purple-600 hover:bg-purple-700', icon: '👤' },
            ].map((r, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center gap-3 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl">{r.icon}</div>
                <div className="font-bold text-gray-800">{r.role}</div>
                <div className="text-xs text-gray-500 text-center">{r.desc}</div>
                <button
                  onClick={() => onNavigate(r.page)}
                  className={`${r.color} text-white text-sm font-semibold px-6 py-2 rounded-xl transition-colors w-full`}
                >
                  Masuk
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => onNavigate('register')} className="mt-6 text-green-600 font-semibold text-sm hover:underline">
            Belum punya akun? Daftar Sekarang →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-5 bg-gray-100 border-t border-gray-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2024 SUKAHALAL Indonesia. Semua hak dilindungi.</p>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('tutorial')} className="text-xs text-gray-400 hover:text-gray-600">Tutorial</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => onNavigate('verification')} className="text-xs text-gray-400 hover:text-gray-600">Verifikasi</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => onNavigate('product-catalog')} className="text-xs text-gray-400 hover:text-gray-600">Katalog</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => onNavigate('register')} className="text-xs text-gray-400 hover:text-gray-600">Daftar</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
