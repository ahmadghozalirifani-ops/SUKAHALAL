import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import TrafficLightStatus from '../components/TrafficLightStatus';
import TraceabilityModal from '../components/TraceabilityModal';

type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

const MOCK_PRODUCTS = [
  { id: '1', name: 'Rendang Sapi Premium', category: 'Makanan', price: 75000, supplier: 'Bunda Halal Foods', rating: 4.8, halalCert: true, stockStatus: 'green', emoji: '🍛', stock: 120 },
  { id: '2', name: 'Sirup Marjan Melon', category: 'Minuman', price: 22000, supplier: 'PT Berkah Minuman', rating: 4.5, halalCert: true, stockStatus: 'green', emoji: '🥤', stock: 500 },
  { id: '3', name: 'Bumbu Nasi Goreng', category: 'Bumbu', price: 5000, supplier: 'Rasa Nusantara', rating: 4.9, halalCert: true, stockStatus: 'green', emoji: '🧂', stock: 300 },
  { id: '4', name: 'Krim Wajah Alami', category: 'Kosmetik', price: 150000, supplier: 'Halal Beauty', rating: 4.7, halalCert: true, stockStatus: 'yellow', emoji: '🧴', stock: 50 },
  { id: '5', name: 'Vitamin C 1000mg', category: 'Suplemen', price: 45000, supplier: 'Sehat Sentosa', rating: 4.6, halalCert: true, stockStatus: 'green', emoji: '💊', stock: 200 },
  { id: '6', name: 'Keripik Tempe Pedas', category: 'Makanan', price: 15000, supplier: 'Bunda Halal Foods', rating: 4.3, halalCert: false, stockStatus: 'red', emoji: '🍘', stock: 0 },
  { id: '7', name: 'Kopi Arabica Gayo', category: 'Minuman', price: 85000, supplier: 'Kopi Barokah', rating: 4.9, halalCert: true, stockStatus: 'green', emoji: '☕', stock: 80 },
  { id: '8', name: 'Kecap Manis Pedas', category: 'Bumbu', price: 12000, supplier: 'Rasa Nusantara', rating: 4.4, halalCert: true, stockStatus: 'yellow', emoji: '🍯', stock: 20 },
  { id: '9', name: 'Sabun Mandi Susu', category: 'Kosmetik', price: 25000, supplier: 'Halal Beauty', rating: 4.5, halalCert: true, stockStatus: 'green', emoji: '🧼', stock: 150 },
  { id: '10', name: 'Madu Hutan Asli', category: 'Suplemen', price: 120000, supplier: 'Sehat Sentosa', rating: 4.8, halalCert: true, stockStatus: 'green', emoji: '🍯', stock: 45 },
  { id: '11', name: 'Mie Instan Goreng', category: 'Makanan', price: 3500, supplier: 'PT Berkah Minuman', rating: 4.6, halalCert: true, stockStatus: 'green', emoji: '🍜', stock: 1000 },
  { id: '12', name: 'Teh Hijau Celup', category: 'Minuman', price: 18000, supplier: 'Kopi Barokah', rating: 4.2, halalCert: true, stockStatus: 'yellow', emoji: '🍵', stock: 35 },
];

