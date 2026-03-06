import { 
  ArrowLeft, 
  MoreHorizontal, 
  Search, 
  SlidersHorizontal, 
  ChevronRight, 
  HelpCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  store: string;
  stock: string;
  image: string;
  topTag?: { text: string; type: 'gradient' | 'blue' | 'black' };
  benefits?: { text: string; type: 'red' | 'pink' }[];
  commission: string;
  price: string;
  originalPrice: string;
  discount: string;
  available: boolean;
}

export default function ManageProducts() {
  const navigate = useNavigate();

  const products: Product[] = [
    {
      id: 1,
      name: "HAIR TONIC RAMBUT...",
      store: "PERFECTMENS STORE",
      stock: "229,2 rb",
      image: "https://picsum.photos/seed/hairtonic/200/200",
      topTag: { text: "Produk Auto Laku", type: "gradient" },
      benefits: [{ text: "Sampel gratis", type: "pink" }],
      commission: "Rp275 - 330",
      price: "Rp5.390",
      originalPrice: "Rp25.000",
      discount: "-78%",
      available: true
    },
    {
      id: 2,
      name: "Jam Tangan Pria Wanita Fashion An...",
      store: "lokstore",
      stock: "348,3 rb",
      image: "https://picsum.photos/seed/watch/200/200",
      benefits: [{ text: "Flash Sale", type: "red" }],
      commission: "Rp118",
      price: "Rp11.750",
      originalPrice: "Rp40.000",
      discount: "-71%",
      available: true
    },
    {
      id: 3,
      name: "[YESPLUS] 88-5 Send...",
      store: "Yesplus",
      stock: "0",
      image: "https://picsum.photos/seed/sandals/200/200",
      topTag: { text: "Fashion Terlaris", type: "blue" },
      commission: "Rp12.076",
      price: "Rp93.313",
      originalPrice: "Rp221.000",
      discount: "-58%",
      available: false
    },
    {
      id: 4,
      name: "XUNDD Magnetic Casing un...",
      store: "XUNDD Indonesia",
      stock: "1,4 rb",
      image: "https://picsum.photos/seed/case1/200/200",
      topTag: { text: "Mall", type: "black" },
      benefits: [{ text: "Sampel yang bisa dikembalikan ...", type: "pink" }],
      commission: "Rp18.780",
      price: "Rp174.654",
      originalPrice: "Rp470.000",
      discount: "-63%",
      available: true
    },
    {
      id: 5,
      name: "XUNDD Magnetic Casing un...",
      store: "XUNDD Indonesia",
      stock: "669",
      image: "https://picsum.photos/seed/case2/200/200",
      topTag: { text: "Mall", type: "black" },
      benefits: [{ text: "Sampel yang bisa dikembalikan ...", type: "pink" }],
      commission: "Rp18.780",
      price: "Rp174.654",
      originalPrice: "Rp719.750",
      discount: "-76%",
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      {/* Header */}
      <header className="sticky top-0 bg-white z-20 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold">Toko</h1>
          <button className="p-1 -mr-1">
            <MoreHorizontal size={24} />
          </button>
        </div>
        
        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari produk" 
              className="w-full bg-gray-100 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
          <button className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <SlidersHorizontal size={16} className="text-gray-600" />
          </button>
          
          <button className="flex-shrink-0 bg-gray-100 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
            <span className="bg-gradient-to-r from-blue-600 to-pink-600 text-white text-[10px] px-1 rounded-sm font-bold">
              <span className="drop-shadow-sm">Fashion Terlaris</span>
            </span>
            <span className="text-xs font-medium">18</span>
          </button>

          <button className="flex-shrink-0 bg-gray-100 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
            <span className="text-xs font-medium text-gray-600">Perlu ditingkatkan</span>
            <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full font-bold">72</span>
          </button>
        </div>
      </header>

      {/* Product List */}
      <div className="flex flex-col gap-1">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 flex gap-3 relative">
            {/* Image */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <img 
                src={product.image} 
                alt={product.name} 
                className={`w-full h-full object-cover rounded-md ${!product.available ? 'opacity-50' : ''}`}
              />
              {!product.available && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-md">
                  <div className="bg-white rounded-full p-1 mb-1">
                    <HelpCircle size={12} className="text-black" />
                  </div>
                  <span className="text-white text-[10px] font-bold text-center leading-tight px-1">
                    Tidak tersedia
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Top Tag */}
              {product.topTag && (
                <div className="mb-1">
                  {product.topTag.type === 'gradient' && (
                    <span className="bg-gradient-to-r from-blue-600 to-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm inline-flex items-center gap-1">
                      <span className="text-[8px]">⚡</span> {product.topTag.text}
                    </span>
                  )}
                  {product.topTag.type === 'blue' && (
                    <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm inline-flex items-center gap-1">
                      <span className="text-[8px]">🚀</span> {product.topTag.text}
                    </span>
                  )}
                  {product.topTag.type === 'black' && (
                    <span className="bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                      {product.topTag.text}
                    </span>
                  )}
                </div>
              )}

              {/* Title */}
              <h3 className="text-sm font-medium line-clamp-1 mb-1">{product.name}</h3>

              {/* Store & Stock */}
              <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                <span className="uppercase">{product.store}</span>
                <span className="w-px h-3 bg-gray-300"></span>
                <span>Stok {product.stock}</span>
              </div>

              {/* Benefits */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="flex items-center gap-1 mb-2">
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      {benefit.type === 'pink' && (
                        <span className="text-[10px] text-pink-600 bg-pink-50 px-1 rounded flex items-center gap-1">
                          <span className="text-pink-600">🎁</span> {benefit.text}
                        </span>
                      )}
                      {benefit.type === 'red' && (
                        <span className="text-[10px] text-red-600 bg-red-50 px-1 rounded flex items-center gap-1">
                          <span className="text-red-600">🏷️</span> {benefit.text}
                        </span>
                      )}
                    </div>
                  ))}
                  <span className="text-xs text-gray-400 flex items-center">
                    +2 <ChevronRight size={10} />
                  </span>
                </div>
              )}

              {/* Commission */}
              <div className="text-red-500 text-xs font-medium mb-0.5">
                Komisi {product.commission}
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{product.price}</span>
                <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                <span className="text-xs text-gray-500">{product.discount}</span>
              </div>
            </div>

            {/* Menu Dots */}
            <button className="absolute bottom-4 right-4 text-gray-400">
              <MoreHorizontal size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
