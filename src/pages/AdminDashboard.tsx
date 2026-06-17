import { motion } from 'framer-motion';
import { ShoppingBag, Users, Package, DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { products, reviews } from '../data';

const stats = [
  { label: 'Total Products', value: products.length, change: '+3', trend: 'up', icon: Package, color: 'bg-blue-500' },
  { label: 'Total Orders', value: '156', change: '+12%', trend: 'up', icon: ShoppingBag, color: 'bg-green-500' },
  { label: 'Total Users', value: '2,847', change: '+8%', trend: 'up', icon: Users, color: 'bg-purple-500' },
  { label: 'Revenue', value: '$48,290', change: '-2%', trend: 'down', icon: DollarSign, color: 'bg-[#F9B233]' },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Sarah Johnson', amount: 89.99, status: 'Delivered', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Michael Chen', amount: 124.50, status: 'Processing', date: '2024-01-14' },
  { id: 'ORD-003', customer: 'Emily Brown', amount: 34.99, status: 'Pending', date: '2024-01-14' },
  { id: 'ORD-004', customer: 'David Wilson', amount: 199.00, status: 'Shipped', date: '2024-01-13' },
];

export function AdminDashboard() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back, Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="py-3 font-medium">{order.id}</td>
                    <td className="py-3">{order.customer}</td>
                    <td className="py-3">${order.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
          </div>
          <div className="p-6 space-y-4">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.reviewCount} sales</p>
                </div>
                <p className="font-semibold">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="mt-8 bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reviews</h2>
        </div>
        <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{review.userName}</p>
                <div className="flex items-center gap-1 text-[#F9B233]">
                  {review.rating}.0
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
