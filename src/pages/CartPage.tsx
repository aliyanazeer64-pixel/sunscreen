import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, MapPin, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context';
import { formatPrice } from '../utils/helpers';
import { useState } from 'react';

export function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    const validCoupons: { [key: string]: number } = {
      'SUNNY20': 20,
      'PROTECT10': 10,
      'SUMMER25': 25,
    };

    if (validCoupons[couponCode.toUpperCase()]) {
      setDiscount(validCoupons[couponCode.toUpperCase()]);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setDiscount(0);
    }
  };

  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems} items)</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <div className="w-24 h-24 bg-[#FFF4D6] rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-12 h-12 text-[#F9B233]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some products to get started!</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F9B233] text-white rounded-full font-semibold hover:bg-[#FF8A00] transition-colors"
            >
              Browse Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="flex gap-6">
                    <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <Link
                          to={`/products/${item.product.id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-[#F9B233]"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{item.product.brand} | {item.product.spf}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponError('');
                        }}
                        placeholder="Enter code"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233]"
                      />
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-500 text-sm mt-1">{couponError}</p>
                  )}
                  {discount > 0 && (
                    <p className="text-green-600 text-sm mt-1">Coupon applied!</p>
                  )}
                </div>

                <Link
                  to="/checkout"
                  className="block w-full py-4 bg-[#F9B233] text-white text-center font-semibold rounded-xl hover:bg-[#FF8A00] transition-colors"
                >
                  Proceed to Checkout
                </Link>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Free shipping on orders over $50
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
