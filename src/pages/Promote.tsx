import { 
  ArrowLeft, 
  Info, 
  ChevronRight, 
  ShoppingBag, 
  Globe, 
  ThumbsUp, 
  Wallet, 
  CreditCard,
  CheckCircle2,
  Circle,
  Moon,
  Star,
  Pencil,
  Landmark
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Promote() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Buat');
  const [targetTab, setTargetTab] = useState('Dapatkan penjualan');
  const [selectedGoal, setSelectedGoal] = useState('product');
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [audience, setAudience] = useState('default');
  const [budget, setBudget] = useState(86460);
  const [duration, setDuration] = useState(1);
  const [agreed, setAgreed] = useState(false);

  // Constants
  const VAT_RATE = 0.11;
  const vat = Math.round(budget * duration * VAT_RATE);
  const total = (budget * duration) + vat;

  const videos = [
    { id: 0, image: "https://picsum.photos/seed/promo1/200/300", views: "110" },
    { id: 1, image: "https://picsum.photos/seed/promo2/200/300", views: "170" },
    { id: 2, image: "https://picsum.photos/seed/promo3/200/300", views: "272" },
    { id: 3, image: "https://picsum.photos/seed/promo4/200/300", views: "95" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-white z-20 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold">Promosi</h1>
          <div className="w-8"></div> {/* Spacer */}
        </div>
        
        {/* Tabs */}
        <div className="flex px-4">
          {['Buat', 'Dasbor', 'Milik Saya'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium relative ${
                activeTab === tab ? 'text-black' : 'text-gray-500'
              }`}
            >
              {tab}
              {tab === 'Milik Saya' && (
                <span className="absolute top-3 right-4 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              )}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black mx-4"></div>
              )}
            </button>
          ))}
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Banner */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-4 relative overflow-hidden">
          <div className="relative z-10 max-w-[70%]">
            <h2 className="font-bold text-sm mb-1">Ramadan Penuh Berkah dari fitur Promosi TikTok</h2>
            <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
              <span className="text-[10px]">🔥</span>
              <span>Dapatkan kupon terbatas hingga Rp5.834.000</span>
            </div>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Moon size={40} className="text-yellow-400 fill-yellow-400" />
            <Star size={10} className="absolute -top-2 -left-2 text-yellow-400 fill-yellow-400 animate-pulse" />
            <Star size={8} className="absolute bottom-0 -right-2 text-yellow-400 fill-yellow-400 animate-pulse delay-75" />
          </div>
        </div>

        {/* Target Section */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-1 mb-3">
            <h3 className="font-bold text-sm">Pilih target Anda</h3>
            <Info size={14} className="text-gray-400" />
          </div>

          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            {['Dapatkan penjualan', 'Tingkatkan akun', 'Tingkatkan LIVE'].map((tab) => (
              <button
                key={tab}
                onClick={() => setTargetTab(tab)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-medium border ${
                  targetTab === tab 
                    ? 'border-pink-500 text-pink-600 bg-pink-50' 
                    : 'border-gray-200 text-gray-600 bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-gray-500" />
                <span className="text-sm font-medium">Lebih banyak pembelian produk</span>
              </div>
              <div 
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedGoal === 'product' ? 'border-pink-600' : 'border-gray-300'
                }`}
                onClick={() => setSelectedGoal('product')}
              >
                {selectedGoal === 'product' && <div className="w-3 h-3 bg-pink-600 rounded-full" />}
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-gray-500" />
                <span className="text-sm font-medium">Lebih banyak kunjungan situs web</span>
              </div>
              <div 
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedGoal === 'website' ? 'border-pink-600' : 'border-gray-300'
                }`}
                onClick={() => setSelectedGoal('website')}
              >
                {selectedGoal === 'website' && <div className="w-3 h-3 bg-pink-600 rounded-full" />}
              </div>
            </label>
          </div>
        </div>

        {/* Creative Section */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm">Pilih materi iklan</h3>
            <button className="text-xs text-gray-500 flex items-center">
              1 materi iklan <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="relative w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedVideo(video.id)}
              >
                <img src={video.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 flex items-center text-white text-[10px] drop-shadow-md">
                  <span className="mr-0.5">▷</span> {video.views}
                </div>
                {selectedVideo === video.id ? (
                  <div className="absolute top-1 right-1 bg-pink-600 rounded-full p-0.5">
                    <CheckCircle2 size={12} className="text-white" />
                  </div>
                ) : (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full border border-white/80"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Custom Promotion Section */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-bold text-sm mb-1">Promosi kustom</h3>
          <p className="text-xs text-gray-500 mb-4">Hasil yang ditampilkan adalah perkiraan</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-4 text-center">
            <div className="text-2xl font-bold mb-1">2.360 - 12.492</div>
            <div className="text-xs text-gray-500">Tayangan video</div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-1 mb-3">
              <span className="text-sm text-gray-600">Tentukan penonton Anda</span>
              <Info size={14} className="text-gray-400" />
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">Penonton bawaan (TikTok memilihkan untuk Anda)</span>
                <div 
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    audience === 'default' ? 'border-pink-600' : 'border-gray-300'
                  }`}
                  onClick={() => setAudience('default')}
                >
                  {audience === 'default' && <div className="w-3 h-3 bg-pink-600 rounded-full" />}
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">Buat sendiri</span>
                <ChevronRight size={16} className="text-gray-400" />
              </label>
              
              <div className="flex justify-center">
                 <button className="text-xs text-gray-500 flex items-center gap-1">
                   Lihat lainnya <ChevronRight size={12} className="rotate-90" />
                 </button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-1 mb-3">
              <span className="text-sm text-gray-600">Atur anggaran dan durasi</span>
              <Info size={14} className="text-gray-400" />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Anggaran</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                 <span className="text-sm font-bold">Rp{budget.toLocaleString('id-ID')} Per hari</span>
                 <Pencil size={12} className="text-gray-500" />
              </div>
              <input 
                type="range" 
                min="15000" 
                max="1000000" 
                step="1000"
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
              />
            </div>

            <div className="bg-gray-50 p-3 rounded-lg flex gap-2 mb-4">
              <ThumbsUp size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600">Anggaran dengan kemungkinan mencapai hasil yang diinginkan</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Durasi</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                 <span className="text-sm font-bold">{duration} hari</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-400"
              />
            </div>
          </div>

          <button className="w-full py-2.5 border border-gray-300 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
            <ShoppingBag size={16} />
            Pilih paket promosi
          </button>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-bold text-sm mb-4">Bayar dengan</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/1200px-Logo_dana_blue.svg.png" 
                  alt="DANA" 
                  className="w-8 h-8 object-contain"
                />
                <span className="text-sm">Dana</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                Hubungkan <ChevronRight size={16} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center text-blue-600">
                  <Landmark size={18} />
                </div>
                <span className="text-sm">Bank transfer</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png" 
                  alt="GoPay" 
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg";
                    e.currentTarget.onerror = null; // Prevent infinite loop
                  }}
                />
                <span className="text-sm">GoPay</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                Hubungkan <ChevronRight size={16} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Metode pembayaran lainnya</span>
                <div className="flex gap-2 items-center">
                   <img 
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/2560px-Shopee.svg.png" 
                     className="h-4 object-contain" 
                     alt="Shopee" 
                     onError={(e) => { e.currentTarget.style.display = 'none'; }}
                   />
                   <img 
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/2560px-Logo_ovo_purple.svg.png" 
                     className="h-3 object-contain" 
                     alt="OVO" 
                     onError={(e) => { e.currentTarget.style.display = 'none'; }}
                   />
                   <img 
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                     className="h-2.5 object-contain" 
                     alt="Visa" 
                     onError={(e) => { e.currentTarget.style.display = 'none'; }}
                   />
                   <img 
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2560px-Mastercard-logo.svg.png" 
                     className="h-3 object-contain" 
                     alt="Mastercard" 
                     onError={(e) => { e.currentTarget.style.display = 'none'; }}
                   />
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-bold text-sm mb-4">Detail harga</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>Rp{(budget * duration).toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 flex items-center gap-1">
                Indonesian PMSE VAT <Info size={12} />
              </span>
              <span>Rp{vat.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-gray-100 mt-2">
              <span>Total</span>
              <span>Rp{total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-bold text-sm mb-2">Ketentuan</h3>
          <label className="flex gap-3 cursor-pointer">
            <div 
              className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mt-0.5 ${
                agreed ? 'bg-pink-600 border-pink-600' : 'border-gray-300'
              }`}
              onClick={() => setAgreed(!agreed)}
            >
              {agreed && <CheckCircle2 size={14} className="text-white" />}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Saya menyetujui <span className="font-bold">Ketentuan Pembayaran</span> dan <span className="font-bold">Program Promosi TikTok</span>, <span className="font-bold">Kebijakan Iklan</span>, dan <span className="font-bold">Konfirmasi Penggunaan Musik</span>.
            </p>
          </label>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-1 font-bold text-sm">
          Total Rp{total.toLocaleString('id-ID')} <ChevronRight size={16} />
        </div>
        <button className="bg-pink-600 text-white font-bold text-sm px-8 py-2.5 rounded-lg">
          Bayar
        </button>
      </div>
    </div>
  );
}
