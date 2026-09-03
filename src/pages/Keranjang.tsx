import { useState } from 'react'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

interface CartItem {
  id: number
  name: string
  supplier: string
  price: number
  qty: number
  emoji: string
  halal: boolean
}

const initialCart: CartItem[] = [
  { id: 1, name: 'Mi Instan Kari Ayam Halal', supplier: 'CV Halal Mart', price: 25000, qty: 3, emoji: '🍜', halal: true },
  { id: 2, name: 'Bumbu Dapur Rendang 200g', supplier: 'PT Bumbu Nusantara', price: 45500, qty: 2, emoji: '🫙', halal: true },
  { id: 3, name: 'Beras Premium Pandan Wangi 5kg', supplier: 'UD Jaya Beras', price: 85000, qty: 1, emoji: '🌾', halal: true },
]

const couriers = [
  { name: 'JNE Regular', est: '3-5 hari', cost: 15000 },
  { name: 'J&T Express', est: '2-4 hari', cost: 18000 },
  { name: 'SiCepat Halu', est: '1-3 hari', cost: 22000 },
  { name: 'AnterAja', est: '2-4 hari', cost: 16000 },
  { name: 'Pos Indonesia', est: '5-7 hari', cost: 12000 },
]

const paymentMethods = [
  { id: 'transfer', label: 'Transfer Bank Syariah', desc: 'BSI, Bank Muamalat, BNI Syariah', icon: '🏦' },
  { id: 'ewallet', label: 'E-Wallet', desc: 'OVO, GoPay, DANA, ShopeePay', icon: '📱' },
  { id: 'cod', label: 'Bayar di Tempat (COD)', desc: 'Bayar saat barang diterima', icon: '💵' },
  { id: 'qris', label: 'QRIS', desc: 'Scan QR di semua bank & e-wallet', icon: '📷' },
]

