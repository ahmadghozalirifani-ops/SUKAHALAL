import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';
import LanguageToggle from '../components/LanguageToggle';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import KPIWidget from '../components/KPIWidget';
import TrafficLightStatus, { type TLSStatus } from '../components/TrafficLightStatus';
import TraceabilityModal from '../components/TraceabilityModal';
import { REAL_PRODUCTS } from '../data/mockData';

export type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

export interface PageProps {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

const Dashboard: React.FC<PageProps> = ({ onNavigate, userRole, onSetRole }) => {
  const { t } = useTranslation();
  const [guestScanQR, setGuestScanQR] = useState<string | null>(null);
  const [dashToast, setDashToast] = useState<string | null>(null);

  const showDashToast = (msg: string) => {
    setDashToast(msg);
    setTimeout(() => setDashToast(null), 3000);
  };

  const renderGuestDashboard = () => (
    <div className="w-full min-h-screen bg-[#fafcfb] font-sans text-slate-800">
      {/* Top Header with Tiered Login */}
      <AppHeader onNavigate={onNavigate} userRole="guest" onSetRole={onSetRole} />

      {/* Live System Activity Ticker */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-2 px-6 text-xs font-semibold overflow-hidden border-b border-emerald-800 flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
            Sistem Terpadu
          </span>
        </div>
        <div className="truncate text-emerald-100 text-xs px-4">
          Jaminan Kehalalan Terverifikasi: <strong>45.000+</strong> produk terdata resmi di SIHALAL BPJPH • 🚚 Pemantauan logistik umum & berpendingin aktif mengawal kebersihan wadah bebas kontaminasi.
        </div>
        <button onClick={() => onNavigate('verification')} className="hidden sm:inline text-xs text-emerald-300 font-bold hover:underline shrink-0">
          Cek Dokumen &rarr;
        </button>
      </div>

      {/* Hero: Natural, Clear & Authoritative Halal Assurance Banner */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 py-16 px-6 text-center text-white overflow-hidden">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-12 right-12 w-64 h-64 bg-teal-500/15 blur-2xl rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-emerald-200 border border-white/20">
            <span>🛡️</span> Sistem Jaminan Produk Halal (SJPH) Terintegrasi BPJPH Kemenag RI
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Ekosistem Jaminan Halal Terpadu <br />
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
              Dari Sumber Bahan Hingga Meja Konsumen
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl mx-auto font-medium leading-relaxed">
            Menghubungkan UMKM, produsen bahan baku, dan ekspedisi logistik dalam satu platform transparansi. Mengawal kepatuhan syariat, bebas najis, dan mencegah kontaminasi silang secara menyeluruh.
          </p>

          {/* Quick Entry Portals */}
          <div className="flex flex-wrap gap-2.5 justify-center pt-3">
            <button 
              onClick={() => onSetRole('seller')} 
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>🏪</span> Masuk sebagai Penjual UMKM
            </button>
            <button 
              onClick={() => onSetRole('distributor')} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>🚚</span> Masuk sebagai Distributor Logistik
            </button>
            <button 
              onClick={() => onSetRole('customer')} 
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>🛍️</span> Masuk sebagai Pembeli
            </button>
            <button 
              onClick={() => onNavigate('product-catalog')} 
              className="bg-white/15 hover:bg-white/25 text-white px-5 py-2.5 rounded-xl font-bold text-xs border border-white/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>📦</span> Jelajahi Katalog Terverifikasi
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        
        {/* Featured Products with Real Photos */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                🔥 Rekomendasi Hari Ini
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Produk Halal Lokal Pilihan Gen-Z ✨
              </h2>
              <p className="text-xs text-slate-500">Foto asli, nomor sertifikat BPJPH valid, dan barcode EAN-13 resmi.</p>
            </div>
            
            <button 
              onClick={() => onNavigate('product-catalog')} 
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              Lihat Semua ({REAL_PRODUCTS.length} Produk) &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REAL_PRODUCTS.slice(0, 6).map(product => (
              <div 
                key={product.id} 
                className="bg-white border border-slate-200/80 rounded-3xl p-3.5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
              >
                {/* Photo & Tag */}
                <div className="h-44 bg-slate-100 rounded-2xl overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white">
                    {product.category}
                  </div>
                  {product.halalCert && (
                    <div className="absolute top-2 right-2 bg-emerald-600/95 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-black text-white shadow-sm border border-emerald-400">
                      ✓ BPJPH
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md text-white text-[10px] flex items-center justify-between font-mono">
                    <span>EAN: {product.barcode}</span>
                    <span className="text-amber-300 font-bold">★ {product.rating}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-2 pt-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 leading-snug line-clamp-1 group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                      🏢 {product.supplier}
                    </p>
                    <p className="text-[10px] text-emerald-700 font-mono mt-1 font-semibold">
                      No: {product.halalNumber}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Harga</span>
                      <span className="text-sm font-extrabold text-slate-900">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => setGuestScanQR(product.id)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 text-xs transition-colors"
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
        </section>

        {/* Interactive Supply Chain Transparency Flow */}
        <section className="bg-gradient-to-br from-slate-50 to-emerald-50/50 rounded-3xl p-8 border border-slate-200 text-center space-y-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              🔗 Traceability Pipeline
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Transparansi Rantai Pasok Dari Hulu ke Hilir
            </h2>
            <p className="text-xs text-slate-600 max-w-xl mx-auto mt-1">
              Setiap batch produk diawasi secara digital oleh sensor IoT cold chain dan diverifikasi oleh auditor halal BPJPH.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-xs font-bold">
            <div className="flex flex-col items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-xs w-36">
              <span className="text-2xl mb-1">🌾</span>
              <span className="text-slate-800">Peternak/Kebun</span>
              <span className="text-[9px] text-emerald-700 mt-1 bg-emerald-50 px-1.5 py-0.5 rounded">RPH Juleha</span>
            </div>
            <div className="h-1 w-8 bg-emerald-400 md:block hidden"></div>
            <div className="flex flex-col items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-xs w-36">
              <span className="text-2xl mb-1">🏭</span>
              <span className="text-slate-800">Pabrik Pangan</span>
              <span className="text-[9px] text-emerald-700 mt-1 bg-emerald-50 px-1.5 py-0.5 rounded">Retort 121°C</span>
            </div>
            <div className="h-1 w-8 bg-emerald-400 md:block hidden"></div>
            <div className="flex flex-col items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-xs w-36">
              <span className="text-2xl mb-1">🚚</span>
              <span className="text-slate-800">Cold Chain IoT</span>
              <span className="text-[9px] text-blue-700 mt-1 bg-blue-50 px-1.5 py-0.5 rounded">Suhu -18°C</span>
            </div>
            <div className="h-1 w-8 bg-emerald-400 md:block hidden"></div>
            <div className="flex flex-col items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-xs w-36">
              <span className="text-2xl mb-1">🏪</span>
              <span className="text-slate-800">Halal Mart/Ritel</span>
              <span className="text-[9px] text-emerald-700 mt-1 bg-emerald-50 px-1.5 py-0.5 rounded">Siap Konsumsi</span>
            </div>
          </div>

          <div>
            <button 
              onClick={() => onNavigate('supply-chain')} 
              className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-extrabold rounded-xl transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <span>🚚</span> Buka Monitoring Rantai Pasok Lengkap &rarr;
            </button>
          </div>
        </section>

        {/* Gen-Z Halal Life Guide (Bento Style) */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Kenapa Gen-Z Pilih SUKAHALAL? 🌟
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Gaya hidup sadar kebersihan (*Tayyiban*), etis, dan transparan untuk generasi modern.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-2xs space-y-2">
              <span className="text-2xl">🔍</span>
              <h3 className="font-extrabold text-sm text-emerald-900">Anti Blind Buying</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tahu persis asal usul daging, bumbu, hingga kemasan tanpa rasa ragu.
              </p>
            </div>

            <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 shadow-2xs space-y-2">
              <span className="text-2xl">❄️</span>
              <h3 className="font-extrabold text-sm text-blue-900">IoT Cold Chain</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sensor suhu real-time memastikan daging dan susu tidak rusak di jalan.
              </p>
            </div>

            <div className="p-5 bg-purple-50 rounded-2xl border border-purple-100 shadow-2xs space-y-2">
              <span className="text-2xl">🤖</span>
              <h3 className="font-extrabold text-sm text-purple-900">Integrasi SIHALAL</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Terhubung langsung ke basis data sertifikasi resmi BPJPH Kemenag RI.
              </p>
            </div>

            <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 shadow-2xs space-y-2">
              <span className="text-2xl">📱</span>
              <h3 className="font-extrabold text-sm text-amber-900">Scan QR Traceability</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tinggal scan barcode di HP untuk membuktikan histori batch produk secara instan.
              </p>
            </div>
          </div>
        </section>

        {/* Real Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-200/80 pt-8 text-center">
          <div>
            <div className="text-3xl font-black text-slate-900 mb-0.5">2,400+</div>
            <div className="text-xs text-slate-500 font-medium">Supplier Terdaftar</div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-600 mb-0.5">45,000+</div>
            <div className="text-xs text-slate-500 font-medium">Produk Halal Terdata</div>
          </div>
          <div>
            <div className="text-3xl font-black text-blue-600 mb-0.5">100%</div>
            <div className="text-xs text-slate-500 font-medium">Terverifikasi BPJPH</div>
          </div>
          <div>
            <div className="text-3xl font-black text-purple-600 mb-0.5">850K+</div>
            <div className="text-xs text-slate-500 font-medium">Pelanggan Aktif</div>
          </div>
        </section>

      </div>
    </div>
  );

  const renderRoleSwitcherBanner = () => (
    <div className="bg-white rounded-2xl p-3 shadow-xs border border-slate-200 mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-black uppercase tracking-wider text-slate-500">Pratinjau Peran Sistem:</span>
        <span className="text-xs font-bold text-slate-800">Uji coba akses informasi dari sudut pandang:</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onSetRole('seller')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            userRole === 'seller' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-slate-100 hover:bg-emerald-50 text-slate-700'
          }`}
        >
          <span>🏪</span> Produsen / Supplier
        </button>

        <button
          onClick={() => onSetRole('distributor')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            userRole === 'distributor' ? 'bg-blue-700 text-white shadow-xs' : 'bg-slate-100 hover:bg-blue-50 text-slate-700'
          }`}
        >
          <span>🚚</span> Distributor & Logistik
        </button>

        <button
          onClick={() => onSetRole('customer')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            userRole === 'customer' ? 'bg-purple-700 text-white shadow-xs' : 'bg-slate-100 hover:bg-purple-50 text-slate-700'
          }`}
        >
          <span>🛍️</span> Konsumen / Pembeli
        </button>

        <button
          onClick={() => onSetRole('guest')}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
        >
          <span>🌐</span> Mode Tamu
        </button>
      </div>
    </div>
  );

  // 1. DASHBOARD SUPPLIER / PRODUSEN UMKM (Hijau Emerald)
  const renderSellerDashboard = () => (
    <div className="flex flex-col gap-6 font-sans text-slate-800">
      {renderRoleSwitcherBanner()}

      {/* Supplier Identity Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-emerald-800">
        <div className="absolute -top-12 right-0 w-80 h-80 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-400/20 text-emerald-300 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-400/30">
                Panel Produsen & Supplier Halal
              </span>
              <span className="text-xs text-emerald-200">ID Sertifikat: <strong>ID32110000123450223</strong></span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              PT Bunda Halal Foods Nusantara
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
              Pabrik Pengolahan Pangan Steril Retort 121°C • Status Kepatuhan SJPH: <strong className="text-white font-bold">100% Memenuhi Syariat (A Sangat Baik)</strong>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => onNavigate('product-management')}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>➕</span> Tambah SKU Baru
            </button>
            <button
              onClick={() => onNavigate('upload-dokumen')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>📄</span> Perpanjang Sertifikat SJPH
            </button>
          </div>
        </div>
      </div>

      {/* Supplier KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Penjualan Bulan Ini</span>
          <span className="text-xl font-black text-slate-900 mt-0.5 block">Rp 48.650.000</span>
          <span className="text-[10px] text-emerald-700 font-bold">▲ +14.2% vs bulan lalu</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Pesanan Menunggu Kirim</span>
          <span className="text-xl font-black text-emerald-700 mt-0.5 block">12 Pesanan</span>
          <span className="text-[10px] text-slate-500">8 Grosir, 4 Konsumen</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">SKU Aktif SiHalal</span>
          <span className="text-xl font-black text-slate-900 mt-0.5 block">8 Produk</span>
          <span className="text-[10px] text-emerald-700 font-bold">✓ Semua Terdaftar Resmi</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Bahan Baku (BOM)</span>
          <span className="text-xl font-black text-blue-700 mt-0.5 block">14 Bahan Sah</span>
          <span className="text-[10px] text-slate-500">100% Halal Terlacak</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Audit Trail SJPH</span>
          <span className="text-xl font-black text-emerald-700 mt-0.5 block">Level A</span>
          <span className="text-[10px] text-slate-500">Audit BPJPH: Valid s/d 2028</span>
        </div>
      </div>

      {/* Supplier Core Sections: BOM Verification & Incoming Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Verifikasi Bahan Baku dari Hulu (BOM Ingestion) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>🌾</span> Verifikasi Bahan Baku Masuk (Bill of Materials / BOM)
              </h3>
              <p className="text-xs text-slate-500">Memastikan seluruh bahan dari supplier hulu bersertifikat halal dan bebas najis</p>
            </div>
            <button onClick={() => onNavigate('inventaris')} className="text-xs font-bold text-emerald-700 hover:underline">
              Kelola Stok & Bahan &rarr;
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              { name: 'Daging Sapi Segar Paha Depan', supplier: 'PT Malindo RPH Modern (Cikarang)', cert: 'ID32160000881230422', status: 'Halal Valid (Juleha BNSP)', stock: '350 kg', icon: '🥩' },
              { name: 'Santan Kelapa Murni Cair', supplier: 'Koperasi Kelapa Parut Nusantara', cert: 'ID14050001882190124', status: 'Halal Valid (LPPOM MUI)', stock: '120 L', icon: '🥥' },
              { name: 'Rempah Giling Tradisional (Jahe, Lengkuas)', supplier: 'Sentra Rempah Padalarang', cert: 'ID32170000451920323', status: 'Halal Valid (BPJPH)', stock: '85 kg', icon: '🌶️' },
              { name: 'Pouch Kemasan Retort 121°C Food-Grade', supplier: 'PT Multi Kemasan Halal', cert: 'ID00110000998200122', status: 'Food Grade & Suci', stock: '2.500 pcs', icon: '📦' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50/80 hover:bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.name}</h4>
                    <p className="text-[11px] text-slate-500">Pemasok: {item.supplier} • No: {item.cert}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:text-right">
                  <div>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] block">
                      ✓ {item.status}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">Sisa Stok: {item.stock}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Pesanan Masuk & Aksi Cepat Supplier */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span>📋</span> Pesanan Masuk Siap Diproses
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-900">#ORD-B2B-8912</span>
                  <span className="text-emerald-800">Rp 4.250.000</span>
                </div>
                <p className="text-slate-600 text-[11px]">Mitra: <strong>Halal Mart Fatmawati</strong> (50 Pouch Rendang Suwir)</p>
                <div className="flex gap-2 pt-1">
                  <button onClick={() => showDashToast('Label Barcode EAN-13 dicetak dan pesanan disetujui!')} className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-1.5 rounded-xl font-bold text-[11px] cursor-pointer">
                    Terima & Cetak Label
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-900">#ORD-CUST-4120</span>
                  <span className="text-slate-800">Rp 170.000</span>
                </div>
                <p className="text-slate-600 text-[11px]">Pembeli: <strong>Nadya Putri (Jakarta)</strong> (2 Pouch Rendang Sapi)</p>
                <div className="flex gap-2 pt-1">
                  <button onClick={() => showDashToast('Kurir Pos Logistik Halal dipanggil untuk serah terima paket!')} className="flex-1 bg-slate-900 hover:bg-black text-white py-1.5 rounded-xl font-bold text-[11px] cursor-pointer">
                    Panggil Kurir Halal
                  </button>
                </div>
              </div>
            </div>

            <button onClick={() => onNavigate('pesanan')} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer">
              Lihat Semua 12 Pesanan Masuk &rarr;
            </button>
          </div>

          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 space-y-2 text-xs">
            <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
              <span>🛡️</span> Tips Kepatuhan SJPH Hari Ini:
            </h4>
            <p className="text-emerald-900/90 leading-relaxed text-[11px]">
              Pastikan formulir checklist pembersihan harian dapur retort ditandatangani oleh <strong>Penyelia Halal berlisensi BNSP</strong> sebelum pergantian shift produksi sore ini.
            </p>
          </div>
        </div>

      </div>
    </div>
  );

  // 2. DASHBOARD DISTRIBUTOR & EKSPEDISI LOGISTIK (Biru Ocean)
  const renderDistributorDashboard = () => (
    <div className="flex flex-col gap-6 font-sans text-slate-800">
      {renderRoleSwitcherBanner()}

      {/* Distributor Identity Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-cyan-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-blue-800">
        <div className="absolute -top-12 right-0 w-80 h-80 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/20 text-blue-300 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border border-blue-400/30">
                Panel Ekspedisi & Logistik Halal
              </span>
              <span className="text-xs text-blue-200">Izin Angkut Halal: <strong>DIST-BPJPH-2024-089</strong></span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              PT Pos Logistik Halal Indonesia
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 max-w-xl leading-relaxed">
              Pengangkutan Terpadu Komoditas Kering & Truk Refrigerator Cold Chain • Protokol Sanitasi Bebas Najis: <strong className="text-white font-bold">HAS 23000 Terverifikasi</strong>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => onNavigate('supply-chain')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>📡</span> Live Sensor Suhu IoT
            </button>
            <button
              onClick={() => onNavigate('verification')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>🧼</span> Log Sanitasi Wadah
            </button>
          </div>
        </div>
      </div>

      {/* Distributor KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Armada Sedang Bertugas</span>
          <span className="text-xl font-black text-blue-700 mt-0.5 block">18 Truk Aktif</span>
          <span className="text-[10px] text-emerald-700 font-bold">● 100% Terpantau GPS</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Suhu Rata-rata Cold Chain</span>
          <span className="text-xl font-black text-blue-800 mt-0.5 block">-18.4°C</span>
          <span className="text-[10px] text-emerald-700 font-bold">✓ Stabil Sesuai Standar</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Integritas Segel RFID</span>
          <span className="text-xl font-black text-emerald-700 mt-0.5 block">100% Aman</span>
          <span className="text-[10px] text-slate-500">0 Laporan Pembobolan</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Manifest Paket Hari Ini</span>
          <span className="text-xl font-black text-slate-900 mt-0.5 block">320 Koli</span>
          <span className="text-[10px] text-slate-500">Kering & Pendingin</span>
        </div>
      </div>

      {/* Distributor Fleet Management & Live Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Active Truck Monitoring */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>🚛</span> Status Armada Distribusi & Telemetri Real-Time
              </h3>
              <p className="text-xs text-slate-500">Pantauan suhu ruang muatan, gembok digital RFID, dan lokasi GPS terkini</p>
            </div>
            <button onClick={() => onNavigate('supply-chain')} className="text-xs font-bold text-blue-700 hover:underline">
              Peta Rantai Pasok &rarr;
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { plate: 'B 9482 PXZ', type: 'Truk Refrigerator (Beku)', driver: 'Pak Bambang (0812-9988-1122)', route: 'RPH Cikarang ➔ Pabrik Bunda Halal', temp: '-18.4°C', seal: 'RFID Terkunci', location: 'KM 34 Cikarang Barat', status: 'Normal' },
              { plate: 'B 9102 UXZ', type: 'Truk Boks Kering (Dry Freight)', driver: 'Pak Dedi Supriadi (0813-8899-7711)', route: 'Sentra Rempah ➔ Hub Jakarta', temp: '24.5°C', seal: 'Barcode Segel Utuh', location: 'Rest Area KM 57', status: 'Normal' },
              { plate: 'D 8812 AB', type: 'Chilled Box Van (Susu Segar)', driver: 'Pak Hendra (0811-2233-4455)', route: 'Peternakan Lembang ➔ Pabrik Pengolahan', temp: '3.8°C', seal: 'RFID Terkunci', location: 'Tol Pasteur KM 1', status: 'Normal' },
            ].map((truck, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm">{truck.plate}</span>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{truck.type}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ✓ Segel: {truck.seal}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1 border-t border-slate-200/60 text-slate-600">
                  <div><span className="text-slate-400 block text-[10px]">Rute</span>{truck.route}</div>
                  <div><span className="text-slate-400 block text-[10px]">Posisi</span>📍 {truck.location}</div>
                  <div><span className="text-slate-400 block text-[10px]">Sensor Suhu</span><strong className="text-blue-700">{truck.temp}</strong></div>
                  <div><span className="text-slate-400 block text-[10px]">Supir PIC</span>{truck.driver}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sanitasi & Kepatuhan Fiqih Logistik */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span>🧼</span> Protokol Sanitasi Wadah Angkut
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-1">
                <span className="font-bold text-blue-950 block">Checklist Bebas Najis Terverifikasi</span>
                <p className="text-[11px] text-blue-900">Seluruh 18 armada telah melalui prosedur pencucian higienis sebelum memuat produk pangan (HAS 23000).</p>
                <span className="text-[10px] text-blue-700 font-semibold block">Inspektur: Ust. Ahmad Fauzi (Auditor Halal Internal)</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <span className="font-bold text-slate-900 block">Manifest Surat Jalan Halal</span>
                <p className="text-[11px] text-slate-600">Surat jalan digital otomatis menyertakan barcode sertifikat BPJPH untuk diserahkan ke penerima ritel.</p>
              </div>
            </div>

            <button onClick={() => onNavigate('verification')} className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer">
              Input Form Sanitasi Truk Baru &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  // 3. DASHBOARD KONSUMEN / PEMBELI CERDAS (Ungu / Violet)
  const renderCustomerDashboard = () => (
    <div className="flex flex-col gap-6 font-sans text-slate-800">
      {renderRoleSwitcherBanner()}

      {/* Customer Identity Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-purple-800">
        <div className="absolute -top-12 right-0 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-purple-500/20 text-purple-300 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border border-purple-400/30">
                Akun Konsumen Terverifikasi
              </span>
              <span className="text-xs text-purple-200">Saldo HalalPay: <strong>Rp 450.000</strong></span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Halo, Nadya Putri! 👋
            </h2>
            <p className="text-xs sm:text-sm text-purple-100/90 max-w-xl leading-relaxed">
              Belanja produk makanan, minuman, dan kosmetik terjamin 100% halal dan terlacak dari hulu ke hilir bebas rasa was-was.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => onNavigate('cart')}
              className="px-4 py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>🛒</span> Buka Keranjang (3 Item)
            </button>
            <button
              onClick={() => setGuestScanQR('1')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>📱</span> Scan Barcode Produk
            </button>
          </div>
        </div>
      </div>

      {/* Customer KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Isi Keranjang Belanja</span>
          <span className="text-xl font-black text-purple-700 mt-0.5 block">3 Produk</span>
          <span className="text-[10px] text-slate-500">Siap Checkout Syariah</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Paket Sedang Dikirim</span>
          <span className="text-xl font-black text-blue-700 mt-0.5 block">1 Pesanan Di Jalan</span>
          <span className="text-[10px] text-emerald-700 font-bold">❄️ Truk Cold Chain B 9482 PXZ</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Daftar Wishlist Favorit</span>
          <span className="text-xl font-black text-pink-600 mt-0.5 block">12 Produk</span>
          <span className="text-[10px] text-slate-500">Disimpan untuk Nanti</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Poin Berkah Belanja</span>
          <span className="text-xl font-black text-amber-600 mt-0.5 block">1.850 Poin</span>
          <span className="text-[10px] text-slate-500">Bisa Ditukar Voucher</span>
        </div>
      </div>

      {/* Live Order Tracking for Customer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Active Delivery Tracking */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>📦</span> Pelacakan Pengiriman Pesanan Saya (Real-Time GPS & IoT)
              </h3>
              <p className="text-xs text-slate-500">Nomor Resi: <strong>POS-HALAL-8891024</strong> • Kurir: PT Pos Logistik Halal</p>
            </div>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              Sedang Menuju Alamat Kamu
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900 block text-sm">Paket: 2x Rendang Daging Sapi Suwir Padang (300g)</span>
                <p className="text-slate-500 text-[11px]">Produsen: PT Bunda Halal Foods • No. SIHALAL: ID32110000123450223</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-slate-400 block font-bold">Estimasi Tiba</span>
                <span className="font-extrabold text-slate-900 text-sm">Hari Ini, 14:30 WIB</span>
              </div>
            </div>

            {/* Tracking Progress */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-2">
                <span className="text-emerald-700">✓ Dikemas Steril Retort 121°C</span>
                <span className="text-emerald-700">✓ Masuk Truk Dingin (-18.4°C)</span>
                <span className="text-purple-700 font-extrabold">● Di Antar Kurir Terakhir</span>
                <span className="text-slate-400">○ Tiba di Rumah</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 h-full w-3/4 rounded-full"></div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-[11px]">
              <span className="text-slate-600">Armada Pengantar: <strong>Truk B 9482 PXZ (Suhu boks: -18.4°C stabil)</strong></span>
              <button onClick={() => setGuestScanQR('1')} className="text-purple-700 font-bold hover:underline">
                Periksa Asal Ternak & Kebun &rarr;
              </button>
            </div>
          </div>

          {/* Quick Recommended Carousel for Customer */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-3 flex items-center gap-1.5">
              <span>✨</span> Rekomendasi Halal Lainnya untuk Kamu:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {REAL_PRODUCTS.slice(1, 4).map(p => (
                <div key={p.id} className="p-3 bg-slate-50/70 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xl block mb-1">☕</span>
                    <h5 className="font-bold text-xs text-slate-900 line-clamp-1">{p.name}</h5>
                    <p className="text-[10px] text-slate-500">{p.category} • Rp {p.price.toLocaleString('id-ID')}</p>
                  </div>
                  <button onClick={() => onNavigate('cart')} className="mt-2 w-full py-1 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-[10px] font-bold transition-colors cursor-pointer">
                    + Tambah Keranjang
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick Action Cards for Customer */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span>🛡️</span> Sertifikat Halal Saya
            </h3>
            <p className="text-xs text-slate-500">Unduh bukti keabsahan dokumen BPJPH dari seluruh produk yang pernah Anda beli:</p>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Rendang Daging Sapi Suwir</span>
                  <span className="text-[10px] text-slate-500 font-mono">ID32110000123450223</span>
                </div>
                <button onClick={() => showDashToast('e-Sertifikat BPJPH resmi (ID32110000123450223) berhasil diunduh!')} className="text-emerald-700 font-bold hover:underline text-[11px] cursor-pointer">
                  Unduh PDF ↓
                </button>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Kopi Arabika Gayo Organik</span>
                  <span className="text-[10px] text-slate-500 font-mono">ID11110000889920124</span>
                </div>
                <button onClick={() => showDashToast('e-Sertifikat BPJPH resmi (ID11110000889920124) berhasil diunduh!')} className="text-emerald-700 font-bold hover:underline text-[11px] cursor-pointer">
                  Unduh PDF ↓
                </button>
              </div>
            </div>

            <button onClick={() => onNavigate('product-catalog')} className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer">
              Belanja Produk Lainnya &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  if (userRole === 'guest') {
    return (
      <>
        {renderGuestDashboard()}
        <TraceabilityModal 
          isOpen={!!guestScanQR} 
          onClose={() => setGuestScanQR(null)} 
          productId={guestScanQR || '1'} 
        />
        {dashToast && (
          <div className="fixed top-20 right-6 z-50 bg-slate-950 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-2xl border border-emerald-500/40 animate-fade-in flex items-center gap-2">
            <span>✨</span> {dashToast}
          </div>
        )}
      </>
    );
  }

  const roleThemeColor = userRole === 'distributor' ? 'bg-blue-50' : userRole === 'customer' ? 'bg-violet-50' : 'bg-gray-50';

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar onNavigate={onNavigate} currentRoute="dashboard" userRole={userRole} />
      <div className={`flex-1 flex flex-col ${roleThemeColor}`}>
        <AppHeader 
           onNavigate={onNavigate}
           userRole={userRole} 
           onSetRole={onSetRole} 
           breadcrumbs={[{ label: t('breadcrumbs.dashboard', 'Dashboard') }]} 
        />
        <main className="flex-1 overflow-y-auto p-6">
          {dashToast && (
            <div className="fixed top-20 right-6 z-50 bg-slate-950 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-2xl border border-emerald-500/40 animate-fade-in flex items-center gap-2">
              <span>✨</span> {dashToast}
            </div>
          )}
          {userRole === 'seller' && renderSellerDashboard()}
          {userRole === 'distributor' && renderDistributorDashboard()}
          {userRole === 'customer' && renderCustomerDashboard()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
