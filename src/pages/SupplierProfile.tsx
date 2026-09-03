import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import { REAL_SUPPLIERS, REAL_PRODUCTS } from '../data/mockData';

type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

interface PageProps {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function SupplierProfile({ onNavigate, userRole, onSetRole }: PageProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('Ringkasan');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showDocPreview, setShowDocPreview] = useState<string | null>(null);

  // Default featured supplier: PT Bunda Halal Foods Nusantara
  const supplier = REAL_SUPPLIERS[0];
  const supplierProducts = REAL_PRODUCTS.filter(p => p.supplierId === supplier.id);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AppSidebar onNavigate={onNavigate} userRole={userRole} currentPage="supplier-catalog" />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <AppHeader onNavigate={onNavigate} userRole={userRole} onSetRole={onSetRole} />
        
        {/* Navigation Breadcrumb Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center justify-between shrink-0 shadow-2xs">
          <button 
            onClick={() => onNavigate('supplier-catalog')}
            className="flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-green-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <span>←</span> Kembali ke Katalog Supplier
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('product-catalog')}
              className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>📦</span> Produk Supplier ({supplierProducts.length})
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
              <span>🛡️</span> Cek Status BPJPH
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* Hero Header Card */}
            <div className="bg-white rounded-3xl shadow-xs border border-gray-200/80 overflow-hidden">
              <div className="h-44 relative bg-slate-800 overflow-hidden">
                <img 
                  src={supplier.image} 
                  alt={supplier.name} 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white text-xs font-mono">
                  NIB: {supplier.nib}
                </div>
              </div>

              <div className="px-8 pb-6 relative">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 -mt-14 mb-4">
                  <div className="flex items-end gap-4">
                    <div className="w-24 h-24 bg-white rounded-3xl p-2 shadow-xl border-2 border-gray-100 flex items-center justify-center text-4xl">
                      {supplier.avatar}
                    </div>
                    <div>
                      <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                        {supplier.name}
                        <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full border border-emerald-300 font-bold">
                          ✅ BPJPH Verified
                        </span>
                      </h1>
                      <p className="text-xs text-gray-500 font-medium">
                        📍 {supplier.address} • Berdiri Sejak {supplier.establishedYear}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions & OMAX Score */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-center px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                      <span className="text-xl font-extrabold text-emerald-800">{supplier.omax}%</span>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase">OMAX Score</p>
                    </div>

                    <button 
                      onClick={() => setShowContactDialog(true)}
                      className="px-4 py-2.5 border border-gray-300 text-gray-800 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>💬</span> Hubungi Supplier
                    </button>

                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>🤝</span> Gabung Rantai Pasok
                    </button>
                  </div>
                </div>

