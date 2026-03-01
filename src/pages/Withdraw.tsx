import { ArrowLeft, MoreHorizontal, ChevronRight, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PullToRefresh from '../components/PullToRefresh';

export default function Withdraw() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const balance = 487922000;

  const handleRefresh = async () => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleWithdrawAll = () => {
    setAmount(balance.toString());
  };

  const formatInput = (value: string) => {
    // Remove non-numeric characters
    const number = value.replace(/\D/g, '');
    if (!number) return '';
    return parseInt(number).toLocaleString('id-ID');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInput(e.target.value);
    setAmount(formatted);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-white font-sans flex flex-col">
        {/* Header */}
        <header className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold">Penarikan</h1>
          <button className="p-1 -mr-1">
            <MoreHorizontal size={24} />
          </button>
        </header>

        <div className="flex-1 px-4 py-2">
          {/* Payment Method */}
          <div className="flex items-start justify-between py-4">
            <div className="flex gap-3">
              <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-[10px] font-bold">
                DANA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">DANA 62-*******3431</span>
                </div>
                <div className="mt-1">
                  <span className="bg-green-100 text-green-600 text-[10px] px-1.5 py-0.5 rounded font-medium">Default</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Dana akan tiba dalam 1 hari kerja.</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <span className="text-xs">IDR</span>
              <ChevronRight size={16} />
            </div>
          </div>

          {/* Amount Input */}
          <div className="mt-4">
            <label className="text-sm font-bold block mb-2">Jumlah</label>
            <div className="bg-gray-50 rounded-lg px-4 py-3 flex items-center">
              <span className="text-gray-500 font-medium mr-2">Rp</span>
              <input 
                type="text" 
                value={amount}
                onChange={handleChange}
                placeholder="0"
                className="bg-transparent w-full outline-none text-lg font-medium placeholder-gray-300"
              />
            </div>
          </div>

          {/* Balance Info */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-1">
              Keseimbangan: Rp {balance.toLocaleString('id-ID')}
            </p>
            <div className="flex items-start gap-1 text-xs text-gray-500">
              <span>Limit untuk penarikan dana ini: Rp 3.000 - 10.000.000</span>
              <Info size={12} className="mt-0.5" />
            </div>
            <button 
              onClick={handleWithdrawAll}
              className="text-xs text-teal-500 font-medium mt-2"
            >
              Tarik dana semua
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-6 mt-auto">
          <p className="text-[10px] text-gray-500 text-center mb-4 leading-relaxed">
            Transaksi pembayaran diproses oleh PIPO. Dengan melanjutkan, Anda menyatakan bahwa Anda menyetujui <span className="font-bold text-black">Kebijakan Privasi PIPO</span>.
          </p>
          <button className="w-full bg-green-500 text-white font-bold py-3 rounded-md text-sm hover:bg-green-600 active:bg-green-700 transition-colors">
            Kirim
          </button>
        </div>
      </div>
    </PullToRefresh>
  );
}
