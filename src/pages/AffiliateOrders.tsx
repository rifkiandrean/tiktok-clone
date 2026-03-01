import { 
  ArrowLeft, 
  Search, 
  Download, 
  SlidersHorizontal, 
  ChevronDown, 
  Copy, 
  PlayCircle, 
  HelpCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PullToRefresh from '../components/PullToRefresh';

export default function AffiliateOrders() {
  const handleRefresh = async () => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-gray-50 font-sans pb-10">
        {/* Header */}
        <header className="sticky top-0 bg-white z-20 border-b border-gray-100">
          <div className="flex items-center justify-between px-4 py-3">
            <Link to="/earnings" className="p-1 -ml-1">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-lg font-bold">Pesanan afiliasi</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={24} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </div>
              <div className="relative">
                <Download size={24} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex text-sm font-medium border-b border-gray-200">
            <button className="flex-1 py-3 text-black border-b-2 border-black relative">
              Semua
            </button>
            <button className="flex-1 py-3 text-gray-500">
              Afiliasi
            </button>
            <button className="flex-1 py-3 text-gray-500">
              Iklan Toko
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white px-4 py-3 flex gap-2 items-center border-b border-gray-100">
          <button className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded text-sm font-medium">
            <SlidersHorizontal size={14} />
            <span>(1)</span>
          </button>
          <button className="flex-1 flex items-center justify-between bg-gray-100 px-3 py-1.5 rounded text-sm font-medium text-gray-700">
            <span className="truncate">2 Desember 2025 - 1 Maret 2026</span>
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Order List */}
        <div className="flex flex-col gap-2 mt-2">
          {/* Order Item 1 - Completed */}
          <OrderItem 
            id="581876960151504885"
            status="Selesai"
            statusColor="bg-black text-white"
            productName="FYC Yessica's Tea Tree & Strawb..."
            price="Rp24.500"
            quantity={1}
            videoTitle="Memang salah pasang harga kalo segini mah. Ma..."
            commissionPercent="3%"
            estCommission="Rp735"
            estBase="Rp24.500"
            actualCommission="Rp735"
            actualBase="Rp24.500"
          />

          {/* Order Item 2 - Not Eligible */}
          <OrderItem 
            id="581858686429267955"
            status="Tidak memenuhi s..."
            statusColor="bg-gray-100 text-gray-500"
            productName="FYC Yessica's Tea Tree & Strawb..."
            price="Rp24.470"
            quantity={1}
            videoTitle="Memang salah pasang harga kalo segini mah. Ma..."
            commissionPercent="3%"
            estCommission="Rp734"
            estBase="Rp24.470"
            actualCommission="Rp0"
            actualBase="Rp0"
          />
        </div>
      </div>
    </PullToRefresh>
  );
}

function OrderItem({ 
  id, 
  status, 
  statusColor, 
  productName, 
  price, 
  quantity, 
  videoTitle, 
  commissionPercent,
  estCommission,
  estBase,
  actualCommission,
  actualBase
}: any) {
  return (
    <div className="bg-white p-4">
      {/* Header: ID & Status */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span>ID Pesanan:{id}</span>
          <Copy size={12} className="text-gray-400" />
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded ${statusColor}`}>
          {status}
        </span>
      </div>

      {/* Product Info */}
      <div className="flex gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
          <img src="https://picsum.photos/seed/skincare/100/100" alt="Product" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold truncate pr-2">{productName}</h3>
            <span className="text-sm font-semibold whitespace-nowrap">{price} x {quantity}</span>
          </div>
          <div className="mt-1">
            <span className="bg-gray-100 text-[10px] px-1.5 py-0.5 rounded text-gray-600 font-medium">Video</span>
          </div>
        </div>
      </div>

      {/* Source Link */}
      <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
        <PlayCircle size={14} className="fill-gray-500 text-white" />
        <span className="truncate flex-1">{videoTitle}</span>
        <Copy size={12} className="text-gray-400" />
      </div>

      {/* Commission Box */}
      <div className="bg-gray-50 rounded-lg p-3 mb-3">
        <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
          <span>Total persentase komisi: {commissionPercent}</span>
          <HelpCircle size={12} />
        </div>
        
        <div className="flex">
          <div className="flex-1 border-r border-gray-200 pr-2">
            <div className="text-sm font-bold">{estCommission}</div>
            <div className="text-[10px] text-gray-500 mb-0.5">Est. komisi</div>
            <div className="text-[10px] text-gray-400">Est. acuan komisi:{estBase}</div>
          </div>
          <div className="flex-1 pl-4">
            <div className="text-sm font-bold">{actualCommission}</div>
            <div className="text-[10px] text-gray-500 mb-0.5">Komisi aktual</div>
            <div className="text-[10px] text-gray-400">Acuan komisi:{actualBase}</div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-white border border-gray-200 text-sm font-semibold py-2.5 rounded hover:bg-gray-50">
        Lihat detail
      </button>
    </div>
  );
}
