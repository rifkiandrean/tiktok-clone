import { 
  ArrowLeft, 
  Store, 
  ShoppingBag, 
  Banknote, 
  Flame, 
  MonitorPlay, 
  Share2, 
  ShieldCheck, 
  Link as LinkIcon, 
  Calendar, 
  Megaphone 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Toolkit() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-10">
      {/* Header */}
      <header className="sticky top-0 bg-white z-10 flex items-center px-4 py-3">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 mr-4">
          <ArrowLeft size={24} />
        </button>
      </header>

      <div className="px-4 pb-4">
        <h1 className="text-2xl font-bold mb-6">Toolkit TikTok Shop</h1>

        {/* Section 1: Paling sering dikunjungi */}
        <div className="mb-8">
          <h2 className="font-bold text-base mb-4">Paling sering dikunjungi</h2>
          <div className="grid grid-cols-4 gap-y-6">
            <ToolkitItem icon={<Store size={24} />} label="Toko Anda" to="/shop" />
            <ToolkitItem icon={<ShoppingBag size={24} />} label="Kelola produk" to="/manage-products" />
            <ToolkitItem icon={<Banknote size={24} />} label="Penghasilan" to="/earnings" />
            <ToolkitItem icon={<Flame size={24} />} label="Promosikan" to="/promote" />
          </div>
        </div>

        {/* Section 2: Buat konten jualan */}
        <div className="mb-8">
          <h2 className="font-bold text-base mb-4">Buat konten jualan</h2>
          <div className="grid grid-cols-4 gap-y-6">
            <ToolkitItem icon={<MonitorPlay size={24} />} label="Promter" />
            <ToolkitItem icon={<Share2 size={24} />} label="Tokopedia Affiliate" />
            <ToolkitItem icon={<ShieldCheck size={24} />} label="Prapemeriks aan video" />
            <ToolkitItem icon={<LinkIcon size={24} />} label="Tautkan produk" />
            <ToolkitItem icon={<ShoppingBag size={24} />} label="Set produk LIVE" />
            <ToolkitItem icon={<ShoppingBag size={24} />} label="LIVE Giveaway" />
            <ToolkitItem icon={<Calendar size={24} />} label="Acara LIVE" />
          </div>
        </div>

        {/* Section 3: Cari dan kelola produk */}
        <div className="mb-8">
          <h2 className="font-bold text-base mb-4">Cari dan kelola produk</h2>
          <div className="grid grid-cols-4 gap-y-6">
            <ToolkitItem icon={<ShoppingBag size={24} />} label="Kelola produk" to="/manage-products" />
          </div>
        </div>

        {/* Section 4: Tingkatkan penghasilan dan jumlah pengikut */}
        <div className="mb-8">
          <h2 className="font-bold text-base mb-4">Tingkatkan penghasilan dan jumlah pengikut</h2>
          <div className="grid grid-cols-4 gap-y-6">
            <ToolkitItem icon={<Flame size={24} />} label="Promosikan" to="/promote" />
            <ToolkitItem icon={<Megaphone size={24} />} label="Campaign" />
          </div>
        </div>

        {/* Section 5: Kelola akun Anda */}
        <div className="mb-8">
          <h2 className="font-bold text-base mb-4">Kelola akun Anda</h2>
          <div className="grid grid-cols-4 gap-y-6">
            <ToolkitItem icon={<Store size={24} />} label="Toko Anda" to="/shop" />
            <ToolkitItem icon={<Banknote size={24} />} label="Penghasilan" to="/earnings" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolkitItem({ icon, label, to }: { icon: React.ReactNode, label: string, to?: string }) {
  const Wrapper = to ? Link : 'button';
  const props = to ? { to } : {};

  return (
    <Wrapper {...props} className="flex flex-col items-center gap-2 w-full">
      <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 text-black">
        {icon}
      </div>
      <span className="text-xs text-center font-medium leading-tight max-w-[70px]">{label}</span>
    </Wrapper>
  );
}
