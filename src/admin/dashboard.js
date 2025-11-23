// src/admin/Dashboard.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminAPI } from '../utils/api';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const result = await adminAPI.getDashboardData();
      if (result.success) {
        setDashboardData(result.data);
      }
    } catch (error) {
      console.error('Data load error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">ডাটা লোড হচ্ছে...</div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">ডাটা লোড করতে সমস্যা</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900">ড্যাশবোর্ড</h1>
            <p className="text-gray-600">আপনার বিজনেসের সাম্প্রতিক অবস্থা</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="মোট বিক্রয়"
              value={`৳${dashboardData.totalRevenue.toLocaleString()}`}
              icon="💰"
              color="green"
              description="মোট আয়"
            />
            <StatsCard
              title="মোট অর্ডার"
              value={dashboardData.totalOrders}
              icon="📦"
              color="blue"
              description="সকল অর্ডার"
            />
            <StatsCard
              title="প্রোডাক্ট"
              value={dashboardData.totalProducts}
              icon="👕"
              color="purple"
              description="মোট প্রোডাক্ট"
            />
            <StatsCard
              title="কাস্টমার"
              value={dashboardData.totalCustomers}
              icon="👥"
              color="orange"
              description="নিবন্ধিত কাস্টমার"
            />
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <div className="flex items-center">
                <div className="text-2xl mr-4">⏳</div>
                <div>
                  <div className="text-2xl font-bold text-yellow-800">
                    {dashboardData.stats.pendingOrders}
                  </div>
                  <div className="text-yellow-600">Pending Orders</div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-center">
                <div className="text-2xl mr-4">✅</div>
                <div>
                  <div className="text-2xl font-bold text-green-800">
                    {dashboardData.stats.completedOrders}
                  </div>
                  <div className="text-green-600">Completed Orders</div>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <div className="flex items-center">
                <div className="text-2xl mr-4">⚠️</div>
                <div>
                  <div className="text-2xl font-bold text-red-800">
                    {dashboardData.stats.lowStockProducts}
                  </div>
                  <div className="text-red-600">Low Stock</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">সাম্প্রতিক অর্ডার</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">অর্ডার আইডি</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">কাস্টমার</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">পরিমাণ</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentOrders.map((order) => (
                    <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-gray-900 font-medium">#{order._id}</td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{order.customer.name}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-900 font-semibold">৳{order.totalAmount}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status === 'completed' ? '✅ Completed' : '⏳ Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

// Stats Card Component (inline definition)
const StatsCard = ({ title, value, icon, color, description }) => {
  const colorClasses = {
    green: 'bg-green-50 border-green-200 text-green-800',
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
    orange: 'bg-orange-50 border-orange-200 text-orange-800'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`rounded-xl p-6 border-2 ${colorClasses[color]} shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          <p className="text-xs opacity-70 mt-1">{description}</p>
        </div>
        <div className="text-3xl opacity-80">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;