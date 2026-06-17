import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context';

interface WishlistButtonProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
}

export function WishlistButton({ product, size = 'md' }: WishlistButtonProps) {
  const { isInWishlist, toggleItem } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(product);
      }}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all ${
        isWishlisted
          ? 'bg-red-500 text-white'
          : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
      } shadow-md`}
      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
    >
      <Heart className={`${iconSizes[size]} ${isWishlisted ? 'fill-current' : ''}`} />
    </button>
  );
}

interface WishlistCardProps {
  product: Product;
  onMoveToCart: () => void;
  onRemove: () => void;
}

export function WishlistCard({ product, onMoveToCart, onRemove }: WishlistCardProps) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <Link to={`/products/${product.id}`} className="flex-shrink-0">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </Link>
      <div className="flex-1">
        <Link
          to={`/products/${product.id}`}
          className="font-medium text-gray-900 hover:text-[#F9B233] transition-colors"
        >
          {product.name}
        </Link>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="text-lg font-bold text-[#F9B233] mt-1">
          ${product.price.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <button
          onClick={onMoveToCart}
          className="px-4 py-2 bg-[#F9B233] text-white text-sm rounded-full hover:bg-[#FF8A00] transition-colors"
        >
          Move to Cart
        </button>
        <button
          onClick={onRemove}
          className="px-4 py-2 text-gray-500 text-sm hover:text-red-500 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
