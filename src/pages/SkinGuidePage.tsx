import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind, Flame, Layers, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components';
import { products } from '../data';
import { SkinType } from '../types';

const skinTypes = [
  {
    type: 'oily' as SkinType,
    title: 'Oily Skin',
    icon: Droplets,
    color: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    description: 'Characterized by excess sebum production, oily skin often appears shiny and may be prone to acne and enlarged pores.',
    characteristics: ['Shiny appearance', 'Enlarged pores', 'Prone to acne', 'Blackheads and whiteheads'],
    recommendations: ['Look for oil-free formulas', 'Choose matte-finish sunscreens', 'Opt for gel or lightweight textures', 'Avoid heavy creams'],
  },
  {
    type: 'dry' as SkinType,
    title: 'Dry Skin',
    icon: Wind,
    color: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    description: 'Dry skin lacks natural moisture and may feel tight, rough, or flaky. It benefits from hydrating and nourishing products.',
    characteristics: ['Tight feeling', 'Rough texture', 'Visible flakes', 'Dull complexion'],
    recommendations: ['Choose hydrating formulas', 'Look for ingredients like hyaluronic acid', 'Opt for cream or lotion textures', 'Avoid alcohol-based products'],
  },
  {
    type: 'sensitive' as SkinType,
    title: 'Sensitive Skin',
    icon: Flame,
    color: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-600',
    description: 'Sensitive skin reacts easily to products and environmental factors, often experiencing redness, irritation, or stinging.',
    characteristics: ['Easily irritated', 'Reactive to products', 'Redness and flushing', 'Stinging or burning sensations'],
    recommendations: ['Choose mineral sunscreens', 'Look for fragrance-free options', 'Opt for hypoallergenic formulas', 'Patch test before use'],
  },
  {
    type: 'combination' as SkinType,
    title: 'Combination Skin',
    icon: Layers,
    color: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    description: 'Combination skin has both oily and dry areas, typically with an oily T-zone and drier cheeks.',
    characteristics: ['Oily T-zone', 'Dry cheeks', 'Uneven skin texture', 'Mix of concerns'],
    recommendations: ['Use balanced formulas', 'Consider different products for different areas', 'Look for non-comedogenic options', 'Focus on lightweight textures'],
  },
];

export function SkinGuidePage() {
  const [activeType, setActiveType] = useState<SkinType>('oily');
  const activeSkinInfo = skinTypes.find((s) => s.type === activeType)!;
  const recommendedProducts = products.filter((p) => p.skinTypes.includes(activeType));

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF4D6] to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect SPF
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the ideal sunscreen for your skin type. Our guide helps you understand what your skin needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skin Type Selector */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skinTypes.map((skin) => (
              <motion.button
                key={skin.type}
                onClick={() => setActiveType(skin.type)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  activeType === skin.type
                    ? `${skin.borderColor} ${skin.color} shadow-lg`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl ${skin.color} flex items-center justify-center mx-auto mb-3`}>
                  <skin.icon className={`w-7 h-7 ${skin.textColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{skin.title}</h3>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Skin Type Details */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${activeSkinInfo.color} rounded-3xl p-8 border ${activeSkinInfo.borderColor}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm`}>
                  <activeSkinInfo.icon className={`w-8 h-8 ${activeSkinInfo.textColor}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{activeSkinInfo.title}</h2>
                  <p className="text-gray-600">Characteristics & Care</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">{activeSkinInfo.description}</p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Signs & Characteristics</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {activeSkinInfo.characteristics.map((char) => (
                      <div key={char} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
                        <Check className={`w-4 h-4 ${activeSkinInfo.textColor}`} />
                        <span className="text-sm text-gray-700">{char}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Sunscreen Tips</h3>
                  <ul className="space-y-2">
                    {activeSkinInfo.recommendations.map((rec) => (
                      <li key={rec} className="flex items-center gap-2 text-gray-700">
                        <ArrowRight className={`w-4 h-4 ${activeSkinInfo.textColor}`} />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Recommended Products
              </h3>
              <div className="grid gap-6">
                {recommendedProducts.slice(0, 3).map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
              <Link
                to={`/products?skinType=${activeType}`}
                className="inline-flex items-center gap-2 mt-6 text-[#F9B233] font-semibold hover:text-[#FF8A00] transition-colors"
              >
                View All Products for {activeSkinInfo.title}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            General Sun Protection Tips
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#FFF4D6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#F9B233]">15+</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Use SPF 15 or Higher</h3>
              <p className="text-gray-600">Choose broad-spectrum sunscreen with at least SPF 15 for daily protection.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#FFF4D6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#F9B233]">30</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Apply 30 Minutes Before</h3>
              <p className="text-gray-600">Apply sunscreen 30 minutes before sun exposure for best absorption.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#FFF4D6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#F9B233]">2h</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reapply Every 2 Hours</h3>
              <p className="text-gray-600">Reapply every two hours and after swimming or sweating.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
