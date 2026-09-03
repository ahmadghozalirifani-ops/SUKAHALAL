import React from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';
import { UserRole } from '../App';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function LoginDistributor({ onNavigate, userRole, onSetRole }: Props) {
  const { t, i18n } = useTranslation();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onSetRole('distributor');
    onNavigate('dashboard');
  };

  const currentLang = i18n.language === 'en' ? 'EN' : 'ID';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-sans flex flex-col justify-between relative overflow-hidden">
      {/* Top Navigation Bar with Logo */}
      <header className="w-full px-8 py-5 flex items-center justify-between z-20">
        <Logo size="md" onClick={() => onNavigate('landing')} />
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1 font-semibold text-gray-700 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs">
            <button 
              onClick={() => i18n.changeLanguage('id')} 
              className={`cursor-pointer ${currentLang === 'ID' ? 'text-blue-700 underline font-bold' : 'text-gray-400 hover:text-gray-700'}`}
            >
              ID
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => i18n.changeLanguage('en')} 
              className={`cursor-pointer ${currentLang === 'EN' ? 'text-blue-700 underline font-bold' : 'text-gray-400 hover:text-gray-700'}`}
            >
              EN
            </button>
          </div>
          <button 
            onClick={() => onNavigate('landing')} 
            className="text-xs text-blue-700 hover:underline font-medium"
          >
            ← Beranda
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto py-6 px-4 relative z-10 w-full">
        <div className="text-sm text-blue-700 mb-4 font-medium flex items-center gap-2">
          <button onClick={() => onNavigate('landing')} className="hover:underline">Home</button>
          <span>&gt;</span>
          <span>Login Distributor</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
          <div className="bg-blue-600 p-6 text-center text-white">
            <h1 className="text-2xl font-bold mb-1">{t('auth.loginAs', 'Masuk sebagai')} {t('auth.distributor', 'Distributor')}</h1>
            <p className="text-blue-100 text-sm">Kelola pengiriman & logistik halal</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Izin Distributor</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Wilayah Operasi</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                <option value="">Pilih Provinsi...</option>
                <option value="dki">DKI Jakarta</option>
                <option value="jabar">Jawa Barat</option>
                <option value="jateng">Jawa Tengah</option>
                <option value="jatim">Jawa Timur</option>
                <option value="banten">Banten</option>
                <option value="bali">Bali</option>
                <option value="sumut">Sumatera Utara</option>
              </select>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <input type="checkbox" id="bpjph" className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500" />
              <label htmlFor="bpjph" className="text-sm text-blue-800 font-medium">Sinkronisasi API BPJPH Otomatis</label>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all">
              {t('auth.login', 'Masuk')}
            </button>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Belum punya akun? <button type="button" onClick={() => onNavigate('register')} className="text-blue-600 font-bold hover:underline">Daftar sekarang</button>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
