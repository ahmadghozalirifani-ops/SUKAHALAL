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
    <div className="min-h-screen flex font-sans" style={{ background: '#FAFAF8' }}>

      {/* ─── Left Panel: Branding ─── */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #0C1A3A 0%, #1E3A8A 50%, #1D4ED8 100%)',
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'rgba(96,165,250,0.12)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full pointer-events-none" style={{ background: 'rgba(59,130,246,0.15)', filter: 'blur(50px)' }} />

        <div className="relative z-10">
          <Logo size="md" onClick={() => onNavigate('landing')} />
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
            >
              🚚 Portal Distributor & Ekspedisi
            </div>
            <h1 className="font-heading text-4xl font-black text-white leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Kelola Armada<br />Logistik Halal
            </h1>
            <p className="text-blue-200 text-sm mt-3 leading-relaxed">
              Pantau armada, suhu cold-chain real-time, segel RFID, dan pastikan setiap pengiriman memenuhi protokol logistik halal.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: '❄️', text: 'Monitoring suhu cold-chain real-time' },
              { icon: '📡', text: 'GPS tracking & segel RFID armada' },
              { icon: '🛡️', text: 'SOP sanitasi bebas najis terverifikasi' },
              { icon: '📋', text: 'Manifest muatan & riwayat pengiriman' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-blue-100">
                <span className="text-base">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* IoT Live Card */}
          <div
            className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-blue-300">Status IoT Live</div>
              <span className="status-live"></span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-blue-300">Suhu Armada</div>
                <div className="text-lg font-black text-white">-18.4°C</div>
              </div>
              <div>
                <div className="text-xs text-blue-300">Segel RFID</div>
                <div className="text-lg font-black" style={{ color: '#4ADE80' }}>100% Aman</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-blue-400 text-[11px]">
          © {new Date().getFullYear()} SUKAHALAL. Platform Halal Terpadu Indonesia.
        </div>
      </div>

      {/* ─── Right Panel: Form ─── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-12">
        <div className="lg:hidden flex items-center justify-between mb-12">
          <Logo size="md" onClick={() => onNavigate('landing')} />
          <div className="flex items-center gap-1 text-xs font-semibold">
            <button onClick={() => i18n.changeLanguage('id')} className={`px-2 py-1 rounded cursor-pointer ${currentLang === 'ID' ? 'text-blue-700 font-bold' : 'text-slate-400'}`}>ID</button>
            <span className="text-slate-200">|</span>
            <button onClick={() => i18n.changeLanguage('en')} className={`px-2 py-1 rounded cursor-pointer ${currentLang === 'EN' ? 'text-blue-700 font-bold' : 'text-slate-400'}`}>EN</button>
          </div>
        </div>

        <div className="max-w-sm w-full mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
            <button onClick={() => onNavigate('landing')} className="hover:text-slate-700 transition-colors cursor-pointer">Beranda</button>
            <span>/</span>
            <span className="text-slate-600 font-medium">Masuk sebagai Distributor</span>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3" style={{ background: 'rgba(37,99,235,0.08)', color: '#2563EB' }}>
              🚚 Portal Distributor & Ekspedisi
            </div>
            <h2 className="font-heading text-2xl font-black text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Masuk ke Sistem Logistik
            </h2>
            <p className="text-slate-500 text-sm mt-1">Pantau armada dan kelola pengiriman halal secara real-time.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email / ID Perusahaan</label>
              <input type="text" required placeholder="admin@poslogistikhalal.com" className="input-elegant" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <button type="button" className="text-[11px] font-semibold cursor-pointer" style={{ color: '#2563EB' }}>Lupa password?</button>
              </div>
              <input type="password" required placeholder="••••••••" className="input-elegant" />
            </div>

            <div className="rounded-2xl p-4" style={{ background: '#EFF6FF', border: '1px solid rgba(37,99,235,0.15)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">Otentikasi 2FA Wajib</span>
                <span className="status-live"></span>
              </div>
              <p className="text-[11px] text-blue-600">Kode OTP telah dikirim ke email & WhatsApp terdaftar perusahaan Anda.</p>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" className="rounded accent-blue-600 cursor-pointer" />
              <span className="text-xs text-slate-600">Ingat perangkat operasional ini</span>
            </label>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl text-sm font-bold text-white transition-all cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #1E3A8A, #2563EB)',
                boxShadow: '0 4px 20px rgba(37,99,235,0.35)',
              }}
            >
              Masuk ke Sistem Logistik →
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Belum terdaftar?{' '}
            <button onClick={() => onNavigate('register')} className="font-bold cursor-pointer hover:underline" style={{ color: '#2563EB' }}>
              Daftarkan Perusahaan
            </button>
          </p>

          <button onClick={() => onNavigate('landing')} className="w-full mt-4 text-center text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            ← Kembali ke Beranda Publik
          </button>
        </div>
      </div>

      <div className="fixed top-5 right-6 hidden lg:flex items-center gap-1 text-xs font-semibold">
        <button onClick={() => i18n.changeLanguage('id')} className={`px-2 py-1 rounded cursor-pointer ${currentLang === 'ID' ? 'text-blue-700 font-bold' : 'text-slate-400 hover:text-slate-700'}`}>ID</button>
        <span className="text-slate-300">|</span>
        <button onClick={() => i18n.changeLanguage('en')} className={`px-2 py-1 rounded cursor-pointer ${currentLang === 'EN' ? 'text-blue-700 font-bold' : 'text-slate-400 hover:text-slate-700'}`}>EN</button>
      </div>
    </div>
  );
}
