import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, MapPin } from 'lucide-react';
import { useWishlist, useCart } from '../context';
import { formatPrice } from '../utils/helpers';

export function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (product: typeof items[0]) => {
    addItem(product);
    removeItem(product.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist ({items.length} items)</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <div className="w-24 h-24 bg-[#FFF4D6] rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-[#F9B233]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save products you love for later!</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F9B233] text-white rounded-full font-semibold hover:bg-[#FF8A00] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <Link to={`/products/${product.id}`} className="block relative aspect-square bg-[#FFF4D6]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeItem(product.id);
                    }}
                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-md"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </Link>
                <div className="p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.brand}</p>
                  <Link
                    to={`/products/${product.id}`}
                    className="font-semibold text-gray-900 hover:text-[#F9B233] transition-colors"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-[#F9B233] font-semibold mt-2">{formatPrice(product.price)}</p>
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-[#F9B233] text-white rounded-lg hover:bg-[#FF8A00] transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Move to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
