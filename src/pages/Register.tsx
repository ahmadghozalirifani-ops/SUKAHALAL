import { useState } from 'react'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

type Step = 'role' | 'form' | 'confirm'
type Role = 'seller' | 'distributor' | 'customer'

const roles = [
  { id: 'seller' as Role, label: 'Penjual (Seller)', desc: 'Jual produk halal Anda dan kelola inventaris', icon: '🛒', color: 'border-green-300 bg-green-50 hover:border-green-500' },
  { id: 'distributor' as Role, label: 'Distributor', desc: 'Kelola distribusi dan logistik produk halal', icon: '🚛', color: 'border-blue-300 bg-blue-50 hover:border-blue-500' },
  { id: 'customer' as Role, label: 'Konsumen', desc: 'Beli produk halal terpercaya dengan transparansi penuh', icon: '👤', color: 'border-purple-300 bg-purple-50 hover:border-purple-500' },
]

export default function Register({ onNavigate }: Props) {
  const [step, setStep] = useState<Step>('role')
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleSubmit() {
    setSuccess(true)
    setTimeout(() => {
      const loginPage = selectedRole === 'seller' ? 'login-seller' : selectedRole === 'distributor' ? 'login-distributor' : 'login-customer'
      onNavigate(loginPage)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex flex-col items-center justify-center px-4 font-['Inter',sans-serif] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #16a34a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="flex items-center gap-2 mb-6 cursor-pointer relative z-10" onClick={() => onNavigate('landing')}>
        <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center text-white font-extrabold text-lg">S</div>
        <span className="text-green-700 font-extrabold text-lg">SUKAHALAL</span>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative z-10">
        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {['Pilih Peran', 'Isi Data', 'Konfirmasi'].map((s, i) => {
            const stepMap: Step[] = ['role', 'form', 'confirm']
            const isActive = stepMap.indexOf(step) >= i
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>{i + 1}</div>
                <span className={`text-xs font-medium ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>{s}</span>
                {i < 2 && <div className={`w-6 h-0.5 ${isActive ? 'bg-green-300' : 'bg-gray-200'}`} />}
              </div>
            )
          })}
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-extrabold text-green-700 mb-2">Pendaftaran Berhasil!</h2>
            <p className="text-sm text-gray-500">Mengalihkan ke halaman login...</p>
            <div className="mt-4 inline-block w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : step === 'role' ? (
          <>
            <h1 className="text-xl font-extrabold text-gray-900 text-center mb-2">Daftar di SUKAHALAL</h1>
            <p className="text-sm text-gray-500 text-center mb-6">Pilih peran Anda untuk memulai</p>
            <div className="space-y-3 mb-6">
              {roles.map(r => (
                <button key={r.id} onClick={() => setSelectedRole(r.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedRole === r.id ? r.color + ' shadow-md' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <span className="text-3xl">{r.icon}</span>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">{r.label}</div>
                    <div className="text-xs text-gray-500">{r.desc}</div>
                  </div>
                  {selectedRole === r.id && <span className="ml-auto text-green-600 text-lg">✓</span>}
                </button>
              ))}
            </div>
            <button onClick={() => selectedRole && setStep('form')} disabled={!selectedRole}
              className={`w-full font-bold py-3.5 rounded-xl text-sm transition-colors ${
                selectedRole ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}>
              Lanjut →
            </button>
          </>
        ) : step === 'form' ? (
          <>
            <h1 className="text-xl font-extrabold text-gray-900 text-center mb-1">Lengkapi Data Anda</h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              Daftar sebagai <span className="font-semibold text-green-600">{roles.find(r => r.id === selectedRole)?.label}</span>
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{selectedRole === 'customer' ? 'Nama Lengkap' : 'Nama Perusahaan / Toko'}</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={selectedRole === 'customer' ? 'Masukan nama lengkap Anda' : 'Masukan nama perusahaan'}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@contoh.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+62 8xx-xxxx-xxxx"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimal 8 karakter"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 pr-10" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-gray-400">{showPassword ? '👁' : '🙈'}</button>
              </div>
              {selectedRole === 'seller' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NPWP (opsional)</label>
                  <input type="text" placeholder="12.345.678.9-012.345"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
              )}
              {selectedRole === 'distributor' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Izin Distributor</label>
                  <input type="text" placeholder="REG1234567890"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep('role')} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50">← Kembali</button>
              <button onClick={() => setStep('confirm')} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">Lanjut →</button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-xl font-extrabold text-gray-900 text-center mb-4">Konfirmasi Pendaftaran</h1>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 mb-5">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Peran</span><span className="font-semibold text-gray-800">{roles.find(r => r.id === selectedRole)?.label}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Nama</span><span className="font-semibold text-gray-800">{name || '-'}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Email</span><span className="font-semibold text-gray-800">{email || '-'}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Telepon</span><span className="font-semibold text-gray-800">{phone || '-'}</span></div>
            </div>
            <label className="flex items-start gap-2 cursor-pointer mb-5">
              <input type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} className="w-4 h-4 accent-green-600 rounded mt-0.5" />
              <span className="text-sm text-gray-600">Saya setuju dengan <span className="text-green-600 font-medium">Syarat & Ketentuan</span> serta <span className="text-green-600 font-medium">Kebijakan Privasi</span> SUKAHALAL</span>
            </label>
            <div className="flex gap-3">
              <button onClick={() => setStep('form')} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50">← Kembali</button>
              <button onClick={handleSubmit} disabled={!agreeTerms}
                className={`flex-1 font-bold py-3 rounded-xl text-sm transition-colors ${
                  agreeTerms ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}>
                Daftar Sekarang
              </button>
            </div>
          </>
        )}

        {!success && (
          <p className="text-center text-sm text-gray-500 mt-5">
            Sudah punya akun?{' '}
            <button onClick={() => onNavigate('landing')} className="text-green-600 font-semibold hover:underline">Masuk</button>
          </p>
        )}
      </div>

      <button onClick={() => onNavigate('landing')} className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors relative z-10">
        ← Kembali ke Beranda
      </button>
    </div>
  )
}
