import { useState } from 'react'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

type StockStatus = 'Tersedia' | 'Hampir Habis' | 'Habis'

const products: { id: string; name: string; supplier: string; stock: number; unit: string; price: string; status: StockStatus; lastUpdate: string }[] = [
  { id: 'PRD-001', name: 'Mi Instan Kari Ayam Halal', supplier: 'CV Halal Mart', stock: 480, unit: 'pcs', price: 'Rp 25.000', status: 'Tersedia', lastUpdate: '03 Sep 2026' },
  { id: 'PRD-002', name: 'Bumbu Dapur Rendang 200g', supplier: 'PT Bumbu Nusantara', stock: 25, unit: 'pcs', price: 'Rp 45.500', status: 'Hampir Habis', lastUpdate: '02 Sep 2026' },
  { id: 'PRD-003', name: 'Beras Premium Pandan Wangi 5kg', supplier: 'UD Jaya Beras', stock: 120, unit: 'sak', price: 'Rp 85.000', status: 'Tersedia', lastUpdate: '01 Sep 2026' },
  { id: 'PRD-004', name: 'Sambal Terasi Super 150ml', supplier: 'CV Sambalindo', stock: 0, unit: 'botol', price: 'Rp 32.000', status: 'Habis', lastUpdate: '30 Agu 2026' },
  { id: 'PRD-005', name: 'Kecap Manis Organik 275ml', supplier: 'CV Kecap Sejahtera', stock: 215, unit: 'botol', price: 'Rp 38.000', status: 'Tersedia', lastUpdate: '03 Sep 2026' },
  { id: 'PRD-006', name: 'Keripik Singkong Balado 200g', supplier: 'PT Camilan Halal', stock: 18, unit: 'pcs', price: 'Rp 28.500', status: 'Hampir Habis', lastUpdate: '02 Sep 2026' },
]

const statusColors: Record<StockStatus, string> = {
  'Tersedia': 'bg-green-100 text-green-700',
  'Hampir Habis': 'bg-amber-100 text-amber-700',
  'Habis': 'bg-red-100 text-red-600',
}

export default function Inventaris({ onNavigate }: Props) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<'Semua' | StockStatus>('Semua')
  const [editId, setEditId] = useState<string | null>(null)
  const [editStock, setEditStock] = useState<number>(0)
  const [inventory, setInventory] = useState(products)

  const filtered = inventory.filter(p =>
    (filterStatus === 'Semua' || p.status === filterStatus) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  function saveEdit(id: string) {
    setInventory(prev => prev.map(p => {
      if (p.id !== id) return p
      const newStock = editStock
      const status: StockStatus = newStock === 0 ? 'Habis' : newStock <= 30 ? 'Hampir Habis' : 'Tersedia'
      return { ...p, stock: newStock, status, lastUpdate: '03 Sep 2026' }
    }))
    setEditId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="font-extrabold text-green-700">SUKAHALAL</span>
          </div>
          <button onClick={() => onNavigate('dashboard')} className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-xl font-extrabold text-gray-900 mb-1">Manajemen Inventaris</h1>
        <p className="text-sm text-gray-500 mb-6">Pantau stok produk halal Anda secara real-time</p>

        {/* Status cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Stok Tersedia', count: inventory.filter(p => p.status === 'Tersedia').length, color: 'text-green-600', bg: 'bg-green-50 border-green-200', icon: '✅' },
            { label: 'Hampir Habis', count: inventory.filter(p => p.status === 'Hampir Habis').length, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: '⚠️' },
            { label: 'Stok Habis', count: inventory.filter(p => p.status === 'Habis').length, color: 'text-red-600', bg: 'bg-red-50 border-red-200', icon: '❌' },
          ].map(s => (
            <button
              key={s.label}
              onClick={() => setFilterStatus(s.label === 'Stok Tersedia' ? 'Tersedia' : s.label === 'Hampir Habis' ? 'Hampir Habis' : 'Habis')}
              className={`${s.bg} border rounded-2xl p-4 text-center hover:shadow-sm transition-shadow`}
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className={`text-2xl font-extrabold ${s.color}`}>{s.count}</div>
              <div className="text-xs text-gray-600 mt-0.5">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari produk..."
              className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
            className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {['Semua', 'Tersedia', 'Hampir Habis', 'Habis'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['ID', 'Nama Produk', 'Supplier', 'Stok', 'Satuan', 'Harga', 'Status', 'Update Terakhir', 'Aksi'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className={`border-b border-gray-50 hover:bg-gray-50/50 ${p.status === 'Habis' ? 'opacity-70' : ''}`}>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 max-w-44 truncate">{p.name}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{p.supplier}</td>
                    <td className="px-4 py-3">
                      {editId === p.id ? (
                        <input
                          type="number"
                          value={editStock}
                          onChange={e => setEditStock(Number(e.target.value))}
                          className="w-20 border border-green-400 rounded-lg px-2 py-1 text-sm focus:outline-none"
                        />
                      ) : (
                        <span className={`font-bold ${p.stock === 0 ? 'text-red-500' : p.stock <= 30 ? 'text-amber-500' : 'text-gray-800'}`}>
                          {p.stock}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{p.unit}</td>
                    <td className="px-4 py-3 font-medium text-gray-700">{p.price}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[p.status]}`}>{p.status}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{p.lastUpdate}</td>
                    <td className="px-4 py-3">
                      {editId === p.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => saveEdit(p.id)} className="text-green-600 hover:underline text-xs font-medium">Simpan</button>
                          <span className="text-gray-300">|</span>
                          <button onClick={() => setEditId(null)} className="text-gray-400 hover:underline text-xs">Batal</button>
                        </div>
                      ) : (
                        <button onClick={() => { setEditId(p.id); setEditStock(p.stock) }} className="text-blue-600 hover:underline text-xs font-medium">
                          Update Stok
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
