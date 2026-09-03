import React from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import { UserRole } from '../App';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function LoginDistributor({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onSetRole('distributor');
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-sans relative">
      <AppHeader onNavigate={onNavigate} userRole={userRole} />
      
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `radial-gradient(#2563eb 1px, transparent 1px)`,
        backgroundSize: `20px 20px`
      }}></div>

      <main className="max-w-md mx-auto pt-32 pb-16 px-4 relative z-10">
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
