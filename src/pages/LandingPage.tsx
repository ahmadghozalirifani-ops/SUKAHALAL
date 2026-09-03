import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';
import LanguageToggle from '../components/LanguageToggle';
import { UserRole } from '../App';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function LandingPage({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  
  const nodes = [
    { label: t('landing.node.supplier', 'Petani/Supplier'), icon: '🌾' },
    { label: t('landing.node.producer', 'Produsen'), icon: '🏭' },
    { label: t('landing.node.packaging', 'Pengemasan'), icon: '📦' },
    { label: t('landing.node.distributor', 'Distributor'), icon: '🚚' },
    { label: t('landing.node.retailer', 'Retailer'), icon: '🏪' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-emerald-50">
        {/* Subtle Islamic Geometric Pattern Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" className="drop-shadow-md" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 tracking-tight">
            {t('landing.hero.title', 'SUKAHALAL')}
          </h1>
          <p className="text-xl md:text-2xl text-emerald-700 mb-10 max-w-3xl mx-auto font-medium">
            {t('landing.hero.subtitle', 'Ekosistem Supply Chain Halal Terintegrasi untuk UMKM Indonesia')}
          </p>

          {/* Login Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button 
              onClick={() => onNavigate('login-seller')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
            >
              🏪 {t('landing.loginSeller', 'Masuk Penjual')}
            </button>
            <button 
              onClick={() => onNavigate('login-distributor')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
            >
              🚚 {t('landing.loginDistributor', 'Masuk Distributor')}
            </button>
            <button 
              onClick={() => onNavigate('login-customer')}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
            >
              🛍️ {t('landing.loginCustomer', 'Masuk Konsumen')}
            </button>
          </div>
          
          <button 
            onClick={() => { onSetRole('guest'); onNavigate('product-catalog'); }}
            className="text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-4 decoration-2 decoration-emerald-300 hover:decoration-emerald-500 transition-all"
          >
            {t('landing.exploreGuest', 'Jelajahi Katalog sebagai Tamu ✨')}
          </button>
        </div>
      </section>

      {/* Supply Chain Visualization */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-800">{t('landing.supplyChainTitle', 'Lacak Transparansi Halal')}</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
            {nodes.map((node, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm w-40">
                  <span className="text-4xl mb-2">{node.icon}</span>
                  <span className="font-semibold text-center text-sm text-slate-700">{node.label}</span>
                  <span className="mt-2 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">✓ Terverifikasi</span>
                </div>
                {idx < nodes.length - 1 && (
                  <div className="hidden md:flex flex-col items-center justify-center animate-pulse text-emerald-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                )}
                {idx < nodes.length - 1 && (
                  <div className="md:hidden flex justify-center text-emerald-500 my-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-12 bg-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">2,400+</div>
              <div className="text-emerald-100 font-medium">Supplier</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">45,000+</div>
              <div className="text-emerald-100 font-medium">Produk</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">850K+</div>
              <div className="text-emerald-100 font-medium">Transaksi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">34</div>
              <div className="text-emerald-100 font-medium">Provinsi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-800">{t('landing.featuresTitle', 'Keunggulan SUKAHALAL')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800">{t(`landing.feature${i}.title`, `Fitur Unggulan ${i}`)}</h3>
                <p className="text-slate-600">{t(`landing.feature${i}.desc`, 'Penjelasan singkat tentang fitur unggulan ini untuk mendukung UMKM halal di Indonesia.')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-800 pb-8 mb-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs">{t('landing.footerDesc', 'Platform Ekosistem Supply Chain Halal terintegrasi untuk UMKM Indonesia.')}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Tautan</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-400">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-emerald-400">Bantuan</a></li>
              <li><a href="#" className="hover:text-emerald-400">Syarat & Ketentuan</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Hubungi Kami</h4>
            <ul className="space-y-2">
              <li>Email: info@sukahalal.id</li>
              <li>Telepon: 1500-HALAL</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          &copy; {new Date().getFullYear()} SUKAHALAL. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
