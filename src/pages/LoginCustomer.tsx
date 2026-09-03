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
    <div className="min-h-screen flex font-sans" style={{ background: '#FAFAF8' }}>

      {/* ─── Left Panel: Branding ─── */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #4C1D95 0%, #7C3AED 50%, #5B21B6 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'rgba(167,139,250,0.15)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full pointer-events-none" style={{ background: 'rgba(124,58,237,0.2)', filter: 'blur(50px)' }} />

        <div className="relative z-10">
          <Logo size="md" onClick={() => onNavigate('landing')} />
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
            >
              🛍️ Portal Konsumen
            </div>
            <h1 className="font-heading text-4xl font-black text-white leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Belanja Produk<br />Halal Terjamin
            </h1>
            <p className="text-purple-200 text-sm mt-3 leading-relaxed">
              Temukan ribuan produk halal bersertifikat BPJPH. Lacak asal-usul bahan baku dari sumber hingga ke tanganmu.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: '✅', text: '45.000+ produk halal terverifikasi' },
              { icon: '📱', text: 'QR traceability dari ladang ke meja makan' },
              { icon: '🚚', text: 'Pengiriman cold-chain & logistik bersertifikat' },
              { icon: '💳', text: 'HalalPay untuk kemudahan transaksi' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-purple-100">
                <span className="text-base">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-purple-300 text-[11px]">
          © {new Date().getFullYear()} SUKAHALAL. Platform Halal Terpadu Indonesia.
        </div>
      </div>

      {/* ─── Right Panel: Form ─── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-12">

        {/* Top nav */}
        <div className="flex items-center justify-between mb-12 lg:hidden">
          <Logo size="md" onClick={() => onNavigate('landing')} />
          <div className="flex items-center gap-1 text-xs font-semibold">
            <button onClick={() => i18n.changeLanguage('id')} className={`px-2 py-1 rounded cursor-pointer ${currentLang === 'ID' ? 'text-violet-700 font-bold' : 'text-slate-400'}`}>ID</button>
            <span className="text-slate-200">|</span>
            <button onClick={() => i18n.changeLanguage('en')} className={`px-2 py-1 rounded cursor-pointer ${currentLang === 'EN' ? 'text-violet-700 font-bold' : 'text-slate-400'}`}>EN</button>
          </div>
        </div>

        <div className="max-w-sm w-full mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
            <button onClick={() => onNavigate('landing')} className="hover:text-slate-700 transition-colors cursor-pointer">Beranda</button>
            <span>/</span>
            <span className="text-slate-600 font-medium">Masuk sebagai Konsumen</span>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3" style={{ background: 'rgba(124,58,237,0.08)', color: '#7C3AED' }}>
              🛍️ Portal Konsumen
            </div>
            <h2 className="font-heading text-2xl font-black text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Selamat Datang Kembali
            </h2>
            <p className="text-slate-500 text-sm mt-1">Masuk untuk menikmati pengalaman belanja halal terbaik.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email / No. HP</label>
              <input
                type="text"
                required
                placeholder="nama@email.com atau 08xxxxxxxxxx"
                className="input-elegant"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <button type="button" className="text-[11px] font-semibold cursor-pointer transition-colors" style={{ color: '#7C3AED' }}>Lupa password?</button>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="input-elegant"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl text-sm font-bold text-white transition-all cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
                  boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
                }}
              >
                Masuk ke Akun Saya
              </button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-1 h-px" style={{ background: '#E8EDF2' }} />
              <span className="px-3 text-[11px] text-slate-400 font-medium">atau</span>
              <div className="flex-1 h-px" style={{ background: '#E8EDF2' }} />
            </div>

            <button
              type="button"
              onClick={(e) => handleLogin(e as any)}
              className="w-full py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
              style={{ background: 'white', border: '1.5px solid #E8EDF2', color: '#334155', boxShadow: '0 1px 4px rgba(15,23,42,0.06)' }}
            >
              📱 Login Cepat dengan OTP
            </button>

            <div className="p-4 rounded-2xl" style={{ background: '#F8FAFC', border: '1px solid #E8EDF2' }}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-0.5 accent-violet-600 cursor-pointer" />
                <span className="text-xs text-slate-500 leading-relaxed">
                  Saya beragama Non-Muslim (Informasi ini digunakan semata-mata untuk penyesuaian rekomendasi produk)
                </span>
              </label>
            </div>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Belum punya akun?{' '}
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="font-bold cursor-pointer hover:underline"
              style={{ color: '#7C3AED' }}
            >
              Daftar sekarang
            </button>
          </p>

          <button
            onClick={() => onNavigate('landing')}
            className="w-full mt-4 text-center text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            ← Kembali ke Beranda Publik
          </button>
        </div>
      </div>

      {/* Language toggle for desktop right panel */}
      <div className="fixed top-5 right-6 hidden lg:flex items-center gap-1 text-xs font-semibold">
        <button onClick={() => i18n.changeLanguage('id')} className={`px-2 py-1 rounded cursor-pointer ${currentLang === 'ID' ? 'text-violet-700 font-bold' : 'text-slate-400 hover:text-slate-700'}`}>ID</button>
        <span className="text-slate-300">|</span>
        <button onClick={() => i18n.changeLanguage('en')} className={`px-2 py-1 rounded cursor-pointer ${currentLang === 'EN' ? 'text-violet-700 font-bold' : 'text-slate-400 hover:text-slate-700'}`}>EN</button>
      </div>
    </div>
  );
}
