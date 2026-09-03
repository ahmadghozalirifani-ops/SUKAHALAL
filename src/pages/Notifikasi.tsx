import type { UserRole } from '../App'

interface Props {
  onNavigate: (page: string) => void
  userRole: UserRole
  onSetRole: (role: UserRole) => void
}

const notifications = [
  { id: 1, type: 'verifikasi', icon: '✅', title: 'Verifikasi Disetujui', desc: 'Produk "Mie Organik Halal Premium" telah lolos verifikasi BPJPH', time: '5 menit lalu', read: false, page: 'verification' },
  { id: 2, type: 'pesanan', icon: '🛒', title: 'Pesanan Baru Masuk', desc: 'Budi Santoso memesan 10x Mi Instan Kari Ayam Halal', time: '15 menit lalu', read: false, page: 'pesanan' },
  { id: 3, type: 'stok', icon: '⚠️', title: 'Stok Hampir Habis', desc: 'Bumbu Dapur Rendang 200g tersisa 25 pcs. Segera restok!', time: '1 jam lalu', read: false, page: 'inventaris' },
  { id: 4, type: 'dokumen', icon: '📄', title: 'Dokumen Perlu Diperbarui', desc: 'Sertifikat Halal BPJPH akan expired dalam 30 hari', time: '2 jam lalu', read: true, page: 'upload-dokumen' },
  { id: 5, type: 'marketing', icon: '📢', title: 'Kampanye Promo Berakhir', desc: 'Kampanye "Buy 2 Get 1 Bumbu" telah berakhir. Lihat hasil →', time: '3 jam lalu', read: true, page: 'marketing' },
  { id: 6, type: 'sistem', icon: '🔔', title: 'Pembaruan Sistem', desc: 'SUKAHALAL versi 2.1 telah rilis dengan fitur baru', time: '5 jam lalu', read: true, page: 'dashboard' },
  { id: 7, type: 'pesanan', icon: '📦', title: 'Pesanan Dikirim', desc: 'Pesanan ORD-003 telah dikirim via JNE ke Ahmad Fauzi', time: '6 jam lalu', read: true, page: 'pesanan' },
  { id: 8, type: 'verifikasi', icon: '⏳', title: 'Review BPJPH Pending', desc: 'Produk "Sambal Hijau Pedas" sedang dalam review BPJPH', time: '1 hari lalu', read: true, page: 'verification' },
]

const typeColors: Record<string, string> = {
  verifikasi: 'bg-green-100 text-green-600',
  pesanan: 'bg-blue-100 text-blue-600',
  stok: 'bg-amber-100 text-amber-600',
  dokumen: 'bg-teal-100 text-teal-600',
  marketing: 'bg-pink-100 text-pink-600',
  sistem: 'bg-gray-100 text-gray-600',
}

export default function Notifikasi({ onNavigate }: Props) {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="font-extrabold text-green-700">SUKAHALAL</span>
          </div>
          <button onClick={() => onNavigate('dashboard')} className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">Notifikasi</h1>
            <p className="text-sm text-gray-500">{unreadCount} notifikasi belum dibaca</p>
          </div>
          <button className="text-sm text-green-600 hover:text-green-700 font-medium">Tandai Semua Dibaca</button>
        </div>

        <div className="space-y-2">
          {notifications.map(n => (
            <button
              key={n.id}
              onClick={() => onNavigate(n.page)}
              className={`w-full text-left bg-white rounded-2xl border shadow-sm p-4 flex items-start gap-4 hover:shadow-md transition-shadow ${
                !n.read ? 'border-green-200 bg-green-50/30' : 'border-gray-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${typeColors[n.type]}`}>
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-gray-900 text-sm">{n.title}</span>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{n.desc}</p>
                <span className="text-xs text-gray-400 mt-1 block">{n.time}</span>
              </div>
              <span className="text-gray-300 text-sm shrink-0 mt-1">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
