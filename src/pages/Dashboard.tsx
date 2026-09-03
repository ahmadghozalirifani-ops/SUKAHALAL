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
              onClick={() => onNavigate('login-seller')} 
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>🏪</span> Masuk sebagai Penjual UMKM
            </button>
            <button 
              onClick={() => onNavigate('login-distributor')} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>🚚</span> Masuk sebagai Distributor Logistik
            </button>
            <button 
              onClick={() => onNavigate('login-customer')} 
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

  const renderSellerDashboard = () => (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <KPIWidget title={t('kpi.revenue', 'Pendapatan')} value="Rp 45.2M" trend={+12.5} />
        <KPIWidget title={t('kpi.orders', 'Pesanan')} value="156" trend={+5.2} />
        <KPIWidget title={t('kpi.products', 'Produk')} value="24" trend={0} />
        <KPIWidget title={t('kpi.certs', 'Sertifikat Valid')} value="24" trend={+2} />
        <KPIWidget title={t('kpi.stockAlerts', 'Peringatan Stok')} value="3" trend={-10} alert />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-gray-800 text-lg">Status Rantai Pasok Anda</h3>
             <button onClick={() => onNavigate('supply-chain')} className="text-green-600 text-sm font-medium hover:underline">Detail Rantai Pasok</button>
          </div>
          <div className="flex items-center justify-between mt-8 relative">
             <div className="absolute h-1 bg-gray-200 left-8 right-8 top-1/2 -translate-y-1/2 z-0"></div>
             {[
               { name: 'Supplier', icon: '🌾', status: 'green' },
               { name: 'Produsen', icon: '🏭', status: 'green' },
               { name: 'Pengemasan', icon: '📦', status: 'yellow' },
               { name: 'Distributor', icon: '🚚', status: 'green' },
               { name: 'Retailer', icon: '🏪', status: 'red' },
             ].map((node, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 z-10 bg-white px-2">
                   <div className="relative">
                      <div className="w-14 h-14 rounded-full border-2 border-gray-100 flex items-center justify-center text-2xl shadow-sm bg-white">
                        {node.icon}
                      </div>
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${node.status === 'green' ? 'bg-green-500' : node.status === 'yellow' ? 'bg-yellow-400' : 'bg-red-500'}`}></div>
                   </div>
                   <span className="text-xs font-medium text-gray-600">{node.name}</span>
                </div>
             ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <h3 className="font-bold text-gray-800 text-lg mb-4">Status Sertifikasi TLS</h3>
          <div className="flex-1 flex flex-col justify-center gap-4">
             <div className="flex items-center justify-between bg-green-50 px-4 py-3 rounded-xl border border-green-100">
                <div className="flex items-center gap-3">
                   <TrafficLightStatus status="green" />
                   <span className="font-medium text-green-800">Aktif & Valid</span>
                </div>
                <span className="font-bold text-green-800 text-xl">18</span>
             </div>
             <div className="flex items-center justify-between bg-yellow-50 px-4 py-3 rounded-xl border border-yellow-100">
                <div className="flex items-center gap-3">
                   <TrafficLightStatus status="yellow" />
                   <span className="font-medium text-yellow-800">Akan Expired</span>
                </div>
                <span className="font-bold text-yellow-800 text-xl">5</span>
             </div>
             <div className="flex items-center justify-between bg-red-50 px-4 py-3 rounded-xl border border-red-100">
                <div className="flex items-center gap-3">
                   <TrafficLightStatus status="red" />
                   <span className="font-medium text-red-800">Bermasalah</span>
                </div>
                <span className="font-bold text-red-800 text-xl">1</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Aksi Cepat</h3>
            <div className="grid grid-cols-2 gap-3">
               <button onClick={() => onNavigate('verification-center')} className="flex items-center justify-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-200 transition-colors text-gray-700 hover:text-green-700 font-medium">📄 Upload Dokumen</button>
               <button onClick={() => onNavigate('products')} className="flex items-center justify-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-200 transition-colors text-gray-700 hover:text-green-700 font-medium">➕ Tambah Produk</button>
               <button onClick={() => onNavigate('orders')} className="flex items-center justify-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-200 transition-colors text-gray-700 hover:text-green-700 font-medium">📋 Lihat Pesanan</button>
               <button onClick={() => onNavigate('campaigns')} className="flex items-center justify-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-200 transition-colors text-gray-700 hover:text-green-700 font-medium">📣 Buat Kampanye</button>
            </div>
         </div>
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Aktivitas Terbaru</h3>
            <div className="space-y-4">
               {[
                 { icon: '💰', text: 'Pesanan #INV-001 dari Supermarket A', time: '10 menit lalu', type: 'order' },
                 { icon: '📄', text: 'Dokumen Halal "Daging Sapi" disetujui BPJPH', time: '1 jam lalu', type: 'cert' },
                 { icon: '⚠️', text: 'Stok "Bumbu Rendang" hampir habis (Sisa: 5)', time: '3 jam lalu', type: 'alert' },
                 { icon: '🚚', text: 'Distributor mengambil pesanan #INV-002', time: '5 jam lalu', type: 'delivery' },
                 { icon: '⭐', text: 'Ulasan baru 5 bintang untuk produk Anda', time: '1 hari lalu', type: 'review' },
               ].map((act, i) => (
                 <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">{act.icon}</div>
                    <div>
                       <p className="text-sm text-gray-800 font-medium">{act.text}</p>
                       <p className="text-xs text-gray-500">{act.time}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );

  const renderDistributorDashboard = () => (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPIWidget title={t('kpi.deliveries', 'Pengiriman')} value="45" trend={+15} />
        <KPIWidget title={t('kpi.partners', 'Mitra UMKM')} value="12" trend={+1} />
        <KPIWidget title={t('kpi.coverage', 'Area (Kota)')} value="8" trend={0} />
        <KPIWidget title={t('kpi.certs', 'Sertifikat Armada')} value="5/5" trend={0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-6">Monitoring Pengiriman & IoT</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[1, 2].map(shipment => (
                  <div key={shipment} className="border border-blue-100 bg-blue-50/30 rounded-xl p-4 relative overflow-hidden">
                     <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg">Aktif</div>
                     <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">🚚</div>
                        <div>
                           <div className="font-bold text-gray-800 text-sm">Truk Pendingin #{shipment}04</div>
                           <div className="text-xs text-gray-500">Rute: Jakarta → Bandung</div>
                        </div>
                     </div>
                     <div className="grid grid-cols-3 gap-2 mt-4 bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                        <div className="text-center">
                           <div className="text-xs text-gray-500 mb-1">Suhu</div>
                           <div className="font-bold text-blue-700 flex items-center justify-center gap-1">22°C <span className="w-2 h-2 rounded-full bg-green-500"></span></div>
                        </div>
                        <div className="text-center border-x border-gray-100">
                           <div className="text-xs text-gray-500 mb-1">Kelembapan</div>
                           <div className="font-bold text-blue-700 flex items-center justify-center gap-1">65% <span className="w-2 h-2 rounded-full bg-green-500"></span></div>
                        </div>
                        <div className="text-center">
                           <div className="text-xs text-gray-500 mb-1">Segel</div>
                           <div className="font-bold text-blue-700 flex items-center justify-center gap-1">Aman <span className="w-2 h-2 rounded-full bg-green-500"></span></div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Aksi Cepat</h3>
            <div className="flex flex-col gap-3">
               <button onClick={() => onNavigate('supply-chain')} className="flex items-center justify-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors text-gray-700 hover:text-blue-700 font-medium">
                  <span className="text-xl">🔗</span> Kelola Rantai Pasok
               </button>
               <button onClick={() => onNavigate('orders')} className="flex items-center justify-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors text-gray-700 hover:text-blue-700 font-medium">
                  <span className="text-xl">📦</span> Lihat Pesanan Aktif
               </button>
               <button onClick={() => onNavigate('verification-center')} className="flex items-center justify-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors text-gray-700 hover:text-blue-700 font-medium">
                  <span className="text-xl">📄</span> Upload Dokumen Armada
               </button>
               <button onClick={() => onNavigate('reports')} className="flex items-center justify-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors text-gray-700 hover:text-blue-700 font-medium">
                  <span className="text-xl">📊</span> Laporan Distribusi
               </button>
            </div>
         </div>
      </div>
    </div>
  );

  const renderCustomerDashboard = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-white flex items-center justify-between shadow-sm">
         <div>
            <h2 className="text-3xl font-bold mb-2">Belanja Produk Halal Terpercaya</h2>
            <p className="text-violet-100 max-w-lg">Semua produk di SUKAHALAL telah terverifikasi kehalalannya melalui blockchain dan traceability terjamin dari hulu ke hilir.</p>
         </div>
         <div className="hidden md:flex bg-white/20 p-4 rounded-xl backdrop-blur-sm gap-4">
             <div className="text-center"><div className="text-2xl font-bold">100%</div><div className="text-xs text-violet-100">Halal Validated</div></div>
             <div className="w-px bg-white/30"></div>
             <div className="text-center"><div className="text-2xl font-bold">24h</div><div className="text-xs text-violet-100">Fast Delivery</div></div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div onClick={() => onNavigate('cart')} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-violet-300 transition-colors">
           <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xl">🛒</div>
           <div><div className="text-sm text-gray-500">Keranjang</div><div className="font-bold text-gray-800 text-lg">3 Item</div></div>
        </div>
        <div onClick={() => onNavigate('wishlist')} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-violet-300 transition-colors">
           <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xl">❤️</div>
           <div><div className="text-sm text-gray-500">Wishlist</div><div className="font-bold text-gray-800 text-lg">12 Produk</div></div>
        </div>
        <div onClick={() => onNavigate('history')} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-violet-300 transition-colors">
           <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">🕒</div>
           <div><div className="text-sm text-gray-500">Pesanan Selesai</div><div className="font-bold text-gray-800 text-lg">5 Kali</div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2">
            <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center justify-between">
               <span>🌟 Rekomendasi Untukmu</span>
               <button onClick={() => onNavigate('katalog')} className="text-violet-600 text-sm font-medium hover:underline">Lihat Semua</button>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                   <div className="h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-4xl">
                      {i === 1 ? '🥩' : i === 2 ? '🍗' : i === 3 ? '🍜' : '🍰'}
                   </div>
                   <div className="flex justify-between items-start mb-1">
                     <h4 className="font-medium text-sm text-gray-800 line-clamp-1">Produk Premium {i}</h4>
                   </div>
                   <div className="flex items-center gap-1 mb-2">
                      <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-bold border border-green-200">HALAL BPJPH</span>
                   </div>
                   <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-violet-600 text-sm">Rp {15 + i * 5}.000</span>
                      <button className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center hover:bg-violet-600 hover:text-white transition-colors">➕</button>
                   </div>
                 </div>
               ))}
            </div>
         </div>
         <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-gray-800 text-lg mb-4">Pesanan Terakhir</h3>
               <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                     <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">📦</div>
                     <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">INV-2023-08-12</div>
                        <div className="text-xs text-violet-600 font-medium">Sedang Dikirim</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                     <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">✅</div>
                     <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">INV-2023-08-01</div>
                        <div className="text-xs text-green-600 font-medium">Selesai</div>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="bg-amber-50 rounded-2xl shadow-sm border border-amber-200 p-6 flex items-start gap-4 cursor-pointer hover:bg-amber-100 transition-colors">
               <div className="text-3xl">📖</div>
               <div>
                  <h4 className="font-bold text-amber-900 mb-1">Pelajari rantai pasok halal</h4>
                  <p className="text-xs text-amber-700 mb-2">Pahami bagaimana kami memastikan kehalalan produk dari sumber hingga ke tangan Anda.</p>
                  <span className="text-amber-800 text-xs font-bold uppercase tracking-wider">Mulai Tutorial &rarr;</span>
               </div>
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
      </>
    );
  }

  const roleThemeColor = userRole === 'distributor' ? 'bg-blue-50' : userRole === 'customer' ? 'bg-violet-50' : 'bg-gray-50';

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar onNavigate={onNavigate} currentRoute="dashboard" userRole={userRole} />
      <div className={`flex-1 flex flex-col ${roleThemeColor}`}>
        <AppHeader 
           userRole={userRole} 
           onSetRole={onSetRole} 
           breadcrumbs={[{ label: t('breadcrumbs.dashboard', 'Dashboard') }]} 
        />
        <main className="flex-1 overflow-y-auto p-6">
          {userRole === 'seller' && renderSellerDashboard()}
          {userRole === 'distributor' && renderDistributorDashboard()}
          {userRole === 'customer' && renderCustomerDashboard()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
