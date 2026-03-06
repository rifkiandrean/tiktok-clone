import { 
  ArrowLeft, 
  Bell, 
  ChevronRight, 
  Store, 
  ShoppingBag, 
  Wallet, 
  Megaphone,
  PlaySquare,
  Siren,
  Smartphone,
  Camera,
  Shirt,
  Video,
  Moon,
  Star,
  Ticket,
  Home,
  Flame,
  Watch,
  Play
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import PullToRefresh from '../components/PullToRefresh';
import { useData } from '../context/DataContext';

export default function AffiliateCenter() {
  const [filter, setFilter] = useState<'today' | 'week'>('week');
  const { transactions } = useData();

  const handleRefresh = async () => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const stats = useMemo(() => {
    const now = new Date();
    // Reset time to midnight for accurate date comparison if needed, 
    // but we are using string comparison YYYY-MM-DD which is safer for "days"
    const todayStr = now.toISOString().split('T')[0];
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);
    const oneWeekAgoStr = oneWeekAgo.toISOString().split('T')[0];

    let filteredTxs = transactions;

    if (filter === 'today') {
      filteredTxs = transactions.filter(t => t.date === todayStr);
    } else {
      // 'week' - last 7 days
      filteredTxs = transactions.filter(t => t.date >= oneWeekAgoStr && t.date <= todayStr);
    }

    const totalCommission = filteredTxs.reduce((sum, t) => sum + t.amount, 0);
    const totalItems = filteredTxs.reduce((sum, t) => sum + t.items, 0);
    
    // Estimate GMV as Commission / 5% (0.05) - just an assumption since we don't have real GMV
    // Or we can say Commission is roughly 10%? Let's use a multiplier that makes sense.
    // In the seed data: items * earningsPerItem. 
    // If earningsPerItem is ~1000, and price is ~20000, that's 5%.
    const estimatedGMV = totalCommission * 20; 

    return {
      gmv: estimatedGMV,
      items: totalItems,
      commission: totalCommission
    };
  }, [transactions, filter]);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
       return (amount / 1000000000).toLocaleString('id-ID', { maximumFractionDigits: 2 }) + 'M';
    }
    if (amount >= 1000000) {
      return (amount / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 2 }) + 'jt';
    }
    return 'Rp' + amount.toLocaleString('id-ID');
  };

  return (
    <>
      <div className="min-h-screen bg-white font-sans pb-24">
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
                {formatCurrency(stats.gmv)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                Produk terj... <ChevronRight size={12} />
              </div>
              <div className="text-xl font-bold">
                {stats.items.toLocaleString('id-ID')}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                Perkiraan k... <ChevronRight size={12} />
              </div>
              <div className="text-xl font-bold">
                {formatCurrency(stats.commission)}
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
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3">Promo besar bulan ini</h2>
            <div className="bg-gradient-to-r from-green-900 to-green-700 rounded-xl p-5 text-white relative overflow-hidden min-h-[180px] flex flex-col justify-center">
              {/* Top Label */}
              <div className="absolute top-4 left-5 z-10">
                 <div className="text-[10px] font-medium opacity-90 leading-none">TikTok Shop</div>
                 <div className="text-[8px] opacity-75 leading-none mt-0.5">by tokopedia</div>
              </div>

              <div className="z-10 relative max-w-[65%] mt-6">
                 <h3 className="font-bold text-lg leading-tight mb-2">
                   Perluas jangkauan di bulan Ramadan ini dengan fitur Promosi!
                 </h3>
                 <p className="text-[10px] opacity-90 mb-4 leading-relaxed">
                   Dapatkan kupon terbatas hingga Rp5.834.000, Gunakan fitur Promosi untuk memaksimalkan kinerja konten dan mengembangkan komunitas Anda selama Ramadan ini.
                 </p>
                 <button className="bg-pink-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                   Promosi sekarang
                 </button>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-100">
                 <Moon size={110} className="text-yellow-400 fill-yellow-400 drop-shadow-lg" />
              </div>
              <div className="absolute right-24 top-8">
                 <Star size={14} className="text-yellow-200 fill-yellow-200 animate-pulse" />
              </div>
              <div className="absolute right-10 bottom-10">
                 <Star size={18} className="text-yellow-200 fill-yellow-200 animate-pulse delay-75" />
              </div>
               <div className="absolute right-6 top-6">
                 <Star size={10} className="text-yellow-200 fill-yellow-200 animate-pulse delay-150" />
              </div>
            </div>
          </div>

          {/* Creator Opportunities */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3">Peluang kreator</h2>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              
              {/* Item 1 */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Siren size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Hadiah THR Hampir Hangus!</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 bg-pink-50 px-1.5 py-0.5 rounded text-[10px] text-pink-600 font-medium">
                        <span className="w-3 h-3 bg-pink-200 rounded-full flex items-center justify-center text-[8px]">$</span>
                        Daftar & raih THR!
                      </div>
                      <div className="flex items-center gap-1 bg-red-50 px-1.5 py-0.5 rounded text-[10px] text-red-600 font-medium">
                        <Ticket size={10} />
                        Umroh
                      </div>
                      <div className="flex items-center gap-1 bg-red-50 px-1.5 py-0.5 rounded text-[10px] text-red-600 font-medium">
                        <Smartphone size={10} />
                        iPhone
                      </div>
                    </div>
                  </div>
                </div>
                <button className="bg-gray-100 text-black text-xs font-bold px-4 py-1.5 rounded-full">
                  Ikuti
                </button>
              </div>

              {/* Item 2 */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shirt size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Fashion Week: 600JT Cash!</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] text-gray-600 font-medium">
                        <span className="text-xs">🎉</span>
                        Selesaikan tugasmu!
                      </div>
                    </div>
                  </div>
                </div>
                <button className="bg-gray-100 text-black text-xs font-bold px-4 py-1.5 rounded-full">
                  Klaim
                </button>
              </div>

            </div>
          </div>

          {/* New: Fashion Komisi */}
          <div className="border border-gray-200 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-base mb-3">Fashion Komisi +10% & iPhone</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Flame size={20} className="text-red-600 fill-red-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Ekstra Komisi+Vouc...</div>
                  <div className="flex gap-1 mt-1">
                    <span className="bg-pink-50 text-pink-600 text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Smartphone size={10} /> iP...
                    </span>
                    <span className="bg-pink-50 text-pink-600 text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Watch size={10} /> Apple Wa...
                    </span>
                  </div>
                </div>
              </div>
              <button className="bg-gray-100 text-black text-xs font-bold px-6 py-1.5 rounded-full">
                Ikuti
              </button>
            </div>
          </div>

          {/* New: Belajar dari para kreator */}
          <div className="border border-gray-200 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-base mb-3">Belajar dari para kreator</h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
                  <img src={`https://picsum.photos/seed/food${i}/200/300`} className="w-full h-full object-cover" alt="Creator" />
                  <div className="absolute bottom-1 left-1 flex items-center gap-0.5 text-white text-[10px] font-medium drop-shadow-md">
                    <Play size={10} className="fill-white" /> {10 + i * 10}M
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Tonton kreator terbaik mem...</span>
              <button className="bg-gray-100 text-black text-xs font-bold px-6 py-1.5 rounded-full">
                Tonton
              </button>
            </div>
          </div>

          {/* New: Kinerja akun */}
          <div className="mb-24">
            <h2 className="text-lg font-bold mb-2">Kinerja akun</h2>
            <div className="flex items-center gap-1 text-sm mb-1">
              <span>Rating Kinerja Kreator:</span>
              <span className="text-green-600 font-medium flex items-center cursor-pointer">Baik <ChevronRight size={14} /></span>
            </div>
            <p className="text-xs text-gray-500">Kinerja akun Anda baik</p>
          </div>
        </div>

        {/* Floating Button */}
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20">
          <button className="bg-white text-black font-bold text-sm px-5 py-2.5 rounded-full shadow-lg border border-gray-200 flex items-center gap-2">
            <Video size={18} className="fill-black" />
            Buat sekarang
          </button>
        </div>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-16 py-2 pb-4 flex justify-between items-center z-30">
           <button className="flex flex-col items-center gap-1 text-pink-600">
             <Home size={24} className="fill-pink-600" />
             <span className="text-[10px] font-medium">Beranda</span>
           </button>
           <button className="flex flex-col items-center gap-1 text-gray-500">
             <PlaySquare size={24} />
             <span className="text-[10px] font-medium">Video</span>
           </button>
        </div>
      </div>
    </>
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
