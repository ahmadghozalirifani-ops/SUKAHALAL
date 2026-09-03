import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import TrafficLightStatus, { type TLSStatus } from '../components/TrafficLightStatus';

export type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

export interface PageProps {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

const SupplyChain: React.FC<PageProps> = ({ onNavigate, userRole, onSetRole }) => {
  const { t } = useTranslation();
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const nodes = [
    { id: 1, name: 'Supplier', icon: '🌾', status: 'green' as TLSStatus, cert: 'BPJPH-2023-A1', temp: '25°C', hum: '60%', seal: 'Aman' },
    { id: 2, name: 'Manufacturer', icon: '🏭', status: 'green' as TLSStatus, cert: 'BPJPH-2023-B2', temp: '20°C', hum: '55%', seal: 'Aman' },
    { id: 3, name: 'Packager', icon: '📦', status: 'yellow' as TLSStatus, cert: 'BPJPH-2022-C3', temp: '22°C', hum: '50%', seal: 'Aman' },
    { id: 4, name: 'Distributor', icon: '🚚', status: 'green' as TLSStatus, cert: 'BPJPH-2023-D4', temp: '4°C', hum: '80%', seal: 'Aman' },
    { id: 5, name: 'Retailer', icon: '🏪', status: 'red' as TLSStatus, cert: 'Tidak Valid', temp: '25°C', hum: '65%', seal: 'Rusak' },
  ];

  const risks = [
    { loc: 'RPH (Slaughterhouse)', type: 'Kontaminasi Silang', level: 'High', measure: 'Pemisahan area basah & kering, alat khusus', status: 'Implemented' },
    { loc: 'Raw Material Storage', type: 'Suhu tidak stabil', level: 'Medium', measure: 'IoT Temperature Monitoring', status: 'Active' },
    { loc: 'Production Floor', type: 'Campuran bahan non-halal', level: 'High', measure: 'SOP Sterilisasi & Pengecekan BOM', status: 'Implemented' },
    { loc: 'Packaging Area', type: 'Kemasan tidak food grade', level: 'Low', measure: 'Sertifikasi supplier kemasan', status: 'Active' },
    { loc: 'Distribution Truck', type: 'Segel rusak di perjalanan', level: 'Medium', measure: 'Smart Lock & GPS Tracking', status: 'Warning' },
  ];

  const themeColor = userRole === 'distributor' ? 'blue' : 'green';

  return (

    <div className="flex h-screen overflow-hidden">
      <AppSidebar onNavigate={onNavigate} currentPage="supply-chain" userRole={userRole} />
      <div className="flex-1 flex flex-col bg-gray-50">
        <AppHeader
           onNavigate={onNavigate}
           userRole={userRole}
           breadcrumbs={[
             { label: t('breadcrumbs.dashboard', 'Dashboard'), page: 'dashboard' },
             { label: t('supplyChain.title', 'Rantai Pasok') }
           ]}
        />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
             <h1 className="text-2xl font-bold text-gray-800">{t('supplyChain.title', 'Manajemen Rantai Pasok Halal')}</h1>
             <button onClick={() => setShowAddModal(true)} className={`bg-${themeColor}-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-${themeColor}-700 transition-colors`}>
               + Tambah Anggota
             </button>
          </div>

          {/* Interactive Flow */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
             <h2 className="text-lg font-bold text-gray-800 mb-12 text-center">Visualisasi Rantai Pasok Terintegrasi (IoT & TLS)</h2>
             
             <div className="relative flex justify-between items-center max-w-4xl mx-auto mb-8">
                <div className="absolute h-1 bg-gray-200 left-0 right-0 top-1/2 -translate-y-1/2 z-0"></div>
                {nodes.map((node, i) => (
                  <div key={node.id} className="relative z-10 flex flex-col items-center">
                    <button 
                       onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                       className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-md border-4 transition-transform hover:scale-110 ${activeNode === node.id ? `border-${themeColor}-500 bg-${themeColor}-50` : 'border-white bg-white'} relative`}
                    >
                       {node.icon}
                       <div className="absolute -top-1 -right-1">
                          <TrafficLightStatus status={node.status} />
                       </div>
                    </button>
                    <div className="mt-3 text-center">
                       <p className="font-bold text-gray-800 text-sm">{node.name}</p>
                       <p className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-1">{node.cert}</p>
                    </div>
                  </div>
                ))}
             </div>

             {/* Node Details / IoT Panel */}
             {activeNode && (
               <div className={`bg-${themeColor}-50 border border-${themeColor}-100 rounded-xl p-6 max-w-4xl mx-auto animate-fade-in`}>
                  {nodes.filter(n => n.id === activeNode).map(node => (
                     <div key={node.id}>
                        <div className="flex items-center gap-3 mb-4">
                           <div className="text-4xl">{node.icon}</div>
                           <div>
                              <h3 className="font-bold text-gray-800 text-lg">Detail {node.name}</h3>
                              <div className="flex items-center gap-2">Status: <TrafficLightStatus status={node.status} /> <span className="text-sm">{node.cert}</span></div>
                           </div>
                        </div>
                        <h4 className="font-semibold text-gray-700 text-sm mb-3">📡 Data IoT Real-time</h4>
                        <div className="grid grid-cols-3 gap-4">
                           <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                              <div className="text-xs text-gray-500 mb-1">Suhu Lingkungan</div>
                              <div className="font-bold text-gray-800">{node.temp}</div>
                           </div>
                           <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                              <div className="text-xs text-gray-500 mb-1">Kelembapan</div>
                              <div className="font-bold text-gray-800">{node.hum}</div>
                           </div>
                           <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                              <div className="text-xs text-gray-500 mb-1">Status Segel Fisik</div>
                              <div className={`font-bold ${node.seal === 'Aman' ? 'text-green-600' : 'text-red-600'}`}>{node.seal}</div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
             )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {/* Risk Map / FMEA */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">⚠️ Peta Risiko Halal (FMEA)</h2>
                <table className="w-full text-left text-sm">
                   <thead>
                      <tr className="border-b border-gray-200 text-gray-500">
                         <th className="pb-3 font-medium">Titik Kontrol (CCP)</th>
                         <th className="pb-3 font-medium">Risiko</th>
                         <th className="pb-3 font-medium">Level</th>
                         <th className="pb-3 font-medium">Mitigasi</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {risks.map((risk, i) => (
                         <tr key={i} className="hover:bg-gray-50">
                            <td className="py-3 font-medium text-gray-800">{risk.loc}</td>
                            <td className="py-3 text-gray-600">{risk.type}</td>
                            <td className="py-3">
                               <span className={`px-2 py-1 rounded text-xs font-bold ${risk.level === 'High' ? 'bg-red-100 text-red-700' : risk.level === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                  {risk.level}
                               </span>
                            </td>
                            <td className="py-3 text-gray-600">{risk.measure}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>

             {/* SLA Section */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">🤝 Service Level Agreement (SLA) Halal</h2>
                <div className="space-y-4">
                   <div className="p-4 rounded-xl border border-green-200 bg-green-50 flex justify-between items-center">
                      <div>
                         <h4 className="font-bold text-green-900">SLA Produsen - Distributor</h4>
                         <p className="text-sm text-green-800">Menjaga suhu rantai dingin &lt; 4°C selama transit.</p>
                      </div>
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">Disetujui</span>
                   </div>
                   <div className="p-4 rounded-xl border border-gray-200 bg-white flex justify-between items-center">
                      <div>
                         <h4 className="font-bold text-gray-800">SLA Supplier - Produsen</h4>
                         <p className="text-sm text-gray-500">Penyediaan sertifikat halal batch material setiap pengiriman.</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded">Menunggu Konfirmasi</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Member Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
             <h2 className="text-lg font-bold text-gray-800 mb-4">Daftar Anggota Rantai Pasok</h2>
             <table className="w-full text-left text-sm">
                <thead>
                   <tr className="border-b border-gray-200 text-gray-500 bg-gray-50">
                      <th className="py-3 px-4 font-medium rounded-tl-lg">Nama Mitra</th>
                      <th className="py-3 px-4 font-medium">Tipe</th>
                      <th className="py-3 px-4 font-medium">Lokasi</th>
                      <th className="py-3 px-4 font-medium">Status TLS</th>
                      <th className="py-3 px-4 font-medium rounded-tr-lg">Skor OMAX</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {[
                     { name: 'PT Sapi Unggul', type: 'Supplier', loc: 'Jawa Tengah', status: 'green' as TLSStatus, score: '98/100' },
                     { name: 'Pabrik Makmur', type: 'Produsen', loc: 'Jawa Barat', status: 'green' as TLSStatus, score: '95/100' },
                     { name: 'Kemas Indah', type: 'Pengemasan', loc: 'Jakarta', status: 'yellow' as TLSStatus, score: '78/100' },
                     { name: 'Logistik Cepat', type: 'Distributor', loc: 'Nasional', status: 'green' as TLSStatus, score: '92/100' },
                   ].map((member, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                         <td className="py-3 px-4 font-medium text-gray-800">{member.name}</td>
                         <td className="py-3 px-4 text-gray-600">{member.type}</td>
                         <td className="py-3 px-4 text-gray-600">{member.loc}</td>
                         <td className="py-3 px-4"><TrafficLightStatus status={member.status} /></td>
                         <td className="py-3 px-4 font-bold text-gray-700">{member.score}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </main>
      </div>

      {/* Add Modal */}
      {showAddModal && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
               <h3 className="text-xl font-bold text-gray-800 mb-4">Tambah Anggota Baru</h3>
               <div className="space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mitra</label>
                     <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="Masukkan nama mitra" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Anggota</label>
                     <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
                        <option>Supplier</option>
                        <option>Produsen</option>
                        <option>Pengemasan</option>
                        <option>Distributor</option>
                        <option>Retailer</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Upload Sertifikat / Dokumen</label>
                     <input type="file" className="w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700" />
                  </div>
               </div>
               <div className="flex gap-3 mt-8">
                  <button onClick={() => setShowAddModal(false)} className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">Batal</button>
                  <button onClick={() => setShowAddModal(false)} className={`flex-1 py-2 rounded-lg bg-${themeColor}-600 text-white font-medium hover:bg-${themeColor}-700`}>Simpan</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default SupplyChain;
