import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import KPIWidget from '../components/KPIWidget';
import TrafficLightStatus from '../components/TrafficLightStatus';
import { REAL_PRODUCTS } from '../data/mockData';

type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

const mockInventory = [
  { id: 1, name: 'Rendang Sapi Suwir Padang Retort', sku: 'RND-001', supplier: 'PT Bunda Halal Foods', category: 'Makanan Siap Saji', stock: 145, minStock: 30, status: 'good', halalCert: 'ID32110000123450223' },
  { id: 2, name: 'Kopi Arabika Gayo Single Origin 250g', sku: 'KOP-001', supplier: 'Koperasi Kopi Barokah', category: 'Minuman', stock: 80, minStock: 25, status: 'good', halalCert: 'ID11210000876540122' },
  { id: 3, name: 'Madu Hutan Sumbawa Murni 500ml', sku: 'MDH-001', supplier: 'CV Alam Lestari', category: 'Suplemen', stock: 65, minStock: 30, status: 'good', halalCert: 'ID52010000432190922' },
  { id: 4, name: 'Susu Pasteurisasi Lembang Murni 1L', sku: 'SSU-001', supplier: 'KPBS Pangalengan', category: 'Dairy (Cold Chain)', stock: 35, minStock: 40, status: 'warning', halalCert: 'ID32040000998810623' },
  { id: 5, name: 'Keripik Tempe Sagu Oven Gurih', sku: 'KRP-001', supplier: 'PT Bunda Halal Foods', category: 'Cemilan', stock: 0, minStock: 50, status: 'danger', halalCert: 'Proses Audit BPJPH' },
];

export default function Inventaris({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [inventory, setInventory] = useState(mockInventory);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <AppSidebar onNavigate={onNavigate} userRole={userRole} currentPage="inventaris" />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader 
          onNavigate={onNavigate} 
          userRole={userRole} 
          onSetRole={onSetRole}
          breadcrumbs={[{ label: t('breadcrumbs.dashboard', 'Dashboard'), page: 'dashboard' }, { label: t('breadcrumbs.inventory', 'Inventaris') }]}
        />
        
        {/* Navigation Action Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <span>←</span> Dashboard
            </button>
            <span className="text-xs text-slate-400 font-bold">|</span>
            <span className="text-xs font-bold text-slate-700">Manajemen Inventaris & Stok Halal</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('supplier-catalog')}
              className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>🛒</span> Pesan Restok ke Supplier
            </button>
            <button 
              onClick={() => onNavigate('supply-chain')}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>🚚</span> Lacak Pengiriman Cold Chain
            </button>
            <button 
              onClick={() => onNavigate('product-catalog')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>📦</span> Katalog Produk
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full space-y-6">
          {/* KPI Mini-bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPIWidget title="Total SKU Terdata" value="128" trend="+4" status="neutral" />
            <KPIWidget title="Stok Siap Jual" value="105" trend="Aman" status="good" />
            <KPIWidget title="Peringatan Menipis" value="18" trend="Perlu Order" status="warning" />
            <KPIWidget title="Stok Kosong / Audit" value="5" trend="Kritis" status="danger" />
          </div>

          {/* Restock Alerts Banner with Direct Action */}
          <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-bold text-amber-900 text-sm">Peringatan Restok Bahan Baku Diperlukan</h3>
                <p className="text-xs text-amber-700 mt-0.5">
                  Terdapat 2 produk dengan stok di bawah batas minimal atau habis. Anda dapat langsung memesan kuota pasokan ke supplier resmi bersertifikat BPJPH.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="bg-white text-red-700 px-2 py-0.5 rounded-md text-[11px] border border-red-200 font-bold">
                    Keripik Tempe (0/50 unit)
                  </span>
                  <span className="bg-white text-amber-700 px-2 py-0.5 rounded-md text-[11px] border border-amber-200 font-bold">
                    Susu Pasteurisasi (35/40 unit)
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('supplier-catalog')}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>🛒</span> Buka Katalog Supplier &rarr;
            </button>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-3xl shadow-xs border border-gray-200/80 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h2 className="text-base font-bold text-gray-900">Daftar Inventaris Produk & Bahan Baku Halal</h2>
                <p className="text-xs text-gray-500">Terintegrasi dengan status sertifikasi SIHALAL dan barcode EAN-13</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
                >
                  <span>+</span> Tambah Item Stok
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Nama Produk / SKU</th>
                    <th className="py-3 px-4 font-semibold">Supplier Mitra</th>
                    <th className="py-3 px-4 font-semibold">Kategori</th>
                    <th className="py-3 px-4 font-semibold">Sertifikasi BPJPH</th>
                    <th className="py-3 px-4 font-semibold text-center">Stok / Min</th>
                    <th className="py-3 px-4 font-semibold text-center">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inventory.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-4 font-bold text-gray-900">
                        {item.name}
                        <span className="block font-mono text-[10px] text-gray-400 font-normal">SKU: {item.sku}</span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 font-medium">
                        <button 
                          onClick={() => onNavigate('supplier-profile')}
                          className="hover:text-green-700 hover:underline flex items-center gap-1"
                        >
                          <span>🏢</span> {item.supplier}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">{item.category}</td>
                      <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold">{item.halalCert}</td>
                      <td className="py-3.5 px-4 text-center font-semibold">
                        {item.stock} <span className="text-gray-400 font-normal">/ {item.minStock}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'good' ? 'bg-emerald-100 text-emerald-800' :
                          item.status === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status === 'good' ? 'Tercukupi' : item.status === 'warning' ? 'Menipis' : 'Habis'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => onNavigate('supplier-catalog')}
                            className="bg-green-50 hover:bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg text-[11px] transition-colors"
                          >
                            Pesan Restok
                          </button>
                          <button 
                            onClick={() => onNavigate('supply-chain')}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-2 py-1 rounded-lg text-[11px]"
                            title="Lacak Distribusi"
                          >
                            🚚
                          </button>
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

      {/* Add Stock Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-sm">Tambah Item Inventaris Baru</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Nama Produk / Bahan</label>
                <input type="text" placeholder="Contoh: Bumbu Rendang Pasta" className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-hidden" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Kode SKU</label>
                  <input type="text" placeholder="BMB-002" className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-hidden" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Stok Awal</label>
                  <input type="number" defaultValue="100" className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-hidden" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Supplier Mitra</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-hidden bg-white">
                  <option>PT Bunda Halal Foods Nusantara</option>
                  <option>PT Malindo RPH Modern</option>
                  <option>KPBS Pangalengan Dairy Hub</option>
                  <option>Koperasi Kopi Barokah Takengon</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => {
                  alert('Item inventaris baru berhasil didaftarkan!');
                  setShowAddModal(false);
                }}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-xl font-bold text-xs"
              >
                Simpan Item
              </button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold">Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
