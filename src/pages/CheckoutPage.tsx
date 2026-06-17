import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Truck, Check, ArrowLeft, Lock } from 'lucide-react';
import { useCart } from '../context';
import { useAuth } from '../context';
import { formatPrice } from '../utils/helpers';

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">Please log in to complete your checkout.</p>
          <Link
            to="/login"
            className="px-8 py-4 bg-[#F9B233] text-white rounded-full font-semibold hover:bg-[#FF8A00] transition-colors inline-block"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link to="/products" className="text-[#F9B233] hover:underline">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white rounded-xl p-12 shadow-sm max-w-md"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase! Your order has been placed successfully.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Order confirmation has been sent to your email.
          </p>
          <Link
            to="/products"
            className="px-8 py-4 bg-[#F9B233] text-white rounded-full font-semibold hover:bg-[#FF8A00] transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const validateShipping = () => {
    const newErrors: { [key: string]: string } = {};
    if (!shippingInfo.firstName) newErrors.firstName = 'First name is required';
    if (!shippingInfo.lastName) newErrors.lastName = 'Last name is required';
    if (!shippingInfo.email) newErrors.email = 'Email is required';
    if (!shippingInfo.address) newErrors.address = 'Address is required';
    if (!shippingInfo.city) newErrors.city = 'City is required';
    if (!shippingInfo.state) newErrors.state = 'State is required';
    if (!shippingInfo.zipCode) newErrors.zipCode = 'ZIP code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: { [key: string]: string } = {};
    if (!paymentInfo.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!paymentInfo.nameOnCard) newErrors.nameOnCard = 'Name is required';
    if (!paymentInfo.expiry) newErrors.expiry = 'Expiry is required';
    if (!paymentInfo.cvv) newErrors.cvv = 'CVV is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateShipping()) {
      setStep(2);
    } else if (step === 2 && validatePayment()) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    setOrderComplete(true);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {['Shipping', 'Payment', 'Confirm'].map((label, index) => (
            <div key={label} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step > index
                    ? 'bg-[#F9B233] text-white'
                    : step === index + 1
                    ? 'bg-[#F9B233] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <span
                className={`ml-2 font-medium ${
                  step >= index + 1 ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
              {index < 2 && <div className="w-20 mx-4 h-0.5 bg-gray-200" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Truck className="w-6 h-6 text-[#F9B233]" />
                    Shipping Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { key: 'firstName', label: 'First Name', half: true },
                      { key: 'lastName', label: 'Last Name', half: true },
                      { key: 'email', label: 'Email', type: 'email', full: true },
                      { key: 'phone', label: 'Phone', type: 'tel', full: true },
                      { key: 'address', label: 'Street Address', full: true },
                      { key: 'city', label: 'City', half: true },
                      { key: 'state', label: 'State', half: true },
                      { key: 'zipCode', label: 'ZIP Code', half: true },
                    ].map((field) => (
                      <div key={field.key} className={field.full ? 'md:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        <input
                          type={field.type || 'text'}
                          value={shippingInfo[field.key as keyof typeof shippingInfo] as string}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, [field.key]: e.target.value })
                          }
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233] ${
                            errors[field.key] ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors[field.key] && (
                          <p className="text-red-500 text-sm mt-1">{errors[field.key]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-[#F9B233]" />
                    Payment Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233] ${
                          errors.cardNumber ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.nameOnCard}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, nameOnCard: e.target.value })
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233] ${
                          errors.nameOnCard ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.nameOnCard && (
                        <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentInfo.expiry}
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, expiry: e.target.value })
                          }
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233] ${
                            errors.expiry ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.expiry && (
                          <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                          }
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233] ${
                            errors.cvv ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.cvv && (
                          <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-6 text-sm text-gray-500">
                    <Lock className="w-4 h-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                  className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={isProcessing}
                  className="px-8 py-3 bg-[#F9B233] text-white rounded-lg font-semibold hover:bg-[#FF8A00] transition-colors disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : step === 2 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-4">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
