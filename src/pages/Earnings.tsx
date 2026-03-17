import { 
  ArrowLeft, 
  ChevronRight, 
  ShoppingBag, 
  Info,
  Flame,
  CreditCard,
  X,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '../context/DataContext';

export default function Earnings() {
  const { balance } = useData();
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      {/* Header */}
      <header className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 py-3">
        <Link to="/affiliate-center" className="p-1 -ml-1">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-medium">Penghasilan</h1>
        <Link to="/manage-methods" className="p-1 -mr-1">
          <CreditCard size={24} />
        </Link>
      </header>

      {/* Info Banner */}
      {showBanner && (
        <div className="bg-[#f2f2f2] px-4 py-3 text-[13px] text-gray-500 leading-relaxed relative flex items-start gap-2">
          <p className="flex-1">
            Karena hari libur pada 2026-03-18 - 2026-03-25, pemrosesan bayaran mungkin akan mengalami penundaan. Pembayaran yang berjalan akan diproses dalam 3 hari kerja ...
          </p>
          <button onClick={() => setShowBanner(false)} className="p-1 -mr-1 -mt-1 text-gray-400">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="bg-white px-4 pt-4 pb-6">
        {/* Balance Card */}
        <div className="bg-black rounded-2xl p-6 relative overflow-hidden mb-6">
          {/* Decorative background shapes */}
          <div className="absolute -right-8 -bottom-16 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute right-4 -bottom-8 text-[120px] font-black text-white/5 leading-none select-none">
            CA
          </div>
          
          <div className="relative z-10">
            <h2 className="text-gray-400 text-sm mb-2">Saldo tersedia</h2>
            <Link to="/earnings-history" className="flex items-center gap-1 mb-6">
              <span className="text-4xl font-bold text-white">Rp{balance.toLocaleString('id-ID')}</span>
              <ChevronRight size={20} className="text-white mt-1" />
            </Link>

            <Link to="/withdraw" className="inline-block bg-[#ff0050] text-white font-medium px-8 py-2 rounded-md text-sm">
              Tarik
            </Link>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/affiliate-orders" className="flex flex-col items-center justify-center gap-2 py-2">
            <div className="relative">
              <ShoppingBag size={28} strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center mt-1">
                <Star size={10} className="fill-black text-black" />
              </div>
            </div>
            <span className="text-xs text-gray-800">Pesanan afiliasi</span>
          </Link>
          
          <Link to="/affiliate-commission-rules" className="flex flex-col items-center justify-center gap-2 py-2">
            <Info size={28} strokeWidth={1.5} />
            <span className="text-xs text-gray-800">Aturan komisi afiliasi</span>
          </Link>
        </div>
      </div>

      {/* Tingkatkan penghasilan Anda Section */}
      <div className="mt-2 bg-white px-4 py-4">
        <h2 className="text-base font-medium mb-4">Tingkatkan penghasilan Anda</h2>
        
        <div className="flex items-start gap-3">
          <div className="bg-[#ff3b5c] rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
            <Flame size={28} className="text-white fill-white" />
          </div>
          <div className="flex-1 pt-1">
            <h3 className="text-[15px] font-medium text-gray-900 mb-1">Promosikan untuk meningkatkan p...</h3>
            <p className="text-[13px] text-gray-500 mb-2 leading-snug">
              Lebih dari 5 juta kreator afiliasi telah memperoleh komisi ekstra m...
            </p>
            <div className="flex gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded text-[11px] text-gray-600">Pilihan populer</span>
              <span className="bg-gray-100 px-2 py-1 rounded text-[11px] text-gray-600">Disarankan</span>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-400 mt-4" />
        </div>
      </div>
    </div>
  );
}
