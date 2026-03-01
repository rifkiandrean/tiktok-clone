import { 
  Search, 
  UserPlus, 
  Users, 
  Heart, 
  Inbox as InboxIcon, 
  Camera,
  Plus
} from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useMessages } from '../context/MessageContext';
import { Link } from 'react-router-dom';

export default function Inbox() {
  const { messages } = useMessages();
  
  const notifications = messages.filter(m => m.type === 'notification');
  const chats = messages.filter(m => m.type === 'chat');

  return (
    <>
      <div className="min-h-screen bg-white font-sans pb-20">
        {/* Header */}
        <header className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 py-3">
          <UserPlus size={24} className="text-black" />
          <div className="flex items-center gap-1">
            <h1 className="text-lg font-bold">Kotak Masuk</h1>
            <div className="w-2 h-2 bg-gray-300 rounded-full mt-1"></div>
          </div>
          <Search size={24} className="text-black" />
        </header>

        {/* Stories Tray */}
        <div className="flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar">
          {/* Create Story */}
          <div className="flex flex-col items-center flex-shrink-0 relative mt-6">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white border border-gray-100 shadow-sm px-2 py-1 rounded-lg text-[10px] text-center whitespace-nowrap text-gray-500 mb-1 z-10">
              Apa yang<br/>Anda<br/>pikirkan?
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
            </div>
            <div className="relative w-16 h-16">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white font-bold text-xs text-center leading-tight p-1">
                  <span className="text-orange-500 text-xl block">G</span>
                  GOODS<br/>PRODUK
                </div>
              </div>
              <div className="absolute bottom-0 right-0 bg-cyan-400 text-white p-0.5 rounded-full border-2 border-white">
                <Plus size={14} strokeWidth={3} />
              </div>
            </div>
            <span className="text-xs mt-1 font-medium">Buat</span>
          </div>

          {/* Story 1 */}
          <div className="flex flex-col items-center flex-shrink-0 mt-6">
            <div className="w-16 h-16 rounded-full p-[2px] border-2 border-cyan-400 relative">
              <img src="https://picsum.photos/seed/car/100/100" alt="Story" className="w-full h-full rounded-full object-cover border border-white" />
              <div className="absolute bottom-0 right-0 bg-pink-500 text-white p-1 rounded-full border-2 border-white">
                 <div className="flex gap-0.5 items-end h-2 w-2 justify-center">
                   <div className="w-0.5 bg-white h-full animate-pulse"></div>
                   <div className="w-0.5 bg-white h-1/2 animate-pulse"></div>
                   <div className="w-0.5 bg-white h-3/4 animate-pulse"></div>
                 </div>
              </div>
            </div>
            <span className="text-xs mt-1 font-medium">PakDhe m...</span>
          </div>

          {/* Story 2 */}
          <div className="flex flex-col items-center flex-shrink-0 mt-6">
            <div className="w-16 h-16 rounded-full p-[2px] border-2 border-cyan-400">
              <img src="https://picsum.photos/seed/hijab/100/100" alt="Story" className="w-full h-full rounded-full object-cover border border-white" />
            </div>
            <span className="text-xs mt-1 font-medium">Vell</span>
          </div>

          {/* Story 3 */}
          <div className="flex flex-col items-center flex-shrink-0 mt-6">
            <div className="w-16 h-16 rounded-full p-[2px] border-2 border-cyan-400">
              <img src="https://picsum.photos/seed/girl/100/100" alt="Story" className="w-full h-full rounded-full object-cover border border-white" />
            </div>
            <span className="text-xs mt-1 font-medium">DJBID...</span>
          </div>
        </div>

        {/* Notification List */}
        <div className="mt-2">
          <Link to="/notifications/followers">
            <NotificationItem 
              icon={<Users size={24} className="text-white fill-white" />}
              bg="bg-cyan-500"
              title="Pengikut baru"
              subtitle="mania bus adit mulai mengikuti ..."
              badge={notifications.find(n => n.title === 'Pengikut baru')?.badge}
            />
          </Link>
          <Link to="/notifications/activity">
            <NotificationItem 
              icon={<Heart size={24} className="text-white fill-white" />}
              bg="bg-pink-500"
              title="Aktivitas"
              subtitle={<span>Rhm⁉️ menyukai komentar Anda.</span>}
              badge={notifications.find(n => n.title === 'Aktivitas')?.badge}
            />
          </Link>
          <Link to="/notifications/system">
            <NotificationItem 
              icon={<div className="w-6 h-4 bg-white rounded-sm border-2 border-white"></div>} 
              bg="bg-slate-900"
              title="Notifikasi sistem"
              subtitle="Asisten Promosi: Dapatkan r... · 17 j"
              badge={notifications.find(n => n.title === 'Notifikasi sistem')?.badge}
            />
          </Link>
        </div>

        {/* Chat List */}
        <div className="mt-2">
          {chats.map(chat => (
            <Link to={`/message/${chat.id}`} key={chat.id}>
              <ChatItem 
                img={chat.img}
                name={chat.title}
                message={chat.subtitle}
                rightElement={chat.badge ? (
                  <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {chat.badge}
                  </div>
                ) : (
                  <Camera size={20} className="text-gray-400" />
                )}
                isRead={chat.read}
              />
            </Link>
          ))}
        </div>
      </div>
    <BottomNav />
    </>
  );
}

function NotificationItem({ icon, bg, title, subtitle, badge }: any) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 active:bg-gray-50">
      <div className={`w-14 h-14 ${bg} rounded-full flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-sm mb-0.5">{title}</h3>
        <p className="text-sm text-gray-600 truncate">{subtitle}</p>
      </div>
      {badge > 0 && (
        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {badge}
        </div>
      )}
    </div>
  );
}

function ChatItem({ img, name, message, rightElement, isRead }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 active:bg-gray-50 ${!isRead ? 'bg-gray-50' : ''}`}>
      <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
        <img src={img} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold text-sm mb-0.5 ${!isRead ? 'text-black' : 'text-gray-900'}`}>{name}</h3>
        <p className={`text-sm truncate ${!isRead ? 'text-black font-medium' : 'text-gray-500'}`}>{message}</p>
      </div>
      {rightElement && (
        <div className="flex-shrink-0">
          {rightElement}
        </div>
      )}
    </div>
  );
}
