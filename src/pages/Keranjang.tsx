import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import TraceabilityModal from '../components/TraceabilityModal';
import { REAL_PRODUCTS } from '../data/mockData';

type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

interface PageProps {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function Keranjang({ onNavigate, userRole, onSetRole }: PageProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1); // 1: Cart & Shipping, 2: Payment, 3: Success
  const [showTrace, setShowTrace] = useState(false);
  const [promoCode, setPromoCode] = useState('GENZHALAL');
  const [discountApplied, setDiscountApplied] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart items initialized with real products
  const [cartItems, setCartItems] = useState([
    { 
      id: REAL_PRODUCTS[0].id, 
      name: REAL_PRODUCTS[0].name, 
      seller: REAL_PRODUCTS[0].supplier, 
      price: REAL_PRODUCTS[0].price, 
      qty: 2, 
      image: REAL_PRODUCTS[0].image,
      halalNumber: REAL_PRODUCTS[0].halalNumber 
    },
    { 
      id: REAL_PRODUCTS[1].id, 
      name: REAL_PRODUCTS[1].name, 
      seller: REAL_PRODUCTS[1].supplier, 
      price: REAL_PRODUCTS[1].price, 
      qty: 1, 
      image: REAL_PRODUCTS[1].image,
      halalNumber: REAL_PRODUCTS[1].halalNumber 
    },
    { 
      id: REAL_PRODUCTS[3].id, 
      name: REAL_PRODUCTS[3].name, 
      seller: REAL_PRODUCTS[3].supplier, 
      price: REAL_PRODUCTS[3].price, 
      qty: 2, 
      image: REAL_PRODUCTS[3].image,
      halalNumber: REAL_PRODUCTS[3].halalNumber 
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = Math.max(1, item.qty + delta);
        return { ...item, qty: nextQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string, name: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
    showToast(`"${name}" dihapus dari keranjang.`);
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'GENZHALAL') {
      setDiscountApplied(true);
      showToast('🎉 Diskon GENZHALAL aktif! Hemat Rp 25.000!');
    } else {
      showToast('⚠️ Kode promo tidak valid atau kadaluarsa.');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discount = discountApplied ? 25000 : 0;
  const shipping = subtotal > 150000 ? 0 : 20000;
  const total = Math.max(0, subtotal - discount + shipping);

  const couriers = [
    { name: 'PT Pos Logistik Halal Cold Chain', price: 0, days: '1 hari tiba', halalLogistics: true, logo: '❄️🚚', desc: 'Armada beku -18°C telemetri IoT & segel RFID' },
    { name: 'SiCepat Bestie Express', price: 15000, days: '1-2 hari', halalLogistics: false, logo: '⚡', desc: 'Pengiriman kilat reguler nusantara' },
    { name: 'JNE Trucking Dry Goods', price: 12000, days: '2-3 hari', halalLogistics: false, logo: '📦', desc: 'Khusus paket kering tahan lama' },
  ];

  const payments = [
    { group: 'QRIS & E-Wallet Syariah (Instan)', items: [{ name: 'QRIS Semua Bank / LinkAja Syariah', icon: '📱' }, { name: 'GoPay / OVO Syariah', icon: '⚡' }] },
    { group: 'Transfer Bank Syariah (VA Otomatis)', items: [{ name: 'BSI (Bank Syariah Indonesia)', icon: '🏦' }, { name: 'Bank Muamalat Online', icon: '🏛️' }] },
    { group: 'Bayar di Tempat (COD Halal)', items: [{ name: 'COD Kurir Logistik Halal', icon: '💵' }] }
  ];

  return (
    <div className="flex h-screen overflow-hidden font-sans text-slate-800" style={{ background: '#FAFAF8' }}>
      {userRole !== 'guest' && <AppSidebar onNavigate={onNavigate} userRole={userRole} currentPage="cart" />}
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <AppHeader 
          title="Keranjang Belanja Halal"
          breadcrumb="Dashboard > Keranjang"
          userRole={userRole} 
          onSetRole={onSetRole} 
          onNavigate={onNavigate}
        />
        
        {/* Navigation Action Strip */}
        <div className="border-b px-6 py-2.5 flex items-center justify-between shrink-0" style={{ background: 'white', borderColor: 'rgba(226,232,240,0.7)', boxShadow: '0 1px 0 rgba(15,23,42,0.04)' }}>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('product-catalog')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
              style={{ background: '#F8FAFC', color: '#475569', border: '1px solid #E8EDF2' }}
            >
              ← Belanja Lagi
            </button>
            <span className="text-xs font-semibold text-slate-800">Checkout Amanah & Terverifikasi</span>
          </div>
          <button 
            onClick={() => onNavigate('supply-chain')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            style={{ background: 'rgba(8,145,178,0.08)', color: '#0891B2', border: '1px solid rgba(8,145,178,0.2)' }}
          >
            🚚 Info Armada Cold Chain
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 max-w-6xl mx-auto w-full space-y-6">
          
          {/* Step Progression Bar */}
          <div className="rounded-3xl p-5 flex items-center justify-between max-w-2xl mx-auto" style={{ background: 'white', border: '1px solid #E8EDF2', boxShadow: '0 2px 8px rgba(15,23,42,0.06)' }}>
            {[{ num: 1, label: 'Item & Kurir' }, { num: 2, label: 'Bayar Syariah' }, { num: 3, label: 'Selesai & Lacak' }].map((s, i) => (
              <React.Fragment key={s.num}>
                <div className={`flex items-center gap-2 text-xs font-semibold ${step >= s.num ? '' : ''}`} style={{ color: step >= s.num ? '#0D7A55' : '#94A3B8' }}>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                    style={step >= s.num ? { background: 'linear-gradient(135deg, #0D7A55, #059669)', color: 'white', boxShadow: '0 2px 8px rgba(13,122,85,0.3)' } : { background: '#F1F5F9', color: '#94A3B8' }}
                  >
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span>{s.label}</span>
                </div>
                {i < 2 && <div className="flex-1 h-0.5 mx-3 rounded-full transition-all" style={{ background: step > s.num ? '#0D7A55' : '#E8EDF2' }} />}
              </React.Fragment>
            ))}
          </div>

          {/* Free Shipping Cold-Chain Progress */}
          <div className="p-4 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-3" style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0D2B1A 50%, #0A1628 100%)', border: '1px solid rgba(74,222,128,0.15)' }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">❄️🚚</span>
              <div>
                <span className="text-xs font-black tracking-wide uppercase block" style={{ color: '#4ADE80' }}>Bebas Ongkir Cold Chain</span>
                <p className="text-xs font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {subtotal >= 150000 
                    ? '🎉 Pesananmu memenuhi syarat Bebas Ongkir Truk Berpendingin -18°C!' 
                    : `Tambah Rp ${(150000 - subtotal).toLocaleString('id-ID')} lagi untuk Bebas Ongkir Cold-Chain!`}
                </p>
              </div>
            </div>
            <div className="w-full sm:w-48 rounded-full h-1.5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <div 
                className="h-full transition-all duration-500 rounded-full" 
                style={{ width: `${Math.min(100, (subtotal / 150000) * 100)}%`, background: 'linear-gradient(90deg, #4ADE80, #34D399)' }}
              ></div>
            </div>
          </div>

          {/* Step 1: Cart Items & Shipping Selection */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                
                {/* Product List */}
                <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 space-y-4">
                  <h2 className="text-sm font-black text-slate-900 flex items-center justify-between">
                    <span>Daftar Pesanan ({cartItems.length} Produk)</span>
                    <span className="text-xs font-semibold text-emerald-700">100% Terverifikasi Halal</span>
                  </h2>

                  <div className="divide-y divide-slate-100">
                    {cartItems.map(item => (
                      <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-2xs" />
                          <div>
                            <h3 className="font-black text-slate-900 text-xs leading-snug line-clamp-1">{item.name}</h3>
                            <p className="text-[11px] text-slate-500 font-medium">🏢 {item.seller}</p>
                            <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                              No: {item.halalNumber}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between w-full sm:w-auto gap-4 self-end sm:self-center">
                          <div className="text-right">
                            <span className="text-xs font-black text-slate-900 block">
                              Rp {(item.price * item.qty).toLocaleString('id-ID')}
                            </span>
                            <span className="text-[10px] text-slate-400">@ Rp {item.price.toLocaleString('id-ID')}</span>
                          </div>

                          <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-xl border border-slate-200">
                            <button 
                              onClick={() => updateQty(item.id, -1)}
                              className="w-5 h-5 rounded-md bg-white hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center justify-center cursor-pointer shadow-2xs"
                            >
                              -
                            </button>
                            <span className="text-xs font-black text-slate-900 w-4 text-center">{item.qty}</span>
                            <button 
                              onClick={() => updateQty(item.id, 1)}
                              className="w-5 h-5 rounded-md bg-white hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center justify-center cursor-pointer shadow-2xs"
                            >
                              +
                            </button>
                          </div>

                          <button 
                            onClick={() => removeItem(item.id, item.name)}
                            className="text-slate-400 hover:text-red-600 text-sm p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Hapus item"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Option */}
                <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 space-y-4">
                  <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <span>🚚</span> Pilih Ekspedisi & Armada Pengiriman Halal
                  </h2>

                  <div className="space-y-2.5">
                    {couriers.map((c, i) => (
                      <label 
                        key={i} 
                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          i === 0 ? 'border-emerald-500 bg-emerald-50/50 shadow-xs' : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input type="radio" name="courier" defaultChecked={i === 0} className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
                          <span className="text-2xl">{c.logo}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-xs text-slate-900">{c.name}</span>
                              {c.halalLogistics && (
                                <span className="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                                  ✓ Cold-Chain IoT
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500">{c.desc} • Estimasi {c.days}</p>
                          </div>
                        </div>

                        <span className="text-xs font-black text-emerald-700">
                          {c.price === 0 ? 'GRATIS' : `Rp ${c.price.toLocaleString('id-ID')}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Summary Column */}
              <div className="space-y-4">
                <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 space-y-4">
                  <h2 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3">
                    Ringkasan Transaksi
                  </h2>

                  {/* Promo Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Kode Promo / Voucher</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Ketik GENZHALAL" 
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs uppercase font-mono font-bold outline-hidden bg-slate-50 focus:bg-white focus:border-emerald-500"
                      />
                      <button 
                        onClick={applyPromo}
                        className="px-3 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Terapkan
                      </button>
                    </div>
                  </div>

                  {/* Subtotal & Discount Calculation */}
                  <div className="space-y-2 text-xs border-y border-slate-100 py-3">
                    <div className="flex justify-between text-slate-600">
                      <span>Total Harga ({cartItems.reduce((a, b) => a + b.qty, 0)} item)</span>
                      <span className="font-bold text-slate-900">Rp {subtotal.toLocaleString('id-ID')}</span>
                    </div>

                    {discountApplied && (
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>Diskon GENZHALAL (15%)</span>
                        <span>- Rp {discount.toLocaleString('id-ID')}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-600">
                      <span>Biaya Pengiriman Cold-Chain</span>
                      <span className="font-bold text-emerald-700">
                        {shipping === 0 ? 'GRATIS (Promo)' : `Rp ${shipping.toLocaleString('id-ID')}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-xs font-extrabold text-slate-700">Total Bayar:</span>
                    <span className="text-xl font-black text-emerald-700">
                      Rp {total.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-xs font-black transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Lanjut ke Pembayaran Syariah</span>
                    <span>&rarr;</span>
                  </button>
                </div>

                {/* Gen-Z Guarantee Box */}
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <span className="font-black block flex items-center gap-1.5">
                    <span>🛡️</span> Jaminan 100% Halal Tayyiban
                  </span>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    Setiap paket disegel dengan RFID tamper-proof. Jika segel rusak atau suhu dingin di atas standar, produk kami ganti 100%.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Selection */}
          {step === 2 && (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-slate-900">Pilih Metode Pembayaran Syariah</h2>
                  <p className="text-xs text-slate-500">Bebas riba, aman, dan langsung terkonfirmasi otomatis</p>
                </div>
                <button 
                  onClick={() => setStep(1)} 
                  className="text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  ← Ubah Item
                </button>
              </div>

              <div className="space-y-4">
                {payments.map((grp, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">{grp.group}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {grp.items.map((item, idx) => (
                        <label 
                          key={idx} 
                          className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all cursor-pointer"
                        >
                          <input type="radio" name="paymentMethod" defaultChecked={i === 0 && idx === 0} className="text-emerald-600 focus:ring-emerald-500" />
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-xs font-bold text-slate-800">{item.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total Tagihan</span>
                  <span className="text-lg font-black text-emerald-700">Rp {total.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Kembali
                  </button>
                  <button 
                    onClick={() => {
                      setStep(3);
                      showToast('🎉 Pembayaran berhasil dikonfirmasi secara syariah!');
                    }}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Konfirmasi & Bayar Sekarang
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Success & Traceability Tracking */}
          {step === 3 && (
            <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg border border-emerald-200 p-8 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
                ✓
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Pembayaran Berhasil!
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  Pesananmu Siap Dikirim 🚀
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Nomor Pesanan: <strong className="font-mono text-slate-800">#HALAL-2026-0904</strong>
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Kurir Pengawal:</span>
                  <span className="font-bold text-slate-800">PT Pos Logistik Halal Cold Chain</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Armada Truk IoT:</span>
                  <span className="font-bold text-blue-700 font-mono">B 9482 PXZ (Suhu: -18.4°C)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Segel:</span>
                  <span className="font-bold text-emerald-700">Terkunci RFID Otentik</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button 
                  onClick={() => onNavigate('supply-chain')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-black transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>🚚</span> Lacak Truk Pengiriman (IoT)
                </button>
                <button 
                  onClick={() => onNavigate('product-catalog')}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Belanja Lagi di Katalog
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/50 animate-bounce">
          <span className="text-emerald-400 font-bold">✨</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Traceability Modal */}
      <TraceabilityModal 
        isOpen={showTrace} 
        onClose={() => setShowTrace(false)} 
        productId={REAL_PRODUCTS[0].id} 
      />
    </div>
  );
}
