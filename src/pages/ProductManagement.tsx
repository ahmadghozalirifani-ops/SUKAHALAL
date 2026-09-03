import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import TrafficLightStatus from '../components/TrafficLightStatus';

type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function ProductManagement({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (userRole !== 'seller') {
    return (
      <div className="flex h-screen overflow-hidden" style={{ background: '#FAFAF8' }}>
        <AppSidebar onNavigate={onNavigate} userRole={userRole} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Akses Ditolak</h2>
            <p className="text-slate-600">Hanya seller yang dapat mengakses halaman ini.</p>
            <button onClick={() => onNavigate('Dashboard')} className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg font-medium">Kembali ke Dashboard</button>
          </div>
        </main>
      </div>
    );
  }

  const [products, setProducts] = useState([
    { id: '1', name: 'Rendang Sapi Premium', category: 'Makanan', price: 75000, stock: 120, status: 'green', emoji: '🍛' },
    { id: '2', name: 'Krim Wajah Alami', category: 'Kosmetik', price: 150000, stock: 50, status: 'yellow', emoji: '🧴' },
    { id: '3', name: 'Keripik Tempe Pedas', category: 'Makanan', price: 15000, stock: 0, status: 'red', emoji: '🍘' },
    { id: '4', name: 'Madu Hutan Asli', category: 'Suplemen', price: 120000, stock: 45, status: 'green', emoji: '🍯' },
    { id: '5', name: 'Bumbu Nasi Goreng', category: 'Bumbu', price: 5000, stock: 300, status: 'green', emoji: '🧂' },
    { id: '6', name: 'Sabun Mandi Susu', category: 'Kosmetik', price: 25000, stock: 150, status: 'green', emoji: '🧼' },
    { id: '7', name: 'Kopi Arabica Gayo', category: 'Minuman', price: 85000, stock: 80, status: 'green', emoji: '☕' },
    { id: '8', name: 'Kecap Manis Pedas', category: 'Bumbu', price: 12000, stock: 20, status: 'yellow', emoji: '🍯' },
  ]);

  const handleDelete = () => {
    if (deleteId) {
      setProducts(products.filter(p => p.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#FAFAF8' }}>
      <AppSidebar onNavigate={onNavigate} userRole={userRole} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader 
          title="Kelola Produk"
          breadcrumb="Dashboard > Kelola Produk"
          userRole={userRole} 
          onSetRole={onSetRole} 
          onNavigate={onNavigate}
        />
        
        {/* KPI Mini-bar */}
        <div className="bg-white border-b border-slate-200 p-4 shrink-0 flex flex-wrap gap-4 items-center justify-between z-10 shadow-sm relative">
          <div className="flex space-x-6">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase font-semibold">{t('Total Produk')}</span>
              <span className="text-xl font-bold text-slate-800">{products.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase font-semibold">{t('Listing Aktif')}</span>
              <span className="text-xl font-bold text-green-600">{products.filter(p => p.status === 'green').length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase font-semibold">{t('Menunggu Verifikasi')}</span>
              <span className="text-xl font-bold text-amber-500">{products.filter(p => p.status === 'yellow').length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase font-semibold">{t('Nilai Stok (Estimasi)')}</span>
              <span className="text-xl font-bold text-slate-700">Rp 12.5M</span>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium shadow-sm hover:bg-green-700 transition-colors"
          >
            + {t('Tambah Produk Baru')}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                    <th className="p-4">{t('Foto')}</th>
                    <th className="p-4">{t('Nama Produk')}</th>
                    <th className="p-4">{t('Kategori')}</th>
                    <th className="p-4">{t('Harga')}</th>
                    <th className="p-4">{t('Stok')}</th>
                    <th className="p-4">{t('Status Sertifikat')}</th>
                    <th className="p-4">{t('Aksi')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl border border-slate-200">
                          {product.emoji}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-slate-800">{product.name}</td>
                      <td className="p-4 text-slate-600">{product.category}</td>
                      <td className="p-4 font-medium text-slate-800">Rp {product.price.toLocaleString('id-ID')}</td>
                      <td className="p-4 text-slate-600">{product.stock}</td>
                      <td className="p-4">
                        <TrafficLightStatus status={product.status as any} size="sm" />
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => setIsModalOpen(true)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">✏️</button>
                          <button onClick={() => setDeleteId(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Tambah/Edit Produk */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">{t('Tambah Produk Baru')}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">&times;</button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">{t('Nama Produk')}</label>
                  <input type="text" className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="Contoh: Rendang Sapi" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">{t('Kategori')}</label>
                  <select className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none bg-white">
                    <option>Makanan</option>
                    <option>Minuman</option>
                    <option>Bumbu</option>
                    <option>Kosmetik</option>
                    <option>Suplemen</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">{t('Harga (Rp)')}</label>
                  <input type="number" className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">{t('Stok')}</label>
                  <input type="number" className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" placeholder="0" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">{t('Deskripsi')}</label>
                <textarea rows={3} className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Jelaskan produk Anda..."></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="text-3xl mb-2">📸</div>
                  <div className="text-sm font-semibold text-slate-700">{t('Upload Foto Produk')}</div>
                  <div className="text-xs text-slate-500">Drag & drop atau klik</div>
                </div>
                
                <div className="border-2 border-dashed border-green-300 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
                  <div className="text-3xl mb-2">📜</div>
                  <div className="text-sm font-semibold text-green-700">{t('Lampirkan Sertifikat Halal')}</div>
                  <div className="text-xs text-green-600">PDF, JPG, PNG</div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-800">{t('Informasi Tambahan (Opsional)')}</h4>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">{t('Komposisi/Bahan')}</label>
                  <textarea rows={2} className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Pisahkan dengan koma..."></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">{t('Asal Bahan')}</label>
                    <input type="text" className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">{t('Masa Simpan')}</label>
                    <input type="text" className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">{t('Nomor BPJPH')}</label>
                    <input type="text" className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg font-medium hover:bg-slate-50">Batal</button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">Simpan Produk</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden p-6 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{t('Hapus Produk?')}</h3>
            <p className="text-slate-600 mb-6">Tindakan ini tidak dapat dibatalkan. Produk akan dihapus dari katalog.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg font-medium hover:bg-slate-50">Batal</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
