import { 
  ArrowLeft, 
  ShoppingBag, 
  Link as LinkIcon, 
  ChevronRight, 
  Info, 
  Flame,
  Play,
  CheckCircle2,
  ChevronDown,
  ArrowUpCircle,
  Ticket,
  User,
  FileText,
  Video as VideoIcon,
  Wallet,
  Clock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PullToRefresh from '../components/PullToRefresh';

export default function Promote() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'create' | 'dashboard' | 'mine'>('create');

  const handleRefresh = async () => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <>
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-gray-50 font-sans pb-24">
        {/* Header */}
        <header className="sticky top-0 bg-white z-20 border-b border-gray-100">
          <div className="flex items-center px-4 py-3 relative">
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 absolute left-4">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold w-full text-center">Promosi</h1>
          </div>

          {/* Tabs */}
          <div className="flex text-sm font-medium">
            <button 
              onClick={() => setActiveTab('create')}
              className={`flex-1 py-3 relative ${activeTab === 'create' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            >
              Buat
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 py-3 relative ${activeTab === 'dashboard' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            >
              Dasbor
            </button>
            <button 
              onClick={() => setActiveTab('mine')}
              className={`flex-1 py-3 relative ${activeTab === 'mine' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            >
              Milik Saya
              <span className="absolute top-3 right-4 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {activeTab === 'create' && <CreateTabContent />}
        {activeTab === 'dashboard' && <DashboardTabContent />}
        {activeTab === 'mine' && <MineTabContent />}
      </div>
    </PullToRefresh>
    {activeTab === 'create' && <CreateTabFooter />}
    </>
  );
}

function CreateTabContent() {
  const [selectedTarget, setSelectedTarget] = useState('sales');
  const [selectedGoal, setSelectedGoal] = useState('product_purchase');
  const [selectedAd, setSelectedAd] = useState(0);

  return (
    <>
      <div className="p-4 space-y-4">
        {/* Banner */}
        <div className="bg-gradient-to-r from-orange-100 via-yellow-50 to-white rounded-xl p-4 relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <h2 className="font-bold text-lg leading-tight mb-1">
              Ramadan Penuh Berkah<br />dari fitur Promosi TikTok
            </h2>
            <div className="flex items-center gap-1 text-xs text-gray-800">
              <Flame size={12} className="text-orange-500 fill-orange-500" />
              <span>Dapatkan kupon terbatas hingga Rp5.834.000</span>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-2 right-4 text-yellow-400">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
            </svg>
          </div>
          <div className="absolute top-1 left-1 text-yellow-300 opacity-50 text-xs">★</div>
          <div className="absolute bottom-2 right-12 text-yellow-300 opacity-50 text-xs">★</div>
        </div>

        {/* Target Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-1 mb-3">
            <h3 className="font-bold text-base">Pilih target Anda</h3>
            <Info size={14} className="text-gray-400" />
          </div>

          {/* Target Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
            <button className="px-3 py-1.5 rounded border border-pink-500 text-pink-500 bg-pink-50 text-xs font-medium whitespace-nowrap">
              Dapatkan penjualan
            </button>
            <button className="px-3 py-1.5 rounded border border-gray-200 text-gray-600 bg-white text-xs font-medium whitespace-nowrap">
              Tingkatkan akun
            </button>
            <button className="px-3 py-1.5 rounded border border-gray-200 text-gray-600 bg-white text-xs font-medium whitespace-nowrap">
              Tingkatkan LIVE
            </button>
          </div>

          {/* Radio Options */}
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-gray-500" />
                <span className="text-sm font-medium">Lebih banyak pembelian produk</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedGoal === 'product_purchase' ? 'border-pink-500' : 'border-gray-300'}`}>
                {selectedGoal === 'product_purchase' && <div className="w-2.5 h-2.5 bg-pink-500 rounded-full" />}
              </div>
              <input 
                type="radio" 
                name="goal" 
                className="hidden" 
                checked={selectedGoal === 'product_purchase'} 
                onChange={() => setSelectedGoal('product_purchase')} 
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <LinkIcon size={20} className="text-gray-500" />
                <span className="text-sm font-medium">Lebih banyak kunjungan situs web</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedGoal === 'website_visits' ? 'border-pink-500' : 'border-gray-300'}`}>
                {selectedGoal === 'website_visits' && <div className="w-2.5 h-2.5 bg-pink-500 rounded-full" />}
              </div>
              <input 
                type="radio" 
                name="goal" 
                className="hidden" 
                checked={selectedGoal === 'website_visits'} 
                onChange={() => setSelectedGoal('website_visits')} 
              />
            </label>
          </div>
        </div>

        {/* Ad Material Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-base">Pilih materi iklan</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>1 materi iklan</span>
              <ChevronRight size={14} />
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {[109, 169, 271, 50].map((views, index) => (
              <div 
                key={index} 
                className="relative flex-shrink-0 w-24 aspect-[3/4] rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedAd(index)}
              >
                <img 
                  src={`https://picsum.photos/seed/ad${index}/200/300`} 
                  alt="Ad Thumbnail" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                
                {/* Play Count */}
                <div className="absolute bottom-1 left-1 flex items-center gap-0.5 text-white text-[10px] drop-shadow-md">
                  <Play size={10} className="fill-white" />
                  <span>{views}</span>
                </div>

                {/* Selection Checkmark */}
                {selectedAd === index && (
                  <div className="absolute top-1 right-1 bg-pink-500 rounded-full text-white p-0.5">
                    <CheckCircle2 size={16} />
                  </div>
                )}
                {selectedAd !== index && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full border border-white bg-black/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Custom Promotion */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-bold text-base mb-1">Promosi kustom</h3>
          <p className="text-xs text-gray-500 mb-4">Hasil yang ditampilkan adalah perkiraan</p>
          
          <div className="bg-gray-50 rounded-lg p-4">
             <div className="text-2xl font-bold text-center">
               2 377 - 12 587
             </div>
             <div className="text-xs text-gray-400 text-center mt-1">
               Perkiraan tayangan video
             </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CreateTabFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex items-center justify-between z-20">
      <div className="flex items-center gap-1">
        <span className="font-bold text-lg">Total Rp96.011</span>
        <ChevronRight size={20} />
      </div>
      <button className="bg-pink-600 text-white font-bold px-8 py-3 rounded-md text-sm hover:bg-pink-700 active:bg-pink-800 transition-colors">
        Bayar
      </button>
    </div>
  );
}

