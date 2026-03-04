import { 
  ArrowLeft, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight,
  X,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';

export default function EarningsHistory() {
  const navigate = useNavigate();
  const { transactions } = useData();
  const [activeTab, setActiveTab] = useState('Pendapatan harian');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null); // null = All year

  const tabs = [
    'Pendapatan harian',
    'Penarikan',
    'Pelanggaran',
    'Reward'
  ];

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    // Filter by Tab
    if (activeTab === 'Pendapatan harian') {
      filtered = filtered.filter(t => t.type === 'daily_income');
    } else if (activeTab === 'Penarikan') {
      filtered = filtered.filter(t => t.type === 'withdrawal');
    } else if (activeTab === 'Pelanggaran') {
      filtered = filtered.filter(t => t.type === 'violation');
    } else if (activeTab === 'Reward') {
      filtered = filtered.filter(t => t.type === 'reward');
    }

    // Filter by Month
    if (selectedMonth !== null) {
      filtered = filtered.filter(t => t.monthIndex === selectedMonth);
    }
    
    // Sort by date descending (latest first)
    return [...filtered].sort((a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });
  }, [transactions, selectedMonth, activeTab]);

  const dateRangeText = useMemo(() => {
    if (selectedMonth === null) return "14 Januari 2024 - 28 Februari 2026";
    const monthName = months[selectedMonth];
    return `Bulan ${monthName}`;
  }, [selectedMonth]);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-30 flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Riwayat penghasilan</h1>
        <button className="p-1 -mr-1">
          <HelpCircle size={24} className="text-gray-600" />
        </button>
      </header>

      <div className="pt-[57px]">
        <div className="min-h-screen bg-white font-sans pb-10">
          {/* Date Filter */}
          <button 
            onClick={() => setShowFilter(true)}
            className="w-full px-4 py-3 flex items-center gap-1 active:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-bold">{dateRangeText}</span>
            <ChevronDown size={16} className="text-gray-600" />
          </button>

          {/* Tabs */}
          <div className="flex overflow-x-auto px-4 border-b border-gray-100 no-scrollbar mb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="px-4">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                  <span className="text-base text-gray-900">{item.dateStr}</span>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className={`font-bold text-base ${item.type === 'withdrawal' ? 'text-red-600' : 'text-black'}`}>
                        {item.type === 'withdrawal' ? '-' : ''}Rp{item.amount.toLocaleString('id-ID')}
                      </div>
                      {item.type === 'daily_income' && (
                        <div className="text-xs text-gray-500">{item.items.toLocaleString('id-ID')} item</div>
                      )}
                      {item.type === 'withdrawal' && (
                        <div className="text-xs text-gray-500">Berhasil</div>
                      )}
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-gray-500 text-sm">
                Tidak ada data untuk periode ini
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Modal/BottomSheet */}
      {showFilter && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilter(false)} />
          <div className="relative bg-white w-full rounded-t-2xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-10">
              <h3 className="font-bold text-lg">Pilih Periode</h3>
              <button onClick={() => setShowFilter(false)}>
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            
            <div className="p-4 space-y-2">
              <button 
                onClick={() => { setSelectedMonth(null); setShowFilter(false); }}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
              >
                <span className={`font-medium ${selectedMonth === null ? 'text-pink-600' : 'text-gray-900'}`}>
                  Semua (2024 - 2026)
                </span>
                {selectedMonth === null && <Check size={20} className="text-pink-600" />}
              </button>

              <div className="h-px bg-gray-100 my-2" />
              
              <div className="grid grid-cols-2 gap-2">
                {months.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => { setSelectedMonth(index); setShowFilter(false); }}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      selectedMonth === index 
                        ? 'border-pink-500 bg-pink-50 text-pink-700' 
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium">{month}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
