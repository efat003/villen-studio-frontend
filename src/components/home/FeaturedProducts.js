// src/components/home/FeaturedProducts.js - MODERN VILLEN STUDIO VERSION
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // BDT Conversion rate
  const USD_TO_BDT = 117.50;

  const formatPriceBDT = (usdPrice) => {
    const bdtPrice = usdPrice * USD_TO_BDT;
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(bdtPrice);
  };

  const featuredProducts = [
    {
      id: 1,
      name: "Villen Signature Blazer",
      subtitle: "Premium Tailored Collection",
      category: "mens",
      price: 129.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80",
      hoverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
      rating: 4.8,
      discount: 35,
      tags: ["Premium Cotton", "Tailored Fit", "Wrinkle Free"],
      color: "navy",
      sizes: ["S", "M", "L", "XL"],
      colors: ["#1e3a8a", "#374151", "#000000"],
      stock: 15,
      featured: true,
      bestseller: true
    },
    {
      id: 2,
      name: "Heritage Silk Saree",
      subtitle: "Traditional Elegance Redefined",
      category: "womens",
      price: 89.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1585487000113-7e7f781de03c?w=600&auto=format&fit=crop&q=80",
      hoverImage: "https://images.unsplash.com/photo-1585487000157-97f0e6b6bf7c?w=600&auto=format&fit=crop&q=80",
      rating: 4.9,
      discount: 40,
      tags: ["Pure Silk", "Handcrafted", "Traditional"],
      color: "maroon",
      sizes: ["One Size"],
      colors: ["#991b1b", "#7c2d12", "#581c87"],
      stock: 8,
      featured: true,
      new: true
    },
    {
      id: 3,
      name: "Urban Denim Jacket",
      subtitle: "Street Style Essential",
      category: "unisex",
      price: 79.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&auto=format&fit=crop&q=80",
      hoverImage: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&auto=format&fit=crop&q=80",
      rating: 4.7,
      discount: 33,
      tags: ["Vintage Wash", "Sustainable", "Oversized Fit"],
      color: "blue",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["#1e40af", "#1e3a8a", "#172554"],
      stock: 22,
      featured: true
    },
    {
      id: 4,
      name: "Artisan Leather Bag",
      subtitle: "Handcrafted Luxury",
      category: "accessories",
      price: 159.99,
      originalPrice: 229.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
      hoverImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
      rating: 4.9,
      discount: 30,
      tags: ["Genuine Leather", "Hand Stitched", "Lifetime Warranty"],
      color: "brown",
      sizes: ["One Size"],
      colors: ["#78350f", "#92400e", "#451a03"],
      stock: 12,
      featured: true,
      limited: true
    },
    {
      id: 5,
      name: "Classic Oxford Shirt",
      subtitle: "Office & Casual Wear",
      category: "mens",
      price: 49.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&auto=format&fit=crop&q=80",
      hoverImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
      rating: 4.6,
      discount: 37,
      tags: ["100% Cotton", "Non-Iron", "Classic Fit"],
      color: "white",
      sizes: ["S", "M", "L", "XL"],
      colors: ["#f8fafc", "#f1f5f9", "#e2e8f0"],
      stock: 45,
      featured: false
    },
    {
      id: 6,
      name: "Embroidered Kurti Set",
      subtitle: "Contemporary Ethnic Wear",
      category: "womens",
      price: 69.99,
      originalPrice: 109.99,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80",
      hoverImage: "https://images.unsplash.com/photo-1585487000127-1a3d9a5c2416?w=600&auto=format&fit=crop&q=80",
      rating: 4.8,
      discount: 36,
      tags: ["Hand Embroidery", "Comfort Fit", "Machine Wash"],
      color: "green",
      sizes: ["S", "M", "L", "XL"],
      colors: ["#065f46", "#047857", "#064e3b"],
      stock: 18,
      featured: false,
      new: true
    },
    {
      id: 7,
      name: "Sport Performance Tee",
      subtitle: "Active Lifestyle Collection",
      category: "unisex",
      price: 34.99,
      originalPrice: 54.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80",
      hoverImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80",
      rating: 4.5,
      discount: 36,
      tags: ["Moisture Wicking", "Quick Dry", "Breathable"],
      color: "black",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["#000000", "#1f2937", "#374151"],
      stock: 67,
      featured: false
    },
    {
      id: 8,
      name: "Minimalist Watch",
      subtitle: "Timeless Elegance",
      category: "accessories",
      price: 119.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
      hoverImage: "https://images.unsplash.com/photo-1547996160-81dfd58739cc?w=600&auto=format&fit=crop&q=80",
      rating: 4.9,
      discount: 33,
      tags: ["Stainless Steel", "Water Resistant", "2-Year Warranty"],
      color: "silver",
      sizes: ["Adjustable"],
      colors: ["#6b7280", "#9ca3af", "#d1d5db"],
      stock: 9,
      featured: false,
      limited: true
    }
  ];

  const filters = [
    { key: 'all', label: 'All Products', count: featuredProducts.length },
    { key: 'featured', label: 'Featured', count: featuredProducts.filter(p => p.featured).length },
    { key: 'mens', label: "Men's", count: featuredProducts.filter(p => p.category === 'mens').length },
    { key: 'womens', label: "Women's", count: featuredProducts.filter(p => p.category === 'womens').length },
    { key: 'accessories', label: 'Accessories', count: featuredProducts.filter(p => p.category === 'accessories').length }
  ];

  const filteredProducts = featuredProducts.filter(product => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return product.featured;
    return product.category === activeFilter;
  });

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.svg
            key={star}
            className={`w-3 h-3 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </motion.svg>
        ))}
        <span className="text-xs text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  const StockIndicator = ({ stock }) => {
    const getStockColor = (stock) => {
      if (stock > 20) return 'text-green-600 bg-green-50';
      if (stock > 10) return 'text-yellow-600 bg-yellow-50';
      return 'text-red-600 bg-red-50';
    };

    const getStockText = (stock) => {
      if (stock > 20) return 'In Stock';
      if (stock > 10) return 'Low Stock';
      return 'Almost Gone';
    };

    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStockColor(stock)}`}>
        <div className={`w-1.5 h-1.5 rounded-full mr-1 ${stock > 20 ? 'bg-green-500' : stock > 10 ? 'bg-yellow-500' : 'bg-red-500'}`} />
        {getStockText(stock)}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Featured Collection
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Discover our carefully curated selection of premium fashion pieces, crafted for the modern Bangladeshi lifestyle.
        </motion.p>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.key
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
              <span className="ml-2 text-xs opacity-70">({filter.count})</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Products Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <Link to={`/product/${product.id}`}>
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  {/* Base Image */}
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    animate={{ 
                      scale: hoveredProduct === product.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Hover Image */}
                  <motion.img
                    src={product.hoverImage}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredProduct === product.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Overlay with Actions */}
                  <motion.div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"
                    initial={false}
                    animate={{ 
                      backgroundColor: hoveredProduct === product.id ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0)'
                    }}
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.discount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                      >
                        -{product.discount}%
                      </motion.div>
                    )}
                    {product.bestseller && (
                      <div className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        Bestseller
                      </div>
                    )}
                    {product.new && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        New
                      </div>
                    )}
                    {product.limited && (
                      <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        Limited
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <motion.div
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{ 
                      opacity: hoveredProduct === product.id ? 1 : 0 
                    }}
                  >
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                      ♡
                    </button>
                  </motion.div>

                  {/* Color Options */}
                  <motion.div
                    className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{ 
                      opacity: hoveredProduct === product.id ? 1 : 0 
                    }}
                  >
                    <div className="flex gap-1">
                      {product.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border border-white shadow-md"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  {/* Category */}
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {product.category}
                  </div>

                  {/* Name & Subtitle */}
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-gray-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Rating & Stock */}
                  <div className="flex items-center justify-between">
                    <StarRating rating={product.rating} />
                    <StockIndicator stock={product.stock} />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {product.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price Section */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-gray-900">
                        {formatPriceBDT(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPriceBDT(product.originalPrice)}
                        </div>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Size Options */}
                  <motion.div
                    className="grid grid-cols-5 gap-1 pt-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredProduct === product.id ? 1 : 0,
                      height: hoveredProduct === product.id ? 'auto' : 0
                    }}
                  >
                    {product.sizes.map((size, i) => (
                      <div
                        key={i}
                        className="text-xs text-center py-1 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer transition-colors"
                      >
                        {size}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12"
      >
        <Link
          to="/products"
          className="inline-flex items-center px-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
        >
          View All Products
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
};

export default FeaturedProducts;