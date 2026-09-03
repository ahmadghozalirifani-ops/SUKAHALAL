import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

type OrderStatus = 'Baru' | 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan'

const initialOrders: { id: string; customer: string; product: string; qty: number; total: string; date: string; status: OrderStatus; address: string; courier: string; payment: string }[] = [
  { id: 'ORD-001', customer: 'Budi Santoso', product: 'Mi Instan Kari Ayam Halal', qty: 10, total: 'Rp 250.000', date: '03 Sep 2026', status: 'Baru', address: 'Jl. Sudirman No. 5, Jakarta', courier: 'JNE Regular (Halal Logistik)', payment: 'Bank Syariah BSI' },
  { id: 'ORD-002', customer: 'Siti Rahayu', product: 'Bumbu Dapur Rendang 200g', qty: 5, total: 'Rp 227.500', date: '02 Sep 2026', status: 'Diproses', address: 'Jl. Gatot Subroto 12, Bandung', courier: 'J&T Express (Segregasi Halal)', payment: 'Bank Muamalat' },
  { id: 'ORD-003', customer: 'Ahmad Fauzi', product: 'Beras Premium Pandan Wangi 5kg', qty: 3, total: 'Rp 255.000', date: '01 Sep 2026', status: 'Dikirim', address: 'Jl. Merdeka 8, Surabaya', courier: 'SiCepat Cargo', payment: 'QRIS Syariah' },
  { id: 'ORD-004', customer: 'Dewi Lestari', product: 'Kecap Manis Organik 275ml', qty: 8, total: 'Rp 304.000', date: '31 Agu 2026', status: 'Selesai', address: 'Jl. Diponegoro 15, Semarang', courier: 'AnterAja Halal Safe', payment: 'E-Wallet Syariah' },
  { id: 'ORD-005', customer: 'Rudi Hartono', product: 'Sambal Terasi Super 150ml', qty: 6, total: 'Rp 192.000', date: '30 Agu 2026', status: 'Dibatalkan', address: 'Jl. Ahmad Yani 3, Malang', courier: 'Pos Indonesia', payment: 'COD Halal' },
  { id: 'ORD-006', customer: 'Indah Permata', product: 'Keripik Singkong Balado 200g', qty: 12, total: 'Rp 342.000', date: '29 Agu 2026', status: 'Selesai', address: 'Jl. Pahlawan 22, Yogyakarta', courier: 'JNE Regular', payment: 'BSI Virtual Account' },
]

const statusColors: Record<OrderStatus, string> = {
  'Baru': 'bg-blue-100 text-blue-700',
  'Diproses': 'bg-amber-100 text-amber-700',
  'Dikirim': 'bg-purple-100 text-purple-700',
  'Selesai': 'bg-green-100 text-green-700',
  'Dibatalkan': 'bg-red-100 text-red-600',
}

