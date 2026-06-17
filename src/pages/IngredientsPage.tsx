import { motion } from 'framer-motion';
import { Shield, Sun, Zap, Sparkles, Droplets } from 'lucide-react';
import { ingredients } from '../data';

const iconMap: { [key: string]: typeof Shield } = {
  Shield: Shield,
  Sun: Sun,
  Zap: Zap,
  Sparkles: Sparkles,
  Droplets: Droplets,
};

export function IngredientsPage() {
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
              Our Ingredients
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn about the powerful ingredients that make our sunscreens effective and safe for your skin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ingredients Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ingredients.map((ingredient, index) => {
              const Icon = iconMap[ingredient.icon] || Shield;
              return (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-[#FFF4D6] rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-[#F9B233]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {ingredient.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {ingredient.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ingredient.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Common Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is the difference between physical and chemical sunscreens?
              </h3>
              <p className="text-gray-600">
                Physical (mineral) sunscreens like Zinc Oxide and Titanium Dioxide sit on top of the skin and reflect UV rays. Chemical sunscreens absorb UV rays and convert them to heat. Both are effective - choose based on your skin type and preferences.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are your products reef-safe?
              </h3>
              <p className="text-gray-600">
                Yes! Our mineral sunscreens containing Zinc Oxide and Titanium Dioxide are reef-safe. We avoid oxybenzone and octinoxate, which can harm coral reefs.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What does "broad-spectrum" mean?
              </h3>
              <p className="text-gray-600">
                Broad-spectrum means the sunscreen protects against both UVA rays (which cause aging) and UVB rays (which cause burning). All our sunscreens provide broad-spectrum protection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
