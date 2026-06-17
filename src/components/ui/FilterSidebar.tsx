import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { SkinType } from '../../types';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSPF: string[];
  setSelectedSPF: (spf: string[]) => void;
  selectedSkinTypes: SkinType[];
  setSelectedSkinTypes: (types: SkinType[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
}

const SPF_OPTIONS = ['SPF 15', 'SPF 30', 'SPF 50', 'SPF 70'];
const SKIN_TYPES: SkinType[] = ['oily', 'dry', 'sensitive', 'combination', 'normal'];
const BRANDS = ['SUNSCREEN', 'SUNSCREEN Active', 'SUNSCREEN Gentle', 'SUNSCREEN Kids', 'SUNSCREEN Beauty', 'SUNSCREEN Premium'];

export function FilterSidebar({
  isOpen,
  onClose,
  selectedSPF,
  setSelectedSPF,
  selectedSkinTypes,
  setSelectedSkinTypes,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
}: FilterSidebarProps) {
  const toggleSPF = (spf: string) => {
    if (selectedSPF.includes(spf)) {
      setSelectedSPF(selectedSPF.filter((s) => s !== spf));
    } else {
      setSelectedSPF([...selectedSPF, spf]);
    }
  };

  const toggleSkinType = (type: SkinType) => {
    if (selectedSkinTypes.includes(type)) {
      setSelectedSkinTypes(selectedSkinTypes.filter((t) => t !== type));
    } else {
      setSelectedSkinTypes([...selectedSkinTypes, type]);
    }
  };

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        className="fixed lg:sticky lg:top-20 top-0 left-0 h-screen lg:h-auto w-80 bg-white z-50 lg:z-auto overflow-y-auto shadow-xl lg:shadow-none"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Filters</h3>
            <button onClick={onClose} className="lg:hidden p-2 rounded-full hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">SPF Level</h4>
              <div className="space-y-2">
                {SPF_OPTIONS.map((spf) => (
                  <label key={spf} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSPF.includes(spf)}
                      onChange={() => toggleSPF(spf)}
                      className="w-4 h-4 rounded border-gray-300 text-[#F9B233] focus:ring-[#F9B233]"
                    />
                    <span className="text-gray-700">{spf}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Skin Type</h4>
              <div className="space-y-2">
                {SKIN_TYPES.map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSkinTypes.includes(type)}
                      onChange={() => toggleSkinType(type)}
                      className="w-4 h-4 rounded border-gray-300 text-[#F9B233] focus:ring-[#F9B233]"
                    />
                    <span className="text-gray-700 capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233]"
                  min={0}
                  placeholder="Min"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233]"
                  min={0}
                  placeholder="Max"
                />
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Brand</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {BRANDS.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 rounded border-gray-300 text-[#F9B233] focus:ring-[#F9B233]"
                    />
                    <span className="text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedSPF([]);
                setSelectedSkinTypes([]);
                setPriceRange([0, 100]);
                setSelectedBrands([]);
              }}
              className="w-full py-2 text-[#F9B233] hover:text-[#FF8A00] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
