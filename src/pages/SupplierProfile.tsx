import { useState } from 'react'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

const sideNav = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'supplier-catalog', label: 'Pemasok', icon: '🏢' },
  { id: 'product-catalog', label: 'Produk', icon: '📦' },
  { id: 'pesanan', label: 'Pesanan', icon: '🛒' },
  { id: 'verification', label: 'Sertifikasi Halal', icon: '🛡️' },
  { id: 'laporan', label: 'Analitik', icon: '📊' },
  { id: 'settings', label: 'Pengaturan', icon: '⚙️' },
]

const tabs = ['Overview', 'Produk', 'Dokumen', 'Ulasan']

const products = [
  { name: 'Mie Organik Halal Premium', price: 'Rp 35.000', rating: 4.8, emoji: '🍜' },
  { name: 'Bumbu Rendang Spesial', price: 'Rp 28.000', rating: 4.7, emoji: '🫙' },
  { name: 'Daging Sapi Olahan 500g', price: 'Rp 85.000', rating: 4.9, emoji: '🥩' },
]

const reviews = [
  { name: 'Budi S.', rating: 5, comment: 'Produk berkualitas, sertifikasi halal terpercaya!', date: '28 Agu 2026' },
  { name: 'Siti R.', rating: 5, comment: 'Pengiriman cepat, produk sesuai deskripsi.', date: '25 Agu 2026' },
  { name: 'Ahmad F.', rating: 4, comment: 'Bagus, akan order lagi.', date: '20 Agu 2026' },
]

export default function SupplierProfile({ onNavigate }: Props) {
  const [activeNav, setActiveNav] = useState('supplier-catalog')
  const [activeTab, setActiveTab] = useState('Overview')

  function handleNav(id: string) {
    setActiveNav(id)
    onNavigate(id)
  }

  return (
    <div className="flex h-screen bg-gray-50 font-['Inter',sans-serif] overflow-hidden">
      <aside className="w-52 bg-[#0f1b2d] flex flex-col shrink-0">
        <div className="flex items-center gap-2 px-4 py-5 border-b border-white/10 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-extrabold text-sm">S</div>
          <span className="text-white font-extrabold text-sm">SUKAHALAL</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {sideNav.map(item => (
            <button key={item.id} onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeNav === item.id ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>🔍</span>
            <input type="text" placeholder="Search..." className="border-none outline-none text-sm text-gray-700 w-48" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <button onClick={() => onNavigate('supplier-catalog')} className="hover:text-gray-700">Pemasok</button>
              <span>›</span>
              <span className="text-gray-900 font-medium">PT Berkah Foods</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                🔔<span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full text-white text-[8px] flex items-center justify-center">1</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-sm">👤</div>
              <span className="text-sm text-gray-600 font-medium">Ahmad F.</span>
              <span className="text-gray-400">▾</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-2xl p-5 mb-5 flex flex-wrap items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-xl shadow flex items-center justify-center">
              <span className="text-green-600 font-extrabold text-xl">B</span>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-extrabold text-gray-900">PT Berkah Foods</h1>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5"><span>📍</span> Jakarta, Indonesia</div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-green-600 text-white rounded-xl px-4 py-2 text-center">
                <div className="text-xs font-semibold">Halal</div>
                <div className="text-[10px]">Tayyiban</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-center shadow-sm">
                <div className="text-xs text-gray-500">Verified by</div>
                <div className="text-sm font-bold text-blue-700">BPJPH</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-center shadow-sm">
                <div className="text-amber-400 text-sm">★★★★★</div>
                <div className="text-xs font-bold text-gray-700">4.9</div>
                <div className="text-[10px] text-gray-400">118 review</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-5 border-b border-gray-200">
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-5 py-2.5 text-sm font-medium transition-colors ${activeTab === t ? 'text-green-600 border-b-2 border-green-600 -mb-px' : 'text-gray-500 hover:text-gray-700'}`}
              >{t}</button>
            ))}
          </div>

          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-bold text-gray-900 mb-3">Tentang PT Berkah Foods</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">PT Berkah Foods adalah produsen makanan olahan premium di Jakarta. Kami berkomitmen menyediakan produk halal berkualitas tinggi yang diproses dengan standar kebersihan dan keamanan pangan global...</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-bold text-gray-900 mb-3">Informasi Kontak</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Alamat', value: 'Jl. Kebon Jeruk No. 12, Jakarta Barat, DKI Jakarta, 11530' },
                      { label: 'Telepon', value: '+62 21 555-0123' },
                      { label: 'Email', value: 'contact@berkahfoods.co.id' },
                    ].map(r => (
                      <div key={r.label} className="flex gap-3 text-sm">
                        <span className="text-gray-400 w-20 shrink-0">{r.label}</span>
                        <span className="text-gray-700">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-bold text-gray-900 mb-3">Status Sertifikasi</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Status', value: 'Aktif', green: true },
                      { label: 'Tanggal Verifikasi', value: '15 Jan 2024' },
                      { label: 'Tanggal Kadaluwarsa', value: '15 Jan 2026' },
                    ].map(r => (
                      <div key={r.label} className="flex gap-3 text-sm">
                        <span className="text-gray-400 w-32 shrink-0">{r.label}</span>
                        <span className={r.green ? 'text-green-600 font-semibold' : 'text-gray-700'}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm">Statistik Perusahaan</h3>
                  {[{ label: 'Total Produk', value: 45 }, { label: 'Tahun Beroperasi', value: 8 }, { label: 'Total Pesanan', value: 1200 }].map(s => (
                    <div key={s.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-600">{s.label}</span>
                      <span className="font-bold text-gray-900">{s.value}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm">Kategori Produk</h3>
                  <div className="space-y-1.5">
                    {['Daging Olahan', 'Bumbu Dapur', 'Makanan Beku', 'Saus & Kecap'].map(cat => (
                      <div key={cat} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />{cat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Produk' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map((p, i) => (
                <button key={i} onClick={() => onNavigate('product-detail')} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow text-left">
                  <div className="h-24 bg-amber-50 rounded-xl flex items-center justify-center text-4xl mb-3">{p.emoji}</div>
                  <div className="font-semibold text-gray-800 text-sm mb-1">{p.name}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold text-sm">{p.price}</span>
                    <span className="text-amber-400 text-xs">★ {p.rating}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'Dokumen' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-sm">Dokumen Sertifikasi</h3>
                <button onClick={() => onNavigate('upload-dokumen')} className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                  + Upload Dokumen
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Sertifikat Halal BPJPH 2024.pdf', date: '15 Jan 2024', status: 'Aktif' },
                  { name: 'Dokumen Pendukung Bahan Baku.pdf', date: '10 Jan 2024', status: 'Aktif' },
                  { name: 'Sertifikat ISO 22000.pdf', date: '01 Jan 2024', status: 'Aktif' },
                ].map(d => (
                  <div key={d.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📄</span>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{d.name}</div>
                        <div className="text-xs text-gray-400">{d.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">{d.status}</span>
                      <button className="text-blue-600 text-xs hover:underline">Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Ulasan' && (
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">{r.name[0]}</div>
                      <span className="font-semibold text-gray-800 text-sm">{r.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400">{'★'.repeat(r.rating)}</span>
                      <span className="text-xs text-gray-400">{r.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
