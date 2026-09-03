import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import TrafficLightStatus, { type TLSStatus } from '../components/TrafficLightStatus';
import TraceabilityModal from '../components/TraceabilityModal';

export type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

export interface PageProps {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

const VerificationCenter: React.FC<PageProps> = ({ onNavigate, userRole, onSetRole }) => {
  const { t } = useTranslation();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showTraceModal, setShowTraceModal] = useState(false);
  const [apiConnected, setApiConnected] = useState(true);

  const themeColor = userRole === 'distributor' ? 'blue' : 'green';

  const steps = ['Submit Dokumen', 'Pengecekan AI', 'Verifikasi BPJPH', 'Sertifikat Terbit'];

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar onNavigate={onNavigate} currentRoute="verification-center" userRole={userRole} />
      <div className="flex-1 flex flex-col bg-gray-50">
        <AppHeader 
           userRole={userRole} 
           onSetRole={onSetRole} 
           breadcrumbs={[
             { label: t('breadcrumbs.dashboard', 'Dashboard') },
             { label: t('verification.title', 'Pusat Verifikasi') }
           ]} 
        />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
             <h1 className="text-2xl font-bold text-gray-800">{t('verification.title', 'Pusat Verifikasi Dokumen & Sertifikasi')}</h1>
             <div className="flex gap-3">
                 <button onClick={() => setShowTraceModal(true)} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                   🔍 Cek Traceability QR
                 </button>
                 <button onClick={() => onNavigate('upload-dokumen')} className={`bg-${themeColor}-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-${themeColor}-700 transition-colors flex items-center gap-2`}>
                   📄 Upload Dokumen Baru
                 </button>
             </div>
          </div>

