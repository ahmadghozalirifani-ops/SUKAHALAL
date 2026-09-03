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

const mockOrders = [
  { id: 'ORD-001', customer: 'Ahmad Fulan', date: '2026-09-01', total: 150000, status: 'Baru', courier: 'HalalLogistics', items: [{ name: 'Rendang Sapi', qty: 2, icon: '🥩', price: 75000 }] },
  { id: 'ORD-002', customer: 'Siti Aminah', date: '2026-09-02', total: 45000, status: 'Diproses', courier: 'JNE', items: [{ name: 'Keripik Tempe', qty: 3, icon: '🍘', price: 15000 }] },
  { id: 'ORD-003', customer: 'Budi Santoso', date: '2026-09-02', total: 250000, status: 'Dikirim', courier: 'SiCepat', items: [{ name: 'Madu Hutan', qty: 1, icon: '🍯', price: 250000 }] },
  { id: 'ORD-004', customer: 'Aisyah', date: '2026-09-03', total: 30000, status: 'Selesai', courier: 'GoSend', items: [{ name: 'Kopi Arabika', qty: 1, icon: '☕', price: 30000 }] },
  { id: 'ORD-005', customer: 'Umar', date: '2026-09-03', total: 120000, status: 'Baru', courier: 'JNT', items: [{ name: 'Kurma Ajwa', qty: 1, icon: '🌴', price: 120000 }] },
  { id: 'ORD-006', customer: 'Khadijah', date: '2026-09-03', total: 55000, status: 'Dibatalkan', courier: 'GrabExpress', items: [{ name: 'Susu Kambing', qty: 1, icon: '🥛', price: 55000 }] },
  { id: 'ORD-007', customer: 'Usman', date: '2026-09-03', total: 80000, status: 'Diproses', courier: 'AnterAja', items: [{ name: 'Sambal Roa', qty: 2, icon: '🌶️', price: 40000 }] },
  { id: 'ORD-008', customer: 'Fatimah', date: '2026-09-03', total: 95000, status: 'Selesai', courier: 'NinjaXpress', items: [{ name: 'Teh Hijau', qty: 5, icon: '🍵', price: 19000 }] },
];

export default function Pesanan({ onNavigate, userRole, onSetRole }: Props) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('Semua');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Baru': return 'bg-blue-100 text-blue-800';
      case 'Diproses': return 'bg-amber-100 text-amber-800';
      case 'Dikirim': return 'bg-cyan-100 text-cyan-800';
      case 'Selesai': return 'bg-green-100 text-green-800';
      case 'Dibatalkan': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = filter === 'Semua' ? mockOrders : mockOrders.filter(o => o.status === filter);

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar onNavigate={onNavigate} userRole={userRole} currentPage="pesanan" />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <AppHeader 
          onNavigate={onNavigate} 
          userRole={userRole} 
          onSetRole={onSetRole}
          breadcrumbs={[{ label: t('breadcrumbs.dashboard'), page: 'dashboard' }, { label: t('breadcrumbs.orders') }]}
        />
        
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPIWidget title={t('orders.total')} value="82" trend="+5%" status="good" />
            <KPIWidget title={t('orders.pending')} value="12" trend="-2%" status="warning" />
            <KPIWidget title={t('orders.shipping')} value="34" trend="+10%" status="good" />
            <KPIWidget title={t('orders.completed')} value="36" trend="+8%" status="good" />
          </div>

          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {['Semua', 'Baru', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${filter === f ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'}`}
              >
                {t(`orders.status.${f.toLowerCase()}`, f)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.customer} • {order.date}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <span className="text-xl mr-3 bg-gray-50 p-2 rounded-lg">{item.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-gray-500">{item.qty}x • Rp {item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <div className="text-sm">
                    <p className="text-gray-500">{t('orders.courier')}</p>
                    <p className="font-medium">{order.courier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">{t('orders.total_amount')}</p>
                    <p className="font-bold text-green-600">Rp {order.total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100"
                  >
                    {t('orders.view_details')}
                  </button>
                  {userRole === 'seller' && order.status === 'Baru' && (
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                      {t('orders.action.confirm')}
                    </button>
                  )}
                  {userRole === 'seller' && order.status === 'Diproses' && (
                    <button className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700">
                      {t('orders.action.ship')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{t('orders.detail_title')} {selectedOrder.id}</h2>
                  <p className="text-gray-500">{selectedOrder.date}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="p-6 space-y-8">
                {/* SCOR Flow */}
                <section>
                  <h3 className="font-semibold text-gray-900 mb-4">{t('orders.scor_flow')}</h3>
                  <div className="flex justify-between items-center relative">
                    <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
                    {['Plan', 'Source', 'Make', 'Deliver', 'Return'].map((step, idx) => (
                      <div key={step} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${idx < 4 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                          {idx + 1}
                        </div>
                        <p className="mt-2 text-xs font-medium text-gray-600">{step}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Halal Chain Info */}
                  <section className="bg-green-50 rounded-xl p-5 border border-green-100">
                    <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                      <span className="mr-2">✅</span> {t('orders.halal_chain_status')}
                    </h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-green-800">{item.name}</span>
                          <span className="bg-green-200 text-green-900 px-2 py-1 rounded text-xs font-medium">Verified ID123456789</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Payment & Shipping */}
                  <section className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-3">{t('orders.payment_shipping')}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t('orders.payment_method')}</span>
                        <span className="font-medium text-gray-900">BSI Syariah</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t('orders.courier')}</span>
                        <span className="font-medium text-gray-900">{selectedOrder.courier}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                        <span className="text-gray-500">{t('orders.resi')}</span>
                        <input type="text" placeholder="Input resi..." className="text-right text-sm border-b border-gray-300 bg-transparent focus:outline-none focus:border-green-500" defaultValue={selectedOrder.status === 'Dikirim' ? 'JP1234567890' : ''} disabled={userRole !== 'seller'} />
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
