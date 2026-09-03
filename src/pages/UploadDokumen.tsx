import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

const sideNav = [
  { id: 'dashboard', label: 'Beranda', icon: '🏠' },
  { id: 'supply-chain', label: 'Rantai Pasok', icon: '🔗' },
  { id: 'supplier-catalog', label: 'Pemasok', icon: '👥' },
  { id: 'upload-dokumen', label: 'Dokumen', icon: '📄' },
  { id: 'laporan', label: 'Laporan', icon: '📊' },
  { id: 'settings', label: 'Pengaturan', icon: '⚙️' },
]

type DocType = 'Sertifikat Halal' | 'Dokumen Pendukung'

export default function UploadDokumen({ onNavigate }: Props) {
  const { t } = useTranslation()
  const [activeNav] = useState('upload-dokumen')
  const [docType, setDocType] = useState<DocType>('Sertifikat Halal')
  const [showDropdown, setShowDropdown] = useState(false)
  const [supplier, setSupplier] = useState('')
  const [notes, setNotes] = useState('')
  const [file, setFile] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [processed, setProcessed] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) {
      setFile(f.name)
      simulateAI()
    }
  }

  function handleBrowse(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) {
      setFile(f.name)
      simulateAI()
    }
  }

  function simulateAI() {
    setProcessed(false)
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setProcessed(true)
    }, 2000)
  }

  function handleSubmit() {
    setSubmitted(true)
    setTimeout(() => {
      onNavigate('verification')
    }, 1500)
  }

  return (
    <div className="flex h-screen bg-gray-50 font-['Inter',sans-serif] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div
          className="flex items-center gap-2 px-4 py-5 border-b border-gray-100 cursor-pointer"
          onClick={() => onNavigate('landing')}
        >
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">S</div>
          <span className="text-teal-700 font-extrabold text-sm">SUKAHALAL</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {sideNav.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeNav === item.id
                  ? 'bg-teal-50 text-teal-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-8 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <button onClick={() => onNavigate('dashboard')} className="hover:text-gray-600 cursor-pointer">Dashboard</button>
              <span>›</span>
              <span className="text-gray-700 font-medium">Upload Dokumen</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Upload Dokumen & AI-Assist Ekstraksi</h1>
            <p className="text-xs text-gray-500 mt-1">Unggah dokumen sertifikasi atau hasil uji lab untuk validasi otomatis BPJPH</p>
          </div>
          <button onClick={() => onNavigate('verification')} className="text-xs text-teal-700 bg-teal-50 border border-teal-200 px-3 py-2 rounded-xl font-semibold hover:bg-teal-100 transition-colors cursor-pointer">
            Pusat Verifikasi →
          </button>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-3 mb-6 transition-colors cursor-pointer ${
            dragOver ? 'border-teal-400 bg-teal-50' : 'border-gray-300 bg-white hover:border-teal-400 shadow-xs'
          }`}
          onClick={() => fileRef.current?.click()}
        >
          <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl shadow-md">⬆</div>
          {file ? (
            <p className="text-sm font-semibold text-teal-700">{file}</p>
          ) : (
            <p className="text-sm text-gray-500">Seret file sertifikat ke sini atau klik Browse</p>
          )}
          <button
            className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold px-5 py-2 rounded-lg transition-colors cursor-pointer"
            onClick={e => { e.stopPropagation(); fileRef.current?.click() }}
          >
            Pilih File (PDF, JPG, PNG)
          </button>
          <input ref={fileRef} type="file" accept=".pdf,.jpg,.png" onChange={handleBrowse} className="hidden" />
        </div>

        {/* Form row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Tipe Dokumen */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tipe Dokumen</label>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2.5 text-xs text-gray-700 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
              >
                {docType}
                <span className="text-gray-400">▾</span>
              </button>
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                  {(['Sertifikat Halal', 'Dokumen Pendukung'] as DocType[]).map(t => (
                    <button
                      key={t}
                      onClick={() => { setDocType(t); setShowDropdown(false) }}
                      className={`w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 transition-colors cursor-pointer ${docType === t ? 'font-semibold text-teal-700 bg-teal-50' : 'text-gray-700'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pemasok Terkait */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Pemasok Terkait</label>
            <input
              type="text"
              value={supplier}
              onChange={e => setSupplier(e.target.value)}
              placeholder="Contoh: PT Berkah Foods..."
              className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Catatan Opsional */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Catatan Opsional</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Catatan tambahan dokumen..."
              rows={2}
              className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
            />
          </div>
        </div>

        {/* AI Extracted fields */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4 shadow-xs">
          <div className="text-xs font-bold text-gray-800 mb-3 flex items-center gap-1.5">
            <span>🤖</span> Hasil Ekstraksi Data Otomatis (AI-Assist):
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-3">
            {[
              { label: 'Nama Produk', ok: processed, val: 'Mie Organik Halal Premium' },
              { label: 'Tanggal Kadaluarsa', ok: processed, val: '24 Oktober 2027' },
              { label: 'Bahan Utama', ok: processed, val: 'Tepung Gandum Organik' },
              { label: 'Status Halal BPJPH', ok: processed, val: 'Sertifikat Aktif Valid' },
            ].map(f => (
              <div key={f.label} className="flex items-center justify-between border-b border-gray-50 pb-2">
                <div>
                  <span className="text-xs text-gray-700 font-medium">{f.label}</span>
                  {f.ok && <div className="text-[11px] text-teal-700">{f.val}</div>}
                </div>
                {processing ? (
                  <span className="text-gray-400 text-xs animate-spin">⟳</span>
                ) : f.ok ? (
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold">✓</div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">?</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI processing status */}
        {processing && (
          <div className="flex items-center justify-center gap-2 py-2 mb-4 text-xs text-gray-500">
            <span className="inline-block w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            Memproses ekstraksi AI...
          </div>
        )}
        {processed && !processing && (
          <div className="flex items-center justify-center gap-2 py-2 mb-4 text-xs text-teal-600 font-medium">
            ✅ AI berhasil membaca dan mencocokkan dokumen dengan standar BPJPH
          </div>
        )}

        {/* Submit button */}
        {submitted ? (
          <div className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl text-xs text-center shadow-sm">
            ✓ Berhasil dikirim ke BPJPH! Mengalihkan ke Pusat Verifikasi...
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl text-xs transition-colors cursor-pointer shadow-sm"
          >
            Konfirmasi dan Kirim ke BPJPH ✓
          </button>
        )}
      </main>
    </div>
  )
}
