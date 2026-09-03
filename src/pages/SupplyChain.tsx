import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

const sideNav = [
  { id: 'dashboard', label: 'Dasbor', icon: '⊞' },
  { id: 'supply-chain', label: 'Manajemen Rantai Pasok', icon: '🔗' },
  { id: 'verification', label: 'Pusat Verifikasi', icon: '🛡️' },
  { id: 'inventaris', label: 'Inventaris', icon: '📦' },
  { id: 'pesanan', label: 'Pesanan', icon: '🛒' },
  { id: 'laporan', label: 'Laporan', icon: '📊' },
  { id: 'settings', label: 'Pengaturan', icon: '⚙️' },
]

type NodeStatus = 'Aktif' | 'Pending' | 'Perlu Perhatian'

interface ChainNode {
  id: string
  role: string
  name: string
  location: string
  certified: boolean
  status: NodeStatus
  since: string
  temp?: string
  seal?: string
}

const chainNodes: ChainNode[] = [
  { id: '1', role: 'Supplier', name: 'PT Berkah Agro', location: 'Jawa Tengah', certified: true, status: 'Aktif', since: 'Jan 2023', temp: '24°C', seal: 'Aman' },
  { id: '2', role: 'Manufacturer', name: 'PT Berkah Foods', location: 'Jakarta', certified: true, status: 'Aktif', since: 'Jan 2023', temp: '18°C', seal: 'Tervalidasi' },
  { id: '3', role: 'Packager', name: 'CV Kemasan Berkah', location: 'Tangerang', certified: true, status: 'Aktif', since: 'Mar 2023', temp: '22°C', seal: 'Tersegel Halal' },
  { id: '4', role: 'Distributor', name: 'PT Distribusi Halal', location: 'Jakarta', certified: true, status: 'Perlu Perhatian', since: 'Jun 2023', temp: '4°C (Cold Chain)', seal: 'Sensor Aktif' },
  { id: '5', role: 'Retailer', name: 'Berbagai Toko Mitra', location: 'Seluruh Indonesia', certified: false, status: 'Aktif', since: 'Agu 2023', temp: 'Suhu Ruang', seal: 'Utuh' },
]

const statusColors: Record<NodeStatus, string> = {
  'Aktif': 'bg-green-100 text-green-700',
  'Pending': 'bg-amber-100 text-amber-700',
  'Perlu Perhatian': 'bg-red-100 text-red-600',
}

const roleColors: Record<string, string> = {
  'Supplier': 'bg-blue-600',
  'Manufacturer': 'bg-teal-600',
  'Packager': 'bg-cyan-500',
  'Distributor': 'bg-green-600',
  'Retailer': 'bg-emerald-500',
}

