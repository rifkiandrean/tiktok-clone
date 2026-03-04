import { 
  ArrowLeft, 
  Search, 
  Menu, 
  ShoppingBag, 
  ChevronRight, 
  Truck, 
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PullToRefresh from '../components/PullToRefresh';

export default function ShopOrders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Semua');

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const tabs = ['Semua', 'Perlu dibayar', 'Untuk dikirim', 'Akan diterima', 'Ulasan'];

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-gray-50 font-sans pb-10">
        {/* Header */}
        <header className="sticky top-0 bg-white z-20">
          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => navigate(-1)} className="p-1 -ml-1">
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari pesanan Anda" 
                className="w-full bg-gray-100 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none"
              />
            </div>
            <Menu size={24} />
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium whitespace-nowrap relative ${
                  activeTab === tab ? 'text-black' : 'text-gray-500'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black mx-4"></div>
                )}
              </button>
            ))}
          </div>
        </header>

        {/* Returns Banner */}
        <div className="bg-red-50 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={16} className="text-black" />
            <span className="text-sm text-red-600 font-medium">Pengembalian barang gratis yang praktis</span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>

        {/* Promo Banner */}
        <div className="px-4 py-3">
          <div className="w-full h-24 bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-lg relative overflow-hidden text-white p-4">
            <div className="absolute top-0 right-0 p-2">
              <div className="text-[10px] bg-yellow-400 text-black px-1 rounded">AD</div>
            </div>
            <h3 className="text-lg font-serif italic mb-1">PALOMINO</h3>
            <div className="bg-red-600 text-white font-bold text-sm inline-block px-2 py-1 transform -skew-x-12">
              Diskon s.d. 75%
            </div>
            <img src="https://picsum.photos/seed/bag1/200/200" className="absolute bottom-2 right-20 w-16 h-16 object-contain transform rotate-12" alt="Bag" />
            <img src="https://picsum.photos/seed/bag2/200/200" className="absolute bottom-4 right-4 w-14 h-14 object-contain transform -rotate-6" alt="Bag" />
          </div>
        </div>

        {/* Order List */}
        <div className="flex flex-col gap-2 px-2">
          {/* Order 1 - Cancelled */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1">
                <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-1 py-0.5 rounded">Power Shop</span>
                <span className="font-semibold text-sm">Bintang Aki</span>
                <ChevronRight size={14} className="text-gray-400" />
              </div>
              <span className="text-sm text-gray-500">Pesanan dibatalkan</span>
            </div>

            <div className="flex gap-3 mb-3">
              <img src="https://picsum.photos/seed/battery/100/100" className="w-16 h-16 object-cover rounded" alt="Product" />
              <div className="flex-1">
                <h3 className="text-sm line-clamp-1">Aki ALKALINE GTZ5S SUPER Aki ...</h3>
                <p className="text-xs text-gray-500 mt-1">Default</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">x1</span>
                  <span className="text-sm">Rp140.000</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-1 mb-4">
              <span className="text-xs text-gray-500">Total:</span>
              <span className="text-sm font-bold">Rp130.000</span>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="relative bg-gray-800 text-white text-xs py-1.5 px-3 rounded flex items-center gap-2">
                <span>149 pembeli membeli lagi</span>
                <button className="hover:text-gray-300"><X size={12} /></button>
                <div className="absolute -bottom-1 right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
              </div>
              <button className="bg-red-600 text-white text-sm font-bold py-2 px-6 rounded">
                Beli lagi
              </button>
            </div>
          </div>

          {/* Order 2 - Completed */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1">
                <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-1 py-0.5 rounded">Power Shop</span>
                <span className="font-semibold text-sm">BuanaMartIn...</span>
                <ChevronRight size={14} className="text-gray-400" />
              </div>
              <span className="text-sm text-gray-500">Pesanan selesai</span>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-gray-500" />
                <div>
                  <div className="text-sm font-bold text-green-600">13 Feb Diterima</div>
                  <div className="text-xs text-gray-500">Paket Anda telah terkirim.</div>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>

            <div className="flex gap-3 mb-3">
              <img src="https://picsum.photos/seed/door/100/100" className="w-16 h-16 object-cover rounded" alt="Product" />
              <div className="flex-1">
                <h3 className="text-sm line-clamp-1">Tarikan Pintu SLOT PVC GNP | Ku...</h3>
                <p className="text-xs text-gray-500 mt-1">Default</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">x1</span>
                  <span className="text-sm font-bold">Rp9.250</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PullToRefresh>
  );
}
