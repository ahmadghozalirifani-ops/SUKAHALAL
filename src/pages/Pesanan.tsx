import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import KPIWidget from '../components/KPIWidget';

type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function Pesanan({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('Semua');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // 1. DATA PESANAN UNTUK SUPPLIER / PRODUSEN (Pesanan masuk ke pabrik)
  const sellerOrders = [
    {
      id: 'ORD-B2B-8912',
      buyer: 'Halal Mart Fatmawati (Mitra Grosir)',
      date: '04 Sep 2026, 09:15',
      items: '50 Pouch Rendang Daging Sapi Suwir Retort (300g)',
      total: 4250000,
      status: 'Menunggu Proses',
      courier: 'PT Pos Logistik Halal (Truk Refrigerator B 9482 PXZ)',
      halalCert: 'ID32110000123450223',
      badgeCls: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      id: 'ORD-CUST-4120',
      buyer: 'Nadya Putri (Konsumen Eceran)',
      date: '04 Sep 2026, 08:30',
      items: '2 Pouch Rendang Daging Sapi Suwir Retort',
      total: 170000,
      status: 'Sedang Dikemas',
      courier: 'Bestie Halal Express (Dry Box Van)',
      halalCert: 'ID32110000123450223',
      badgeCls: 'bg-blue-100 text-blue-900 border-blue-300'
    },
    {
      id: 'ORD-B2B-8901',
      buyer: 'Super Indo Halal Corner Cilandak',
      date: '03 Sep 2026, 14:00',
      items: '100 Pouch Rendang Sapi & 50 Kopi Arabika Gayo',
      total: 10250000,
      status: 'Diserahkan ke Kurir',
      courier: 'PT Pos Logistik Halal (Armada B 9102 UXZ)',
      halalCert: 'ID32110000123450223',
      badgeCls: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    }
  ];

  // 2. DATA MANIFEST UNTUK DISTRIBUTOR / LOGISTIK (Muatan yang harus diantar)
  const distributorManifests = [
    {
      manifestNo: 'MNF-REFRIG-001',
      fleet: 'Truk Refrigerator (B 9482 PXZ)',
      driver: 'Pak Bambang (0812-9988-1122)',
      route: 'Pabrik Bunda Halal (Bandung Barat) ➔ Hub Distribusi Jakarta',
      cargo: '120 Koli Pouch Retort Steril & Daging Chilled',
      targetTemp: '-18°C (Live: -18.4°C)',
      rfidSeal: 'SEAL-RFID-9941 (Terkunci Aman)',
      status: 'Dalam Perjalanan',
      sanitationCheck: 'Lolos Cuci Standar HAS 23000'
    },
    {
      manifestNo: 'MNF-DRY-002',
      fleet: 'Truk Boks Kering Tertutup (B 9102 UXZ)',
      driver: 'Pak Dedi Supriadi (0813-8899-7711)',
      route: 'Sentra Rempah Padalarang ➔ Halal Mart Fatmawati',
      cargo: '80 Karung Biji Kopi Gayo & Rempah Kering',
      targetTemp: 'Suhu Ruang 24.5°C',
      rfidSeal: 'BARCODE-SEAL-8812 (Utuh)',
      status: 'Tiba di Tujuan (Bongkar Muat)',
      sanitationCheck: 'Wadah Kargo Bersih & Kering'
    },
    {
      manifestNo: 'MNF-CHILLED-003',
      fleet: 'Chilled Box Van (D 8812 AB)',
      driver: 'Pak Hendra (0811-2233-4455)',
      route: 'KPBS Lembang ➔ Pabrik Pengolahan Bandung',
      cargo: '40 Krat Susu Sapi Segar Pasteurisasi',
      targetTemp: '4°C (Live: 3.8°C)',
      rfidSeal: 'SEAL-RFID-7710 (Terkunci)',
      status: 'Dalam Perjalanan',
      sanitationCheck: 'Sanitasi Tangki Susu Selesai'
    }
  ];

  // 3. DATA PESANAN UNTUK KONSUMEN / PEMBELI (Belanjaan saya)
  const customerOrders = [
    {
      id: 'ORD-CUST-4120',
      productName: 'Rendang Daging Sapi Suwir Padang Retort (300g)',
      qty: 2,
      price: 170000,
      orderDate: '04 Sep 2026, 08:30 WIB',
      producer: 'PT Bunda Halal Foods',
      halalCert: 'ID32110000123450223',
      courierStatus: 'Kurir Pos Logistik Halal sedang menuju alamatmu',
      estArrival: 'Hari ini, 14:30 WIB',
      currentTemp: 'Suhu Boks Kurir: -18.4°C',
      status: 'Sedang Diantar',
      trackingStep: 3
    },
    {
      id: 'ORD-CUST-3982',
      productName: 'Kopi Arabika Gayo Single Origin (250g)',
      qty: 1,
      price: 85000,
      orderDate: '28 Agu 2026, 11:20 WIB',
      producer: 'Koperasi Kopi Barokah Gayo',
      halalCert: 'ID11210000876540122',
      courierStatus: 'Pesanan telah diterima oleh Nadya Putri',
      estArrival: 'Selesai Diterima',
      currentTemp: 'Suhu Standar',
      status: 'Selesai',
      trackingStep: 4
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafcfb] font-sans text-slate-800">
      {userRole !== 'guest' && <AppSidebar onNavigate={onNavigate} userRole={userRole} currentPage="pesanan" />}
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader 
          onNavigate={onNavigate} 
          userRole={userRole} 
          onSetRole={onSetRole}
          title={
            userRole === 'seller' ? 'Pesanan Masuk Toko' :
            userRole === 'distributor' ? 'Manifest Muatan Armada' :
            userRole === 'customer' ? 'Pesanan Belanja Saya' : 'Pelacakan Pesanan'
          }
          breadcrumb="Dashboard > Pesanan"
        />

        {/* Toast alert */}
        {toast && (
          <div className="fixed top-16 right-6 z-50 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs shadow-xl animate-fade-in flex items-center gap-2">
            <span>✨</span> {toast}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Header Banner Tailored to Role */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {userRole === 'seller' ? '🏪 Panel Produsen UMKM' :
                   userRole === 'distributor' ? '🚚 Panel Ekspedisi Logistik' :
                   userRole === 'customer' ? '🛍️ Panel Konsumen Pembeli' : '🌐 Mode Tamu'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {userRole === 'seller' && 'Daftar Pesanan Masuk (Order Fulfillment)'}
                {userRole === 'distributor' && 'Manifest Pengiriman & Penugasan Armada'}
                {userRole === 'customer' && 'Riwayat Belanja & Pelacakan Paket Saya'}
                {userRole === 'guest' && 'Pusat Pelacakan Paket Halal'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {userRole === 'seller' && 'Kelola pesanan dari konsumen dan mitra grosir, konfirmasi stok, dan serahkan paket ke kurir halal.'}
                {userRole === 'distributor' && 'Kelola daftar kargo angkut harian, pantau suhu sensor IoT telemetri, dan pastikan keutuhan segel RFID.'}
                {userRole === 'customer' && 'Pantau posisi kurir pengantar paket Anda dan unduh berkas sertifikat BPJPH untuk setiap produk.'}
                {userRole === 'guest' && 'Pantau alur keterlacakan pesanan halal dari hulu hingga hilir.'}
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              {userRole === 'seller' && (
                <button
                  onClick={() => onNavigate('product-management')}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  ➕ Tambah Produk
                </button>
              )}
              {userRole === 'distributor' && (
                <button
                  onClick={() => onNavigate('supply-chain')}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  📡 Buka Sensor IoT Truk
                </button>
              )}
              {userRole === 'customer' && (
                <button
                  onClick={() => onNavigate('product-catalog')}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  🛍️ Belanja Lagi
                </button>
              )}
            </div>
          </div>

          {/* 1. SELLER VIEW: PESANAN MASUK TOKO */}
          {userRole === 'seller' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Pesanan Menunggu Konfirmasi</span>
                  <span className="text-xl font-black text-amber-700 mt-0.5 block">1 Pesanan</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Sedang Diproses Dapur</span>
                  <span className="text-xl font-black text-blue-700 mt-0.5 block">1 Pesanan</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Nilai Pesanan Hari Ini</span>
                  <span className="text-xl font-black text-emerald-700 mt-0.5 block">Rp 14.670.000</span>
                </div>
              </div>

              <div className="space-y-3">
                {sellerOrders.map(order => (
                  <div key={order.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 text-sm">{order.id}</span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${order.badgeCls}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-semibold mt-0.5">Pemesan: {order.buyer} • {order.date}</p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-slate-400 block font-bold">Total Pembayaran Syariah</span>
                        <span className="text-base font-black text-slate-900">Rp {order.total.toLocaleString('id-ID')}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                        <span className="text-slate-400 block text-[10px] font-bold">Rincian Muatan Produk:</span>
                        <p className="font-bold text-slate-900">{order.items}</p>
                        <p className="text-emerald-800 text-[10px] font-mono">No. Sertifikat: {order.halalCert}</p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                        <span className="text-slate-400 block text-[10px] font-bold">Ekspedisi Logistik Ditugaskan:</span>
                        <p className="font-bold text-slate-900">{order.courier}</p>
                        <p className="text-slate-500 text-[10px]">Wadah angkut tersertifikasi bebas kontaminasi</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={() => showToast(`Label Barcode EAN-13 untuk ${order.id} berhasil dicetak!`)}
                        className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        🏷️ Cetak Barcode EAN-13
                      </button>
                      <button
                        onClick={() => showToast(`Kurir Pos Logistik dipanggil untuk ${order.id}`)}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        ✓ Konfirmasi & Panggil Kurir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. DISTRIBUTOR VIEW: MANIFEST ARMADA */}
          {userRole === 'distributor' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Armada Bergerak</span>
                  <span className="text-xl font-black text-blue-700 mt-0.5 block">3 Truk Aktif</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Status Segel RFID</span>
                  <span className="text-xl font-black text-emerald-700 mt-0.5 block">100% Tersegel Aman</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">SOP Sanitasi HAS 23000</span>
                  <span className="text-xl font-black text-blue-900 mt-0.5 block">Semua Armada Lolos</span>
                </div>
              </div>

              <div className="space-y-3">
                {distributorManifests.map((mnf, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 text-sm">{mnf.manifestNo}</span>
                          <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                            {mnf.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-bold mt-0.5">{mnf.fleet} • Supir: {mnf.driver}</p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-slate-400 block font-bold">Kondisi Suhu Telemetri</span>
                        <span className="text-sm font-black text-blue-700">{mnf.targetTemp}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                        <span className="text-slate-400 block text-[10px] font-bold">Rute Distribusi:</span>
                        <p className="font-bold text-slate-900 mt-0.5">{mnf.route}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                        <span className="text-slate-400 block text-[10px] font-bold">Muatan Barang:</span>
                        <p className="font-bold text-slate-900 mt-0.5">{mnf.cargo}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                        <span className="text-slate-400 block text-[10px] font-bold">Integritas Wadah & Segel:</span>
                        <p className="font-bold text-emerald-700 mt-0.5">🔒 {mnf.rfidSeal}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{mnf.sanitationCheck}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={() => showToast(`Status sensor suhu dan GPS untuk ${mnf.manifestNo} telah disinkronkan!`)}
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        📡 Update Log Sensor Suhu
                      </button>
                      <button
                        onClick={() => showToast(`Gembok RFID ${mnf.manifestNo} diverifikasi aman!`)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        🔒 Verifikasi Kunci RFID
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. CUSTOMER VIEW: PESANAN SAYA */}
          {(userRole === 'customer' || userRole === 'guest') && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customerOrders.map(order => (
                  <div key={order.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
                    <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block">No. Resi: {order.id}</span>
                        <h3 className="font-black text-slate-900 text-sm mt-0.5">{order.productName}</h3>
                        <p className="text-[11px] text-slate-500">Jumlah: {order.qty} paket • Rp {order.price.toLocaleString('id-ID')}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        order.status === 'Sedang Diantar' ? 'bg-purple-100 text-purple-900 border border-purple-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-slate-700">📍 Status: {order.courierStatus}</span>
                        <span className="text-purple-700">{order.estArrival}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-purple-700 h-full rounded-full transition-all"
                          style={{ width: order.trackingStep === 3 ? '75%' : '100%' }}
                        ></div>
                      </div>
                      <p className="text-[11px] text-blue-700 font-medium">{order.currentTemp}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
                      <button
                        onClick={() => showToast(`Membuka pelacakan GPS real-time untuk ${order.id}`)}
                        className="px-3.5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        🚚 Lacak Kurir
                      </button>
                      <button
                        onClick={() => showToast(`Mengunduh e-Sertifikat BPJPH resmi (${order.halalCert})...`)}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        📄 Unduh Sertifikat BPJPH
                      </button>
                      <button
                        onClick={() => onNavigate('cart')}
                        className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        🔄 Beli Lagi
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
