import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import TrafficLightStatus, { type TLSStatus } from '../components/TrafficLightStatus';
import { REAL_DISTRIBUTOR_FLEETS } from '../data/mockData';

export type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

export interface PageProps {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export default function SupplyChain({ onNavigate, userRole, onSetRole }: PageProps) {
  const { t } = useTranslation();
  const [activeNode, setActiveNode] = useState<number | null>(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [supplyType, setSupplyType] = useState<'all' | 'dry' | 'cold'>('all');
  const [selectedFleet, setSelectedFleet] = useState(REAL_DISTRIBUTOR_FLEETS[0]);

  // Combined fleet: Cold Chain & General Dry Freight
  const allFleets = [
    ...REAL_DISTRIBUTOR_FLEETS,
    {
      id: 'dry-01',
      operator: 'PT Pos Logistik Halal Kargo Darat',
      vehiclePlate: 'B 9102 UXZ',
      driverName: 'Pak Dedi Supriadi',
      driverPhone: '0813-8899-7711',
      fleetType: 'Truk Boks Kering Tertutup (Dry Freight)',
      temperature: '24.5',
      targetTemp: 'Suhu Ruang Higienis (20-25°C)',
      humidity: 50,
      sealStatus: 'Segel Barcode Terkunci Aman',
      sealCode: 'SEAL-DRY-8812',
      currentLocation: 'Rest Area KM 57 Tol Jakarta-Cikampek',
      route: 'Sentra Rempah Padalarang ➔ Hub Distribusi Jakarta',
      gpsStatus: 'Aktif Online',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
      categoryType: 'dry'
    }
  ];

  const filteredFleets = allFleets.filter(f => {
    if (supplyType === 'cold') return f.fleetType.includes('Refrigerator') || f.fleetType.includes('Chilled');
    if (supplyType === 'dry') return f.fleetType.includes('Dry');
    return true;
  });

  const nodes = [
    { 
      id: 1, 
      name: 'Penyedia Bahan Baku (Hulu)', 
      entity: 'Petani Kopi Gayo & PT Malindo RPH Modern', 
      icon: '🌾', 
      status: 'green' as TLSStatus, 
      cert: 'ID32160000881230422', 
      temp: 'Chilled 4°C / Kering 25°C', 
      hum: '55%', 
      seal: 'Segel Batch Utuh',
      roleType: 'supplier',
      supplyCategory: 'all',
      desc: 'Penyembelihan sapi sesuai syariat oleh Juleha BNSP (produk basah) serta panen kopi Arabika organik tanpa pestisida najis (produk kering).'
    },
    { 
      id: 2, 
      name: 'Pabrik Pengolahan Higienis', 
      entity: 'PT Bunda Halal Foods & Mitra Pengolahan', 
      icon: '🏭', 
      status: 'green' as TLSStatus, 
      cert: 'ID32110000123450223', 
      temp: '22°C (Ruang Produksi Bersih)', 
      hum: '50%', 
      seal: 'Steril Tersegel',
      roleType: 'manufacturer',
      supplyCategory: 'all',
      desc: 'Pemasakan rendang dan pengolahan biji kopi. Jalur produksi 100% steril berstandar SJPH, terpisah dari bahan non-halal.'
    },
    { 
      id: 3, 
      name: 'Pengemasan & Quality Control', 
      entity: 'Sentra Pengemasan Food-Grade', 
      icon: '📦', 
      status: 'green' as TLSStatus, 
      cert: 'BPJPH-QC-2023-A', 
      temp: '20°C', 
      hum: '48%', 
      seal: 'Retort Pouch Kedap',
      roleType: 'packaging',
      supplyCategory: 'all',
      desc: 'Kemasan retort steril 121°C tahan 12 bulan dan karung kedap udara berlabel barcode EAN-13 resmi serta QR trace.'
    },
    { 
      id: 4, 
      name: 'Ekspedisi Logistik Umum & Dingin', 
      entity: 'PT Pos Logistik Halal (Kargo Darat & Cold Chain)', 
      icon: '🚚', 
      status: 'green' as TLSStatus, 
      cert: 'DIST-BPJPH-2024-089', 
      temp: '-18.4°C (Beku) / 24°C (Kering)', 
      hum: '58%', 
      seal: 'Gembok Digital RFID',
      roleType: 'distributor',
      supplyCategory: 'all',
      desc: 'Pengangkutan mematuhi SOP syariah: wadah bersih dari najis, pemisahan muatan, pengawalan suhu telemetri, dan segel digital anti-pembobolan.'
    },
    { 
      id: 5, 
      name: 'Ritel Modern & Meja Konsumen', 
      entity: 'Jaringan Halal Mart & Pembeli Langsung', 
      icon: '🏪', 
      status: 'green' as TLSStatus, 
      cert: 'RITEL-ID-2024', 
      temp: 'Suhu Pajang Standar', 
      hum: '60%', 
      seal: 'Diterima Konsumen',
      roleType: 'retailer',
      supplyCategory: 'all',
      desc: 'Penempatan rak terpisah dari barang non-halal, siap dikonsumsi dengan kepastian sertifikat BPJPH yang sah.'
    },
  ];

  const risks = [
    { loc: 'RPH Malindo (Slaughterhouse)', scope: 'Rantai Dingin', type: 'Kontaminasi Silang', level: 'High', measure: 'Penyembelihan oleh Juleha BNSP & pemisahan area basah/kering', status: 'Implemented' },
    { loc: 'Gudang Kopi & Rempah Kering', scope: 'Rantai Umum', type: 'Kelembapan & Hama', level: 'Medium', measure: 'Wadah palet food grade di atas lantai, bebas zat kimia beracun', status: 'Active' },
    { loc: 'Pabrik Pengolahan Pangan', scope: 'Umum & Dingin', type: 'Kontaminasi Bahan Aditif', level: 'High', measure: 'Pemeriksaan Bill of Materials (BOM) & verifikasi SIHALAL', status: 'Implemented' },
    { loc: 'Armada Truk Logistik Ekspedisi', scope: 'Umum & Dingin', type: 'Percampuran Barang Najis', level: 'High', measure: 'SOP Pembersihan Bersertifikat & Gembok Digital RFID Tamper-Proof', status: 'Active' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
      <AppSidebar onNavigate={onNavigate} currentPage="supply-chain" userRole={userRole} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader
          onNavigate={onNavigate}
          userRole={userRole}
          breadcrumbs={[
            { label: t('breadcrumbs.dashboard', 'Dashboard'), page: 'dashboard' },
            { label: 'Rantai Pasok Halal Terpadu' }
          ]}
        />

        {/* Navigation Action Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <span>←</span> Dashboard
            </button>
            <span className="text-xs text-slate-400 font-bold">|</span>
            <span className="text-xs font-bold text-slate-800">Manajemen Jaminan Halal Rantai Pasok (Umum & Cold Chain)</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('supplier-catalog')}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-emerald-200"
            >
              <span>🏢</span> Katalog Pemasok
            </button>
            <button 
              onClick={() => onNavigate('product-catalog')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>📦</span> Katalog Produk
            </button>
            <button 
              onClick={() => onNavigate('verification')}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-amber-200"
            >
              <span>🛡️</span> Pusat Verifikasi
            </button>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Header & Scope Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Pengawasan Alur Rantai Pasok Halal (Hulu ke Hilir)</h1>
              <p className="text-xs text-slate-500">Mencakup logistik komoditas kering (kopi, rempah, beras) dan logistik dingin berpendingin (daging, susu)</p>
            </div>

            {/* Switcher Scope */}
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold shadow-2xs">
              <button
                onClick={() => setSupplyType('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  supplyType === 'all' ? 'bg-emerald-800 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua Jalur
              </button>
              <button
                onClick={() => setSupplyType('dry')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  supplyType === 'dry' ? 'bg-emerald-800 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📦 Kargo Umum / Kering
              </button>
              <button
                onClick={() => setSupplyType('cold')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  supplyType === 'cold' ? 'bg-emerald-800 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ❄️ Cold Chain Beku
              </button>
            </div>
          </div>

          {/* Interactive Flow Nodes */}
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                Pipa Transparansi Syariah
              </span>
              <h2 className="text-sm font-bold text-slate-800 mt-1">
                Pilih Tahap Rantai Pasok untuk Memeriksa Standar Jaminan Halal
              </h2>
            </div>
            
            <div className="relative flex justify-between items-center max-w-4xl mx-auto mb-6 px-2">
              <div className="absolute h-1.5 bg-emerald-200 left-8 right-8 top-1/2 -translate-y-1/2 z-0 rounded-full"></div>
              
              {nodes.map((node) => (
                <div key={node.id} className="relative z-10 flex flex-col items-center">
                  <button 
                    onClick={() => setActiveNode(node.id)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-3xl flex items-center justify-center text-2xl sm:text-3xl shadow-md border-3 transition-all hover:scale-105 cursor-pointer ${
                      activeNode === node.id 
                        ? 'border-emerald-600 bg-emerald-50 ring-4 ring-emerald-100 scale-105' 
                        : 'border-white bg-white hover:border-slate-200'
                    }`}
                  >
                    {node.icon}
                    <div className="absolute -top-1 -right-1">
                      <TrafficLightStatus status={node.status} size="sm" />
                    </div>
                  </button>
                  <div className="mt-2 text-center max-w-[110px]">
                    <p className="font-bold text-slate-900 text-[11px] leading-tight line-clamp-1">{node.name}</p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">{node.entity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Node Details Panel */}
            {activeNode && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-4xl mx-auto transition-all">
                {nodes.filter(n => n.id === activeNode).map(node => (
                  <div key={node.id} className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl p-2 bg-white rounded-2xl shadow-xs border border-slate-200">{node.icon}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900 text-sm">{node.name}: {node.entity}</h3>
                            <TrafficLightStatus status={node.status} size="sm" />
                          </div>
                          <p className="text-xs text-slate-500 font-mono">No. Sertifikasi: {node.cert}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {node.roleType === 'supplier' && (
                          <button 
                            onClick={() => onNavigate('supplier-profile')}
                            className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            🏢 Profil Pemasok &rarr;
                          </button>
                        )}
                        {node.roleType === 'manufacturer' && (
                          <button 
                            onClick={() => onNavigate('product-detail')}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            📦 Produk yang Diproduksi &rarr;
                          </button>
                        )}
                        {node.roleType === 'distributor' && (
                          <button 
                            onClick={() => setSelectedFleet(allFleets[0])}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            🚚 Pantau Armada Ekspedisi &rarr;
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{node.desc}</p>

                    <div>
                      <h4 className="font-bold text-slate-700 text-xs mb-2 flex items-center gap-1.5">
                        <span>📡</span> Parameter Keamanan & Suhu Node Ini:
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Kondisi Suhu</span>
                          <p className="text-sm font-extrabold text-slate-800 mt-0.5">{node.temp}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Kelembapan Udara</span>
                          <p className="text-sm font-extrabold text-slate-800 mt-0.5">{node.hum}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Integritas Segel</span>
                          <p className="text-sm font-extrabold text-emerald-700 mt-0.5">{node.seal}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fleets Monitoring (Both Dry Goods & Cold Chain) */}
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>🚛</span> Monitoring Armada Ekspedisi Halal Terpantau (Kering & Pendingin)
                </h2>
                <p className="text-xs text-slate-500">Pelacakan posisi GPS, segel RFID, dan SOP pembersihan wadah angkut bebas najis</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredFleets.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFleet(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      selectedFleet.id === f.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {f.vehiclePlate} ({f.fleetType.includes('Dry') ? '📦 Kargo Kering' : '❄️ Cold Chain'})
                  </button>
                ))}
              </div>
            </div>

            {/* Fleet Info Card with Real Photo */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="h-48 lg:h-auto bg-slate-100 rounded-2xl overflow-hidden relative">
                <img src={selectedFleet.image} alt={selectedFleet.fleetType} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-white text-[10px] font-mono">
                  Plat: {selectedFleet.vehiclePlate}
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-2 rounded-xl text-[11px] text-slate-800 shadow-md">
                  <strong>{selectedFleet.fleetType}</strong>
                  <p className="text-slate-500">{selectedFleet.operator}</p>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-3">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block font-semibold">Target Suhu</span>
                    <span className="text-lg font-black text-slate-900">{selectedFleet.temperature}°C</span>
                    <span className="text-[9px] text-emerald-700 font-bold block truncate">{selectedFleet.targetTemp}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block font-semibold">Kelembapan</span>
                    <span className="text-lg font-black text-slate-900">{selectedFleet.humidity}%</span>
                    <span className="text-[9px] text-slate-400 block">Kondisi Udara</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block font-semibold">Segel Digital</span>
                    <span className="text-xs font-bold text-emerald-700 block mt-1 truncate">{selectedFleet.sealStatus}</span>
                    <span className="text-[9px] font-mono text-slate-400 block">{selectedFleet.sealCode}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block font-semibold">GPS Tracking</span>
                    <span className="text-xs font-bold text-emerald-700 block mt-1">● {selectedFleet.gpsStatus}</span>
                    <span className="text-[9px] text-slate-500 block">Sinyal Aktif</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                  <p><strong>Rute Perjalanan:</strong> {selectedFleet.route}</p>
                  <p><strong>Posisi Sekarang:</strong> 📍 {selectedFleet.currentLocation}</p>
                  <p><strong>Driver Penanggung Jawab:</strong> {selectedFleet.driverName} ({selectedFleet.driverPhone})</p>
                  <p className="text-emerald-800 text-[11px] font-semibold pt-1 border-t border-slate-100">
                    ✓ Wadah angkut telah disanitasi & lolos verifikasi bebas percampuran muatan najis (HAS 23000).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Kriteria Pokok Jaminan Halal Rantai Pasok */}
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>🛡️</span> 5 Kriteria Pokok Sistem Jaminan Produk Halal (SJPH) dalam Distribusi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">1. Integritas Bahan</span>
                <p className="text-slate-600 text-[11px]">Bahan kering maupun segar wajib terdata nomor registrasi SIHALAL.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">2. Kebersihan Wadah</span>
                <p className="text-slate-600 text-[11px]">Wadah kargo bebas najis mughalladhah dan telah disanitasi sesuai fiqih.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">3. Pemisahan Total</span>
                <p className="text-slate-600 text-[11px]">Muatan halal tidak pernah dicampur dalam satu boks dengan produk haram.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">4. Segel Tamper-Proof</span>
                <p className="text-slate-600 text-[11px]">Segel barcode & RFID terkunci untuk mencegah pergantian barang di perjalanan.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">5. Audit Ketertelusuran</span>
                <p className="text-slate-600 text-[11px]">QR trace mencatat riwayat lengkap dari peternak/kebun hingga sampai konsumen.</p>
              </div>
            </div>
          </div>

          {/* Risk Control Points Table */}
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>⚠️</span> Matriks Pengendalian Titik Kritis Kehalalan (Critical Control Point / CCP)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="py-2.5 px-3">Titik Kritis (Fasilitas)</th>
                    <th className="py-2.5 px-3">Lingkup Distribusi</th>
                    <th className="py-2.5 px-3">Potensi Bahaya Halal</th>
                    <th className="py-2.5 px-3">Tingkat Risiko</th>
                    <th className="py-2.5 px-3">Tindakan Pencegahan Sesuai Syariat</th>
                    <th className="py-2.5 px-3">Status Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {risks.map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{r.loc}</td>
                      <td className="py-2.5 px-3 text-slate-500 font-medium">{r.scope}</td>
                      <td className="py-2.5 px-3 text-slate-600">{r.type}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${r.level === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                          {r.level}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">{r.measure}</td>
                      <td className="py-2.5 px-3">
                        <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">
                          ✓ {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add Partner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Tambah Mitra Rantai Pasok Halal</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nama Perusahaan / Unit Usaha</label>
                <input type="text" placeholder="Contoh: PT Kargo Halal Nusantara" className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-hidden" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Jalur Rantai Pasok</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-hidden bg-white">
                  <option>Logistik Komoditas Kering (Dry Freight)</option>
                  <option>Logistik Suhu Terkontrol (Cold Chain)</option>
                  <option>Sentra Pengemasan & Gudang</option>
                  <option>Pemasok Bahan Baku Pertanian/Peternakan</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nomor Sertifikasi Halal BPJPH</label>
                <input type="text" placeholder="ID32..." className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-hidden" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => {
                  alert('Mitra berhasil ditambahkan ke jaringan rantai pasok!');
                  setShowAddModal(false);
                }}
                className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white py-2.5 rounded-xl font-bold text-xs cursor-pointer"
              >
                Simpan & Daftarkan Node
              </button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold cursor-pointer">Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
