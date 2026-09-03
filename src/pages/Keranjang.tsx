import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  { name: 'JNE Regular (Halal Logistik)', est: '3-5 hari', cost: 15000, halalBadge: 'Tersertifikasi Segregasi' },
  { name: 'J&T Express (Halal Cargo)', est: '2-4 hari', cost: 18000, halalBadge: 'Segregasi Fisik Dijamin' },
  { name: 'SiCepat Halu Syariah', est: '1-3 hari', cost: 22000, halalBadge: 'Armada Khusus Halal' },
  { name: 'AnterAja Halal Safe', est: '2-4 hari', cost: 16000, halalBadge: 'Bebas Kontaminasi' },
  { name: 'Pos Indonesia', est: '5-7 hari', cost: 12000, halalBadge: 'Standar Syariah' },
]

const paymentMethods = [
  { id: 'transfer', label: 'Transfer Bank Syariah', desc: 'BSI, Bank Muamalat, BCA Syariah', icon: '🏦' },
  { id: 'ewallet', label: 'E-Wallet Syariah', desc: 'GoPay, OVO, DANA (Akad Syariah)', icon: '📱' },
  { id: 'cod', label: 'Bayar di Tempat (COD Halal)', desc: 'Bayar tunai saat barang diterima', icon: '💵' },
  { id: 'qris', label: 'QRIS Syariah', desc: 'Scan QR di semua bank & dompet digital', icon: '📷' },
]

export default function Keranjang({ onNavigate }: Props) {
  const { t } = useTranslation()
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
      <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif] flex flex-col items-center justify-center p-6">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-2">Keranjang Kosong</h2>
        <p className="text-sm text-gray-500 mb-6">Belum ada produk halal di keranjang Anda</p>
        <button onClick={() => onNavigate('product-catalog')} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors shadow-sm cursor-pointer">
          Jelajahi Katalog Halal →
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="font-extrabold text-green-700">SUKAHALAL</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('product-catalog')} className="text-sm text-gray-500 hover:text-gray-700 font-medium cursor-pointer">← Katalog</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => onNavigate('dashboard')} className="text-sm text-gray-500 hover:text-gray-700 font-medium cursor-pointer">Dashboard</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {orderSuccess ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center max-w-md mx-auto">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">Pesanan Berhasil Dibuat!</h2>
            <p className="text-xs text-gray-500 mb-4">Terima kasih. Pesanan Anda segera diproses melalui jalur rantai pasok halal terintegrasi.</p>
            <div className="text-xs text-green-600 font-semibold animate-pulse">Mengalihkan ke halaman pesanan...</div>
          </div>
        ) : step === 'cart' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-extrabold text-gray-900">Keranjang Belanja</h1>
                <span className="text-xs text-gray-500">{cart.length} item</span>
              </div>

              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-800 text-sm truncate">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.supplier}</div>
                      <span className="inline-block mt-1 text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                        ✓ Halal Tayiban
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">−</button>
                      <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">+</button>
                    </div>
                    <div className="text-right shrink-0 w-28">
                      <div className="font-bold text-green-700 text-sm">Rp {(item.price * item.qty).toLocaleString('id-ID')}</div>
                      <div className="text-[10px] text-gray-400">@Rp {item.price.toLocaleString('id-ID')}</div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 text-lg shrink-0 cursor-pointer">✕</button>
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
                <button onClick={() => setStep('checkout')} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer shadow-sm">
                  Lanjut ke Checkout →
                </button>
                <button onClick={() => onNavigate('product-catalog')} className="w-full text-xs text-gray-500 hover:text-gray-700 mt-3 py-2 cursor-pointer text-center block">
                  ← Lanjut Belanja
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              <h1 className="text-xl font-extrabold text-gray-900">Checkout Pesanan</h1>

              {/* Alamat */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">📍 Alamat Pengiriman</h3>
                <textarea value={address} onChange={e => setAddress(e.target.value)} rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none" />
              </div>

              {/* Kurir */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-1 text-sm flex items-center gap-2">🚛 Pilih Kurir & Logistik Halal</h3>
                <p className="text-xs text-gray-500 mb-3">Seluruh kurir yang terpilih memiliki sertifikasi jaminan segregasi fisik produk halal.</p>
                <div className="space-y-2">
                  {couriers.map((c, i) => (
                    <button key={i} onClick={() => setSelectedCourier(i)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-colors text-left cursor-pointer ${
                        selectedCourier === i ? 'border-green-500 bg-green-50/50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <div>
                        <div className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                          {c.name}
                          <span className="text-[9px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">✓ {c.halalBadge}</span>
                        </div>
                        <div className="text-xs text-gray-500">Estimasi: {c.est}</div>
                      </div>
                      <span className="font-bold text-sm text-gray-800">Rp {c.cost.toLocaleString('id-ID')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pembayaran */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">💳 Metode Pembayaran Bebas Riba (Syariah)</h3>
                <div className="space-y-2">
                  {paymentMethods.map(m => (
                    <button key={m.id} onClick={() => setSelectedPayment(m.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-colors text-left cursor-pointer ${
                        selectedPayment === m.id ? 'border-green-500 bg-green-50/50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <span className="text-2xl">{m.icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{m.label}</div>
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
                    <div key={item.id} className="flex justify-between text-xs">
                      <span className="text-gray-600 truncate mr-2">{item.name} x{item.qty}</span>
                      <span className="font-medium shrink-0">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-gray-100 my-3" />
                <div className="space-y-1 mb-3 text-xs">
                  <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>Rp {subtotal.toLocaleString('id-ID')}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Ongkir ({couriers[selectedCourier].name.split(' ')[0]})</span><span>Rp {shipping.toLocaleString('id-ID')}</span></div>
                </div>
                <div className="h-px bg-gray-100 my-3" />
                <div className="flex justify-between mb-4"><span className="font-bold text-sm">Total</span><span className="font-extrabold text-green-700 text-base">Rp {total.toLocaleString('id-ID')}</span></div>
                <button onClick={handleCheckout} disabled={checkingOut}
                  className={`w-full font-bold py-3.5 rounded-xl text-sm transition-colors cursor-pointer shadow-sm ${checkingOut ? 'bg-gray-300 text-gray-500' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                  {checkingOut ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Memproses Transaksi...
                    </span>
                  ) : 'Bayar Sekarang ✓'}
                </button>
                <button onClick={() => setStep('cart')} className="w-full text-xs text-gray-500 hover:text-gray-700 mt-3 py-2 text-center block cursor-pointer">
                  ← Kembali ke Keranjang
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