export default function ProductCatalog({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showHalalOnly, setShowHalalOnly] = useState(false);
  const [selectedProductQR, setSelectedProductQR] = useState<string | null>(null);

  const primaryColor = 
    userRole === 'seller' ? 'bg-green-600' :
    userRole === 'distributor' ? 'bg-blue-600' :
    userRole === 'customer' ? 'bg-violet-600' : 'bg-green-600';

  const textColor = 
    userRole === 'seller' ? 'text-green-600' :
    userRole === 'distributor' ? 'text-blue-600' :
    userRole === 'customer' ? 'text-violet-600' : 'text-green-600';

  const categories = ['All', 'Makanan', 'Minuman', 'Bumbu', 'Kosmetik', 'Suplemen'];

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (showHalalOnly && !p.halalCert) return false;
    if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <AppSidebar onNavigate={onNavigate} userRole={userRole} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader 
          title="Katalog Produk"
          breadcrumb="Dashboard > Katalog Produk"
          userRole={userRole} 
          onSetRole={onSetRole} 
        />
        
        {/* KPI Mini-bar */}
        <div className="bg-white border-b border-slate-200 p-4 shrink-0 flex flex-wrap gap-4 items-center justify-between z-10 shadow-sm relative">
          <div className="flex space-x-6">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase font-semibold">{t('Total Products')}</span>
              <span className={`text-xl font-bold ${textColor}`}>{MOCK_PRODUCTS.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase font-semibold">{t('In Cart')}</span>
              <span className="text-xl font-bold text-slate-700">12</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase font-semibold">{t('Halal Certified')}</span>
              <span className="text-xl font-bold text-green-600">92%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase font-semibold">{t('Avg Price')}</span>
              <span className="text-xl font-bold text-slate-700">Rp 48.000</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">{t('Search & Filter')}</h3>
              
              <div className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder={t('Search products...')}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">{t('Category')}</label>
                  <div className="space-y-2">
                    {categories.map(c => (
                      <label key={c} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="category"
                          checked={selectedCategory === c}
                          onChange={() => setSelectedCategory(c)}
                          className="text-green-600 focus:ring-green-500"
                        />
                        <span className="text-slate-600 text-sm">{t(c)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={showHalalOnly}
                      onChange={e => setShowHalalOnly(e.target.checked)}
                      className="rounded text-green-600 focus:ring-green-500"
                    />
                    <span className="text-slate-700 text-sm font-medium">{t('Halal Certified Only')}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md">
                  <div className="h-48 bg-slate-100 flex items-center justify-center text-6xl relative">
                    {product.emoji}
                    {product.halalCert && (
                      <div className="absolute top-3 right-3 bg-white p-1 rounded-full shadow-sm">
                        <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-green-200">
                          ✨ Halal Tayyiban
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-800 text-lg leading-tight">{product.name}</h3>
                      <TrafficLightStatus status={product.stockStatus as any} size="sm" />
                    </div>
                    
                    <p className="text-sm text-slate-500 mb-3">{product.supplier}</p>
                    
                    <div className="flex items-center space-x-1 mb-4">
                      <span className="text-amber-400 text-sm">★</span>
                      <span className="text-sm font-medium text-slate-700">{product.rating}</span>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="text-xl font-bold text-slate-900 mb-4">
                        Rp {product.price.toLocaleString('id-ID')}
                      </div>
                      
                      <div className="flex gap-2">
                        {(userRole === 'seller' || userRole === 'distributor') ? (
                          <>
                            <button className={`flex-1 ${primaryColor} text-white py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity`}>
                              {t('Edit')} ({product.stock})
                            </button>
                            <button 
                              onClick={() => setSelectedProductQR(product.id)}
                              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                              title={t('Traceability QR')}
                            >
                              🔍
                            </button>
                          </>
                        ) : (
                          <>
                            <button className={`flex-1 ${primaryColor} text-white py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity`}>
                              {t('Tambah ke Keranjang')}
                            </button>
                            <button 
                              onClick={() => onNavigate('ProductDetail')}
                              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors"
                            >
                              {t('Detail')}
                            </button>
                            <button 
                              onClick={() => setSelectedProductQR(product.id)}
                              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                              title={t('Traceability QR')}
                            >
                              🔍
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <button className="px-6 py-2 bg-white border border-slate-300 rounded-full text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm">
                {t('Muat Lebih Banyak')}
              </button>
            </div>
          </div>
        </div>
      </main>

      <TraceabilityModal 
        isOpen={!!selectedProductQR} 
        onClose={() => setSelectedProductQR(null)} 
        productId={selectedProductQR || ''} 
      />
    </div>
  );
}
