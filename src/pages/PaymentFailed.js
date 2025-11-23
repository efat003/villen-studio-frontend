// src/pages/PaymentFailed.js - PREMIUM UPGRADE
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';

const PaymentFailed = () => {
  const { t } = useLanguage();
  const { addNotification } = useNotification();
  const location = useLocation();
  const errorMessage = location.state?.errorMessage || 'Your payment was not successful. Please try again.';

  React.useEffect(() => {
    addNotification('Payment failed. Please try again.', 'error');
  }, [addNotification]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-red-900/20 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center border border-red-200 dark:border-red-800"
      >
        {/* Error Icon */}
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-4xl"
          >
            ❌
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Payment Failed
        </motion.h1>

        {/* Error Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 dark:text-gray-400 mb-2 text-lg"
        >
          {errorMessage}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 dark:text-gray-500 text-sm mb-8"
        >
          Don't worry, your cart has been saved. You can try again with a different payment method.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <Link
            to="/checkout"
            className="block w-full bg-red-600 text-white py-4 px-6 rounded-2xl font-bold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Try Payment Again
          </Link>
          
          <Link
            to="/cart"
            className="block w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Back to Cart
          </Link>

          <Link
            to="/"
            className="block w-full text-red-600 dark:text-red-400 py-3 px-6 rounded-2xl font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>

        {/* Support Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Need help with your payment?
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="tel:+8801XXX-XXXXXX" className="text-red-600 hover:text-red-700 font-semibold">
              Call Support
            </a>
            <a href="mailto:support@fashionbd.com" className="text-red-600 hover:text-red-700 font-semibold">
              Email Support
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;