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

export default function Notifikasi({ onNavigate, userRole, onSetRole }: PageProps) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('Semua');

  const filters = ['Semua', 'Verifikasi', 'Pesanan', 'Stok', 'Dokumen', 'Marketing', 'Sistem'];

  const notifications = [
    { id: 1, type: 'Verifikasi', title: 'Sertifikat Halal Disetujui', desc: 'Pengajuan sertifikat halal BPJPH Anda telah disetujui. Berlaku hingga 2028.', time: '10 menit yang lalu', read: false, icon: '✅' },
    { id: 2, type: 'Pesanan', title: 'Pesanan Baru #ORD-0921', desc: 'Pembeli PT Maju Jaya telah membuat pesanan baru sebesar Rp 2.500.000.', time: '1 jam yang lalu', read: false, icon: '🛒' },
    { id: 3, type: 'Stok', title: 'Stok Menipis: Daging Sapi Premium', desc: 'Sisa stok tinggal 5 kg. Segera lakukan restock untuk menghindari kehabisan.', time: '3 jam yang lalu', read: false, icon: '⚠️' },
    { id: 4, type: 'Dokumen', title: 'Sertifikat HACCP Mendekati Expired', desc: 'Sertifikat HACCP Anda akan kadaluarsa dalam 30 hari. Segera perbarui.', time: 'Kemarin', read: true, icon: '📄' },
    { id: 5, type: 'Sistem', title: 'Update Sistem v2.1', desc: 'Fitur baru Traceability via QR Code kini telah tersedia.', time: 'Kemarin', read: true, icon: '💻' },
    { id: 6, type: 'Pesanan', title: 'Pembayaran Diterima #ORD-0910', desc: 'Pembayaran sebesar Rp 500.000 via BSI telah diverifikasi.', time: '2 hari yang lalu', read: true, icon: '💰' },
    { id: 7, type: 'Marketing', title: 'Promo Harbolnas Dimulai', desc: 'Aktifkan voucher diskon toko Anda sekarang untuk meningkatkan penjualan.', time: '3 hari yang lalu', read: true, icon: '🏷️' },
    { id: 8, type: 'Verifikasi', title: 'Audit Internal Dijadwalkan', desc: 'Pengingat: Jadwal audit internal SJPH pada tanggal 15 bulan ini.', time: '1 minggu yang lalu', read: true, icon: '🔍' },
    { id: 9, type: 'Sistem', title: 'Peringatan Sensor IoT', desc: 'Suhu chiller #2 berada di atas ambang batas normal (6°C). Segera periksa.', time: '1 minggu yang lalu', read: true, icon: '🌡️' },
    { id: 10, type: 'Dokumen', title: 'Dokumen Berhasil Diunggah', desc: 'Hasil Uji Lab Kuartal 3 berhasil disimpan ke sistem blockchain.', time: '2 minggu yang lalu', read: true, icon: '🔗' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AppSidebar onNavigate={onNavigate} userRole={userRole} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <AppHeader onNavigate={onNavigate} userRole={userRole} onSetRole={onSetRole} />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t('Notifikasi')}</h1>
              <p className="text-sm text-gray-500">Dashboard &gt; {t('Notifikasi')}</p>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2">
                <span className="text-xl">📩</span>
                <div>
                  <p className="text-xs text-gray-500">Belum Dibaca</p>
                  <p className="font-bold text-gray-800">3</p>
                </div>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2">
                <span className="text-xl">✅</span>
                <div>
                  <p className="text-xs text-gray-500">Verifikasi</p>
                  <p className="font-bold text-gray-800">2</p>
                </div>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2">
                <span className="text-xl">🛒</span>
                <div>
                  <p className="text-xs text-gray-500">Pesanan</p>
                  <p className="font-bold text-gray-800">1</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex overflow-x-auto gap-2 scrollbar-hide">
                {filters.map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === f ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button className="text-sm font-medium text-green-600 whitespace-nowrap hover:underline">
                {t('Tandai Semua Dibaca')}
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {notifications.filter(n => filter === 'Semua' || n.type === filter).map(notif => (
                <div key={notif.id} className={`p-4 flex gap-4 transition-colors hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-green-50/30 border-l-4 border-l-green-500' : 'border-l-4 border-l-transparent'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0 ${!notif.read ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {notif.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`text-sm ${!notif.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{notif.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{notif.desc}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                        {notif.type}
                      </span>
                      {!notif.read && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
