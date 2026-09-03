import React from 'react'
import { useTranslation } from 'react-i18next'
import Logo from './Logo'

interface Props {
  onNavigate: (page: string) => void
  userRole: string
  currentPage?: string
  currentRoute?: string
  onSetRole?: (role: any) => void
}

const sellerNav = [
  { icon: '⊞', label: 'Dashboard Utama', page: 'dashboard' },
  { icon: '📦', label: 'Katalog Produk', page: 'product-catalog' },
  { icon: '🛠️', label: 'Kelola Produk & SKU', page: 'product-management' },
  { icon: '🛒', label: 'Pesanan Masuk (12)', page: 'pesanan' },
  { icon: '📋', label: 'Stok & Bahan Baku (BOM)', page: 'inventaris' },
  { icon: '🛡️', label: 'Pusat Verifikasi BPJPH', page: 'verification' },
  { icon: '📄', label: 'Unggah Dokumen SJPH', page: 'upload-dokumen' },
  { icon: '📢', label: 'Pemasaran & Promo', page: 'marketing' },
  { icon: '📊', label: 'Laporan Penjualan', page: 'laporan' },
  { icon: '📖', label: 'Panduan & Edukasi', page: 'tutorial' },
]

const distributorNav = [
  { icon: '⊞', label: 'Dashboard Utama', page: 'dashboard' },
  { icon: '🚚', label: 'Rantai Pasok & IoT', page: 'supply-chain' },
  { icon: '🏢', label: 'Direktori Pemasok', page: 'supplier-catalog' },
  { icon: '📋', label: 'Manifest Muatan (3)', page: 'pesanan' },
  { icon: '📦', label: 'Inventaris Gudang Transit', page: 'inventaris' },
  { icon: '🛡️', label: 'SOP Sanitasi Bebas Najis', page: 'verification' },
  { icon: '📊', label: 'Laporan Pengiriman', page: 'laporan' },
  { icon: '📖', label: 'Panduan Logistik', page: 'tutorial' },
]

const customerNav = [
  { icon: '⊞', label: 'Dashboard Utama', page: 'dashboard' },
  { icon: '🛍️', label: 'Belanja Produk Halal', page: 'product-catalog' },
  { icon: '🏢', label: 'Jelajahi Produsen UMKM', page: 'supplier-catalog' },
  { icon: '🛒', label: 'Keranjang Belanja', page: 'cart' },
  { icon: '📦', label: 'Pesanan & Lacak Kurir', page: 'pesanan' },
  { icon: '📖', label: 'Literasi & Edukasi Halal', page: 'tutorial' },
]

const sellerKPIs = [
  { icon: '💰', label: 'Omzet Penjualan', value: 'Rp 48,6 Jt', color: 'bg-emerald-500', trend: { value: '+14%', positive: true } },
  { icon: '🛒', label: 'Pesanan Masuk', value: '12 Order', color: 'bg-amber-500', trend: { value: '8 Grosir', positive: true } },
  { icon: '📦', label: 'SKU Aktif SiHalal', value: '8 Produk', color: 'bg-blue-500' },
  { icon: '🛡️', label: 'Status SJPH', value: 'Level A', color: 'bg-emerald-600' },
]

const distributorKPIs = [
  { icon: '🚛', label: 'Armada Bertugas', value: '18 Truk', color: 'bg-blue-500', trend: { value: '100% GPS', positive: true } },
  { icon: '❄️', label: 'Suhu Cold Chain', value: '-18.4°C', color: 'bg-cyan-500' },
  { icon: '🔒', label: 'Segel RFID', value: '100% Aman', color: 'bg-emerald-500' },
  { icon: '🛡️', label: 'Izin Halal Logistik', value: 'Aktif', color: 'bg-blue-600' },
]

const customerKPIs = [
  { icon: '🛒', label: 'Item Keranjang', value: '3 Produk', color: 'bg-purple-500' },
  { icon: '📦', label: 'Paket Di Jalan', value: '1 Paket', color: 'bg-blue-500' },
  { icon: '❤️', label: 'Wishlist Favorit', value: '12 Item', color: 'bg-pink-500' },
]

export default function AppSidebar({ onNavigate, userRole, currentPage, currentRoute, onSetRole }: Props) {
  const { t } = useTranslation()
  const activePage = currentPage || currentRoute

  const navItems = userRole === 'seller' ? sellerNav : userRole === 'distributor' ? distributorNav : customerNav
  const kpis = userRole === 'seller' ? sellerKPIs : userRole === 'distributor' ? distributorKPIs : customerKPIs

  const activeBg: Record<string, string> = {
    seller: 'bg-emerald-700 text-white shadow-xs',
    distributor: 'bg-blue-700 text-white shadow-xs',
    customer: 'bg-purple-700 text-white shadow-xs',
  }
  const hoverBg: Record<string, string> = {
    seller: 'hover:bg-emerald-50 hover:text-emerald-800',
    distributor: 'hover:bg-blue-50 hover:text-blue-800',
    customer: 'hover:bg-purple-50 hover:text-purple-800',
  }

  const roleGradient: Record<string, string> = {
    seller: 'from-emerald-950 via-emerald-900 to-teal-900',
    distributor: 'from-slate-950 via-blue-950 to-cyan-950',
    customer: 'from-purple-950 via-indigo-950 to-slate-900',
  }

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 overflow-y-auto font-sans">
      {/* Brand Header */}
      <div className="px-4 py-3.5 border-b border-slate-100 bg-white flex items-center justify-between">
        <Logo size="sm" onClick={() => onNavigate(userRole === 'guest' ? 'landing' : 'dashboard')} />
      </div>

      {/* Role Banner */}
      <div className={`bg-gradient-to-r ${roleGradient[userRole] || 'from-emerald-900 to-teal-900'} p-4 text-white`}>
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-0.5">Portal Hak Akses</div>
        <div className="font-extrabold text-sm flex items-center gap-1.5">
          {userRole === 'seller' ? '🏪 Produsen / UMKM'
          : userRole === 'distributor' ? '🚚 Distributor & Logistik'
          : '🛍️ Konsumen Pembeli'}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePage === item.page
                ? (activeBg[userRole] || activeBg.seller)
                : 'text-slate-600 ' + (hoverBg[userRole] || hoverBg.seller)
            }`}
          >
            <span className="text-base shrink-0">{item.icon}</span>
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* KPI Section */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 px-1">
          Indikator Kinerja Role
        </div>
        <div className="space-y-1.5">
          {kpis.map((kpi, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200/80 shadow-2xs text-xs">
              <div className="flex items-center gap-2">
                <span>{kpi.icon}</span>
                <span className="text-[11px] text-slate-600 font-medium">{kpi.label}</span>
              </div>
              <span className="font-extrabold text-slate-900 text-xs">{kpi.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={() => onNavigate('logout')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <span>🚪</span> Keluar ke Beranda Tamu
        </button>
      </div>
    </aside>
  )
}
