import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice, calculateDiscount } from '../../utils/helpers';
import { useCart, useWishlist } from '../../context';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-[#FFF4D6]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-[#FF8A00] text-white text-xs font-bold px-2 py-1 rounded-full">
            -{calculateDiscount(product.originalPrice, product.price)}%
          </div>
        )}

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full text-[#F9B233]">
          {product.spf}
        </div>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#F9B233] hover:text-white transition-colors"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleItem(product);
            }}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isWishlisted
                ? 'bg-[#FF8A00] text-white'
                : 'bg-white hover:bg-[#FF8A00] hover:text-white'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <Link
            to={`/products/${product.id}`}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#F9B233] hover:text-white transition-colors"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {product.brand}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-[#F9B233] fill-current" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviewCount})</span>
          </div>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="text-md font-semibold text-gray-900 hover:text-[#F9B233] transition-colors mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex flex-wrap gap-1">
            {product.skinTypes.slice(0, 2).map((type) => (
              <span
                key={type}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            className="bg-[#F9B233] hover:bg-[#FF8A00] text-white p-2 rounded-full transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
