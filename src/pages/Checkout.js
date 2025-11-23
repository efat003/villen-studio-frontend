// src/pages/Checkout.js - PREMIUM UPGRADE
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import axios from 'axios';

const Checkout = () => {
  const { items, totalAmount, totalItems } = useSelector(state => state.cart);
  const { user, token } = useSelector(state => state.auth);
  const { t } = useLanguage();
  const { addNotification } = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    division: '',
    district: '',
    upazila: '',
    address: '',
    postalCode: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const steps = [
    { id: 1, name: 'Shipping', status: 'current' },
    { id: 2, name: 'Payment', status: 'upcoming' },
    { id: 3, name: 'Confirmation', status: 'upcoming' }
  ];

  useEffect(() => {
    fetchBangladeshData();
    if (user?.addresses?.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
      setShippingAddress({
        name: defaultAddress.name,
        phone: defaultAddress.phone,
        division: defaultAddress.division,
        district: defaultAddress.district,
        upazila: defaultAddress.upazila,
        address: defaultAddress.address,
        postalCode: defaultAddress.postalCode
      });
    }
  }, [user]);

  const fetchBangladeshData = async () => {
    try {
      const bdData = {
        divisions: ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'],
        districts: districtsData,
        upazilas: upazilasData
      };
      
      setDivisions(bdData.divisions);
      setDistricts(bdData.districts[shippingAddress.division] || []);
      setUpazilas(bdData.upazilas[shippingAddress.district] || []);
    } catch (error) {
      console.error('Error fetching Bangladesh data:', error);
    }
  };

  const handleDivisionChange = (division) => {
    setShippingAddress({ ...shippingAddress, division, district: '', upazila: '' });
    setDistricts(districtsData[division] || []);
    setUpazilas([]);
  };

  const handleDistrictChange = (district) => {
    setShippingAddress({ ...shippingAddress, district, upazila: '' });
    setUpazilas(upazilasData[district] || []);
  };

  const validateShipping = () => {
    const required = ['name', 'phone', 'division', 'district', 'upazila', 'address', 'postalCode'];
    return required.every(field => shippingAddress[field].trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: items.map(item => ({
          product: item.product,
          quantity: item.quantity,
          size: item.size,
          color: item.color
        })),
        shippingAddress,
        paymentMethod,
        notes: ''
      };

      const response = await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const order = response.data.order;

      if (paymentMethod === 'cod') {
        dispatch(clearCart());
        addNotification('Order placed successfully!', 'success');
        navigate('/payment/success', { state: { orderId: order.orderId } });
      } else {
        const paymentResponse = await axios.post(
          `http://localhost:5000/api/payment/${paymentMethod}/create`,
          { orderId: order.orderId, amount: order.finalAmount },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (paymentResponse.data.success) {
          window.location.href = paymentResponse.data.paymentURL;
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      addNotification('Checkout failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const shippingFee = 60;
  const finalAmount = totalAmount + shippingFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Checkout
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Complete your purchase in just a few steps
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              {steps.map((step, stepIdx) => (
                <li
                  key={step.name}
                  className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} flex-1`}
                >
                  <div className="flex items-center">
                    <div
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                        step.id <= currentStep
                          ? 'bg-purple-600'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span className="text-white font-semibold">{step.id}</span>
                    </div>
                    {stepIdx !== steps.length - 1 && (
                      <div
                        className={`absolute top-4 left-8 -ml-px mt-0.5 h-0.5 w-16 sm:w-20 ${
                          step.id < currentStep ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    step.id <= currentStep
                      ? 'text-purple-600'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.name}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-8">
            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Shipping Information
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="01XXXXXXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Division *
                    </label>
                    <select
                      required
                      value={shippingAddress.division}
                      onChange={(e) => handleDivisionChange(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Division</option>
                      {divisions.map(division => (
                        <option key={division} value={division}>{division}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      District *
                    </label>
                    <select
                      required
                      value={shippingAddress.district}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select District</option>
                      {districts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Upazila *
                    </label>
                    <select
                      required
                      value={shippingAddress.upazila}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, upazila: e.target.value })}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Upazila</option>
                      {upazilas.map(upazila => (
                        <option key={upazila} value={upazila}>{upazila}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Address *
                  </label>
                  <textarea
                    required
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    rows="3"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Enter your complete address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter postal code"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Payment Method
              </h2>
              
              <div className="space-y-4">
                {[
                  { id: 'cod', name: 'Cash on Delivery', icon: '💰', description: 'Pay when you receive your order' },
                  { id: 'bkash', name: 'bKash', icon: '📱', description: 'Pay securely with bKash' },
                  { id: 'nagad', name: 'Nagad', icon: '💳', description: 'Pay securely with Nagad' }
                ].map((method) => (
                  <motion.label
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {method.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {method.description}
                      </div>
                    </div>
                  </motion.label>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={`${item.product}-${item.size}-${item.color}`} className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name.en} 
                      className="w-16 h-16 object-cover rounded-2xl shadow-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                        {item.name.en}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      ৳{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>৳{totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>৳{shippingFee}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>৳{finalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <motion.button
                type="submit"
                disabled={loading || !validateShipping()}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Place Order - ৳${finalAmount}`
                )}
              </motion.button>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-center space-x-6 text-gray-500 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="text-lg">🔒</div>
                    <span>SSL Secure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-lg">🛡️</div>
                    <span>Guaranteed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Sample Bangladesh data
const districtsData = {
  Dhaka: ['Dhaka', 'Gazipur', 'Narayanganj', 'Manikganj', 'Munshiganj'],
  Chittagong: ['Chittagong', 'Coxs Bazar', 'Rangamati', 'Bandarban'],
  Rajshahi: ['Rajshahi', 'Bogra', 'Pabna', 'Sirajganj'],
  Khulna: ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat'],
};

const upazilasData = {
  Dhaka: ['Dhamrai', 'Dohar', 'Keraniganj', 'Nawabganj', 'Savar'],
  Gazipur: ['Gazipur Sadar', 'Kaliakair', 'Kaliganj', 'Kapasia', 'Sreepur'],
  Chittagong: ['Chittagong Port', 'Double Mooring', 'Kotwali', 'Pahartali'],
};

export default Checkout;