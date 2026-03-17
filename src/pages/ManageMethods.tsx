import { ArrowLeft, ChevronRight, Landmark, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

interface PaymentMethod {
  id: string;
  type: 'dana' | 'bank';
  name: string;
  accountNumber: string;
  isDefault: boolean;
  limit: string;
  processingTime: string;
  createdAt?: any;
}

const BANKS = ['BCA', 'Mandiri', 'BNI', 'BRI', 'CIMB Niaga', 'Permata', 'BSI'];

export default function ManageMethods() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState('BCA');
  const [accountNumber, setAccountNumber] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [methods, setMethods] = useState<PaymentMethod[]>([
    {
      id: 'default-dana',
      type: 'dana',
      name: 'DANA',
      accountNumber: '62-*******3431',
      isDefault: true,
      limit: 'Rp 3.000 - 10.000.000',
      processingTime: 'Dana akan tiba dalam 1 hari kerja.'
    }
  ]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, `users/${user.uid}/paymentMethods`),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMethods: PaymentMethod[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as PaymentMethod));
      
      // Always keep the default DANA method at the top
      const defaultDana: PaymentMethod = {
        id: 'default-dana',
        type: 'dana',
        name: 'DANA',
        accountNumber: '62-*******3431',
        isDefault: true,
        limit: 'Rp 3.000 - 10.000.000',
        processingTime: 'Dana akan tiba dalam 1 hari kerja.'
      };

      setMethods([defaultDana, ...fetchedMethods]);
    }, (error) => {
      console.error("Error fetching payment methods:", error);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddMethod = async () => {
    if (!accountNumber || !user) return;
    
    setIsSaving(true);
    
    // Mask the account number for display
    const maskedNumber = accountNumber.length > 4 
      ? `*******${accountNumber.slice(-4)}` 
      : `***${accountNumber}`;

    try {
      await addDoc(collection(db, `users/${user.uid}/paymentMethods`), {
        type: 'bank',
        name: selectedBank,
        accountNumber: maskedNumber,
        isDefault: false,
        limit: 'Rp 10.000 - 50.000.000',
        processingTime: 'Dana akan tiba dalam 1-3 hari kerja.',
        createdAt: serverTimestamp()
      });

      setShowModal(false);
      setAccountNumber('');
      setSelectedBank('BCA');
    } catch (error) {
      console.error("Error adding payment method:", error);
      alert("Gagal menyimpan metode pembayaran. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 py-4">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">Kelola metode</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="text-[#00b18f] font-medium text-[15px]"
        >
          Tambah
        </button>
      </header>

      {/* Method List */}
      <div className="px-4 pt-2">
        {methods.map((method) => (
          <div key={method.id} className="flex items-start gap-3 mb-6">
            {/* Icon */}
            {method.type === 'dana' ? (
              <div className="w-9 h-6 bg-[#118EEA] rounded flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-[8px] font-bold tracking-wider">DANA</span>
              </div>
            ) : (
              <div className="w-9 h-6 bg-blue-50 border border-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-1">
                <Landmark size={14} className="text-blue-600" />
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-[15px] font-medium text-gray-900">
                  {method.name} {method.accountNumber}
                </h2>
                <div className="flex items-center gap-1 text-gray-400">
                  <span className="text-[13px]">IDR</span>
                  <ChevronRight size={16} />
                </div>
              </div>
              
              {method.isDefault && (
                <div className="mb-2">
                  <span className="inline-block bg-[#e6f7f4] text-[#00b18f] text-[11px] font-medium px-1.5 py-0.5 rounded">
                    Default
                  </span>
                </div>
              )}
              
              <p className="text-[13px] text-gray-500 leading-relaxed mb-1">
                Limit untuk penarikan dana ini: {method.limit}
              </p>
              <p className="text-[13px] text-gray-500">
                {method.processingTime}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Method Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:w-[400px] rounded-t-2xl sm:rounded-2xl p-5 pb-8 animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:fade-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Tambah Rekening Bank</h3>
              <button onClick={() => setShowModal(false)} className="p-1 -mr-1 text-gray-500">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Pilih Bank</label>
                <div className="relative">
                  <select 
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#00b18f] focus:ring-1 focus:ring-[#00b18f] appearance-none bg-white"
                  >
                    {BANKS.map(bank => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                  <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomor Rekening</label>
                <input 
                  type="number" 
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Masukkan nomor rekening"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#00b18f] focus:ring-1 focus:ring-[#00b18f]"
                />
              </div>
              
              <button 
                onClick={handleAddMethod}
                disabled={!accountNumber || isSaving}
                className="w-full bg-[#00b18f] text-white font-bold py-3.5 rounded-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center"
              >
                {isSaving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
