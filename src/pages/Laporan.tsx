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

export default function Laporan({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  const [period, setPeriod] = useState('Bulanan');
  const [exportToast, setExportToast] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar onNavigate={onNavigate} userRole={userRole} currentPage="laporan" />
      <main className="flex-1 overflow-y-auto" style={{ background: '#FAFAF8' }}>
        <AppHeader 
          onNavigate={onNavigate} 
          userRole={userRole} 
          onSetRole={onSetRole}
          breadcrumbs={[{ label: t('breadcrumbs.dashboard'), page: 'dashboard' }, { label: t('breadcrumbs.reports') }]}
        />
        
        <div className="p-6 max-w-7xl mx-auto space-y-8">
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-1 bg-white p-1 rounded-lg border border-gray-200">
              {['Harian', 'Mingguan', 'Bulanan', 'Tahunan'].map(p => (
                <button 
                  key={p} onClick={() => setPeriod(p)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium ${period === p ? 'bg-green-50 text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button 
              onClick={() => {
                setExportToast(true);
                setTimeout(() => setExportToast(false), 3000);
              }}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center shadow-sm cursor-pointer"
            >
              📄 {t('reports.export_pdf')}
            </button>
          </div>

          {exportToast && (
            <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-2xl animate-fade-in flex items-center gap-2">
              <span>📄</span> Laporan periode {period} berhasil diekspor ke format PDF resmi!
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPIWidget title={userRole === 'distributor' ? t('reports.delivery_success') : t('reports.total_revenue')} value={userRole === 'distributor' ? "98.5%" : "Rp 45.2Jt"} trend="+12%" status="good" />
            <KPIWidget title={userRole === 'customer' ? t('reports.total_purchases') : t('reports.total_orders')} value="156" trend="+5%" status="good" />
            <KPIWidget title={t('reports.top_product')} value="Rendang Sapi" trend="" status="neutral" />
            <KPIWidget title={t('reports.retention')} value="64%" trend="+2%" status="good" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6">{t('reports.revenue_chart')}</h3>
              <div className="h-64 flex items-end justify-between space-x-4">
                {[
                  { m: 'Jan', v: 40 }, { m: 'Feb', v: 60 }, { m: 'Mar', v: 45 }, 
                  { m: 'Apr', v: 80 }, { m: 'May', v: 70 }, { m: 'Jun', v: 95 }
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center group">
                    <div className="w-full bg-green-100 group-hover:bg-green-500 rounded-t-md relative transition-colors" style={{ height: `${item.v}%` }}>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                        Rp {(item.v * 0.5).toFixed(1)}Jt
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{item.m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance & Performance Gauges */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-8 flex flex-col justify-center">
              <div className="text-center">
                <h3 className="font-bold text-gray-900 mb-4">{t('reports.halal_compliance')}</h3>
                <div className="relative w-32 h-32 mx-auto rounded-full bg-gray-100 flex items-center justify-center" style={{ background: `conic-gradient(#16a34a 87%, #f3f4f6 0)` }}>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold text-green-600">87%</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-gray-900 mb-4">{t('reports.supply_chain_score')}</h3>
                <div className="relative w-32 h-32 mx-auto rounded-full bg-gray-100 flex items-center justify-center" style={{ background: `conic-gradient(#2563eb 91%, #f3f4f6 0)` }}>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold text-blue-600">91%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">{t('reports.top_products')}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-500 text-sm border-b border-gray-100">
                      <th className="pb-3 font-medium">Rank</th>
                      <th className="pb-3 font-medium">Produk</th>
                      <th className="pb-3 font-medium">Terjual</th>
                      <th className="pb-3 font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { rank: 1, name: 'Rendang Sapi', sold: 450, rev: '33.7Jt' },
                      { rank: 2, name: 'Madu Hutan', sold: 312, rev: '78.0Jt' },
                      { rank: 3, name: 'Kopi Arabika', sold: 280, rev: '8.4Jt' },
                      { rank: 4, name: 'Kurma Ajwa', sold: 195, rev: '23.4Jt' },
                      { rank: 5, name: 'Teh Hijau', sold: 150, rev: '2.8Jt' },
                    ].map(item => (
                      <tr key={item.rank}>
                        <td className="py-3 font-bold text-gray-400">#{item.rank}</td>
                        <td className="py-3 font-medium text-gray-900">{item.name}</td>
                        <td className="py-3 text-gray-600">{item.sold}</td>
                        <td className="py-3 text-green-600 font-medium">Rp {item.rev}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* OMAX Matrix */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">{t('reports.omax_matrix')}</h3>
              <p className="text-sm text-gray-500 mb-4">Objective Matrix (OMAX) Supply Chain Performance</p>
              <div className="space-y-3">
                {[
                  { dim: 'Quality (Kualitas Halal)', score: 9.5, max: 10, color: 'bg-green-500' },
                  { dim: 'Delivery (Pengiriman)', score: 8.2, max: 10, color: 'bg-blue-500' },
                  { dim: 'Flexibility (Fleksibilitas)', score: 7.5, max: 10, color: 'bg-amber-500' },
                  { dim: 'Responsiveness (Respons)', score: 8.8, max: 10, color: 'bg-purple-500' },
                  { dim: 'Cost (Efisiensi Biaya)', score: 9.0, max: 10, color: 'bg-cyan-500' },
                ].map(item => (
                  <div key={item.dim} className="flex items-center">
                    <span className="w-1/2 text-sm font-medium text-gray-700 truncate pr-2">{item.dim}</span>
                    <div className="w-1/2 flex items-center space-x-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${(item.score/item.max)*100}%` }}></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-8 text-right">{item.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
