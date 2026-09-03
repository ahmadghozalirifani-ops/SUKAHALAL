import React, { useState } from 'react';
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

  // Filter products by vibe
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
      title: 'Hulu: Peternak & RPH Berlisensi Juleha',
      entity: 'PT Malindo RPH Modern (Cikarang)',
      desc: 'Sapi & unggas disembelih manual sesuai syariat Islam oleh Juru Sembelih Halal (Juleha) berstandar BNSP dan ber-NKV Level 1.',
      icon: '🐄',
      temp: 'Suhu Chilled 4°C',
      tag: '100% Halal Sembelih',
    },
    {
      step: '02',
      title: 'Olah: Dapur Steril Berstandar SJPH',
      entity: 'PT Bunda Halal Foods (Bandung Barat)',
      desc: 'Bahan baku dimasak dengan rempah alami tanpa zat perasa najis, dikemas dalam pouch retort steril 121°C bebas pengawet.',
      icon: '🍲',
      temp: 'Sterilisasi 121°C',
      tag: 'Bebas Kontaminasi',
    },
    {
      step: '03',
      title: 'Kirim: Cold-Chain IoT Terkunci Digital',
      entity: 'PT Pos Logistik Halal (Armada B 9482 PXZ)',
      desc: 'Truk pendingin dilengkapi sensor IoT telemetri suhu real-time -18°C dan gembok digital RFID anti-pembobolan di jalan.',
      icon: '🚚',
      temp: 'IoT Live: -18.4°C',
      tag: 'RFID Tamper-Evident',
    },
    {
      step: '04',
      title: 'Hilir: Sampai di Meja Kamu dengan Aman',
      entity: 'Konsumen Cerdas & Halal Mart',
      desc: 'Scan barcode atau QR code di kemasan untuk membuktikan seluruh riwayat perjalanan dari hulu ke hilir secara instan!',
      icon: '✨',
      temp: 'Siap Konsumsi',
      tag: 'Terverifikasi BPJPH',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafcfb] font-sans text-slate-800 overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      
      {/* 1. Live Marquee / Flash Activity Ticker */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 text-white py-2 px-4 text-[11px] font-semibold tracking-wide overflow-hidden border-b border-emerald-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
              Live Activity
            </span>
          </div>
          <div className="truncate text-emerald-100/90 text-xs">
            🔥 <strong className="text-white">24,800+ Gen-Z</strong> beralih ke gaya hidup halal transparan • 📦 <em>Kak Salsa (Jaksel)</em> baru checkout Kopi Gayo Single Origin • 🚚 Armada <strong>B 9482 PXZ</strong> tiba di Cold Hub Cikarang (Suhu: -18.4°C) • 🛡️ 18 Sertifikat Halal baru disetujui BPJPH hari ini!
          </div>
          <button 
            onClick={() => onNavigate('product-catalog')} 
            className="hidden md:flex items-center gap-1 text-emerald-300 hover:text-white shrink-0 hover:underline text-[11px]"
          >
            Lihat Produk Tren &rarr;
          </button>
        </div>
      </div>

      {/* 2. Glassmorphism Top Sticky Navigation */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-md border-b border-emerald-100/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Logo size="md" onClick={() => onNavigate('landing')} />
            
            <nav className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-600">
              <button onClick={() => onNavigate('product-catalog')} className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                🔥 Produk Tren
              </button>
              <button onClick={() => onNavigate('supplier-catalog')} className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                🏢 Supplier Terverifikasi
              </button>
              <button onClick={() => onNavigate('supply-chain')} className="px-3 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors">
                🚚 Rantai Pasok IoT
              </button>
              <button onClick={() => onNavigate('verification')} className="px-3 py-2 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition-colors">
                🛡️ Cek SIHALAL
              </button>
              <button onClick={() => onNavigate('tutorial')} className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                📖 Halal Guide
              </button>
            </nav>
          </div>

          {/* Right Action & Role Portals */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle />
            
            <button 
              onClick={() => onNavigate('login-seller')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl transition-all border border-emerald-200"
            >
              <span>🏪</span> Masuk UMKM
            </button>

            <button 
              onClick={() => onNavigate('login-customer')}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <span>🛍️</span> Masuk / Daftar
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Section: Vibrant, Aesthetic & Cool */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Colorful Modern Mesh Background Orbs */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-br from-emerald-300/30 via-teal-200/25 to-amber-200/30 blur-3xl rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-purple-300/20 blur-3xl rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-emerald-400/20 blur-3xl rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Gen-Z Trendy Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-200 shadow-sm">
              <span className="text-sm">✨</span>
              <span className="text-xs font-extrabold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent uppercase tracking-wider">
                Halal Conscious Lifestyle • Terintegrasi BPJPH & IoT
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                Gen-Z Choice
              </span>
            </div>

            {/* Catchy Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Makan Enak, Belanja Tenang. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 bg-clip-text text-transparent">
                Halal Terlacak, 0% Was-was! 🌟
              </span>
            </h1>

            {/* Gen-Z Friendly Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Bukan cuma klaim stiker halal biasa. Lacak langsung dari peternak & kebun nusantara, rantai pendingin cold-chain bersuhu aman, sampai ke meja makanmu secara transparan.
            </p>

            {/* Hero Main Action Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
              <button 
                onClick={() => onNavigate('product-catalog')}
                className="px-7 py-3.5 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>🚀</span> Gas Explore Produk Halal
              </button>
              
              <button 
                onClick={() => onNavigate('supply-chain')}
                className="px-7 py-3.5 bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-emerald-600 rounded-2xl font-extrabold text-sm shadow-sm transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>🔍</span> Lacak Rantai Pasok IoT
              </button>

              <button 
                onClick={() => setSelectedQR('1')}
                className="px-5 py-3.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-2xl font-bold text-sm shadow-xs transition-all flex items-center gap-2"
              >
                <span>📱</span> Tes Scan QR
              </button>
            </div>

            {/* Floating Social Proof & Live Badges */}
            <div className="pt-8 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs font-bold text-slate-600 border-t border-slate-200/60 max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                  ✓
                </div>
                <div className="text-left">
                  <span className="block font-black text-slate-900 text-sm">100% Valid</span>
                  <span className="text-[11px] text-slate-500 font-normal">SIHALAL Kemenag</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                  ❄️
                </div>
                <div className="text-left">
                  <span className="block font-black text-slate-900 text-sm">Cold Chain IoT</span>
                  <span className="text-[11px] text-slate-500 font-normal">Suhu -18°C Terjaga</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black">
                  ★
                </div>
                <div className="text-left">
                  <span className="block font-black text-slate-900 text-sm">4.9 / 5.0 Rating</span>
                  <span className="text-[11px] text-slate-500 font-normal">Ribuan Ulasan B2B & B2C</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Interactive "Pilih Vibe Kamu" (Gen-Z Product Discovery) */}
      <section className="py-16 bg-white border-y border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 mb-2">
                <span>⚡</span> Trending Halal Drops
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Pilih Vibe Kamu Hari Ini 🔥
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Koleksi produk halal lokal otentik bersertifikat resmi yang lagi viral & disukai komunitas muda.
              </p>
            </div>

            {/* Vibe Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Semua Vibe', icon: '✨' },
                { id: 'makanan', label: 'Laper Berat (Rendang & Bumbu)', icon: '🍛' },
                { id: 'kopi', label: 'Ngopi Chill (Gayo Specialty)', icon: '☕' },
                { id: 'healthy', label: 'Healthy & Fresh (Susu & Madu)', icon: '🥛' },
                { id: 'beauty', label: 'Clean Beauty (Serum Halal)', icon: '🧴' },
              ].map(mood => (
                <button
                  key={mood.id}
                  onClick={() => setActiveMood(mood.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeMood === mood.id 
                      ? 'bg-emerald-700 text-white shadow-md scale-105' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{mood.icon}</span>
                  <span>{mood.label}</span>
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
                    <div className="absolute top-2.5 right-2.5 bg-emerald-600/95 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-black text-white shadow-sm border border-emerald-400">
                      ✓ BPJPH Halal
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2.5 right-2.5 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-white text-[10px] flex items-center justify-between font-mono">
                    <span>EAN: {product.barcode}</span>
                    <span className="text-amber-300 font-bold">★ {product.rating}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-2 pt-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1 group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      🏢 {product.supplier}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-mono font-semibold mt-1">
                      No: {product.halalNumber}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Harga</span>
                      <span className="text-sm font-black text-slate-900">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => setSelectedQR(product.id)}
                        className="p-2 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-700 text-xs transition-colors"
                        title="Scan QR Traceability"
                      >
                        📱
                      </button>
                      <button 
                        onClick={() => onNavigate('product-detail')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
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
              className="px-8 py-3 bg-slate-100 hover:bg-emerald-100 text-emerald-800 rounded-2xl text-xs font-black transition-all border border-emerald-200 inline-flex items-center gap-2 shadow-xs"
            >
              <span>🛍️</span> Buka Seluruh Katalog Produk Halal ({REAL_PRODUCTS.length} SKU) &rarr;
            </button>
          </div>

        </div>
      </section>

      {/* 5. Interactive Farm-to-Fork Traceability Showcase */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-emerald-50/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              🔗 End-to-End Transparency
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              Bagaimana Makanan Halal Sampai ke Meja Kamu?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Klik setiap tahapan di bawah untuk melihat transparansi sensor suhu IoT, audit kebersihan, dan sertifikat BPJPH yang terhubung.
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
                    ? 'bg-white border-emerald-500 shadow-xl ring-2 ring-emerald-200 -translate-y-1' 
                    : 'bg-white/70 border-slate-200 hover:bg-white text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{s.icon}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${activeTabFlow === idx ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    Tahap {s.step}
                  </span>
                </div>
                <h4 className="font-extrabold text-xs text-slate-900 leading-snug line-clamp-1">{s.title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 truncate">{s.entity}</p>
              </button>
            ))}
          </div>

          {/* Detailed Preview Card for Active Flow Step */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{flowSteps[activeTabFlow].icon}</span>
                <div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {flowSteps[activeTabFlow].tag}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">
                    {flowSteps[activeTabFlow].title}
                  </h3>
                </div>
              </div>
              <p className="text-xs font-mono font-bold text-emerald-700">
                Unit Usaha: {flowSteps[activeTabFlow].entity}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {flowSteps[activeTabFlow].desc}
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
                <span>📡 Status Sensor: <strong className="text-blue-700">{flowSteps[activeTabFlow].temp}</strong></span>
                <span>•</span>
                <span>🛡️ Standar: <strong className="text-emerald-700">SJPH Kemenag RI</strong></span>
              </div>
            </div>

            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <button 
                onClick={() => onNavigate('supply-chain')}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>🚚</span> Buka Monitoring Rantai Pasok Live
              </button>
              <button 
                onClick={() => onNavigate('supplier-profile')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>🏢</span> Lihat Profil Supplier Ini
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Bento Grid: Kenapa Gen-Z Suka SUKAHALAL */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Kenapa Harus SUKAHALAL?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              Bukan Sekadar Belanja, Ini Gaya Hidup Bersih & Adil 🌱
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1 */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl border border-emerald-200/80 shadow-xs space-y-4 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-md">
                🔍
              </div>
              <h3 className="text-lg font-black text-slate-900">Anti Blind Buying</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tahu persis asal usul daging, bumbu, hingga rempah yang kamu makan. Tinggal scan QR untuk kepoin peternak, RPH, dan audit halal langsung.
              </p>
            </div>

            {/* Bento Card 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl border border-blue-200/80 shadow-xs space-y-4 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl shadow-md">
                ❄️
              </div>
              <h3 className="text-lg font-black text-slate-900">IoT Cold Chain Guard</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Daging segar dan susu pasteurisasi dikawal sensor IoT bersuhu -18°C dan gembok digital RFID sehingga kualitas produk tetap tayyiban sampai di rumah.
              </p>
            </div>

            {/* Bento Card 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-200/80 shadow-xs space-y-4 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl shadow-md">
                🤖
              </div>
              <h3 className="text-lg font-black text-slate-900">Verifikasi Dokumen AI</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pengecekan sertifikat bahan baku otomatis lewat AI OCR yang langsung terhubung ke database resmi SIHALAL Kementerian Agama RI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Community & Role Entry Portal */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-8">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-300">
              Join Ecosystem
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Mulai Langkah Halalmu Sekarang ✨
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80">
              Pilih peranmu dan jelajahi ekosistem digital halal terlengkap di Indonesia.
            </p>
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 hover:bg-white/15 transition-all space-y-4">
              <div className="text-4xl">🏪</div>
              <div>
                <h3 className="font-extrabold text-base text-white">UMKM & Penjual</h3>
                <p className="text-xs text-emerald-100/80 mt-1">Kelola sertifikasi BPJPH, upload dokumen bahan baku, dan pasarkan produk halalmu.</p>
              </div>
              <button 
                onClick={() => onNavigate('login-seller')}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-colors shadow-md"
              >
                Masuk sebagai Seller &rarr;
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 hover:bg-white/15 transition-all space-y-4">
              <div className="text-4xl">🚚</div>
              <div>
                <h3 className="font-extrabold text-base text-white">Distributor Logistik</h3>
                <p className="text-xs text-emerald-100/80 mt-1">Integrasi armada cold chain berpendingin, sinkronisasi API BPJPH, dan pantau pengiriman.</p>
              </div>
              <button 
                onClick={() => onNavigate('login-distributor')}
                className="w-full bg-blue-400 hover:bg-blue-500 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-colors shadow-md"
              >
                Masuk sebagai Distributor &rarr;
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 hover:bg-white/15 transition-all space-y-4">
              <div className="text-4xl">🛍️</div>
              <div>
                <h3 className="font-extrabold text-base text-white">Konsumen Cerdas</h3>
                <p className="text-xs text-emerald-100/80 mt-1">Beli produk halal terjamin, lacak keaslian barcode, dan nikmati belanja tenang.</p>
              </div>
              <button 
                onClick={() => onNavigate('login-customer')}
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-colors shadow-md"
              >
                Masuk sebagai Konsumen &rarr;
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span>• Ekosistem Halal Digital Terintegrasi BPJPH (Kemenag RI)</span>
          </div>

          <div className="flex flex-wrap gap-6 font-semibold text-slate-300">
            <button onClick={() => onNavigate('product-catalog')} className="hover:text-white">Katalog</button>
            <button onClick={() => onNavigate('supplier-catalog')} className="hover:text-white">Supplier</button>
            <button onClick={() => onNavigate('supply-chain')} className="hover:text-white">Rantai Pasok</button>
            <button onClick={() => onNavigate('verification')} className="hover:text-white">Verifikasi</button>
            <button onClick={() => onNavigate('tutorial')} className="hover:text-white">Tutorial</button>
          </div>

          <div className="text-slate-500 text-[11px]">
            &copy; {new Date().getFullYear()} SUKAHALAL. All rights reserved.
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
