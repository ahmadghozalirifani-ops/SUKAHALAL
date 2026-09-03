import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import { REAL_SUPPLIERS, HalalSupplier } from '../data/mockData';

type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

interface PageProps {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function SupplierCatalog({ onNavigate, userRole, onSetRole }: PageProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('Semua');
  const [contactModalSupplier, setContactModalSupplier] = useState<HalalSupplier | null>(null);

  const filteredSuppliers = REAL_SUPPLIERS.filter(s => {
    if (filterRegion !== 'Semua' && s.region !== filterRegion) return false;
    if (searchTerm && !s.name.toLowerCase().includes(searchTerm.toLowerCase()) && !s.categories.toLowerCase().includes(searchTerm.toLowerCase()) && !s.city.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const regions = ['Semua', 'Jawa Barat', 'Aceh', 'D.I. Yogyakarta', 'Nusa Tenggara Barat'];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#FAFAF8' }}>
      <AppSidebar onNavigate={onNavigate} userRole={userRole} currentPage="supplier-catalog" />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <AppHeader onNavigate={onNavigate} userRole={userRole} onSetRole={onSetRole} />
        
        {/* Navigation & Header Strip */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 shrink-0 flex flex-wrap gap-4 items-center justify-between shadow-2xs">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Katalog Supplier Bahan Baku Halal</h1>
            <p className="text-xs text-gray-500">Direktori Produsen & Supplier Bahan Baku Terverifikasi BPJPH & Ber-NKV</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <span>←</span> Dashboard
            </button>
            <button 
              onClick={() => onNavigate('product-catalog')}
              className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>📦</span> Katalog Produk
            </button>
            <button 
              onClick={() => onNavigate('supply-chain')}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>🚚</span> Rantai Pasok
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {/* KPI Mini-bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl">🏢</div>
              <div>
                <p className="text-[11px] text-gray-500 font-medium">Total Supplier Mitra</p>
                <p className="text-lg font-extrabold text-gray-800">{REAL_SUPPLIERS.length} Terdaftar</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl">✅</div>
              <div>
                <p className="text-[11px] text-gray-500 font-medium">Lolos Verifikasi BPJPH</p>
                <p className="text-lg font-extrabold text-emerald-600">100% Valid</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl">📍</div>
              <div>
                <p className="text-[11px] text-gray-500 font-medium">Wilayah Sebaran</p>
                <p className="text-lg font-extrabold text-gray-800">4 Provinsi</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl">⭐</div>
              <div>
                <p className="text-[11px] text-gray-500 font-medium">Rata-rata OMAX Score</p>
                <p className="text-lg font-extrabold text-amber-600">93.3%</p>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 mb-6 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 min-w-[240px] relative">
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
              <input 
                type="text" 
                placeholder="Cari nama supplier, kota, atau jenis bahan baku..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-green-500 outline-hidden bg-gray-50/50"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">Wilayah:</span>
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => setFilterRegion(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    filterRegion === r 
                      ? 'bg-green-700 text-white font-bold' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Supplier Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map(supplier => (
              <div 
                key={supplier.id}
                className="bg-white rounded-3xl shadow-xs border border-gray-200/80 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-md transition-all group"
              >
                {/* Banner & Avatar */}
                <div className="h-36 relative overflow-hidden bg-slate-100">
                  <img 
                    src={supplier.image} 
                    alt={supplier.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400">
                      ✅ BPJPH Verified
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/20">
                      NIB: {supplier.nib}
                    </span>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{supplier.avatar}</span>
                      <div>
                        <p className="text-xs font-bold leading-tight line-clamp-1">{supplier.name}</p>
                        <p className="text-[10px] text-white/80">📍 {supplier.city}, {supplier.region}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase block text-emerald-300 font-semibold">OMAX Score</span>
                      <span className="text-base font-extrabold text-white">{supplier.omax}%</span>
                    </div>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold text-gray-700">Kategori:</span> {supplier.categories}
                    </div>

                    <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-[11px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Penyelia Halal:</span>
                        <span className="font-medium text-gray-800 truncate max-w-[170px]">{supplier.halalSupervisor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">No. Sertifikat:</span>
                        <span className="font-mono text-gray-800 font-bold truncate max-w-[170px]">{supplier.halalCertNumber}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {supplier.description}
                    </p>
                  </div>

                  {/* Navigation Buttons on Card */}
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => onNavigate('supplier-profile')}
                        className="bg-slate-900 hover:bg-black text-white py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>👤</span> Profil Detail
                      </button>
                      <button 
                        onClick={() => setContactModalSupplier(supplier)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-xs"
                      >
                        <span>💬</span> Hubungi B2B
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <button 
                        onClick={() => onNavigate('product-catalog')}
                        className="text-green-700 font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>📦</span> {supplier.productsCount} Produk Terkait &rarr;
                      </button>
                      <button 
                        onClick={() => onNavigate('supply-chain')}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Lacak Rantai Pasok
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Interactive Contact Supplier Modal */}
      {contactModalSupplier && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{contactModalSupplier.avatar}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{contactModalSupplier.name}</h3>
                  <p className="text-[11px] text-gray-500">Kontak Resmi Kemitraan Halal</p>
                </div>
              </div>
              <button 
                onClick={() => setContactModalSupplier(null)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">WhatsApp / Telepon:</span>
                <span className="font-bold text-emerald-700">{contactModalSupplier.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email Kemitraan:</span>
                <span className="font-mono text-gray-700">{contactModalSupplier.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Penyelia Halal:</span>
                <span className="font-medium text-gray-800">{contactModalSupplier.halalSupervisor}</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 leading-tight">
              Anda dapat terhubung langsung dengan tim penyelia halal dan manajemen supply chain untuk negosiasi kuota bahan baku dan pengiriman berpendingin.
            </p>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => {
                  alert(`Membuka WhatsApp ke nomor ${contactModalSupplier.phone}...`);
                  setContactModalSupplier(null);
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>💬</span> Chat via WhatsApp
              </button>
              <button 
                onClick={() => setContactModalSupplier(null)}
                className="px-4 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
