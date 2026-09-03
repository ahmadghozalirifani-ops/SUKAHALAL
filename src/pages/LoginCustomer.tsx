import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

export default function LoginCustomer({ onNavigate, onSetRole }: Props) {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [nonMuslim, setNonMuslim] = useState(true)
  const [showOTP, setShowOTP] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', ''])

  function handleLogin() {
    onSetRole('customer')
    onNavigate('product-catalog')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex flex-col items-center justify-center px-4 font-['Inter',sans-serif]">
      <div className="flex items-center gap-2 mb-5 cursor-pointer" onClick={() => onNavigate('landing')}>
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">S</div>
        <span className="font-extrabold text-green-700">SUKAHALAL</span>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
            Masuk sebagai Konsumen<br/>(Customer)
          </h1>
          <p className="text-xs text-gray-500 mt-1">Belanja produk halal aman, bersih, dan terpercaya</p>
        </div>

        {!showOTP ? (
          <div className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
              <input type="text" placeholder="Email atau No Handphone"
                className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
              <input type={showPassword ? 'text' : 'password'} placeholder="Password"
                className="w-full border border-gray-200 rounded-xl pl-9 pr-9 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm cursor-pointer">
                {showPassword ? '👁' : '🙈'}
              </button>
            </div>

            <button onClick={() => setShowOTP(true)} className="w-full border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-600 font-semibold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <span>📱</span> Login dengan Kode OTP
            </button>

            <div className="flex items-start justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer shrink-0">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-4 h-4 accent-purple-600 rounded mt-0.5" />
                <span className="text-xs text-gray-600">Ingat saya</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={nonMuslim} onChange={e => setNonMuslim(e.target.checked)} className="w-4 h-4 accent-purple-600 rounded mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-gray-700 font-semibold">Saya bukan Muslim</span>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">Halal Tayiban berarti produk bersih, sehat, & ramah semua kalangan</p>
                </div>
              </label>
            </div>

            <button onClick={handleLogin} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl text-sm tracking-wide transition-colors shadow-sm cursor-pointer">
              MASUK SEKARANG →
            </button>

            <p className="text-center text-sm text-gray-500">
              Belum punya akun?{' '}
              <button onClick={() => onNavigate('register')} className="text-purple-600 font-semibold hover:underline cursor-pointer">Daftar</button>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {!otpSent ? (
              <>
                <p className="text-sm text-gray-500 text-center">Masukkan nomor handphone untuk menerima OTP</p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📱</span>
                  <input type="text" placeholder="+62 8xx-xxxx-xxxx"
                    className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <button onClick={() => setOtpSent(true)} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer shadow-sm">
                  Kirim OTP
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500 text-center">Masukkan kode OTP yang dikirim ke nomor Anda</p>
                <div className="flex justify-center gap-2">
                  {otpCode.map((d, i) => (
                    <input key={i} type="text" maxLength={1} value={d}
                      onChange={e => { const n = [...otpCode]; n[i] = e.target.value; setOtpCode(n) }}
                      className="w-10 h-12 text-center border border-gray-200 rounded-xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-purple-400" />
                  ))}
                </div>
                <button onClick={handleLogin} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer shadow-sm">
                  Verifikasi OTP
                </button>
              </>
            )}
            <button onClick={() => { setShowOTP(false); setOtpSent(false) }} className="w-full text-xs text-gray-400 hover:text-gray-600 cursor-pointer">
              ← Login dengan Password
            </button>
          </div>
        )}
      </div>

      <button onClick={() => onNavigate('landing')} className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
        ← Kembali ke Beranda
      </button>
    </div>
  )
}
