// src/pages/Cart.js - ENHANCED PREMIUM VERSION
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { addNotification } = useNotification();
  const [isRemoving, setIsRemoving] = useState(null);

  const handleRemoveItem = async (itemId) => {
    setIsRemoving(itemId);
    setTimeout(() => {
      removeFromCart(itemId);
      addNotification('Item removed from cart', 'info');
      setIsRemoving(null);
    }, 300);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const shippingFee = 5.99;
  const taxRate = 0.08;
  const subtotal = getCartTotal();
  const tax = subtotal * taxRate;
  const total = subtotal + shippingFee + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🛒</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <span>Start Shopping</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCart}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-4 lg:mt-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear Cart
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: isRemoving === item.id ? 0 : 1, 
                    scale: isRemoving === item.id ? 0.8 : 1,
                    x: isRemoving === item.id ? 100 : 0 
                  }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex space-x-4">
                    {/* Product Image */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="flex-shrink-0 relative"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-2xl shadow-md"
                      />
                      {item.discount > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{item.discount}%
                        </div>
                      )}
                    </motion.div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white hover:text-purple-600 transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {item.selectedSize && (
                          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Size: {item.selectedSize}</span>
                        )}
                        {item.selectedColor && (
                          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Color: {item.selectedColor}</span>
                        )}
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-2xl p-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-white dark:bg-gray-600 shadow-sm flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                          >
                            -
                          </motion.button>
                          <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-white dark:bg-gray-600 shadow-sm flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                          >
                            +
                          </motion.button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-bold text-lg text-gray-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-gray-500">
                              ${item.price} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, color: "#ef4444" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemoveItem(item.id)}
                      className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sticky top-24 border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>${shippingFee}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <motion.div className="space-y-3">
                <Link
                  to="/checkout"
                  className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
                >
                  Proceed to Checkout
                </Link>
                
                <Link
                  to="/"
                  className="block w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                >
                  Continue Shopping
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <div className="flex justify-center space-x-6 text-gray-500">
                  <div className="text-center">
                    <div className="text-2xl">🚚</div>
                    <div className="text-xs mt-1">Free Shipping</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">↩️</div>
                    <div className="text-xs mt-1">30-Day Returns</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">🔒</div>
                    <div className="text-xs mt-1">Secure Payment</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;