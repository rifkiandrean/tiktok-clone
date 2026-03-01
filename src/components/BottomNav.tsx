import { Home, ShoppingBag, PlusSquare, MessageSquare, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useMessages } from '../context/MessageContext';

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;
  const { unreadCount } = useMessages();

  const isActive = (p: string) => path === p;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 pb-4 flex justify-between items-center z-50">
      <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-black' : 'text-gray-500'}`}>
        <Home size={24} strokeWidth={isActive('/') ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Beranda</span>
      </Link>
      
      <Link to="/shop" className={`flex flex-col items-center gap-1 ${isActive('/shop') ? 'text-black' : 'text-gray-500'}`}>
        <ShoppingBag size={24} strokeWidth={isActive('/shop') ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Toko</span>
      </Link>

      <div className="flex flex-col items-center justify-center -mt-2">
        <button className="bg-black text-white rounded-xl px-3 py-1 shadow-lg">
          <PlusSquare size={20} strokeWidth={2.5} className="text-white" />
        </button>
      </div>

      <Link to="/inbox" className={`flex flex-col items-center gap-1 ${isActive('/inbox') ? 'text-black' : 'text-gray-500'}`}>
        <div className="relative">
          <MessageSquare size={24} strokeWidth={isActive('/inbox') ? 2.5 : 2} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full min-w-[16px] text-center">
              {unreadCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-medium">Kotak Masuk</span>
      </Link>

      <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-black' : 'text-gray-500'}`}>
        <User size={24} strokeWidth={isActive('/profile') ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Profil</span>
      </Link>
    </div>
  );
}
