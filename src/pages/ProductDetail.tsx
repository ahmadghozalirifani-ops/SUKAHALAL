import { useState } from 'react'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

const sideNav = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'product-catalog', label: 'Products', icon: '📦' },
  { id: 'supplier-catalog', label: 'Suppliers', icon: '🏢' },
  { id: 'laporan', label: 'Analytics', icon: '📊' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'tutorial', label: 'Support', icon: '❓' },
]

const specs = [
  { key: 'Bahan', value: 'Tepung Gandum Utuh Organik, Air, Garam, Kunyit Alami' },
  { key: 'Asal', value: 'Jawa Tengah, Indonesia (Organik Certified)' },
  { key: 'Proses', value: 'Penggilingan Batu, Dikeringkan Udara Natural, No MSG' },
]

const timeline = [
  { step: 'Pengajuan', sub: 'Submitted', date: '12 Oct 2023' },
  { step: 'AI-Analysis', sub: 'AI Verified', date: '14 Oct 2023' },
  { step: 'Review BPJPH', sub: 'Approved BPJPH', date: '19 Oct 2023' },
  { step: 'Approved', sub: 'Certified', date: '20 Oct 2023' },
]

const galleryEmojis = ['📦', '📋', '🍜']

export default function ProductDetail({ onNavigate }: Props) {
  const [activeNav, setActiveNav] = useState('product-catalog')
  const [selectedImage, setSelectedImage] = useState(0)
  const [inCart, setInCart] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  function handleNav(id: string) {
    setActiveNav(id)
    if (id !== 'product-catalog') onNavigate(id)
  }

  return (
    <div className="flex h-screen bg-gray-50 font-['Inter',sans-serif] overflow-hidden">
      <aside className="w-52 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-100 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-white font-extrabold text-xs">S</div>
          <span className="text-gray-800 font-extrabold text-sm">SUKAHALAL</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {sideNav.map(item => (
            <button key={item.id} onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeNav === item.id ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
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
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button onClick={() => onNavigate('product-catalog')} className="hover:text-gray-700">Product Detail</button>
            <span>›</span>
            <span className="text-gray-900 font-medium">Mie Organik Halal Premium</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { navigator.clipboard?.writeText('https://sukahalal.id/product/mie-organik'); alert('Link berhasil disalin!') }} className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              🔗 Share
            </button>
            <button onClick={() => onNavigate('settings')} className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">⚙</button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-amber-50 rounded-2xl h-64 flex items-center justify-center mb-3 border border-amber-100">
                <span className="text-7xl">{galleryEmojis[selectedImage]}</span>
              </div>
              <div className="flex gap-2">
                {galleryEmojis.map((em, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={`w-20 h-16 rounded-xl flex items-center justify-center text-2xl border-2 transition-colors ${selectedImage === i ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
                  >{em}</button>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Mie Organik Halal Premium</h1>
              <div className="text-sm text-gray-500 mb-3">
                Supplier: <button onClick={() => onNavigate('supplier-profile')} className="text-green-600 hover:underline font-medium">PT Berkah Foods</button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-extrabold text-green-600">Rp 35.000</span>
                <div className="bg-green-700 text-white rounded-xl px-3 py-1.5 text-center">
                  <div className="text-xs font-bold leading-tight">HALAL</div>
                  <div className="text-[9px] leading-tight">TAYYIBAN</div>
                  <div className="text-[8px] opacity-80">HALAL CERTIFIED</div>
                </div>
                <div className="text-right">
                  <div className="text-amber-400 text-sm">★★★★½</div>
                  <div className="font-bold text-gray-900">4.8</div>
                  <div className="text-xs text-gray-400">128 Reviews</div>
                </div>
              </div>

              <div className="mb-5">
                <div className="font-bold text-gray-900 mb-2 text-sm">Specification</div>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  {specs.map((s, i) => (
                    <div key={s.key} className={`flex text-sm ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                      <div className="w-24 shrink-0 bg-gray-50 px-3 py-2.5 font-medium text-gray-700">{s.key}</div>
                      <div className="flex-1 px-3 py-2.5 text-gray-600">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <div className="font-bold text-gray-900 mb-3 text-sm">Verification Timeline</div>
                <div className="flex items-start gap-0 relative">
                  {timeline.map((t, i) => (
                    <div key={i} className="flex-1 relative">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold z-10">✓</div>
                        {i < timeline.length - 1 && <div className="absolute top-3.5 left-1/2 w-full h-0.5 bg-green-400" />}
                        <div className="mt-2 text-center">
                          <div className="text-xs font-bold text-gray-800">{t.step}</div>
                          <div className="text-[10px] text-gray-500">{t.sub}</div>
                          <div className="text-[10px] text-gray-400">{t.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="ml-3 flex flex-col gap-2">
                    <div className="text-xs text-gray-400 mb-1">Share</div>
                    {['📱', '📸', '👥'].map((icon, i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-200">{icon}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setDownloaded(true)}
                  className={`flex-1 font-bold py-3 rounded-xl text-sm transition-colors border-2 ${downloaded ? 'border-gray-300 text-gray-400 bg-gray-50' : 'border-green-600 text-green-600 hover:bg-green-50'}`}
                >
                  {downloaded ? '✓ Downloaded' : 'Download Sertifikat Halal (PDF)'}
                </button>
                <button
                  onClick={() => setInCart(true)}
                  className={`flex-1 font-bold py-3 rounded-xl text-sm transition-colors uppercase tracking-wide ${inCart ? 'bg-gray-200 text-gray-600' : 'bg-green-700 hover:bg-green-800 text-white'}`}
                >
                  {inCart ? '✓ Di Keranjang' : 'Tambah ke Keranjang'}
                </button>
              </div>

              {inCart && (
                <div className="mt-3 flex gap-2">
                  <button onClick={() => onNavigate('cart')} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
                    🛒 Lihat Keranjang
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
