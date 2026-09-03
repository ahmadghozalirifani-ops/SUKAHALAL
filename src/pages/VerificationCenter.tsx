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
  { id: 'dashboard', label: 'Dasbor', icon: '⊞' },
  { id: 'supply-chain', label: 'Manajemen Rantai Pasok', icon: '🔗' },
  { id: 'verification', label: 'Pusat Verifikasi', icon: '🛡️' },
  { id: 'inventaris', label: 'Inventaris', icon: '📦' },
  { id: 'pesanan', label: 'Pesanan', icon: '🛒' },
  { id: 'laporan', label: 'Laporan', icon: '📊' },
  { id: 'settings', label: 'Pengaturan', icon: '⚙️' },
]

const steps = [
  { num: 1, label: 'Upload Dokumen', icon: '⬆️' },
  { num: 2, label: 'AI-Extract Data', icon: '🤖' },
  { num: 3, label: 'Submit ke BPJPH', icon: '📋' },
  { num: 4, label: 'Status Real-time', icon: '📈' },
]

type Status = 'Menunggu' | 'Disetujui' | 'Ditolak'

const initialItems = [
  { no: 1, product: 'Keripik Tempe Renyah', submitted: '12-Oct-2023', status: 'Menunggu' as Status, eta: '19-Oct-2023' },
  { no: 2, product: 'Kopi Luwak Premium', submitted: '10-Oct-2023', status: 'Disetujui' as Status, eta: 'Ready' },
  { no: 3, product: 'Sambal Hijau Pedas', submitted: '09-Oct-2023', status: 'Menunggu' as Status, eta: '16-Oct-2023' },
  { no: 4, product: 'Saus Tomat Instan', submitted: '05-Oct-2023', status: 'Ditolak' as Status, eta: 'N/A' },
  { no: 5, product: 'Ayam Geprek Beku', submitted: '02-Oct-2023', status: 'Disetujui' as Status, eta: 'Ready' },
]

const statusColors: Record<Status, string> = {
  Menunggu: 'bg-amber-100 text-amber-700',
  Disetujui: 'bg-green-100 text-green-700',
  Ditolak: 'bg-red-100 text-red-700',
}

export default function VerificationCenter({ onNavigate }: Props) {
  const { t } = useTranslation()
  const [activeNav, setActiveNav] = useState('verification')
  const [activeStep, setActiveStep] = useState(1)
  const [items] = useState(initialItems)
  const [showTraceModal, setShowTraceModal] = useState(false)

  function handleNav(id: string) {
    setActiveNav(id)
    if (id !== 'verification') onNavigate(id)
  }

  return (
    <div className="flex h-screen bg-gray-50 font-['Inter',sans-serif] overflow-hidden">
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-100 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-extrabold text-sm">S</div>
          <span className="font-extrabold text-green-700 text-sm">SUKAHALAL</span>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-0.5">
          {sideNav.map(item => (
            <button key={item.id} onClick={() => handleNav(item.id)}
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

      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <button onClick={() => onNavigate('dashboard')} className="hover:text-gray-600 cursor-pointer">Dashboard</button>
            <span>›</span>
            <span className="text-gray-700 font-medium">Pusat Verifikasi Halal</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowTraceModal(true)} className="border border-green-300 text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer">
              🔍 Cek Traceability QR
            </button>
            <button onClick={() => onNavigate('dashboard')} className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 text-xs transition-colors cursor-pointer" title="Dashboard">⊞</button>
          </div>
        </div>

        <div className="p-6 max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-xl font-extrabold text-gray-900">Pusat Verifikasi Dokumen & Sertifikasi BPJPH</h1>
            <p className="text-xs text-gray-500 mt-1">Kelola dan pantau proses verifikasi sertifikasi Halal Anda secara terintegrasi dan transparan.</p>
          </div>

          {/* Steps */}
          <div className="flex gap-0 mb-6 overflow-x-auto">
            {steps.map((step, i) => (
              <button key={step.num} onClick={() => {
                setActiveStep(step.num)
                if (step.num === 1) onNavigate('upload-dokumen')
              }}
                className={`flex-1 min-w-36 flex flex-col items-center gap-2 py-4 px-4 relative transition-colors cursor-pointer ${
                  activeStep === step.num ? 'bg-teal-700 text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                } ${i === 0 ? 'rounded-l-xl' : ''} ${i === steps.length - 1 ? 'rounded-r-xl' : ''}`}
                style={i > 0 ? { clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 50%, 100% 100%, 12px 100%, 0 50%)' } : undefined}
              >
                <span className="text-2xl">{step.icon}</span>
                <div className="text-xs font-semibold text-center leading-tight">
                  <div className="opacity-70">Step {step.num}</div>
                  <div>{step.label}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-sm">Permintaan Verifikasi Saat Ini</h2>
              <button onClick={() => onNavigate('upload-dokumen')} className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-xs">
                + Ajukan Verifikasi Baru
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {['No', 'Nama Produk', 'Tanggal Submit', 'Status', 'ETA', 'Aksi'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.no} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3.5 text-gray-600">{item.no}</td>
                      <td className="px-5 py-3.5 font-medium text-gray-800">{item.product}</td>
                      <td className="px-5 py-3.5 text-gray-600 text-xs">{item.submitted}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[item.status]}`}>{item.status}</span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600 text-xs">{item.eta}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <button onClick={() => onNavigate('product-detail')} className="text-blue-600 hover:text-blue-700 text-xs font-medium cursor-pointer">Lihat Detail</button>
                          <span className="text-gray-300">|</span>
                          {item.status === 'Ditolak' ? (
                            <button onClick={() => onNavigate('upload-dokumen')} className="text-orange-600 hover:text-orange-700 text-xs font-medium cursor-pointer">Re-submit</button>
                          ) : (
                            <button onClick={() => onNavigate('upload-dokumen')} className="text-teal-600 hover:text-teal-700 text-xs font-medium cursor-pointer">Edit</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-center gap-2 py-4 border-t border-gray-100">
              {['⟨⟨', '⟨', '1', '...', '⟩', '⟩⟩'].map((n, i) => (
                <button key={i} className={`w-8 h-8 rounded-lg text-xs font-medium cursor-pointer ${n === '1' ? 'bg-teal-600 text-white' : 'border border-gray-200 text-gray-500 hover:bg-gray-50'}`}>{n}</button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Traceability Modal */}
      {showTraceModal && (
        <TraceabilityModal productName="Produk Halal Terverifikasi BPJPH" onClose={() => setShowTraceModal(false)} />
      )}
    </div>
  )
}
