import { 
  ArrowLeft, 
  Bell, 
  ChevronRight, 
  Store, 
  ShoppingBag, 
  Wallet, 
  Megaphone,
  PlaySquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PullToRefresh from '../components/PullToRefresh';

export default function AffiliateCenter() {
  const [filter, setFilter] = useState<'today' | 'week'>('week');

  const handleRefresh = async () => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 2 }) + 'jt';
    }
    return 'Rp' + amount.toLocaleString('id-ID');
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-white font-sans pb-10">
        {/* Header */}
        <header className="sticky top-0 bg-white z-10 flex justify-between items-center px-4 py-3">
          <Link to="/profile" className="p-1 -ml-1">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/notifications" className="relative">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full min-w-[16px] text-center">15</span>
            </Link>
            <MenuIcon />
          </div>
        </header>

        <div className="px-4 pb-4">
          <h1 className="text-2xl font-bold mb-4">Affiliate Center</h1>

          {/* Date Filter */}
          <div className="flex gap-2 mb-6">
            <button 
              onClick={() => setFilter('today')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                filter === 'today' 
                  ? 'bg-white border border-gray-200 shadow-sm text-black' 
                  : 'bg-gray-100 text-gray-500 border border-transparent'
              }`}
            >
              Hari ini
            </button>
            <button 
              onClick={() => setFilter('week')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                filter === 'week' 
                  ? 'bg-white border border-gray-200 shadow-sm text-black' 
                  : 'bg-gray-100 text-gray-500 border border-transparent'
              }`}
            >
              7 hari terakhir
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                GMV Teratr... <ChevronRight size={12} />
              </div>
              <div className="text-xl font-bold">
                {filter === 'today' ? formatCurrency(2000000) : formatCurrency(2450000)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                Produk terj... <ChevronRight size={12} />
              </div>
              <div className="text-xl font-bold">
                {filter === 'today' ? '5.390' : '12.878'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                Perkiraan k... <ChevronRight size={12} />
              </div>
              <div className="text-xl font-bold">
                {filter === 'today' ? formatCurrency(5390 * 500) : formatCurrency(12878 * 500)}
              </div>
            </div>
          </div>

          {/* Banner 1 */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="pr-4">
              <h3 className="font-bold text-base mb-1">Jaring banyak pemirsa dan raup penghasilan</h3>
            </div>
            <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
          </div>

          {/* Toolkit Section */}
          <div className="mb-6">
            <Link to="/toolkit" className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Toolkit TikTok Shop</h2>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>

            <div className="grid grid-cols-4 gap-2">
              <Link to="/shop" className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                  <Store size={24} strokeWidth={1.5} />
                </div>
                <span className="text-xs text-center font-medium">Toko Anda</span>
              </Link>
              
              <Link to="/manage-products" className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                  <ShoppingBag size={24} strokeWidth={1.5} />
                </div>
                <span className="text-xs text-center font-medium">Kelola produk</span>
              </Link>

              <Link to="/earnings" className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                  <Wallet size={24} strokeWidth={1.5} />
                </div>
                <span className="text-xs text-center font-medium">Penghasilan</span>
              </Link>

              <Link to="/promote" className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                  <Megaphone size={24} strokeWidth={1.5} />
                </div>
                <span className="text-xs text-center font-medium">Promosikan</span>
              </Link>
            </div>
          </div>

          {/* Promo Banner */}
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-3">Promo besar bulan ini</h2>
            <div className="bg-gradient-to-r from-yellow-900 to-yellow-700 rounded-xl p-4 text-white relative overflow-hidden h-32 flex items-center">
              <div className="z-10 relative flex items-center gap-2">
                 <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                   <PlaySquare size={20} className="text-white" />
                 </div>
                 <span className="font-bold text-sm">Buat sekarang</span>
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] text-yellow-200 font-medium bg-black/30 px-2 py-0.5 rounded">
                Mau Tahu Caranya Dapetin
              </div>
              {/* Decorative lanterns/elements */}
              <div className="absolute right-4 top-0 text-yellow-500 opacity-50">
                 <div className="w-8 h-16 border border-yellow-500 rounded-b-full mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PullToRefresh>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  )
}
