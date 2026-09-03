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

  // Default featured product: Rendang Sapi Suwir Padang
  const product = REAL_PRODUCTS[0];

  const primaryColor = 
    userRole === 'seller' ? 'bg-green-600 hover:bg-green-700' :
    userRole === 'distributor' ? 'bg-blue-600 hover:bg-blue-700' :
    userRole === 'customer' ? 'bg-violet-600 hover:bg-violet-700' : 'bg-green-600 hover:bg-green-700';

  const handleAddToCart = () => {
    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 2500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
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
        <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between shrink-0 shadow-2xs">
          <button 
            onClick={() => onNavigate('product-catalog')}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-green-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <span>←</span> Kembali ke Katalog Produk
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('supplier-profile')}
              className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>🏢</span> Profil Supplier
            </button>
            <button 
              onClick={() => onNavigate('supply-chain')}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>🔗</span> Lacak di Rantai Pasok
            </button>
            <button 
              onClick={() => onNavigate('verification')}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>🛡️</span> Cek BPJPH
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Hero Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden flex flex-col md:flex-row">
              {/* Product Photo */}
              <div className="md:w-5/12 bg-slate-100 h-80 md:h-auto relative overflow-hidden group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="bg-white/95 backdrop-blur-md text-emerald-800 text-xs font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-emerald-300 shadow-md">
                    <span>✨</span> BPJPH Halal Tayyiban
                  </div>
                  <div className="bg-black/70 backdrop-blur-md text-white text-[11px] font-mono px-2.5 py-1 rounded-lg border border-white/20">
                    No: {product.halalNumber}
                  </div>
                </div>

                <button 
                  onClick={() => setIsTraceModalOpen(true)}
                  className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg border border-slate-200 transition-all hover:scale-105"
                >
                  <span>📱</span> Traceability QR
                </button>
              </div>
              
              {/* Product Core Info */}
              <div className="p-8 md:w-7/12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-md border border-green-200">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 text-xs">
                      <TrafficLightStatus status={product.stockStatus} size="sm" />
                      <span className="font-semibold text-slate-700">Stok: {product.stock} unit</span>
                    </div>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 leading-tight">
                    {product.name}
                  </h1>
                  
                  {/* Supplier Link */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
                    <button 
                      onClick={() => onNavigate('supplier-profile')}
                      className="flex items-center gap-1 font-semibold text-slate-700 hover:text-green-700 hover:underline"
                    >
                      <span>🏢</span> {product.supplier}
                    </button>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      ★ {product.rating} <span className="text-slate-400 font-normal">({product.reviewsCount} Ulasan)</span>
                    </span>
                    <span>•</span>
                    <span className="font-mono text-slate-400">Barcode: {product.barcode}</span>
                  </div>
                  
                  <div className="text-3xl font-black text-slate-900 mb-4 flex items-baseline gap-2">
                    Rp {product.price.toLocaleString('id-ID')}
                    <span className="text-xs font-normal text-slate-500">/ bungkus ({product.netWeight})</span>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => onNavigate('cart')}
                      className={`flex-1 ${primaryColor} text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2`}
                    >
                      <span>⚡</span> Beli Sekarang
                    </button>
                    <button 
                      onClick={handleAddToCart}
                      className="flex-1 bg-white border-2 border-slate-300 hover:border-green-600 hover:text-green-700 text-slate-800 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <span>🛒</span> {cartSuccess ? 'Ditambahkan!' : 'Tambah ke Keranjang'}
                    </button>
                  </div>

                  {/* Connected Navigation Shortcuts */}
                  <div className="flex items-center justify-between text-xs pt-1 text-slate-500">
                    <button 
                      onClick={() => onNavigate('supply-chain')}
                      className="hover:text-blue-700 font-semibold flex items-center gap-1 hover:underline"
                    >
                      <span>🚚</span> Pantau Pengiriman Cold Chain
                    </button>
                    <button 
                      onClick={() => onNavigate('verification')}
                      className="hover:text-green-700 font-semibold flex items-center gap-1 hover:underline"
                    >
                      <span>📄</span> Dokumen Audit Halal BPJPH &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
              <div className="flex border-b border-slate-200 overflow-x-auto">
                {[
                  { id: 'spesifikasi', label: 'Spesifikasi & Komposisi', icon: '📋' },
                  { id: 'verifikasi', label: 'Verifikasi BPJPH & Sertifikat', icon: '🛡️' },
                  { id: 'rantai_pasok', label: 'Alur Rantai Pasok Terhubung', icon: '🔗' },
                  { id: 'ulasan', label: 'Ulasan Pembeli', icon: '⭐' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 py-4 px-6 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                      activeTab === tab.id 
                        ? `border-b-2 border-green-600 text-green-700 bg-green-50/50` 
                        : `text-slate-500 hover:bg-slate-50 hover:text-slate-800`
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="p-8">
                {/* Tab 1: Spesifikasi */}
                {activeTab === 'spesifikasi' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Kandungan & Bahan</h4>
                        <div className="text-xs space-y-3">
                          <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="text-slate-500">Komposisi Bahan:</span>
                            <span className="font-medium text-slate-800 text-right max-w-xs">{product.ingredients}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="text-slate-500">Sumber Daging:</span>
                            <span className="font-medium text-slate-800">RPH Modern Ber-NKV & Juleha BNSP</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="text-slate-500">Masa Simpan:</span>
                            <span className="font-medium text-slate-800">{product.shelfLife}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Standar Pengolahan & Legalitas</h4>
                        <div className="text-xs space-y-3">
                          <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="text-slate-500">Berat Bersih:</span>
                            <span className="font-medium text-slate-800">{product.netWeight}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="text-slate-500">Metode Sterilisasi:</span>
                            <span className="font-medium text-slate-800">{product.processStandard}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="text-slate-500">Status Kehalalan:</span>
                            <span className="font-bold text-green-700 flex items-center gap-1">
                              ✅ 100% Halal Terverifikasi
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Tab 2: Verifikasi BPJPH */}
                {activeTab === 'verifikasi' && (
                  <div className="space-y-8">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm mb-1">
                          <span>✅</span> SERTIFIKAT RESMI BPJPH (KEMENTERIAN AGAMA RI)
                        </div>
                        <p className="text-xs text-emerald-700 font-mono">
                          Nomor Registrasi: <strong>{product.halalNumber}</strong> • Berlaku s/d: <strong>{product.halalValidUntil}</strong>
                        </p>
                      </div>
                      <button 
                        onClick={() => onNavigate('verification')}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors shrink-0"
                      >
                        Buka Pusat Verifikasi &rarr;
                      </button>
                    </div>

                    {/* Timeline Audit */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-800 text-sm">Kronologi Penerbitan Sertifikasi (SJPH Audit Trail)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-green-700 uppercase">Tahap 1</span>
                          <p className="font-bold text-slate-800 text-xs mt-1">Pengajuan Dokumen</p>
                          <p className="text-[11px] text-slate-500">12 Agustus 2023 via SIHALAL</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-green-700 uppercase">Tahap 2</span>
                          <p className="font-bold text-slate-800 text-xs mt-1">Audit Lapangan LP3H</p>
                          <p className="text-[11px] text-slate-500">14 Agustus 2023 (Skor: 98%)</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-green-700 uppercase">Tahap 3</span>
                          <p className="font-bold text-slate-800 text-xs mt-1">Sidang Fatwa MUI</p>
                          <p className="text-[11px] text-slate-500">18 Agustus 2023 (Status: Halal)</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                          <span className="text-[10px] font-bold text-green-700 uppercase">Tahap 4</span>
                          <p className="font-bold text-green-900 text-xs mt-1">Sertifikat Terbit</p>
                          <p className="text-[11px] text-green-700">20 Agustus 2023 oleh BPJPH</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Rantai Pasok */}
                {activeTab === 'rantai_pasok' && (
                  <div className="space-y-6">
                    <p className="text-xs text-slate-600">
                      Rantai pasok produk ini diawasi secara end-to-end mulai dari Rumah Potong Hewan (RPH), pengolahan bumbu, sterilisasi retort, hingga armada distributor berpendingin.
                    </p>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
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
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
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
                      <div className="text-3xl font-extrabold text-slate-900">4.9</div>
                      <div>
                        <div className="text-amber-400 text-sm">★★★★★</div>
                        <p className="text-xs text-slate-500">Berdasarkan 342 ulasan pembeli terverifikasi</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { user: 'Hj. Mardiah (Jakarta)', text: 'Rendangnya sangat empuk, bumbunya medok dan yang terpenting tenang karena sertifikat BPJPH-nya valid pas di-scan!', rating: 5, date: '2 hari lalu' },
                        { user: 'Resto Minang Berkah (Bandung)', text: 'Beli grosir untuk bahan baku resto, kemasan retort sangat higienis dan awet.', rating: 5, date: '1 minggu lalu' },
                      ].map((rev, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-800">{rev.user}</span>
                            <span className="text-slate-400 text-[11px]">{rev.date}</span>
                          </div>
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

      {/* Traceability Modal */}
      <TraceabilityModal 
        isOpen={isTraceModalOpen} 
        onClose={() => setIsTraceModalOpen(false)} 
        productId={product.id} 
      />
    </div>
  );
}
