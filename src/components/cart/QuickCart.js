// src/components/cart/QuickCart.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

const QuickCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { addNotification } = useNotification();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      addNotification('Item removed from cart', 'info');
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <>
      {/* Quick Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-l-2xl shadow-2xl z-40 hover:shadow-xl transition-all"
      >
        <div className="flex items-center space-x-2">
          <span>🛒</span>
          {totalItems > 0 && (
            <span className="bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {totalItems}
            </span>
          )}
        </div>
      </button>

      {/* Quick Cart Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 border-l border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Your Cart ({totalItems})
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700 rounded-2xl p-4">
                        <img
                          src={item.images?.[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            ${item.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      Total: ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      window.location.href = '/cart';
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
                  >
                    View Full Cart
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuickCart;