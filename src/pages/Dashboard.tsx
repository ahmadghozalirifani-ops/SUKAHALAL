import { useState } from 'react'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

const sellerNav = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'product-catalog', label: 'Katalog Produk', icon: '📦' },
  { id: 'pesanan', label: 'Pesanan', icon: '🛒' },
  { id: 'inventaris', label: 'Inventaris', icon: '📦' },
  { id: 'verification', label: 'Verifikasi Halal', icon: '🛡️' },
  { id: 'upload-dokumen', label: 'Upload Dokumen', icon: '📄' },
  { id: 'marketing', label: 'Marketing', icon: '📢' },
  { id: 'laporan', label: 'Laporan', icon: '📊' },
  { id: 'settings', label: 'Pengaturan', icon: '⚙️' },
]

const distributorNav = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'supply-chain', label: 'Rantai Pasok', icon: '🔗' },
  { id: 'supplier-catalog', label: 'Katalog Supplier', icon: '🏢' },
  { id: 'verification', label: 'Verifikasi Halal', icon: '🛡️' },
  { id: 'inventaris', label: 'Inventaris', icon: '📦' },
  { id: 'laporan', label: 'Laporan', icon: '📊' },
  { id: 'settings', label: 'Pengaturan', icon: '⚙️' },
]

const customerNav = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'product-catalog', label: 'Katalog Produk', icon: '📦' },
  { id: 'cart', label: 'Keranjang', icon: '🛒' },
  { id: 'pesanan', label: 'Pesanan Saya', icon: '📋' },
  { id: 'tutorial', label: 'Tutorial', icon: '📖' },
  { id: 'settings', label: 'Pengaturan', icon: '⚙️' },
]

const defaultNav = sellerNav

const sellerStats = [
  { label: 'Total Produk Terverifikasi', value: '128', change: '+12%', color: 'text-green-600', highlight: true },
  { label: 'Dokumen Pending', value: '5', color: 'text-amber-500', highlight: false },
  { label: 'Pesanan Aktif', value: '23', color: 'text-gray-800', highlight: false },
  { label: 'Supplier Terdaftar', value: '47', color: 'text-gray-800', highlight: false },
]

const distributorStats = [
  { label: 'Rute Distribusi Aktif', value: '12', change: '+8%', color: 'text-blue-600', highlight: true },
  { label: 'Supplier Terhubung', value: '34', color: 'text-teal-600', highlight: false },
  { label: 'Pengiriman Hari Ini', value: '8', color: 'text-amber-500', highlight: false },
  { label: 'Sertifikasi Aktif', value: '15', color: 'text-green-600', highlight: false },
]

const customerStats = [
  { label: 'Pesanan Aktif', value: '3', color: 'text-blue-600', highlight: true },
  { label: 'Wishlist', value: '12', color: 'text-pink-500', highlight: false },
  { label: 'Riwayat Belanja', value: '28', color: 'text-gray-800', highlight: false },
  { label: 'Poin Loyalty', value: '1.250', change: '+150', color: 'text-amber-500', highlight: false },
]

const activities = [
  { icon: '📄', text: 'Dokumen diunggah oleh', bold: 'PT Berkah Jaya', time: '25 minutes ago', color: 'text-blue-500' },
  { icon: '✅', text: 'Verifikasi disetujui untuk', bold: 'Produk Mie Halal', time: '25 minutes ago', color: 'text-green-500' },
  { icon: '✅', text: 'Verifikasi diajukan untuk', bold: 'Produk Ayam Beku', time: '1 hour ago', color: 'text-green-500' },
  { icon: '⏳', text: 'Review BPJPH pending untuk', bold: 'Sambal Organik', time: '2 hours ago', color: 'text-amber-500' },
]

