import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import TrafficLightStatus from '../components/TrafficLightStatus';
import TraceabilityModal from '../components/TraceabilityModal';

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
  const [showTrace, setShowTrace] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AppSidebar onNavigate={onNavigate} userRole={userRole} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <AppHeader onNavigate={onNavigate} userRole={userRole} onSetRole={onSetRole} />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Dashboard &gt; {t('Katalog Supplier')} &gt; {t('Profil Supplier')}</p>
          </div>

          {/* Hero Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="h-32 bg-gradient-to-r from-green-600 to-green-400"></div>
            <div className="px-6 pb-6 relative">
              <div className="flex justify-between items-end">
                <div className="flex gap-4 items-end -mt-12">
                  <div className="w-24 h-24 bg-white rounded-full p-2 shadow-md">
                    <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-4xl">
                      🌾
                    </div>
                  </div>
                  <div className="pb-2">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      PT Berkah Agro
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        ✅ BPJPH Verified
                      </span>
                    </h1>
                    <p className="text-sm text-gray-500">📍 Jawa Barat • {t('Berdiri sejak')} 2015</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="text-center mr-4">
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-14 h-14 transform -rotate-90">
                        <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-200" />
                        <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="150" strokeDashoffset="22" className="text-green-500" />
                      </svg>
                      <span className="absolute text-sm font-bold text-gray-700">85</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">OMAX Score</p>
                  </div>
                  <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg text-sm font-medium hover:bg-green-50">
                    {t('Hubungi')}
                  </button>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                  >
                    {t('Gabung ke Rantai Pasok')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="flex border-b border-gray-100">
              {['Ringkasan', 'Produk', 'Dokumen', 'Ulasan'].map(tab => (
                <button
                  key={tab}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === tab ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {t(tab)}
                </button>
              ))}
            </div>
            
            <div className="p-6">
              {activeTab === 'Ringkasan' && (
                <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-2">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">{t('Tentang Perusahaan')}</h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      PT Berkah Agro adalah pemasok bahan baku pertanian berkualitas tinggi yang berfokus pada sayuran organik dan biji-bijian. Kami memastikan seluruh rantai pasok kami mematuhi standar kehalalan dan keamanan pangan (HACCP).
                    </p>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-4">{t('Kepatuhan Halal (Tieman Framework)')}</h3>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Control Activities</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                          <li>Pemisahan fasilitas produksi halal dan non-halal (Dedicated)</li>
                          <li>Sanitasi rutin dengan bahan pembersih bersertifikat</li>
                          <li>Pelabelan identitas produk yang jelas</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Assurance Activities</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                          <li>Audit internal bulanan</li>
                          <li>Sertifikasi BPJPH berlaku hingga 2026</li>
                          <li>Pelatihan Sistem Jaminan Produk Halal untuk karyawan</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">{t('Informasi')}</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-500">{t('Alamat')}</p>
                        <p className="text-sm text-gray-700">Jl. Raya Bogor Km 29, Depok, Jawa Barat</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{t('Kategori Utama')}</p>
                        <p className="text-sm text-gray-700">Bahan Baku, Sayuran Organik</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{t('Sertifikasi')}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">BPJPH</span>
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">HACCP</span>
                          <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">ISO 9001</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">{t('Status Sensor IoT')}</p>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          <span className="text-sm font-medium text-green-600">Online & Compliant</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Produk' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <div className="w-full h-32 bg-gray-100 rounded-md mb-3 flex items-center justify-center text-4xl">
                        {['🥬', '🥕', '🥔', '🌽', '🍅', '🧅'][i-1]}
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">Produk {i}</h4>
                      <p className="text-sm font-bold text-green-600 mb-3">Rp 15.000 / kg</p>
                      <div className="flex justify-between items-center">
                        <TrafficLightStatus status="green" />
                        <button 
                          onClick={() => setShowTrace(true)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Lihat Traceability
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Dokumen' && (
                <div className="space-y-4">
                  {[
                    {name: 'Sertifikat Halal BPJPH', exp: '12 Okt 2026', status: 'green'},
                    {name: 'Sertifikat HACCP', exp: '05 Jan 2025', status: 'green'},
                    {name: 'Hasil Uji Lab Terakhir', exp: 'Valid', status: 'green'},
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">📄</div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{doc.name}</h4>
                          <p className="text-xs text-gray-500">Berlaku hingga: {doc.exp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <TrafficLightStatus status={doc.status as any} />
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">Unduh</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Ulasan' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                    <div className="text-4xl font-bold text-gray-800">4.8</div>
                    <div>
                      <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
                      <p className="text-sm text-gray-500">Berdasarkan 120 ulasan</p>
                    </div>
                  </div>
                  {[1,2,3].map(i => (
                    <div key={i} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800">Pembeli {i}</span>
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">Verified Purchase</span>
                      </div>
                      <div className="text-yellow-400 text-xs mb-2">⭐⭐⭐⭐⭐</div>
                      <p className="text-sm text-gray-600">Kualitas sangat baik, pengiriman cepat, dan dokumentasi halal selalu disertakan dalam pengiriman.</p>
                      <p className="text-xs text-gray-400 mt-2">2 hari yang lalu</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">{t('Tambah ke Rantai Pasok')}</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Peran dalam Rantai Pasok</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Pemasok Bahan Baku Utama</option>
                  <option>Pemasok Bahan Tambahan</option>
                  <option>Penyedia Kemasan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai Kerjasama</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div className="flex items-start gap-2 mt-4">
                <input type="checkbox" className="mt-1 rounded text-green-600 focus:ring-green-500" id="sla" />
                <label htmlFor="sla" className="text-sm text-gray-600">
                  Saya menyetujui SLA Halal Compliance yang mensyaratkan notifikasi otomatis jika status halal supplier berubah.
                </label>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Batal</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">Kirim Permintaan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTrace && (
        <TraceabilityModal 
          productName="Sayuran Organik"
          history={[]}
          onClose={() => setShowTrace(false)} 
        />
      )}
    </div>
  );
}
