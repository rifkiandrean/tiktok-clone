import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  writeBatch,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

// --- Interfaces ---

export interface UserProfile {
  displayName: string;
  username: string;
  bio: string;
  followers: number;
  following: number;
  likes: number;
  photoURL: string;
}

export interface Transaction {
  id: string;
  dateStr: string;
  monthIndex: number;
  year: number;
  amount: number;
  items: number;
  type: 'daily_income' | 'withdrawal' | 'violation' | 'reward';
}

export interface Order {
  id: string;
  status: string;
  statusColor: string;
  productName: string;
  price: string;
  quantity: number;
  videoTitle: string;
  commissionPercent: string;
  estCommission: string;
  estBase: string;
  actualCommission: string;
  actualBase: string;
  date: string;
}

interface DataContextType {
  profile: UserProfile | null;
  balance: number;
  transactions: Transaction[];
  orders: Order[];
  loading: boolean;
  seedAllData: () => Promise<void>;
  updateBalance: (newBalance: number) => Promise<void>;
  addTransaction: (date: Date, amount: number, items: number) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Initial Seed Data ---

  const seedProfile: UserProfile = {
    displayName: user?.displayName || 'Goods Produk',
    username: '@sidolarispangandaran',
    bio: 'Link Tutor klik dibawah',
    followers: 191,
    following: 265,
    likes: 6595,
    photoURL: user?.photoURL || "https://picsum.photos/seed/user/100/100"
  };

  const seedOrders: Order[] = [
    {
      id: "581876960151504885",
      status: "Selesai",
      statusColor: "bg-black text-white",
      productName: "FYC Yessica's Tea Tree & Strawb...",
      price: "Rp24.500",
      quantity: 1,
      videoTitle: "Memang salah pasang harga kalo segini mah. Ma...",
      commissionPercent: "3%",
      estCommission: "Rp735",
      estBase: "Rp24.500",
      actualCommission: "Rp735",
      actualBase: "Rp24.500",
      date: "2026-02-28"
    },
    {
      id: "581858686429267955",
      status: "Tidak memenuhi s...",
      statusColor: "bg-gray-100 text-gray-500",
      productName: "FYC Yessica's Tea Tree & Strawb...",
      price: "Rp24.470",
      quantity: 1,
      videoTitle: "Memang salah pasang harga kalo segini mah. Ma...",
      commissionPercent: "3%",
      estCommission: "Rp734",
      estBase: "Rp24.470",
      actualCommission: "Rp0",
      actualBase: "Rp0",
      date: "2026-02-27"
    }
  ];

  // Generate Transactions (similar to EarningsHistory logic but static for seed)
  const generateTransactions = (): Transaction[] => {
    const data: Transaction[] = [];
    const endDate = new Date('2026-02-28T12:00:00');
    const startDate = new Date('2024-01-14T12:00:00');
    
    let currentDate = new Date(endDate);
    let id = 1;

    // Generate about 50 transactions for demo to avoid hitting write limits too hard
    // or just generate the full list if needed. Let's do a smaller subset for "seed"
    // to be safe, or just the full logic if we want "all data". 
    // The user asked for "all data", so let's try to be faithful but maybe limit to 100 recent days for seed.
    
    let limit = 100; 

    while (currentDate >= startDate && limit > 0) {
      const items = Math.floor(Math.random() * (10000 - 654 + 1)) + 654;
      const earningsPerItem = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
      const amount = items * earningsPerItem;

      data.push({
        id: `tx_${id++}`,
        dateStr: currentDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        monthIndex: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        amount: amount,
        items: items,
        type: 'daily_income'
      });

      currentDate.setDate(currentDate.getDate() - 1);
      limit--;
    }
    return data;
  };

  // --- Effects ---

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setBalance(0);
      setTransactions([]);
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // 1. Listen to Profile & Balance (User Document)
    const userDocRef = doc(db, 'users', user.uid);
    const unsubUser = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(data.profile as UserProfile);
        setBalance(data.balance || 0);
      } else {
        setProfile(null);
      }
    });

    // 2. Listen to Transactions
    const txQuery = collection(db, 'users', user.uid, 'transactions');
    const unsubTx = onSnapshot(txQuery, (snapshot) => {
      const txs: Transaction[] = [];
      snapshot.forEach((doc) => txs.push(doc.data() as Transaction));
      // Sort by date descending (simple approximation by ID or we need real date field)
      // For now, let's assume they come in or we sort them client side if needed.
      // Since we generated them backwards, they might be in order.
      setTransactions(txs);
    });

    // 3. Listen to Orders
    const ordersQuery = collection(db, 'users', user.uid, 'orders');
    const unsubOrders = onSnapshot(ordersQuery, (snapshot) => {
      const ords: Order[] = [];
      snapshot.forEach((doc) => ords.push(doc.data() as Order));
      setOrders(ords);
    });

    setLoading(false);

    return () => {
      unsubUser();
      unsubTx();
      unsubOrders();
    };
  }, [user]);

  // --- Actions ---

  const seedAllData = async () => {
    if (!user) return;
    const batch = writeBatch(db);

    // 1. Set User Profile & Balance
    const userRef = doc(db, 'users', user.uid);
    batch.set(userRef, {
      profile: seedProfile,
      balance: 487922000 // Hardcoded from Earnings.tsx
    }, { merge: true });

    // 2. Set Orders
    seedOrders.forEach(order => {
      const orderRef = doc(db, 'users', user.uid, 'orders', order.id);
      batch.set(orderRef, order);
    });

    // 3. Set Transactions
    const txs = generateTransactions();
    txs.forEach(tx => {
      const txRef = doc(db, 'users', user.uid, 'transactions', tx.id);
      batch.set(txRef, tx);
    });

    await batch.commit();
  };

  const updateBalance = async (newBalance: number) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { balance: newBalance });
    } catch (error) {
      console.error("Error updating balance:", error);
      throw error;
    }
  };

  const addTransaction = async (date: Date, amount: number, items: number) => {
    if (!user) return;
    try {
      const id = date.toISOString().split('T')[0]; // Use YYYY-MM-DD as ID
      const dateStr = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      
      const transaction: Transaction = {
        id,
        dateStr,
        monthIndex: date.getMonth(),
        year: date.getFullYear(),
        amount,
        items,
        type: 'daily_income'
      };

      const txRef = doc(db, 'users', user.uid, 'transactions', id);
      await setDoc(txRef, transaction);
    } catch (error) {
      console.error("Error adding transaction:", error);
      throw error;
    }
  };

  return (
    <DataContext.Provider value={{ profile, balance, transactions, orders, loading, seedAllData, updateBalance, addTransaction }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
