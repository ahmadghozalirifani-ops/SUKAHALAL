import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';
import { UserRole } from '../App';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function LoginSeller({ onNavigate, onSetRole }: Props) {
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['8', '9', '0', '1', '2', '3']);
  const [remember, setRemember] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onSetRole('seller');
    onNavigate('dashboard');
  };

  const currentLang = i18n.language === 'en' ? 'EN' : 'ID';

  return (
    <div className="min-h-screen bg-[#fafcfb] font-sans flex flex-col justify-between relative overflow-hidden">
      {/* Background Graphic Elements */}
      <div className="absolute top-1/4 right-12 w-32 h-32 rounded-full border-4 border-amber-100/50 opacity-40 pointer-events-none" />
      <div className="absolute top-12 right-24 text-6xl text-amber-200/40 pointer-events-none select-none">🌙</div>
      <div className="absolute bottom-16 right-16 opacity-10 pointer-events-none select-none text-8xl">📦</div>

      {/* Top Navigation Bar with Logo */}
      <header className="w-full px-8 py-5 flex items-center justify-between z-20">
        <div className="flex items-center">
          <Logo size="md" onClick={() => onNavigate('landing')} />
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1 font-semibold text-gray-700 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs">
            <button 
              onClick={() => i18n.changeLanguage('id')} 
              className={`cursor-pointer ${currentLang === 'ID' ? 'text-green-700 underline font-bold' : 'text-gray-400 hover:text-gray-700'}`}
            >
              ID
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => i18n.changeLanguage('en')} 
              className={`cursor-pointer ${currentLang === 'EN' ? 'text-green-700 underline font-bold' : 'text-gray-400 hover:text-gray-700'}`}
            >
              EN
            </button>
          </div>
          <button 
            onClick={() => onNavigate('tutorial')} 
            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-500 hover:bg-gray-100 cursor-pointer"
            title="Bantuan"
          >
            ?
          </button>
        </div>
      </header>

      {/* Main Login Card matching the uploaded screenshot */}
      <main className="flex-1 flex items-center justify-center px-4 py-6 z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 w-full max-w-md md:max-w-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Masuk sebagai Penjual (Seller)
            </h1>
            <p className="text-gray-500 text-sm">
              Silakan masuk untuk mengelola inventaris Halal Anda.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email / Username</label>
              <input 
                type="text" 
                defaultValue="mail@seller.id" 
                required 
                className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" 
                placeholder="Masukan email atau username Anda" 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Kata Sandi (Password)</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  defaultValue="password123" 
                  required 
                  className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none pr-10 transition-all" 
                  placeholder="Masukan kata sandi Anda" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm cursor-pointer"
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nomor NPWP (15 Digit)</label>
              <input 
                type="text" 
                defaultValue="12.345.678.9-012.345" 
                className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" 
                placeholder="Masukan 15 digit NPWP Perusahaan" 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Kode OTP BPJPH</label>
              <div className="flex gap-2 items-center">
                <div className="flex gap-1.5 flex-1">
                  {otp.map((d, i) => (
                    <input 
                      key={i} 
                      type="text" 
                      maxLength={1} 
                      value={d} 
                      onChange={e => {
                        const next = [...otp];
                        next[i] = e.target.value;
                        setOtp(next);
                      }}
                      className="w-10 h-10 text-center text-base font-bold bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-green-500 outline-none" 
                    />
                  ))}
                </div>
                <button 
                  type="button" 
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  ⏱ Kirim OTP (60s)
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={remember} 
                  onChange={e => setRemember(e.target.checked)} 
                  className="w-4 h-4 accent-amber-600 rounded" 
                />
                <span className="text-gray-700 font-medium">Ingat saya</span>
              </label>
              <button 
                type="button" 
                onClick={() => alert('Link pemulihan kata sandi telah dikirim ke email Anda.')} 
                className="text-gray-600 hover:text-amber-700 underline font-medium cursor-pointer"
              >
                Lupa Kata Sandi?
              </button>
            </div>

            {/* Amber golden button from screenshot */}
            <button 
              type="submit" 
              className="w-full mt-2 bg-[#d97706] hover:bg-[#b45309] text-white font-bold py-3 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              Masuk Sekarang →
            </button>

            <p className="text-center text-xs text-gray-500 pt-2">
              Belum punya akun?{' '}
              <button 
                type="button" 
                onClick={() => onNavigate('register')} 
                className="text-gray-900 font-bold underline hover:text-green-700 cursor-pointer"
              >
                Daftar
              </button>
            </p>
          </form>
        </div>
      </main>

      {/* Footer matching screenshot */}
      <footer className="w-full text-center py-4 text-xs text-gray-400 z-10 flex items-center justify-center gap-2">
        <span>© 2024 Halal Supply-Chain Indonesia. Semua hak dilindungi.</span>
        <span className="text-green-600">🛡️</span>
        <span className="text-blue-600">✓</span>
      </footer>
    </div>
  );
}
