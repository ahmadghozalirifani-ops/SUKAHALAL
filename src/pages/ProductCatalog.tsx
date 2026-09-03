import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import TrafficLightStatus from '../components/TrafficLightStatus';
import TraceabilityModal from '../components/TraceabilityModal';
import { REAL_PRODUCTS, HalalProduct } from '../data/mockData';

type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function ProductCatalog({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [showHalalOnly, setShowHalalOnly] = useState(false);
  const [selectedProductQR, setSelectedProductQR] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const primaryColor = 
    userRole === 'seller' ? 'bg-green-600 hover:bg-green-700' :
    userRole === 'distributor' ? 'bg-blue-600 hover:bg-blue-700' :
    userRole === 'customer' ? 'bg-violet-600 hover:bg-violet-700' : 'bg-green-600 hover:bg-green-700';

  const textColor = 
    userRole === 'seller' ? 'text-green-600' :
    userRole === 'distributor' ? 'text-blue-600' :
    userRole === 'customer' ? 'text-violet-600' : 'text-green-600';

  const categories = ['Semua', 'Makanan', 'Minuman', 'Bumbu', 'Dairy', 'Kosmetik', 'Suplemen'];

  const filteredProducts = REAL_PRODUCTS.filter(p => {
    if (selectedCategory !== 'Semua' && p.category !== selectedCategory) return false;
    if (showHalalOnly && !p.halalCert) return false;
    if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase()) && !p.supplier.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <AppSidebar onNavigate={onNavigate} userRole={userRole} currentPage="product-catalog" />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader 
          title="Katalog Produk Halal"
          breadcrumb="Dashboard > Katalog Produk"
          userRole={userRole} 
          onSetRole={onSetRole}
          onNavigate={onNavigate}
        />
        
        {/* KPI Mini-bar & Quick Navigation Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-3 shrink-0 flex flex-wrap gap-4 items-center justify-between z-10 shadow-xs">
          <div className="flex items-center space-x-6">
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Total Produk Terdaftar</span>
              <span className={`text-xl font-bold ${textColor}`}>{REAL_PRODUCTS.length} SKU</span>
            </div>
            <div className="h-7 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Tersertifikasi BPJPH</span>
              <span className="text-xl font-bold text-green-600">
                {Math.round((REAL_PRODUCTS.filter(p => p.halalCert).length / REAL_PRODUCTS.length) * 100)}%
              </span>
            </div>
            <div className="h-7 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Rata-rata Harga</span>
              <span className="text-xl font-bold text-slate-700">Rp 64.000</span>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('supplier-catalog')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>🏢</span> Katalog Supplier
            </button>
            <button 
              onClick={() => onNavigate('supply-chain')}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>🚚</span> Lacak Rantai Pasok
            </button>
            <button 
              onClick={() => onNavigate('cart')}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>🛒</span> Keranjang
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 shrink-0 space-y-4">
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between text-sm">
                <span>Filter & Pencarian</span>
                <span className="text-xs text-slate-400 font-normal">({filteredProducts.length} hasil)</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Cari Produk / Supplier</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Contoh: Rendang, Kopi, Susu..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-green-500 bg-slate-50/50"
                    />
                    <span className="absolute left-2.5 top-2.5 text-xs text-slate-400">🔍</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-2 block">Kategori Produk</label>
                  <div className="space-y-1">
                    {categories.map(c => (
                      <button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                          selectedCategory === c 
                            ? 'bg-green-600 text-white font-bold shadow-xs' 
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span>{c}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          selectedCategory === c ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {c === 'Semua' ? REAL_PRODUCTS.length : REAL_PRODUCTS.filter(p => p.category === c).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-green-50/50 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={showHalalOnly}
                      onChange={e => setShowHalalOnly(e.target.checked)}
                      className="w-4 h-4 rounded-sm text-green-600 focus:ring-green-500"
                    />
                    <span className="text-slate-700 text-xs font-medium">Hanya Sertifikasi BPJPH Valid</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Quick Helper Banner */}
            <div className="bg-gradient-to-br from-green-700 to-emerald-800 rounded-2xl p-4 text-white shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-200 mb-1">
                <span>🛡️</span> Verifikasi Otentik
              </div>
              <p className="text-xs text-green-100 leading-relaxed mb-3">
                Seluruh produk dengan tanda Halal Tayyiban telah diverifikasi dokumen SIHALAL BPJPH dan dapat dilacak rantai pasoknya.
              </p>
              <button 
                onClick={() => onNavigate('verification')} 
                className="w-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold py-1.5 rounded-lg border border-white/30 transition-colors"
              >
                Cek Pusat Verifikasi &rarr;
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg group"
                >
                  {/* Product Realistic Image with Overlay Badges */}
                  <div className="h-48 bg-slate-100 relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>
                    
                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-md border border-white/20">
                        {product.category}
                      </span>
                      {product.halalCert ? (
                        <div className="bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-emerald-400">
                          <span>✨</span> BPJPH Halal
                        </div>
                      ) : (
                        <div className="bg-amber-600/95 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                          <span>⏳</span> Audit Ulang
                        </div>
                      )}
                    </div>

                    {/* Bottom Image Info */}
                    <div className="absolute bottom-2 left-2.5 right-2.5 text-white flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-white/90">
                        EAN: {product.barcode}
                      </span>
                      <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded">
                        <span className="text-amber-300">★</span>
                        <span className="font-bold">{product.rating}</span>
                        <span className="text-[10px] text-white/80">({product.reviewsCount})</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1.5">
                      <h3 className="font-bold text-slate-800 text-sm leading-tight line-clamp-1 group-hover:text-green-700 transition-colors">
                        {product.name}
                      </h3>
                      <TrafficLightStatus status={product.stockStatus} size="sm" />
                    </div>
                    
                    {/* Supplier Link */}
                    <button 
                      onClick={() => onNavigate('supplier-profile')}
                      className="text-left text-xs text-slate-500 hover:text-green-700 mb-2 font-medium flex items-center gap-1 truncate hover:underline"
                    >
                      <span>🏢</span> <span className="truncate">{product.supplier}</span>
                    </button>

                    {/* Halal Cert Code */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2 mb-3 text-[11px] text-slate-600 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">No. Sertifikat:</span>
                        <span className="font-mono font-bold text-slate-700 truncate max-w-[130px]">{product.halalNumber}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Masa Berlaku:</span>
                        <span className="text-slate-700 font-medium">{product.halalValidUntil}</span>
                      </div>
                    </div>
                    
                    {/* Price & Action Buttons */}
                    <div className="mt-auto pt-2 border-t border-slate-100">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-xs text-slate-500">Harga:</span>
                        <span className="text-base font-extrabold text-slate-900">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      
                      {/* Navigation Action Buttons */}
                      <div className="grid grid-cols-3 gap-1.5">
                        <button 
                          onClick={() => onNavigate('product-detail')}
                          className="col-span-2 bg-slate-900 hover:bg-black text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <span>🔍</span> Detail & Lacak
                        </button>
                        <button 
                          onClick={() => {
                            showToast(`Berhasil menambahkan "${product.name}" ke keranjang!`);
                          }}
                          className={`${primaryColor} text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center transition-colors shadow-xs`}
                          title="Tambah ke Keranjang"
                        >
                          <span>🛒 +</span>
                        </button>
                      </div>

                      {/* Secondary Trace Link */}
                      <div className="mt-2 flex items-center justify-between text-[11px]">
                        <button 
                          onClick={() => setSelectedProductQR(product.id)}
                          className="text-slate-500 hover:text-slate-800 flex items-center gap-1 hover:underline"
                        >
                          <span>📱</span> QR Traceability
                        </button>
                        <button 
                          onClick={() => onNavigate('supply-chain')}
                          className="text-green-700 hover:underline font-semibold flex items-center gap-0.5"
                        >
                          Rantai Pasok &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <span>✅</span>
          <span className="text-xs font-medium">{toastMessage}</span>
          <button onClick={() => onNavigate('cart')} className="ml-2 text-xs font-bold text-green-400 hover:underline">
            Lihat Keranjang &rarr;
          </button>
        </div>
      )}

      {/* Traceability Modal */}
      <TraceabilityModal 
        isOpen={!!selectedProductQR} 
        onClose={() => setSelectedProductQR(null)} 
        productId={selectedProductQR || ''} 
      />
    </div>
  );
}
