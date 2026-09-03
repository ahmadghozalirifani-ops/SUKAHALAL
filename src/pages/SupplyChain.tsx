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

const SupplyChain: React.FC<PageProps> = ({ onNavigate, userRole, onSetRole }) => {
  const { t } = useTranslation();
  const [activeNode, setActiveNode] = useState<number | null>(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFleet, setSelectedFleet] = useState(REAL_DISTRIBUTOR_FLEETS[0]);

  const nodes = [
    { 
      id: 1, 
      name: 'Supplier Bahan Baku', 
      entity: 'PT Malindo RPH Modern', 
      icon: '🌾', 
      status: 'green' as TLSStatus, 
      cert: 'ID32160000881230422', 
      temp: '4°C', 
      hum: '60%', 
      seal: 'Aman',
      roleType: 'supplier',
      desc: 'Penyembelihan sapi sesuai syariat oleh Juleha BNSP & sertifikasi NKV Level 1.'
    },
    { 
      id: 2, 
      name: 'Pabrik Pengolahan', 
      entity: 'PT Bunda Halal Foods', 
      icon: '🏭', 
      status: 'green' as TLSStatus, 
      cert: 'ID32110000123450223', 
      temp: '22°C', 
      hum: '55%', 
      seal: 'Aman',
      roleType: 'manufacturer',
      desc: 'Pemasakan rendang lambat dan pengemasan steril pouch retort 121°C berstandar SJPH.'
    },
    { 
      id: 3, 
      name: 'Pengemasan & QC Halal', 
      entity: 'Sentra Sterilisasi Halal', 
      icon: '📦', 
      status: 'green' as TLSStatus, 
      cert: 'BPJPH-QC-2023-A', 
      temp: '20°C', 
      hum: '50%', 
      seal: 'Aman',
      roleType: 'packaging',
      desc: 'Pemeriksaan kebocoran segel retort dan pencetakan barcode EAN-13 & QR trace.'
    },
    { 
      id: 4, 
      name: 'Distributor Cold Chain', 
      entity: 'PT Pos Logistik Halal', 
      icon: '🚚', 
      status: 'green' as TLSStatus, 
      cert: 'DIST-BPJPH-2024-089', 
      temp: '-18.4°C', 
      hum: '62%', 
      seal: 'Aman (Terkunci)',
      roleType: 'distributor',
      desc: 'Armada Thermo King ber-IoT telemetri suhu beku & segel digital RFID real-time.'
    },
    { 
      id: 5, 
      name: 'Ritel Modern & Horeka', 
      entity: 'Jaringan Halal Mart', 
      icon: '🏪', 
      status: 'green' as TLSStatus, 
      cert: 'RITEL-ID-2024', 
      temp: '24°C', 
      hum: '65%', 
      seal: 'Utuh',
      roleType: 'retailer',
      desc: 'Pajangan rak terpisah dari produk non-halal siap dikonsumsi masyarakat.'
    },
  ];

  const risks = [
    { loc: 'RPH Malindo (Slaughterhouse)', type: 'Kontaminasi Silang', level: 'High', measure: 'Pemisahan area basah & kering, audit Juleha BNSP', status: 'Implemented' },
    { loc: 'Cold Storage Padalarang', type: 'Fluktuasi Suhu', level: 'Medium', measure: 'Sensor IoT Suhu -18°C dengan alarm notifikasi otomatis', status: 'Active' },
    { loc: 'Pabrik Pengolahan Rendang', type: 'Kontaminasi Bahan Aditif', level: 'High', measure: 'Pemeriksaan Bill of Materials (BOM) & verifikasi SIHALAL', status: 'Implemented' },
    { loc: 'Distribusi Truk Refrigerator', type: 'Kerusakan Segel di Jalan', level: 'Medium', measure: 'Smart RFID Digital Lock & GPS Geofencing real-time', status: 'Active' },
  ];

  const themeColor = userRole === 'distributor' ? 'blue' : 'green';

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <AppSidebar onNavigate={onNavigate} currentPage="supply-chain" userRole={userRole} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader
          onNavigate={onNavigate}
          userRole={userRole}
          breadcrumbs={[
            { label: t('breadcrumbs.dashboard', 'Dashboard'), page: 'dashboard' },
            { label: t('supplyChain.title', 'Rantai Pasok') }
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
            <span className="text-xs font-bold text-slate-700">Manajemen Rantai Pasok Halal (HACCP & SJPH)</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('supplier-catalog')}
              className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>🏢</span> Katalog Supplier
            </button>
            <button 
              onClick={() => onNavigate('product-catalog')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>📦</span> Katalog Produk
            </button>
            <button 
              onClick={() => onNavigate('verification')}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>🛡️</span> Pusat Verifikasi
            </button>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Alur Rantai Pasok Terintegrasi (Hulu ke Hilir)</h1>
              <p className="text-xs text-gray-500">Monitoring real-time telemetri IoT, audit halal point, dan sertifikasi BPJPH</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)} 
              className={`bg-${themeColor}-700 hover:bg-${themeColor}-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5`}
            >
              <span>+</span> Tambah Mitra Node
            </button>
          </div>

          {/* Interactive Flow Nodes */}
          <div className="bg-white rounded-3xl shadow-xs border border-gray-200/80 p-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 text-center">
              Pilih Tahapan Rantai Pasok untuk Melihat Parameter Otentikasi
            </h2>
            
            <div className="relative flex justify-between items-center max-w-4xl mx-auto mb-6 px-2">
              <div className="absolute h-1.5 bg-emerald-200 left-8 right-8 top-1/2 -translate-y-1/2 z-0 rounded-full"></div>
              
              {nodes.map((node) => (
                <div key={node.id} className="relative z-10 flex flex-col items-center">
                  <button 
                    onClick={() => setActiveNode(node.id)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-3xl flex items-center justify-center text-2xl sm:text-3xl shadow-md border-3 transition-all hover:scale-105 cursor-pointer ${
                      activeNode === node.id 
                        ? 'border-green-600 bg-green-50 ring-4 ring-green-100 scale-105' 
                        : 'border-white bg-white hover:border-gray-200'
                    }`}
                  >
                    {node.icon}
                    <div className="absolute -top-1 -right-1">
                      <TrafficLightStatus status={node.status} size="sm" />
                    </div>
                  </button>
                  <div className="mt-2 text-center max-w-[110px]">
                    <p className="font-bold text-gray-900 text-[11px] leading-tight line-clamp-1">{node.name}</p>
                    <p className="text-[10px] text-gray-500 truncate mt-0.5">{node.entity}</p>
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
                            <h3 className="font-bold text-gray-900 text-sm">{node.name}: {node.entity}</h3>
                            <TrafficLightStatus status={node.status} size="sm" />
                          </div>
                          <p className="text-xs text-gray-500 font-mono">No. Sertifikasi: {node.cert}</p>
                        </div>
                      </div>

                      {/* Node Contextual Navigation Button */}
                      <div className="flex gap-2">
                        {node.roleType === 'supplier' && (
                          <button 
                            onClick={() => onNavigate('supplier-profile')}
                            className="px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded-lg transition-colors"
                          >
                            🏢 Buka Profil Supplier &rarr;
                          </button>
                        )}
                        {node.roleType === 'manufacturer' && (
                          <button 
                            onClick={() => onNavigate('product-detail')}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors"
                          >
                            📦 Lihat Produk Terkait &rarr;
                          </button>
                        )}
                        {node.roleType === 'distributor' && (
                          <button 
                            onClick={() => setSelectedFleet(REAL_DISTRIBUTOR_FLEETS[0])}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
                          >
                            🚚 Pantau Armada IoT &rarr;
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">{node.desc}</p>

                    {/* Real-time IoT Gauges */}
                    <div>
                      <h4 className="font-bold text-gray-700 text-xs mb-2 flex items-center gap-1.5">
                        <span>📡</span> Sensor Telemetri IoT Node Ini:
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
                          <span className="text-[10px] text-gray-400 uppercase font-semibold">Suhu Lingkungan</span>
                          <p className="text-base font-extrabold text-blue-700 mt-0.5">{node.temp}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
                          <span className="text-[10px] text-gray-400 uppercase font-semibold">Kelembapan Udara</span>
                          <p className="text-base font-extrabold text-blue-700 mt-0.5">{node.hum}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
                          <span className="text-[10px] text-gray-400 uppercase font-semibold">Integritas Segel</span>
                          <p className="text-base font-extrabold text-emerald-600 mt-0.5">{node.seal}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Distributor Real Fleet Monitoring IoT Panel */}
          <div className="bg-white rounded-3xl shadow-xs border border-gray-200/80 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span>🚛</span> Monitoring Armada Cold Chain Berpendingin (IoT Live)
                </h2>
                <p className="text-xs text-gray-500">Pelacakan suhu sensor Thermo King & Carrier ber-GPS secara real-time</p>
              </div>
              <div className="flex gap-2">
                {REAL_DISTRIBUTOR_FLEETS.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFleet(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      selectedFleet.id === f.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {f.vehiclePlate}
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
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-2 rounded-xl text-[11px] text-gray-800 shadow-md">
                  <strong>{selectedFleet.fleetType}</strong>
                  <p className="text-gray-500">{selectedFleet.operator}</p>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-3">
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-2xs">
                    <span className="text-[10px] text-gray-400 block font-semibold">Suhu Ruang Box</span>
                    <span className="text-xl font-black text-blue-700">{selectedFleet.temperature}°C</span>
                    <span className="text-[10px] text-emerald-600 font-bold block">Target: {selectedFleet.targetTemp}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-2xs">
                    <span className="text-[10px] text-gray-400 block font-semibold">Kelembapan Box</span>
                    <span className="text-xl font-black text-blue-700">{selectedFleet.humidity}%</span>
                    <span className="text-[10px] text-gray-400 block">Relative Humidity</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-2xs">
                    <span className="text-[10px] text-gray-400 block font-semibold">Segel Digital RFID</span>
                    <span className="text-xs font-bold text-emerald-700 block mt-1">{selectedFleet.sealStatus}</span>
                    <span className="text-[9px] font-mono text-gray-400 block">{selectedFleet.sealCode}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-2xs">
                    <span className="text-[10px] text-gray-400 block font-semibold">GPS Tracking</span>
                    <span className="text-xs font-bold text-green-600 block mt-1">● {selectedFleet.gpsStatus}</span>
                    <span className="text-[10px] text-gray-500 block">Sinyal Kuat</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <p><strong>Rute Ekspedisi:</strong> {selectedFleet.route}</p>
                  <p><strong>Lokasi Sekarang:</strong> 📍 {selectedFleet.currentLocation}</p>
                  <p><strong>Driver PIC:</strong> {selectedFleet.driverName} ({selectedFleet.driverPhone})</p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Control Points Table */}
          <div className="bg-white rounded-3xl shadow-xs border border-gray-200/80 p-6">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>⚠️</span> Matriks Pengendalian Titik Kritis Kehalalan (Critical Control Point / CCP)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="py-2.5 px-3">Titik Kritis (Location)</th>
                    <th className="py-2.5 px-3">Potensi Bahaya Halal</th>
                    <th className="py-2.5 px-3">Level Risiko</th>
                    <th className="py-2.5 px-3">Tindakan Pencegahan (SOP BPJPH)</th>
                    <th className="py-2.5 px-3">Status Kontrol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {risks.map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-semibold text-gray-800">{r.loc}</td>
                      <td className="py-2.5 px-3 text-gray-600">{r.type}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${r.level === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                          {r.level}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-600">{r.measure}</td>
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
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-sm">Tambah Mitra Rantai Pasok Halal</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Nama Perusahaan / Unit Usaha</label>
                <input type="text" placeholder="Contoh: PT Sumber Pangan Halal" className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-hidden" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Peran dalam Rantai Pasok</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-hidden bg-white">
                  <option>Supplier Bahan Baku</option>
                  <option>Rumah Potong Hewan (RPH)</option>
                  <option>Pabrik Pengolahan</option>
                  <option>Ekspedisi Cold Chain</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Nomor Sertifikasi Halal BPJPH</label>
                <input type="text" placeholder="ID32..." className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-hidden" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => {
                  alert('Mitra berhasil ditambahkan ke jaringan rantai pasok!');
                  setShowAddModal(false);
                }}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-xl font-bold text-xs"
              >
                Simpan & Daftarkan Node
              </button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold">Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplyChain;
