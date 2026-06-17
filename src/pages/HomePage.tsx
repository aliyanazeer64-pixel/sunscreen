import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Shield, Droplets, Sparkles, Wind, Sun, Star, ArrowRight, Check, Mail } from 'lucide-react';
import { ProductCard, OfferBanner } from '../components';
import { products, reviews } from '../data';

const benefits = [
  { icon: Shield, title: 'UV Protection', description: 'Broad-spectrum protection against UVA and UVB rays' },
  { icon: Sparkles, title: 'Anti-Aging', description: 'Prevent premature aging and wrinkles' },
  { icon: Droplets, title: 'Moisturizing', description: 'Keep your skin hydrated all day' },
  { icon: Wind, title: 'Lightweight', description: 'Non-greasy formula that absorbs quickly' },
];

export function HomePage() {
  const [email, setEmail] = useState('');
  const featuredProducts = products.filter((p) => p.featured);
  const featuredReviews = reviews.slice(0, 3);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#FFF4D6] via-white to-[#FFF4D6]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#F9B233]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#FF8A00]/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#F9B233]/20 px-4 py-2 rounded-full mb-6">
                <Sun className="w-4 h-4 text-[#F9B233]" />
                <span className="text-sm font-medium text-[#F9B233]">Premium Sun Protection</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Protect Your Skin{' '}
                <span className="text-[#F9B233]">Every Day</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Discover our range of premium sunscreens designed to keep your skin safe, healthy, and glowing. Dermatologist recommended for all skin types.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#F9B233] text-white rounded-full font-semibold hover:bg-[#FF8A00] transition-colors shadow-lg shadow-[#F9B233]/30"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/skin-guide"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Find Your SPF
                </Link>
              </div>

              <div className="flex items-center gap-8 mt-10">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">50K+</p>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
                <div className="h-12 w-px bg-gray-300" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">4.9</p>
                  <p className="text-sm text-gray-500">Average Rating</p>
                </div>
                <div className="h-12 w-px bg-gray-300" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">100%</p>
                  <p className="text-sm text-gray-500">Natural Ingredients</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/3621101/pexels-photo-3621101.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Premium Sunscreen"
                  className="w-full rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F9B233] rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">SPF 50+</p>
                      <p className="text-sm text-gray-500">Broad Spectrum</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#F9B233] fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Top Rated</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center pt-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our best-selling sunscreens loved by thousands of customers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              View All Products
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SUNSCREEN?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our products are formulated with the highest quality ingredients for maximum protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#FFF4D6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-[#F9B233]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 bg-[#FFF4D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OfferBanner
            title="Summer Sale"
            subtitle="Get protection for your sunny days ahead"
            discount="Up to 30% OFF"
            ctaText="Shop Sale"
            ctaLink="/products? sale=true"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">Real reviews from real customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? 'text-[#F9B233] fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{review.comment}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F9B233] rounded-full flex items-center justify-center text-white font-semibold">
                    {review.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.userName}</p>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 text-[#F9B233] font-semibold hover:text-[#FF8A00] transition-colors"
            >
              Read More Reviews
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-12 h-12 text-[#F9B233] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Protected, Stay Updated
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Subscribe to our newsletter for exclusive deals, skincare tips, and new product launches.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F9B233]"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[#F9B233] text-white rounded-full font-semibold hover:bg-[#FF8A00] transition-colors"
              >
                Subscribe
              </button>
            </form>

            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
              <Check className="w-4 h-4 text-green-500" />
              <span>No spam, unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
