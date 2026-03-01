import { 
  ArrowLeft, 
  Trash2, 
  X, 
  ChevronDown, 
  Zap, 
  Megaphone, 
  ChevronRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Notifications() {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="min-h-screen bg-white font-sans pb-10">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-20 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold">Notifikasi</h1>
          <button className="p-1 -mr-1">
            <Trash2 size={24} />
          </button>
        </div>
        
        {/* Sub Header / Tabs */}
        <div className="px-4 pb-3">
          <div className="text-center font-semibold text-sm border-b-2 border-black pb-3 w-full">
            Sistem(15)
          </div>
        </div>
      </header>

      <div className="pt-[105px]">
        {/* Banner */}
        {showBanner && (
          <div className="bg-gray-100 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
            <span>Pemberitahuan kedaluwarsa setelah 100 hari.</span>
            <button onClick={() => setShowBanner(false)}>
              <X size={16} className="text-gray-400" />
            </button>
          </div>
        )}

        <div className="p-4">
          {/* Filter Dropdown */}
          <button className="flex items-center gap-1 font-bold text-sm mb-6">
            <span>Semua Notifikasi Sistem</span>
            <ChevronDown size={16} />
          </button>

          {/* Important Section */}
          <div className="mb-6">
            <div className="flex items-center gap-1 mb-4">
              <Zap size={16} className="text-pink-500 fill-pink-500" />
              <h2 className="font-bold text-sm">Notifikasi Penting</h2>
            </div>

            <NotificationItem 
              isNew={true}
              title="Pembeli Asyik Bermain, Kamu Nikmati Komisi! 💰🎯"
              content=":Kini kamu bisa membagikan halaman interaktif, seperti Belanja dan Cuan dan Pecahkan telurnya!, kepada para pembeli. Ajak audiens bermain dan dapatkan komisi setiap kali mereka belanja! 🥳 Caranya mudah. Seru. Menguntungkan Pelajari selengkapnya di sini"
              time="2 bln"
            />
          </div>

          {/* Previous Section */}
          <div>
            <h2 className="font-bold text-sm mb-4">Sebelumnya</h2>
            
            <div className="space-y-6">
              <NotificationItem 
                title="Terus Tingkatkan Poin Kualitas Promosi Anda"
                content=":Poin Kualitas Promosi (PQP) Anda di bawah 4. Untuk meningkatkan PQP Anda, sebaiknya promosikan toko dengan Rating Toko dan Rating Produk minimal masing-masing 4,5 dan 4,7."
                time="2 bln"
              />
              
              <NotificationItem 
                title="Terus Tingkatkan Poin Kualitas Promosi Anda"
                content=":Poin Kualitas Promosi (PQP) Anda di bawah 4. Untuk meningkatkan PQP Anda, sebaiknya promosikan toko dengan Rating Toko dan Rating Produk minimal masing-masing 4,5 dan 4,7."
                time="2 bln"
              />

               <NotificationItem 
                title="Terus Tingkatkan Poin Kualitas Promosi Anda"
                content=":Poin Kualitas Promosi (PQP) Anda di bawah 4. Untuk meningkatkan PQP Anda, sebaiknya promosikan toko dengan Rating Toko dan Rating Produk minimal masing-masing 4,5 dan 4,7."
                time="2 bln"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ title, content, time, isNew }: { title: string, content: string, time: string, isNew?: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
          <Megaphone size={20} className="text-black" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-sm leading-tight mb-1 pr-2">{title}</h3>
          {isNew && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          )}
        </div>
        
        <p className="text-sm text-gray-600 leading-relaxed mb-1 line-clamp-4">
          {content}
        </p>
        
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </div>
  );
}
