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
    <div className="min-h-screen flex font-sans" style={{ background: '#FAFAF8' }}>

      {/* ─── Left Panel: Branding ─── */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #064E3B 0%, #0D7A55 50%, #065F46 100%)',
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'rgba(52,211,153,0.12)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full pointer-events-none" style={{ background: 'rgba(16,185,129,0.15)', filter: 'blur(50px)' }} />

        <div className="relative z-10">
          <Logo size="md" onClick={() => onNavigate('landing')} />
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
            >
              🏪 Portal Produsen & UMKM
            </div>
            <h1 className="font-heading text-4xl font-black text-white leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Kelola Bisnis Halal<br />Lebih Profesional
            </h1>
            <p className="text-emerald-200 text-sm mt-3 leading-relaxed">
              Dashboard terpadu untuk manajemen produk, sertifikasi BPJPH, rantai pasok, dan laporan penjualan UMKM Anda.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: '📦', text: 'Manajemen SKU & stok bahan baku (BOM)' },
              { icon: '🛡️', text: 'Proses sertifikasi SJPH & unggah dokumen' },
              { icon: '📊', text: 'Laporan penjualan & analitik produk' },
              { icon: '🚚', text: 'Integrasi rantai pasok & logistik halal' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-emerald-100">
                <span className="text-base">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Halal credential mini card */}
          <div
            className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-1">Terintegrasi dengan</div>
            <div className="text-white text-sm font-semibold">SIHALAL BPJPH Kementerian Agama RI</div>
            <div className="text-emerald-300 text-xs mt-0.5">Standar HAS 23000 & Fatwa MUI</div>
          </div>
        </div>

        <div className="relative z-10 text-emerald-400 text-[11px]">
          © {new Date().getFullYear()} SUKAHALAL. Platform Halal Terpadu Indonesia.
        </div>
      </div>

      {/* ─── Right Panel: Form ─── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-12">
        <div className="lg:hidden flex items-center justify-between mb-12">
          <Logo size="md" onClick={() => onNavigate('landing')} />
          <div className="flex items-center gap-1 text-xs font-semibold">
            <button onClick={() => i18n.changeLanguage('id')} className={`px-2 py-1 rounded cursor-pointer ${currentLang === 'ID' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>ID</button>
            <span className="text-slate-200">|</span>
            <button onClick={() => i18n.changeLanguage('en')} className={`px-2 py-1 rounded cursor-pointer ${currentLang === 'EN' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>EN</button>
          </div>
        </div>

        <div className="max-w-sm w-full mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
            <button onClick={() => onNavigate('landing')} className="hover:text-slate-700 transition-colors cursor-pointer">Beranda</button>
            <span>/</span>
            <span className="text-slate-600 font-medium">Masuk sebagai Penjual</span>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3" style={{ background: 'rgba(13,122,85,0.08)', color: '#0D7A55' }}>
              🏪 Portal Produsen / UMKM
            </div>
            <h2 className="font-heading text-2xl font-black text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Masuk ke Dashboard Anda
            </h2>
            <p className="text-slate-500 text-sm mt-1">Kelola bisnis halal dengan lebih mudah dan terstruktur.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email / NIB Usaha</label>
              <input type="text" required placeholder="nama@email.com atau NIB" className="input-elegant" defaultValue="admin@bundahalal.com" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <button type="button" className="text-[11px] font-semibold cursor-pointer" style={{ color: '#0D7A55' }}>Lupa password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="input-elegant pr-10"
                  defaultValue="password123"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors text-sm"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* OTP preview */}
            <div className="rounded-2xl p-4" style={{ background: '#F0FDF4', border: '1px solid rgba(13,122,85,0.15)' }}>
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-2">Kode OTP Terkirim ke +62 812 ****</div>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, i) => (
                  <div
                    key={i}
                    className="w-10 h-12 rounded-xl flex items-center justify-center text-lg font-black text-emerald-800"
                    style={{ background: 'white', border: '1.5px solid rgba(13,122,85,0.2)', boxShadow: '0 1px 4px rgba(13,122,85,0.1)' }}
                  >
                    {digit}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-emerald-700 text-center mt-2">Kode aktif selama 5 menit</p>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="rounded accent-emerald-600 cursor-pointer"
              />
              <span className="text-xs text-slate-600">Ingat perangkat ini selama 30 hari</span>
            </label>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl text-sm font-bold text-white transition-all cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #0D7A55, #059669)',
                boxShadow: '0 4px 20px rgba(13,122,85,0.35)',
              }}
            >
              Masuk ke Dashboard →
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Belum punya akun bisnis?{' '}
            <button onClick={() => onNavigate('register')} className="font-bold cursor-pointer hover:underline" style={{ color: '#0D7A55' }}>
              Daftarkan UMKM
            </button>
          </p>

          <button onClick={() => onNavigate('landing')} className="w-full mt-4 text-center text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            ← Kembali ke Beranda Publik
          </button>
        </div>
      </div>

      <div className="fixed top-5 right-6 hidden lg:flex items-center gap-1 text-xs font-semibold">
        <button onClick={() => i18n.changeLanguage('id')} className={`px-2 py-1 rounded cursor-pointer ${currentLang === 'ID' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-700'}`}>ID</button>
        <span className="text-slate-300">|</span>
        <button onClick={() => i18n.changeLanguage('en')} className={`px-2 py-1 rounded cursor-pointer ${currentLang === 'EN' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-700'}`}>EN</button>
      </div>
    </div>
  );
}
