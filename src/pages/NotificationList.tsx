import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useMessages } from '../context/MessageContext';

export default function NotificationList() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { markAsRead } = useMessages();

  // Map route type to message ID
  const typeToId: Record<string, string> = {
    'followers': 'n1',
    'activity': 'n2',
    'system': 'n3'
  };

  const titles: Record<string, string> = {
    'followers': 'Pengikut baru',
    'activity': 'Aktivitas',
    'system': 'Notifikasi sistem'
  };

  useEffect(() => {
    if (type && typeToId[type]) {
      markAsRead(typeToId[type]);
    }
  }, [type, markAsRead]);

  const renderContent = () => {
    switch (type) {
      case 'followers':
        return (
          <div className="divide-y divide-gray-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img src={`https://picsum.photos/seed/follower${i}/100/100`} alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">User {i}</p>
                  <p className="text-xs text-gray-500">Mulai mengikuti Anda · {i}j yang lalu</p>
                </div>
                <button className="bg-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-md">
                  Ikuti balik
                </button>
              </div>
            ))}
          </div>
        );
      case 'activity':
        return (
          <div className="divide-y divide-gray-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3 p-4 bg-white">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <img src={`https://picsum.photos/seed/activity${i}/100/100`} alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-bold">User {i}</span> menyukai video Anda.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{i}j yang lalu</p>
                </div>
                <div className="w-10 h-14 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                   <img src={`https://picsum.photos/seed/post${i}/100/150`} alt="Post" className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'system':
        return (
          <div className="divide-y divide-gray-50">
            <div className="p-4 bg-white">
              <h3 className="font-bold text-sm mb-1">Update Kebijakan Privasi</h3>
              <p className="text-xs text-gray-600 mb-2">Kami telah memperbarui kebijakan privasi kami untuk memberikan perlindungan yang lebih baik.</p>
              <p className="text-[10px] text-gray-400">17 jam yang lalu</p>
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-bold text-sm mb-1">Promo Spesial Hari Ini!</h3>
              <p className="text-xs text-gray-600 mb-2">Dapatkan diskon hingga 50% untuk produk pilihan.</p>
              <p className="text-[10px] text-gray-400">1 hari yang lalu</p>
            </div>
          </div>
        );
      default:
        return <div className="p-4 text-center text-gray-500">Tidak ada data</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="sticky top-0 bg-white z-10 flex items-center gap-4 px-4 py-3 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">{titles[type || ''] || 'Notifikasi'}</h1>
      </header>
      
      {renderContent()}
    </div>
  );
}
