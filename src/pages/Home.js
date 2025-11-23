// src/pages/Home.js - MODERN VILLEN APPARELS
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Banner Components
import BannerSlider from '../components/home/BannerSlider';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Newsletter from '../components/home/Newsletter';
import Testimonials from '../components/home/Testimonials';


const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/10">
      {/* Main Banner Slider */}
      <BannerSlider />

      {/* Premium Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="py-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-gray-100 dark:border-slate-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Style Enthusiasts', icon: '✨', delay: 0 },
              { number: '5K+', label: 'Premium Products', icon: '👑', delay: 0.1 },
              { number: '100+', label: 'Designer Brands', icon: '🎨', delay: 0.2 },
              { number: '24/7', label: 'Style Support', icon: '💫', delay: 0.3 }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: stat.delay, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center group p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-600 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-slate-600"
              >
                <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Premium Categories */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/10 dark:from-slate-800 dark:via-slate-700/50 dark:to-purple-900/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6"
            >
              ✨ Premium Collections
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-6"
            >
              Curated Styles
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Discover Villen's exclusive collections crafted for the modern individual who values sophistication and contemporary elegance
            </motion.p>
          </div>
          <CategoryGrid />
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-sm font-medium mb-6"
            >
              🔥 Editor's Pick
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-6"
            >
              Featured Collection
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Handpicked pieces that embody Villen's commitment to exceptional craftsmanship, premium materials, and timeless design
            </motion.p>
          </div>
          <FeaturedProducts />
        </div>
      </motion.section>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />

      {/* Premium CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8"
          >
            🚀 Elevate Your Style Journey
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Embrace <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Villen Elegance</span>?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of sophisticated individuals who trust Villen Apparels for their premium fashion needs
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/products"
              className="group bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center gap-3"
            >
              <span>Explore Collection</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            
            <Link
              to="/about"
              className="group border-2 border-white/60 text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:border-white transform hover:-translate-y-1 flex items-center gap-3"
            >
              <span>Our Story</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-purple-200/70 mt-8"
          >
            Free shipping on orders over $99 • 30-day returns • Premium quality guarantee
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;