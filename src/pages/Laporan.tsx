import { useState } from 'react'
import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const revenueData = [12, 18, 15, 22, 28, 25, 30, 27, 35, 32, 38, 42]
const ordersData = [8, 12, 10, 15, 20, 18, 22, 19, 25, 23, 28, 31]

const topProducts = [
  { name: 'Mi Instan Kari Ayam Halal', sold: 320, revenue: 'Rp 8.000.000', pct: 85 },
  { name: 'Beras Premium Pandan Wangi 5kg', sold: 195, revenue: 'Rp 16.575.000', pct: 72 },
  { name: 'Bumbu Dapur Rendang 200g', sold: 180, revenue: 'Rp 8.190.000', pct: 68 },
  { name: 'Kecap Manis Organik 275ml', sold: 145, revenue: 'Rp 5.510.000', pct: 55 },
  { name: 'Sambal Terasi Super 150ml', sold: 110, revenue: 'Rp 3.520.000', pct: 42 },
]

export default function Laporan({ onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<'pendapatan' | 'produk' | 'pelanggan'>('pendapatan')
  const [period, setPeriod] = useState('2026')

  const maxRevenue = Math.max(...revenueData)

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="font-extrabold text-green-700">SUKAHALAL</span>
          </div>
          <div className="flex items-center gap-3">
            <select value={period} onChange={e => setPeriod(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400">
              {['2026', '2025', '2024'].map(y => <option key={y}>{y}</option>)}
            </select>
            <button onClick={() => onNavigate('dashboard')} className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-xl font-extrabold text-gray-900 mb-6">Laporan & Analitik</h1>

        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Pendapatan', value: 'Rp 124.5 Jt', sub: '+18% vs tahun lalu', color: 'text-green-600', icon: '💰' },
            { label: 'Total Pesanan', value: '1.284', sub: '+23% vs tahun lalu', color: 'text-blue-600', icon: '🛒' },
            { label: 'Produk Terjual', value: '4.820', sub: '+15% vs tahun lalu', color: 'text-amber-600', icon: '📦' },
            { label: 'Rating Rata-rata', value: '4.8 ★', sub: 'Dari 320 ulasan', color: 'text-purple-600', icon: '⭐' },
          ].map((k, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="text-2xl mb-1">{k.icon}</div>
              <div className={`text-xl font-extrabold ${k.color}`}>{k.value}</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{k.label}</div>
              <div className="text-xs text-green-500 mt-0.5">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 mb-6">
          {[
            { id: 'pendapatan', label: 'Pendapatan' },
            { id: 'produk', label: 'Produk Terlaris' },
            { id: 'pelanggan', label: 'Pelanggan' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as typeof activeTab)}
              className={`px-5 py-2.5 text-sm font-medium transition-colors ${
                activeTab === t.id
                  ? 'text-green-600 border-b-2 border-green-600 -mb-px'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'pendapatan' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-5 text-sm">Pendapatan Bulanan {period}</h3>
            {/* Bar chart */}
            <div className="flex items-end gap-2 h-48 mb-3">
              {revenueData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-gray-400 font-medium">{val}M</span>
                  <div
                    className="w-full bg-green-500 rounded-t-md transition-all hover:bg-green-600 cursor-pointer"
                    style={{ height: `${(val / maxRevenue) * 180}px` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {months.map(m => (
                <div key={m} className="flex-1 text-center text-[9px] text-gray-400">{m}</div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'produk' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-5 text-sm">Top 5 Produk Terlaris</h3>
            <div className="space-y-4">
              {topProducts.map((p, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-sm font-medium text-gray-800 truncate max-w-60">{p.name}</span>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <div className="text-xs font-bold text-gray-800">{p.sold} terjual</div>
                      <div className="text-xs text-green-600">{p.revenue}</div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pelanggan' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-5 text-sm">Segmen Pelanggan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Pelanggan Baru', value: 243, icon: '🆕', color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-600' },
                { label: 'Pelanggan Setia', value: 189, icon: '🏆', color: 'bg-amber-50 border-amber-200', textColor: 'text-amber-600' },
                { label: 'Total Pelanggan', value: 432, icon: '👥', color: 'bg-green-50 border-green-200', textColor: 'text-green-600' },
              ].map(s => (
                <div key={s.label} className={`${s.color} border rounded-2xl p-4 text-center`}>
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className={`text-3xl font-extrabold ${s.textColor}`}>{s.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 p-4 bg-gray-50 rounded-xl">
              <div className="text-sm font-semibold text-gray-700 mb-2">Retensi Pelanggan</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '73%' }} />
                </div>
                <span className="text-sm font-bold text-green-600">73%</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">73% pelanggan kembali berbelanja</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