          {/* Progress Indicator */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
             <h2 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-wider">Alur Verifikasi Standar</h2>
             <div className="flex items-center justify-between relative">
                <div className="absolute h-1 bg-gray-200 left-4 right-4 top-1/2 -translate-y-1/2 z-0"></div>
                {steps.map((step, i) => (
                   <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${i < 3 ? `bg-${themeColor}-500` : 'bg-gray-300'}`}>
                         {i < 2 ? '✓' : i + 1}
                      </div>
                      <span className={`text-xs font-semibold ${i < 3 ? `text-${themeColor}-700` : 'text-gray-400'}`}>{step}</span>
                   </div>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Left Column */}
             <div className="lg:col-span-2 space-y-6">
                {/* Verification Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                   <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                      <h2 className="text-lg font-bold text-gray-800">Daftar Pengajuan Verifikasi</h2>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                         <thead>
                            <tr className="bg-gray-50 text-gray-500">
                               <th className="py-3 px-4 font-medium">Produk / Entitas</th>
                               <th className="py-3 px-4 font-medium">Tipe Dokumen</th>
                               <th className="py-3 px-4 font-medium">Tanggal Submit</th>
                               <th className="py-3 px-4 font-medium">Status</th>
                               <th className="py-3 px-4 font-medium">Skor AI</th>
                               <th className="py-3 px-4 font-medium text-center">Aksi</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100">
                            {[
                               { name: 'Bumbu Rendang Sachet', doc: 'Sertifikat Halal', date: '12 Okt 2023', status: 'yellow' as TLSStatus, score: '85%' },
                               { name: 'Truk Pendingin B', doc: 'Sertifikat Kebersihan', date: '10 Okt 2023', status: 'green' as TLSStatus, score: '98%' },
                               { name: 'Bahan Baku Daging', doc: 'Sertifikat RPH', date: '05 Okt 2023', status: 'red' as TLSStatus, score: '45%' },
                            ].map((req, i) => (
                               <tr key={i} className="hover:bg-gray-50 transition-colors">
                                  <td className="py-3 px-4 font-medium text-gray-800">{req.name}</td>
                                  <td className="py-3 px-4 text-gray-600">{req.doc}</td>
                                  <td className="py-3 px-4 text-gray-500">{req.date}</td>
                                  <td className="py-3 px-4"><TrafficLightStatus status={req.status} /></td>
                                  <td className="py-3 px-4">
                                     <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden w-16">
                                           <div className={`h-full ${parseInt(req.score) > 80 ? 'bg-green-500' : parseInt(req.score) > 50 ? 'bg-yellow-400' : 'bg-red-500'}`} style={{ width: req.score }}></div>
                                        </div>
                                        <span className="font-bold text-gray-700 text-xs">{req.score}</span>
                                     </div>
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                     <button onClick={() => setShowDetailModal(true)} className={`text-${themeColor}-600 hover:text-${themeColor}-800 font-medium text-xs hover:underline`}>Detail</button>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>

             {/* Right Column */}
             <div className="space-y-6">
                {/* API Status */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                   <h2 className="text-lg font-bold text-gray-800 mb-4">Integrasi BPJPH</h2>
                   <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-3">
                         <div className={`w-3 h-3 rounded-full ${apiConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                         <span className="font-medium text-gray-700">API SIHALAL</span>
                      </div>
                      <button onClick={() => setApiConnected(!apiConnected)} className={`text-xs px-3 py-1 rounded font-bold ${apiConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                         {apiConnected ? 'Connected' : 'Disconnected'}
                      </button>
                   </div>
                   <p className="text-xs text-gray-500 mt-3 text-center">Terakhir sinkronisasi: 2 menit yang lalu</p>
                </div>

                {/* TLS Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                   <h2 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Status (TLS)</h2>
                   <div className="space-y-3">
                      <div className="flex items-center justify-between bg-green-50 px-4 py-3 rounded-xl border border-green-100">
                         <div className="flex items-center gap-2"><TrafficLightStatus status="green" /><span className="font-medium text-green-800 text-sm">Aktif & Valid</span></div>
                         <span className="font-bold text-green-800">12</span>
                      </div>
                      <div className="flex items-center justify-between bg-yellow-50 px-4 py-3 rounded-xl border border-yellow-100">
                         <div className="flex items-center gap-2"><TrafficLightStatus status="yellow" /><span className="font-medium text-yellow-800 text-sm">Akan Expired (&lt;30hr)</span></div>
                         <span className="font-bold text-yellow-800">3</span>
                      </div>
                      <div className="flex items-center justify-between bg-red-50 px-4 py-3 rounded-xl border border-red-100">
                         <div className="flex items-center gap-2"><TrafficLightStatus status="red" /><span className="font-medium text-red-800 text-sm">Bermasalah / Reject</span></div>
                         <span className="font-bold text-red-800">1</span>
                      </div>
                   </div>
                </div>

                {/* Compliance Calendar */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                   <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">📅 Kalender Kepatuhan</h2>
                   <div className="space-y-3">
                      <div className="flex gap-3 border-l-2 border-yellow-400 pl-3">
                         <div className="text-center bg-gray-50 rounded p-1 min-w-[3rem]">
                            <div className="text-xs text-gray-500 font-bold uppercase">Okt</div>
                            <div className="font-bold text-gray-800 text-lg">25</div>
                         </div>
                         <div>
                            <div className="text-sm font-bold text-gray-800">Sertifikat Pabrik Expired</div>
                            <div className="text-xs text-gray-500">Pabrik Makmur (Tinggal 10 hari)</div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      {showDetailModal && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
               <div className="flex justify-between items-start mb-6">
                  <div>
                     <h3 className="text-xl font-bold text-gray-800">Detail Verifikasi Dokumen</h3>
                     <p className="text-sm text-gray-500">ID Pengajuan: REQ-20231012-001</p>
                  </div>
                  <button onClick={() => setShowDetailModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">✕</button>
               </div>
               
               <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                     <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Informasi Produk</h4>
                     <p className="font-medium text-gray-800">Bumbu Rendang Sachet</p>
                     <p className="text-sm text-gray-600">Kategori: Makanan Olahan</p>
                  </div>
                  <div>
                     <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Status Saat Ini</h4>
                     <div className="flex items-center gap-2 mb-1"><TrafficLightStatus status="yellow" /> <span className="font-bold text-yellow-700">Menunggu Review BPJPH</span></div>
                     <p className="text-sm text-gray-600">Skor AI: 85% (Dokumen lengkap)</p>
                  </div>
               </div>

               <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
                  <div className="bg-gray-50 p-3 border-b border-gray-200 font-bold text-gray-700 text-sm">Riwayat Audit (Log Blockchain)</div>
                  <div className="p-4 space-y-4">
                     <div className="flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                        <div>
                           <div className="text-sm font-bold text-gray-800">Dokumen diunggah oleh UMKM</div>
                           <div className="text-xs text-gray-500">12 Okt 2023, 10:00 WIB • Hash: 0x8f...3a2</div>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                        <div>
                           <div className="text-sm font-bold text-gray-800">Pengecekan AI Selesai (Skor 85%)</div>
                           <div className="text-xs text-gray-500">12 Okt 2023, 10:05 WIB • Hash: 0x9c...1b4</div>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 animate-pulse"></div>
                        <div>
                           <div className="text-sm font-bold text-gray-800">Review Manual BPJPH</div>
                           <div className="text-xs text-gray-500">In Progress...</div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex justify-end gap-3">
                  <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">Tutup</button>
                  <button className={`px-4 py-2 rounded-lg bg-${themeColor}-600 text-white font-medium hover:bg-${themeColor}-700`}>Lihat Berkas (PDF)</button>
               </div>
            </div>
         </div>
      )}

      {/* Traceability Modal */}
      {showTraceModal && (
        <TraceabilityModal onClose={() => setShowTraceModal(false)} />
      )}
    </div>
  );
};

export default VerificationCenter;