                {/* Key Badges Bar */}
                <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-600">
                  <div>
                    <span className="text-gray-400">Penyelia Halal:</span> <strong className="text-gray-800">{supplier.halalSupervisor}</strong>
                  </div>
                  <span>•</span>
                  <div>
                    <span className="text-gray-400">No. Sertifikat BPJPH:</span> <strong className="font-mono text-emerald-700">{supplier.halalCertNumber}</strong>
                  </div>
                  <span>•</span>
                  <div>
                    <span className="text-gray-400">Rating:</span> <strong className="text-amber-500">★ {supplier.rating} ({supplier.reviews} Mitra B2B)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Bar */}
            <div className="bg-white rounded-3xl shadow-xs border border-gray-200/80 overflow-hidden">
              <div className="flex border-b border-gray-100">
                {['Ringkasan', 'Katalog Produk', 'Dokumen & Sertifikasi', 'Audit Halal'].map(tab => (
                  <button
                    key={tab}
                    className={`px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                      activeTab === tab 
                        ? 'border-green-600 text-green-700 bg-green-50/50' 
                        : 'border-transparent text-gray-500 hover:text-gray-800'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="p-8">
                {/* Tab 1: Ringkasan */}
                {activeTab === 'Ringkasan' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2">Profil & Kapasitas Produksi</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {supplier.description}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3">Penerapan Sistem Jaminan Produk Halal (SJPH Kemenag)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div className="border border-green-200 bg-green-50/40 rounded-2xl p-4 space-y-2">
                            <h4 className="font-bold text-green-900 flex items-center gap-1.5">
                              <span>🌾</span> Kriteria Bahan Baku & Traceability
                            </h4>
                            <ul className="text-gray-600 space-y-1.5 list-disc list-inside">
                              <li>100% daging bersumber dari RPH terakreditasi NKV Level 1</li>
                              <li>Bumbu rempah alami tanpa zat perasa hewani tidak jelas</li>
                              <li>Batch traceability barcode pada setiap pasokan masuk</li>
                            </ul>
                          </div>

                          <div className="border border-blue-200 bg-blue-50/40 rounded-2xl p-4 space-y-2">
                            <h4 className="font-bold text-blue-900 flex items-center gap-1.5">
                              <span>🏭</span> Fasilitas & Pemisahan Alat (Dedicated)
                            </h4>
                            <ul className="text-gray-600 space-y-1.5 list-disc list-inside">
                              <li>Pabrik 100% bebas dari kontaminasi babi & najis berat</li>
                              <li>Pembersihan sanitasi bersertifikat sebelum batch produksi</li>
                              <li>Penyelia halal internal mengawasi setiap proses sterilisasi</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Info Box */}
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs space-y-3">
                        <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-2">Kontak Operasional</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-gray-400 block text-[11px]">Telepon / WhatsApp:</span>
                            <span className="font-bold text-slate-800">{supplier.phone}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[11px]">Email Resmi:</span>
                            <span className="font-mono text-slate-800">{supplier.email}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[11px]">Sertifikat Penyelia Halal:</span>
                            <span className="font-medium text-slate-700">{supplier.supervisorCert}</span>
                          </div>
                        </div>

                        <button 
                          onClick={() => onNavigate('supply-chain')}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition-colors mt-2"
                        >
                          Lihat Alur Supply Chain &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Katalog Produk Supplier */}
                {activeTab === 'Katalog Produk' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-800">Daftar Produk yang Dipasok oleh {supplier.name}</h3>
                      <button 
                        onClick={() => onNavigate('product-catalog')}
                        className="text-xs text-green-700 font-bold hover:underline"
                      >
                        Buka di Katalog Lengkap &rarr;
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {supplierProducts.map(p => (
                        <div key={p.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex gap-4 items-center">
                          <img src={p.image} alt={p.name} className="w-20 h-20 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                              {p.category}
                            </span>
                            <h4 className="font-bold text-gray-900 text-xs truncate mt-1">{p.name}</h4>
                            <p className="text-xs font-extrabold text-gray-800">Rp {p.price.toLocaleString('id-ID')}</p>
                            <p className="text-[10px] text-gray-500 font-mono">No: {p.halalNumber}</p>
                          </div>
                          <button 
                            onClick={() => onNavigate('product-detail')}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg shrink-0"
                          >
                            Detail
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Dokumen & Sertifikasi */}
                {activeTab === 'Dokumen & Sertifikasi' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-800">Berkas Legalitas & Sertifikasi Resmi</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      {[
                        { title: 'Sertifikat Halal BPJPH', desc: 'No. ID32110000123450223 (Berlaku s/d 2027)', icon: '📜', file: 'Sertifikat_BPJPH_BundaFoods.pdf' },
                        { title: 'Manual SJPH Terakreditasi', desc: 'Pedoman Sistem Jaminan Produk Halal internal', icon: '📖', file: 'Manual_SJPH_2024.pdf' },
                        { title: 'Sertifikat NKV & Sanitasi', desc: 'Nomor Kontrol Veteriner & Uji Mikrobiologi', icon: '🔬', file: 'NKV_Sanitasi_Lab.pdf' },
                      ].map((doc, i) => (
                        <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between space-y-3">
                          <div className="flex items-start gap-3">
                            <span className="text-3xl">{doc.icon}</span>
                            <div>
                              <p className="font-bold text-slate-900">{doc.title}</p>
                              <p className="text-[11px] text-slate-500">{doc.desc}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setShowDocPreview(doc.title)}
                            className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-1.5 rounded-xl text-[11px] transition-colors"
                          >
                            📄 Pratinjau Dokumen
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 4: Audit Halal */}
                {activeTab === 'Audit Halal' && (
                  <div className="space-y-4 text-xs text-slate-600">
                    <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl">
                      <h4 className="font-bold text-emerald-900 mb-1">Hasil Audit Berkala LP3H & BPJPH (Nilai: A - Sangat Baik)</h4>
                      <p className="text-emerald-700 text-xs">
                        Audit kepatuhan halal terakhir diselesaikan pada 14 Agustus 2023. Tidak ditemukan adanya potensi ketidaksesuaian kritis (zero critical non-compliance).
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800">Cek Status Langsung di SIHALAL:</span>
                        <p className="text-slate-500">Terintegrasi secara langsung melalui REST API BPJPH Kemenag</p>
                      </div>
                      <button 
                        onClick={() => onNavigate('verification')}
                        className="bg-green-700 text-white font-bold px-4 py-2 rounded-xl text-xs"
                      >
                        Buka Verification Center
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Contact Supplier Modal */}
      {showContactDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-sm">Hubungi {supplier.name}</h3>
              <button onClick={() => setShowContactDialog(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">✕</button>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <p><strong>Telepon / WA:</strong> {supplier.phone}</p>
              <p><strong>Email:</strong> {supplier.email}</p>
              <p><strong>PIC Penyelia Halal:</strong> {supplier.halalSupervisor}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  alert(`Membuka WhatsApp ke ${supplier.phone}...`);
                  setShowContactDialog(false);
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold text-xs"
              >
                Chat WhatsApp
              </button>
              <button onClick={() => setShowContactDialog(false)} className="px-4 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Add to Supply Chain Partnership Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-sm">Pengajuan Kemitraan Rantai Pasok</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">✕</button>
            </div>
            <p className="text-xs text-gray-600">
              Ajukan integrasi pasokan bahan baku dari <strong>{supplier.name}</strong> ke alur inventaris dan pelacakan cold chain Anda.
            </p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Estimasi Kebutuhan Pasokan Bulanan</label>
                <input type="text" defaultValue="500 Kg / Bulan" className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-hidden" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Catatan Tambahan untuk Penyelia Halal</label>
                <textarea rows={2} defaultValue="Memerlukan pengiriman berpendingin dengan suhu -18°C rutin tiap hari Senin." className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-hidden text-xs"></textarea>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => {
                  alert('Pengajuan kemitraan berhasil dikirim ke supplier!');
                  setShowAddModal(false);
                }}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-xl font-bold text-xs"
              >
                Kirim Pengajuan Kemitraan
              </button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold">Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {showDocPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-sm">Pratinjau: {showDocPreview}</h3>
              <button onClick={() => setShowDocPreview(null)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">✕</button>
            </div>
            <div className="bg-slate-100 p-8 rounded-2xl text-center space-y-3 border border-slate-200">
              <div className="text-5xl">📄</div>
              <p className="text-xs font-bold text-slate-800">{showDocPreview}</p>
              <p className="text-[11px] text-slate-500 font-mono">Status: Terverifikasi oleh SIHALAL BPJPH (Kemenag RI)</p>
              <div className="inline-block bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold">
                ✓ Otentik & Sah Berlaku
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => {
                  alert(`Mengunduh berkas ${showDocPreview}...`);
                  setShowDocPreview(null);
                }}
                className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Unduh Berkas PDF
              </button>
              <button onClick={() => setShowDocPreview(null)} className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
