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

  // Filter products by category
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
      step: '01',
      title: 'Hulu: Sumber Bahan Baku & Sembelih Halal',
      scope: 'Rantai Pasok Pangan Segar & Komoditas Kering',
      entity: 'Petani Kopi Gayo, Peternak Sapi, & RPH Malindo Modern',
      desc: 'Bahan komoditas kering (kopi, rempah, beras) dipanen dari kebun bersertifikasi bersih, sedangkan ternak sapi disembelih manual satu per satu oleh Juru Sembelih Halal (Juleha) berlisensi BNSP sesuai syariat Islam.',
      icon: '🌾',
      assurance: 'Sertifikat Halal Bahan & NKV Level 1',
      tag: 'Bahan Baku Sah Syariat',
    },
    {
      step: '02',
      title: 'Olah: Produksi Higienis Berstandar SJPH',
      scope: 'Fasilitas Pabrik Pangan & Sentra UMKM',
      entity: 'PT Bunda Halal Foods & Sentra Agro Nusantara',
      desc: 'Pengolahan menerapkan Sistem Jaminan Produk Halal (SJPH). Dapur dan lini mesin khusus 100% bebas dari kontaminasi silang babi, khamar, atau zat najis lainnya, lalu dikemas dalam wadah food-grade kedap udara.',
      icon: '🏭',
      assurance: 'Audit Titik Kritis (CCP) & LPH',
      tag: 'Bebas Kontaminasi Silang',
    },
    {
      step: '03',
      title: 'Distribusi: Logistik Umum & Cold-Chain Tersegel',
      scope: 'Ekspedisi Darat, Kargo Boks Kering & Truk Refrigerator',
      entity: 'PT Pos Logistik Halal & Mitra Ekspedisi Nasional',
      desc: 'Pengangkutan mematuhi protokol logistik halal: wadah angkut bersih suci dari najis mughalladhah, terpisah dari muatan non-halal, serta dikawal segel keamanan digital RFID dan pemantauan sensor suhu untuk muatan beku.',
      icon: '🚚',
      assurance: 'Segel RFID & Pemisahan Logistik',
      tag: 'Pengangkutan Bersih & Tersegel',
    },
    {
      step: '04',
      title: 'Hilir: Konsumsi Tenang dengan Verifikasi Terbuka',
      scope: 'Ritel Modern, Halal Mart, & Konsumen Akhir',
      entity: 'Masyarakat & Pembeli Terverifikasi',
      desc: 'Setiap kemasan memiliki barcode resmi EAN-13 dan QR Traceability. Konsumen dapat mengecek keaslian nomor sertifikat BPJPH, nama penyelia halal, hingga histori perjalanan produk dalam hitungan detik.',
      icon: '🛡️',
      assurance: 'Terkoneksi SIHALAL Kemenag RI',
      tag: 'Transparansi Penuh',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafcfb] font-sans text-slate-800 overflow-x-hidden selection:bg-emerald-600 selection:text-white">
      
      {/* 1. Live Activity & Halal Assurance Ticker */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-2 px-4 text-xs font-semibold border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
              Sistem Terpadu
            </span>
          </div>
          <div className="truncate text-emerald-100 text-xs">
            Jaminan Halal Terverifikasi: <strong>45.000+</strong> produk terdaftar di database SIHALAL BPJPH • 📦 <em>Rendang Sapi Suwir</em> & <em>Kopi Arabika Gayo</em> diaudit berkala • 🚚 Distribusi logistik umum & cold-chain terpantau aman dari kontaminasi silang.
          </div>
          <button 
            onClick={() => onNavigate('verification')} 
            className="hidden md:flex items-center gap-1 text-emerald-300 hover:text-white shrink-0 text-xs font-bold hover:underline"
          >
            Pusat Verifikasi &rarr;
          </button>
        </div>
      </div>

      {/* 2. Header with Tiered Login Dropdown */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Logo size="md" onClick={() => onNavigate('landing')} />
            
            <nav className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-600">
              <button onClick={() => onNavigate('product-catalog')} className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                Katalog Produk
              </button>
              <button onClick={() => onNavigate('supplier-catalog')} className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                Pemasok & UMKM
              </button>
              <button onClick={() => onNavigate('supply-chain')} className="px-3 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors">
                Rantai Pasok Halal
              </button>
              <button onClick={() => onNavigate('verification')} className="px-3 py-2 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition-colors">
                Verifikasi SIHALAL
              </button>
              <button onClick={() => onNavigate('tutorial')} className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                Panduan SJPH
              </button>
            </nav>
          </div>

          {/* Right Action: Language & Tiered Login Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle />
            
            {/* Tiered Login Button */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>🔐</span>
                <span>Masuk Akun</span>
                <span className="text-[10px] opacity-80">▾</span>
              </button>

              {/* Tiered Dropdown Menu */}
              {showLoginDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-fade-in text-xs">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">Pilih Jenjang Akses</span>
                    <p className="text-[11px] text-slate-500">Masuk sesuai hak akses sistem Anda:</p>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        onSetRole('seller');
                        setShowLoginDropdown(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 transition-colors flex items-start gap-2.5 cursor-pointer"
                    >
                      <span className="text-lg bg-emerald-100 text-emerald-800 p-1.5 rounded-lg shrink-0">🏪</span>
                      <div>
                        <span className="font-bold text-xs block text-slate-900">Penjual & Produsen UMKM</span>
                        <span className="text-[10px] text-slate-500 leading-tight block">Kelola produk, sertifikasi bahan baku, & kepatuhan SJPH</span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onSetRole('distributor');
                        setShowLoginDropdown(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 hover:text-blue-900 transition-colors flex items-start gap-2.5 cursor-pointer"
                    >
                      <span className="text-lg bg-blue-100 text-blue-800 p-1.5 rounded-lg shrink-0">🚚</span>
                      <div>
                        <span className="font-bold text-xs block text-slate-900">Distributor & Ekspedisi</span>
                        <span className="text-[10px] text-slate-500 leading-tight block">Manajemen armada kargo umum & pendingin ber-SOP Halal</span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onSetRole('customer');
                        setShowLoginDropdown(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50 text-slate-800 hover:text-purple-900 transition-colors flex items-start gap-2.5 cursor-pointer"
                    >
                      <span className="text-lg bg-purple-100 text-purple-800 p-1.5 rounded-lg shrink-0">🛍️</span>
                      <div>
                        <span className="font-bold text-xs block text-slate-900">Konsumen & Pembeli</span>
                        <span className="text-[10px] text-slate-500 leading-tight block">Belanja produk terjamin halal & lacak asal usul bahan</span>
                      </div>
                    </button>
                  </div>

                  <div className="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between px-2">
                    <span className="text-[10px] text-slate-400">Belum memiliki akun?</span>
                    <button
                      onClick={() => {
                        onNavigate('register');
                        setShowLoginDropdown(false);
                      }}
                      className="text-xs font-black text-emerald-700 hover:underline cursor-pointer"
                    >
                      Daftar Akun &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 3. Hero Section: Natural, Trustworthy & Halal Assurance Focus */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Subtle Backdrop Gradients */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-br from-emerald-100/50 via-teal-50/40 to-amber-50/40 blur-3xl rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Natural Credibility Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-emerald-200 shadow-2xs">
              <span className="text-emerald-700 text-xs">🛡️</span>
              <span className="text-xs font-bold text-emerald-900">
                Sistem Jaminan Produk Halal (SJPH) Terintegrasi BPJPH Kementerian Agama RI
              </span>
            </div>

            {/* Clear, Persuasive Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.18]">
              Kepastian Kehalalan dari Sumber Bahan <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 bg-clip-text text-transparent">
                Hingga ke Meja Konsumen
              </span>
            </h1>

            {/* Clear Value Proposition */}
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              SUKAHALAL menghubungkan petani, peternak, produsen UMKM, dan ekspedisi dalam satu sistem transparansi. Setiap tahapan diawasi untuk mencegah kontaminasi najis dan memastikan kepatuhan syariat secara menyeluruh.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
              <button 
                onClick={() => onNavigate('product-catalog')}
                className="px-7 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>📦</span> Jelajahi Katalog Produk Terverifikasi
              </button>
              
              <button 
                onClick={() => onNavigate('supply-chain')}
                className="px-7 py-3.5 bg-white hover:bg-emerald-50 text-slate-800 border-2 border-slate-300 hover:border-emerald-600 rounded-2xl font-bold text-xs shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>🚚</span> Pantau Alur Rantai Pasok
              </button>

              <button 
                onClick={() => setSelectedQR('1')}
                className="px-5 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>📱</span> Uji Coba Lacak Barcode / QR
              </button>
            </div>

            {/* Halal Pillars Overview Bar */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-slate-200/80 max-w-4xl mx-auto">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xl">🌿</span>
                <span className="font-black text-xs text-slate-900 block">Bahan Baku Halal</span>
                <p className="text-[11px] text-slate-500">100% bebas babi, khamar, dan bangkai.</p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xl">🔪</span>
                <span className="font-black text-xs text-slate-900 block">Juleha Bersertifikat</span>
                <p className="text-[11px] text-slate-500">Sembelih syar'i berstandar BNSP di RPH resmi.</p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xl">🚚</span>
                <span className="font-black text-xs text-slate-900 block">Logistik Bebas Najis</span>
                <p className="text-[11px] text-slate-500">Kargo umum bersih & armada berpendingin bersegel.</p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xl">📋</span>
                <span className="font-black text-xs text-slate-900 block">Kepatuhan SJPH</span>
                <p className="text-[11px] text-slate-500">Tersinkronisasi dengan nomor resmi SIHALAL.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Product Showcase (Curated by Category) */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 mb-2 inline-block">
                Katalog Terkurasi
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Pilihan Produk Halal Nusantara
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Setiap produk dilengkapi bukti audit bahan baku, nomor sertifikat, dan legalitas produsen.
              </p>
            </div>

            {/* Category Filter Pills */}
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
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeMood === mood.id 
                      ? 'bg-emerald-800 text-white shadow-xs' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Grid of Real Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vibeProducts.slice(0, 4).map(product => (
              <div 
                key={product.id}
                className="bg-slate-50/70 rounded-3xl p-3.5 border border-slate-200/80 hover:bg-white hover:border-emerald-300 hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                {/* Photo & Tag */}
                <div className="h-48 rounded-2xl overflow-hidden relative bg-slate-200">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-white">
                    {product.category}
                  </div>
                  {product.halalCert && (
                    <div className="absolute top-2.5 right-2.5 bg-emerald-700/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-black text-white shadow-sm border border-emerald-400">
                      ✓ BPJPH Valid
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-white text-[10px] flex items-center justify-between font-mono">
                    <span>EAN: {product.barcode}</span>
                    <span className="text-amber-300 font-bold">★ {product.rating}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-2 pt-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-slate-900 text-sm leading-snug line-clamp-1 group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      Produsen: {product.supplier}
                    </p>
                    <p className="text-[10px] text-emerald-800 font-mono font-semibold mt-1">
                      No: {product.halalNumber}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Harga</span>
                      <span className="text-sm font-black text-slate-900">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => setSelectedQR(product.id)}
                        className="p-2 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-700 text-xs transition-colors cursor-pointer"
                        title="Periksa QR Riwayat Halal"
                      >
                        📱
                      </button>
                      <button 
                        onClick={() => onNavigate('product-detail')}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
                      >
                        Detail &rarr;
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
              className="px-8 py-3 bg-slate-100 hover:bg-emerald-100 text-emerald-900 rounded-2xl text-xs font-bold transition-all border border-emerald-200 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>🛍️</span> Buka Seluruh Katalog ({REAL_PRODUCTS.length} Produk Terverifikasi) &rarr;
            </button>
          </div>

        </div>
      </section>

      {/* 5. Comprehensive Supply Chain & Halal Assurance Showcase (General & Cold Chain) */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-emerald-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              Rantai Pasok Terpadu (Umum & Cold Chain)
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 leading-tight">
              Bagaimana Sistem Menjamin Kehalalan di Setiap Tahap?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Pengawasan tidak berhenti pada sertifikat kertas. Kami memantau pemisahan fisik komoditas kering (kopi, rempah, kemasan) hingga pengawalan suhu armada pendingin untuk produk daging dan susu.
            </p>
          </div>

          {/* Interactive Steps Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8">
            {flowSteps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTabFlow(idx)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  activeTabFlow === idx 
                    ? 'bg-white border-emerald-600 shadow-lg ring-2 ring-emerald-200 -translate-y-0.5' 
                    : 'bg-white/70 border-slate-200 hover:bg-white text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{s.icon}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${activeTabFlow === idx ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    Tahap {s.step}
                  </span>
                </div>
                <h4 className="font-extrabold text-xs text-slate-900 leading-snug line-clamp-1">{s.title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 truncate">{s.scope}</p>
              </button>
            ))}
          </div>

          {/* Detailed Preview Card for Active Flow Step */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xs border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{flowSteps[activeTabFlow].icon}</span>
                <div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    {flowSteps[activeTabFlow].tag}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">
                    {flowSteps[activeTabFlow].title}
                  </h3>
                </div>
              </div>
              <p className="text-xs font-semibold text-emerald-800">
                Lingkup: {flowSteps[activeTabFlow].scope} • Pelaku: {flowSteps[activeTabFlow].entity}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {flowSteps[activeTabFlow].desc}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
                <span>🛡️ Jaminan Syariat: <strong className="text-emerald-800">{flowSteps[activeTabFlow].assurance}</strong></span>
                <span>•</span>
                <span>Standar: <strong className="text-slate-700">SJPH Kemenag RI (HAS 23000)</strong></span>
              </div>
            </div>

            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <button 
                onClick={() => onNavigate('supply-chain')}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-black transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>🚚</span> Buka Peta Rantai Pasok Lengkap
              </button>
              <button 
                onClick={() => onNavigate('verification')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>📄</span> Periksa Bukti Verifikasi
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Core Pillars of Halal Assurance (Integritas Syariah) */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Landasan Kepatuhan Syariah
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
              Bagaimana Kehalalan Dipastikan Bebas Ragu?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sistem verifikasi ganda yang menggabungkan audit hukum fikih, dokumen resmi, dan pengawasan operasional harian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center text-2xl shadow-sm">
                🔍
              </div>
              <h3 className="text-base font-black text-slate-900">Ketertelusuran Bahan Baku (BOM)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Setiap bahan baku (Bill of Materials) wajib terdata nomor sertifikat halalnya. Produsen tidak diizinkan mengganti pemasok atau aditif pangan tanpa verifikasi ulang oleh Penyelia Halal.
              </p>
            </div>

            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center text-2xl shadow-sm">
                🚚
              </div>
              <h3 className="text-base font-black text-slate-900">Protokol Logistik & Wadah Bersih</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pengangkutan barang kering maupun beku harus menggunakan armada dengan riwayat pembersihan terverifikasi. Tidak ada percampuran antara muatan halal dan komoditas haram/najis.
              </p>
            </div>

            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-700 text-white flex items-center justify-center text-2xl shadow-sm">
                ⚖️
              </div>
              <h3 className="text-base font-black text-slate-900">Sinkronisasi SIHALAL Kemenag</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sistem terhubung ke data BPJPH Kementerian Agama Republik Indonesia untuk memastikan sertifikat masih dalam masa berlaku aktif dan diterbitkan berdasarkan Sidang Fatwa MUI yang sah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span>• Platform Ekosistem Jaminan Halal Terpadu Indonesia</span>
          </div>

          <div className="flex flex-wrap gap-6 font-semibold text-slate-300">
            <button onClick={() => onNavigate('product-catalog')} className="hover:text-white cursor-pointer">Katalog</button>
            <button onClick={() => onNavigate('supplier-catalog')} className="hover:text-white cursor-pointer">Pemasok</button>
            <button onClick={() => onNavigate('supply-chain')} className="hover:text-white cursor-pointer">Rantai Pasok</button>
            <button onClick={() => onNavigate('verification')} className="hover:text-white cursor-pointer">Verifikasi</button>
            <button onClick={() => onNavigate('tutorial')} className="hover:text-white cursor-pointer">Panduan SJPH</button>
          </div>

          <div className="text-slate-500 text-[11px]">
            &copy; {new Date().getFullYear()} SUKAHALAL. Terintegrasi dengan Standar Jaminan Produk Halal Indonesia.
          </div>
        </div>
      </footer>

      {/* Traceability Modal Component */}
      <TraceabilityModal 
        isOpen={!!selectedQR} 
        onClose={() => setSelectedQR(null)} 
        productId={selectedQR || '1'} 
      />
    </div>
  );
}
