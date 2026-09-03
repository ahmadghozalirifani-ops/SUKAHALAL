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
  { icon: '▪', label: 'Dashboard', page: 'dashboard', emoji: '📊' },
  { icon: '▪', label: 'Katalog Produk', page: 'product-catalog', emoji: '📦' },
  { icon: '▪', label: 'Kelola Produk & SKU', page: 'product-management', emoji: '🛠️' },
  { icon: '▪', label: 'Pesanan Masuk', page: 'pesanan', emoji: '🛒', badge: '12' },
  { icon: '▪', label: 'Stok & BOM', page: 'inventaris', emoji: '📋' },
  { icon: '▪', label: 'Verifikasi BPJPH', page: 'verification', emoji: '🛡️' },
  { icon: '▪', label: 'Upload Dokumen', page: 'upload-dokumen', emoji: '📄' },
  { icon: '▪', label: 'Pemasaran & Promo', page: 'marketing', emoji: '📢' },
  { icon: '▪', label: 'Laporan Penjualan', page: 'laporan', emoji: '📊' },
  { icon: '▪', label: 'Panduan & Edukasi', page: 'tutorial', emoji: '📖' },
]

const distributorNav = [
  { icon: '▪', label: 'Dashboard', page: 'dashboard', emoji: '📊' },
  { icon: '▪', label: 'Rantai Pasok & IoT', page: 'supply-chain', emoji: '🚚' },
  { icon: '▪', label: 'Direktori Pemasok', page: 'supplier-catalog', emoji: '🏢' },
  { icon: '▪', label: 'Manifest Muatan', page: 'pesanan', emoji: '📋', badge: '3' },
  { icon: '▪', label: 'Inventaris Gudang', page: 'inventaris', emoji: '📦' },
  { icon: '▪', label: 'SOP Sanitasi Halal', page: 'verification', emoji: '🛡️' },
  { icon: '▪', label: 'Laporan Pengiriman', page: 'laporan', emoji: '📊' },
  { icon: '▪', label: 'Panduan Logistik', page: 'tutorial', emoji: '📖' },
]

const customerNav = [
  { icon: '▪', label: 'Dashboard', page: 'dashboard', emoji: '📊' },
  { icon: '▪', label: 'Belanja Produk Halal', page: 'product-catalog', emoji: '🛍️' },
  { icon: '▪', label: 'Jelajahi Produsen', page: 'supplier-catalog', emoji: '🏢' },
  { icon: '▪', label: 'Keranjang Belanja', page: 'cart', emoji: '🛒', badge: '3' },
  { icon: '▪', label: 'Pesanan & Lacak', page: 'pesanan', emoji: '📦' },
  { icon: '▪', label: 'Literasi Halal', page: 'tutorial', emoji: '📖' },
]

const sellerKPIs = [
  { emoji: '💰', label: 'Omzet', value: 'Rp 48,6 Jt', color: '#22C55E' },
  { emoji: '🛒', label: 'Pesanan', value: '12 Order', color: '#F59E0B' },
  { emoji: '📦', label: 'SKU Aktif', value: '8 Produk', color: '#60A5FA' },
  { emoji: '🛡️', label: 'Status SJPH', value: 'Level A', color: '#22C55E' },
]
const distributorKPIs = [
  { emoji: '🚛', label: 'Armada', value: '18 Truk', color: '#60A5FA' },
  { emoji: '❄️', label: 'Suhu Cold Chain', value: '-18.4°C', color: '#22D3EE' },
  { emoji: '🔒', label: 'Segel RFID', value: '100% Aman', color: '#22C55E' },
]
const customerKPIs = [
  { emoji: '🛒', label: 'Keranjang', value: '3 Produk', color: '#A78BFA' },
  { emoji: '📦', label: 'Di Jalan', value: '1 Paket', color: '#60A5FA' },
  { emoji: '❤️', label: 'Wishlist', value: '12 Item', color: '#F472B6' },
]

