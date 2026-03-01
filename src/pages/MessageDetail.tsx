import { ArrowLeft, MoreHorizontal, Phone, Video, Send } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMessages } from '../context/MessageContext';
import { useEffect, useState } from 'react';

export default function MessageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMessage, markAsRead, sendMessage } = useMessages();
  const message = getMessage(id || '');
  const [inputText, setInputText] = useState('');
  const [localMessages, setLocalMessages] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      markAsRead(id);
    }
  }, [id, markAsRead]);

  const handleSend = async () => {
    if (!inputText.trim() || !id) return;
    
    const text = inputText;
    setInputText('');
    setLocalMessages(prev => [...prev, text]);
    
    await sendMessage(id, text);
  };

  if (!message) {
    return <div className="p-4">Pesan tidak ditemukan</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            {message.type === 'chat' && message.img && (
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={message.img} alt={message.title} className="w-full h-full object-cover" />
              </div>
            )}
            <h1 className="text-base font-bold">{message.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 text-black">
          <Phone size={24} />
          <Video size={24} />
          <MoreHorizontal size={24} />
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
        <div className="text-center text-xs text-gray-400 mb-6">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}
        </div>

        {/* Dummy Conversation */}
        <div className="space-y-4">
          <div className="flex justify-end">
            <div className="bg-cyan-100 px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
              Halo, barang ini masih ready ga kak?
            </div>
          </div>
          
          <div className="flex justify-start">
             {message.type === 'chat' && message.img && (
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0 self-end mb-1">
                <img src={message.img} alt={message.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
              Hi kak! Ready ya, silahkan diorder langsung. Pengiriman hari ini sebelum jam 3 sore.
            </div>
          </div>

          <div className="flex justify-end">
             <div className="bg-cyan-100 px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
              Oke siap, saya checkout sekarang ya.
            </div>
          </div>

          {/* New Local Messages */}
          {localMessages.map((msg, idx) => (
            <div key={idx} className="flex justify-end animate-in slide-in-from-bottom-2 duration-300">
              <div className="bg-cyan-100 px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                {msg}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-3">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Kirim pesan..." 
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
        />
        <button 
          onClick={handleSend}
          disabled={!inputText.trim()}
          className="text-cyan-500 font-bold text-sm disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
