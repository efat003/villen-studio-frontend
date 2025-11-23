// src/pages/Orders.js - PREMIUM UPGRADE
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';

const Orders = () => {
  const { t } = useLanguage();
  const { addNotification } = useNotification();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setTimeout(() => {
          setOrders([
            {
              id: 'ORD-2024-001',
              date: '2024-01-15',
              status: 'delivered',
              total: 2499,
              items: [
                { name: 'Premium Cotton T-Shirt', quantity: 2, price: 999, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150' },
                { name: 'Designer Jeans', quantity: 1, price: 499, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150' }
              ]
            },
            {
              id: 'ORD-2024-002',
              date: '2024-01-10',
              status: 'shipped',
              total: 1599,
              items: [
                { name: 'Sports Shoes', quantity: 1, price: 1599, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150' }
              ]
            },
            {
              id: 'ORD-2024-003',
              date: '2024-01-05',
              status: 'processing',
              total: 799,
              items: [
                { name: 'Casual Cap', quantity: 1, price: 799, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=150' }
              ]
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      delivered: '✅',
      shipped: '🚚',
      processing: '⏳',
      cancelled: '❌'
    };
    return icons[status] || '📦';
  };

  const filteredOrders = orders.filter(order => 
    activeTab === 'all' || order.status === activeTab
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-6"></div>
            <div className="grid gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/6 mb-4"></div>
                  <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage your orders
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-2 mb-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex space-x-1">
            {[
              { id: 'all', name: 'All Orders', count: orders.length },
              { id: 'processing', name: 'Processing', count: orders.filter(o => o.status === 'processing').length },
              { id: 'shipped', name: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
              { id: 'delivered', name: 'Delivered', count: orders.filter(o => o.status === 'delivered').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-2xl text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>{tab.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-600'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {tab.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Orders List */}
        <AnimatePresence>
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {activeTab === 'all' 
                  ? "You haven't placed any orders yet."
                  : `You don't have any ${activeTab} orders.`
                }
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-purple-700 transition-colors"
              >
                <span>Start Shopping</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Order #{order.id}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                          <span className="mr-1">{getStatusIcon(order.status)}</span>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          ৳{order.total}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-2xl"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Quantity: {item.quantity} • ৳{item.price} each
                            </p>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ৳{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold">
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold">
                        Track Order
                      </button>
                      {order.status === 'delivered' && (
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors font-semibold">
                          Buy Again
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold">
                          Rate & Review
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Orders;