const roleConfig: Record<string, { label: string; emoji: string; color: string; bg: string }> = {
  seller:      { label: 'Produsen / UMKM',        emoji: '🏪', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
  distributor: { label: 'Distributor & Logistik', emoji: '🚚', color: '#60A5FA', bg: 'rgba(96,165,250,0.15)' },
  customer:    { label: 'Konsumen Pembeli',        emoji: '🛍️', color: '#A78BFA', bg: 'rgba(167,139,250,0.15)' },
}

export default function AppSidebar({ onNavigate, userRole, currentPage, currentRoute, onSetRole }: Props) {
  const { t } = useTranslation()
  const activePage = currentPage || currentRoute

  const navItems = userRole === 'seller' ? sellerNav : userRole === 'distributor' ? distributorNav : customerNav
  const kpis     = userRole === 'seller' ? sellerKPIs : userRole === 'distributor' ? distributorKPIs : customerKPIs
  const role     = roleConfig[userRole] || roleConfig.seller

  const activeColorMap: Record<string, string> = {
    seller:      'rgba(34,197,94,0.18)',
    distributor: 'rgba(96,165,250,0.18)',
    customer:    'rgba(167,139,250,0.18)',
  }
  const activeTextColorMap: Record<string, string> = {
    seller:      '#4ADE80',
    distributor: '#93C5FD',
    customer:    '#C4B5FD',
  }

  const activeBg   = activeColorMap[userRole]   || activeColorMap.seller
  const activeText = activeTextColorMap[userRole] || activeTextColorMap.seller

  return (
    <aside
      className="w-64 shrink-0 flex flex-col h-screen sticky top-0 overflow-y-auto font-sans"
      style={{
        background: 'linear-gradient(180deg, #0A1628 0%, #0D1F35 60%, #0A1628 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* ─── Brand Header ─── */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <Logo size="sm" onClick={() => onNavigate(userRole === 'guest' ? 'landing' : 'dashboard')} />
      </div>

      {/* ─── Role Badge ─── */}
      <div className="px-4 py-3">
        <div
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl"
          style={{ background: role.bg, border: `1px solid ${role.color}22` }}
        >
          <span className="text-lg">{role.emoji}</span>
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Portal Hak Akses
            </div>
            <div className="text-xs font-bold" style={{ color: role.color }}>
              {role.label}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Navigation ─── */}
      <nav className="flex-1 px-3 py-1 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
          const isActive = activePage === item.page
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer group"
              style={{
                background:  isActive ? activeBg : 'transparent',
                color:       isActive ? activeText : 'rgba(255,255,255,0.52)',
                border:      isActive ? `1px solid ${role.color}30` : '1px solid transparent',
              }}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className="text-sm transition-transform duration-150 group-hover:scale-110"
                  style={{ filter: isActive ? 'none' : 'grayscale(0.4)' }}
                >
                  {item.emoji}
                </span>
                <span className="truncate">{item.label}</span>
              </span>
              {item.badge && (
                <span
                  className="text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0"
                  style={{
                    background: isActive ? role.color : 'rgba(255,255,255,0.12)',
                    color:      isActive ? '#000' : 'rgba(255,255,255,0.7)',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* ─── KPI Mini Cards ─── */}
      <div
        className="mx-3 mb-3 rounded-2xl p-3 space-y-2"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="text-[9px] font-black uppercase tracking-widest px-1 mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Indikator Kinerja
        </div>
        {kpis.map((kpi, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <span>{kpi.emoji}</span>
              <span>{kpi.label}</span>
            </span>
            <span className="text-[11px] font-bold" style={{ color: kpi.color }}>
              {kpi.value}
            </span>
          </div>
        ))}
      </div>

      {/* ─── Logout ─── */}
      <div
        className="p-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <button
          onClick={() => onNavigate('logout')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          style={{ color: 'rgba(248,113,113,0.75)', background: 'rgba(239,68,68,0.06)' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.14)'
            ;(e.currentTarget as HTMLButtonElement).style.color = '#F87171'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.06)'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(248,113,113,0.75)'
          }}
        >
          <span>→</span> Keluar ke Beranda
        </button>
      </div>
    </aside>
  )
}
