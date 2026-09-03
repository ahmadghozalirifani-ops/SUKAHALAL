import { useState } from 'react'
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
}

const chainNodes: ChainNode[] = [
  { id: '1', role: 'Supplier', name: 'PT Berkah Agro', location: 'Jawa Tengah', certified: true, status: 'Aktif', since: 'Jan 2023' },
  { id: '2', role: 'Manufacturer', name: 'PT Berkah Foods', location: 'Jakarta', certified: true, status: 'Aktif', since: 'Jan 2023' },
  { id: '3', role: 'Packager', name: 'CV Kemasan Berkah', location: 'Tangerang', certified: true, status: 'Aktif', since: 'Mar 2023' },
  { id: '4', role: 'Distributor', name: 'PT Distribusi Halal', location: 'Jakarta', certified: true, status: 'Perlu Perhatian', since: 'Jun 2023' },
  { id: '5', role: 'Retailer', name: 'Berbagai Toko Mitra', location: 'Seluruh Indonesia', certified: false, status: 'Aktif', since: 'Agu 2023' },
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

export default function SupplyChain({ onNavigate }: Props) {
  const [activeNav, setActiveNav] = useState('supply-chain')
  const [selectedNode, setSelectedNode] = useState<ChainNode | null>(null)
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMemberName, setNewMemberName] = useState('')
  const [newMemberRole, setNewMemberRole] = useState('Supplier')
  const [newMemberLoc, setNewMemberLoc] = useState('')
  const [memberAdded, setMemberAdded] = useState(false)

  function handleNav(id: string) {
    setActiveNav(id)
    if (id !== 'supply-chain') onNavigate(id)
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
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
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
        <div className="mb-6">
          <h1 className="text-xl font-extrabold text-gray-900">Manajemen Rantai Pasok</h1>
          <p className="text-sm text-gray-500">Pantau seluruh jalur pasok halal dari hulu ke hilir</p>
        </div>

        {/* Visual chain */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-gray-800 text-sm mb-5">Visualisasi Rantai Pasok</h2>
          <div className="flex items-center gap-0 overflow-x-auto pb-2">
            {chainNodes.map((node, i) => (
              <div key={node.id} className="flex items-center">
                <button
                  onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all min-w-28 ${
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
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <span>📍</span> {selectedNode.location}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[selectedNode.status]}`}>{selectedNode.status}</span>
                    {selectedNode.certified && (
                      <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">✅ Halal Tayiban</span>
                    )}
                    <span className="text-xs text-gray-400">Bergabung: {selectedNode.since}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedNode(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="flex gap-2 mt-3">
                {selectedNode.role === 'Supplier' && (
                  <button onClick={() => onNavigate('supplier-profile')} className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                    Lihat Profil
                  </button>
                )}
                <button onClick={() => onNavigate('upload-dokumen')} className="border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-semibold px-3 py-1.5 rounded-lg">
                  Lihat Dokumen
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-sm">Anggota Rantai Pasok</h2>
            <button onClick={() => setShowAddMember(true)} className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
              + Tambah Anggota
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Peran', 'Nama', 'Lokasi', 'Sertifikasi', 'Status', 'Bergabung', 'Aksi'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chainNodes.map(node => (
                  <tr key={node.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-3">
                      <span className={`text-white text-xs font-bold px-2 py-1 rounded-lg ${roleColors[node.role]}`}>{node.role}</span>
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-800">{node.name}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{node.location}</td>
                    <td className="px-5 py-3">
                      {node.certified
                        ? <span className="text-green-600 text-xs font-semibold">✅ Halal Tayiban</span>
                        : <span className="text-gray-400 text-xs">–</span>
                      }
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[node.status]}`}>{node.status}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{node.since}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)} className="text-blue-600 hover:underline text-xs font-medium">Detail</button>
                        <span className="text-gray-300">|</span>
                        <button onClick={() => onNavigate('upload-dokumen')} className="text-gray-500 hover:underline text-xs">Dokumen</button>
                      </div>
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
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            {!memberAdded ? (
              <>
                <h2 className="font-extrabold text-gray-900 text-lg mb-4">Tambah Anggota Rantai Pasok</h2>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Peran</label>
                    <select value={newMemberRole} onChange={e => setNewMemberRole(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                      {['Supplier', 'Manufacturer', 'Packager', 'Distributor', 'Retailer'].map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Nama Perusahaan</label>
                    <input type="text" value={newMemberName} onChange={e => setNewMemberName(e.target.value)} placeholder="PT/CV Nama Perusahaan"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Lokasi</label>
                    <input type="text" value={newMemberLoc} onChange={e => setNewMemberLoc(e.target.value)} placeholder="Kota, Provinsi"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowAddMember(false)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50">Batal</button>
                  <button onClick={() => { setMemberAdded(true); setTimeout(() => { setShowAddMember(false); setMemberAdded(false); setNewMemberName(''); setNewMemberLoc('') }, 1500) }}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">Tambah</button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">✅</div>
                <h2 className="font-extrabold text-gray-900 text-lg mb-2">Anggota Ditambahkan!</h2>
                <p className="text-sm text-gray-500">{newMemberName || 'Anggota baru'} berhasil ditambahkan ke rantai pasok.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
