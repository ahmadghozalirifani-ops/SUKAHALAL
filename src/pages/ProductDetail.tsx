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

export default function ProductDetail({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'spesifikasi' | 'verifikasi' | 'ulasan'>('spesifikasi');
  const [isTraceModalOpen, setIsTraceModalOpen] = useState(false);

  const primaryColor = 
    userRole === 'seller' ? 'bg-green-600' :
    userRole === 'distributor' ? 'bg-blue-600' :
    userRole === 'customer' ? 'bg-violet-600' : 'bg-green-600';

  const textColor = 
    userRole === 'seller' ? 'text-green-600' :
    userRole === 'distributor' ? 'text-blue-600' :
    userRole === 'customer' ? 'text-violet-600' : 'text-green-600';

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <AppSidebar onNavigate={onNavigate} userRole={userRole} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader 
          title="Detail Produk"
          breadcrumb="Dashboard > Katalog Produk > Detail Produk"
          userRole={userRole} 
          onSetRole={onSetRole} 
        />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-slate-100 h-64 md:h-auto flex items-center justify-center text-9xl relative">
                🍛
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur text-green-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 border border-green-200 shadow-sm">
                    ✨ {t('Halal Tayyiban')}
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:w-2/3 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-3xl font-bold text-slate-800">Rendang Sapi Premium</h1>
                  <button 
                    onClick={() => setIsTraceModalOpen(true)}
                    className="p-3 bg-slate-50 text-slate-600 rounded-full hover:bg-slate-100 transition-colors shadow-sm border border-slate-200"
                    title={t('Traceability QR')}
                  >
                    🔍 QR
                  </button>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                  <span className="flex items-center gap-1">🏪 Bunda Halal Foods</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-500 font-medium">★ 4.8 (124 {t('Ulasan')})</span>
                </div>
                
                <div className="text-3xl font-bold text-slate-900 mb-6">
                  Rp 75.000
                </div>
                
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {t('Rendang daging sapi pilihan yang dimasak perlahan dengan bumbu rempah asli nusantara. Diproses dengan standar kehalalan dan kebersihan tinggi untuk menjamin kualitas tayyiban.')}
                </p>
                
                <div className="mt-auto flex gap-4">
                  {(userRole === 'seller' || userRole === 'distributor') ? (
                    <button className={`px-8 py-3 ${primaryColor} text-white rounded-xl font-bold hover:opacity-90 transition-opacity shadow-sm`}>
                      {t('Edit Produk')}
                    </button>
                  ) : (
                    <>
                      <button className={`flex-1 md:flex-none px-8 py-3 ${primaryColor} text-white rounded-xl font-bold hover:opacity-90 transition-opacity shadow-sm`}>
                        {t('Beli Sekarang')}
                      </button>
                      <button className="flex-1 md:flex-none px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm">
                        {t('Tambah ke Keranjang')}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex border-b border-slate-200">
                {(['spesifikasi', 'verifikasi', 'ulasan'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 text-sm font-bold uppercase tracking-wider transition-colors ${
                      activeTab === tab 
                        ? `border-b-2 border-slate-900 text-slate-900 bg-slate-50` 
                        : `text-slate-500 hover:bg-slate-50 hover:text-slate-700`
                    }`}
                  >
                    {t(tab)}
                  </button>
                ))}
              </div>
              
              <div className="p-8">
                {activeTab === 'spesifikasi' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">{t('Informasi Detail')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-500">{t('Komposisi')}</span>
                          <span className="font-medium text-slate-800 text-right w-1/2">Daging Sapi (80%), Santan, Cabai, Bawang Merah, Bawang Putih, Jahe, Lengkuas, Serai</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-500">{t('Asal Bahan')}</span>
                          <span className="font-medium text-slate-800">Lokal (RPH Halal Bersertifikat)</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-500">{t('Masa Simpan')}</span>
                          <span className="font-medium text-slate-800">6 Bulan (Suhu Ruang)</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-500">{t('Berat Bersih')}</span>
                          <span className="font-medium text-slate-800">250 gram</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-500">{t('Sertifikasi')}</span>
                          <span className="font-medium text-green-600 flex items-center gap-1">BPJPH Halal <TrafficLightStatus status="green" size="sm"/></span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-500">{t('Proses Produksi')}</span>
                          <span className="font-medium text-slate-800">Pemanasan Suhu Tinggi (Sterilisasi)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'verifikasi' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex-1 space-y-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">{t('Status Verifikasi Halal')}</h3>
                        
                        <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-green-500 text-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                              ✓
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                              <div className="font-bold text-slate-800">{t('Pengajuan')}</div>
                              <div className="text-sm text-slate-500">12 Aug 2023</div>
                            </div>
                          </div>
                          
                          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-green-500 text-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                              ✓
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                              <div className="font-bold text-slate-800">{t('Analisis AI')}</div>
                              <div className="text-sm text-slate-500">12 Aug 2023 - Score: 98%</div>
                            </div>
                          </div>
                          
                          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-green-500 text-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                              ✓
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                              <div className="font-bold text-slate-800">{t('Review BPJPH')}</div>
                              <div className="text-sm text-slate-500">15 Aug 2023</div>
                            </div>
                          </div>
                          
                          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-green-500 text-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                              ★
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-green-50 p-4 rounded-xl border border-green-200 shadow-sm">
                              <div className="font-bold text-green-800">{t('Sertifikat Terbit')}</div>
                              <div className="text-sm text-green-600">20 Aug 2023</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-72 bg-slate-50 p-6 rounded-2xl border border-slate-200 shrink-0">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-sm border border-slate-100">
                            📜
                          </div>
                          <div>
                            <div className="text-sm text-slate-500 font-medium mb-1">{t('Nomor Sertifikat')}</div>
                            <div className="font-mono font-bold text-slate-800">ID3211000012345</div>
                          </div>
                          <div className="w-full space-y-2 pt-4 border-t border-slate-200">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">{t('Berlaku Hingga')}</span>
                              <span className="font-bold text-slate-700">20 Aug 2027</span>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                              <span className="text-slate-500">{t('Status')}</span>
                              <TrafficLightStatus status="green" size="sm" />
                            </div>
                          </div>
                          <button className="w-full mt-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm text-sm">
                            ⬇️ {t('Unduh Sertifikat')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'ulasan' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="text-5xl font-bold text-slate-800">4.8</div>
                      <div>
                        <div className="flex text-amber-400 text-xl mb-1">★★★★★</div>
                        <div className="text-sm text-slate-500">124 {t('Ulasan Pembeli')}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="pb-6 border-b border-slate-100 last:border-0">
                          <div className="flex justify-between mb-2">
                            <div className="font-bold text-slate-800">Ahmad G.</div>
                            <div className="text-sm text-slate-400">2 hari yang lalu</div>
                          </div>
                          <div className="flex text-amber-400 text-sm mb-3">★★★★★</div>
                          <p className="text-slate-600 mb-3">Rasa rendangnya autentik, dagingnya empuk. Sangat direkomendasikan dan yang paling penting terjamin kehalalannya.</p>
                          <div className="flex items-center gap-4">
                            <button className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1">
                              👍 Membantu (12)
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center pt-4">
                      <button className="text-green-600 font-medium hover:underline">
                        {t('Lihat Semua Ulasan')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Related Products Placeholder */}
            <div className="pt-8 pb-12">
              <h3 className="text-xl font-bold text-slate-800 mb-6">{t('Produk Serupa')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('ProductDetail')}>
                    <div className="text-4xl mb-3">🍘</div>
                    <div className="font-bold text-slate-800 text-sm mb-1">Snack Halal {i}</div>
                    <div className="text-green-600 font-bold text-sm">Rp 15.000</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <TraceabilityModal 
        isOpen={isTraceModalOpen} 
        onClose={() => setIsTraceModalOpen(false)} 
        productId={'1'} 
      />
    </div>
  );
}
