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

export default function Settings({ onNavigate, userRole, onSetRole }: PageProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('Profil');

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#FAFAF8' }}>
      <AppSidebar onNavigate={onNavigate} userRole={userRole} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <AppHeader onNavigate={onNavigate} userRole={userRole} onSetRole={onSetRole} />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{t('Pengaturan')}</h1>
            <p className="text-sm text-gray-500">Dashboard &gt; {t('Pengaturan')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
            {/* Vertical Tabs */}
            <div className="w-full md:w-64 border-r border-gray-100 bg-gray-50/50">
              <div className="flex md:flex-col">
                {[
                  { id: 'Profil', icon: '👤' },
                  { id: 'Notifikasi', icon: '🔔' },
                  { id: 'Keamanan', icon: '🔒' },
                  { id: 'Preferensi', icon: '⚙️' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 md:flex-none flex items-center gap-3 px-6 py-4 text-sm font-medium border-l-4 transition-colors ${activeTab === tab.id ? 'border-green-600 bg-white text-green-700' : 'border-transparent text-gray-600 hover:bg-gray-100'}`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="hidden md:inline">{t(tab.id)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-8">
              
              {activeTab === 'Profil' && (
                <div className="max-w-2xl">
                  <h2 className="text-lg font-bold text-gray-800 mb-6">{t('Informasi Profil')}</h2>
                  
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl overflow-hidden relative group cursor-pointer">
                      👤
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs">Edit</span>
                      </div>
                    </div>
                    <div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Ubah Foto</button>
                      <p className="text-xs text-gray-500 mt-2">JPG, GIF atau PNG maksimal 2MB.</p>
                    </div>
                  </div>

                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('Nama Lengkap / Perusahaan')}</label>
                        <input type="text" defaultValue="Budi Santoso" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('Email')}</label>
                        <input type="email" defaultValue="budi@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('Nomor Telepon')}</label>
                        <input type="tel" defaultValue="081234567890" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{userRole === 'seller' ? t('NPWP Perusahaan') : t('ID Identitas')}</label>
                        <input type="text" defaultValue="12.345.678.9-012.000" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-6 flex justify-end">
                      <button type="button" className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                        {t('Simpan Perubahan')}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'Notifikasi' && (
                <div className="max-w-2xl">
                  <h2 className="text-lg font-bold text-gray-800 mb-6">{t('Pengaturan Notifikasi')}</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Saluran Komunikasi</h3>
                      <div className="space-y-3">
                        {['Email', 'Push Notification Browser', 'SMS (Hanya peringatan penting)'].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{item}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked={i !== 2} />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Jenis Peringatan</h3>
                      <div className="space-y-3">
                        {[
                          'Sertifikat Halal akan Expired (H-30)',
                          'Pesanan Masuk Baru',
                          'Stok Produk Menipis',
                          'Update Status Pengiriman',
                          'Laporan Audit Internal'
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{item}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked={i < 4} />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Keamanan' && (
                <div className="max-w-2xl">
                  <h2 className="text-lg font-bold text-gray-800 mb-6">{t('Keamanan Akun')}</h2>
                  
                  <div className="mb-8 p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        Autentikasi Dua Faktor (2FA)
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">Belum Aktif</span>
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Lindungi akun Anda dengan lapisan keamanan tambahan.</p>
                    </div>
                    <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900">Aktifkan</button>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-800 mb-4">Ubah Kata Sandi</h3>
                    <form className="space-y-4 max-w-sm">
                      <div>
                        <input type="password" placeholder="Kata Sandi Saat Ini" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                      </div>
                      <div>
                        <input type="password" placeholder="Kata Sandi Baru" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                      </div>
                      <div>
                        <input type="password" placeholder="Konfirmasi Kata Sandi Baru" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                      </div>
                      <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Perbarui Kata Sandi</button>
                    </form>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-800">Sesi Aktif</h3>
                      <button className="text-sm text-red-600 hover:underline">Keluar dari semua perangkat</button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">💻</span>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Windows • Chrome</p>
                            <p className="text-xs text-gray-500">Jakarta, Indonesia • Saat ini aktif</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Preferensi' && (
                <div className="max-w-2xl">
                  <h2 className="text-lg font-bold text-gray-800 mb-6">{t('Preferensi Tampilan & Regional')}</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('Bahasa')}</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                          <option>Bahasa Indonesia (ID)</option>
                          <option>English (EN)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('Zona Waktu')}</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                          <option>WIB (UTC+07:00)</option>
                          <option>WITA (UTC+08:00)</option>
                          <option>WIT (UTC+09:00)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('Mata Uang')}</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                          <option>Rupiah (IDR)</option>
                          <option>US Dollar (USD)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-800">Mode Gelap (Dark Mode)</p>
                          <p className="text-xs text-gray-500">Sesuaikan tampilan antarmuka</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-800">Tampilan Data Default</p>
                          <p className="text-xs text-gray-500">Pilih antara Card View atau Table View</p>
                        </div>
                        <div className="flex bg-gray-100 rounded-lg p-1">
                          <button className="px-3 py-1 bg-white shadow-sm rounded-md text-sm font-medium text-gray-800">Card</button>
                          <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-800">Table</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