const allStatuses: OrderStatus[] = ['Baru', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan']

export default function Pesanan({ onNavigate, userRole }: Props) {
  const { t } = useTranslation()
  const [filterStatus, setFilterStatus] = useState<'Semua' | OrderStatus>('Semua')
  const [search, setSearch] = useState('')
  const [orders, setOrders] = useState(initialOrders)
  const [detailOrder, setDetailOrder] = useState<typeof initialOrders[0] | null>(null)

  function updateStatus(id: string, newStatus: OrderStatus) {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o))
  }

  const filtered = orders.filter(o =>
    (filterStatus === 'Semua' || o.status === filterStatus) &&
    (o.customer.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search))
  )

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="font-extrabold text-green-700">SUKAHALAL</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
              {userRole === 'seller' ? '🛒 Mode Penjual' : userRole === 'distributor' ? '🚛 Mode Distributor' : '👤 Mode Konsumen'}
            </span>
            <button onClick={() => onNavigate('dashboard')} className="text-sm text-gray-500 hover:text-gray-700 font-medium">← Dashboard</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              {userRole === 'customer' ? 'Pesanan Saya' : 'Manajemen Pesanan'}
            </h1>
            <p className="text-sm text-gray-500">
              {userRole === 'customer' ? 'Pantau proses pengiriman pesanan halal Anda' : 'Kelola dan proses pesanan halal terintegrasi dari hulu ke hilir'}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {(['Semua', ...allStatuses] as const).map(s => {
            const count = s === 'Semua' ? orders.length : orders.filter(o => o.status === s).length
            return (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`rounded-xl p-3 text-center border transition-colors cursor-pointer ${
                  filterStatus === s ? 'bg-green-600 border-green-600 text-white shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}>
                <div className="text-xl font-extrabold">{count}</div>
                <div className="text-xs mt-0.5 font-medium">{s}</div>
              </button>
            )
          })}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari berdasarkan ID, nama pelanggan, atau produk..."
            className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm" />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['ID Pesanan', 'Pelanggan', 'Produk', 'Qty', 'Total', 'Tanggal', 'Status', 'Aksi'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-10 text-gray-400 text-sm">Tidak ada pesanan ditemukan</td></tr>
                ) : filtered.map(o => (
                  <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-700">{o.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{o.customer}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-40 truncate">{o.product}</td>
                    <td className="px-4 py-3 text-gray-600">{o.qty}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{o.total}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{o.date}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[o.status]}`}>{o.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setDetailOrder(o)} className="text-blue-600 hover:underline text-xs font-semibold cursor-pointer">Detail</button>
                        {userRole !== 'customer' && o.status === 'Baru' && (
                          <button onClick={() => updateStatus(o.id, 'Diproses')} className="text-green-600 hover:underline text-xs font-semibold cursor-pointer">Konfirmasi</button>
                        )}
                        {userRole !== 'customer' && o.status === 'Diproses' && (
                          <button onClick={() => updateStatus(o.id, 'Dikirim')} className="text-purple-600 hover:underline text-xs font-semibold cursor-pointer">Kirim</button>
                        )}
                        {userRole !== 'customer' && o.status === 'Dikirim' && (
                          <button onClick={() => updateStatus(o.id, 'Selesai')} className="text-green-600 hover:underline text-xs font-semibold cursor-pointer">Selesai</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal with Integrated Halal Chain */}
      {detailOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
              <div>
                <h2 className="font-extrabold text-gray-900 text-lg">Detail Pesanan & Rantai Halal</h2>
                <span className="text-xs text-green-600 font-medium">✓ Terverifikasi Integritas Halal Hulu-Hilir</span>
              </div>
              <button onClick={() => setDetailOrder(null)} className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer">✕</button>
            </div>

            {/* Hulu-ke-hilir Supply Chain Process Flow */}
            <div className="mb-4 bg-green-50/60 p-3.5 rounded-xl border border-green-200/60">
              <div className="text-xs font-bold text-green-800 mb-2">Alur Rantai Pasok Halal Pesanan:</div>
              <div className="grid grid-cols-5 gap-1 text-center">
                {[
                  { icon: '🌾', label: 'Bahan', done: true },
                  { icon: '🏭', label: 'Produksi', done: true },
                  { icon: '📦', label: 'Segel', done: detailOrder.status !== 'Baru' },
                  { icon: '🚚', label: 'Logistik', done: detailOrder.status === 'Dikirim' || detailOrder.status === 'Selesai' },
                  { icon: '🏠', label: 'Diterima', done: detailOrder.status === 'Selesai' },
                ].map((st, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-xs ${st.done ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      {st.icon}
                    </div>
                    <span className="text-[10px] font-semibold text-gray-700 mt-1">{st.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">ID Pesanan</span><span className="font-mono font-semibold text-gray-800">{detailOrder.id}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Pelanggan</span><span className="font-medium text-gray-800">{detailOrder.customer}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Produk</span><span className="font-medium text-gray-800">{detailOrder.product}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Jumlah</span><span className="font-medium text-gray-800">{detailOrder.qty} pcs</span></div>
              <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Metode Pembayaran</span><span className="font-medium text-green-700">{detailOrder.payment}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Jasa Pengiriman</span><span className="font-medium text-gray-800">{detailOrder.courier}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Tanggal</span><span className="text-gray-800">{detailOrder.date}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Status</span><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[detailOrder.status]}`}>{detailOrder.status}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Total Pembayaran</span><span className="font-bold text-green-700 text-sm">{detailOrder.total}</span></div>
              <div className="py-1"><span className="text-gray-500 block mb-0.5">Alamat Pengiriman:</span><span className="text-gray-700">{detailOrder.address}</span></div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setDetailOrder(null)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-xs hover:bg-gray-50 cursor-pointer">Tutup</button>
              {userRole !== 'customer' && detailOrder.status === 'Baru' && (
                <button onClick={() => { updateStatus(detailOrder.id, 'Diproses'); setDetailOrder(null) }} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-sm">Konfirmasi</button>
              )}
              {userRole !== 'customer' && detailOrder.status === 'Diproses' && (
                <button onClick={() => { updateStatus(detailOrder.id, 'Dikirim'); setDetailOrder(null) }} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-sm">Kirim ke Kurir</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
