import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Logo from './Logo'
import LanguageToggle from './LanguageToggle'
import Breadcrumb from './Breadcrumb'

interface BreadcrumbItem {
  label: string
  page?: string
}

interface Props {
  onNavigate?: (page: string) => void
  userRole?: string
  breadcrumbs?: BreadcrumbItem[]
  title?: string
  breadcrumb?: string
  onSetRole?: (role: any) => void
  notifCount?: number
  showBackButton?: boolean
  backPage?: string
}

export default function AppHeader({
  onNavigate = () => {},
  userRole = 'guest',
  breadcrumbs = [],
  title,
  breadcrumb,
  onSetRole = () => {},
  notifCount = 3,
  showBackButton = false,
  backPage = 'dashboard'
}: Props) {
  const { t } = useTranslation()
  const [showRoleMenu, setShowRoleMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowRoleMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const effectiveBreadcrumbs: BreadcrumbItem[] = breadcrumbs.length > 0
    ? breadcrumbs
    : (breadcrumb || title)
    ? [{ label: t('breadcrumbs.dashboard', 'Dashboard'), page: 'dashboard' }, { label: breadcrumb || title || '' }]
    : []

  const roleConfigs: Record<string, {
    label: string; icon: string; color: string; pill: string;
    identity: string; barBg: string; barBorder: string;
  }> = {
    seller: {
      label: 'Produsen / UMKM', icon: '🏪', color: '#16A34A',
      pill: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
      identity: 'PT Bunda Halal Foods Nusantara • NIB: 9120005432190',
      barBg: 'rgba(10, 22, 40, 0.97)', barBorder: 'rgba(34,197,94,0.2)'
    },
    distributor: {
      label: 'Distributor & Logistik', icon: '🚚', color: '#2563EB',
      pill: 'bg-blue-50 text-blue-800 border border-blue-200',
      identity: 'PT Pos Logistik Halal • Izin DIST-BPJPH-2024',
      barBg: 'rgba(10, 18, 40, 0.97)', barBorder: 'rgba(96,165,250,0.2)'
    },
    customer: {
      label: 'Konsumen Pembeli', icon: '🛍️', color: '#7C3AED',
      pill: 'bg-violet-50 text-violet-800 border border-violet-200',
      identity: 'Akun: Nadya Putri • Saldo HalalPay: Rp 450.000',
      barBg: 'rgba(18, 10, 40, 0.97)', barBorder: 'rgba(167,139,250,0.2)'
    },
    guest: {
      label: 'Tamu Publik', icon: '🌐', color: '#64748B',
      pill: 'bg-slate-100 text-slate-700 border border-slate-200',
      identity: 'Akses Eksplorasi Publik Tanpa Akun',
      barBg: 'rgba(15,23,42,0.97)', barBorder: 'rgba(255,255,255,0.06)'
    },
  }

  const cfg = roleConfigs[userRole] || roleConfigs.guest

  return (
    <div className="sticky top-0 z-30 font-sans">
      {/* ─── Main Header ─── */}
      <header
        className="border-b"
        style={{
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(20px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
          borderColor: 'rgba(226,232,240,0.7)',
          boxShadow: '0 1px 0 rgba(15,23,42,0.04)',
        }}
      >
        <div className="max-w-screen-xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between gap-4">

            {/* Left */}
            <div className="flex items-center gap-3 min-w-0">
              {showBackButton && (
                <button
                  onClick={() => onNavigate(backPage)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-500 text-sm font-bold transition-all cursor-pointer hover:text-slate-900"
                  style={{ background: '#F1F5F9' }}
                  title="Kembali"
                >
                  ←
                </button>
              )}
              <Logo size="sm" onClick={() => onNavigate(userRole === 'guest' ? 'landing' : 'dashboard')} />
              {effectiveBreadcrumbs.length > 0 && (
                <div className="hidden sm:block">
                  <Breadcrumb items={effectiveBreadcrumbs} onNavigate={onNavigate} userRole={userRole} />
                </div>
              )}
            </div>

            {/* Center Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {[
                { label: 'Katalog', page: 'product-catalog', emoji: '📦' },
                { label: 'Pemasok', page: 'supplier-catalog', emoji: '🏢' },
                { label: 'Rantai Pasok', page: 'supply-chain', emoji: '🚚' },
                { label: 'Verifikasi', page: 'verification', emoji: '🛡️' },
              ].map(item => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all duration-150 cursor-pointer"
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 shrink-0">
              <LanguageToggle />

              {userRole !== 'guest' && (
                <>
                  <button
                    onClick={() => onNavigate('cart')}
                    className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 text-sm transition-all cursor-pointer hover:bg-slate-100 hover:text-slate-900"
                    title="Keranjang"
                  >
                    🛒
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-600 text-white text-[9px] font-black rounded-full flex items-center justify-center">3</span>
                  </button>
                  <button
                    onClick={() => onNavigate('notifikasi')}
                    className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 text-sm transition-all cursor-pointer hover:bg-slate-100 hover:text-slate-900"
                    title="Notifikasi"
                  >
                    🔔
                    {notifCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                        {notifCount}
                      </span>
                    )}
                  </button>
                </>
              )}

              {/* Role switcher */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    userRole === 'guest'
                      ? 'bg-gradient-to-r from-emerald-700 to-emerald-600 text-white shadow-sm'
                      : cfg.pill
                  }`}
                >
                  <span>{cfg.icon}</span>
                  <span>{userRole === 'guest' ? 'Masuk / Daftar' : cfg.label}</span>
                  <span className="opacity-60 text-[10px]">▾</span>
                </button>

                {showRoleMenu && (
                  <div
                    className="absolute right-0 mt-2 w-72 rounded-2xl p-2 z-50 animate-scale-in"
                    style={{
                      background: 'rgba(255,255,255,0.98)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(226,232,240,0.8)',
                      boxShadow: '0 8px 40px rgba(15,23,42,0.14), 0 2px 8px rgba(15,23,42,0.08)',
                    }}
                  >
                    <div className="px-3 py-2 mb-1" style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Portal Hak Akses</span>
                      <p className="text-[11px] text-slate-500">Masuk sesuai peran Anda:</p>
                    </div>

                    <div className="space-y-0.5">
                      {[
                        { role: 'seller', label: 'Produsen / UMKM', sub: 'Kelola SKU, BOM & berkas SJPH', icon: '🏪', bg: '#F0FDF4', color: '#166534' },
                        { role: 'distributor', label: 'Distributor & Logistik', sub: 'Armada kargo umum & pendingin', icon: '🚚', bg: '#EFF6FF', color: '#1E3A8A' },
                        { role: 'customer', label: 'Konsumen / Pembeli', sub: 'Belanja & lacak paket di jalan', icon: '🛍️', bg: '#F5F3FF', color: '#4C1D95' },
                        { role: 'guest', label: 'Mode Tamu Publik', sub: 'Kembali ke landing page publik', icon: '🌐', bg: '#F8FAFC', color: '#334155' },
                      ].map(item => (
                        <button
                          key={item.role}
                          onClick={() => { onSetRole(item.role as any); setShowRoleMenu(false) }}
                          className="w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between group"
                          style={{ background: userRole === item.role ? item.bg : 'transparent' }}
                          onMouseEnter={e => { if (userRole !== item.role) (e.currentTarget as HTMLElement).style.background = '#F8FAFC' }}
                          onMouseLeave={e => { if (userRole !== item.role) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="text-base p-1.5 rounded-xl"
                              style={{ background: item.bg }}
                            >{item.icon}</span>
                            <div>
                              <span className="font-semibold text-xs block text-slate-900">{item.label}</span>
                              <span className="text-[10px] text-slate-400">{item.sub}</span>
                            </div>
                          </div>
                          {userRole === item.role && (
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full" style={{ background: item.bg, color: item.color }}>
                              ✓ Aktif
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="mt-1 pt-2 flex items-center justify-between px-2 text-[11px]" style={{ borderTop: '1px solid #F1F5F9' }}>
                      <button onClick={() => { onNavigate('register'); setShowRoleMenu(false) }} className="text-emerald-700 font-bold hover:underline cursor-pointer">
                        Daftar Akun Baru →
                      </button>
                      <button onClick={() => { onSetRole('guest'); onNavigate('landing'); setShowRoleMenu(false) }} className="text-slate-400 font-medium hover:text-red-500 cursor-pointer transition-colors">
                        Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Role Context Bar ─── */}
      {userRole !== 'guest' && (
        <div
          className="px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-3 border-b"
          style={{
            background: cfg.barBg,
            borderColor: cfg.barBorder,
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wider"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)' }}
            >
              {cfg.icon} {cfg.label}
            </span>
            <span className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {cfg.identity}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {userRole === 'seller' && (
              <>
                <button onClick={() => onNavigate('product-management')} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg cursor-pointer transition-all" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }} onMouseEnter={e => (e.currentTarget.style.background='rgba(255,255,255,0.15)')} onMouseLeave={e => (e.currentTarget.style.background='rgba(255,255,255,0.08)')}>
                  ➕ Tambah SKU
                </button>
                <button onClick={() => onNavigate('pesanan')} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg cursor-pointer transition-all" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }} onMouseEnter={e => (e.currentTarget.style.background='rgba(255,255,255,0.15)')} onMouseLeave={e => (e.currentTarget.style.background='rgba(255,255,255,0.08)')}>
                  🛒 Pesanan (12)
                </button>
                <button onClick={() => onNavigate('upload-dokumen')} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg cursor-pointer transition-all" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }} onMouseEnter={e => (e.currentTarget.style.background='rgba(255,255,255,0.15)')} onMouseLeave={e => (e.currentTarget.style.background='rgba(255,255,255,0.08)')}>
                  📄 Berkas SJPH
                </button>
              </>
            )}
            {userRole === 'distributor' && (
              <>
                <button onClick={() => onNavigate('supply-chain')} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg cursor-pointer transition-all" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }} onMouseEnter={e => (e.currentTarget.style.background='rgba(255,255,255,0.15)')} onMouseLeave={e => (e.currentTarget.style.background='rgba(255,255,255,0.08)')}>
                  📡 IoT -18°C
                </button>
                <button onClick={() => onNavigate('pesanan')} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg cursor-pointer transition-all" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }} onMouseEnter={e => (e.currentTarget.style.background='rgba(255,255,255,0.15)')} onMouseLeave={e => (e.currentTarget.style.background='rgba(255,255,255,0.08)')}>
                  📋 Manifest
                </button>
                <button onClick={() => onNavigate('verification')} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg cursor-pointer transition-all" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }} onMouseEnter={e => (e.currentTarget.style.background='rgba(255,255,255,0.15)')} onMouseLeave={e => (e.currentTarget.style.background='rgba(255,255,255,0.08)')}>
                  🧼 SOP Sanitasi
                </button>
              </>
            )}
            {userRole === 'customer' && (
              <>
                <button onClick={() => onNavigate('cart')} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg cursor-pointer transition-all" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }} onMouseEnter={e => (e.currentTarget.style.background='rgba(255,255,255,0.15)')} onMouseLeave={e => (e.currentTarget.style.background='rgba(255,255,255,0.08)')}>
                  🛒 Keranjang (3)
                </button>
                <button onClick={() => onNavigate('pesanan')} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg cursor-pointer transition-all" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }} onMouseEnter={e => (e.currentTarget.style.background='rgba(255,255,255,0.15)')} onMouseLeave={e => (e.currentTarget.style.background='rgba(255,255,255,0.08)')}>
                  📦 Lacak Paket
                </button>
                <button onClick={() => onNavigate('product-catalog')} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg cursor-pointer transition-all" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }} onMouseEnter={e => (e.currentTarget.style.background='rgba(255,255,255,0.15)')} onMouseLeave={e => (e.currentTarget.style.background='rgba(255,255,255,0.08)')}>
                  ❤️ Wishlist (12)
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
