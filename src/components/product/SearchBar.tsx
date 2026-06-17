import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../../hooks';
import { products } from '../../data';

interface SearchResult {
  id: string;
  name: string;
  brand: string;
  image: string;
}

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    const filtered = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          p.spf.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
      .slice(0, 5)
      .map((p) => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        image: p.images[0],
      }));

    setResults(filtered);
  }, [debouncedQuery]);

  const handleSelect = (id: string) => {
    setQuery('');
    setIsOpen(false);
    navigate(`/products/${id}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search products..."
            className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F9B233] bg-white"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSelect(result.id)}
                className="w-full flex items-center gap-3 p-3 hover:bg-[#FFF4D6] transition-colors"
              >
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{result.name}</p>
                  <p className="text-sm text-gray-500">{result.brand}</p>
                </div>
              </button>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                navigate(`/products?search=${encodeURIComponent(query)}`);
              }}
              className="w-full p-3 text-center text-sm text-[#F9B233] hover:bg-[#FFF4D6] transition-colors border-t"
            >
              View all results
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
