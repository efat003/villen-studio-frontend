// src/pages/Shoes.js - BANGLADESHI SHOES COLLECTION
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';

const Shoes = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addNotification } = useNotification();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [viewMode, setViewMode] = useState('grid');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Bangladeshi Shoes Products Data
  const shoesProducts = [
    {
      id: 1,
      name: "Premium Running Shoes",
      brand: "Apex",
      category: "sports",
      price: 2499,
      originalPrice: 3499,
      discount: 29,
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["7", "8", "9", "10", "11"],
      colors: [
        { name: "Blue", hex: "#2563eb" },
        { name: "Black", hex: "#000000" },
        { name: "Red", hex: "#dc2626" }
      ],
      description: "High-performance running shoes with advanced cushioning technology. Perfect for athletes and fitness enthusiasts.",
      features: ["Air Cushion", "Breathable Mesh", "Non-Slip Sole", "Lightweight"],
      stock: 35,
      rating: 4.7,
      reviewCount: 189,
      featured: true,
      freeShipping: true,
      returnPolicy: 7
    },
    {
      id: 2,
      name: "Classic Leather Formal Shoes",
      brand: "LeatherCraft",
      category: "formal",
      price: 3299,
      originalPrice: 4299,
      discount: 23,
      images: [
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["7", "8", "9", "10", "11"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Brown", hex: "#92400e" },
        { name: "Dark Brown", hex: "#78350f" }
      ],
      description: "Elegant leather formal shoes with premium finish. Perfect for office wear and formal occasions.",
      features: ["Genuine Leather", "Comfort Insole", "Classic Design", "Durable"],
      stock: 22,
      rating: 4.8,
      reviewCount: 134,
      bestseller: true,
      freeShipping: true
    },
    {
      id: 3,
      name: "Casual Sneakers",
      brand: "Urban Step",
      category: "casual",
      price: 1799,
      originalPrice: 2499,
      discount: 28,
      images: [
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["6", "7", "8", "9", "10", "11"],
      colors: [
        { name: "White", hex: "#ffffff" },
        { name: "Black", hex: "#000000" },
        { name: "Gray", hex: "#6b7280" },
        { name: "Blue", hex: "#3b82f6" }
      ],
      description: "Comfortable casual sneakers for everyday wear. Stylish design with excellent comfort.",
      features: ["Comfort Fit", "Rubber Sole", "Casual Style", "Easy to Clean"],
      stock: 48,
      rating: 4.5,
      reviewCount: 267,
      isNew: true,
      freeShipping: true
    },
    {
      id: 4,
      name: "Sports Sandals",
      brand: "Comfort Walk",
      category: "sandals",
      price: 1299,
      originalPrice: 1799,
      discount: 28,
      images: [
        "https://images.unsplash.com/photo-1560769684-55015cee73a8?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["7", "8", "9", "10"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Blue", hex: "#2563eb" },
        { name: "Gray", hex: "#6b7280" }
      ],
      description: "Comfortable sports sandals with adjustable straps. Perfect for casual outings and light activities.",
      features: ["Adjustable Straps", "Comfort Footbed", "Lightweight", "Quick Dry"],
      stock: 31,
      rating: 4.4,
      reviewCount: 156,
      featured: true,
      freeShipping: false
    },
    {
      id: 5,
      name: "Designer Heels",
      brand: "Elegance",
      category: "heels",
      price: 1899,
      originalPrice: 2599,
      discount: 27,
      images: [
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["6", "7", "8", "9"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Nude", hex: "#fbcfe8" },
        { name: "Red", hex: "#dc2626" }
      ],
      description: "Elegant designer heels for special occasions. Comfortable height with stylish design.",
      features: ["Comfort Height", "Sturdy Heel", "Elegant Design", "Party Wear"],
      stock: 19,
      rating: 4.6,
      reviewCount: 98,
      bestseller: true,
      freeShipping: true
    },
    {
      id: 6,
      name: "Canvas Shoes",
      brand: "Street Style",
      category: "casual",
      price: 999,
      originalPrice: 1499,
      discount: 33,
      images: [
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["7", "8", "9", "10", "11"],
      colors: [
        { name: "White", hex: "#ffffff" },
        { name: "Black", hex: "#000000" },
        { name: "Blue", hex: "#3b82f6" },
        { name: "Green", hex: "#16a34a" }
      ],
      description: "Lightweight canvas shoes with comfortable fit. Perfect for casual everyday wear.",
      features: ["Canvas Material", "Comfortable", "Lightweight", "Affordable"],
      stock: 62,
      rating: 4.3,
      reviewCount: 312,
      freeShipping: false
    },
    {
      id: 7,
      name: "Leather Loafers",
      brand: "Executive",
      category: "formal",
      price: 2799,
      originalPrice: 3699,
      discount: 24,
      images: [
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["7", "8", "9", "10"],
      colors: [
        { name: "Brown", hex: "#92400e" },
        { name: "Black", hex: "#000000" },
        { name: "Burgundy", hex: "#991b1b" }
      ],
      description: "Premium leather loafers with sophisticated design. Perfect for business casual occasions.",
      features: ["Genuine Leather", "Slip-On Design", "Comfort Fit", "Professional Look"],
      stock: 26,
      rating: 4.7,
      reviewCount: 145,
      isNew: true,
      freeShipping: true
    },
    {
      id: 8,
      name: "Basketball Shoes",
      brand: "Jump High",
      category: "sports",
      price: 2999,
      originalPrice: 3999,
      discount: 25,
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["8", "9", "10", "11", "12"],
      colors: [
        { name: "Red", hex: "#dc2626" },
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#ffffff" }
      ],
      description: "High-performance basketball shoes with excellent grip and ankle support.",
      features: ["Ankle Support", "Excellent Grip", "Shock Absorption", "Durable"],
      stock: 18,
      rating: 4.8,
      reviewCount: 89,
      featured: true,
      freeShipping: true
    },
    {
      id: 9,
      name: "Comfort Slippers",
      brand: "Home Comfort",
      category: "slippers",
      price: 599,
      originalPrice: 899,
      discount: 33,
      images: [
        "https://images.unsplash.com/photo-1560769684-55015cee73a8?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["7", "8", "9", "10"],
      colors: [
        { name: "Blue", hex: "#3b82f6" },
        { name: "Gray", hex: "#6b7280" },
        { name: "Black", hex: "#000000" }
      ],
      description: "Comfortable indoor slippers with soft cushioning. Perfect for home use.",
      features: ["Soft Cushioning", "Indoor Use", "Comfortable", "Lightweight"],
      stock: 75,
      rating: 4.2,
      reviewCount: 234,
      freeShipping: false
    },
    {
      id: 10,
      name: "Designer Boots",
      brand: "Winter Style",
      category: "boots",
      price: 3899,
      originalPrice: 4999,
      discount: 22,
      images: [
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["7", "8", "9", "10"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Brown", hex: "#92400e" },
        { name: "Tan", hex: "#d4b483" }
      ],
      description: "Stylish designer boots for winter fashion. Warm and comfortable with premium materials.",
      features: ["Winter Boots", "Warm Lining", "Premium Leather", "Fashionable"],
      stock: 14,
      rating: 4.6,
      reviewCount: 67,
      bestseller: true,
      freeShipping: true
    },
    {
      id: 11,
      name: "Running Sandals",
      brand: "Trail Master",
      category: "sandals",
      price: 1599,
      originalPrice: 2199,
      discount: 27,
      images: [
        "https://images.unsplash.com/photo-1560769684-55015cee73a8?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["8", "9", "10", "11"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Blue", hex: "#2563eb" },
        { name: "Green", hex: "#16a34a" }
      ],
      description: "Performance running sandals with secure fit. Perfect for outdoor activities and trails.",
      features: ["Secure Fit", "Outdoor Use", "Comfortable", "Durable"],
      stock: 28,
      rating: 4.5,
      reviewCount: 123,
      freeShipping: true
    },
    {
      id: 12,
      name: "Formal Oxford Shoes",
      brand: "Gentleman's Choice",
      category: "formal",
      price: 3499,
      originalPrice: 4599,
      discount: 24,
      images: [
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["7", "8", "9", "10", "11"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Brown", hex: "#92400e" }
      ],
      description: "Classic Oxford shoes with premium leather and sophisticated design.",
      features: ["Oxford Design", "Premium Leather", "Formal Occasions", "Comfortable"],
      stock: 21,
      rating: 4.8,
      reviewCount: 178,
      featured: true,
      freeShipping: true
    },
    {
      id: 13,
      name: "Skate Shoes",
      brand: "Street Rider",
      category: "casual",
      price: 2199,
      originalPrice: 2999,
      discount: 27,
      images: [
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["7", "8", "9", "10", "11"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Gray", hex: "#6b7280" },
        { name: "Blue", hex: "#3b82f6" }
      ],
      description: "Durable skate shoes with excellent grip and board feel. Perfect for skateboarding.",
      features: ["Skate Design", "Excellent Grip", "Durable", "Comfortable"],
      stock: 32,
      rating: 4.4,
      reviewCount: 156,
      isNew: true,
      freeShipping: true
    },
    {
      id: 14,
      name: "Wedding Shoes",
      brand: "Bridal Elegance",
      category: "formal",
      price: 2899,
      originalPrice: 3899,
      discount: 26,
      images: [
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["6", "7", "8", "9"],
      colors: [
        { name: "White", hex: "#ffffff" },
        { name: "Cream", hex: "#fef3c7" },
        { name: "Silver", hex: "#d1d5db" }
      ],
      description: "Elegant wedding shoes with delicate designs. Perfect for bridal occasions.",
      features: ["Bridal Collection", "Elegant Design", "Comfortable", "Special Occasion"],
      stock: 16,
      rating: 4.7,
      reviewCount: 89,
      bestseller: true,
      freeShipping: true
    },
    {
      id: 15,
      name: "Trekking Shoes",
      brand: "Adventure Pro",
      category: "sports",
      price: 3199,
      originalPrice: 4199,
      discount: 24,
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["8", "9", "10", "11"],
      colors: [
        { name: "Green", hex: "#16a34a" },
        { name: "Brown", hex: "#92400e" },
        { name: "Gray", hex: "#6b7280" }
      ],
      description: "Professional trekking shoes with waterproof technology and excellent grip.",
      features: ["Waterproof", "Excellent Grip", "Ankle Support", "Durable"],
      stock: 23,
      rating: 4.6,
      reviewCount: 134,
      featured: true,
      freeShipping: true
    },
    {
      id: 16,
      name: "Party Heels",
      brand: "Night Glam",
      category: "heels",
      price: 1699,
      originalPrice: 2299,
      discount: 26,
      images: [
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["6", "7", "8", "9"],
      colors: [
        { name: "Gold", hex: "#fbbf24" },
        { name: "Silver", hex: "#d1d5db" },
        { name: "Black", hex: "#000000" }
      ],
      description: "Glamorous party heels with sparkling details. Perfect for night events and parties.",
      features: ["Sparkling Details", "Party Wear", "Comfortable", "Fashionable"],
      stock: 27,
      rating: 4.5,
      reviewCount: 112,
      freeShipping: true
    }
  ];

  // Initialize filters from URL params or defaults
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    size: searchParams.get('size') || '',
    color: searchParams.get('color') || '',
    sort: searchParams.get('sort') || 'newest',
    search: searchParams.get('search') || '',
    inStock: searchParams.get('inStock') === 'true',
    onSale: searchParams.get('onSale') === 'true',
    featured: searchParams.get('featured') === 'true'
  });

  // BDT Currency Formatter
  const formatPriceBDT = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...shoesProducts];

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= parseInt(filters.maxPrice));
    }
    if (filters.size) {
      filtered = filtered.filter(product => product.sizes.includes(filters.size));
    }
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }
    if (filters.onSale) {
      filtered = filtered.filter(product => product.discount > 0);
    }
    if (filters.featured) {
      filtered = filtered.filter(product => product.featured);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    switch (filters.sort) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default: // newest
        filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAddToCart = (product, size = null, color = null) => {
    const selectedSize = size || product.sizes[0];
    const selectedColor = color || product.colors[0].name;
    
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1
    });
    
    addNotification(`${product.name} added to cart!`, 'success');
  };

  const handleWishlistToggle = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      addNotification('Removed from wishlist', 'info');
    } else {
      addToWishlist(product);
      addNotification('Added to wishlist!', 'success');
    }
  };

  const handleQuickView = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  // Get unique brands and categories for filters
  const brands = [...new Set(shoesProducts.map(product => product.brand))];
  const categories = [...new Set(shoesProducts.map(product => product.category))];

  const ProductCard = ({ product, index }) => {
    const isWishlisted = isInWishlist(product.id);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700"
      >
        <Link to={`/product/${product.id}`} className="block relative">
          {/* Product Image */}
          <div className="relative overflow-hidden aspect-square">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Hover Image */}
            <img 
              src={product.images[1] || product.images[0]} 
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Overlay with Actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
              <motion.button
                onClick={(e) => handleWishlistToggle(product, e)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center backdrop-blur-sm transition-all ${
                  isWishlisted 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-white/90 text-gray-900 hover:bg-white'
                }`}
              >
                {isWishlisted ? '❤️' : '♡'}
              </motion.button>
              
              <motion.button
                onClick={(e) => handleQuickView(product, e)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white/90 rounded-2xl shadow-lg flex items-center justify-center hover:bg-white transition-colors"
              >
                👁️
              </motion.button>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.discount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                >
                  -{product.discount}%
                </motion.div>
              )}
              {product.featured && (
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  Featured
                </div>
              )}
              {product.bestseller && (
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  Bestseller
                </div>
              )}
              {product.isNew && (
                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  New
                </div>
              )}
            </div>

            {/* Stock Indicator */}
            {product.stock < 10 && product.stock > 0 && (
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                Only {product.stock} left
              </div>
            )}

            {/* Add to Cart Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-2xl font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:shadow-lg"
            >
              Add to Cart
            </motion.button>
          </div>

          {/* Product Info */}
          <div className="p-6 space-y-3">
            {/* Brand & Category */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {product.brand}
              </span>
              <div className="text-xs text-green-600 font-medium">
                In Stock ({product.stock})
              </div>
            </div>

            {/* Name */}
            <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-2 leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
              {product.name}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {product.description}
            </p>
            
            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatPriceBDT(product.price)}
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="text-sm text-gray-500 line-through">
                    {formatPriceBDT(product.originalPrice)}
                  </div>
                )}
              </div>

              {/* Save Amount */}
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-sm font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                  Save {formatPriceBDT(product.originalPrice - product.price)}
                </div>
              )}
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(product.rating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({product.reviewCount})
                </span>
              </div>
              
              {/* Delivery Info */}
              <div className="text-xs text-gray-500">
                {product.freeShipping ? '🚚 Free Delivery' : '📦 Delivery: ৳80'}
              </div>
            </div>

            {/* Size Preview */}
            <div className="flex flex-wrap gap-1 pt-2">
              {product.sizes.slice(0, 4).map((size, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-400"
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-400">
                  +{product.sizes.length - 4}
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  // Quick View Modal
  const QuickViewModal = () => {
    if (!quickViewProduct) return null;

    const product = quickViewProduct;
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setQuickViewProduct(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col md:flex-row">
            {/* Image Gallery */}
            <div className="md:w-1/2 p-6">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {product.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm text-gray-500">{product.brand}</span>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{product.name}</h2>
                </div>
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  ×
                </button>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatPriceBDT(product.price)}
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="text-lg text-gray-500 line-through">
                    {formatPriceBDT(product.originalPrice)}
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(product.rating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400">
                {product.description}
              </p>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-2xl border-2 transition-all ${
                          selectedSize === size
                            ? 'border-amber-600 bg-amber-600 text-white'
                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-amber-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Color</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor?.name === color.name
                            ? 'border-amber-600 scale-110'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                        style={{ backgroundColor: color.hex || '#000' }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-4 pt-4">
                <motion.button
                  onClick={() => {
                    handleAddToCart(product, selectedSize, selectedColor?.name);
                    setQuickViewProduct(null);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all"
                >
                  Add to Cart - {formatPriceBDT(product.price)}
                </motion.button>
                <motion.button
                  onClick={(e) => handleWishlistToggle(product, e)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-xl transition-all ${
                    isInWishlist(product.id)
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-amber-400'
                  }`}
                >
                  {isInWishlist(product.id) ? '❤️' : '♡'}
                </motion.button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl">🚚</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {product.freeShipping ? 'Free Delivery' : '৳80 Delivery'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">↩️</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {product.returnPolicy || 7} Days Return
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">🔒</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Secure Payment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">⭐</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Quality Guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-amber-900/20 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Shoes Collection
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Step into style with our premium footwear collection for every occasion
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Show message if no products */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 col-span-full"
          >
            <div className="w-32 h-32 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">👟</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters to find what you're looking for.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilters({
                category: '',
                brand: '',
                minPrice: '',
                maxPrice: '',
                size: '',
                color: '',
                sort: 'newest',
                search: '',
                inStock: false,
                onSale: false,
                featured: false
              })}
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
            >
              Clear all filters
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && <QuickViewModal />}
      </AnimatePresence>
    </div>
  );
};

export default Shoes;