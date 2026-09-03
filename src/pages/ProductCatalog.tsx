import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { UserRole } from '../App'
import TraceabilityModal from '../components/TraceabilityModal'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

const sideNav = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'product-catalog', label: 'Katalog Produk', icon: '📦' },
  { id: 'pesanan', label: 'Pesanan', icon: '🛒' },
  { id: 'supplier-catalog', label: 'Pemasok', icon: '🏢' },
  { id: 'verification', label: 'Sertifikasi Halal', icon: '🛡️' },
  { id: 'settings', label: 'Pengaturan', icon: '⚙️' },
]

const products = [
  { id: 1, name: 'Mi Instan Kari Ayam Halal', supplier: 'CV Halal Mart', price: 'Rp 25.000', badge: 'Halal Tayiban', rating: 4.8, emoji: '🍜', bg: 'bg-orange-50' },
  { id: 2, name: 'Bumbu Dapur Rendang 200g', supplier: 'PT Bumbu Nusantara', price: 'Rp 45.500', badge: 'Halal Tayiban', rating: 4.5, emoji: '🫙', bg: 'bg-amber-50' },
  { id: 3, name: 'Sambal Terasi Super 150ml', supplier: 'CV Sambalindo', price: 'Rp 32.000', badge: 'Halal Tayiban', rating: 4.5, emoji: '🌶️', bg: 'bg-red-50' },
  { id: 4, name: 'Beras Premium Pandan Wangi 5kg', supplier: 'UD Jaya Beras', price: 'Rp 85.000', badge: 'Halal Tayiban', rating: 4.8, emoji: '🌾', bg: 'bg-green-50' },
  { id: 5, name: 'Keripik Singkong Balado 200g', supplier: 'PT Camilan Halal', price: 'Rp 28.500', badge: 'Halal Tayiban', rating: 4.5, emoji: '🥔', bg: 'bg-yellow-50' },
  { id: 6, name: 'Kecap Manis Organik 275ml', supplier: 'CV Kecap Sejahtera', price: 'Rp 38.000', badge: 'Halal Tayiban', rating: 4.5, emoji: '🍶', bg: 'bg-amber-50' },
]

const categories = ['Semua', 'Makanan', 'Minuman', 'Bumbu']
const halalStatuses = ['Semua', 'Halal BPJPH', 'Halal Tayiban']

