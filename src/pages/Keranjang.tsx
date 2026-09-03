import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import TraceabilityModal from '../components/TraceabilityModal';

type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

interface PageProps {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function Keranjang({ onNavigate, userRole, onSetRole }: PageProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1); // 1: Cart & Shipping, 2: Payment
  const [showTrace, setShowTrace] = useState(false);

  const cartItems = [
    { id: 1, name: 'Daging Sapi Segar', seller: 'Segar Farm', price: 120000, qty: 2, image: '🥩' },
    { id: 2, name: 'Bumbu Rempah Instan', seller: 'CV Makmur Jaya', price: 25000, qty: 5, image: '🌿' },
    { id: 3, name: 'Ayam Potong Organik', seller: 'Segar Farm', price: 45000, qty: 1, image: '🍗' },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = 25000;
  const total = subtotal + shipping;

  const couriers = [
    { name: 'JNE Reguler', price: 25000, days: '2-3 hari', halalLogistics: false, logo: '🚚' },
    { name: 'Halal Logistic Pos', price: 30000, days: '2-3 hari', halalLogistics: true, logo: '📦' },
    { name: 'SiCepat', price: 24000, days: '1-2 hari', halalLogistics: false, logo: '⚡' },
  ];

  const payments = [
    { group: 'Transfer Bank Syariah', items: [{ name: 'BSI (Bank Syariah Indonesia)', icon: '🏦' }, { name: 'Bank Muamalat', icon: '🏦' }] },
    { group: 'E-Wallet (Syariah)', items: [{ name: 'LinkAja Syariah', icon: '📱' }, { name: 'GoPay', icon: '📱' }] },
    { group: 'Lainnya', items: [{ name: 'QRIS', icon: '📷' }, { name: 'COD (Bayar di Tempat)', icon: '💵' }] }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {userRole !== 'guest' && <AppSidebar onNavigate={onNavigate} userRole={userRole} />}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <AppHeader onNavigate={onNavigate} userRole={userRole} onSetRole={onSetRole} />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{t('Keranjang Belanja')}</h1>
            <p className="text-sm text-gray-500">Dashboard &gt; {t('Keranjang')}</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column: Cart Items & Forms */}
            <div className="flex-1 space-y-6">
              
              {/* Items List */}
              {step === 1 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">{t('Barang Belanjaan')}</h2>
                  {cartItems.map((item, idx) => (
                    <div key={item.id} className={`flex items-center gap-4 py-4 ${idx !== cartItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="font-bold text-gray-800">Rp {item.price.toLocaleString('id-ID')}</p>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">Penjual: {item.seller}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3">
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                              ✅ Halal
                            </span>
                            <button onClick={() => setShowTrace(true)} className="text-xs text-blue-600 flex items-center gap-1 hover:underline">
                              🔍 Trace
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                              <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">-</button>
                              <span className="px-3 text-sm">{item.qty}</span>
                              <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                            <button className="text-red-500 text-sm hover:text-red-700">🗑️</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Shipping & Courier */}
              {step === 1 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">{t('Pengiriman')}</h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('Alamat Pengiriman')}</label>
                    <div className="p-3 border border-gray-200 rounded-lg text-sm text-gray-700">
                      <p className="font-semibold">Budi Santoso</p>
                      <p>Jl. Sudirman No. 45, Jakarta Pusat, DKI Jakarta 10220</p>
                      <button className="text-green-600 text-xs mt-2 font-medium hover:underline">Ubah Alamat</button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('Pilih Kurir')}</label>
                    <div className="space-y-3">
                      {couriers.map((c, i) => (
                        <label key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <input type="radio" name="courier" className="text-green-600 focus:ring-green-500" defaultChecked={i===1} />
                            <div className="text-2xl">{c.logo}</div>
                            <div>
                              <p className="font-semibold text-sm flex items-center gap-2">
                                {c.name}
                                {c.halalLogistics && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Halal Logistics</span>}
                              </p>
                              <p className="text-xs text-gray-500">Estimasi: {c.days}</p>
                            </div>
                          </div>
                          <p className="font-medium text-sm">Rp {c.price.toLocaleString('id-ID')}</p>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Selection */}
              {step === 2 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-gray-800 mb-4 flex items-center gap-1">
                    ← Kembali
                  </button>
                  <h2 className="text-lg font-bold text-gray-800 mb-4">{t('Pilih Metode Pembayaran')}</h2>
                  
                  <div className="space-y-6">
                    {payments.map((pg, i) => (
                      <div key={i}>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">{pg.group}</h3>
                        <div className="space-y-2">
                          {pg.items.map((method, j) => (
                            <label key={j} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                              <input type="radio" name="payment" className="text-green-600 focus:ring-green-500" />
                              <span className="ml-3 text-xl">{method.icon}</span>
                              <span className="ml-3 text-sm font-medium">{method.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Order Summary */}
            <div className="w-full lg:w-96">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">{t('Ringkasan Belanja')}</h2>
                
                <div className="space-y-3 text-sm text-gray-600 mb-4 border-b border-gray-100 pb-4">
                  <div className="flex justify-between">
                    <span>Total Harga ({cartItems.length} barang)</span>
                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ongkos Kirim</span>
                    <span>Rp {shipping.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Diskon</span>
                    <span>- Rp 0</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-bold text-lg text-gray-800 mb-6">
                  <span>Total Tagihan</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
                
                {step === 1 ? (
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    {t('Lanjut ke Pembayaran')}
                  </button>
                ) : (
                  <button 
                    onClick={() => { alert('Pesanan Berhasil Dibuat!'); onNavigate('Dashboard'); }}
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    {t('Bayar Sekarang')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showTrace && (
        <TraceabilityModal 
          productName="Daging Sapi Segar"
          history={[]}
          onClose={() => setShowTrace(false)} 
        />
      )}
    </div>
  );
}
