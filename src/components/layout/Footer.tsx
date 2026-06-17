import { Link } from 'react-router-dom';
import { Sun, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sun className="w-8 h-8 text-[#F9B233]" />
              <span className="text-xl font-bold text-white">SUNSCREEN</span>
            </Link>
            <p className="text-sm mb-4">
              Protect Your Skin Every Day. Premium sun protection products for all skin types.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#F9B233] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#F9B233] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#F9B233] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#F9B233] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="hover:text-[#F9B233] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/skin-guide" className="hover:text-[#F9B233] transition-colors">
                  Skin Type Guide
                </Link>
              </li>
              <li>
                <Link to="/ingredients" className="hover:text-[#F9B233] transition-colors">
                  Ingredients
                </Link>
              </li>
              <li>
                <Link to="/benefits" className="hover:text-[#F9B233] transition-colors">
                  Benefits
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-[#F9B233] transition-colors">
                  Customer Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="hover:text-[#F9B233] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-[#F9B233] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#F9B233] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#F9B233] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F9B233] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F9B233] flex-shrink-0 mt-0.5" />
                <span>123 Sunshine Avenue, Beach City, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F9B233] flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#F9B233] flex-shrink-0" />
                <span>support@sunscreen.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2024 SUNSCREEN. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[#F9B233]">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-[#F9B233]">
              Terms
            </Link>
            <Link to="/cookies" className="hover:text-[#F9B233]">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
