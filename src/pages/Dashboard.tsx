import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';
import LanguageToggle from '../components/LanguageToggle';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import KPIWidget from '../components/KPIWidget';
import TrafficLightStatus, { type TLSStatus } from '../components/TrafficLightStatus';

export type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

export interface PageProps {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

const Dashboard: React.FC<PageProps> = ({ onNavigate, userRole, onSetRole }) => {
  const { t } = useTranslation();

  const renderGuestDashboard = () => (
    <div className="w-full min-h-screen bg-white">
      {/* Top Header for Guest */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-30 px-6 py-3 flex items-center justify-between shadow-xs">
        <Logo size="md" onClick={() => onNavigate('landing')} />
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button onClick={() => onNavigate('landing')} className="text-xs text-gray-500 hover:text-gray-700 font-medium">← Beranda</button>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 py-20 px-6 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">{t('dashboard.welcomeGuest', 'Selamat Datang di SUKAHALAL')}</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
          {t('dashboard.subtitle', 'Platform Ekosistem Halal B2B2C untuk UMKM Indonesia')}
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => onSetRole('seller')} className="bg-white text-green-700 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors shadow-sm">{t('login.seller', 'Login UMKM')}</button>
          <button onClick={() => onSetRole('distributor')} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">{t('login.distributor', 'Login Distributor')}</button>
          <button onClick={() => onSetRole('customer')} className="bg-violet-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-violet-700 transition-colors shadow-sm">{t('login.customer', 'Login Pembeli')}</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Halal Education */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">📖 {t('education.title', 'Edukasi Halal')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100 shadow-sm">
              <h3 className="font-semibold text-green-800 mb-2">Apa itu Halal?</h3>
              <p className="text-sm text-gray-600">Standar produk yang sesuai dengan syariat Islam, terjamin kebersihan dan keamanannya.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm">
              <h3 className="font-semibold text-blue-800 mb-2">Rantai Pasok</h3>
              <p className="text-sm text-gray-600">Proses end-to-end dari hulu ke hilir untuk memastikan produk tetap halal.</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100 shadow-sm">
              <h3 className="font-semibold text-purple-800 mb-2">Peran BPJPH</h3>
              <p className="text-sm text-gray-600">Badan Penyelenggara Jaminan Produk Halal di Indonesia untuk sertifikasi.</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 shadow-sm">
              <h3 className="font-semibold text-orange-800 mb-2">Cara Verifikasi</h3>
              <p className="text-sm text-gray-600">Gunakan scan QR code kami untuk melacak keaslian sertifikat dan histori produk.</p>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">🛍️ {t('products.featured', 'Produk Unggulan')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-3xl">🍲</div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm text-gray-800 line-clamp-1">Produk {i}</h4>
                  <span className="bg-green-100 text-green-700 text-xs px-1.5 py-0.5 rounded font-medium border border-green-200">HALAL</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">UMKM {i}</p>
                <div className="font-semibold text-green-600 text-sm">Rp 25.000</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
             <button onClick={() => onNavigate('katalog')} className="text-green-600 font-medium hover:underline">{t('products.browseAll', 'Lihat Semua Produk &rarr;')}</button>
          </div>
        </section>

        {/* Supply Chain Animation */}
        <section className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-8">{t('supplyChain.flow', 'Transparansi Rantai Pasok')}</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-medium">
             <div className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-white border-2 border-green-500 flex items-center justify-center text-xl shadow-sm mb-2 z-10 relative">🌾</div><span>Supplier</span></div>
             <div className="h-1 w-12 bg-green-300 md:block hidden"></div>
             <div className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-white border-2 border-green-500 flex items-center justify-center text-xl shadow-sm mb-2 z-10 relative">🏭</div><span>Produsen</span></div>
             <div className="h-1 w-12 bg-green-300 md:block hidden"></div>
             <div className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-white border-2 border-green-500 flex items-center justify-center text-xl shadow-sm mb-2 z-10 relative">📦</div><span>Pengemasan</span></div>
             <div className="h-1 w-12 bg-green-300 md:block hidden"></div>
             <div className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-white border-2 border-green-500 flex items-center justify-center text-xl shadow-sm mb-2 z-10 relative">🚚</div><span>Distributor</span></div>
             <div className="h-1 w-12 bg-green-300 md:block hidden"></div>
             <div className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-white border-2 border-green-500 flex items-center justify-center text-xl shadow-sm mb-2 z-10 relative">🏪</div><span>Retailer</span></div>
          </div>
        </section>
        
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-100 pt-8">
            <div className="text-center"><div className="text-3xl font-bold text-gray-800 mb-1">5K+</div><div className="text-sm text-gray-500">UMKM Terdaftar</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-gray-800 mb-1">20K+</div><div className="text-sm text-gray-500">Produk Halal</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-gray-800 mb-1">100%</div><div className="text-sm text-gray-500">Terverifikasi</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-gray-800 mb-1">2M+</div><div className="text-sm text-gray-500">Pelanggan Aktif</div></div>
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
    return renderGuestDashboard();
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
