import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

const regions = ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Banten', 'Sumatera Utara', 'Sulawesi Selatan']

export default function LoginDistributor({ onNavigate, onSetRole }: Props) {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [connectBPJPH, setConnectBPJPH] = useState(true)
  const [region, setRegion] = useState('DKI Jakarta')
  const [showForgot, setShowForgot] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)

  function handleLogin() {
    onSetRole('distributor')
    onNavigate('dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex flex-col items-center justify-center px-4 font-['Inter',sans-serif] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-1/4 right-8 text-6xl opacity-10 pointer-events-none">🗺️</div>

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10 border border-gray-100">
        <div className="absolute -top-4 right-6 w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center shadow-md">
          <span className="text-white text-xs font-bold">BP</span>
        </div>

        <div className="flex items-center gap-2 mb-5 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">S</div>
          <span className="font-extrabold text-green-700 text-sm">SUKAHALAL</span>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">Masuk sebagai Distributor</h1>
          <p className="text-xs text-gray-500 mt-1">Kelola jaringan distribusi produk halal bersertifikat</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email / Username</label>
            <input type="text" defaultValue="email@contoh.com" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} defaultValue="password123" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-9" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm cursor-pointer">
                {showPassword ? '👁' : '🙈'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Izin Distributor</label>
            <input type="text" defaultValue="REG1234567890" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region / Wilayah Distribusi</label>
            <div className="relative">
              <select value={region} onChange={e => setRegion(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none bg-white">
                {regions.map(r => <option key={r}>{r}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 space-y-2 border border-blue-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={connectBPJPH} onChange={e => setConnectBPJPH(e.target.checked)} className="w-4 h-4 accent-blue-600 rounded" />
              <span className="text-sm font-medium text-gray-700">Hubungkan ke BPJPH (API SIHALAL)</span>
            </label>
            {connectBPJPH && (
              <div>
                <div className="text-xs text-gray-500 mb-1">API-Key</div>
                <input type="text" defaultValue="example_bpjph_api_key_456..." className="w-full border border-blue-200 bg-white rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-4 h-4 accent-blue-600 rounded" />
              <span className="text-sm text-gray-600">Ingat saya</span>
            </label>
            <button onClick={() => setShowForgot(true)} className="text-sm text-blue-600 hover:text-blue-700 font-medium underline cursor-pointer">Lupa Kata Sandi?</button>
          </div>

          <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-sm cursor-pointer">
            Masuk Sekarang →
          </button>

          <p className="text-center text-sm text-gray-500">
            Belum punya akun?{' '}
            <button onClick={() => onNavigate('register')} className="text-blue-600 font-semibold hover:underline cursor-pointer">Daftar</button>
          </p>
        </div>
      </div>

      <button onClick={() => onNavigate('landing')} className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
        ← Kembali ke Beranda
      </button>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            {!forgotSent ? (
              <>
                <h2 className="font-extrabold text-gray-900 text-lg mb-2">Lupa Kata Sandi?</h2>
                <p className="text-sm text-gray-500 mb-4">Masukkan email terdaftar Anda untuk menerima link reset password.</p>
                <input type="email" placeholder="Email terdaftar Anda" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <div className="flex gap-3">
                  <button onClick={() => setShowForgot(false)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50 cursor-pointer">Batal</button>
                  <button onClick={() => setForgotSent(true)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors cursor-pointer">Kirim Link</button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-3">📧</div>
                <h2 className="font-extrabold text-gray-900 text-lg mb-2">Email Terkirim!</h2>
                <p className="text-sm text-gray-500 mb-4">Silakan cek inbox email Anda untuk link reset password.</p>
                <button onClick={() => { setShowForgot(false); setForgotSent(false) }} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors cursor-pointer">Tutup</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
