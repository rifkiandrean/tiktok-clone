import { ArrowLeft, Info, Filter, ArrowUpCircle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { ArrowLeft, Info, Filter, ArrowUpCircle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PullToRefresh from '../components/PullToRefresh';

export default function ResultsOverview() {
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState('cost');
  const [activeTab, setActiveTab] = useState<'video' | 'live'>('video');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-white font-sans pb-10">
        {/* Header */}
        <header className="sticky top-0 bg-white z-10">
          <div className="flex items-center px-4 py-3 relative">
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 absolute left-4">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold w-full text-center">Ikhtisar hasil</h1>
          </div>
          
          {/* Tabs */}
          <div className="flex text-sm font-medium border-b border-gray-100">
            <button 
              onClick={() => setActiveTab('video')}
              className={`flex-1 py-3 ${activeTab === 'video' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            >
              Video
            </button>
            <button 
              onClick={() => setActiveTab('live')}
              className={`flex-1 py-3 ${activeTab === 'live' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            >
              LIVE
            </button>
          </div>
        </header>

        <div className={`p-4 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          {/* Time Filters */}
          <div className="flex gap-2 mb-2 overflow-x-auto no-scrollbar">
            <button className="px-4 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 whitespace-nowrap">7 hari</button>
            <button className="px-4 py-1.5 bg-gray-900 rounded-full text-xs font-medium text-white whitespace-nowrap">28 hari</button>
            <button className="px-4 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 whitespace-nowrap">60 hari</button>
            <button className="px-4 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 flex items-center gap-1 whitespace-nowrap">
              Khusus <ChevronDown size={12} />
            </button>
          </div>
          
          <div className="text-xs text-gray-500 mb-6">02/02/2026 - 01/03/2026</div>

          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <h2 className="font-bold text-base">Hasil promosi</h2>
              <Info size={14} className="text-gray-400" />
            </div>
            <Filter size={16} className="text-gray-500" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <StatCard 
              label="Biaya iklan" 
              value="Rp0" 
              subValue="Rp0" 
              active={selectedMetric === 'cost'} 
              onClick={() => setSelectedMetric('cost')}
            />
            <StatCard 
              label={activeTab === 'video' ? "Tayangan video" : "Tayangan LIVE"}
              value="0" 
              subValue="0" 
              active={selectedMetric === 'views'} 
              onClick={() => setSelectedMetric('views')}
            />
            <StatCard 
              label="Pengikut baru" 
              value="0" 
              subValue="0" 
              active={selectedMetric === 'followers'} 
              onClick={() => setSelectedMetric('followers')}
            />
            <StatCard 
              label="Tayangan profil" 
              value="0" 
              subValue="0" 
              active={selectedMetric === 'profile_views'} 
              onClick={() => setSelectedMetric('profile_views')}
            />
            <StatCard 
              label="Pembelian produk" 
              value="0" 
              subValue="0" 
              active={selectedMetric === 'purchases'} 
              onClick={() => setSelectedMetric('purchases')}
            />
            <StatCard 
              label="Pendapatan kotor" 
              value="Rp0" 
              subValue="Rp0" 
              active={selectedMetric === 'revenue'} 
              onClick={() => setSelectedMetric('revenue')}
            />
          </div>

          {/* Chart Area */}
          <div className="bg-white rounded-xl h-64 relative">
             {/* Y Axis Labels */}
             <div className="absolute right-0 top-4 text-[10px] text-gray-400 flex flex-col justify-between h-[calc(100%-40px)] text-right">
               <span>Rp1</span>
               <span>Rp0,5</span>
               <span>Rp0</span>
             </div>

             {/* Grid Lines */}
             <div className="absolute left-0 right-8 top-4 bottom-8 flex flex-col justify-between">
               <div className="border-b border-gray-100 w-full h-0"></div>
               <div className="border-b border-gray-100 w-full h-0"></div>
               <div className="border-b border-gray-200 w-full h-0"></div>
             </div>

             {/* X Axis Label */}
             <div className="absolute left-0 bottom-4 text-[10px] text-gray-400">
               02/02/2026
             </div>

             {/* The Line (Flat at 0) */}
             <div className="absolute left-0 right-8 bottom-8 h-[2px] bg-cyan-500"></div>
             
             {/* Active Dot */}
             <div className="absolute right-8 bottom-[30px] w-2 h-2 bg-cyan-500 rounded-full border border-white shadow-sm"></div>
          </div>
        </div>
      </div>
    </PullToRefresh>
  );
}

function StatCard({ label, value, subValue, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-3 rounded-lg border cursor-pointer transition-all ${
        active ? 'bg-white border-cyan-500 shadow-sm' : 'bg-white border-gray-100'
      }`}
    >
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-lg font-bold mb-1">{value}</div>
      <div className="flex items-center gap-1 text-xs text-cyan-600 font-medium">
        <ArrowUpCircle size={12} className="fill-cyan-600 text-white" />
        <span>{subValue}</span>
      </div>
    </div>
  );
}
