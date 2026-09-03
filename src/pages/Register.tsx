import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';
import { UserRole } from '../App';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

const roleOptions = [
  {
    role: 'seller' as const,
    emoji: '🏪',
    label: 'Penjual / UMKM',
    sub: 'Jual produk halal & kelola supply chain',
    color: '#0D7A55',
    bg: 'rgba(13,122,85,0.08)',
    border: 'rgba(13,122,85,0.25)',
    activeBg: 'rgba(13,122,85,0.1)',
    features: ['Manajemen SKU & bahan baku', 'Proses sertifikasi SJPH', 'Laporan penjualan', 'Integrasi logistik halal'],
  },
  {
    role: 'distributor' as const,
    emoji: '🚚',
    label: 'Distributor',
    sub: 'Kelola pengiriman & logistik halal',
    color: '#1D4ED8',
    bg: 'rgba(29,78,216,0.08)',
    border: 'rgba(29,78,216,0.25)',
    activeBg: 'rgba(29,78,216,0.1)',
    features: ['Monitoring armada GPS', 'Cold-chain real-time', 'SOP sanitasi halal', 'Manifest muatan digital'],
  },
  {
    role: 'customer' as const,
    emoji: '🛍️',
    label: 'Konsumen',
    sub: 'Beli produk halal dari sumbernya',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.08)',
    border: 'rgba(124,58,237,0.25)',
    activeBg: 'rgba(124,58,237,0.1)',
    features: ['Katalog 45.000+ produk halal', 'QR traceability bahan', 'Pengiriman tersertifikasi', 'HalalPay & dompet digital'],
  },
];

