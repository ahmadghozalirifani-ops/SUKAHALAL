import { useState } from 'react'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

const guides = [
  {
    id: 1, title: 'Cara Mendaftar sebagai Penjual', duration: '3 menit', category: 'Onboarding',
    steps: ['Klik tombol Daftar di halaman utama', 'Isi data perusahaan dan NPWP', 'Verifikasi email dan nomor telepon', 'Lengkapi profil toko Anda'],
    icon: '🛒', color: 'bg-green-50 border-green-200',
  },
  {
    id: 2, title: 'Upload Dokumen Sertifikasi Halal', duration: '5 menit', category: 'Dokumen',
    steps: ['Buka menu Dokumen di sidebar', 'Pilih Tipe Dokumen: Sertifikat Halal', 'Drag & drop atau browse file PDF', 'AI akan mengekstrak data otomatis', 'Klik Konfirmasi dan Kirim ke BPJPH'],
    icon: '📄', color: 'bg-teal-50 border-teal-200',
  },
  {
    id: 3, title: 'Menambahkan Produk ke Katalog', duration: '4 menit', category: 'Produk',
    steps: ['Masuk ke menu Katalog Produk', 'Klik tombol Tambah Produk', 'Isi nama, deskripsi, dan harga', 'Upload foto produk', 'Lampirkan sertifikat halal yang relevan', 'Publikasikan produk'],
    icon: '📦', color: 'bg-amber-50 border-amber-200',
  },
  {
    id: 4, title: 'Proses Verifikasi BPJPH', duration: '10 menit', category: 'Verifikasi',
    steps: ['Submit dokumen dari menu Pusat Verifikasi', 'Tunggu AI-Analysis (1-2 hari kerja)', 'Review oleh tim BPJPH (3-5 hari kerja)', 'Terima notifikasi status persetujuan', 'Download sertifikat halal digital'],
    icon: '🛡️', color: 'bg-blue-50 border-blue-200',
  },
  {
    id: 5, title: 'Mengelola Pesanan Masuk', duration: '3 menit', category: 'Pesanan',
    steps: ['Buka menu Pesanan di dashboard', 'Lihat daftar pesanan baru', 'Konfirmasi atau tolak pesanan', 'Update status pengiriman', 'Selesaikan pesanan setelah diterima pelanggan'],
    icon: '🛒', color: 'bg-purple-50 border-purple-200',
  },
  {
    id: 6, title: 'Menggunakan Fitur Marketing', duration: '5 menit', category: 'Marketing',
    steps: ['Buka menu Marketing', 'Pilih Buat Kampanye Baru', 'Atur diskon atau promo produk', 'Tentukan durasi kampanye', 'Aktifkan dan pantau performa'],
    icon: '📢', color: 'bg-pink-50 border-pink-200',
  },
]

const categories = ['Semua', 'Onboarding', 'Dokumen', 'Produk', 'Verifikasi', 'Pesanan', 'Marketing']

export default function Tutorial({ onNavigate }: Props) {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [openGuide, setOpenGuide] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [supportSent, setSupportSent] = useState(false)

  const filtered = guides.filter(g =>
    (activeCategory === 'Semua' || g.category === activeCategory) &&
    g.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="font-extrabold text-green-700">SUKAHALAL</span>
          </div>
          <button onClick={() => onNavigate('dashboard')} className="text-sm text-gray-500 hover:text-gray-700">← Kembali ke Dashboard</button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="bg-gradient-to-r from-green-600 to-teal-500 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-2xl font-extrabold mb-2">Pusat Tutorial SUKAHALAL</h1>
          <p className="text-green-100 text-sm mb-5">Panduan lengkap untuk memaksimalkan penggunaan platform halal supply-chain Anda</p>
          <div className="relative max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-300">🔍</span>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari panduan..."
              className="w-full bg-white/20 border border-white/30 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-green-200 focus:outline-none focus:bg-white/30" />
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Guide cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(guide => (
            <div key={guide.id} className={`bg-white border ${guide.color} rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl">{guide.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{guide.category}</span>
                      <span className="text-xs text-gray-400">⏱ {guide.duration}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">{guide.title}</h3>
                  </div>
                </div>

                {openGuide === guide.id ? (
                  <div className="space-y-2 mb-3">
                    {guide.steps.map((step, i) => (
                      <div key={i} className="flex gap-2.5 items-start">
                        <div className="w-5 h-5 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                        <span className="text-sm text-gray-600">{step}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 mb-3">{guide.steps.length} langkah mudah untuk memulai</p>
                )}

                <button onClick={() => setOpenGuide(openGuide === guide.id ? null : guide.id)}
                  className="w-full text-sm font-semibold text-green-600 hover:text-green-700 border border-green-200 hover:bg-green-50 py-2 rounded-xl transition-colors">
                  {openGuide === guide.id ? '▲ Sembunyikan' : '▼ Lihat Panduan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Video CTA */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <div className="text-5xl mb-3">🎬</div>
          <h3 className="font-bold text-gray-900 mb-2">Butuh bantuan lebih lanjut?</h3>
          <p className="text-sm text-gray-500 mb-4">Tonton video tutorial kami atau hubungi tim support SUKAHALAL</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => setShowVideoModal(true)} className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
              ▶ Tonton Video Tutorial
            </button>
            <button onClick={() => setShowSupportModal(true)} className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
              💬 Hubungi Support
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-gray-900 h-64 flex flex-col items-center justify-center relative">
              <div className="text-6xl mb-3">▶️</div>
              <p className="text-white text-sm font-medium">Tutorial SUKAHALAL</p>
              <p className="text-gray-400 text-xs mt-1">Video tutorial lengkap platform halal supply-chain</p>
              <div className="absolute bottom-3 left-4 right-4">
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full w-1/3" />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-gray-400 text-[10px]">3:24 / 10:00</span>
                  <span className="text-gray-400 text-[10px]">HD</span>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <p className="text-sm text-gray-700 font-medium">Panduan Lengkap SUKAHALAL</p>
              <button onClick={() => setShowVideoModal(false)} className="text-sm text-gray-500 hover:text-gray-700 font-medium">Tutup ✕</button>
            </div>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            {!supportSent ? (
              <>
                <h2 className="font-extrabold text-gray-900 text-lg mb-4">💬 Hubungi Support</h2>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Nama</label>
                    <input type="text" placeholder="Nama Anda" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Pesan</label>
                    <textarea placeholder="Tuliskan pertanyaan atau masalah Anda..." rows={3}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <button onClick={() => setSupportSent(true)} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                    Kirim Pesan
                  </button>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                    📱 Chat via WhatsApp
                  </a>
                  <button onClick={() => setShowSupportModal(false)} className="w-full text-sm text-gray-500 hover:text-gray-700 py-2">Batal</button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">✅</div>
                <h2 className="font-extrabold text-gray-900 text-lg mb-2">Pesan Terkirim!</h2>
                <p className="text-sm text-gray-500 mb-4">Tim support kami akan menghubungi Anda dalam 1x24 jam.</p>
                <button onClick={() => { setShowSupportModal(false); setSupportSent(false) }} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">Tutup</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
