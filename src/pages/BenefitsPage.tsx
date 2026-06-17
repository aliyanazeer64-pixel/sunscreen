import { motion } from 'framer-motion';
import { Shield, Sun, Sparkles, Droplets, Waves } from 'lucide-react';
import { benefits } from '../data';

const iconMap: { [key: string]: typeof Shield } = {
  Shield: Shield,
  Sun: Sun,
  Sparkles: Sparkles,
  Droplets: Droplets,
  Waves: Waves,
};

export function BenefitsPage() {
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
              Benefits of Sun Protection
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover why daily sun protection is essential for healthy, youthful skin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon] || Shield;
              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="h-3 bg-gradient-to-r from-[#F9B233] to-[#FF8A00]" />
                  <div className="p-8">
                    <div className="w-16 h-16 bg-[#FFF4D6] rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-[#F9B233]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-[#F9B233]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl font-bold mb-2">90%</p>
              <p className="text-white/80">of skin aging is caused by sun exposure</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-5xl font-bold mb-2">SPF 30</p>
              <p className="text-white/80">blocks 97% of UVB rays</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-5xl font-bold mb-2">SPF 50</p>
              <p className="text-white/80">blocks 98% of UVB rays</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-5xl font-bold mb-2">80%</p>
              <p className="text-white/80">reduction in skin cancer risk with daily SPF</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Daily Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Wear Sunscreen Every Day?
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  UV rays are present year-round, even on cloudy days and through windows. Daily sun protection is the single most effective way to maintain healthy, youthful skin.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#F9B233] flex-shrink-0 mt-0.5" />
                    <span>Prevents premature wrinkles and fine lines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#F9B233] flex-shrink-0 mt-0.5" />
                    <span>Reduces risk of skin cancer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#F9B233] flex-shrink-0 mt-0.5" />
                    <span>Prevents dark spots and hyperpigmentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#F9B233] flex-shrink-0 mt-0.5" />
                    <span>Maintains overall skin health and texture</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/assets/images/7.png"
                alt="Sun protection"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#F9B233] text-white rounded-2xl p-4 shadow-lg">
                <p className="text-2xl font-bold">365</p>
                <p className="text-sm">Days/Year Protection</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