export default function Keranjang({ onNavigate }: Props) {
  const [cart, setCart] = useState(initialCart)
  const [selectedCourier, setSelectedCourier] = useState(0)
  const [selectedPayment, setSelectedPayment] = useState('transfer')
  const [address, setAddress] = useState('Jl. Kebon Jeruk No. 12, Jakarta Barat, DKI Jakarta, 11530')
  const [checkingOut, setCheckingOut] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [step, setStep] = useState<'cart' | 'checkout'>('cart')

  function updateQty(id: number, delta: number) {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item))
  }

  function removeItem(id: number) {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0)
  const shipping = couriers[selectedCourier].cost
  const total = subtotal + shipping

  function handleCheckout() {
    setCheckingOut(true)
    setTimeout(() => {
      setCheckingOut(false)
      setOrderSuccess(true)
      setTimeout(() => onNavigate('pesanan'), 2000)
    }, 1500)
  }

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif] flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-2">Keranjang Kosong</h2>
        <p className="text-sm text-gray-500 mb-6">Belum ada produk di keranjang Anda</p>
        <button onClick={() => onNavigate('product-catalog')} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
          Jelajahi Katalog →
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="font-extrabold text-green-700">SUKAHALAL</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('product-catalog')} className="text-sm text-gray-500 hover:text-gray-700">← Lanjut Belanja</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Steps */}
        <div className="flex items-center gap-4 mb-8">
          {['Keranjang', 'Checkout'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                (i === 0 && step === 'cart') || (i === 1 && step === 'checkout') ? 'bg-green-600 text-white' : step === 'checkout' && i === 0 ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-500'
              }`}>{i === 0 && step === 'checkout' ? '✓' : i + 1}</div>
              <span className={`text-sm font-medium ${(i === 0 && step === 'cart') || (i === 1 && step === 'checkout') ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
              {i < 1 && <div className="w-12 h-0.5 bg-gray-200 mx-2" />}
            </div>
          ))}
        </div>

        {orderSuccess ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-extrabold text-green-700 mb-2">Pesanan Berhasil!</h2>
            <p className="text-sm text-gray-500 mb-4">Pesanan Anda sedang diproses. Mengalihkan ke halaman pesanan...</p>
            <div className="inline-block w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : step === 'cart' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h1 className="text-xl font-extrabold text-gray-900 mb-4">Keranjang Belanja ({cart.length} item)</h1>
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                    <div className="w-16 h-16 bg-amber-50 rounded-xl flex items-center justify-center text-3xl shrink-0">{item.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 text-sm truncate">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.supplier}</div>
                      {item.halal && <span className="inline-flex items-center gap-1 text-green-600 text-[10px] font-bold mt-0.5">✅ Halal Tayiban</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">−</button>
                      <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">+</button>
                    </div>
                    <div className="text-right shrink-0 w-28">
                      <div className="font-bold text-green-700 text-sm">Rp {(item.price * item.qty).toLocaleString('id-ID')}</div>
                      <div className="text-[10px] text-gray-400">@Rp {item.price.toLocaleString('id-ID')}</div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 text-lg shrink-0">✕</button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Ringkasan Belanja</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal ({cart.reduce((a, c) => a + c.qty, 0)} item)</span><span className="font-medium">Rp {subtotal.toLocaleString('id-ID')}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Ongkos Kirim</span><span className="font-medium">Rp {shipping.toLocaleString('id-ID')}</span></div>
                  <div className="h-px bg-gray-100 my-2" />
                  <div className="flex justify-between"><span className="font-bold text-gray-900">Total</span><span className="font-extrabold text-green-700 text-lg">Rp {total.toLocaleString('id-ID')}</span></div>
                </div>
                <button onClick={() => setStep('checkout')} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                  Lanjut ke Checkout →
                </button>
                <button onClick={() => onNavigate('product-catalog')} className="w-full text-sm text-gray-500 hover:text-gray-700 mt-3 py-2">
                  ← Lanjut Belanja
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              <h1 className="text-xl font-extrabold text-gray-900">Checkout</h1>

              {/* Alamat */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">📍 Alamat Pengiriman</h3>
                <textarea value={address} onChange={e => setAddress(e.target.value)} rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none" />
              </div>

              {/* Kurir */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">🚛 Pilih Kurir</h3>
                <div className="space-y-2">
                  {couriers.map((c, i) => (
                    <button key={i} onClick={() => setSelectedCourier(i)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-colors text-left ${
                        selectedCourier === i ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{c.name}</div>
                        <div className="text-xs text-gray-500">Estimasi: {c.est}</div>
                      </div>
                      <span className="font-bold text-sm text-gray-800">Rp {c.cost.toLocaleString('id-ID')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pembayaran */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">💳 Metode Pembayaran (Syariah)</h3>
                <div className="space-y-2">
                  {paymentMethods.map(m => (
                    <button key={m.id} onClick={() => setSelectedPayment(m.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-colors text-left ${
                        selectedPayment === m.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <span className="text-2xl">{m.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{m.label}</div>
                        <div className="text-xs text-gray-500">{m.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Ringkasan Pesanan</h3>
                <div className="space-y-2 mb-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate mr-2">{item.name} x{item.qty}</span>
                      <span className="font-medium shrink-0">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-gray-100 my-3" />
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>Rp {subtotal.toLocaleString('id-ID')}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Ongkir ({couriers[selectedCourier].name})</span><span>Rp {shipping.toLocaleString('id-ID')}</span></div>
                </div>
                <div className="h-px bg-gray-100 my-3" />
                <div className="flex justify-between mb-4"><span className="font-bold">Total</span><span className="font-extrabold text-green-700 text-lg">Rp {total.toLocaleString('id-ID')}</span></div>
                <button onClick={handleCheckout} disabled={checkingOut}
                  className={`w-full font-bold py-3.5 rounded-xl text-sm transition-colors ${checkingOut ? 'bg-gray-300 text-gray-500' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                  {checkingOut ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Memproses...
                    </span>
                  ) : 'Bayar Sekarang'}
                </button>
                <button onClick={() => setStep('cart')} className="w-full text-sm text-gray-500 hover:text-gray-700 mt-3 py-2">← Kembali ke Keranjang</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