function DashboardTabContent() {
  return (
    <div className="p-4 space-y-6">
      {/* Overview Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <h2 className="font-bold text-base">Ikhtisar hasil</h2>
            <Info size={14} className="text-gray-400" />
          </div>
          <Link to="/results-overview" className="flex items-center gap-1 text-xs text-gray-500">
            <span>Lihat lainnya</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center gap-1 text-sm font-medium">
            28 hari terakhir <ChevronDown size={16} />
          </button>
          <div className="flex bg-gray-100 rounded-lg p-0.5 text-xs font-medium">
            <button className="px-3 py-1 bg-white rounded shadow-sm">Video</button>
            <button className="px-3 py-1 text-gray-500">LIVE</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Biaya iklan" value="Rp0" subValue="Rp0" />
          <StatCard label="Tayangan video" value="0" subValue="0" />
          <StatCard label="Pengikut baru" value="0" subValue="0" />
          <StatCard label="Tayangan profil" value="0" subValue="0" />
        </div>
      </div>

      {/* Order History Section */}
      <div>
        <h2 className="font-bold text-base mb-4">Riwayat pesanan</h2>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
          {['Semua', 'Tertunda', 'Sedang Diperiksa', 'Aktif', 'Selesai'].map((tab, i) => (
            <button 
              key={i}
              className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap ${
                tab === 'Semua' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-white">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-sm">Selesai</span>
              <span className="text-xs text-gray-500">Lebih banyak pembelian produk, 04/07/2025</span>
            </div>
            
            <div className="flex gap-3">
              <div className="w-20 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0 relative">
                <img src="https://picsum.photos/seed/skincare/200/300" alt="Product" className="w-full h-full object-cover" />
                <div className="absolute top-1 right-1 bg-pink-500 text-white text-[8px] px-1 rounded">Diskon 50%</div>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div>
                    <div className="text-[10px] text-gray-500">Biaya iklan</div>
                    <div className="text-xs font-bold">Rp30 rb</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500">Tayangan video</div>
                    <div className="text-xs font-bold">3,17 rb</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500">Pembelian produk</div>
                    <div className="text-xs font-bold">3</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <VideoIcon size={12} />
                  <span>video Goods Produk</span>
                </div>
                <button className="bg-gray-100 text-xs font-medium px-3 py-1.5 rounded w-full">
                  Lihat perincian
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, subValue }: { label: string, value: string, subValue: string }) {
  return (
    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-lg font-bold mb-1">{value}</div>
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <ArrowUpCircle size={12} />
        <span>{subValue}</span>
      </div>
    </div>
  );
}

function MineTabContent() {
  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-[calc(100vh-120px)]">
      {/* Account Section */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="font-bold text-base mb-4">Akun Anda</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet size={20} className="text-gray-500" />
              <div>
                <div className="text-sm font-medium">Pembayaran</div>
                <div className="text-xs text-gray-500">Kredit iklan yang tersedia</div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-sm text-gray-500">
                Rp0 <ChevronRight size={16} />
              </div>
              <div className="text-xs text-gray-400">Rp0</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Ticket size={20} className="text-gray-500" />
              <span className="text-sm font-medium">Kupon diskon</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              Tidak ada <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Success Center */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <h2 className="font-bold text-base">Success Center</h2>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>Lebih banyak</span>
            <ChevronRight size={14} />
          </div>
        </div>

        <div className="border border-gray-100 rounded-lg p-3">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-sm pr-4">
              Reward Ramadan: Habiskan Rp333340 dalam bentuk tunai untuk mendapatkan hingga Rp333340
            </h3>
            <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] text-gray-500 whitespace-nowrap">
              <Clock size={10} />
              <span>18 hari</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
            Habiskan Rp333340 dalam bentuk tunai untuk kampanye Ramadan 2026 dan dapatkan kupon DISKON 50% (nilai kupon maksimal Rp333340).
          </p>
          
          <div className="text-xs mb-3">
            <span className="text-pink-600 font-bold">Reward: DISKON 50%</span>
            <span className="text-gray-500"> dan hemat hingga Rp333.340</span>
          </div>

          <div className="flex justify-end">
            <button className="bg-gray-100 text-xs font-medium px-3 py-1.5 rounded-full">
              Gabung misi
            </button>
          </div>
        </div>
      </div>

      {/* Other Functions */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="font-bold text-base mb-4">Fungsi lain</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User size={20} className="text-gray-500" />
              <span className="text-sm font-medium">Permintaan</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <VideoIcon size={20} className="text-gray-500" />
              <span className="text-sm font-medium">Video afiliasi</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
