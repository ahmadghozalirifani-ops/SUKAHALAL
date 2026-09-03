import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { UserRole } from '../App'
import Logo from '../components/Logo'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

export default function LoginSeller({ onNavigate, onSetRole }: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'EN' : 'ID'
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [otp, setOtp] = useState(['8', '9', '0', '1', '2', '3'])
  const [otpTimer] = useState(60)
  const [showForgot, setShowForgot] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)

  function handleLogin() {
    onSetRole('seller')
    onNavigate('dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-gray-50 to-amber-50 flex flex-col font-['Inter',sans-serif] relative overflow-hidden">
      <div className="absolute top-20 left-8 w-6 h-6 rounded-full bg-green-400 opacity-40 pointer-events-none" />
      <div className="absolute bottom-32 left-12 w-4 h-4 rounded-full bg-green-600 opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-12 w-8 h-8 rounded-full bg-amber-300 opacity-30 pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-5 h-5 rounded-full bg-green-500 opacity-40 pointer-events-none" />
      <div className="absolute top-12 right-24 text-5xl opacity-20 pointer-events-none">🌙</div>

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4">
        <Logo onClick={() => onNavigate('landing')} />
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-gray-200 text-xs">
            <button onClick={() => i18n.changeLanguage('id')} className={lang === 'ID' ? 'font-bold text-green-700' : 'text-gray-400 hover:text-gray-700'}>ID</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => i18n.changeLanguage('en')} className={lang === 'EN' ? 'font-bold text-green-700' : 'text-gray-400 hover:text-gray-700'}>EN</button>
          </div>
          <button onClick={() => onNavigate('landing')} className="text-xs text-gray-500 hover:text-gray-700">← Beranda</button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg border border-gray-100">
          <div className="text-center mb-7">
            <h1 className="text-2xl font-extrabold text-gray-900">Masuk sebagai Penjual (Seller)</h1>
            <p className="text-gray-500 text-sm mt-2">Silakan masuk untuk mengelola inventaris & verifikasi produk Halal Anda.</p>
          </div>

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email / Username</label>
              <input type="text" defaultValue="mail@seller.id" className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi (Password)</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} defaultValue="password123" className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 pr-9" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                  {showPassword ? '👁' : '🙈'}
                </button>
              </div>
            </div>

            {/* NPWP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor NPWP (15 Digit)</label>
              <input type="text" defaultValue="12.345.678.9-012.345" className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>

            {/* OTP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kode OTP BPJPH</label>
              <div className="flex gap-2 items-center">
                <div className="flex gap-1.5 flex-1">
                  {otp.map((d, i) => (
                    <input key={i} type="text" maxLength={1} value={d}
                      onChange={e => { const next = [...otp]; next[i] = e.target.value; setOtp(next) }}
                      className="w-10 h-10 text-center border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400" />
                  ))}
                </div>
                <button className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap cursor-pointer shadow-xs">
                  ⏱ Kirim OTP ({otpTimer}s)
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-4 h-4 accent-green-600 rounded" />
                <span className="text-sm text-gray-600">Ingat saya</span>
              </label>
              <button onClick={() => setShowForgot(true)} className="text-sm text-green-600 hover:text-green-700 font-medium underline cursor-pointer">Lupa Kata Sandi?</button>
            </div>

            {/* Submit */}
            <button onClick={handleLogin} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer">
              Masuk Sekarang →
            </button>

            <p className="text-center text-sm text-gray-500">
              Belum punya akun?{' '}
              <button onClick={() => onNavigate('register')} className="text-green-600 font-semibold hover:underline cursor-pointer">Daftar Sekarang</button>
            </p>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-xs text-gray-400">
        © 2024 SUKAHALAL Indonesia. Semua hak dilindungi.
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            {!forgotSent ? (
              <>
                <h2 className="font-extrabold text-gray-900 text-lg mb-2">Lupa Kata Sandi?</h2>
                <p className="text-sm text-gray-500 mb-4">Masukkan email terdaftar Anda. Kami akan mengirimkan link reset password.</p>
                <input type="email" placeholder="Email terdaftar Anda" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-green-400" />
                <div className="flex gap-3">
                  <button onClick={() => setShowForgot(false)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50 cursor-pointer">Batal</button>
                  <button onClick={() => setForgotSent(true)} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors cursor-pointer">Kirim Link</button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-3">📧</div>
                <h2 className="font-extrabold text-gray-900 text-lg mb-2">Email Terkirim!</h2>
                <p className="text-sm text-gray-500 mb-4">Silakan cek inbox email Anda untuk link reset password.</p>
                <button onClick={() => { setShowForgot(false); setForgotSent(false) }} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors cursor-pointer">
                  Tutup
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
