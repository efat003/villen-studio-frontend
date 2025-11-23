// src/pages/PaymentSuccess.js - ENHANCED PREMIUM
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';

const PaymentSuccess = () => {
  const { t } = useLanguage();
  const { addNotification } = useNotification();
  const location = useLocation();
  const orderId = location.state?.orderId || 'N/A';
  const orderTotal = location.state?.orderTotal || '0.00';

  useEffect(() => {
    addNotification('Payment successful! Order confirmed.', 'success');
  }, [addNotification]);

  const confettiElements = Array.from({ length: 50 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
      initial={{
        x: Math.random() * window.innerWidth,
        y: -20,
        scale: 0
      }}
      animate={{
        y: window.innerHeight,
        scale: [0, 1, 0],
        rotate: Math.random() * 360
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2
      }}
    />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-green-900/20 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Animated Confetti */}
      {confettiElements}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center relative z-10 border border-green-200 dark:border-green-800"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-4xl text-white"
          >
            ✓
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Payment Successful!
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 dark:text-gray-400 mb-2 text-lg"
        >
          Thank you for your order.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 dark:text-gray-400 mb-8"
        >
          Your order has been placed successfully and will be shipped soon.
        </motion.p>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 mb-8 border border-green-100 dark:border-green-800"
        >
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-left">
              <p className="text-gray-600 dark:text-gray-400">Order ID</p>
              <p className="font-bold text-gray-900 dark:text-white text-lg">{orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600 dark:text-gray-400">Total Amount</p>
              <p className="font-bold text-gray-900 dark:text-white text-lg">${orderTotal}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              A confirmation email has been sent to your email address.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <Link
            to="/orders"
            className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            View Order Details
          </Link>
          
          <Link
            to="/"
            className="block w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>

        {/* Support Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Need help with your order?
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="tel:+8801XXX-XXXXXX" className="text-green-600 hover:text-green-700 font-semibold">
              Call Support
            </a>
            <a href="mailto:support@fashionbd.com" className="text-green-600 hover:text-green-700 font-semibold">
              Email Support
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;