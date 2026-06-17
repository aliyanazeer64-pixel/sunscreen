import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Shield, Droplets, Wind, Check, Minus, Plus, ChevronRight, Share2 } from 'lucide-react';
import { ProductGallery, ProductCard } from '../components';
import { products, reviews } from '../data';
import { useCart, useWishlist } from '../context';
import { formatPrice } from '../utils/helpers';

export function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews'>('description');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products" className="text-[#F9B233] hover:underline">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = products.filter((p) => p.id !== id && p.skinTypes.some((type) => product.skinTypes.includes(type))).slice(0, 4);
  const productReviews = reviews.filter((r) => r.productId === id);

  const benefitIcons: { [key: string]: typeof Shield } = {
    'UV Protection': Shield,
    'Moisturizing': Droplets,
    'Lightweight': Wind,
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-[#F9B233]">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/products" className="hover:text-[#F9B233]">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Details */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#FFF4D6] text-[#F9B233] text-sm font-medium rounded-full">
                  {product.spf}
                </span>
                {product.waterResistant && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
                    Water Resistant
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-500 mb-4">{product.brand}</p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-[#F9B233] fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Suitable for:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.skinTypes.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full capitalize"
                    >
                      {type} skin
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Key Benefits:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.benefits.slice(0, 4).map((benefit) => {
                    const Icon = benefitIcons[benefit] || Shield;
                    return (
                      <div key={benefit} className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#FFF4D6] rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#F9B233]" />
                        </div>
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-[#F9B233] text-white rounded-full font-semibold hover:bg-[#FF8A00] transition-colors shadow-lg shadow-[#F9B233]/30"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleItem(product)}
                    className={`w-14 h-14 flex items-center justify-center rounded-full border-2 transition-colors ${
                      isWishlisted
                        ? 'bg-red-50 border-red-500 text-red-500'
                        : 'border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-gray-200 text-gray-600 hover:border-[#F9B233] hover:text-[#F9B233] transition-colors">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {product.inStock ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">In Stock - Ready to ship</span>
                </div>
              ) : (
                <p className="text-red-500 font-medium">Out of Stock</p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b mb-8">
          <div className="flex gap-8">
            {(['description', 'ingredients', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-[#F9B233] border-b-2 border-[#F9B233]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-16">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-gray-600">
                Volume: <span className="font-medium">{product.volume}</span>
              </p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Ingredients</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {product.ingredients.map((ingredient) => (
                  <div key={ingredient} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-[#F9B233] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{ingredient}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Active ingredient for sun protection and skin care
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center gap-8 mb-8 p-6 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <p className="text-5xl font-bold text-gray-900">{product.rating}</p>
                  <div className="flex items-center justify-center gap-1 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? 'text-[#F9B233] fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{product.reviewCount} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-8">{stars} star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#F9B233] rounded-full"
                          style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 10}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {productReviews.length > 0 ? (
                <div className="space-y-6">
                  {productReviews.map((review) => (
                    <div key={review.id} className="p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#F9B233] rounded-full flex items-center justify-center text-white font-semibold">
                            {review.userName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{review.userName}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-[#F9B233] fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.createdAt}</span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
              )}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
