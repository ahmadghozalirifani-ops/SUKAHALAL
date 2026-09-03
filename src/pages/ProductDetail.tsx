import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import TrafficLightStatus from '../components/TrafficLightStatus';
import TraceabilityModal from '../components/TraceabilityModal';
import { REAL_PRODUCTS } from '../data/mockData';

type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function ProductDetail({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'spesifikasi' | 'verifikasi' | 'rantai_pasok' | 'ulasan'>('spesifikasi');
  const [isTraceModalOpen, setIsTraceModalOpen] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLoved, setIsLoved] = useState(false);
  const [likesCount, setLikesCount] = useState(284);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Default featured product: Rendang Sapi Suwir Padang
  const product = REAL_PRODUCTS[0];

  const primaryColor = 
    userRole === 'seller' ? 'bg-emerald-600 hover:bg-emerald-700' :
    userRole === 'distributor' ? 'bg-blue-600 hover:bg-blue-700' :
    userRole === 'customer' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-emerald-600 hover:bg-emerald-700';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = () => {
    setCartSuccess(true);
    showToast(`🛒 Yey! ${quantity}x "${product.name}" masuk keranjang belanja!`);
    setTimeout(() => setCartSuccess(false), 2500);
  };

  const handleToggleLove = () => {
    if (isLoved) {
      setIsLoved(false);
      setLikesCount(prev => prev - 1);
      showToast('Dihapus dari favorit.');
    } else {
      setIsLoved(true);
      setLikesCount(prev => prev + 1);
      showToast('❤️ Kamu menyukai produk ini!');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    showToast(`🚀 Link "${product.name}" disalin! Kirim ke bestie kamu ✨`);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafcfb] font-sans text-slate-800">
      <AppSidebar onNavigate={onNavigate} userRole={userRole} currentPage="product-catalog" />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader 
          title="Detail Produk & Traceability"
          breadcrumb="Dashboard > Katalog Produk > Detail Produk"
          userRole={userRole} 
          onSetRole={onSetRole}
          onNavigate={onNavigate}
        />
        
        {/* Top Quick Navigation Bar */}
        <div className="bg-white border-b border-emerald-100/80 px-6 py-2.5 flex items-center justify-between shrink-0 shadow-2xs">
          <button 
            onClick={() => onNavigate('product-catalog')}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer border border-slate-200"
          >
            <span>←</span> Kembali ke Katalog
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('supplier-profile')}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-200"
            >
              <span>🏢</span> Profil Supplier
            </button>
            <button 
              onClick={() => onNavigate('supply-chain')}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-blue-200"
            >
              <span>🔗</span> Lacak di Rantai Pasok
            </button>
            <button 
              onClick={() => onNavigate('verification')}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-amber-200"
            >
              <span>🛡️</span> Cek BPJPH
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Hero Section */}
            <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col md:flex-row">
              {/* Product Photo */}
              <div className="md:w-5/12 bg-slate-100 h-80 md:h-auto relative overflow-hidden group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="bg-white/95 backdrop-blur-md text-emerald-800 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-300 shadow-md">
                    <span>✨</span> BPJPH Halal Tayyiban
                  </div>
                  <div className="bg-black/70 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-lg border border-white/20">
                    No: {product.halalNumber}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <button 
                    onClick={handleToggleLove}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      isLoved ? 'bg-red-500 text-white shadow-lg scale-105' : 'bg-black/50 text-white hover:bg-black/70'
                    }`}
                  >
                    <span>{isLoved ? '❤️' : '🤍'}</span>
                    <span>{likesCount} Disukai</span>
                  </button>

                  <button 
                    onClick={() => setIsTraceModalOpen(true)}
                    className="bg-white/95 hover:bg-white text-slate-800 px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-lg border border-slate-200 transition-all hover:scale-105 cursor-pointer"
                  >
                    <span>📱</span> Trace QR
                  </button>
                </div>
              </div>
              
              {/* Product Core Info */}
              <div className="p-8 md:w-7/12 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      {product.category} • Best Seller 🔥
                    </span>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 text-xs">
                      <TrafficLightStatus status={product.stockStatus} size="sm" />
                      <span className="font-bold text-slate-700">Stok: {product.stock} unit</span>
                    </div>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 leading-tight">
                    {product.name}
                  </h1>
                  
                  {/* Supplier Link & Rating */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
                    <button 
                      onClick={() => onNavigate('supplier-profile')}
                      className="flex items-center gap-1 font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      <span>🏢</span> {product.supplier}
                    </button>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      ★ {product.rating} <span className="text-slate-400 font-normal">({product.reviewsCount} Ulasan)</span>
                    </span>
                    <span>•</span>
                    <span className="font-mono text-slate-400">EAN: {product.barcode}</span>
                  </div>
                  
                  <div className="text-3xl font-black text-slate-900 mb-4 flex items-baseline gap-2">
                    Rp {product.price.toLocaleString('id-ID')}
                    <span className="text-xs font-normal text-slate-400">/ bungkus ({product.netWeight})</span>
                  </div>
                  
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Quantity & Interactive Controls */}
                  <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 w-fit">
                    <span className="text-xs font-bold text-slate-600">Jumlah:</span>
                    <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-xl border border-slate-200 shadow-2xs">
                      <button 
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-black text-slate-900 w-4 text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">
                      Subtotal: Rp {(product.price * quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => onNavigate('cart')}
                      className={`flex-1 ${primaryColor} text-white px-6 py-3 rounded-2xl font-black text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer`}
                    >
                      <span>⚡</span> Beli Sekarang
                    </button>
                    <button 
                      onClick={handleAddToCart}
                      className="flex-1 bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>🛒</span> {cartSuccess ? '✓ Ditambahkan!' : 'Tambah ke Keranjang'}
                    </button>
                    <button
                      onClick={handleShare}
                      className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs transition-colors cursor-pointer"
                      title="Share ke Bestie"
                    >
                      <span>📤 Share</span>
                    </button>
                  </div>

                  {/* Connected Navigation Shortcuts */}
                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                    <button 
                      onClick={() => onNavigate('supply-chain')}
                      className="hover:text-blue-700 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>🚚</span> Pantau Truk Cold Chain IoT
                    </button>
                    <button 
                      onClick={() => onNavigate('verification')}
                      className="hover:text-emerald-700 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>📄</span> Dokumen Audit BPJPH &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Gen-Z Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-2xs flex items-center gap-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <span className="text-xs font-black text-slate-900 block">100% Bebas Najis</span>
                  <span className="text-[10px] text-slate-500">Daging halal bersertifikat NKV</span>
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-2xs flex items-center gap-3">
                <span className="text-2xl">❄️</span>
                <div>
                  <span className="text-xs font-black text-slate-900 block">Cold-Chain Guard</span>
                  <span className="text-[10px] text-slate-500">Suhu beku -18°C terjaga</span>
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-2xs flex items-center gap-3">
                <span className="text-2xl">🥘</span>
                <div>
                  <span className="text-xs font-black text-slate-900 block">Retort Steril 121°C</span>
                  <span className="text-[10px] text-slate-500">Tahan 12 bulan tanpa pengawet</span>
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-2xs flex items-center gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <span className="text-xs font-black text-slate-900 block">Garansi Syariat</span>
                  <span className="text-[10px] text-slate-500">BPJPH Kemenag Valid</span>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
              <div className="flex border-b border-slate-200 overflow-x-auto">
                {[
                  { id: 'spesifikasi', label: 'Spesifikasi & Komposisi', icon: '📋' },
                  { id: 'verifikasi', label: 'Verifikasi BPJPH & Audit', icon: '🛡️' },
                  { id: 'rantai_pasok', label: 'Alur Rantai Pasok Terhubung', icon: '🔗' },
                  { id: 'ulasan', label: 'Ulasan Gen-Z Foodies', icon: '⭐' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-b-2 border-emerald-600 text-emerald-700 bg-emerald-50/50'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Tab 1: Spesifikasi */}
                {activeTab === 'spesifikasi' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-extrabold uppercase text-slate-400 mb-3">Komposisi Bahan Baku Halal</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.ingredients.map((ing, i) => (
                          <span key={i} className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-xl font-medium border border-slate-200">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 block font-semibold">Masa Simpan</span>
                        <span className="text-xs font-bold text-slate-800">{product.shelfLife}</span>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 block font-semibold">Metode Penyimpanan</span>
                        <span className="text-xs font-bold text-slate-800">{product.storageMethod}</span>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 block font-semibold">Proses Sterilisasi</span>
                        <span className="text-xs font-bold text-slate-800">{product.processStandard}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Verifikasi BPJPH */}
                {activeTab === 'verifikasi' && (
                  <div className="space-y-6">
                    <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-white px-2 py-0.5 rounded-md">
                          Terdaftar di SIHALAL
                        </span>
                        <p className="text-sm font-extrabold text-emerald-950">
                          Nomor Registrasi: {product.halalNumber}
                        </p>
                        <p className="text-xs text-emerald-700">
                          Masa Berlaku hingga: {product.halalValidUntil} (Status: Aktif)
                        </p>
                      </div>
                      <button 
                        onClick={() => onNavigate('verification')}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
                      >
                        Buka Pusat Verifikasi &rarr;
                      </button>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-slate-800 text-xs mb-3">Audit Trail Kehalalan Produk (SJPH)</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Tahap 1</span>
                          <p className="font-bold text-slate-800 text-xs mt-1">Pengajuan Berkas</p>
                          <p className="text-[11px] text-slate-500">12 Juni 2023</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Tahap 2</span>
                          <p className="font-bold text-slate-800 text-xs mt-1">Pemeriksaan LPH</p>
                          <p className="text-[11px] text-slate-500">LPPOM MUI Jabar</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Tahap 3</span>
                          <p className="font-bold text-slate-800 text-xs mt-1">Sidang Fatwa MUI</p>
                          <p className="text-[11px] text-slate-500">Ketetapan Halal Sah</p>
                        </div>
                        <div className="p-3 bg-emerald-100/60 rounded-xl border border-emerald-300">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase">Tahap 4</span>
                          <p className="font-bold text-emerald-900 text-xs mt-1">Sertifikat Terbit</p>
                          <p className="text-[11px] text-emerald-700">Oleh BPJPH Kemenag</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Rantai Pasok */}
                {activeTab === 'rantai_pasok' && (
                  <div className="space-y-6">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Rantai pasok produk ini diawasi secara digital mulai dari Rumah Potong Hewan (RPH), sterilisasi retort, hingga armada distributor berpendingin bersensor IoT.
                    </p>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl">
                          🚚
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-xs">Armada Pengiriman Terhubung</p>
                          <p className="text-xs text-slate-500">Truk Refrigerator PT Pos Logistik Halal Cold Chain (B 9482 PXZ)</p>
                          <p className="text-[11px] text-emerald-600 font-semibold">Suhu Sensor IoT: -18.4°C • Segel RFID: Aman</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => onNavigate('supply-chain')}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
                      >
                        Lihat Visualisasi Rantai Pasok &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 4: Ulasan */}
                {activeTab === 'ulasan' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl font-black text-slate-900">4.9</div>
                      <div>
                        <div className="text-amber-400 text-sm">★★★★★</div>
                        <p className="text-xs text-slate-500">Berdasarkan 342 ulasan pembeli terverifikasi</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { user: 'Nadya Putri (@nadyakuliner - Jaksel)', text: 'Rendangnya beneran melted di mulut! Bumbunya medok dan pouch retort-nya praktis banget tinggal rendem air panas di kosan.', rating: 5, date: '1 hari lalu' },
                        { user: 'Fajar Nugraha (Foodie Bandung)', text: 'Pas scan QR tembus ke database BPJPH SiHalal beneran! Mantap banget transparansinya, gak was-was sama sekali.', rating: 5, date: '3 hari lalu' },
                        { user: 'Resto Minang Berkah (@minangberkah)', text: 'Pesan 50 pack untuk stok resto, kemasan steril higienis dan dagingnya empuk konsisten.', rating: 5, date: '1 minggu lalu' },
                      ].map((rev, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{rev.user}</span>
                            <span className="text-slate-400 text-[10px]">{rev.date}</span>
                          </div>
                          <div className="text-amber-400 text-[11px]">★★★★★</div>
                          <p className="text-slate-600">{rev.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/50 animate-bounce">
          <span className="text-emerald-400 font-bold">✨</span>
          <span className="text-xs font-bold">{toastMessage}</span>
          <button onClick={() => onNavigate('cart')} className="ml-2 text-xs font-black text-emerald-400 hover:underline cursor-pointer">
            Buka Keranjang &rarr;
          </button>
        </div>
      )}

      {/* Traceability Modal */}
      <TraceabilityModal 
        isOpen={isTraceModalOpen} 
        onClose={() => setIsTraceModalOpen(false)} 
        productId={product.id} 
      />
    </div>
  );
}