export default function Register({ onNavigate, userRole, onSetRole }: Props) {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<'seller' | 'distributor' | 'customer' | null>(null);
  const [agreed, setAgreed] = useState(false);

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
  const selectedRoleConfig = roleOptions.find(r => r.role === selectedRole);

  const steps = [
    { num: 1, label: 'Pilih Peran' },
    { num: 2, label: 'Data Akun' },
    { num: 3, label: 'Selesai' },
  ];

  return (
    <div className="min-h-screen font-sans" style={{ background: '#FAFAF8' }}>

      {/* ─── Header ─── */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: 'rgba(250,250,248,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(226,232,240,0.7)',
        }}
      >
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Logo size="md" onClick={() => onNavigate('landing')} />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs font-semibold">
              <button onClick={() => i18n.changeLanguage('id')} className={`px-2 py-1 rounded cursor-pointer ${currentLang === 'ID' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-700'}`}>ID</button>
              <span className="text-slate-300">|</span>
              <button onClick={() => i18n.changeLanguage('en')} className={`px-2 py-1 rounded cursor-pointer ${currentLang === 'EN' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-700'}`}>EN</button>
            </div>
            <button onClick={() => onNavigate('landing')} className="text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors cursor-pointer">
              ← Beranda
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-12 px-5">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <button onClick={() => onNavigate('landing')} className="hover:text-slate-700 cursor-pointer transition-colors">Beranda</button>
          <span>/</span>
          <span className="text-slate-600 font-medium">Daftar Akun</span>
        </div>

        {/* ─── Wizard Progress ─── */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            {/* Progress track */}
            <div
              className="absolute left-0 top-5 w-full h-0.5 z-0"
              style={{ background: '#E8EDF2' }}
            >
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: step === 1 ? '0%' : step === 2 ? '50%' : '100%',
                  background: 'linear-gradient(90deg, #0D7A55, #059669)',
                }}
              />
            </div>

            {steps.map((s, i) => (
              <div key={s.num} className="flex flex-col items-center gap-2 relative z-10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300"
                  style={step >= s.num
                    ? { background: 'linear-gradient(135deg, #0D7A55, #059669)', color: 'white', boxShadow: '0 2px 12px rgba(13,122,85,0.35)' }
                    : { background: 'white', color: '#94A3B8', border: '2px solid #E8EDF2' }
                  }
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className="text-xs font-semibold" style={{ color: step >= s.num ? '#0D7A55' : '#94A3B8' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Step 1: Role Selection ─── */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h1 className="font-heading text-3xl font-black text-slate-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Daftar ke SUKAHALAL
              </h1>
              <p className="text-slate-500 text-sm">Pilih jenis akun yang sesuai dengan kebutuhan Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {roleOptions.map(opt => (
                <button
                  key={opt.role}
                  onClick={() => handleRoleSelect(opt.role)}
                  className="flex flex-col p-6 rounded-3xl text-left transition-all cursor-pointer group"
                  style={{
                    background: 'white',
                    border: `1.5px solid #E8EDF2`,
                    boxShadow: '0 2px 8px rgba(15,23,42,0.06)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.border = `1.5px solid ${opt.border}`
                    ;(e.currentTarget as HTMLElement).style.background = opt.activeBg
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${opt.color}18`
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.border = '1.5px solid #E8EDF2'
                    ;(e.currentTarget as HTMLElement).style.background = 'white'
                    ;(e.currentTarget as HTMLElement).style.transform = 'none'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(15,23,42,0.06)'
                  }}
                >
                  <div className="text-4xl mb-4 transition-transform duration-200 group-hover:scale-110">
                    {opt.emoji}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-1" style={{ color: opt.color }}>
                    {opt.label}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">{opt.sub}</p>
                  <ul className="space-y-1.5">
                    {opt.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
                        <span style={{ color: opt.color }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-slate-500 mt-8">
              Sudah punya akun?{' '}
              <button onClick={() => onNavigate('login-seller')} className="font-bold hover:underline cursor-pointer" style={{ color: '#0D7A55' }}>
                Masuk di sini
              </button>
            </p>
          </div>
        )}

        {/* ─── Step 2: Form ─── */}
        {step === 2 && selectedRoleConfig && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => setStep(1)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-500 text-sm cursor-pointer transition-all hover:bg-slate-100"
              >
                ←
              </button>
              <div>
                <h2 className="font-heading text-2xl font-black text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Isi Data Akun
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mendaftar sebagai{' '}
                  <span className="font-semibold" style={{ color: selectedRoleConfig.color }}>
                    {selectedRoleConfig.emoji} {selectedRoleConfig.label}
                  </span>
                </p>
              </div>
            </div>

            <div
              className="rounded-3xl p-8"
              style={{ background: 'white', border: '1px solid #E8EDF2', boxShadow: '0 4px 16px rgba(15,23,42,0.08)' }}
            >
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nama Lengkap</label>
                    <input type="text" required placeholder="Ahmad Ghozali Rifani" className="input-elegant" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email</label>
                    <input type="email" required placeholder="nama@email.com" className="input-elegant" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
                    <input type="password" required placeholder="Min. 8 karakter" className="input-elegant" />
                    <div className="flex gap-1 mt-2 h-1">
                      <div className="flex-1 rounded-full" style={{ background: '#FCA5A5' }} />
                      <div className="flex-1 rounded-full" style={{ background: '#E8EDF2' }} />
                      <div className="flex-1 rounded-full" style={{ background: '#E8EDF2' }} />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">Kekuatan: Lemah</span>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Konfirmasi Password</label>
                    <input type="password" required placeholder="Ulangi password" className="input-elegant" />
                  </div>
                </div>

                {/* Role-specific fields */}
                {selectedRole === 'seller' && (
                  <div className="rounded-2xl p-5 space-y-4" style={{ background: 'rgba(13,122,85,0.04)', border: '1px solid rgba(13,122,85,0.15)' }}>
                    <h4 className="text-xs font-black uppercase tracking-widest" style={{ color: '#0D7A55' }}>Data Tambahan Penjual / UMKM</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nama Toko/Perusahaan</label>
                        <input type="text" required placeholder="PT Bunda Halal Foods" className="input-elegant" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nomor NPWP (opsional)</label>
                        <input type="text" placeholder="xx.xxx.xxx.x-xxx.xxx" className="input-elegant" />
                      </div>
                    </div>
                  </div>
                )}

                {selectedRole === 'distributor' && (
                  <div className="rounded-2xl p-5" style={{ background: 'rgba(29,78,216,0.04)', border: '1px solid rgba(29,78,216,0.15)' }}>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#1D4ED8' }}>Data Tambahan Distributor</h4>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nama Perusahaan Ekspedisi</label>
                      <input type="text" required placeholder="PT Pos Logistik Halal" className="input-elegant" />
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl text-sm font-bold text-white cursor-pointer transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${selectedRoleConfig.color}, ${selectedRoleConfig.color}CC)`,
                      boxShadow: `0 4px 20px ${selectedRoleConfig.color}35`,
                    }}
                  >
                    Lanjutkan Pendaftaran →
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ─── Step 3: Success ─── */}
        {step === 3 && (
          <div className="animate-scale-in text-center py-8">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mx-auto mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(13,122,85,0.1), rgba(5,150,105,0.15))',
                border: '2px solid rgba(13,122,85,0.2)',
              }}
            >
              🎉
            </div>
            <h2 className="font-heading text-3xl font-black text-slate-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Pendaftaran Berhasil!
            </h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Akun Anda telah berhasil dibuat. Setujui ketentuan di bawah ini untuk mulai menggunakan SUKAHALAL.
            </p>

            <div
              className="rounded-2xl p-5 text-left max-w-md mx-auto mb-6"
              style={{ background: '#F8FAFC', border: '1px solid #E8EDF2' }}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-emerald-600 cursor-pointer"
                />
                <span className="text-sm text-slate-600 leading-relaxed">
                  Saya menyetujui <span className="font-semibold text-slate-800">Syarat & Ketentuan</span> serta{' '}
                  <span className="font-semibold text-slate-800">Kebijakan Privasi</span> dari platform SUKAHALAL.
                </span>
              </label>
            </div>

            <button
              onClick={finishRegistration}
              disabled={!agreed}
              className="px-8 py-3 rounded-2xl text-sm font-bold text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: agreed ? 'linear-gradient(135deg, #0D7A55, #059669)' : '#94A3B8',
                boxShadow: agreed ? '0 4px 20px rgba(13,122,85,0.35)' : 'none',
              }}
            >
              🚀 Mulai Gunakan SUKAHALAL
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
