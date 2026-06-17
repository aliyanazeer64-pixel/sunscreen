import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Timer } from 'lucide-react';

interface OfferBannerProps {
  title: string;
  subtitle: string;
  discount?: string;
  ctaText?: string;
  ctaLink?: string;
  variant?: 'primary' | 'secondary';
  endDate?: Date;
}

export function OfferBanner({
  title,
  subtitle,
  discount,
  ctaText = 'Shop Now',
  ctaLink = '/products',
  variant = 'primary',
}: OfferBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl p-6 md:p-8 ${
        variant === 'primary'
          ? 'bg-gradient-to-r from-[#F9B233] to-[#FF8A00]'
          : 'bg-gradient-to-r from-[#FFF4D6] to-[#FFE4B5]'
      }`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
            <Timer className={`w-5 h-5 ${variant === 'primary' ? 'text-white' : 'text-[#F9B233]'}`} />
            <span className={`text-sm font-medium ${variant === 'primary' ? 'text-white/90' : 'text-[#F9B233]'}`}>
              Limited Time Offer
            </span>
          </div>
          <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${variant === 'primary' ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className={`text-lg ${variant === 'primary' ? 'text-white/90' : 'text-gray-600'}`}>
            {subtitle}
          </p>
          {discount && (
            <div className={`text-4xl md:text-5xl font-extrabold mt-2 ${variant === 'primary' ? 'text-white' : 'text-[#F9B233]'}`}>
              {discount}
            </div>
          )}
        </div>

        <Link
          to={ctaLink}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${
            variant === 'primary'
              ? 'bg-white text-[#FF8A00] hover:bg-gray-100'
              : 'bg-[#F9B233] text-white hover:bg-[#FF8A00]'
          }`}
        >
          {ctaText}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
