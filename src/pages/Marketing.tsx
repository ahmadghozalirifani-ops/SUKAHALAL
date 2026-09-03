import { useState } from 'react'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

type Status = 'Aktif' | 'Dijadwalkan' | 'Berakhir'

const initialCampaigns: { id: number; name: string; type: string; discount: string; start: string; end: string; status: Status; reach: number; orders: number }[] = [
  { id: 1, name: 'Promo Ramadan Berkah', type: 'Diskon Produk', discount: '20%', start: '01 Mar', end: '30 Mar', status: 'Aktif', reach: 1240, orders: 87 },
  { id: 2, name: 'Flash Sale Jumat Halal', type: 'Flash Sale', discount: '35%', start: '07 Apr', end: '07 Apr', status: 'Dijadwalkan', reach: 0, orders: 0 },
  { id: 3, name: 'Buy 2 Get 1 Bumbu', type: 'Bundle', discount: 'B2G1', start: '15 Feb', end: '28 Feb', status: 'Berakhir', reach: 890, orders: 145 },
]

const statusColors: Record<Status, string> = {
  'Aktif': 'bg-green-100 text-green-700',
  'Dijadwalkan': 'bg-blue-100 text-blue-700',
  'Berakhir': 'bg-gray-100 text-gray-500',
}

export default function Marketing({ onNavigate }: Props) {
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [newCampaign, setNewCampaign] = useState({ name: '', type: 'Diskon Produk', discount: '', start: '', end: '' })
  const [campaigns, setCampaigns] = useState(initialCampaigns)

  function handleCreate() {
    if (!newCampaign.name) return
    if (editId !== null) {
      setCampaigns(prev => prev.map(c => c.id === editId ? {
        ...c, name: newCampaign.name, type: newCampaign.type, discount: newCampaign.discount || c.discount,
        start: newCampaign.start || c.start, end: newCampaign.end || c.end,
      } : c))
    } else {
      setCampaigns(prev => [...prev, {
        id: prev.length + 1, name: newCampaign.name, type: newCampaign.type,
        discount: newCampaign.discount || '10%', start: newCampaign.start || '-', end: newCampaign.end || '-',
        status: 'Dijadwalkan', reach: 0, orders: 0,
      }])
    }
    setShowForm(false)
    setEditId(null)
    setNewCampaign({ name: '', type: 'Diskon Produk', discount: '', start: '', end: '' })
  }

  function handleEdit(c: typeof initialCampaigns[0]) {
    setEditId(c.id)
    setNewCampaign({ name: c.name, type: c.type, discount: c.discount, start: c.start, end: c.end })
    setShowForm(true)
  }

  function handleActivate(id: number) {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'Aktif' as Status } : c))
  }

  function handleStop(id: number) {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'Berakhir' as Status } : c))
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
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('dashboard')} className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</button>
            <button onClick={() => { setEditId(null); setNewCampaign({ name: '', type: 'Diskon Produk', discount: '', start: '', end: '' }); setShowForm(true) }}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
              + Buat Kampanye
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-xl font-extrabold text-gray-900 mb-1">Marketing & Promosi</h1>
        <p className="text-sm text-gray-500 mb-6">Kelola kampanye promosi produk halal Anda</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Kampanye Aktif', value: campaigns.filter(c => c.status === 'Aktif').length, color: 'text-green-600', icon: '✅' },
            { label: 'Total Jangkauan', value: campaigns.reduce((a, c) => a + c.reach, 0).toLocaleString('id-ID'), color: 'text-blue-600', icon: '👁️' },
            { label: 'Total Pesanan', value: campaigns.reduce((a, c) => a + c.orders, 0), color: 'text-amber-600', icon: '🛒' },
            { label: 'Kampanye Total', value: campaigns.length, color: 'text-gray-800', icon: '📢' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="text-lg mb-1">{s.icon}</div>
              <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Campaign list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-sm">Daftar Kampanye</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Nama Kampanye', 'Tipe', 'Diskon', 'Periode', 'Status', 'Jangkauan', 'Pesanan', 'Aksi'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaigns.map(c => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                    <td className="px-4 py-3 text-gray-600">{c.type}</td>
                    <td className="px-4 py-3 font-bold text-amber-600">{c.discount}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{c.start} – {c.end}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{c.reach.toLocaleString('id-ID')}</td>
                    <td className="px-4 py-3 text-gray-600">{c.orders}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(c)} className="text-blue-600 hover:underline text-xs font-medium">Edit</button>
                        {c.status === 'Dijadwalkan' && (
                          <button onClick={() => handleActivate(c.id)} className="text-green-600 hover:underline text-xs font-medium">Aktifkan</button>
                        )}
                        {c.status === 'Aktif' && (
                          <button onClick={() => handleStop(c.id)} className="text-red-500 hover:underline text-xs font-medium">Hentikan</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2"><span>💡</span> Tips Marketing Produk Halal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Tampilkan badge "Halal Tayiban" secara mencolok di setiap promosi',
              'Buat kampanye spesial di bulan Ramadan dan Idul Fitri',
              'Tawarkan bundle produk halal yang saling melengkapi',
              'Gunakan media sosial untuk mempromosikan sertifikasi BPJPH Anda',
            ].map((tip, i) => (
              <div key={i} className="flex gap-2 text-sm text-amber-700">
                <span className="shrink-0 mt-0.5">•</span> {tip}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create/Edit campaign modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="font-extrabold text-gray-900 text-lg mb-5">{editId ? 'Edit Kampanye' : 'Buat Kampanye Baru'}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Nama Kampanye</label>
                <input type="text" value={newCampaign.name} onChange={e => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  placeholder="e.g. Promo Hari Raya 2024"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Tipe</label>
                  <select value={newCampaign.type} onChange={e => setNewCampaign({ ...newCampaign, type: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
                    {['Diskon Produk', 'Flash Sale', 'Bundle', 'Voucher'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Diskon</label>
                  <input type="text" value={newCampaign.discount} onChange={e => setNewCampaign({ ...newCampaign, discount: e.target.value })}
                    placeholder="e.g. 15%"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Tanggal Mulai</label>
                  <input type="date" value={newCampaign.start} onChange={e => setNewCampaign({ ...newCampaign, start: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Tanggal Berakhir</label>
                  <input type="date" value={newCampaign.end} onChange={e => setNewCampaign({ ...newCampaign, end: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { setShowForm(false); setEditId(null) }} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50">Batal</button>
                <button onClick={handleCreate} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                  {editId ? 'Simpan Perubahan' : 'Buat Kampanye'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
