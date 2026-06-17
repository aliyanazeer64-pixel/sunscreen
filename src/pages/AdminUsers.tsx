import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, Calendar } from 'lucide-react';

const users = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'user', orders: 5, joined: '2023-06-15' },
  { id: '2', name: 'Michael Chen', email: 'michael@example.com', role: 'user', orders: 3, joined: '2023-07-22' },
  { id: '3', name: 'Emily Brown', email: 'emily@example.com', role: 'user', orders: 8, joined: '2023-08-10' },
  { id: '4', name: 'David Wilson', email: 'david@example.com', role: 'user', orders: 2, joined: '2023-09-05' },
  { id: '5', name: 'Lisa Anderson', email: 'lisa@example.com', role: 'user', orders: 6, joined: '2023-10-18' },
  { id: '6', name: 'John Smith', email: 'john@example.com', role: 'user', orders: 4, joined: '2023-11-30' },
  { id: '7', name: 'Admin', email: 'admin@sunscreen.com', role: 'admin', orders: 0, joined: '2023-01-01' },
];

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (roleFilter ? user.role === roleFilter : true)
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500">{users.length} registered users</p>
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
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233]"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9B233]"
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                user.role === 'admin' ? 'bg-[#F9B233]' : 'bg-gray-700'
              }`}>
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-4 h-4" />
                Joined {user.joined}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                user.role === 'admin'
                  ? 'bg-[#FFF4D6] text-[#F9B233]'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {user.role}
              </span>
            </div>
            {user.role === 'user' && (
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Orders</span>
                <span className="font-semibold">{user.orders}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
