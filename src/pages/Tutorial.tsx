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

export default function Tutorial({ onNavigate, userRole, onSetRole }: PageProps) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const categories = ['Semua', 'Onboarding', 'Dokumen', 'Produk', 'Verifikasi', 'Pesanan', 'Marketing', 'SJPH'];
  
  const guides = [
    { title: 'Cara Mendaftar sebagai Seller', category: 'Onboarding', duration: '5 min', icon: '📝', steps: 4 },
    { title: 'Unggah Sertifikat Halal', category: 'Dokumen', duration: '3 min', icon: '📄', steps: 3 },
    { title: 'Tambah Produk Baru', category: 'Produk', duration: '7 min', icon: '📦', steps: 5 },
    { title: 'Proses Verifikasi BPJPH', category: 'Verifikasi', duration: '10 min', icon: '✅', steps: 6 },
    { title: 'Mengelola Pesanan Masuk', category: 'Pesanan', duration: '4 min', icon: '🛒', steps: 3 },
    { title: 'Membuat Promosi Diskon', category: 'Marketing', duration: '5 min', icon: '🏷️', steps: 4 },
    { title: 'Panduan Audit Internal', category: 'SJPH', duration: '15 min', icon: '🔍', steps: 7 },
    { title: 'Integrasi Sensor IoT', category: 'Sistem', duration: '8 min', icon: '📡', steps: 5 },
  ];

  const sjphSteps = [
    { id: 1, title: 'Kebijakan Halal', desc: 'Menetapkan komitmen tertulis perusahaan untuk menghasilkan produk halal secara konsisten.' },
    { id: 2, title: 'SOP Pelaksanaan', desc: 'Membuat Standar Operasional Prosedur untuk aktivitas kritis (pembelian, produksi, penyimpanan).' },
    { id: 3, title: 'Monitoring & Evaluasi', desc: 'Melakukan pemantauan berkala terhadap pelaksanaan SOP dan kondisi fasilitas.' },
    { id: 4, title: 'Audit Internal', desc: 'Melaksanakan audit internal minimal 1 kali setahun untuk memastikan kepatuhan.' },
    { id: 5, title: 'Tinjauan Manajemen', desc: 'Rapat pimpinan untuk mengevaluasi efektivitas Sistem Jaminan Produk Halal.' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {userRole !== 'guest' && <AppSidebar onNavigate={onNavigate} userRole={userRole} />}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <AppHeader onNavigate={onNavigate} userRole={userRole} onSetRole={onSetRole} />
        
        <div className="flex-1 overflow-y-auto">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-green-700 to-green-500 p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-3xl font-bold mb-4">{t('Pusat Bantuan & Tutorial')}</h1>
              <p className="mb-6 opacity-90">{t('Pelajari cara menggunakan SUKAHALAL dan pahami regulasi Jaminan Produk Halal.')}</p>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-400">🔍</span>
                <input 
                  type="text" 
                  placeholder={t('Cari topik bantuan...')} 
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
            </div>
          </div>

          <div className="p-6 max-w-6xl mx-auto space-y-10">
            
            {/* SJPH Digital Wizard */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🧙‍♂️</span>
                <h2 className="text-xl font-bold text-gray-800">{t('SJPH Digital Wizard')}</h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <p className="text-sm text-gray-600 mb-6">Panduan langkah demi langkah implementasi Sistem Jaminan Produk Halal (SJPH) di perusahaan Anda.</p>
                <div className="space-y-4">
                  {sjphSteps.map(step => (
                    <div key={step.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${expandedStep === step.id ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            {step.id}
                          </div>
                          <span className="font-semibold text-gray-800">{step.title}</span>
                        </div>
                        <span className="text-gray-400">{expandedStep === step.id ? '▲' : '▼'}</span>
                      </button>
                      {expandedStep === step.id && (
                        <div className="p-4 bg-white border-t border-gray-100">
                          <p className="text-sm text-gray-600 mb-4">{step.desc}</p>
                          <button className="text-sm text-green-600 font-medium hover:underline">Baca panduan lengkap →</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Halal Literacy Hub */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📚</span>
                <h2 className="text-xl font-bold text-gray-800">{t('Halal Literacy Hub')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">✨</div>
                  <h3 className="font-bold text-blue-900 mb-2">Apa itu Halal Tayiban?</h3>
                  <p className="text-sm text-blue-800 mb-4">Tidak hanya halal secara syariat, tapi juga baik, aman, dan berkualitas tinggi untuk dikonsumsi.</p>
                  <button className="text-xs font-bold text-blue-600 uppercase tracking-wider hover:underline">Pelajari &gt;</button>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">🏷️</div>
                  <h3 className="font-bold text-purple-900 mb-2">Cara Baca Label Halal</h3>
                  <p className="text-sm text-purple-800 mb-4">Pahami elemen penting pada logo Halal Indonesia terbaru dari BPJPH dan nomor sertifikatnya.</p>
                  <button className="text-xs font-bold text-purple-600 uppercase tracking-wider hover:underline">Pelajari &gt;</button>
                </div>
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">⚖️</div>
                  <h3 className="font-bold text-orange-900 mb-2">Info Regulasi UU JPH</h3>
                  <p className="text-sm text-orange-800 mb-4">Ringkasan UU No. 33 Tahun 2014 tentang Jaminan Produk Halal dan kewajiban sertifikasi 2024.</p>
                  <button className="text-xs font-bold text-orange-600 uppercase tracking-wider hover:underline">Pelajari &gt;</button>
                </div>
              </div>
            </section>

            {/* Platform Guides */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📱</span>
                <h2 className="text-xl font-bold text-gray-800">{t('Panduan Penggunaan Platform')}</h2>
              </div>
              
              <div className="flex overflow-x-auto pb-4 gap-2 mb-4 scrollbar-hide">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {guides.filter(g => activeCategory === 'Semua' || g.category === activeCategory).map((guide, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-green-400 hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl group-hover:bg-green-50 group-hover:scale-110 transition-transform">
                        {guide.icon}
                      </div>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium">{guide.category}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{guide.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>⏱️ {guide.duration}</span>
                      <span>{guide.steps} langkah</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Support */}
            <div className="bg-green-50 rounded-xl border border-green-100 p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-green-800 mb-1">Masih butuh bantuan?</h3>
                <p className="text-sm text-green-700">Tim support kami siap membantu Anda 24/7 via WhatsApp.</p>
              </div>
              <button className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center gap-2">
                <span>💬</span> Hubungi Support
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
