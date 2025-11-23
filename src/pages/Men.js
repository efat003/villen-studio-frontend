// src/pages/Men.js - MODIFIED WITH 5 LOCAL IMAGES
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';

// Import your 5 local images
import menProduct1 from '../asset/images/11.jpg';
import menProduct2 from '../asset/images/22.jpg';
import menProduct3 from '../asset/images/77.jpg';
import menProduct4 from '../asset/images/33.jpg';
import menProduct5 from '../asset/images/55.jpg';

const Men = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addNotification } = useNotification();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [viewMode, setViewMode] = useState('grid');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Bangladeshi Men's Products Data with Local Images
  const menProducts = [
    {
      id: 1,
      name: "Classic Cotton T-Shirt",
      brand: "Aarong",
      category: "tshirts",
      price: 899,
      originalPrice: 1299,
      discount: 31,
      images: [
        menProduct1,
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "White", hex: "#ffffff" },
        { name: "Black", hex: "#000000" },
        { name: "Navy Blue", hex: "#1e3a8a" },
        { name: "Gray", hex: "#6b7280" }
      ],
      description: "Premium 100% cotton t-shirt with comfortable fit and durable quality. Perfect for everyday wear.",
      features: ["100% Cotton", "Pre-shrunk", "Machine Wash", "Comfort Fit"],
      stock: 45,
      rating: 4.5,
      reviewCount: 128,
      isNew: true,
      freeShipping: true,
      returnPolicy: 7
    },
    {
      id: 2,
      name: "Formal Dress Shirt",
      brand: "Richman",
      category: "shirts",
      price: 1899,
      originalPrice: 2499,
      discount: 24,
      images: [
        menProduct2,
        "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["M", "L", "XL", "XXL"],
      colors: [
        { name: "White", hex: "#ffffff" },
        { name: "Light Blue", hex: "#93c5fd" },
        { name: "Pink", hex: "#fbcfe8" }
      ],
      description: "Elegant formal shirt with premium cotton blend. Perfect for office and special occasions.",
      features: ["Cotton Blend", "Iron Free", "Formal Fit", "Long Sleeve"],
      stock: 32,
      rating: 4.7,
      reviewCount: 89,
      featured: true,
      freeShipping: true
    },
    {
      id: 3,
      name: "Denim Jeans - Regular Fit",
      brand: "Yellow",
      category: "pants",
      price: 2299,
      originalPrice: 2999,
      discount: 23,
      images: [
        menProduct3,
        "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["30", "32", "34", "36", "38"],
      colors: [
        { name: "Dark Blue", hex: "#1e3a8a" },
        { name: "Black", hex: "#000000" },
        { name: "Light Blue", hex: "#60a5fa" }
      ],
      description: "Comfortable denim jeans with regular fit. Made from high-quality denim for long-lasting wear.",
      features: ["100% Cotton", "Regular Fit", "Five Pocket", "Machine Wash"],
      stock: 28,
      rating: 4.6,
      reviewCount: 156,
      bestseller: true,
      freeShipping: true
    },
    {
      id: 4,
      name: "Casual Hoodie",
      brand: "Apex",
      category: "hoodies",
      price: 1599,
      originalPrice: 2199,
      discount: 27,
      images: [
        menProduct4,
        "https://images.unsplash.com/photo-1578768583361-5bf3a6f944d6?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Gray", hex: "#6b7280" },
        { name: "Navy Blue", hex: "#1e3a8a" },
        { name: "Burgundy", hex: "#991b1b" }
      ],
      description: "Warm and comfortable hoodie for casual wear. Features front pocket and adjustable hood.",
      features: ["Fleece Lining", "Front Pocket", "Adjustable Hood", "Casual Fit"],
      stock: 37,
      rating: 4.4,
      reviewCount: 203,
      isNew: true,
      freeShipping: true
    },
    {
      id: 5,
      name: "Polo Shirt - Classic Fit",
      brand: "Sailor",
      category: "shirts",
      price: 1299,
      originalPrice: 1799,
      discount: 28,
      images: [
        menProduct5,
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "White", hex: "#ffffff" },
        { name: "Black", hex: "#000000" },
        { name: "Navy Blue", hex: "#1e3a8a" },
        { name: "Green", hex: "#065f46" }
      ],
      description: "Classic polo shirt with ribbed collar. Perfect for smart casual occasions.",
      features: ["Pique Cotton", "Ribbed Collar", "Three Buttons", "Machine Wash"],
      stock: 51,
      rating: 4.3,
      reviewCount: 94,
      freeShipping: true
    },
    {
      id: 6,
      name: "Cargo Pants",
      brand: "Easywear",
      category: "pants",
      price: 1799,
      originalPrice: 2399,
      discount: 25,
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["30", "32", "34", "36"],
      colors: [
        { name: "Khaki", hex: "#d4b483" },
        { name: "Black", hex: "#000000" },
        { name: "Olive Green", hex: "#3f6212" }
      ],
      description: "Utility cargo pants with multiple pockets. Comfortable and practical for everyday wear.",
      features: ["Multiple Pockets", "Comfort Fit", "Durable Fabric", "Casual Style"],
      stock: 23,
      rating: 4.2,
      reviewCount: 67,
      freeShipping: true
    },
    {
      id: 7,
      name: "Striped Casual Shirt",
      brand: "Gentle Park",
      category: "shirts",
      price: 1399,
      originalPrice: 1899,
      discount: 26,
      images: [
        "https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["M", "L", "XL", "XXL"],
      colors: [
        { name: "Blue White Stripes", hex: "#3b82f6" },
        { name: "Black White Stripes", hex: "#000000" },
        { name: "Red White Stripes", hex: "#dc2626" }
      ],
      description: "Casual striped shirt with comfortable fit. Perfect for weekend outings and casual events.",
      features: ["Cotton Blend", "Striped Pattern", "Casual Fit", "Button Down"],
      stock: 41,
      rating: 4.5,
      reviewCount: 112,
      featured: true,
      freeShipping: true
    },
    {
      id: 8,
      name: "Slim Fit Chino Pants",
      brand: "Denim Code",
      category: "pants",
      price: 1699,
      originalPrice: 2199,
      discount: 23,
      images: [
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["30", "32", "34", "36", "38"],
      colors: [
        { name: "Beige", hex: "#e7d7c1" },
        { name: "Navy Blue", hex: "#1e3a8a" },
        { name: "Gray", hex: "#6b7280" }
      ],
      description: "Slim fit chino pants for a modern look. Versatile enough for both casual and semi-formal occasions.",
      features: ["Slim Fit", "Chino Fabric", "Modern Cut", "Machine Wash"],
      stock: 34,
      rating: 4.6,
      reviewCount: 178,
      bestseller: true,
      freeShipping: true
    },
    {
      id: 9,
      name: "Graphic Print T-Shirt",
      brand: "Bangla Trends",
      category: "tshirts",
      price: 699,
      originalPrice: 999,
      discount: 30,
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "White", hex: "#ffffff" },
        { name: "Black", hex: "#000000" },
        { name: "Red", hex: "#dc2626" }
      ],
      description: "Trendy graphic print t-shirt with unique designs. Express your style with comfortable cotton fabric.",
      features: ["Graphic Print", "100% Cotton", "Fashionable", "Youth Style"],
      stock: 62,
      rating: 4.4,
      reviewCount: 245,
      isNew: true,
      freeShipping: false
    },
    {
      id: 10,
      name: "Winter Jacket",
      brand: "North Star",
      category: "jackets",
      price: 3499,
      originalPrice: 4999,
      discount: 30,
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["M", "L", "XL", "XXL"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Navy Blue", hex: "#1e3a8a" },
        { name: "Brown", hex: "#78350f" }
      ],
      description: "Warm winter jacket with insulation. Perfect for cold weather with multiple pockets and hood.",
      features: ["Warm Insulation", "Water Resistant", "Multiple Pockets", "Adjustable Hood"],
      stock: 18,
      rating: 4.8,
      reviewCount: 89,
      featured: true,
      freeShipping: true
    },
    {
      id: 11,
      name: "Sports T-Shirt",
      brand: "Active Wear",
      category: "tshirts",
      price: 799,
      originalPrice: 1199,
      discount: 33,
      images: [
        "https://images.unsplash.com/photo-1578768583361-5bf3a6f944d6?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Gray", hex: "#6b7280" },
        { name: "Blue", hex: "#3b82f6" }
      ],
      description: "Breathable sports t-shirt with moisture-wicking technology. Perfect for workouts and active lifestyle.",
      features: ["Moisture Wicking", "Breathable", "Quick Dry", "Active Fit"],
      stock: 55,
      rating: 4.3,
      reviewCount: 167,
      freeShipping: true
    },
    {
      id: 12,
      name: "Formal Trousers",
      brand: "Executive",
      category: "pants",
      price: 1999,
      originalPrice: 2699,
      discount: 26,
      images: [
        "https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["32", "34", "36", "38", "40"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Gray", hex: "#6b7280" },
        { name: "Navy Blue", hex: "#1e3a8a" }
      ],
      description: "Premium formal trousers with perfect crease. Ideal for office wear and formal occasions.",
      features: ["Formal Fit", "Crease Resistant", "Office Wear", "Premium Fabric"],
      stock: 29,
      rating: 4.7,
      reviewCount: 134,
      bestseller: true,
      freeShipping: true
    },
    {
      id: 13,
      name: "Zipped Hoodie",
      brand: "Urban Style",
      category: "hoodies",
      price: 1899,
      originalPrice: 2599,
      discount: 27,
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1578768583361-5bf3a6f944d6?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Charcoal", hex: "#374151" },
        { name: "Burgundy", hex: "#991b1b" }
      ],
      description: "Modern zipped hoodie with comfortable fit. Features front pockets and adjustable drawstrings.",
      features: ["Full Zip", "Front Pockets", "Adjustable Hood", "Comfort Fit"],
      stock: 33,
      rating: 4.5,
      reviewCount: 98,
      isNew: true,
      freeShipping: true
    },
    {
      id: 14,
      name: "Linen Shirt",
      brand: "Summer Breeze",
      category: "shirts",
      price: 1599,
      originalPrice: 2199,
      discount: 27,
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["M", "L", "XL", "XXL"],
      colors: [
        { name: "White", hex: "#ffffff" },
        { name: "Beige", hex: "#e7d7c1" },
        { name: "Light Blue", hex: "#93c5fd" }
      ],
      description: "Breathable linen shirt perfect for summer. Lightweight and comfortable with casual style.",
      features: ["100% Linen", "Breathable", "Summer Wear", "Casual Style"],
      stock: 27,
      rating: 4.4,
      reviewCount: 76,
      freeShipping: true
    },
    {
      id: 15,
      name: "Jogger Pants",
      brand: "Comfort Zone",
      category: "pants",
      price: 1399,
      originalPrice: 1899,
      discount: 26,
      images: [
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Gray", hex: "#6b7280" },
        { name: "Navy Blue", hex: "#1e3a8a" }
      ],
      description: "Comfortable jogger pants with elastic waistband. Perfect for casual wear and light exercises.",
      features: ["Elastic Waist", "Comfort Fit", "Casual Style", "Lightweight"],
      stock: 48,
      rating: 4.3,
      reviewCount: 189,
      freeShipping: true
    },
    {
      id: 16,
      name: "V-Neck T-Shirt",
      brand: "Basic Club",
      category: "tshirts",
      price: 749,
      originalPrice: 1099,
      discount: 32,
      images: [
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "White", hex: "#ffffff" },
        { name: "Black", hex: "#000000" },
        { name: "Gray", hex: "#6b7280" },
        { name: "Maroon", hex: "#991b1b" }
      ],
      description: "Classic V-neck t-shirt with comfortable fit. Versatile basic for everyday wardrobe.",
      features: ["V-Neck", "100% Cotton", "Basic Style", "Machine Wash"],
      stock: 71,
      rating: 4.2,
      reviewCount: 223,
      freeShipping: false
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
    let filtered = [...menProducts];

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
  const brands = [...new Set(menProducts.map(product => product.brand))];
  const categories = [...new Set(menProducts.map(product => product.category))];

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
          <div className="relative overflow-hidden aspect-[3/4]">
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
                    ? 'bg-red-500 text-white' 
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
                  className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                >
                  -{product.discount}%
                </motion.div>
              )}
              {product.featured && (
                <div className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  Featured
                </div>
              )}
              {product.bestseller && (
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  Bestseller
                </div>
              )}
              {product.isNew && (
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
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
              className="absolute bottom-4 left-4 right-4 bg-gray-900 text-white py-3 rounded-2xl font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-800 shadow-lg"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Men's Fashion Collection
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover premium men's clothing with authentic Bangladeshi brands and affordable prices
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
            <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters to find what you're looking for.
            </p>
            <button
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
              className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-purple-700 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Men;