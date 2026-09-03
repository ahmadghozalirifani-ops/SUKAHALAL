import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';
import LanguageToggle from '../components/LanguageToggle';
import TraceabilityModal from '../components/TraceabilityModal';
import { UserRole } from '../App';
import { REAL_PRODUCTS, REAL_SUPPLIERS } from '../data/mockData';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function LandingPage({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  const [activeMood, setActiveMood] = useState<'all' | 'makanan' | 'kopi' | 'healthy' | 'beauty'>('all');
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const [activeTabFlow, setActiveTabFlow] = useState<number>(0);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLoginDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const vibeProducts = REAL_PRODUCTS.filter(p => {
    if (activeMood === 'all') return true;
    if (activeMood === 'makanan') return p.category === 'Makanan' || p.category === 'Bumbu';
    if (activeMood === 'kopi') return p.category === 'Minuman';
    if (activeMood === 'healthy') return p.category === 'Dairy' || p.category === 'Suplemen';
    if (activeMood === 'beauty') return p.category === 'Kosmetik';
    return true;
  });

  const flowSteps = [
    {
      step: '01', title: 'Hulu: Sumber Bahan Baku & Sembelih Halal',
      scope: 'Rantai Pasok Pangan Segar & Komoditas Kering',
      entity: 'Petani Kopi Gayo, Peternak Sapi, & RPH Malindo Modern',
      desc: 'Bahan komoditas kering (kopi, rempah, beras) dipanen dari kebun bersertifikasi bersih, sedangkan ternak sapi disembelih manual satu per satu oleh Juru Sembelih Halal (Juleha) berlisensi BNSP sesuai syariat Islam.',
      icon: '🌾', assurance: 'Sertifikat Halal Bahan & NKV Level 1', tag: 'Bahan Baku Sah Syariat', color: '#16A34A',
    },
    {
      step: '02', title: 'Olah: Produksi Higienis Berstandar SJPH',
      scope: 'Fasilitas Pabrik Pangan & Sentra UMKM',
      entity: 'PT Bunda Halal Foods & Sentra Agro Nusantara',
      desc: 'Pengolahan menerapkan Sistem Jaminan Produk Halal (SJPH). Dapur dan lini mesin khusus 100% bebas dari kontaminasi silang babi, khamar, atau zat najis lainnya.',
      icon: '🏭', assurance: 'Audit Titik Kritis (CCP) & LPH', tag: 'Bebas Kontaminasi Silang', color: '#0891B2',
    },
    {
      step: '03', title: 'Distribusi: Logistik Umum & Cold-Chain Tersegel',
      scope: 'Ekspedisi Darat, Kargo Boks Kering & Truk Refrigerator',
      entity: 'PT Pos Logistik Halal & Mitra Ekspedisi Nasional',
      desc: 'Pengangkutan mematuhi protokol logistik halal: wadah angkut bersih suci dari najis mughalladhah, terpisah dari muatan non-halal, serta dikawal segel keamanan digital RFID.',
      icon: '🚚', assurance: 'Segel RFID & Pemisahan Logistik', tag: 'Pengangkutan Bersih & Tersegel', color: '#7C3AED',
    },
    {
      step: '04', title: 'Hilir: Konsumsi Tenang dengan Verifikasi Terbuka',
      scope: 'Ritel Modern, Halal Mart, & Konsumen Akhir',
      entity: 'Masyarakat & Pembeli Terverifikasi',
      desc: 'Setiap kemasan memiliki barcode resmi EAN-13 dan QR Traceability. Konsumen dapat mengecek keaslian nomor sertifikat BPJPH dalam hitungan detik.',
      icon: '🛡️', assurance: 'Terkoneksi SIHALAL Kemenag RI', tag: 'Transparansi Penuh', color: '#B45309',
    },
  ];

  const stats = [
    { value: '45.000+', label: 'Produk Terverifikasi', icon: '📦' },
    { value: '1.200+', label: 'UMKM Terkoneksi', icon: '🏪' },
    { value: '98.7%', label: 'Akurasi Audit Halal', icon: '✅' },
    { value: '34 Kota', label: 'Jaringan Distribusi', icon: '🗺️' },
  ];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: '#FAFAF8', color: '#0F172A' }}>

      {/* ─── Ticker ─── */}
      <div
        className="py-2 px-4 text-xs font-medium overflow-hidden border-b"
        style={{
          background: 'linear-gradient(135deg, #0A1628 0%, #0D2B1A 50%, #0A1628 100%)',
          color: 'rgba(255,255,255,0.75)',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="status-live"></span>
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest"
              style={{ background: 'rgba(34,197,94,0.15)', color: '#4ADE80', border: '1px solid rgba(34,197,94,0.25)' }}
            >
              Sistem Terpadu
            </span>
          </div>
          <div className="truncate text-center" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Jaminan Halal Terverifikasi: <strong style={{ color: 'rgba(255,255,255,0.9)' }}>45.000+</strong> produk terdaftar di database SIHALAL BPJPH
            {' '}• 🚚 Logistik umum & cold-chain terpantau bebas kontaminasi
          </div>
          <button
            onClick={() => onNavigate('verification')}
            className="hidden md:flex items-center gap-1 shrink-0 text-xs font-semibold transition-colors cursor-pointer"
            style={{ color: '#4ADE80' }}
          >
            Pusat Verifikasi →
          </button>
        </div>
      </div>

      {/* ─── Header ─── */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: 'rgba(250,250,248,0.92)',
          backdropFilter: 'blur(20px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
          borderColor: 'rgba(226,232,240,0.7)',
          boxShadow: '0 1px 0 rgba(15,23,42,0.04)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Logo size="md" onClick={() => onNavigate('landing')} />
            <nav className="hidden lg:flex items-center gap-0.5">
              {[
                { label: 'Katalog Produk', page: 'product-catalog' },
                { label: 'Pemasok & UMKM', page: 'supplier-catalog' },
                { label: 'Rantai Pasok', page: 'supply-chain' },
                { label: 'Verifikasi SIHALAL', page: 'verification' },
                { label: 'Panduan SJPH', page: 'tutorial' },
              ].map(item => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all duration-150 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <LanguageToggle />
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl text-white cursor-pointer transition-all"
                style={{
                  background: 'linear-gradient(135deg, #0D7A55 0%, #059669 100%)',
                  boxShadow: '0 2px 12px rgba(13,122,85,0.3)',
                }}
              >
                <span>Masuk Akun</span>
                <span className="opacity-70 text-[10px]">▾</span>
              </button>

              {showLoginDropdown && (
                <div
                  className="absolute right-0 mt-2 w-72 rounded-2xl p-2 z-50 animate-scale-in"
                  style={{
                    background: 'rgba(255,255,255,0.98)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(226,232,240,0.8)',
                    boxShadow: '0 8px 40px rgba(15,23,42,0.14)',
                  }}
                >
                  <div className="px-3 py-2 mb-1" style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Pilih Jenjang Akses</span>
                    <p className="text-[11px] text-slate-500">Masuk sesuai hak akses sistem Anda:</p>
                  </div>
                  <div className="space-y-0.5">
                    {[
                      { role: 'seller' as UserRole, label: 'Penjual & Produsen UMKM', sub: 'Kelola produk, sertifikasi & kepatuhan SJPH', icon: '🏪', bg: '#F0FDF4' },
                      { role: 'distributor' as UserRole, label: 'Distributor & Ekspedisi', sub: 'Manajemen armada kargo & cold-chain halal', icon: '🚚', bg: '#EFF6FF' },
                      { role: 'customer' as UserRole, label: 'Konsumen & Pembeli', sub: 'Belanja produk terjamin halal & lacak asal', icon: '🛍️', bg: '#F5F3FF' },
                    ].map(item => (
                      <button
                        key={item.role}
                        onClick={() => { onSetRole(item.role); setShowLoginDropdown(false); }}
                        className="w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-3 hover:bg-slate-50 group"
                      >
                        <span className="text-xl p-2 rounded-xl" style={{ background: item.bg }}>{item.icon}</span>
                        <div>
                          <span className="font-semibold text-xs block text-slate-900">{item.label}</span>
                          <span className="text-[10px] text-slate-400">{item.sub}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-1 pt-2 flex items-center justify-between px-2 text-[11px]" style={{ borderTop: '1px solid #F1F5F9' }}>
                    <span className="text-slate-400">Belum memiliki akun?</span>
                    <button
                      onClick={() => { onNavigate('register'); setShowLoginDropdown(false); }}
                      className="text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      Daftar Akun →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative pt-16 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Background gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(13,122,85,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 60%, rgba(8,145,178,0.06) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(13,122,85,0.07) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="text-center max-w-4xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 animate-fade-in"
              style={{
                background: 'rgba(13,122,85,0.08)',
                border: '1px solid rgba(13,122,85,0.2)',
              }}
            >
              <span className="text-xs">🛡️</span>
              <span className="text-xs font-semibold" style={{ color: '#0D7A55' }}>
                Sistem Jaminan Produk Halal (SJPH) Terintegrasi BPJPH Kemenag RI
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 animate-slide-up"
              style={{ color: '#0F172A', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Kepastian Halal
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #0D7A55 0%, #059669 50%, #0891B2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                dari Sumber ke Meja
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-normal leading-relaxed mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              SUKAHALAL menghubungkan petani, peternak, produsen UMKM, dan ekspedisi dalam satu sistem transparansi halal. Setiap tahapan diawasi untuk mencegah kontaminasi dan memastikan kepatuhan syariat.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: '0.15s' }}>
              <button
                onClick={() => onNavigate('product-catalog')}
                className="btn-primary text-sm"
              >
                <span>📦</span> Jelajahi Katalog Terverifikasi
              </button>
              <button
                onClick={() => onNavigate('supply-chain')}
                className="btn-secondary text-sm"
              >
                <span>🚚</span> Pantau Rantai Pasok
              </button>
              <button
                onClick={() => setSelectedQR('1')}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full cursor-pointer transition-all"
                style={{
                  background: 'rgba(13,122,85,0.08)',
                  color: '#0D7A55',
                  border: '1.5px solid rgba(13,122,85,0.2)',
                }}
              >
                <span>📱</span> Uji Coba Lacak QR
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="text-center py-4 px-3 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(226,232,240,0.8)',
                    boxShadow: '0 2px 8px rgba(15,23,42,0.06)',
                  }}
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-black" style={{ color: '#0D7A55', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.value}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Halal Pillars Bar ─── */}
      <section
        className="py-5 border-y"
        style={{ background: 'rgba(255,255,255,0.7)', borderColor: 'rgba(226,232,240,0.6)' }}
      >
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: '🌿', title: 'Bahan Baku Halal', desc: '100% bebas babi, khamar, dan bangkai' },
              { icon: '🔪', title: 'Juleha Bersertifikat', desc: "Sembelih syar'i berstandar BNSP di RPH resmi" },
              { icon: '🚚', title: 'Logistik Bebas Najis', desc: 'Kargo bersih & armada pendingin bersegel' },
              { icon: '📋', title: 'Kepatuhan SJPH', desc: 'Tersinkronisasi dengan nomor resmi SIHALAL' },
            ].map((pillar, i) => (
              <div key={i} className="flex items-start gap-3 p-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: 'rgba(13,122,85,0.1)' }}
                >
                  {pillar.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{pillar.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{pillar.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Product Showcase ─── */}
      <section className="py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-5">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span
                className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                style={{ background: 'rgba(13,122,85,0.1)', color: '#0D7A55' }}
              >
                Katalog Terkurasi
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Pilihan Produk Halal Nusantara
              </h2>
              <p className="text-sm text-slate-500 mt-1.5 font-normal">
                Setiap produk dilengkapi bukti audit bahan baku, nomor sertifikat, dan legalitas produsen.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Semua Produk' },
                { id: 'makanan', label: 'Makanan Olahan' },
                { id: 'kopi', label: 'Kopi & Minuman' },
                { id: 'healthy', label: 'Susu & Suplemen' },
                { id: 'beauty', label: 'Kosmetik Halal' },
              ].map(mood => (
                <button
                  key={mood.id}
                  onClick={() => setActiveMood(mood.id as any)}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer"
                  style={activeMood === mood.id
                    ? { background: '#0D7A55', color: 'white', boxShadow: '0 2px 10px rgba(13,122,85,0.3)' }
                    : { background: '#F8FAFC', color: '#64748B', border: '1px solid #E8EDF2' }
                  }
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {vibeProducts.slice(0, 4).map(product => (
              <div
                key={product.id}
                className="card-premium group cursor-pointer"
                onClick={() => onNavigate('product-detail')}
              >
                <div className="h-52 rounded-t-2xl overflow-hidden relative" style={{ background: '#F1F5F9' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div
                    className="absolute top-3 left-3 px-2 py-0.5 rounded-lg text-[10px] font-bold text-white"
                    style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(8px)' }}
                  >
                    {product.category}
                  </div>
                  {product.halalCert && (
                    <div className="badge-halal absolute top-3 right-3 shadow-sm">
                      ✓ BPJPH
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{product.supplier}</p>
                  <p className="text-[10px] font-mono mt-1" style={{ color: '#0D7A55' }}>No: {product.halalNumber}</p>

                  <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid #F1F5F9' }}>
                    <div>
                      <div className="text-[10px] text-slate-400">Harga</div>
                      <div className="text-sm font-black text-slate-900">Rp {product.price.toLocaleString('id-ID')}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={e => { e.stopPropagation(); setSelectedQR(product.id); }}
                        className="p-2 rounded-xl text-xs transition-all cursor-pointer hover:scale-105"
                        style={{ background: '#F8FAFC', border: '1px solid #E8EDF2', color: '#64748B' }}
                        title="Lacak QR"
                      >
                        📱
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); onNavigate('product-detail'); }}
                        className="btn-primary text-[11px] py-1.5 px-3 rounded-xl"
                        style={{ boxShadow: '0 2px 8px rgba(13,122,85,0.25)' }}
                      >
                        Detail →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('product-catalog')}
              className="btn-secondary text-sm"
            >
              🛍️ Buka Seluruh Katalog ({REAL_PRODUCTS.length} Produk Terverifikasi) →
            </button>
          </div>
        </div>
      </section>

      {/* ─── Supply Chain Flow ─── */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #F0FDF4 100%)' }}>
        <div className="max-w-7xl mx-auto px-5">

          <div className="text-center max-w-3xl mx-auto mb-12">
            <span
              className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ background: 'rgba(13,122,85,0.1)', color: '#0D7A55' }}
            >
              Rantai Pasok Terpadu
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Bagaimana Sistem Menjamin Kehalalan di Setiap Tahap?
            </h2>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              Pengawasan tidak berhenti pada sertifikat kertas. Kami memantau setiap rantai — dari komoditas kering hingga armada pendingin.
            </p>
          </div>

          {/* Step Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8">
            {flowSteps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTabFlow(idx)}
                className="p-4 rounded-2xl text-left transition-all cursor-pointer"
                style={{
                  background: activeTabFlow === idx ? 'white' : 'rgba(255,255,255,0.6)',
                  border: `1.5px solid ${activeTabFlow === idx ? s.color + '60' : 'rgba(226,232,240,0.8)'}`,
                  boxShadow: activeTabFlow === idx ? `0 4px 20px ${s.color}20` : 'none',
                  transform: activeTabFlow === idx ? 'translateY(-2px)' : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{s.icon}</span>
                  <span
                    className="text-[10px] font-black px-2 py-0.5 rounded-full"
                    style={{
                      background: activeTabFlow === idx ? s.color : '#F1F5F9',
                      color: activeTabFlow === idx ? 'white' : '#64748B',
                    }}
                  >
                    Tahap {s.step}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">{s.title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 truncate">{s.scope}</p>
              </button>
            ))}
          </div>

          {/* Detail Card */}
          <div
            className="rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-6"
            style={{
              background: 'white',
              border: `1.5px solid ${flowSteps[activeTabFlow].color}30`,
              boxShadow: `0 4px 24px ${flowSteps[activeTabFlow].color}12`,
            }}
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{flowSteps[activeTabFlow].icon}</span>
                <div>
                  <span
                    className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1"
                    style={{ background: flowSteps[activeTabFlow].color + '15', color: flowSteps[activeTabFlow].color }}
                  >
                    {flowSteps[activeTabFlow].tag}
                  </span>
                  <h3 className="text-lg font-black text-slate-900">{flowSteps[activeTabFlow].title}</h3>
                </div>
              </div>
              <p className="text-xs font-semibold" style={{ color: flowSteps[activeTabFlow].color }}>
                {flowSteps[activeTabFlow].scope} • {flowSteps[activeTabFlow].entity}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">{flowSteps[activeTabFlow].desc}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                <span>🛡️ Jaminan: <strong className="text-slate-700">{flowSteps[activeTabFlow].assurance}</strong></span>
                <span>•</span>
                <span>Standar: <strong className="text-slate-700">SJPH Kemenag RI (HAS 23000)</strong></span>
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto sm:min-w-44">
              <button
                onClick={() => onNavigate('supply-chain')}
                className="btn-primary justify-center text-xs"
              >
                🚚 Peta Rantai Pasok
              </button>
              <button
                onClick={() => onNavigate('verification')}
                className="btn-secondary justify-center text-xs"
              >
                📄 Bukti Verifikasi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Core Pillars ─── */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(13,122,85,0.1)', color: '#0D7A55' }}>
              Landasan Kepatuhan Syariah
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Bagaimana Kehalalan Dipastikan Bebas Ragu?
            </h2>
            <p className="text-sm text-slate-500 mt-3">
              Sistem verifikasi ganda yang menggabungkan audit fikih, dokumen resmi, dan pengawasan operasional harian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔍', color: '#0D7A55', bg: 'rgba(13,122,85,0.08)',
                title: 'Ketertelusuran Bahan Baku (BOM)',
                desc: 'Setiap bahan baku (Bill of Materials) wajib terdata nomor sertifikat halalnya. Produsen tidak diizinkan mengganti pemasok atau aditif pangan tanpa verifikasi ulang oleh Penyelia Halal.',
              },
              {
                icon: '🚚', color: '#0891B2', bg: 'rgba(8,145,178,0.08)',
                title: 'Protokol Logistik & Wadah Bersih',
                desc: 'Pengangkutan barang kering maupun beku harus menggunakan armada dengan riwayat pembersihan terverifikasi. Tidak ada percampuran antara muatan halal dan komoditas haram/najis.',
              },
              {
                icon: '⚖️', color: '#B45309', bg: 'rgba(180,83,9,0.08)',
                title: 'Sinkronisasi SIHALAL Kemenag',
                desc: 'Sistem terhubung ke data BPJPH Kementerian Agama Republik Indonesia untuk memastikan sertifikat masih aktif dan diterbitkan berdasarkan Sidang Fatwa MUI yang sah.',
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="card-premium p-7"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: pillar.bg }}
                >
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{pillar.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Band ─── */}
      <section
        className="py-16 text-white text-center"
        style={{
          background: 'linear-gradient(135deg, #0A1628 0%, #0D2B1A 50%, #0A1628 100%)',
        }}
      >
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="font-heading text-3xl sm:text-4xl font-black mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Siap Bergabung dengan Ekosistem Halal Terpadu?
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Daftarkan bisnis atau akun konsumen Anda dan nikmati transparansi penuh dari sumber ke meja.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate('register')} className="btn-primary text-sm">
              🚀 Daftar Sekarang — Gratis
            </button>
            <button
              onClick={() => onNavigate('product-catalog')}
              className="btn-secondary text-sm"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', borderColor: 'rgba(255,255,255,0.15)' }}
            >
              📦 Jelajahi Katalog Dulu
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ background: '#080E1A', color: 'rgba(255,255,255,0.45)', borderTop: '1px solid rgba(255,255,255,0.06)' }} className="py-12 text-xs">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span>• Platform Ekosistem Jaminan Halal Terpadu Indonesia</span>
          </div>
          <div className="flex flex-wrap gap-5 font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {[
              { label: 'Katalog', page: 'product-catalog' },
              { label: 'Pemasok', page: 'supplier-catalog' },
              { label: 'Rantai Pasok', page: 'supply-chain' },
              { label: 'Verifikasi', page: 'verification' },
              { label: 'Panduan SJPH', page: 'tutorial' },
            ].map(item => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} SUKAHALAL. Standar Jaminan Produk Halal Indonesia.
          </div>
        </div>
      </footer>

      <TraceabilityModal
        isOpen={!!selectedQR}
        onClose={() => setSelectedQR(null)}
        productId={selectedQR || '1'}
      />
    </div>
  );
}
