import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';

type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

interface PageProps {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function Tutorial({ onNavigate, userRole, onSetRole }: PageProps) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);

  const categories = ['Semua', 'Onboarding', 'Dokumen', 'Produk', 'Verifikasi', 'Pesanan', 'Marketing', 'SJPH'];
  
  const guides = [
    { title: 'Cara Mendaftar & Verifikasi NIB OSS', category: 'Onboarding', duration: '5 min', icon: '📝', steps: 4, tag: 'Wajib UMKM' },
    { title: 'Unggah Sertifikat Halal ke SIHALAL', category: 'Dokumen', duration: '3 min', icon: '📄', steps: 3, tag: 'Legalitas' },
    { title: 'Tambah Produk & Cetak Barcode EAN-13', category: 'Produk', duration: '7 min', icon: '📦', steps: 5, tag: 'Praktis' },
    { title: 'Alur Sidang Fatwa MUI & BPJPH', category: 'Verifikasi', duration: '10 min', icon: '✅', steps: 6, tag: 'Standar Resmi' },
    { title: 'Kelola Pesanan & Integrasi Kurir Dingin', category: 'Pesanan', duration: '4 min', icon: '🛒', steps: 3, tag: 'Cold Chain' },
    { title: 'Bikin Promo Halal untuk Gen-Z', category: 'Marketing', duration: '5 min', icon: '🏷️', steps: 4, tag: 'Viral' },
    { title: 'Panduan Audit Internal SJPH Manual', category: 'SJPH', duration: '15 min', icon: '🔍', steps: 7, tag: 'Kemenag' },
    { title: 'Integrasi Sensor Suhu IoT Thermo King', category: 'Sistem', duration: '8 min', icon: '📡', steps: 5, tag: 'IoT Telemetri' },
  ];

  const sjphSteps = [
    { id: 1, title: 'Komitmen & Kebijakan Halal', desc: 'Menetapkan komitmen tertulis pimpinan UMKM untuk menghasilkan produk halal & tayyib secara konsisten tanpa kompromi.' },
    { id: 2, title: 'Tim Manajemen Halal / Penyelia Berlisensi', desc: 'Menunjuk Penyelia Halal bersertifikasi BNSP yang bertanggung jawab mengawasi titik kritis kehalalan setiap hari.' },
    { id: 3, title: 'Pemeriksaan Bahan Baku (BOM)', desc: 'Memastikan semua bahan baku rempah, daging, dan aditif memiliki sertifikat halal yang masih berlaku di database SIHALAL.' },
    { id: 4, title: 'Proses Produksi Steril & Bebas Najis', desc: 'Mencuci dan mensanitasi peralatan masak secara terpisah, kemasan retort steril 121°C tanpa sentuhan kontaminan.' },
    { id: 5, title: 'Audit Internal & Evaluasi Rutin', desc: 'Pengecekan berkala minimal 1 kali setiap 6 bulan untuk memastikan kepatuhan SOP BPJPH dan pembaharuan berkas.' },
  ];

  const mythbusters = [
    {
      id: 1,
      myth: '“Kopi dan rempah herbal kan tanaman, pasti otomatis halal kan?”',
      fact: 'Belum tentu! Kopi kemasan atau bumbu olahan sering ditambahkan perisa buatan berpelarut alkohol atau zat penstabil turunan hewani. Di SUKAHALAL, semua komposisi dicek hingga ke sumber kebunnya!',
      icon: '☕'
    },
    {
      id: 2,
      myth: '“Cold-chain cuma buat bikin dingin biasa kayak kulkas rumah?”',
      fact: 'Bukan sekadar dingin! Cold chain halal SUKAHALAL memakai sensor IoT telemetri suhu beku -18.4°C dan gembok digital RFID agar daging tidak basi dan tidak tertukar atau terkontaminasi di perjalanan.',
      icon: '❄️'
    },
    {
      id: 3,
      myth: '“Sertifikat halal itu cuma formalitas selembar kertas?”',
      fact: 'Salah besar! Sertifikasi BPJPH melewati 4 tahap berjenjang: Audit Laboratorium LPH (seperti LPPOM MUI), Sidang Komisi Fatwa, hingga verifikasi legalitas oleh BPJPH Kementerian Agama RI.',
      icon: '🛡️'
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafcfb] font-sans text-slate-800">
      {userRole !== 'guest' && <AppSidebar onNavigate={onNavigate} userRole={userRole} currentPage="tutorial" />}
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <AppHeader 
          title="Pusat Edukasi & Skena Halal"
          breadcrumb="Dashboard > Edukasi"
          userRole={userRole} 
          onSetRole={onSetRole} 
          onNavigate={onNavigate}
        />

        {/* Quick Navigation Strip */}
        <div className="bg-white border-b border-emerald-100/80 px-6 py-2.5 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors border border-slate-200 cursor-pointer"
            >
              <span>←</span> Dashboard
            </button>
            <span className="text-xs text-slate-400 font-bold">|</span>
            <span className="text-xs font-black text-slate-800">Pusat Literasi & Edukasi Gaya Hidup Halal</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('product-catalog')}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-200 cursor-pointer"
            >
              <span>📦</span> Katalog Produk
            </button>
            <button 
              onClick={() => onNavigate('verification')}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-amber-200 cursor-pointer"
            >
              <span>🛡️</span> Cek BPJPH
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Hero Banner with Cheerful Gen-Z Aesthetic */}
          <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/15 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                ✨ Skena Edukasi Halal Gaul
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Paham Halal Gak Pake Ribet! 🎓
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
                Kupas tuntas Sistem Jaminan Produk Halal (SJPH), regulasi resmi BPJPH Kemenag, dan cara membedakan produk asli vs abal-abal.
              </p>
            </div>
          </div>

          <div className="p-6 max-w-6xl mx-auto space-y-10">
            
            {/* Interactive Halal Mythbusters (Gen-Z Interactive Quiz) */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h2 className="text-base font-black text-slate-900">Halal Mythbusters: Mitos vs Fakta</h2>
                    <p className="text-xs text-slate-500">Klik kartu di bawah untuk membuka kebenaran di baliknya!</p>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  🔥 Viral Quiz
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mythbusters.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setActiveQuiz(activeQuiz === item.id ? null : item.id)}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                      activeQuiz === item.id 
                        ? 'bg-emerald-50 border-emerald-400 shadow-md ring-2 ring-emerald-200' 
                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {activeQuiz === item.id ? 'Jawaban Terbuka ✓' : 'Klik untuk Buka 👆'}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-xs text-slate-900 leading-snug mb-2">
                      {item.myth}
                    </h3>

                    {activeQuiz === item.id ? (
                      <div className="pt-2 border-t border-emerald-200 text-xs text-emerald-900 space-y-1 animate-fade-in">
                        <span className="font-black text-emerald-700 block">✨ FAKTA RESMI:</span>
                        <p className="text-[11px] leading-relaxed text-slate-700">{item.fact}</p>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 font-medium">Buka untuk membaca penjelasan auditor halal...</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SJPH Digital Wizard (Interactive Step Guide) */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧙‍♂️</span>
                <div>
                  <h2 className="text-base font-black text-slate-900">{t('SJPH Digital Wizard')}</h2>
                  <p className="text-xs text-slate-500">Panduan praktis implementasi 5 pilar Sistem Jaminan Produk Halal untuk UMKM</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 space-y-3">
                {sjphSteps.map(step => (
                  <div key={step.id} className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                    <button 
                      onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50/70 hover:bg-emerald-50/70 transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs transition-colors ${
                          expandedStep === step.id ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'
                        }`}>
                          {step.id}
                        </div>
                        <span className="font-extrabold text-xs text-slate-900">{step.title}</span>
                      </div>
                      <span className="text-slate-400 text-xs font-bold">{expandedStep === step.id ? '▲ Tutup' : '▼ Lihat SOP'}</span>
                    </button>

                    {expandedStep === step.id && (
                      <div className="p-4 bg-white border-t border-slate-100 text-xs text-slate-600 space-y-2 animate-fade-in">
                        <p className="leading-relaxed">{step.desc}</p>
                        <div className="pt-2 flex gap-2">
                          <button 
                            onClick={() => onNavigate('upload-dokumen')}
                            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>📄</span> Upload Dokumen Terkait &rarr;
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Platform Interactive Bite-sized Cards */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <div>
                  <h2 className="text-base font-black text-slate-900">Kumpulan Modul Panduan Praktis</h2>
                  <p className="text-xs text-slate-500">Pilih topik yang ingin kamu kuasai hari ini</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {guides.map((g, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{g.icon}</span>
                        <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                          {g.tag}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-xs text-slate-900 leading-snug">{g.title}</h3>
                      <p className="text-[11px] text-slate-400 mt-1">Durasi: {g.duration} • {g.steps} Langkah</p>
                    </div>

                    <button 
                      onClick={() => alert(`Membuka materi: ${g.title}`)}
                      className="w-full py-2 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Mulai Belajar &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
