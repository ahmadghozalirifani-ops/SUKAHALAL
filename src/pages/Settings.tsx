import { useState } from 'react'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

export default function Settings({ onNavigate, userRole }: Props) {
  const [name, setName] = useState(userRole === 'seller' ? 'Ahmad Seller' : userRole === 'distributor' ? 'PT Distribusi Halal' : 'Budi Customer')
  const [email, setEmail] = useState(userRole === 'seller' ? 'ahmad@seller.id' : userRole === 'distributor' ? 'info@distribusi.co.id' : 'budi@email.com')
  const [phone, setPhone] = useState('+62 812-3456-7890')
  const [lang, setLang] = useState<'ID' | 'EN'>('ID')
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifPush, setNotifPush] = useState(true)
  const [notifSMS, setNotifSMS] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'profil' | 'notifikasi' | 'keamanan' | 'preferensi'>('profil')

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const roleLabel = userRole === 'seller' ? 'Penjual (Seller)' : userRole === 'distributor' ? 'Distributor' : userRole === 'customer' ? 'Konsumen' : 'Guest'
  const roleColor = userRole === 'seller' ? 'bg-green-100 text-green-700' : userRole === 'distributor' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="font-extrabold text-green-700">SUKAHALAL</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${roleColor}`}>{roleLabel}</span>
            <button onClick={() => onNavigate('dashboard')} className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-xl font-extrabold text-gray-900 mb-1">Pengaturan</h1>
        <p className="text-sm text-gray-500 mb-6">Kelola profil dan preferensi akun Anda</p>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 mb-6">
          {([
            { id: 'profil', label: '👤 Profil', },
            { id: 'notifikasi', label: '🔔 Notifikasi' },
            { id: 'keamanan', label: '🔒 Keamanan' },
            { id: 'preferensi', label: '⚙️ Preferensi' },
          ] as const).map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-5 py-2.5 text-sm font-medium transition-colors ${
                activeTab === t.id ? 'text-green-600 border-b-2 border-green-600 -mb-px' : 'text-gray-500 hover:text-gray-700'
              }`}
            >{t.label}</button>
          ))}
        </div>

        {activeTab === 'profil' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">
                {userRole === 'seller' ? '🛒' : userRole === 'distributor' ? '🚛' : '👤'}
              </div>
              <div>
                <h2 className="font-bold text-gray-900">{name}</h2>
                <p className="text-sm text-gray-500">{email}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${roleColor}`}>{roleLabel}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                  <input type="text" value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
              </div>
              {userRole === 'seller' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NPWP Perusahaan</label>
                  <input type="text" defaultValue="12.345.678.9-012.345" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
              )}
              {userRole === 'distributor' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Izin Distributor</label>
                  <input type="text" defaultValue="REG1234567890" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
              )}
              <button onClick={handleSave}
                className={`w-full font-bold py-3 rounded-xl text-sm transition-colors ${saved ? 'bg-green-500 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                {saved ? '✓ Tersimpan!' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'notifikasi' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-gray-900 mb-4">Pengaturan Notifikasi</h3>
            {[
              { label: 'Notifikasi Email', desc: 'Terima pembaruan melalui email', checked: notifEmail, setter: setNotifEmail },
              { label: 'Push Notification', desc: 'Notifikasi real-time di browser', checked: notifPush, setter: setNotifPush },
              { label: 'Notifikasi SMS', desc: 'Terima SMS untuk pesanan penting', checked: notifSMS, setter: setNotifSMS },
            ].map(n => (
              <div key={n.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="text-sm font-medium text-gray-800">{n.label}</div>
                  <div className="text-xs text-gray-500">{n.desc}</div>
                </div>
                <button onClick={() => n.setter(!n.checked)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${n.checked ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${n.checked ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'keamanan' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-gray-900 mb-4">Keamanan Akun</h3>
            <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-800">Kata Sandi</div>
                <div className="text-xs text-gray-500">Terakhir diubah 30 hari yang lalu</div>
              </div>
              <button onClick={() => setShowPasswordModal(true)} className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                Ubah Password
              </button>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-800">Autentikasi 2 Faktor</div>
                <div className="text-xs text-gray-500">Tingkatkan keamanan akun Anda</div>
              </div>
              <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2.5 py-1 rounded-full">Belum Aktif</span>
            </div>
            <div className="p-4 bg-red-50 rounded-xl flex items-center justify-between border border-red-200">
              <div>
                <div className="text-sm font-medium text-red-700">Logout dari Semua Perangkat</div>
                <div className="text-xs text-red-400">Keluar dari seluruh sesi aktif</div>
              </div>
              <button onClick={() => onNavigate('logout')} className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                Logout
              </button>
            </div>
          </div>
        )}

        {activeTab === 'preferensi' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-gray-900 mb-4">Preferensi Tampilan</h3>
            <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-800">Bahasa / Language</div>
                <div className="text-xs text-gray-500">Pilih bahasa antarmuka</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setLang('ID')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${lang === 'ID' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
                  🇮🇩 Indonesia
                </button>
                <button onClick={() => setLang('EN')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${lang === 'EN' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
                  🇬🇧 English
                </button>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-800">Mode Gelap</div>
                <div className="text-xs text-gray-500">Tampilan lebih nyaman di malam hari</div>
              </div>
              <button onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-green-500' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <h2 className="font-extrabold text-gray-900 text-lg mb-4">Ubah Kata Sandi</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Password Lama</label>
                <input type="password" placeholder="Masukan password lama" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Password Baru</label>
                <input type="password" placeholder="Masukan password baru" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Konfirmasi Password</label>
                <input type="password" placeholder="Ulangi password baru" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowPasswordModal(false)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50">Batal</button>
                <button onClick={() => setShowPasswordModal(false)} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
