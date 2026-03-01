import { 
  ArrowLeft, 
  ChevronRight, 
  ShoppingBag, 
  Info,
  Flame
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PullToRefresh from '../components/PullToRefresh';

export default function Earnings() {
  const handleRefresh = async () => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-white font-sans pb-10">
        {/* Header */}
        <header className="sticky top-0 bg-white z-10 flex items-center px-4 py-3">
          <Link to="/affiliate-center" className="p-1 -ml-1 mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold flex-1 text-center pr-8">Penghasilan</h1>
        </header>

        {/* Info Box */}
        <div className="bg-gray-50 px-4 py-3 text-xs text-gray-600 leading-relaxed border-b border-gray-100">
          Pengiriman bayaran ke Transfer bank Anda mungkin tertunda selama 1 hari karena pemeliharaan sistem rutin. Namun, kami dan mitra pembayaran kami akan berusaha untuk memproses dana Anda sesegera mungkin.
        </div>

        <div className="px-4 pt-8 pb-4 text-center">
          <h2 className="text-sm font-medium text-gray-900 mb-2">Saldo tersedia</h2>
          <Link to="/earnings-history" className="flex items-center justify-center gap-1 mb-6">
            <span className="text-4xl font-bold">Rp487.922.000</span>
            <ChevronRight size={24} strokeWidth={2.5} />
          </Link>

          <Link to="/withdraw" className="block w-full bg-pink-600 text-white font-bold py-3 rounded-md text-sm mb-8 hover:bg-pink-700 active:bg-pink-800 transition-colors">
            Tarik
          </Link>

          {/* List Items */}
          <div className="space-y-1">
            <Link to="/affiliate-orders" className="flex items-center justify-between py-4 border-b border-gray-50 hover:bg-gray-50 px-2 -mx-2 rounded">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} strokeWidth={2} />
                <span className="text-sm font-medium">Pesanan afiliasi</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            
            <Link to="/affiliate-commission-rules" className="flex items-center justify-between py-4 border-b border-gray-50 hover:bg-gray-50 px-2 -mx-2 rounded">
              <div className="flex items-center gap-3">
                <Info size={20} strokeWidth={2} />
                <span className="text-sm font-medium">Aturan komisi afiliasi</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
          </div>

          {/* Promo Card */}
          <div className="mt-8 bg-pink-50 rounded-lg p-4 flex items-start gap-3 text-left">
            <div className="bg-red-500 rounded-full p-1.5 flex-shrink-0 mt-0.5">
              <Flame size={16} className="text-white fill-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm mb-1">Promosikan untuk meningkatkan...</h3>
              <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                Lebih dari 5 juta kreator afiliasi telah memperoleh komisi ekstra menggunaka...
              </p>
              <div className="flex gap-2">
                <span className="bg-white px-2 py-1 rounded text-[10px] font-medium text-gray-600 border border-gray-200">Pilihan populer</span>
                <span className="bg-white px-2 py-1 rounded text-[10px] font-medium text-gray-600 border border-gray-200">Disarankan</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-400 mt-1" />
          </div>
        </div>
      </div>
    </PullToRefresh>
  );
}
