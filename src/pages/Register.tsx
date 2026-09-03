import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';
import { UserRole } from '../App';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function Register({ onNavigate, userRole, onSetRole }: Props) {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<'seller' | 'distributor' | 'customer' | null>(null);
  
  const handleRoleSelect = (role: 'seller' | 'distributor' | 'customer') => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };
  
  const finishRegistration = () => {
    if (selectedRole) {
      onSetRole(selectedRole);
      onNavigate(selectedRole === 'customer' ? 'product-catalog' : 'dashboard');
    }
  };

  const currentLang = i18n.language === 'en' ? 'EN' : 'ID';

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      {/* Top Navigation Bar with Logo */}
      <header className="w-full px-8 py-5 flex items-center justify-between bg-white border-b border-gray-100 shadow-2xs">
        <Logo size="md" onClick={() => onNavigate('landing')} />
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1 font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
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
            onClick={() => onNavigate('landing')} 
            className="text-xs text-gray-500 hover:text-gray-700 font-medium"
          >
            ← Beranda
          </button>
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto py-10 px-4">
        <div className="text-sm text-slate-500 mb-6 font-medium flex items-center gap-2">
          <button onClick={() => onNavigate('landing')} className="hover:underline">Home</button>
          <span>&gt;</span>
          <span className="text-slate-800">Daftar Akun</span>
        </div>

        {/* Wizard Progress */}
        <div className="mb-8 flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 z-0 rounded-full">
            <div className={`h-full bg-emerald-500 rounded-full transition-all duration-300`} style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}></div>
          </div>
          {[1,2,3].map(i => (
             <div key={i} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= i ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
               {i}
             </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          {step === 1 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Pilih Peran Anda</h1>
                <p className="text-slate-600">Pilih jenis akun yang sesuai dengan kebutuhan Anda</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button onClick={() => handleRoleSelect('seller')} className="flex flex-col items-center p-6 border-2 border-slate-100 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-center group">
                  <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏪</span>
                  <h3 className="text-lg font-bold text-green-700 mb-2">Penjual / UMKM</h3>
                  <p className="text-sm text-slate-600">Jual produk halal Anda & kelola supply chain</p>
                </button>
                
                <button onClick={() => handleRoleSelect('distributor')} className="flex flex-col items-center p-6 border-2 border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center group">
                  <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">🚚</span>
                  <h3 className="text-lg font-bold text-blue-700 mb-2">Distributor</h3>
                  <p className="text-sm text-slate-600">Kelola pengiriman & logistik antar wilayah</p>
                </button>

                <button onClick={() => handleRoleSelect('customer')} className="flex flex-col items-center p-6 border-2 border-slate-100 rounded-xl hover:border-violet-500 hover:bg-violet-50 transition-all text-center group">
                  <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">🛍️</span>
                  <h3 className="text-lg font-bold text-violet-700 mb-2">Konsumen</h3>
                  <p className="text-sm text-slate-600">Beli produk halal & aman langsung dari sumbernya</p>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-8">
               <div className="mb-6 flex items-center gap-4 border-b border-slate-100 pb-4">
                 <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-600">← Kembali</button>
                 <h2 className="text-2xl font-bold text-slate-800">Isi Data Diri</h2>
               </div>
               
               <form onSubmit={handleRegister} className="space-y-5">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                     <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                     <input type="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                     <input type="password" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                     <div className="mt-2 flex gap-1 h-1">
                       <div className="w-1/3 bg-red-400 rounded-full"></div>
                       <div className="w-1/3 bg-slate-200 rounded-full"></div>
                       <div className="w-1/3 bg-slate-200 rounded-full"></div>
                     </div>
                     <span className="text-xs text-slate-500 mt-1 block">Kekuatan: Lemah</span>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Password</label>
                     <input type="password" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                   </div>
                 </div>

                 {selectedRole === 'seller' && (
                   <div className="bg-green-50 p-4 rounded-xl border border-green-100 mt-4 space-y-4">
                     <h4 className="font-bold text-green-800 text-sm">Data Tambahan Penjual</h4>
                     <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Nama Toko/Perusahaan</label>
                       <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Nomor NPWP</label>
                       <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white" />
                     </div>
                   </div>
                 )}

                 {selectedRole === 'distributor' && (
                   <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4 space-y-4">
                     <h4 className="font-bold text-blue-800 text-sm">Data Tambahan Distributor</h4>
                     <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Nama Ekspedisi/Logistik</label>
                       <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white" />
                     </div>
                   </div>
                 )}

                 <div className="pt-4">
                   <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition-all">
                     Lanjut
                   </button>
                 </div>
               </form>
            </div>
          )}

          {step === 3 && (
            <div className="p-10 text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Pendaftaran Berhasil!</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">Akun Anda telah berhasil dibuat. Silakan centang persetujuan di bawah ini untuk mulai menggunakan SUKAHALAL.</p>
              
              <div className="bg-slate-50 p-4 rounded-lg text-left border border-slate-200 mb-8 max-w-lg mx-auto">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-1 w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-sm text-slate-700">Saya menyetujui Syarat & Ketentuan serta Kebijakan Privasi dari platform SUKAHALAL.</span>
                </label>
              </div>

              <button onClick={finishRegistration} className={`w-full max-w-xs bg-${selectedRole === 'seller' ? 'green' : selectedRole === 'distributor' ? 'blue' : 'violet'}-600 hover:bg-${selectedRole === 'seller' ? 'green' : selectedRole === 'distributor' ? 'blue' : 'violet'}-700 text-white font-bold py-3 rounded-xl shadow-md transition-all`}>
                Mulai Gunakan SUKAHALAL
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
