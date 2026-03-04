import { 
  Search, 
  Camera, 
  ShoppingCart, 
  FileText, 
  Ticket, 
  Gift, 
  MessageCircle, 
  MapPin, 
  Wallet, 
  Truck, 
  Zap, 
  Video, 
  ShoppingBag,
  Play,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import PullToRefresh from '../components/PullToRefresh';

import { Link } from 'react-router-dom';

export default function Shop() {
  const [showFloating, setShowFloating] = useState(true);

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <>
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
          {/* Header */}
          <header className="sticky top-0 bg-white z-20 px-4 py-3 flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="barang 0 rp" 
                className="w-full bg-white border border-red-500 rounded-md py-2 pl-10 pr-16 text-sm focus:outline-none"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Camera size={20} className="text-gray-500" />
                <span className="text-red-500 font-medium text-sm border-l border-gray-200 pl-2">Cari</span>
              </div>
            </div>
            <div className="relative">
              <ShoppingCart size={26} className="text-black" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full border-2 border-white">31</span>
            </div>
          </header>

          {/* Quick Links */}
          <div className="bg-white px-4 pb-4 pt-2">
            <div className="flex justify-between items-start text-center">
              <Link to="/shop/orders" className="flex flex-col items-center gap-1 w-1/6">
                <div className="relative text-gray-700">
                  <FileText size={20} />
                </div>
                <span className="text-[10px] text-gray-600 leading-tight">Pesanan</span>
              </Link>
              <QuickLink icon={<Ticket size={20} />} label="Voucher" />
              <QuickLink icon={<Gift size={20} />} label="Bonus" badge />
              <QuickLink icon={<MessageCircle size={20} />} label="Pesan" />
              <QuickLink icon={<MapPin size={20} />} label="Beli Lokal" />
              <QuickLink icon={<Wallet size={20} />} label="PayLater" />
            </div>
          </div>

          {/* Banners */}
          <div className="bg-white pl-4 pb-4 overflow-x-auto no-scrollbar flex gap-3">
            <div className="w-[85vw] h-40 bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-lg relative flex-shrink-0 overflow-hidden text-white p-4">
              <div className="absolute top-0 right-0 p-2">
                <div className="text-[10px] bg-yellow-400 text-black px-1 rounded">AD</div>
              </div>
              <h3 className="text-xl font-serif italic mb-1">PALOMINO</h3>
              <div className="bg-red-600 text-white font-bold text-lg inline-block px-2 py-1 transform -skew-x-12 mb-2">
                s.d. 75%
              </div>
              <img src="https://picsum.photos/seed/bag1/200/200" className="absolute bottom-2 right-20 w-24 h-24 object-contain transform rotate-12" alt="Bag" />
              <img src="https://picsum.photos/seed/bag2/200/200" className="absolute bottom-4 right-4 w-20 h-20 object-contain transform -rotate-6" alt="Bag" />
            </div>
            <div className="w-[85vw] h-40 bg-slate-900 rounded-lg relative flex-shrink-0 overflow-hidden p-4">
              <div className="text-white">
                <div className="text-xs mb-1 opacity-80">TikTok Shop</div>
                <div className="text-yellow-400 font-bold text-xl leading-tight">ramadan<br/>EKSTRA SERU</div>
                <div className="mt-2 bg-red-600 text-white font-bold px-3 py-1 inline-block rounded-sm">Buy 1 Get 1</div>
              </div>
            </div>
          </div>

          {/* Circle Menu */}
          <div className="bg-white px-4 pb-6">
            <div className="flex justify-between text-center">
              <CircleMenuItem icon={<Truck size={20} className="text-cyan-500" />} label="Voucher Ongkir" bg="bg-cyan-50" />
              <CircleMenuItem icon={<Zap size={20} className="text-orange-500" />} label="Flash Sale" bg="bg-orange-50" />
              <CircleMenuItem icon={<Gift size={20} className="text-green-600" />} label="Gift Mania" bg="bg-green-50" />
              <CircleMenuItem icon={<Video size={20} className="text-pink-500" />} label="Belanja LIVE" bg="bg-pink-50" />
              <CircleMenuItem icon={<ShoppingBag size={20} className="text-black" />} label="TikTok Shop Mall" bg="bg-gray-100" />
            </div>
          </div>

          {/* Flash Sale & Pasti Promo */}
          <div className="flex gap-2 px-2 pb-4 overflow-x-auto no-scrollbar">
            {/* Flash Sale Card */}
            <div className="bg-white rounded-lg p-3 min-w-[160px] flex-1">
              <div className="flex items-center gap-1 mb-2">
                <Zap size={14} className="fill-red-500 text-red-500" />
                <span className="font-bold text-sm">Flash Sale</span>
                <div className="flex gap-0.5 text-[10px] font-mono text-white">
                  <span className="bg-black px-1 rounded-[2px]">00</span>:
                  <span className="bg-black px-1 rounded-[2px]">29</span>:
                  <span className="bg-black px-1 rounded-[2px]">36</span>
                </div>
              </div>
              <div className="flex gap-2">
                <ProductThumb img="https://picsum.photos/seed/watch/100/100" price="Rp11.450" discount="18%" />
                <ProductThumb img="https://picsum.photos/seed/oil/100/100" price="Rp9.700" discount="74%" />
              </div>
            </div>

            {/* Pasti Promo Card */}
            <div className="bg-white rounded-lg p-3 min-w-[160px] flex-1">
              <div className="flex items-center gap-1 mb-2">
                <span className="font-bold text-sm">Pasti Promo</span>
              </div>
              <div className="flex gap-2">
                <ProductThumb img="https://picsum.photos/seed/watch2/100/100" price="Rp292.440" />
                <ProductThumb img="https://picsum.photos/seed/watch3/100/100" price="Rp113.350" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="sticky top-[60px] bg-gray-50 z-10 px-2 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
            <button className="px-4 py-1.5 bg-white rounded-full text-sm font-bold border-b-2 border-black">Semua</button>
            <button className="px-4 py-1.5 bg-white rounded-full text-sm font-medium text-green-600">ramadan EKSTRA SERU</button>
            <button className="px-4 py-1.5 bg-white rounded-full text-sm font-medium flex items-center gap-1">
              Mall <span className="bg-black text-white text-[8px] px-1 rounded">Baru</span>
            </button>
            <button className="px-4 py-1.5 bg-white rounded-full text-sm font-medium text-blue-600">Bunga 0% PayLater</button>
          </div>

          {/* Feed */}
          <div className="px-2 grid grid-cols-2 gap-2">
            {/* Video Item */}
            <div className="bg-white rounded-lg overflow-hidden relative h-64">
              <img src="https://picsum.photos/seed/road/300/500" className="w-full h-full object-cover" alt="Video" />
              <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="w-0.5 h-2 bg-white animate-pulse"></span> 00:06
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-xs line-clamp-2">Suasana jalan tol hari ini lancar jaya...</p>
              </div>
            </div>

            {/* Product Item */}
            <div className="bg-white rounded-lg overflow-hidden pb-2">
              <div className="relative">
                <img src="https://picsum.photos/seed/spray/300/300" className="w-full aspect-square object-cover" alt="Product" />
                <div className="absolute bottom-0 left-0 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded-tr">
                  XTRA Gratis Ongkir
                </div>
              </div>
              <div className="p-2">
                <h3 className="text-xs font-medium line-clamp-2 mb-1">MOOD BOOSTING Deodorant Spray Penghilang Bau Badan</h3>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs border border-red-500 text-red-500 px-0.5 rounded-[2px]">Diskon</span>
                  <span className="text-[10px] text-gray-400 line-through">Rp50.000</span>
                </div>
                <div className="text-sm font-bold text-red-600">Rp15.900</div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center text-[8px] text-white">✓</div>
                  <span className="text-[10px] text-gray-500">BADAN POM</span>
                </div>
                <div className="mt-1 text-[10px] text-gray-500">10rb+ terjual</div>
              </div>
            </div>

             {/* More Dummy Items */}
             {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden pb-2">
                <div className="relative">
                  <img src={`https://picsum.photos/seed/prod${i}/300/300`} className="w-full aspect-square object-cover" alt="Product" />
                  {i % 2 === 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      -50%
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <h3 className="text-xs font-medium line-clamp-2 mb-1">Produk Viral {i} - Kualitas Terbaik Harga Murah</h3>
                  <div className="text-sm font-bold text-black">Rp{((i * 15000) + 2500).toLocaleString('id-ID')}</div>
                  <div className="mt-1 text-[10px] text-gray-500">{i * 123} terjual</div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Widget */}
          {showFloating && (
            <div className="fixed bottom-20 right-4 z-30 animate-bounce-slow">
              <div className="relative">
                <button onClick={() => setShowFloating(false)} className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-0.5 z-10">
                  <X size={12} />
                </button>
                <div className="bg-gradient-to-b from-pink-500 to-red-600 text-white rounded-lg p-2 shadow-lg flex flex-col items-center w-20">
                  <Gift size={24} className="mb-1 animate-wiggle" />
                  <span className="text-[10px] font-bold">Voucher</span>
                  <span className="text-xs font-extrabold">Rp2jt+</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-red-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-red-100 whitespace-nowrap">
                  Gift Mania
                </div>
              </div>
            </div>
          )}
        </div>
      </PullToRefresh>
      <BottomNav />
    </>
  );
}

function QuickLink({ icon, label, badge }: { icon: React.ReactNode, label: string, badge?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1 w-1/6">
      <div className="relative text-gray-700">
        {icon}
        {badge && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>}
      </div>
      <span className="text-[10px] text-gray-600 leading-tight">{label}</span>
    </div>
  );
}

function CircleMenuItem({ icon, label, bg }: { icon: React.ReactNode, label: string, bg: string }) {
  return (
    <div className="flex flex-col items-center gap-2 w-1/5">
      <div className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center`}>
        {icon}
      </div>
      <span className="text-[10px] text-gray-700 font-medium leading-tight px-1">{label}</span>
    </div>
  );
}

function ProductThumb({ img, price, discount }: { img: string, price: string, discount?: string }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="relative rounded-md overflow-hidden mb-1">
        <img src={img} className="w-full aspect-square object-cover" alt="Product" />
        {discount && (
          <div className="absolute bottom-0 left-0 bg-red-600 text-white text-[8px] font-bold px-1 rounded-tr-sm">
            {discount}
          </div>
        )}
      </div>
      <div className="text-xs font-bold truncate">{price}</div>
      <div className="w-full h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
        <div className="h-full bg-red-500 w-2/3"></div>
      </div>
    </div>
  );
}