function SupplyChainFlow() {
  const nodes = ['Supplier', 'Manufacturer', 'Packager', 'Distributor', 'Customer']
  const colors = ['#0e7490', '#0891b2', '#06b6d4', '#22d3ee', '#67e8f9']
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[560px] h-36 relative flex items-center px-4">
        <div className="absolute inset-x-4 top-8 bottom-8 rounded-xl overflow-hidden">
          <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 800 80">
            <defs>
              <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0e7490" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.9"/>
              </linearGradient>
              <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.7"/>
              </linearGradient>
            </defs>
            <path d="M0,5 C200,5 600,15 800,15 L800,45 C600,45 200,35 0,35 Z" fill="url(#g1)"/>
            <path d="M0,40 C200,38 600,48 800,55 L800,65 C600,58 200,48 0,52 Z" fill="url(#g2)"/>
            <path d="M0,58 C200,56 600,68 800,72 L800,78 C600,74 200,62 0,64 Z" fill="#cffafe" opacity="0.5"/>
          </svg>
        </div>
        <div className="relative z-10 flex justify-between w-full px-2">
          {nodes.map((node, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-sm" style={{ backgroundColor: colors[i] }}>
                {node}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard({ onNavigate, userRole }: Props) {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const navItems = userRole === 'distributor' ? distributorNav : userRole === 'customer' ? customerNav : defaultNav
  const stats = userRole === 'distributor' ? distributorStats : userRole === 'customer' ? customerStats : sellerStats

  function handleNav(id: string) {
    setActiveNav(id)
    if (id !== 'dashboard') onNavigate(id)
  }

  const userName = userRole === 'seller' ? 'Ahmad Seller' : userRole === 'distributor' ? 'PT Distribusi Halal' : userRole === 'customer' ? 'Budi Customer' : 'User'

  return (
    <div className="flex h-screen bg-gray-50 font-['Inter',sans-serif] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="flex items-center gap-2 px-5 py-5 border-b border-gray-100 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-extrabold text-sm">S</div>
          <span className="font-extrabold text-green-700 text-sm">SUKAHALAL</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(item => (
            <button key={item.id} onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeNav === item.id ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-gray-100">
          <button onClick={() => onNavigate('logout')} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors font-medium">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button onClick={() => onNavigate('landing')} className="hover:text-gray-700">Home</button>
            <span>›</span>
            <span className="text-gray-900 font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('notifikasi')} className="relative w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
              🔔
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">3</span>
            </button>
            <div className="relative">
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-sm">
                  {userRole === 'seller' ? '🛒' : userRole === 'distributor' ? '🚛' : '👤'}
                </div>
                <span className="text-sm text-gray-600 font-medium">{userName}</span>
                <span className="text-gray-400">▾</span>
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-200 w-48 py-1 z-50">
                  <button onClick={() => { onNavigate('settings'); setShowProfileMenu(false) }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    ⚙️ Pengaturan
                  </button>
                  <button onClick={() => { onNavigate('notifikasi'); setShowProfileMenu(false) }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    🔔 Notifikasi
                  </button>
                  <button onClick={() => { onNavigate('tutorial'); setShowProfileMenu(false) }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    📖 Tutorial
                  </button>
                  <div className="h-px bg-gray-100 my-1" />
                  <button onClick={() => { onNavigate('logout'); setShowProfileMenu(false) }} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2">
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Role badge */}
          <div className="mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              userRole === 'seller' ? 'bg-green-100 text-green-700' : userRole === 'distributor' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
            }`}>
              {userRole === 'seller' ? '🛒 Mode Penjual' : userRole === 'distributor' ? '🚛 Mode Distributor' : '👤 Mode Konsumen'}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((s, i) => (
              <div key={i} className={`bg-white rounded-2xl p-5 border ${s.highlight ? 'border-green-200' : 'border-gray-100'} shadow-sm`}>
                <div className="text-xs text-gray-500 mb-2">{s.label}</div>
                <div className={`text-3xl font-extrabold ${s.color} flex items-end gap-2`}>
                  {s.value}
                  {s.change && <span className="text-sm text-green-500 font-medium mb-1">{s.change} ↗</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-gray-800 text-sm">Alur Rantai Pasok</div>
                <button onClick={() => onNavigate('supply-chain')} className="text-xs text-green-600 hover:underline">Kelola →</button>
              </div>
              <SupplyChainFlow />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="font-semibold text-gray-800 mb-4 text-sm">Quick Actions</div>
              <div className="space-y-3">
                {userRole === 'customer' ? (
                  <>
                    {[
                      { label: 'Jelajahi Katalog', icon: '📦', page: 'product-catalog' },
                      { label: 'Lihat Keranjang', icon: '🛒', page: 'cart' },
                      { label: 'Pesanan Saya', icon: '📋', page: 'pesanan' },
                    ].map((a, i) => (
                      <button key={i} onClick={() => onNavigate(a.page)}
                        className="bg-purple-600 hover:bg-purple-700 text-white w-full text-sm font-semibold py-3 rounded-xl transition-colors flex items-center gap-2 px-4">
                        <span>{a.icon}</span> {a.label}
                      </button>
                    ))}
                  </>
                ) : userRole === 'distributor' ? (
                  <>
                    {[
                      { label: 'Kelola Rantai Pasok', icon: '🔗', page: 'supply-chain' },
                      { label: 'Lihat Supplier', icon: '🏢', page: 'supplier-catalog' },
                      { label: 'Upload Dokumen', icon: '⬆', page: 'upload-dokumen' },
                    ].map((a, i) => (
                      <button key={i} onClick={() => onNavigate(a.page)}
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full text-sm font-semibold py-3 rounded-xl transition-colors flex items-center gap-2 px-4">
                        <span>{a.icon}</span> {a.label}
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    {[
                      { label: 'Add Supplier', icon: '👤', page: 'supplier-catalog' },
                      { label: 'Upload Document', icon: '⬆', page: 'upload-dokumen' },
                      { label: 'Create Promo', icon: '📢', page: 'marketing' },
                    ].map((a, i) => (
                      <button key={i} onClick={() => onNavigate(a.page)}
                        className="bg-teal-600 hover:bg-teal-700 text-white w-full text-sm font-semibold py-3 rounded-xl transition-colors flex items-center gap-2 px-4">
                        <span>{a.icon}</span> {a.label}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Shortcuts */}
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {userRole === 'customer' ? (
              <>
                {[
                  { label: 'Katalog', value: '120+', icon: '📦', page: 'product-catalog', color: 'text-green-600' },
                  { label: 'Keranjang', value: '3 item', icon: '🛒', page: 'cart', color: 'text-amber-600' },
                  { label: 'Pesanan', value: '3 aktif', icon: '📋', page: 'pesanan', color: 'text-blue-600' },
                  { label: 'Tutorial', value: 'Panduan', icon: '📖', page: 'tutorial', color: 'text-purple-600' },
                ].map((s, i) => (
                  <button key={i} onClick={() => onNavigate(s.page)}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow text-left">
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <div className={`text-lg font-extrabold ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                  </button>
                ))}
              </>
            ) : (
              <>
                {[
                  { label: 'Pesanan Aktif', value: '23', icon: '🛒', page: 'pesanan', color: 'text-blue-600' },
                  { label: 'Inventaris', value: '6 SKU', icon: '📦', page: 'inventaris', color: 'text-amber-600' },
                  { label: 'Laporan', value: 'Lihat', icon: '📊', page: 'laporan', color: 'text-purple-600' },
                  { label: 'Rantai Pasok', value: '5 Node', icon: '🔗', page: 'supply-chain', color: 'text-teal-600' },
                ].map((s, i) => (
                  <button key={i} onClick={() => onNavigate(s.page)}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow text-left">
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <div className={`text-lg font-extrabold ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Recent Activity */}
          <div className="mt-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-gray-800 text-sm">Recent Activity</div>
              <button onClick={() => onNavigate('laporan')} className="text-xs text-green-600 hover:underline">Lihat Semua →</button>
            </div>
            <div className="space-y-3">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-sm shrink-0 ${a.color}`}>
                    {a.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {a.text} <span className="font-semibold text-gray-900">{a.bold}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
