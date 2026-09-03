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

export default function UploadDokumen({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [docType, setDocType] = useState('Sertifikat Halal MUI');
  const [isSimulating, setIsSimulating] = useState(false);

  // Form State for AI Extraction Results
  const [aiData, setAiData] = useState({
    nama: 'Rendang Sapi Premium',
    nomor: 'ID3211000012345',
    tanggalTerbit: '2023-08-20',
    tanggalKedaluwarsa: '2027-08-20',
    bahan: 'Daging Sapi, Santan, Rempah',
    status: 'Halal',
  });

  const handleUploadClick = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setStep(2);
    }, 2000);
  };

  const handleSubmitBPJPH = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      alert(t('Berhasil dikirim ke BPJPH!'));
      setStep(1);
    }, 2500);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8 px-4">
      <div className="flex items-center w-full max-w-2xl">
        <div className={`flex flex-col items-center relative z-10`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-green-600 text-white shadow-md' : 'bg-slate-200 text-slate-500'}`}>1</div>
          <span className={`text-xs mt-2 font-medium ${step >= 1 ? 'text-green-700' : 'text-slate-500'}`}>{t('Upload')}</span>
        </div>
        <div className={`flex-1 h-1 mx-2 rounded ${step >= 2 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
        <div className={`flex flex-col items-center relative z-10`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-green-600 text-white shadow-md' : 'bg-slate-200 text-slate-500'}`}>2</div>
          <span className={`text-xs mt-2 font-medium ${step >= 2 ? 'text-green-700' : 'text-slate-500'}`}>{t('Ekstraksi AI')}</span>
        </div>
        <div className={`flex-1 h-1 mx-2 rounded ${step >= 3 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
        <div className={`flex flex-col items-center relative z-10`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-green-600 text-white shadow-md' : 'bg-slate-200 text-slate-500'}`}>3</div>
          <span className={`text-xs mt-2 font-medium ${step >= 3 ? 'text-green-700' : 'text-slate-500'}`}>{t('Submit BPJPH')}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#FAFAF8' }}>
      <AppSidebar onNavigate={onNavigate} userRole={userRole} currentPage="upload-dokumen" />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader 
          title="Upload Dokumen"
          breadcrumb="Dashboard > Upload Dokumen"
          userRole={userRole} 
          onSetRole={onSetRole} 
          onNavigate={onNavigate}
        />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {renderStepIndicator()}
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
              {step === 1 && (
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">{t('Pilih dan Upload Dokumen Halal')}</h3>
                  
                  <div className="max-w-md mx-auto mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{t('Jenis Dokumen')}</label>
                    <select 
                      value={docType}
                      onChange={e => setDocType(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none bg-white shadow-sm"
                    >
                      <option>Sertifikat Halal MUI</option>
                      <option>Surat Keterangan BPJPH</option>
                      <option>Dokumen Pendukung Bahan</option>
                      <option>Manual SJPH</option>
                    </select>
                  </div>
                  
                  <div 
                    className="max-w-xl mx-auto border-2 border-dashed border-green-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-green-50 hover:bg-green-100 transition-colors cursor-pointer group"
                    onClick={!isSimulating ? handleUploadClick : undefined}
                  >
                    {isSimulating ? (
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                        <p className="text-green-700 font-medium">{t('Memproses dokumen...')}</p>
                      </div>
                    ) : (
                      <>
                        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📄</div>
                        <div className="text-lg font-bold text-green-700 mb-2">{t('Klik atau Drag & Drop File Disini')}</div>
                        <div className="text-sm text-green-600">{t('Mendukung PDF, JPG, PNG (Max 10MB)')}</div>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      🤖 {t('Hasil Ekstraksi AI')}
                    </h3>
                    <div className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold border border-green-200 shadow-sm">
                      ✨ Confidence: 95%
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-6">
                    {t('Sistem AI kami telah mengekstrak informasi dari dokumen Anda. Silakan periksa dan koreksi jika ada kesalahan sebelum melanjutkan.')}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div>
                      <label className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                        {t('Nama Produk')} <span className="text-green-600 text-xs">98% match</span>
                      </label>
                      <input 
                        type="text" 
                        value={aiData.nama} 
                        onChange={e => setAiData({...aiData, nama: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                        {t('Nomor Sertifikat')} <span className="text-green-600 text-xs">99% match</span>
                      </label>
                      <input 
                        type="text" 
                        value={aiData.nomor} 
                        onChange={e => setAiData({...aiData, nomor: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none font-mono" 
                      />
                    </div>
                    <div>
                      <label className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                        {t('Tanggal Terbit')} <span className="text-amber-500 text-xs">85% match</span>
                      </label>
                      <input 
                        type="date" 
                        value={aiData.tanggalTerbit} 
                        onChange={e => setAiData({...aiData, tanggalTerbit: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                        {t('Tanggal Kedaluwarsa')} <span className="text-green-600 text-xs">94% match</span>
                      </label>
                      <input 
                        type="date" 
                        value={aiData.tanggalKedaluwarsa} 
                        onChange={e => setAiData({...aiData, tanggalKedaluwarsa: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                        {t('Bahan Utama')} <span className="text-green-600 text-xs">92% match</span>
                      </label>
                      <textarea 
                        value={aiData.bahan} 
                        onChange={e => setAiData({...aiData, bahan: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" 
                        rows={2}
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
                    <div>
                      <div className="font-bold text-slate-800 text-sm mb-1">{t('Preview Status Kesesuaian')}</div>
                      <div className="text-xs text-slate-500">{t('Berdasarkan data yang diekstrak')}</div>
                    </div>
                    <TrafficLightStatus status="green" />
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button onClick={() => setStep(1)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50">{t('Upload Ulang')}</button>
                    <button onClick={() => setStep(3)} className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow-sm">{t('Konfirmasi & Lanjut')}</button>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="p-8 text-center max-w-lg mx-auto">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm border border-green-200">
                    ✅
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{t('Siap Dikirim ke BPJPH')}</h3>
                  <p className="text-slate-600 mb-8">
                    {t('Data telah diverifikasi. Sistem akan mengirimkan data ini secara otomatis ke API Sihalal BPJPH untuk proses selanjutnya.')}
                  </p>
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-8 text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-slate-700">{t('Status Koneksi API BPJPH')}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono pl-5">Connected - Latency: 42ms - Token: Valid</div>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <button onClick={() => setStep(2)} className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50">{t('Kembali')}</button>
                    <button 
                      onClick={handleSubmitBPJPH} 
                      disabled={isSimulating}
                      className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSimulating ? (
                        <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> {t('Mengirim...')}</>
                      ) : (
                        t('Submit ke BPJPH')
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Riwayat Dokumen */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-slate-800 mb-4">{t('Riwayat Dokumen Terakhir')}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                      <th className="p-3 rounded-tl-lg">{t('Tanggal')}</th>
                      <th className="p-3">{t('Jenis')}</th>
                      <th className="p-3">{t('Nama Produk')}</th>
                      <th className="p-3">{t('Status AI')}</th>
                      <th className="p-3 rounded-tr-lg">{t('Status BPJPH')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 text-slate-600">12 Aug 2023</td>
                      <td className="p-3 font-medium text-slate-800">Sertifikat Halal</td>
                      <td className="p-3 text-slate-600">Krim Wajah Alami</td>
                      <td className="p-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">100% Match</span></td>
                      <td className="p-3"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">In Review</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-600">05 Aug 2023</td>
                      <td className="p-3 font-medium text-slate-800">Manual SJPH</td>
                      <td className="p-3 text-slate-600">Rendang Sapi Premium</td>
                      <td className="p-3"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold">Needs Manual Edit</span></td>
                      <td className="p-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Approved</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