export default function ProductCatalog({ onNavigate, userRole }: Props) {
  const { t, i18n } = useTranslation()
  const [activeNav, setActiveNav] = useState('product-catalog')
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [halalStatus, setHalalStatus] = useState('Semua')
  const [priceMax, setPriceMax] = useState(100000)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [cart, setCart] = useState<number[]>([])
  const [traceProduct, setTraceProduct] = useState<string | null>(null)

  function handleNav(id: string) {
    setActiveNav(id)
    if (id !== 'product-catalog') onNavigate(id)
  }

  function addToCart(id: number) {
    setCart(prev => [...prev, id])
  }

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex h-screen font-['Inter',sans-serif] overflow-hidden bg-gray-900">
      <aside className="w-52 bg-[#111827] flex flex-col shrink-0">
        <div className="px-4 py-5 border-b border-white/10 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-extrabold text-sm">S</div>
            <span className="text-white font-extrabold text-sm tracking-wide">SUKAHALAL</span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {sideNav.map(item => (
            <button key={item.id} onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeNav === item.id ? 'bg-green-600/20 text-green-400 font-semibold' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </button>
          ))}
          {userRole === 'seller' && (
            <button onClick={() => onNavigate('product-management')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-amber-400 hover:bg-amber-400/10 transition-colors cursor-pointer">
              <span className="text-base w-5 text-center">🛠️</span>
              Kelola Produk
            </button>
          )}
        </nav>
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">S</div>
            <span className="text-white text-xs font-semibold">SUKAHALAL</span>
          </div>
          <div className="text-gray-500 text-[10px]">Sertifikasi BPJPH</div>
          <div className="text-gray-400 text-[10px] font-mono">ID001100001234556</div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="bg-green-600 text-white text-xs px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>👋</span>
            <span className="font-medium">
              {userRole === 'seller' ? 'Mode Penjual | Kelola Stok & Katalog Halal' : 'Katalog Halal Tayiban | Terverifikasi Resmi'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {cart.length > 0 && (
              <button onClick={() => onNavigate('cart')} className="bg-white text-green-700 font-bold px-3 py-1 rounded-full text-xs hover:bg-green-50 transition-colors cursor-pointer shadow-sm">
                🛒 {cart.length} di keranjang →
              </button>
            )}
            <button onClick={() => onNavigate('dashboard')} className="text-white/80 hover:text-white underline text-xs cursor-pointer">
              ← Dashboard
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h1 className="text-xl font-extrabold text-gray-900">
                Katalog Produk <span className="text-gray-400 font-normal">|</span> SUKAHALAL
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">Produk bersertifikat Halal & Toyyiban terdaftar resmi di BPJPH</p>
            </div>
            {userRole === 'seller' && (
              <button onClick={() => onNavigate('product-management')} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer">
                <span>＋</span> Tambah / Edit Produk (CRUD)
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <div className="text-xs text-gray-500 mb-1 font-medium">Cari Produk</div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari produk halal..."
                  className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white" />
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1 font-medium">Kategori</div>
              <div className="flex gap-1">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`flex-1 text-xs px-2 py-2 rounded-lg font-medium transition-colors cursor-pointer ${activeCategory === cat ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >{cat}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1 font-medium">Harga Maks: Rp {priceMax.toLocaleString('id-ID')}</div>
              <input type="range" min={10000} max={200000} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} className="w-full accent-green-600 cursor-pointer" />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1 font-medium">Status Halal</div>
              <div className="flex gap-1 flex-wrap">
                {halalStatuses.map(s => (
                  <button key={s} onClick={() => setHalalStatus(s)}
                    className={`text-xs px-2 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${halalStatus === s ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >{s}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filtered.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between">
                <button className={`${p.bg} h-36 flex items-center justify-center relative w-full cursor-pointer`} onClick={() => onNavigate('product-detail')}>
                  <span className="text-6xl">{p.emoji}</span>
                  <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    🌙 {p.badge}
                  </span>
                </button>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-gray-900 text-sm mb-0.5">{p.name}</div>
                    <div className="text-xs text-gray-500 mb-2">{p.supplier}</div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-green-700 font-extrabold text-base">{p.price}</span>
                      <div className="flex items-center gap-1">
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200">✅ BPJPH</span>
                        <span className="text-amber-400 text-xs">★</span>
                        <span className="text-xs font-semibold text-gray-700">{p.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-2">
                    <button onClick={() => setTraceProduct(p.name)}
                      className="w-full text-xs font-semibold py-2 rounded-xl border border-green-200 text-green-700 hover:bg-green-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                      <span>🔍</span> Lacak Rantai Pasok (QR)
                    </button>
                    <button onClick={() => addToCart(p.id)}
                      className={`w-full text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer ${cart.includes(p.id) ? 'bg-gray-200 text-gray-600' : 'bg-green-600 hover:bg-green-700 text-white shadow-sm'}`}
                    >
                      {cart.includes(p.id) ? '✓ Ditambahkan' : 'Tambah ke Keranjang'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">Halaman:</span>
              {[1, 2, 3].map(n => (
                <button key={n} onClick={() => setCurrentPage(n)} className={`w-6 h-6 rounded-lg text-xs font-medium cursor-pointer ${currentPage === n ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{n}</button>
              ))}
            </div>
            <div className="text-xs text-gray-500">Total Produk Halal: <span className="font-bold text-gray-900">{products.length}</span></div>
          </div>
        </div>
      </main>

      {/* Traceability Modal */}
      {traceProduct && (
        <TraceabilityModal productName={traceProduct} onClose={() => setTraceProduct(null)} />
      )}
    </div>
  )
}
