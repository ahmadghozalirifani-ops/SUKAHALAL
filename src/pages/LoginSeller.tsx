import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import { UserRole } from '../App';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function LoginSeller({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onSetRole('seller');
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-green-50 font-sans relative">
      <AppHeader onNavigate={onNavigate} userRole={userRole} />
      
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5L22.5 16 25 13.5V0h2v13.5L29.5 16 32 18.5V20h8v2h-8v1.5L29.5 26 27 28.5V40h-2V28.5L22.5 26 20 23.5V20.5zM20 20v-2H2v2h18zm2 2v2H2v-2h20zm0-4v-2H2v2h20zm2-2l2.5-2.5L29 16l-2.5 2.5L24 16zm0 4l2.5 2.5L29 20l-2.5-2.5L24 20z' fill='%2316a34a' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}></div>

      <main className="max-w-md mx-auto pt-32 pb-16 px-4 relative z-10">
        <div className="text-sm text-green-700 mb-4 font-medium flex items-center gap-2">
          <button onClick={() => onNavigate('landing')} className="hover:underline">Home</button>
          <span>&gt;</span>
          <span>Login Penjual</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
          <div className="bg-green-700 p-6 text-center text-white">
            <h1 className="text-2xl font-bold mb-1">{t('auth.loginAs', 'Masuk sebagai')} {t('auth.seller', 'Penjual')}</h1>
            <p className="text-green-100 text-sm">Kelola toko halal Anda</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email / Username</label>
              <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="nama@email.com" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600">
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NPWP Perusahaan</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="00.000.000.0-000.000" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OTP BPJPH (Opsional)</label>
              <div className="flex justify-between gap-2">
                {[1,2,3,4,5,6].map(i => (
                  <input key={i} type="text" maxLength={1} className="w-10 h-10 text-center text-lg font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                <span className="text-gray-600">Ingat Saya</span>
              </label>
              <button type="button" className="text-green-600 font-medium hover:underline">Lupa Password?</button>
            </div>

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-md transition-all">
              {t('auth.login', 'Masuk')}
            </button>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Belum punya akun? <button type="button" onClick={() => onNavigate('register')} className="text-green-600 font-bold hover:underline">Daftar sekarang</button>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
