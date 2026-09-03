import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';

type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

interface PageProps {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

const mockSuppliers = [
  { id: 1, name: 'PT Berkah Agro', region: 'Jawa Barat', categories: 'Bahan Baku, Sayuran', verified: true, omax: 87, rating: 4.8, reviews: 120, products: 45, status: 'Aktif', avatar: '🌾' },
  { id: 2, name: 'CV Makmur Jaya', region: 'Jawa Tengah', categories: 'Rempah, Bumbu', verified: true, omax: 92, rating: 4.9, reviews: 205, products: 80, status: 'Aktif', avatar: '🌿' },
  { id: 3, name: 'Segar Farm', region: 'Jawa Timur', categories: 'Daging, Unggas', verified: true, omax: 78, rating: 4.5, reviews: 88, products: 15, status: 'Aktif', avatar: '🥩' },
  { id: 4, name: 'Nusantara Supply', region: 'DKI Jakarta', categories: 'Bahan Jadi, Kemasan', verified: false, omax: 65, rating: 4.2, reviews: 40, products: 200, status: 'Aktif', avatar: '📦' },
  { id: 5, name: 'Bumi Organik', region: 'Jawa Barat', categories: 'Bahan Baku, Sayuran', verified: true, omax: 95, rating: 4.7, reviews: 150, products: 30, status: 'Aktif', avatar: '🥬' },
  { id: 6, name: 'Sari Laut Indo', region: 'Bali', categories: 'Seafood', verified: false, omax: 60, rating: 4.1, reviews: 25, products: 10, status: 'Tidak Aktif', avatar: '🐟' },
  { id: 7, name: 'Halal Beef Co.', region: 'Jawa Barat', categories: 'Daging', verified: true, omax: 98, rating: 5.0, reviews: 310, products: 22, status: 'Aktif', avatar: '🐄' },
  { id: 8, name: 'Maju Rempah', region: 'Sumatera Barat', categories: 'Rempah', verified: true, omax: 85, rating: 4.6, reviews: 75, products: 40, status: 'Aktif', avatar: '🌶️' },
];

export default function SupplierCatalog({ onNavigate, userRole, onSetRole }: PageProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('Semua');
  const [filterSertifikasi, setFilterSertifikasi] = useState('Semua');

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AppSidebar onNavigate={onNavigate} userRole={userRole} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <AppHeader onNavigate={onNavigate} userRole={userRole} onSetRole={onSetRole} />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t('Katalog Supplier')}</h1>
              <p className="text-sm text-gray-500">Dashboard &gt; {t('Katalog Supplier')}</p>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-full">🏢</div>
                <div>
                  <p className="text-xs text-gray-500">{t('Total Supplier')}</p>
                  <p className="font-bold">243</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="p-2 bg-green-50 text-green-600 rounded-full">✅</div>
                <div>
                  <p className="text-xs text-gray-500">{t('Terverifikasi BPJPH')}</p>
                  <p className="font-bold">187</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-full">📍</div>
                <div>
                  <p className="text-xs text-gray-500">{t('Region Tersedia')}</p>
                  <p className="font-bold">28</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="p-2 bg-yellow-50 text-yellow-600 rounded-full">⭐</div>
                <div>
                  <p className="text-xs text-gray-500">{t('Rata-rata Rating')}</p>
                  <p className="font-bold">4.6</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-500 mb-1">{t('Cari')}</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                <input 
                  type="text" 
                  placeholder={t('Nama, produk, atau kategori...')} 
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('Region')}</label>
              <select 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
              >
                <option value="Semua">{t('Semua Region')}</option>
                <option value="Jawa Barat">Jawa Barat</option>
                <option value="Jawa Tengah">Jawa Tengah</option>
                <option value="Jawa Timur">Jawa Timur</option>
                <option value="DKI Jakarta">DKI Jakarta</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('Sertifikasi')}</label>
              <select 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={filterSertifikasi}
                onChange={(e) => setFilterSertifikasi(e.target.value)}
              >
                <option value="Semua">{t('Semua')}</option>
                <option value="BPJPH">BPJPH</option>
                <option value="MUI">MUI</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('Urutkan')}</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>{t('Rating Tertinggi')}</option>
                <option>{t('Skor OMAX')}</option>
                <option>{t('Nama A-Z')}</option>
                <option>{t('Terbaru')}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSuppliers.map(supplier => (
              <div key={supplier.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                        {supplier.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 flex items-center gap-1">
                          {supplier.name}
                          {supplier.verified && <span className="text-green-500 text-sm" title="Terverifikasi BPJPH">✅</span>}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1">📍 {supplier.region}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${supplier.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {supplier.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">{t('Kategori Produk')}</p>
                    <p className="text-sm font-medium text-gray-700">{supplier.categories}</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">{t('OMAX Compliance Score')}</span>
                      <span className="font-bold text-green-600">{supplier.omax}/100</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`h-2 rounded-full ${supplier.omax >= 80 ? 'bg-green-500' : supplier.omax >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${supplier.omax}%` }}></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span> {supplier.rating} ({supplier.reviews})
                    </div>
                    <div>
                      📦 {supplier.products} {t('Produk')}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => onNavigate('SupplierProfile')}
                      className="flex-1 py-2 border border-green-600 text-green-600 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors"
                    >
                      {t('Lihat Profil')}
                    </button>
                    <button className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                      {t('Hubungi')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
