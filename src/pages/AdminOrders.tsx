import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye } from 'lucide-react';

const orders = [
  { id: 'ORD-001', customer: 'Sarah Johnson', email: 'sarah@example.com', amount: 89.99, status: 'delivered', date: '2024-01-15', items: 3 },
  { id: 'ORD-002', customer: 'Michael Chen', email: 'michael@example.com', amount: 124.50, status: 'processing', date: '2024-01-14', items: 2 },
  { id: 'ORD-003', customer: 'Emily Brown', email: 'emily@example.com', amount: 34.99, status: 'pending', date: '2024-01-14', items: 1 },
  { id: 'ORD-004', customer: 'David Wilson', email: 'david@example.com', amount: 199.00, status: 'shipped', date: '2024-01-13', items: 4 },
  { id: 'ORD-005', customer: 'Lisa Anderson', email: 'lisa@example.com', amount: 67.50, status: 'delivered', date: '2024-01-12', items: 2 },
  { id: 'ORD-006', customer: 'John Smith', email: 'john@example.com', amount: 156.00, status: 'cancelled', date: '2024-01-11', items: 3 },
];

const statusColors: { [key: string]: string } = {
  delivered: 'bg-green-100 text-green-700',
  processing: 'bg-blue-100 text-blue-700',
  pending: 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-purple-100 text-purple-700',
  cancelled: 'bg-red-100 text-red-700',
};

export function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const filteredOrders = orders.filter(
    (order) =>
      (order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter ? order.status === statusFilter : true)
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500">{orders.length} orders total</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID or customer..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233]"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-gray-600">{order.items} items</td>
                  <td className="px-6 py-4 font-medium">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-gray-600 hover:text-[#F9B233] transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Customer</label>
                <p className="font-medium">{selectedOrder.customer}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium">{selectedOrder.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Order Date</label>
                <p className="font-medium">{selectedOrder.date}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Total Amount</label>
                <p className="font-medium">${selectedOrder.amount.toFixed(2)}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-2">Update Status</label>
                <select
                  defaultValue={selectedOrder.status}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233]"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button
                className="w-full py-2 bg-[#F9B233] text-white rounded-lg hover:bg-[#FF8A00] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
