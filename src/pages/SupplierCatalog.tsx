import { useState } from 'react'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

const sideNav = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'supplier-catalog', label: 'Supplier Catalog', icon: '🏢' },
  { id: 'logistics', label: 'Logistik', icon: '🚛' },
  { id: 'laporan', label: 'Analytics', icon: '📊' },
  { id: 'verification', label: 'Certifications', icon: '🛡️' },
  { id: 'tutorial', label: 'Support', icon: '❓' },
]

const suppliers = [
  { id: 1, name: 'PT Berkah Foods', city: 'Jakarta', avatar: 'BF', avatarBg: 'bg-orange-100', avatarColor: 'text-orange-600', badge: 'Halal Tayiban', rating: 4.9, reviews: 120 },
  { id: 2, name: 'CV Halal Sejahtera', city: 'Surabaya', avatar: 'CV', avatarBg: 'bg-green-100', avatarColor: 'text-green-700', badge: 'Halal Tayiban', rating: 4.8, reviews: 95 },
  { id: 3, name: 'PT Nusantara Agro', city: 'Bandung', avatar: 'NA', avatarBg: 'bg-teal-100', avatarColor: 'text-teal-700', badge: 'Halal Tayiban', rating: 4.7, reviews: 88 },
  { id: 4, name: 'CV Berkah Jaya Lestari', city: 'Semarang', avatar: 'BJ', avatarBg: 'bg-blue-100', avatarColor: 'text-blue-700', badge: 'Halal Tayiban', rating: 4.6, reviews: 112 },
  { id: 5, name: 'PT Alam Halal Mandiri', city: 'Depok', avatar: 'AM', avatarBg: 'bg-emerald-100', avatarColor: 'text-emerald-700', badge: 'Halal Tayiban', rating: 4.9, reviews: 74 },
  { id: 6, name: 'CV Rasa Utama', city: 'Tangerang', avatar: 'CV', avatarBg: 'bg-purple-100', avatarColor: 'text-purple-700', badge: 'Halal Tayiban', rating: 4.7, reviews: 60 },
]

export default function SupplierCatalog({ onNavigate }: Props) {
  const [activeNav, setActiveNav] = useState('supplier-catalog')
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All Java')
  const [certStatus, setCertStatus] = useState('Verified BPJPH')
  const [sortBy, setSortBy] = useState('Rating (High to Low)')
  const [page, setPage] = useState(1)

  function handleNav(id: string) {
    setActiveNav(id)
    onNavigate(id)
  }

  const filtered = suppliers.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex h-screen bg-gray-50 font-['Inter',sans-serif] overflow-hidden">
      <aside className="w-52 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-100 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-extrabold text-sm">S</div>
          <span className="font-extrabold text-green-700 text-sm">SUKAHALAL</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {sideNav.map(item => (
            <button key={item.id} onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeNav === item.id ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-5">
          <h1 className="text-xl font-extrabold text-gray-900">Supplier Catalog</h1>
          <p className="text-sm text-gray-400 mt-0.5">Page {page} of 5</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex-1 min-w-48">
            <div className="text-xs text-gray-500 mb-1 font-medium">Search</div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search suppliers by name, product..."
                className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white" />
            </div>
          </div>
          <div className="min-w-36">
            <div className="text-xs text-gray-500 mb-1 font-medium">Region:</div>
            <select value={region} onChange={e => setRegion(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white">
              {['All Java', 'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur'].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="min-w-40">
            <div className="text-xs text-gray-500 mb-1 font-medium">Certification Status:</div>
            <select value={certStatus} onChange={e => setCertStatus(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white">
              {['Verified BPJPH', 'Halal MUI', 'In Process'].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="min-w-44">
            <div className="text-xs text-gray-500 mb-1 font-medium">Sort by:</div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white">
              {['Rating (High to Low)', 'Rating (Low to High)', 'Name A-Z'].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filtered.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 ${s.avatarBg} rounded-xl flex items-center justify-center ${s.avatarColor} font-bold text-sm`}>{s.avatar}</div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{s.name}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1"><span>📍</span> {s.city}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  ✅ {s.badge} <span className="text-green-500 text-[10px] font-normal ml-1">Verified by BPJPH</span>
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <span className="text-amber-400">★</span>
                  <span className="font-semibold">{s.rating}</span>
                  <span className="text-gray-400">{s.reviews} Reviews</span>
                </div>
              </div>
              <button onClick={() => onNavigate('supplier-profile')} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                Lihat Profil
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Page {page} of 5</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50">Previous</button>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => setPage(n)} className={`w-8 h-8 text-sm rounded-lg font-medium transition-colors ${page === n ? 'bg-green-600 text-white' : 'text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>{n}</button>
            ))}
            <button className="px-3 py-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </main>
    </div>
  )
}
