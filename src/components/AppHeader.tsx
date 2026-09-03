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

  const roleConfigs: Record<string, { label: string; icon: string; badgeCls: string; barBg: string; borderCls: string; identity: string }> = {
    seller: {
      label: 'Produsen / UMKM',
      icon: '🏪',
      badgeCls: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      barBg: 'bg-emerald-950/95 border-emerald-800',
      borderCls: 'border-emerald-200',
      identity: 'PT Bunda Halal Foods Nusantara • NIB: 9120005432190'
    },
    distributor: {
      label: 'Distributor & Logistik',
      icon: '🚚',
      badgeCls: 'bg-blue-100 text-blue-800 border-blue-300',
      barBg: 'bg-slate-950/95 border-blue-900',
      borderCls: 'border-blue-200',
      identity: 'PT Pos Logistik Halal • Izin DIST-BPJPH-2024'
    },
    customer: {
      label: 'Konsumen Pembeli',
      icon: '🛍️',
      badgeCls: 'bg-purple-100 text-purple-800 border-purple-300',
      barBg: 'bg-purple-950/95 border-purple-800',
      borderCls: 'border-purple-200',
      identity: 'Akun: Nadya Putri • Saldo HalalPay: Rp 450.000'
    },
    guest: {
      label: 'Tamu Publik',
      icon: '🌐',
      badgeCls: 'bg-slate-100 text-slate-700 border-slate-200',
      barBg: 'bg-slate-900 border-slate-800',
      borderCls: 'border-slate-200',
      identity: 'Akses Eksplorasi Publik Tanpa Akun'
    },
  }

  const currentConfig = roleConfigs[userRole] || roleConfigs.guest

  return (
    <div className="sticky top-0 z-30 shadow-2xs font-sans">
      {/* Top Header Bar */}
      <header className={`bg-white/95 backdrop-blur-md border-b ${currentConfig.borderCls}`}>
        <div className="max-w-screen-xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Logo & Navigation */}
            <div className="flex items-center gap-3 min-w-0">
              {showBackButton && (
                <button
                  onClick={() => onNavigate(backPage)}
                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold transition-colors cursor-pointer"
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

            {/* Quick Header Jump Links */}
            <div className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-600">
              <button 
                onClick={() => onNavigate('product-catalog')} 
                className="px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                📦 Katalog Produk
              </button>
              <button 
                onClick={() => onNavigate('supplier-catalog')} 
                className="px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                🏢 Pemasok UMKM
              </button>
              <button 
                onClick={() => onNavigate('supply-chain')} 
                className="px-2.5 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-800 transition-colors cursor-pointer"
              >
                🚚 Rantai Pasok
              </button>
              <button 
                onClick={() => onNavigate('verification')} 
                className="px-2.5 py-1.5 rounded-lg hover:bg-amber-50 hover:text-amber-800 transition-colors cursor-pointer"
              >
                🛡️ Verifikasi SJPH
              </button>
            </div>

            {/* Right: Actions & Role Switcher */}
            <div className="flex items-center gap-2 shrink-0">
              <LanguageToggle />
              
              {userRole !== 'guest' && (
                <>
                  <button
                    onClick={() => onNavigate('cart')}
                    className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 text-xs transition-colors cursor-pointer"
                    title="Keranjang Belanja"
                  >
                    🛒
                  </button>
                  <button
                    onClick={() => onNavigate('notifikasi')}
                    className="relative w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                    title="Notifikasi"
                  >
                    🔔
                    {notifCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {notifCount}
                      </span>
                    )}
                  </button>
                </>
              )}

              {/* Role Switcher Pill & Dropdown */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-xl border shadow-2xs transition-all cursor-pointer ${
                    userRole === 'guest' 
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-600'
                      : currentConfig.badgeCls
                  }`}
                >
                  <span>{currentConfig.icon}</span>
                  <span>{userRole === 'guest' ? 'Pilih Peran Masuk' : currentConfig.label}</span>
                  <span className="text-[10px] opacity-70">▾</span>
                </button>

                {/* Elegant Role Switching Dropdown */}
                {showRoleMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-fade-in text-xs">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">Beralih Peran Sistem</span>
                      <p className="text-[11px] text-slate-500">Klik untuk langsung membuka portal peran:</p>
                    </div>

                    <div className="space-y-1 py-1">
                      <button
                        onClick={() => {
                          onSetRole('seller')
                          setShowRoleMenu(false)
                        }}
                        className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                          userRole === 'seller' ? 'bg-emerald-50 text-emerald-900 font-black' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base p-1.5 rounded-lg bg-emerald-100 text-emerald-800">🏪</span>
                          <div>
                            <span className="font-bold block">Produsen / UMKM</span>
                            <span className="text-[10px] text-slate-400">Kelola SKU, BOM, dan berkas SJPH</span>
                          </div>
                        </div>
                        {userRole === 'seller' && <span className="text-emerald-700 font-black">✓ Aktif</span>}
                      </button>

                      <button
                        onClick={() => {
                          onSetRole('distributor')
                          setShowRoleMenu(false)
                        }}
                        className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                          userRole === 'distributor' ? 'bg-blue-50 text-blue-900 font-black' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base p-1.5 rounded-lg bg-blue-100 text-blue-800">🚚</span>
                          <div>
                            <span className="font-bold block">Distributor & Logistik</span>
                            <span className="text-[10px] text-slate-400">Armada kargo umum & pendingin</span>
                          </div>
                        </div>
                        {userRole === 'distributor' && <span className="text-blue-700 font-black">✓ Aktif</span>}
                      </button>

                      <button
                        onClick={() => {
                          onSetRole('customer')
                          setShowRoleMenu(false)
                        }}
                        className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                          userRole === 'customer' ? 'bg-purple-50 text-purple-900 font-black' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base p-1.5 rounded-lg bg-purple-100 text-purple-800">🛍️</span>
                          <div>
                            <span className="font-bold block">Konsumen / Pembeli</span>
                            <span className="text-[10px] text-slate-400">Belanja & lacak paket di jalan</span>
                          </div>
                        </div>
                        {userRole === 'customer' && <span className="text-purple-700 font-black">✓ Aktif</span>}
                      </button>

                      <button
                        onClick={() => {
                          onSetRole('guest')
                          setShowRoleMenu(false)
                        }}
                        className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                          userRole === 'guest' ? 'bg-slate-100 text-slate-900 font-black' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base p-1.5 rounded-lg bg-slate-100 text-slate-800">🌐</span>
                          <div>
                            <span className="font-bold block">Mode Tamu Publik</span>
                            <span className="text-[10px] text-slate-400">Kembali ke landing page publik</span>
                          </div>
                        </div>
                        {userRole === 'guest' && <span className="text-slate-700 font-black">✓ Aktif</span>}
                      </button>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-2 text-[11px]">
                      <button
                        onClick={() => {
                          onNavigate('register')
                          setShowRoleMenu(false)
                        }}
                        className="text-emerald-700 font-bold hover:underline cursor-pointer"
                      >
                        Daftar Akun Baru
                      </button>
                      <button
                        onClick={() => {
                          onSetRole('guest')
                          onNavigate('landing')
                          setShowRoleMenu(false)
                        }}
                        className="text-red-600 font-semibold hover:underline cursor-pointer"
                      >
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

      {/* Sleek Role Context Bar (Shows exact identity & role access) */}
      {userRole !== 'guest' && (
        <div className={`${currentConfig.barBg} text-white px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-3 border-b shadow-inner transition-colors`}>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md font-black uppercase text-[10px] bg-white/10 text-white border border-white/20">
              {currentConfig.icon} {currentConfig.label}
            </span>
            <span className="font-bold text-slate-200 text-[11px] truncate">
              {currentConfig.identity}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {userRole === 'seller' && (
              <>
                <button onClick={() => onNavigate('product-management')} className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer">
                  ➕ Tambah SKU
                </button>
                <button onClick={() => onNavigate('pesanan')} className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer">
                  🛒 Pesanan Masuk (12)
                </button>
                <button onClick={() => onNavigate('upload-dokumen')} className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer">
                  📄 Berkas SJPH
                </button>
              </>
            )}

            {userRole === 'distributor' && (
              <>
                <button onClick={() => onNavigate('supply-chain')} className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer">
                  📡 Suhu IoT (-18°C)
                </button>
                <button onClick={() => onNavigate('pesanan')} className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer">
                  📋 Manifest Muatan
                </button>
                <button onClick={() => onNavigate('verification')} className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer">
                  🧼 SOP Sanitasi
                </button>
              </>
            )}

            {userRole === 'customer' && (
              <>
                <button onClick={() => onNavigate('cart')} className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer">
                  🛒 Keranjang (3)
                </button>
                <button onClick={() => onNavigate('pesanan')} className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer">
                  📦 Lacak Paket
                </button>
                <button onClick={() => onNavigate('product-catalog')} className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer">
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
