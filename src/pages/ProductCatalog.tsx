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
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const primaryColor = 
    userRole === 'seller' ? 'bg-emerald-600 hover:bg-emerald-700' :
    userRole === 'distributor' ? 'bg-blue-600 hover:bg-blue-700' :
    userRole === 'customer' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-emerald-600 hover:bg-emerald-700';

  const textColor = 
    userRole === 'seller' ? 'text-emerald-600' :
    userRole === 'distributor' ? 'text-blue-600' :
    userRole === 'customer' ? 'text-purple-600' : 'text-emerald-600';

  const categories = [
    { label: 'Semua', icon: '✨' },
    { label: 'Makanan', icon: '🍛' },
    { label: 'Minuman', icon: '☕' },
    { label: 'Bumbu', icon: '🌶️' },
    { label: 'Dairy', icon: '🥛' },
    { label: 'Kosmetik', icon: '🧴' },
    { label: 'Suplemen', icon: '🌿' },
  ];

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

  const toggleWishlist = (id: string, name: string) => {
    setWishlist(prev => {
      const next = !prev[id];
      if (next) {
        showToast(`❤️ "${name}" ditambahkan ke favoritmu!`);
      } else {
        showToast(`Dihapus dari favorit.`);
      }
      return { ...prev, [id]: next };
    });
  };

  const handleShare = (name: string) => {
    navigator.clipboard?.writeText?.(window.location.href);
    showToast(`🚀 Link "${name}" berhasil disalin! Bagikan ke bestie kamu ✨`);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafcfb] font-sans text-slate-800">
      <AppSidebar onNavigate={onNavigate} userRole={userRole} currentPage="product-catalog" />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader 
          title="Katalog Produk Halal"
          breadcrumb="Dashboard > Katalog Produk"
          userRole={userRole} 
          onSetRole={onSetRole}
          onNavigate={onNavigate}
        />
        
        {/* KPI Mini-bar & Cheerful Quick Navigation Bar */}
        <div className="bg-white border-b border-emerald-100/80 px-6 py-3 shrink-0 flex flex-wrap gap-4 items-center justify-between z-10 shadow-2xs">
          <div className="flex items-center space-x-6">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Total Produk</span>
              <span className={`text-xl font-black ${textColor}`}>{REAL_PRODUCTS.length} SKU</span>
            </div>
            <div className="h-7 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Sertifikasi BPJPH</span>
              <span className="text-xl font-black text-emerald-600 flex items-center gap-1">
                <span>100%</span> <span className="text-xs">✓</span>
              </span>
            </div>
            <div className="h-7 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Rating Komunitas</span>
              <span className="text-xl font-black text-amber-500 flex items-center gap-1">
                <span>★ 4.9</span> <span className="text-[11px] text-slate-400 font-normal">/ 5.0</span>
              </span>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('supplier-catalog')}
              className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-200"
            >
              <span>🏢</span> Katalog Supplier
            </button>
            <button 
              onClick={() => onNavigate('supply-chain')}
              className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-blue-200"
            >
              <span>🚚</span> Lacak Rantai Pasok
            </button>
            <button 
              onClick={() => onNavigate('cart')}
              className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-amber-200"
            >
              <span>🛒</span> Keranjang
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar with Cheerful Styling */}
          <div className="w-full lg:w-64 shrink-0 space-y-4">
            <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/80">
              <h3 className="font-extrabold text-slate-900 mb-4 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <span>🔍</span> Filter & Cari
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  {filteredProducts.length} Produk
                </span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1.5 block">Kata Kunci</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Cari rendang, kopi, susu..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden bg-slate-50 focus:bg-white transition-colors"
                    />
                    <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔎</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 mb-2 block">Pilih Kategori Halal</label>
                  <div className="space-y-1">
                    {categories.map(cat => (
                      <button
                        key={cat.label}
                        onClick={() => setSelectedCategory(cat.label)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                          selectedCategory === cat.label 
                            ? 'bg-emerald-600 text-white shadow-sm font-bold' 
                            : 'hover:bg-emerald-50/70 text-slate-600'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          <span>{cat.label}</span>
                        </span>
                        <span className={`text-[10px] ${selectedCategory === cat.label ? 'text-white' : 'text-slate-400'}`}>
                          {cat.label === 'Semua' ? REAL_PRODUCTS.length : REAL_PRODUCTS.filter(p => p.category === cat.label).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <label className="flex items-center gap-2 cursor-pointer select-none bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                    <input 
                      type="checkbox" 
                      checked={showHalalOnly}
                      onChange={(e) => setShowHalalOnly(e.target.checked)}
                      className="w-4 h-4 rounded-sm text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-emerald-900 text-xs font-extrabold">Hanya BPJPH Aktif ✓</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Gen-Z Cheerful Community Widget */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 rounded-3xl p-5 text-white shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-200">
                <span>🌟</span> Gen-Z Halal Club
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                Setiap pembelianmu mendukung peternak & UMKM lokal Indonesia yang amanah dan bersertifikat resmi.
              </p>
              <button 
                onClick={() => onNavigate('tutorial')} 
                className="w-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-2 rounded-xl border border-white/30 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>📖</span> Pelajari SJPH & Mitos Halal
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 space-y-4">
            {/* Top Cheerful Banner */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🛍️</span>
                <div>
                  <h2 className="text-sm font-black text-slate-900">Jajanan & Produk Halal Hits Nusantara</h2>
                  <p className="text-xs text-slate-500">100% transparan dari peternak sampai ke meja makanmu</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md border border-emerald-200">
                  🔥 Viral di Skena Halal
                </span>
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-200">
                  ❄️ Cold Chain Ready
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300 group"
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
                      <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border border-white/20">
                        {product.category}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {/* Wishlist Love Button */}
                        <button
                          onClick={() => toggleWishlist(product.id, product.name)}
                          className={`w-7 h-7 rounded-full backdrop-blur-md flex items-center justify-center text-xs transition-transform active:scale-125 cursor-pointer ${
                            wishlist[product.id] ? 'bg-red-500 text-white shadow-md' : 'bg-black/40 hover:bg-black/60 text-white'
                          }`}
                          title="Simpan ke Favorit"
                        >
                          {wishlist[product.id] ? '❤️' : '🤍'}
                        </button>

                        {/* BPJPH Badge */}
                        {product.halalCert ? (
                          <div className="bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-emerald-400">
                            <span>✓</span> BPJPH
                          </div>
                        ) : (
                          <div className="bg-amber-600/95 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                            <span>⏳</span> Audit
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Image Info */}
                    <div className="absolute bottom-2 left-2.5 right-2.5 text-white flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] bg-black/40 px-2 py-0.5 rounded-md text-white/90">
                        EAN: {product.barcode}
                      </span>
                      <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md">
                        <span className="text-amber-300">★</span>
                        <span className="font-bold">{product.rating}</span>
                        <span className="text-[10px] text-white/80">({product.reviewsCount})</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-black text-slate-900 text-sm leading-snug line-clamp-1 group-hover:text-emerald-700 transition-colors">
                          {product.name}
                        </h3>
                        <TrafficLightStatus status={product.stockStatus} size="sm" />
                      </div>
                      
                      {/* Supplier Link */}
                      <button 
                        onClick={() => onNavigate('supplier-profile')}
                        className="text-left text-xs text-slate-500 hover:text-emerald-700 mb-2 font-semibold flex items-center gap-1 truncate hover:underline cursor-pointer"
                      >
                        <span>🏢</span> <span className="truncate">{product.supplier}</span>
                      </button>

                      {/* Halal Cert Code */}
                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 text-[11px] text-slate-600 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">No. Sertifikat:</span>
                          <span className="font-mono font-bold text-emerald-800 truncate max-w-[130px]">{product.halalNumber}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Masa Berlaku:</span>
                          <span className="text-slate-700 font-medium">{product.halalValidUntil}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price & Action Buttons */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-xs text-slate-400 font-medium">Harga Resmi:</span>
                        <span className="text-base font-black text-slate-900">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      
                      {/* Navigation Action Buttons */}
                      <div className="grid grid-cols-4 gap-1.5">
                        <button 
                          onClick={() => onNavigate('product-detail')}
                          className="col-span-2 bg-slate-900 hover:bg-black text-white py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-colors shadow-xs cursor-pointer"
                        >
                          <span>🔍</span> Detail
                        </button>
                        
                        <button 
                          onClick={() => {
                            showToast(`Yey! "${product.name}" masuk keranjang belanja 🛒✨`);
                          }}
                          className={`${primaryColor} text-white py-2 rounded-xl text-xs font-black flex items-center justify-center transition-colors shadow-xs cursor-pointer`}
                          title="Tambah ke Keranjang"
                        >
                          <span>🛒 +</span>
                        </button>

                        <button 
                          onClick={() => handleShare(product.name)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                          title="Bagikan Link Produk"
                        >
                          <span>📤</span>
                        </button>
                      </div>

                      {/* Secondary Trace Link */}
                      <div className="mt-2.5 flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                        <button 
                          onClick={() => setSelectedProductQR(product.id)}
                          className="text-slate-500 hover:text-emerald-700 flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <span>📱</span> QR Traceability
                        </button>
                        <button 
                          onClick={() => onNavigate('supply-chain')}
                          className="text-emerald-700 hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/50 animate-bounce">
          <span className="text-emerald-400 font-bold">✨</span>
          <span className="text-xs font-bold">{toastMessage}</span>
          <button onClick={() => onNavigate('cart')} className="ml-2 text-xs font-black text-emerald-400 hover:underline">
            Buka Keranjang &rarr;
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
