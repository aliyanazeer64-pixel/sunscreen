import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Tag, Percent, DollarSign } from 'lucide-react';
import { coupons as initialCoupons } from '../data';

export function AdminOffers() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Offers & Coupons</h1>
          <p className="text-gray-500">{coupons.filter((c) => c.active).length} active coupons</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#F9B233] text-white rounded-lg hover:bg-[#FF8A00] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Coupon
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon, index) => (
          <motion.div
            key={coupon.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl p-6 shadow-sm border-2 ${
              coupon.active ? 'border-green-200' : 'border-gray-200 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#F9B233]" />
                <span className="text-lg font-bold text-gray-900">{coupon.code}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                coupon.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {coupon.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              {coupon.type === 'percentage' ? (
                <Percent className="w-6 h-6 text-[#F9B233]" />
              ) : (
                <DollarSign className="w-6 h-6 text-[#F9B233]" />
              )}
              <span className="text-3xl font-bold text-gray-900">
                {coupon.type === 'percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
              </span>
              <span className="text-gray-500">off</span>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>Min. order: ${coupon.minOrder}</p>
              {coupon.maxDiscount && <p>Max. discount: ${coupon.maxDiscount}</p>}
              <p>Expires: {coupon.expiresAt}</p>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm('Deactivate this coupon?')) {
                    setCoupons(coupons.map((c) =>
                      c.code === coupon.code ? { ...c, active: !c.active } : c
                    ));
                  }
                }}
                className={`p-2 rounded-lg transition-colors ${
                  coupon.active
                    ? 'text-red-500 hover:bg-red-50'
                    : 'text-green-500 hover:bg-green-50'
                }`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-lg"
          >
            <h2 className="text-xl font-bold mb-4">Create New Coupon</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Coupon Code</label>
                <input
                  type="text"
                  placeholder="e.g., SUMMER20"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Discount Type</label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233]">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Discount Value</label>
                  <input
                    type="number"
                    placeholder="20"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Min. Order</label>
                  <input
                    type="number"
                    placeholder="50"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max. Discount (optional)</label>
                  <input
                    type="number"
                    placeholder="100"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233]"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#F9B233] text-white rounded-lg hover:bg-[#FF8A00] transition-colors"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
