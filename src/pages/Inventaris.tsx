import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import KPIWidget from '../components/KPIWidget';
import TrafficLightStatus from '../components/TrafficLightStatus';

type UserRole = 'guest' | 'seller' | 'distributor' | 'customer';

interface Props {
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

const mockInventory = [
  { id: 1, name: 'Rendang Sapi Suwir', sku: 'RND-001', category: 'Makanan Siap Saji', stock: 120, minStock: 20, status: 'good' },
  { id: 2, name: 'Keripik Tempe', sku: 'KRP-001', category: 'Cemilan', stock: 15, minStock: 50, status: 'danger' },
  { id: 3, name: 'Madu Hutan Liar', sku: 'MDH-001', category: 'Kesehatan', stock: 25, minStock: 30, status: 'warning' },
  { id: 4, name: 'Kopi Arabika Gayo', sku: 'KOP-001', category: 'Minuman', stock: 85, minStock: 20, status: 'good' },
  { id: 5, name: 'Kurma Ajwa', sku: 'KRM-001', category: 'Makanan Sehat', stock: 5, minStock: 100, status: 'danger' },
];

export default function Inventaris({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [inventory, setInventory] = useState(mockInventory);

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar onNavigate={onNavigate} userRole={userRole} currentPage="inventaris" />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <AppHeader 
          onNavigate={onNavigate} 
          userRole={userRole} 
          onSetRole={onSetRole}
          breadcrumbs={[{ label: t('breadcrumbs.dashboard'), page: 'dashboard' }, { label: t('breadcrumbs.inventory') }]}
        />
        
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPIWidget title={t('inventory.total_sku')} value="127" trend="" status="neutral" />
            <KPIWidget title={t('inventory.available')} value="98" trend="" status="good" />
            <KPIWidget title={t('inventory.low_stock')} value="18" trend="" status="warning" />
            <KPIWidget title={t('inventory.out_of_stock')} value="11" trend="" status="danger" />
          </div>

          {/* Restock Alerts */}
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start shadow-sm">
            <span className="text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">{t('inventory.restock_alert_title')}</h3>
              <p className="text-red-600 text-sm mt-1">{t('inventory.restock_alert_desc')}</p>
              <div className="mt-2 flex gap-2">
                {inventory.filter(i => i.status === 'danger').map(item => (
                  <span key={item.id} className="bg-white text-red-700 px-2 py-1 rounded text-xs border border-red-200 font-medium">
                    {item.name} ({item.stock}/{item.minStock})
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">{t('inventory.list_title')}</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                  {t('inventory.bulk_update')}
                </button>
                <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                  + {t('inventory.add_stock')}
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium"><input type="checkbox" className="rounded text-green-600" /></th>
                    <th className="p-4 font-medium">{t('inventory.col_name')}</th>
                    <th className="p-4 font-medium">{t('inventory.col_sku')}</th>
                    <th className="p-4 font-medium">{t('inventory.col_category')}</th>
                    <th className="p-4 font-medium">{t('inventory.col_stock')}</th>
                    <th className="p-4 font-medium">{t('inventory.col_min_stock')}</th>
                    <th className="p-4 font-medium">{t('inventory.col_status')}</th>
                    <th className="p-4 font-medium">{t('inventory.col_action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inventory.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-4"><input type="checkbox" className="rounded text-green-600" /></td>
                      <td className="p-4 font-medium text-gray-900">{item.name}</td>
                      <td className="p-4 text-gray-500 text-sm">{item.sku}</td>
                      <td className="p-4 text-gray-500 text-sm">{item.category}</td>
                      <td className="p-4">
                        <div className="flex items-center group cursor-pointer">
                          <span className="font-bold text-gray-800">{item.stock}</span>
                          <span className="ml-2 opacity-0 group-hover:opacity-100 text-gray-400 text-xs">✏️</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-500">{item.minStock}</td>
                      <td className="p-4">
                        <TrafficLightStatus status={item.status as any} />
                      </td>
                      <td className="p-4">
                        <button className="text-green-600 hover:text-green-800 text-sm font-medium">{t('common.edit')}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Simple Stock History Chart Simulation */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-6">{t('inventory.history_chart')}</h3>
            <div className="h-48 flex items-end justify-between space-x-2">
              {[40, 55, 30, 80, 60, 90, 75, 110, 85, 120].map((val, idx) => (
                <div key={idx} className="w-full bg-green-100 hover:bg-green-200 rounded-t-sm relative group transition-all" style={{ height: `${val}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                    {val}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-400">
              <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span>
              <span>W6</span><span>W7</span><span>W8</span><span>W9</span><span>W10</span>
            </div>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">{t('inventory.add_stock_modal')}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('inventory.col_name')}</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('inventory.col_sku')}</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('inventory.col_stock')}</label>
                    <input type="number" className="w-full border border-gray-300 rounded-lg p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('inventory.col_min_stock')}</label>
                    <input type="number" className="w-full border border-gray-300 rounded-lg p-2" />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3 justify-end">
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">{t('common.cancel')}</button>
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium">{t('common.save')}</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
