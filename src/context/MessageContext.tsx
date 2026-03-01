import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  doc, 
  updateDoc, 
  setDoc, 
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

export interface Message {
  id: string;
  type: 'notification' | 'chat';
  icon?: string; // Changed to string for serialization if needed, but we'll handle mapping in UI
  bg?: string;
  img?: string;
  title: string;
  subtitle: string;
  badge?: number;
  read: boolean;
  timestamp?: any;
}

interface MessageContextType {
  messages: Message[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  getMessage: (id: string) => Message | undefined;
  seedData: () => Promise<void>;
  sendMessage: (threadId: string, text: string) => Promise<void>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial dummy data for seeding
  const dummyData: Message[] = [
    {
      id: 'n1',
      type: 'notification',
      title: 'Pengikut baru',
      subtitle: 'mania bus adit mulai mengikuti ...',
      badge: 1,
      read: false,
      bg: 'bg-cyan-500'
    },
    {
      id: 'n2',
      type: 'notification',
      title: 'Aktivitas',
      subtitle: 'Rhm⁉️ menyukai komentar Anda.',
      badge: 5,
      read: false,
      bg: 'bg-pink-500'
    },
    {
      id: 'n3',
      type: 'notification',
      title: 'Notifikasi sistem',
      subtitle: 'Asisten Promosi: Dapatkan r... · 17 j',
      badge: 0,
      read: true,
      bg: 'bg-slate-900'
    },
    {
      id: 'c1',
      type: 'chat',
      title: 'Ayy',
      subtitle: 'Dikirim kemarin',
      img: 'https://picsum.photos/seed/couple/100/100',
      read: true
    },
    {
      id: 'c2',
      type: 'chat',
      title: 'Straubabyes🖤',
      subtitle: 'Dikirim kemarin',
      img: 'https://picsum.photos/seed/girl2/100/100',
      read: true
    },
    {
      id: 'c3',
      type: 'chat',
      title: 'NitaaaSwh',
      subtitle: 'Dikirim kemarin',
      img: 'https://picsum.photos/seed/wedding/100/100',
      read: true
    },
    {
      id: 'c4',
      type: 'chat',
      title: 'Deka44',
      subtitle: 'Dilihat',
      img: 'https://picsum.photos/seed/woman/100/100',
      badge: 1,
      read: false
    }
  ];

  useEffect(() => {
    if (!user) {
      setMessages([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'users', user.uid, 'threads'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message);
      });
      // Sort: Notifications first, then chats? Or by timestamp? 
      // For now, let's keep the order somewhat consistent or just rely on the list
      // We'll sort by type for now to match UI expectations (Notifications top, Chats bottom)
      // In a real app, you'd sort by timestamp.
      const sorted = msgs.sort((a, b) => {
        if (a.type === b.type) return 0;
        return a.type === 'notification' ? -1 : 1;
      });
      setMessages(sorted);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const seedData = async () => {
    if (!user) return;
    const batch = writeBatch(db);
    dummyData.forEach((msg) => {
      const ref = doc(db, 'users', user.uid, 'threads', msg.id);
      batch.set(ref, msg);
    });
    await batch.commit();
  };

  const unreadCount = messages.reduce((acc, msg) => acc + (msg.read ? 0 : (msg.badge || 1)), 0);

  const markAsRead = useCallback(async (id: string) => {
    if (!user) return;
    // Optimistic update
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, read: true, badge: 0 } : msg
    ));

    try {
      const ref = doc(db, 'users', user.uid, 'threads', id);
      await updateDoc(ref, { read: true, badge: 0 });
    } catch (e) {
      console.error("Error marking as read", e);
    }
  }, [user]);

  const getMessage = useCallback((id: string) => messages.find(m => m.id === id), [messages]);

  const sendMessage = async (threadId: string, text: string) => {
    if (!user) return;
    try {
      // In a real app, you would add to a subcollection 'messages' inside the thread
      // For this simple version, we'll just update the subtitle of the thread to show the latest message
      const ref = doc(db, 'users', user.uid, 'threads', threadId);
      await updateDoc(ref, { 
        subtitle: `Anda: ${text}`,
        timestamp: new Date().toISOString(),
        read: true
      });
      
      // Optimistic update for UI
      setMessages(prev => prev.map(msg => 
        msg.id === threadId ? { ...msg, subtitle: `Anda: ${text}` } : msg
      ));
    } catch (e) {
      console.error("Error sending message", e);
      throw e;
    }
  };

  return (
    <MessageContext.Provider value={{ messages, unreadCount, markAsRead, getMessage, seedData, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
}
