import { 
  UserPlus, 
  Menu, 
  Share2, 
  Plus, 
  ShoppingBag, 
  Lock, 
  Repeat, 
  Bookmark, 
  Heart, 
  ChevronDown,
  Store,
  ChevronRight,
  LogOut,
  Database,
  Settings,
  X,
  DollarSign,
  Calendar,
  Package
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useState } from 'react';
import PullToRefresh from '../components/PullToRefresh';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../context/MessageContext';
import { useData } from '../context/DataContext';

export default function Profile() {
  const { user, signInWithGoogle, logout } = useAuth();
  const { seedData: seedInbox } = useMessages();
  const { profile, balance, seedAllData, updateBalance, addTransaction } = useData();
  const [seeding, setSeeding] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  // Modals
  const [showEarningsModal, setShowEarningsModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  
  // Form States
  const [newBalance, setNewBalance] = useState('');
  const [historyDate, setHistoryDate] = useState(new Date().toISOString().split('T')[0]);
  const [historyAmount, setHistoryAmount] = useState('');
  const [historyItems, setHistoryItems] = useState('');

  const handleRefresh = async () => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleSeed = async () => {
    setSeeding(true);
    await seedInbox();
    await seedAllData();
    setSeeding(false);
    alert('All data seeded successfully!');
  };

  const handleUpdateBalance = async () => {
    const amount = parseInt(newBalance.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(amount)) {
      await updateBalance(amount);
      setShowEarningsModal(false);
      setNewBalance('');
    }
  };

  const handleAddTransaction = async () => {
    const amount = parseInt(historyAmount.replace(/[^0-9]/g, ''), 10);
    const items = parseInt(historyItems.replace(/\./g, ''), 10);
    
    if (historyDate && !isNaN(amount) && !isNaN(items)) {
      await addTransaction(new Date(historyDate), amount, items);
      setShowHistoryModal(false);
      setHistoryAmount('');
      setHistoryItems('');
      alert('Riwayat berhasil disimpan!');
    }
  };

  // Use profile data from context if available, otherwise fallbacks
  const displayName = profile?.displayName || user?.displayName || 'Goods Produk';
  const username = profile?.username || '@sidolarispangandaran';
  const bio = profile?.bio || 'Link Tutor klik dibawah';
  const followers = profile?.followers ?? 191;
  const following = profile?.following ?? 265;
  const likes = profile?.likes ?? 6595;
  const photoURL = profile?.photoURL || user?.photoURL || "https://picsum.photos/seed/user/100/100";

  return (
    <>
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-white pb-20 font-sans">
        {/* Header */}
        <header className="sticky top-0 bg-white z-10 flex justify-between items-center px-4 py-3 border-b border-gray-50">
          <div className="flex items-center gap-4">
            <UserPlus size={24} strokeWidth={1.5} />
          </div>
          <div className="flex items-center gap-1 font-semibold text-lg">
            <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold">P</div>
            <span>{displayName}</span>
            <ChevronDown size={16} />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                <img src={photoURL} alt="Viewer" className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-gray-100 text-[10px] px-1 rounded-full border border-white">79</span>
            </div>
            <Share2 size={24} strokeWidth={1.5} />
            <button onClick={() => setShowMenu(true)}>
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </header>

        {/* Profile Info */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-start justify-between mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border border-gray-200 overflow-hidden relative">
                {photoURL ? (
                  <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-white font-bold text-xs text-center leading-tight p-1">
                    <span className="text-orange-500 text-2xl block">G</span>
                    GOODS<br/>PRODUK
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 right-0 bg-cyan-400 text-white p-1 rounded-full border-2 border-white">
                <Plus size={14} strokeWidth={3} />
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white shadow-sm border border-gray-100 px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap text-gray-600 z-10">
                Ada cerita?
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
              </div>
            </div>

            <div className="flex-1 ml-4">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold">{displayName}</h1>
                <span className="bg-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">9+</span>
              </div>
              <p className="text-sm text-gray-500">{username}</p>
              
              <div className="mt-3 flex gap-2">
                <button className="bg-gray-100 text-black font-semibold px-6 py-2 rounded-lg text-sm flex-1">
                  Edit
                </button>
                {!user ? (
                  <button onClick={signInWithGoogle} className="bg-pink-500 text-white font-semibold px-4 py-2 rounded-lg text-sm">
                    Login
                  </button>
                ) : (
                  <button onClick={logout} className="bg-gray-100 text-black p-2 rounded-lg">
                    <LogOut size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-4">
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg">{following}</span>
              <span className="text-xs text-gray-500">Mengikuti</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg">{followers}</span>
              <span className="text-xs text-gray-500">Pengikut</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg">{likes.toLocaleString('id-ID')}</span>
              <span className="text-xs text-gray-500">Suka</span>
            </div>
          </div>

          {/* Bio */}
          <div className="text-sm mb-4">
            <p>{bio}</p>
            <a href="#" className="text-black font-medium truncate block">https://genius-fish.static.domains</a>
          </div>

          {/* Action Tabs */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mb-2">
            {user && (
              <button 
                onClick={handleSeed} 
                disabled={seeding}
                className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap border border-gray-100"
              >
                <span className="text-blue-500"><Database size={14} /></span>
                {seeding ? 'Seeding...' : 'Seed All Data'}
              </button>
            )}
            <button className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap border border-gray-100">
              <span className="text-pink-500"><UserPlus size={14} /></span>
              TikTok Studio
            </button>
            <button className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap border border-gray-100">
              <span className="text-red-500"><ShoppingBag size={14} /></span>
              Pesanan Anda
            </button>
            <button className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap border border-gray-100">
              <span className="text-pink-500"><ShoppingBag size={14} /></span>
              Belanja
            </button>
          </div>
        </div>

        {/* Tab Icons */}
        <div className="flex justify-around border-b border-gray-200 mt-2">
          <button className="p-3 text-gray-400"><Menu size={24} className="rotate-90" /></button>
          <button className="p-3 text-black border-b-2 border-black"><ShoppingBag size={24} /></button>
          <button className="p-3 text-gray-400"><Lock size={24} /></button>
          <button className="p-3 text-gray-400"><Repeat size={24} /></button>
          <button className="p-3 text-gray-400"><Bookmark size={24} /></button>
          <button className="p-3 text-gray-400"><Heart size={24} /></button>
        </div>

        {/* Affiliate Center Banner */}
        <Link to="/affiliate-center" className="mx-4 mt-4 bg-gray-100 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store size={20} />
            <span className="font-semibold text-sm">Affiliate Center</span>
          </div>
          <ChevronRight size={16} className="text-gray-500" />
        </Link>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
          <ShoppingBag size={64} strokeWidth={1} className="text-gray-300 mb-4" />
          <h3 className="font-semibold text-lg mb-1">Belum ada produk</h3>
          <p className="text-gray-500 text-sm">Penjual belum menambahkan produk</p>
        </div>
      </div>
    </PullToRefresh>
    <BottomNav />

    {/* Menu Bottom Sheet */}
    {showMenu && (
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowMenu(false)} />
        <div className="relative bg-white w-full rounded-t-2xl animate-in slide-in-from-bottom duration-200 pb-6">
          <div className="flex justify-center pt-2 pb-4">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
          
          <div className="px-4 space-y-2">
            <button 
              onClick={() => {
                setShowMenu(false);
                setShowEarningsModal(true);
                setNewBalance('Rp ' + balance.toLocaleString('id-ID'));
              }}
              className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Settings size={20} className="text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-base">Pengaturan dan privasi</h3>
                <p className="text-xs text-gray-500">Atur total penghasilan</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button 
              onClick={() => {
                setShowMenu(false);
                setShowHistoryModal(true);
              }}
              className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar size={20} className="text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-base">Atur Riwayat</h3>
                <p className="text-xs text-gray-500">Atur penghasilan per tanggal</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Menu size={20} className="text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-base">Alat Kreator</h3>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Earnings Modal */}
    {showEarningsModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowEarningsModal(false)} />
        <div className="relative bg-white w-full max-w-sm rounded-2xl p-6 animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Atur Total Penghasilan</h3>
            <button onClick={() => setShowEarningsModal(false)}>
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Saldo Saat Ini (Rp)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={newBalance}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setNewBalance(val ? 'Rp ' + parseInt(val, 10).toLocaleString('id-ID') : '');
                }}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                placeholder="Rp 0"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Masukkan nominal uang
            </p>
          </div>

          <button 
            onClick={handleUpdateBalance}
            className="w-full bg-pink-500 text-white font-bold py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    )}

    {/* History Settings Modal */}
    {showHistoryModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowHistoryModal(false)} />
        <div className="relative bg-white w-full max-w-sm rounded-2xl p-6 animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Atur Riwayat Penghasilan</h3>
            <button onClick={() => setShowHistoryModal(false)}>
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Tanggal
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  value={historyDate}
                  onChange={(e) => setHistoryDate(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah Penghasilan (Rp)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={historyAmount}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setHistoryAmount(val ? 'Rp ' + parseInt(val, 10).toLocaleString('id-ID') : '');
                  }}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Rp 0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah Item Terjual
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Package size={16} className="text-gray-400" />
                </div>
                <input
                  type="number"
                  value={historyItems}
                  onChange={(e) => setHistoryItems(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleAddTransaction}
            className="w-full bg-pink-500 text-white font-bold py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Simpan Riwayat
          </button>
        </div>
      </div>
    )}
    </>
  );
}