export default function SupplyChain({ onNavigate, userRole }: Props) {
  const { t } = useTranslation()
  const [activeNav, setActiveNav] = useState('supply-chain')
  const [selectedNode, setSelectedNode] = useState<ChainNode | null>(null)
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMemberName, setNewMemberName] = useState('')
  const [newMemberRole, setNewMemberRole] = useState('Supplier')
  const [newMemberLoc, setNewMemberLoc] = useState('')
  const [memberAdded, setMemberAdded] = useState(false)
  const [showFmea, setShowFmea] = useState(false)

  function handleNav(id: string) {
    setActiveNav(id)
    if (id !== 'supply-chain') onNavigate(id)
  }

  function handleAddMember(e: React.FormEvent) {
    e.preventDefault()
    if (!newMemberName || !newMemberLoc) return
    chainNodes.push({
      id: String(chainNodes.length + 1),
      role: newMemberRole,
      name: newMemberName,
      location: newMemberLoc,
      certified: true,
      status: 'Aktif',
      since: 'Hari ini',
    })
    setMemberAdded(true)
    setTimeout(() => {
      setMemberAdded(false)
      setShowAddMember(false)
      setNewMemberName('')
      setNewMemberLoc('')
    }, 1500)
  }

  return (
    <div className="flex h-screen bg-gray-50 font-['Inter',sans-serif] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-100 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
          <span className="font-extrabold text-green-700 text-sm">SUKAHALAL</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {sideNav.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeNav === item.id
                  ? 'bg-teal-50 text-teal-700 font-semibold border-l-4 border-teal-600 rounded-l-none pl-2'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              <span className="text-left text-xs">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <button onClick={() => onNavigate('dashboard')} className="hover:text-gray-600 cursor-pointer">Dashboard</button>
              <span>›</span>
              <span className="text-gray-700 font-medium">Manajemen Rantai Pasok</span>
            </div>
            <h1 className="text-xl font-extrabold text-gray-900">Manajemen Rantai Pasok Halal</h1>
            <p className="text-xs text-gray-500">Pantau seluruh jalur pasok halal dari hulu ke hilir dengan jaminan integritas syariah</p>
          </div>
          <button onClick={() => setShowFmea(!showFmea)} className="border border-green-300 text-green-700 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs">
            <span>🛡️</span> {showFmea ? 'Sembunyikan Peta Risiko' : 'Peta Risiko Halal (FMEA)'}
          </button>
        </div>

        {/* FMEA & IoT Risk Map Collapsible */}
        {showFmea && (
          <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <span>🛡️</span> Critical Control Points (CCP) & Mitigasi Risiko Halal
              </h3>
              <span className="text-[11px] text-gray-400">Analisis FMEA Halal Supply Chain</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                <div className="font-bold text-green-900 mb-1">1. Titik Hulu (Petani/RPH)</div>
                <p className="text-gray-600">Risiko: Penyembelihan & bahan pakan tidak halal.</p>
                <div className="mt-2 font-semibold text-green-700">✓ Kontrol: Audit Juleha & sertifikat BPJPH.</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <div className="font-bold text-blue-900 mb-1">2. Produksi & Pengemasan</div>
                <p className="text-gray-600">Risiko: Kontaminasi silang zat najis pada mesin.</p>
                <div className="mt-2 font-semibold text-blue-700">✓ Kontrol: Sanitasi syariah & segel RFID.</div>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <div className="font-bold text-amber-900 mb-1">3. Distribusi & Cold-Chain</div>
                <p className="text-gray-600">Risiko: Pencampuran kargo dalam satu kontainer.</p>
                <div className="mt-2 font-semibold text-amber-700">✓ Kontrol: IoT Sensor suhu & segel GPS.</div>
              </div>
            </div>
          </div>
        )}

        {/* Visual chain */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-gray-800 text-sm mb-5">Visualisasi Alur Rantai Pasok Terintegrasi</h2>
          <div className="flex items-center gap-0 overflow-x-auto pb-2">
            {chainNodes.map((node, i) => (
              <div key={node.id} className="flex items-center">
                <button
                  onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all min-w-28 cursor-pointer ${
                    selectedNode?.id === node.id
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-10 h-10 ${roleColors[node.role]} rounded-xl flex items-center justify-center text-white font-bold text-xs`}>
                    {node.role[0]}
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{node.role}</div>
                    <div className="text-xs font-semibold text-gray-800 leading-tight mt-0.5">{node.name}</div>
                    <div className="mt-1">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${statusColors[node.status]}`}>
                        {node.status}
                      </span>
                    </div>
                  </div>
                </button>
                {i < chainNodes.length - 1 && (
                  <div className="flex items-center mx-1">
                    <div className="w-8 h-0.5 bg-green-300" />
                    <span className="text-green-400 text-xs">▸</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {selectedNode && (
            <div className="mt-5 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <div className={`inline-block text-white text-xs font-bold px-2.5 py-1 rounded-lg mb-2 ${roleColors[selectedNode.role]}`}>
                    {selectedNode.role}
                  </div>
                  <h3 className="font-bold text-gray-900">{selectedNode.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span>📍 Lokasi: {selectedNode.location}</span>
                    <span>•</span>
                    <span>🌡️ Sensor: {selectedNode.temp}</span>
                    <span>•</span>
                    <span>🔒 Status Segel: {selectedNode.seal}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[selectedNode.status]}`}>{selectedNode.status}</span>
                    {selectedNode.certified && (
                      <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">✅ Halal Tayiban Resmi</span>
                    )}
                    <span className="text-xs text-gray-400">Bergabung: {selectedNode.since}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedNode(null)} className="text-gray-400 hover:text-gray-600 text-sm cursor-pointer">✕</button>
              </div>
              <div className="flex gap-2 mt-3">
                {selectedNode.role === 'Supplier' && (
                  <button onClick={() => onNavigate('supplier-profile')} className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer">
                    Lihat Profil Pemasok
                  </button>
                )}
                <button onClick={() => onNavigate('upload-dokumen')} className="border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer">
                  Lihat Dokumen Sertifikasi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-sm">Anggota Rantai Pasok Terdaftar</h2>
            <button onClick={() => setShowAddMember(true)} className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-xs">
              + Tambah Anggota
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Peran', 'Nama Perusahaan', 'Lokasi', 'Sertifikasi', 'Status', 'Bergabung', 'Aksi'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chainNodes.map(node => (
                  <tr key={node.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className={`inline-block text-white text-[11px] font-bold px-2.5 py-0.5 rounded-lg ${roleColors[node.role]}`}>
                        {node.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-800">{node.name}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{node.location}</td>
                    <td className="px-5 py-3.5">
                      {node.certified ? (
                        <span className="text-green-600 font-semibold text-xs flex items-center gap-1">✅ Terverifikasi</span>
                      ) : (
                        <span className="text-gray-400 text-xs">Belum Ada</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[node.status]}`}>{node.status}</span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">{node.since}</td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => setSelectedNode(node)} className="text-teal-600 hover:underline text-xs font-medium cursor-pointer">Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-extrabold text-gray-900 text-base">Tambah Anggota Rantai Pasok</h2>
              <button onClick={() => setShowAddMember(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">✕</button>
            </div>
            {memberAdded ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-2">✅</div>
                <p className="font-bold text-gray-800 text-sm">Anggota Berhasil Ditambahkan!</p>
              </div>
            ) : (
              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Nama Perusahaan / Toko</label>
                  <input type="text" value={newMemberName} onChange={e => setNewMemberName(e.target.value)} required placeholder="Contoh: PT Sumber Pangan Halal"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Peran dalam Rantai Pasok</label>
                  <select value={newMemberRole} onChange={e => setNewMemberRole(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white">
                    {['Supplier', 'Manufacturer', 'Packager', 'Distributor', 'Retailer'].map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Lokasi</label>
                  <input type="text" value={newMemberLoc} onChange={e => setNewMemberLoc(e.target.value)} required placeholder="Contoh: Surabaya, Jawa Timur"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowAddMember(false)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-xs hover:bg-gray-50 cursor-pointer">Batal</button>
                  <button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-sm">Simpan</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
