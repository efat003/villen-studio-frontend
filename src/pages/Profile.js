// src/pages/Profile.js - PREMIUM UPGRADE
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, updateProfile } from '../redux/slices/authSlice';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const { t } = useLanguage();
  const { addNotification } = useNotification();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    language: 'en'
  });
  const [addressForm, setAddressForm] = useState({
    type: 'home',
    name: '',
    phone: '',
    division: '',
    district: '',
    upazila: '',
    address: '',
    postalCode: '',
    isDefault: false
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        language: user.language || 'en'
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(updateProfile(formData)).unwrap();
      addNotification('Profile updated successfully!', 'success');
    } catch (error) {
      addNotification('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Implement address add logic
      addNotification('Address added successfully!', 'success');
      setAddressForm({
        type: 'home',
        name: '',
        phone: '',
        division: '',
        district: '',
        upazila: '',
        address: '',
        postalCode: '',
        isDefault: false
      });
    } catch (error) {
      addNotification('Failed to add address', 'error');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'addresses', name: 'Addresses', icon: '📍' },
    { id: 'orders', name: 'Orders', icon: '📦' },
    { id: 'wishlist', name: 'Wishlist', icon: '❤️' }
  ];

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
            My Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your profile, addresses, and orders
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 sticky top-24">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  {user?.name || 'User'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {user?.email}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
            >
              <AnimatePresence mode="wait">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Profile Information
                    </h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-2xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            disabled
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 bg-gray-100 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                            placeholder="01XXXXXXXXX"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Preferred Language
                          </label>
                          <select
                            value={formData.language}
                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="en">English</option>
                            <option value="bn">Bangla</option>
                          </select>
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {loading ? 'Updating...' : 'Update Profile'}
                      </motion.button>
                    </form>
                  </motion.div>
                )}

                {/* Addresses Tab */}
                {activeTab === 'addresses' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Saved Addresses
                      </h2>
                      <button
                        onClick={() => setActiveTab('add-address')}
                        className="bg-purple-600 text-white px-6 py-2 rounded-2xl font-semibold hover:bg-purple-700 transition-colors"
                      >
                        Add New Address
                      </button>
                    </div>

                    {user?.addresses?.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {user.addresses.map((address, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-2 border-gray-200 dark:border-gray-600 rounded-2xl p-6 hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="font-bold text-gray-900 dark:text-white capitalize">
                                {address.type}
                              </h3>
                              {address.isDefault && (
                                <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                              {address.name}<br />
                              {address.phone}<br />
                              {address.address}<br />
                              {address.upazila}, {address.district}, {address.division}<br />
                              {address.postalCode}
                            </p>
                            <div className="flex space-x-3 mt-4">
                              <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-700 text-sm font-semibold">
                                Delete
                              </button>
                              {!address.isDefault && (
                                <button className="text-green-600 hover:text-green-700 text-sm font-semibold">
                                  Set Default
                                </button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                          <span className="text-3xl">📍</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          No addresses saved
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Add your first address to get started with faster checkout.
                        </p>
                        <button
                          onClick={() => setActiveTab('add-address')}
                          className="bg-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-purple-700 transition-colors"
                        >
                          Add Your First Address
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Order History
                    </h2>
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">📦</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        No orders yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        When you place orders, they will appear here.
                      </p>
                      <button
                        onClick={() => window.location.href = '/'}
                        className="bg-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-purple-700 transition-colors"
                      >
                        Start Shopping
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Wishlist Tab */}
                {activeTab === 'wishlist' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      My Wishlist
                    </h2>
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">❤️</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Your wishlist is empty
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Save items you love for later.
                      </p>
                      <button
                        onClick={() => window.location.href = '/'}
                        className="bg-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-purple-700 transition-colors"
                      >
                        Explore Products
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;