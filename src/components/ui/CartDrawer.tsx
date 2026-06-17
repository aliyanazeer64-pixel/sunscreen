import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context';
import { formatPrice } from '../../utils/helpers';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Shopping Cart ({totalItems})</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-24 h-24 bg-[#FFF4D6] rounded-full flex items-center justify-center mb-4">
                      <MapPin className="w-12 h-12 text-[#F9B233]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Add some products to get started!</p>
                    <Link
                      to="/products"
                      onClick={onClose}
                      className="px-6 py-3 bg-[#F9B233] text-white rounded-full hover:bg-[#FF8A00] transition-colors"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 p-3 bg-gray-50 rounded-xl"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <Link
                            to={`/products/${item.product.id}`}
                            onClick={onClose}
                            className="font-medium text-gray-900 hover:text-[#F9B233]"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-500">{item.product.spf}</p>
                          <p className="font-semibold text-[#F9B233] mt-1">
                            {formatPrice(item.product.price)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-white border flex items-center justify-center hover:bg-gray-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-white border flex items-center justify-center hover:bg-gray-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t p-4 space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    Shipping and taxes calculated at checkout
                  </p>
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="block w-full py-3 bg-[#F9B233] text-white text-center font-semibold rounded-full hover:bg-[#FF8A00] transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                  <button
                    onClick={onClose}
                    className="block w-full py-3 text-center text-gray-600 hover:text-gray-900"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
