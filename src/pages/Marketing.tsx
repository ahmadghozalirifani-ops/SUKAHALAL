import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import KPIWidget from '../components/KPIWidget';

type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

const mockCampaigns = [
  { id: 1, name: 'Promo Berkah Ramadan', type: 'Diskon', status: 'Aktif', progress: 65, duration: '1 Mar - 30 Mar', sales: 'Rp 15.2Jt', reach: '5,200' },
  { id: 2, name: 'Flash Sale Jumat Berkah', type: 'Flash Sale', status: 'Aktif', progress: 20, duration: 'Setiap Jumat', sales: 'Rp 4.5Jt', reach: '1,800' },
  { id: 3, name: 'Bundle Sembako Halal', type: 'Bundle', status: 'Selesai', progress: 100, duration: '1 Feb - 28 Feb', sales: 'Rp 22.0Jt', reach: '8,400' },
  { id: 4, name: 'Voucher Pelanggan Baru', type: 'Voucher', status: 'Aktif', progress: 45, duration: 'Selalu', sales: 'Rp 6.5Jt', reach: '3,100' },
];

export default function Marketing({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar onNavigate={onNavigate} userRole={userRole} currentPage="marketing" />
      <main className="flex-1 overflow-y-auto" style={{ background: '#FAFAF8' }}>
        <AppHeader 
          onNavigate={onNavigate} 
          userRole={userRole} 
          onSetRole={onSetRole}
          breadcrumbs={[{ label: t('breadcrumbs.dashboard'), page: 'dashboard' }, { label: t('breadcrumbs.marketing') }]}
        />
        
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPIWidget title={t('marketing.active_campaigns')} value="4" trend="" status="good" />
            <KPIWidget title={t('marketing.campaign_sales')} value="Rp 48.2Jt" trend="+15%" status="good" />
            <KPIWidget title={t('marketing.reach')} value="12,400" trend="+8%" status="good" />
            <KPIWidget title={t('marketing.conversion')} value="8.3%" trend="+1.2%" status="good" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">{t('marketing.campaign_list')}</h2>
                <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                  + {t('marketing.add_campaign')}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockCampaigns.map(camp => (
                  <div key={camp.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{camp.name}</h3>
                        <span className="inline-block mt-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">{camp.type}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${camp.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {camp.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-4">🗓️ {camp.duration}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium text-gray-700">{camp.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${camp.status === 'Aktif' ? 'bg-green-500' : 'bg-gray-400'}`} style={{ width: `${camp.progress}%` }}></div>
                      </div>
                    </div>

                    <div className="flex justify-between border-t border-gray-100 pt-4 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Sales</p>
                        <p className="font-bold text-gray-900">{camp.sales}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Reach</p>
                        <p className="font-bold text-gray-900">{camp.reach}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">💡 Halal Marketing Tips</h3>
                <div className="space-y-4">
                  {[
                    { icon: '📜', text: 'Tampilkan sertifikat halal secara prominent' },
                    { icon: '🌿', text: 'Gunakan visual bahan-bahan alami (halal tayiban)' },
                    { icon: '🕌', text: 'Kampanye di momen Islami (Ramadan, dll)' },
                    { icon: '🔗', text: 'Edukasi konsumen tentang rantai pasok halal' },
                    { icon: '🏭', text: 'Highlight proses produksi syariah' },
                    { icon: '💬', text: 'Testimonial dari konsumen Muslim' },
                  ].map((tip, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-xl mr-3">{tip.icon}</span>
                      <p className="text-sm text-gray-700">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">📅 Momen Islami Terdekat</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-500 pl-3">
                    <p className="text-xs text-green-600 font-bold">10 Hari Lagi</p>
                    <p className="font-medium text-gray-900">Awal Ramadan 1448 H</p>
                    <p className="text-xs text-gray-500">Rekomendasi: Diskon Kurma & Madu</p>
                  </div>
                  <div className="border-l-4 border-gray-300 pl-3">
                    <p className="text-xs text-gray-500 font-bold">40 Hari Lagi</p>
                    <p className="font-medium text-gray-700">Idul Fitri</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">{t('marketing.add_campaign_modal')}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kampanye</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                    <select className="w-full border border-gray-300 rounded-lg p-2">
                      <option>Diskon</option>
                      <option>Flash Sale</option>
                      <option>Bundle</option>
                      <option>Voucher</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Diskon (%)</label>
                    <input type="number" className="w-full border border-gray-300 rounded-lg p-2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                    <input type="date" className="w-full border border-gray-300 rounded-lg p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
                    <input type="date" className="w-full border border-gray-300 rounded-lg p-2" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea rows={3} className="w-full border border-gray-300 rounded-lg p-2"></textarea>
                </div>
              </div>
              <div className="mt-6 flex gap-3 justify-end">
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">{t('common.cancel')}</button>
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium">{t('common.save')}</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
