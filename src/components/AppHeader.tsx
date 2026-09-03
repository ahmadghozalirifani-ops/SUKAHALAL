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
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLoginDropdown(false)
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

  const roleBadgeColor: Record<string, string> = {
    seller: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    distributor: 'bg-blue-100 text-blue-800 border-blue-300',
    customer: 'bg-purple-100 text-purple-800 border-purple-300',
    guest: 'bg-slate-100 text-slate-700 border-slate-200',
  }
  const roleLabels: Record<string, string> = {
    seller: '🏪 ' + t('roles.seller', 'Produsen / UMKM'),
    distributor: '🚚 ' + t('roles.distributor', 'Distributor Logistik'),
    customer: '🛍️ ' + t('roles.customer', 'Konsumen'),
    guest: '🌐 ' + t('roles.guest', 'Tamu Publik'),
  }

  const headerBg: Record<string, string> = {
    seller: 'border-emerald-200',
    distributor: 'border-blue-200',
    customer: 'border-purple-200',
    guest: 'border-slate-100',
  }

  return (
    <div className="sticky top-0 z-30 shadow-2xs">
      {/* Top Header */}
      <header className={`bg-white border-b ${headerBg[userRole] || 'border-slate-100'}`}>
        <div className="max-w-screen-xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Logo + Back button + Breadcrumb */}
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

              <Logo size="sm" onClick={() => onNavigate('landing')} />

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
                className="px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                📦 Katalog Produk
              </button>
              <button 
                onClick={() => onNavigate('supplier-catalog')} 
                className="px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                🏢 Pemasok & Produsen
              </button>
              <button 
                onClick={() => onNavigate('supply-chain')} 
                className="px-2.5 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                🚚 Rantai Pasok Terpadu
              </button>
              <button 
                onClick={() => onNavigate('verification')} 
                className="px-2.5 py-1.5 rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                🛡️ Verifikasi SJPH
              </button>
            </div>

            {/* Right: Actions & Tiered Login Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <LanguageToggle />
              
              {userRole !== 'guest' ? (
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
                  <button
                    onClick={() => onNavigate('settings')}
                    className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                    title="Pengaturan"
                  >
                    ⚙️
                  </button>

                  {/* Role Status Badge with Switch Option */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        roleBadgeColor[userRole] || roleBadgeColor.guest
                      }`}
                    >
                      <span>{roleLabels[userRole] || roleLabels.guest}</span>
                      <span className="text-[10px] opacity-60">▾</span>
                    </button>

                    {/* Dropdown for role switching / logout */}
                    {showLoginDropdown && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fade-in text-xs space-y-1">
                        <div className="px-3 py-2 border-b border-slate-100">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Status Masuk</span>
                          <strong className="text-slate-900 capitalize">{userRole}</strong>
                        </div>

                        <button
                          onClick={() => {
                            onNavigate('dashboard')
                            setShowLoginDropdown(false)
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-bold text-slate-700 flex items-center gap-2 cursor-pointer"
                        >
                          <span>📊</span> Buka Dashboard Role Ini
                        </button>

                        <button
                          onClick={() => {
                            onNavigate('logout')
                            setShowLoginDropdown(false)
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 font-bold text-red-600 flex items-center gap-2 cursor-pointer"
                        >
                          <span>🚪</span> Keluar Akun
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Tiered Login Dropdown for Guest */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white text-xs font-black rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>🔐</span>
                    <span>Masuk Akun</span>
                    <span className="text-[10px] ml-0.5">▾</span>
                  </button>

                  {/* Tiered Dropdown Menu */}
                  {showLoginDropdown && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-fade-in text-xs">
                      <div className="px-3 py-2 border-b border-slate-100 mb-1">
                        <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">Pilih Jenjang Akses</span>
                        <p className="text-[11px] text-slate-500">Masuk sesuai peran operasional Anda:</p>
                      </div>

                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onNavigate('login-seller')
                            setShowLoginDropdown(false)
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 transition-colors flex items-start gap-2.5 cursor-pointer"
                        >
                          <span className="text-lg bg-emerald-100 text-emerald-800 p-1.5 rounded-lg shrink-0">🏪</span>
                          <div>
                            <span className="font-bold text-xs block text-slate-900">Penjual & Produsen UMKM</span>
                            <span className="text-[10px] text-slate-500 leading-tight block">Kelola produk, inventaris bahan baku & verifikasi SJPH</span>
                          </div>
                        </button>

                        <button
                          onClick={() => {
                            onNavigate('login-distributor')
                            setShowLoginDropdown(false)
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 hover:text-blue-900 transition-colors flex items-start gap-2.5 cursor-pointer"
                        >
                          <span className="text-lg bg-blue-100 text-blue-800 p-1.5 rounded-lg shrink-0">🚚</span>
                          <div>
                            <span className="font-bold text-xs block text-slate-900">Distributor & Ekspedisi</span>
                            <span className="text-[10px] text-slate-500 leading-tight block">Armada logistik umum & cold-chain bersertifikat halal</span>
                          </div>
                        </button>

                        <button
                          onClick={() => {
                            onNavigate('login-customer')
                            setShowLoginDropdown(false)
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50 text-slate-800 hover:text-purple-900 transition-colors flex items-start gap-2.5 cursor-pointer"
                        >
                          <span className="text-lg bg-purple-100 text-purple-800 p-1.5 rounded-lg shrink-0">🛍️</span>
                          <div>
                            <span className="font-bold text-xs block text-slate-900">Konsumen & Pelanggan</span>
                            <span className="text-[10px] text-slate-500 leading-tight block">Belanja produk terjamin halal dengan pelacakan QR batch</span>
                          </div>
                        </button>
                      </div>

                      <div className="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between px-2">
                        <span className="text-[10px] text-slate-400">Belum punya akun?</span>
                        <button
                          onClick={() => {
                            onNavigate('register')
                            setShowLoginDropdown(false)
                          }}
                          className="text-xs font-black text-emerald-700 hover:underline cursor-pointer"
                        >
                          Daftar Sekarang &rarr;
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* DISTINCT ROLE-SPECIFIC ACCESS STRIP (Prominent visual & operational difference) */}
      {userRole === 'seller' && (
        <div className="bg-emerald-800 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-700 text-emerald-200 px-2 py-0.5 rounded-md font-black uppercase text-[10px] border border-emerald-600">
              Hak Akses Produsen / UMKM
            </span>
            <span className="font-bold text-emerald-100">
              PT Bunda Halal Foods Nusantara • NIB: 9120005432190
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('product-management')}
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>➕</span> Tambah Produk
            </button>
            <button
              onClick={() => onNavigate('upload-dokumen')}
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>📄</span> Berkas SJPH
            </button>
            <button
              onClick={() => onNavigate('pesanan')}
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>🛒</span> Pesanan Masuk (12)
            </button>
            <button
              onClick={() => onNavigate('inventaris')}
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>📋</span> Stok Bahan
            </button>
          </div>
        </div>
      )}

      {userRole === 'distributor' && (
        <div className="bg-blue-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="bg-blue-800 text-blue-200 px-2 py-0.5 rounded-md font-black uppercase text-[10px] border border-blue-700">
              Hak Akses Distributor & Logistik
            </span>
            <span className="font-bold text-blue-100">
              PT Pos Logistik Halal • Izin Operasional Angkut Halal No. DIST-BPJPH-2024
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('supply-chain')}
              className="bg-blue-800 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>📡</span> Sensor Suhu IoT (-18°C)
            </button>
            <button
              onClick={() => onNavigate('supply-chain')}
              className="bg-blue-800 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>🚚</span> Armada Kargo & Rute
            </button>
            <button
              onClick={() => onNavigate('verification')}
              className="bg-blue-800 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>🧼</span> SOP Bebas Najis
            </button>
            <button
              onClick={() => onNavigate('pesanan')}
              className="bg-blue-800 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>📋</span> Manifest Muatan (45)
            </button>
          </div>
        </div>
      )}

      {userRole === 'customer' && (
        <div className="bg-purple-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="bg-purple-800 text-purple-200 px-2 py-0.5 rounded-md font-black uppercase text-[10px] border border-purple-700">
              Hak Akses Konsumen Pembeli
            </span>
            <span className="font-bold text-purple-100">
              Akun: Nadya Putri • Saldo HalalPay: Rp 450.000
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('cart')}
              className="bg-purple-800 hover:bg-purple-700 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>🛒</span> Keranjang Belanja (3)
            </button>
            <button
              onClick={() => onNavigate('pesanan')}
              className="bg-purple-800 hover:bg-purple-700 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>📦</span> Lacak Paket Dikirim
            </button>
            <button
              onClick={() => onNavigate('product-catalog')}
              className="bg-purple-800 hover:bg-purple-700 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>❤️</span> Wishlist Favorit (12)
            </button>
            <button
              onClick={() => onNavigate('product-detail')}
              className="bg-purple-800 hover:bg-purple-700 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>📱</span> Cek QR Traceability
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
