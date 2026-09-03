import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Milestone {
  step: string
  location: string
  date: string
  status: 'done' | 'current' | 'pending'
  hash?: string
}

interface Props {
  productName?: string
  productId?: string | number
  isOpen?: boolean
  history?: any[]
  onClose: () => void
}

const mockMilestones: Milestone[] = [
  { step: '🌾 Bahan Baku', location: 'Farm Organik Malang, Jawa Timur', date: '12 Jul 2025', status: 'done', hash: '0x3f8a...c4d2' },
  { step: '🏭 Produksi', location: 'PT Pangan Halal Nusantara, Surabaya', date: '18 Jul 2025', status: 'done', hash: '0x7b2e...a9f1' },
  { step: '📦 Pengemasan', location: 'Packaging Center, Sidoarjo', date: '20 Jul 2025', status: 'done', hash: '0x1c9d...e5b3' },
  { step: '🚛 Distribusi', location: 'Gudang Halal Jakarta Timur', date: '23 Jul 2025', status: 'current', hash: '0x4a7f...d8c1' },
  { step: '🏪 Retailer', location: 'Toko Halal Nusantara', date: 'Estimasi 25 Jul 2025', status: 'pending' },
  { step: '🏠 Konsumen', location: 'Pengiriman Terakhir', date: 'Estimasi 26 Jul 2025', status: 'pending' },
]

export default function TraceabilityModal({ 
  productName = 'Produk Halal Terverifikasi', 
  isOpen = true, 
  onClose 
}: Props) {
  const { t } = useTranslation()
  const [scanned, setScanned] = useState(false)

  if (isOpen === false) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-500 p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-extrabold text-lg">🔍 {t('verification.qrTraceability', 'QR Traceability')}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-sm transition-colors">✕</button>
          </div>
          <p className="text-sm text-green-100">{productName}</p>
        </div>

        <div className="p-5">
          {!scanned ? (
            <div className="text-center">
              {/* Simulated QR Code */}
              <div className="w-40 h-40 mx-auto mb-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                <div className="text-5xl">📱</div>
              </div>
              <p className="text-sm text-gray-500 mb-4">{t('verification.scanQr', 'Scan QR untuk melihat perjalanan produk')}</p>
              <button
                onClick={() => setScanned(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
              >
                🔍 Simulasi Scan QR
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-600 font-bold text-sm">✅ {t('verification.blockchainVerified', 'Terverifikasi Blockchain')}</span>
                <span className="text-xs text-gray-400">via Ethereum Testnet</span>
              </div>
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {mockMilestones.map((m, i) => (
                  <div key={i} className={`flex gap-3 p-3 rounded-xl border ${
                    m.status === 'done' ? 'bg-green-50 border-green-100'
                    : m.status === 'current' ? 'bg-amber-50 border-amber-200'
                    : 'bg-gray-50 border-gray-100'
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      m.status === 'done' ? 'bg-green-500 text-white'
                      : m.status === 'current' ? 'bg-amber-400 text-white'
                      : 'bg-gray-200 text-gray-400'
                    }`}>{m.status === 'done' ? '✓' : m.status === 'current' ? '●' : String(i + 1)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">{m.step}</div>
                      <div className="text-xs text-gray-500">{m.location}</div>
                      <div className="text-xs text-gray-400">{m.date}</div>
                      {m.hash && <div className="text-[10px] font-mono text-green-600 mt-0.5">{m.hash}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
