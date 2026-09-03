import React from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';
import { UserRole } from '../App';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function LoginCustomer({ onNavigate, userRole, onSetRole }: Props) {
  const { t, i18n } = useTranslation();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onSetRole('customer');
    onNavigate('product-catalog');
  };

  const currentLang = i18n.language === 'en' ? 'EN' : 'ID';

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 font-sans flex flex-col justify-between relative overflow-hidden">
      {/* Top Navigation Bar with Logo */}
      <header className="w-full px-8 py-5 flex items-center justify-between z-20">
        <Logo size="md" onClick={() => onNavigate('landing')} />
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1 font-semibold text-gray-700 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs">
            <button 
              onClick={() => i18n.changeLanguage('id')} 
              className={`cursor-pointer ${currentLang === 'ID' ? 'text-violet-700 underline font-bold' : 'text-gray-400 hover:text-gray-700'}`}
            >
              ID
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => i18n.changeLanguage('en')} 
              className={`cursor-pointer ${currentLang === 'EN' ? 'text-violet-700 underline font-bold' : 'text-gray-400 hover:text-gray-700'}`}
            >
              EN
            </button>
          </div>
          <button 
            onClick={() => onNavigate('landing')} 
            className="text-xs text-violet-700 hover:underline font-medium"
          >
            ← Beranda
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto py-6 px-4 relative z-10 w-full">
        <div className="text-sm text-violet-700 mb-4 font-medium flex items-center gap-2">
          <button onClick={() => onNavigate('landing')} className="hover:underline">Home</button>
          <span>&gt;</span>
          <span>Login Konsumen</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-violet-100">
          <div className="bg-violet-600 p-6 text-center text-white">
            <h1 className="text-2xl font-bold mb-1">{t('auth.loginAs', 'Masuk sebagai')} {t('auth.customer', 'Konsumen')}</h1>
            <p className="text-violet-100 text-sm">Temukan produk halal terbaik</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email / No. HP</label>
              <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
            </div>
            
            <div className="flex items-center justify-center my-2">
              <span className="text-xs text-gray-400 font-bold uppercase px-2 bg-white z-10 relative">Atau</span>
              <div className="absolute w-full h-px bg-gray-200 left-0"></div>
            </div>

            <button type="button" className="w-full bg-white border-2 border-violet-200 hover:border-violet-500 text-violet-700 font-bold py-2.5 rounded-xl transition-all">
              📱 Login dengan OTP (SMS/WhatsApp)
            </button>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded text-violet-600 focus:ring-violet-500" />
                <span className="text-sm text-gray-600 leading-tight">
                  Saya beragama Non-Muslim (Informasi ini digunakan semata-mata untuk penyesuaian rekomendasi produk)
                </span>
              </label>
            </div>

            <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl shadow-md transition-all">
              {t('auth.login', 'Masuk')}
            </button>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Belum punya akun? <button type="button" onClick={() => onNavigate('register')} className="text-violet-600 font-bold hover:underline">Daftar sekarang</button>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
