// src/pages/Accessories.js - BANGLADESHI ACCESSORIES COLLECTION
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';

const Accessories = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addNotification } = useNotification();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [viewMode, setViewMode] = useState('grid');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Bangladeshi Accessories Products Data
  const accessoriesProducts = [
    {
      id: 1,
      name: "Premium Leather Handbag",
      brand: "Aarong",
      category: "bags",
      price: 2899,
      originalPrice: 3899,
      discount: 26,
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Brown", hex: "#92400e" },
        { name: "Black", hex: "#000000" },
        { name: "Tan", hex: "#d4b483" }
      ],
      description: "Handcrafted premium leather handbag with multiple compartments. Elegant and practical for everyday use.",
      features: ["Genuine Leather", "Multiple Pockets", "Adjustable Strap", "Handcrafted"],
      stock: 18,
      rating: 4.8,
      reviewCount: 134,
      featured: true,
      freeShipping: true,
      returnPolicy: 7
    },
    {
      id: 2,
      name: "Designer Leather Belt",
      brand: "LeatherCraft",
      category: "belts",
      price: 899,
      originalPrice: 1299,
      discount: 31,
      images: [
        "https://images.unsplash.com/photo-1601924994987-133957dc23bf?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["30", "32", "34", "36", "38"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Brown", hex: "#92400e" },
        { name: "Dark Brown", hex: "#78350f" }
      ],
      description: "Elegant genuine leather belt with polished buckle. Perfect for formal and casual wear.",
      features: ["Genuine Leather", "Polished Buckle", "Durable", "Classic Design"],
      stock: 45,
      rating: 4.6,
      reviewCount: 89,
      bestseller: true,
      freeShipping: true
    },
    {
      id: 3,
      name: "Traditional Money Bag",
      brand: "Shonar Bangla",
      category: "money-bags",
      price: 599,
      originalPrice: 899,
      discount: 33,
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Red", hex: "#dc2626" },
        { name: "Green", hex: "#16a34a" },
        { name: "Blue", hex: "#2563eb" }
      ],
      description: "Traditional Bangladeshi money bag with intricate embroidery. Cultural and practical accessory.",
      features: ["Hand Embroidery", "Traditional Design", "Secure Closure", "Cultural Art"],
      stock: 32,
      rating: 4.5,
      reviewCount: 67,
      isNew: true,
      freeShipping: false
    },
    {
      id: 4,
      name: "Silver Bracelet Set",
      brand: "Bindu",
      category: "jewelry",
      price: 1499,
      originalPrice: 1999,
      discount: 25,
      images: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["Adjustable"],
      colors: [
        { name: "Silver", hex: "#d1d5db" },
        { name: "Gold Plated", hex: "#fbbf24" }
      ],
      description: "Elegant silver bracelet set with traditional motifs. Perfect for cultural events and special occasions.",
      features: ["925 Silver", "Traditional Motifs", "Adjustable", "Gift Box"],
      stock: 25,
      rating: 4.7,
      reviewCount: 112,
      featured: true,
      freeShipping: true
    },
    {
      id: 5,
      name: "Leather Wallet",
      brand: "Executive",
      category: "wallets",
      price: 1299,
      originalPrice: 1799,
      discount: 28,
      images: [
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1601924994987-133957dc23bf?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Brown", hex: "#92400e" },
        { name: "Burgundy", hex: "#991b1b" }
      ],
      description: "Premium leather wallet with multiple card slots and coin compartment. Sleek and functional design.",
      features: ["Genuine Leather", "Multiple Slots", "RFID Protection", "Slim Design"],
      stock: 38,
      rating: 4.6,
      reviewCount: 156,
      bestseller: true,
      freeShipping: true
    },
    {
      id: 6,
      name: "Traditional Nakshi Kantha Scarf",
      brand: "Bangla Craft",
      category: "scarves",
      price: 799,
      originalPrice: 1199,
      discount: 33,
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Multicolor", hex: "#fef3c7" },
        { name: "Red White", hex: "#dc2626" },
        { name: "Blue White", hex: "#2563eb" }
      ],
      description: "Hand-stitched Nakshi Kantha scarf with traditional Bangladeshi embroidery. Cultural heritage piece.",
      features: ["Hand Stitched", "Nakshi Kantha", "Soft Cotton", "Traditional Art"],
      stock: 42,
      rating: 4.8,
      reviewCount: 234,
      isNew: true,
      freeShipping: false
    },
    {
      id: 7,
      name: "Pearl Necklace Set",
      brand: "Luxury Pearls",
      category: "jewelry",
      price: 2199,
      originalPrice: 2999,
      discount: 27,
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["Adjustable"],
      colors: [
        { name: "White Pearl", hex: "#f8fafc" },
        { name: "Pink Pearl", hex: "#fbcfe8" }
      ],
      description: "Elegant freshwater pearl necklace set with matching earrings. Timeless beauty and sophistication.",
      features: ["Freshwater Pearls", "Matching Set", "Elegant Design", "Gift Ready"],
      stock: 16,
      rating: 4.9,
      reviewCount: 78,
      featured: true,
      freeShipping: true
    },
    {
      id: 8,
      name: "Leather Backpack",
      brand: "Urban Travel",
      category: "bags",
      price: 3599,
      originalPrice: 4599,
      discount: 22,
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Brown", hex: "#92400e" },
        { name: "Olive Green", hex: "#3f6212" }
      ],
      description: "Stylish leather backpack with laptop compartment. Perfect for work, travel, and everyday use.",
      features: ["Genuine Leather", "Laptop Compartment", "Multiple Pockets", "Comfortable Straps"],
      stock: 22,
      rating: 4.7,
      reviewCount: 145,
      bestseller: true,
      freeShipping: true
    },
    {
      id: 9,
      name: "Traditional Bangle Set",
      brand: "Shakha Pola",
      category: "jewelry",
      price: 1299,
      originalPrice: 1799,
      discount: 28,
      images: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["Adjustable"],
      colors: [
        { name: "Red White", hex: "#dc2626" },
        { name: "Gold", hex: "#fbbf24" }
      ],
      description: "Authentic Bengali Shakha Pola bangle set. Traditional accessory for married women and special occasions.",
      features: ["Authentic Design", "Traditional", "Cultural Significance", "Gift Box"],
      stock: 28,
      rating: 4.8,
      reviewCount: 189,
      isNew: true,
      freeShipping: true
    },
    {
      id: 10,
      name: "Designer Sunglasses",
      brand: "Vision Style",
      category: "eyewear",
      price: 1599,
      originalPrice: 2199,
      discount: 27,
      images: [
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Brown", hex: "#92400e" },
        { name: "Tortoise", hex: "#78350f" }
      ],
      description: "Premium designer sunglasses with UV protection. Stylish and protective for sunny days.",
      features: ["UV Protection", "Designer Frame", "Comfortable Fit", "Fashionable"],
      stock: 35,
      rating: 4.5,
      reviewCount: 167,
      freeShipping: true
    },
    {
      id: 11,
      name: "Leather Keychain",
      brand: "Daily Essentials",
      category: "keychains",
      price: 299,
      originalPrice: 499,
      discount: 40,
      images: [
        "https://images.unsplash.com/photo-1601924994987-133957dc23bf?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Brown", hex: "#92400e" },
        { name: "Black", hex: "#000000" },
        { name: "Red", hex: "#dc2626" }
      ],
      description: "Durable leather keychain with metal hook. Practical and stylish accessory for your keys.",
      features: ["Genuine Leather", "Metal Hook", "Durable", "Compact"],
      stock: 68,
      rating: 4.3,
      reviewCount: 278,
      freeShipping: false
    },
    {
      id: 12,
      name: "Traditional Jamdani Stole",
      brand: "Heritage Weaves",
      category: "scarves",
      price: 1899,
      originalPrice: 2599,
      discount: 27,
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "White Gold", hex: "#fef3c7" },
        { name: "Cream", hex: "#fef7cd" },
        { name: "Beige", hex: "#e7d7c1" }
      ],
      description: "Exquisite Jamdani stole with intricate traditional weaving. Premium quality Bangladeshi heritage product.",
      features: ["Pure Cotton", "Jamdani Weave", "Traditional Art", "Premium Quality"],
      stock: 19,
      rating: 4.9,
      reviewCount: 89,
      featured: true,
      freeShipping: true
    },
    {
      id: 13,
      name: "Leather Watch Strap",
      brand: "Time Craft",
      category: "watch-accessories",
      price: 699,
      originalPrice: 999,
      discount: 30,
      images: [
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1601924994987-133957dc23bf?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["20mm", "22mm", "24mm"],
      colors: [
        { name: "Brown", hex: "#92400e" },
        { name: "Black", hex: "#000000" },
        { name: "Tan", hex: "#d4b483" }
      ],
      description: "Premium leather watch strap with quick-release pins. Easy to install and comfortable to wear.",
      features: ["Genuine Leather", "Quick Release", "Comfortable", "Easy Installation"],
      stock: 52,
      rating: 4.4,
      reviewCount: 134,
      freeShipping: false
    },
    {
      id: 14,
      name: "Traditional Tikli Forehead Jewelry",
      brand: "Bridal Collection",
      category: "jewelry",
      price: 899,
      originalPrice: 1299,
      discount: 31,
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["Adjustable"],
      colors: [
        { name: "Gold", hex: "#fbbf24" },
        { name: "Silver", hex: "#d1d5db" },
        { name: "Rose Gold", hex: "#fb7185" }
      ],
      description: "Elegant Tikli forehead jewelry with intricate design. Perfect for bridal and traditional occasions.",
      features: ["Traditional Design", "Adjustable", "Elegant", "Special Occasion"],
      stock: 23,
      rating: 4.7,
      reviewCount: 67,
      isNew: true,
      freeShipping: true
    },
    {
      id: 15,
      name: "Leather Passport Holder",
      brand: "Global Travel",
      category: "travel-accessories",
      price: 799,
      originalPrice: 1199,
      discount: 33,
      images: [
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1601924994987-133957dc23bf?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Brown", hex: "#92400e" },
        { name: "Burgundy", hex: "#991b1b" }
      ],
      description: "Slim leather passport holder with multiple card slots. Essential travel accessory for frequent flyers.",
      features: ["Genuine Leather", "Multiple Slots", "RFID Protection", "Slim Design"],
      stock: 41,
      rating: 4.6,
      reviewCount: 156,
      bestseller: true,
      freeShipping: true
    },
    {
      id: 16,
      name: "Traditional Nose Pin",
      brand: "Ethnic Elegance",
      category: "jewelry",
      price: 499,
      originalPrice: 799,
      discount: 38,
      images: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Gold", hex: "#fbbf24" },
        { name: "Silver", hex: "#d1d5db" }
      ],
      description: "Delicate traditional nose pin with elegant design. Cultural accessory for traditional attire.",
      features: ["Traditional Design", "Hypoallergenic", "Elegant", "Cultural"],
      stock: 37,
      rating: 4.5,
      reviewCount: 89,
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
    let filtered = [...accessoriesProducts];

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
  const brands = [...new Set(accessoriesProducts.map(product => product.brand))];
  const categories = [...new Set(accessoriesProducts.map(product => product.category))];

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
                    ? 'bg-purple-500 text-white' 
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
                  className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                >
                  -{product.discount}%
                </motion.div>
              )}
              {product.featured && (
                <div className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
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
              className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:shadow-lg"
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
            {product.sizes.length > 1 && (
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
            )}
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
              {product.sizes && product.sizes.length > 1 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-2xl border-2 transition-all ${
                          selectedSize === size
                            ? 'border-purple-600 bg-purple-600 text-white'
                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-400'
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
                            ? 'border-purple-600 scale-110'
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
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all"
                >
                  Add to Cart - {formatPriceBDT(product.price)}
                </motion.button>
                <motion.button
                  onClick={(e) => handleWishlistToggle(product, e)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-xl transition-all ${
                    isInWishlist(product.id)
                      ? 'bg-purple-500 border-purple-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-400'
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900/20 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Accessories Collection
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Complete your look with our premium accessories - from traditional jewelry to modern essentials
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
            <div className="w-32 h-32 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">💎</span>
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
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
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

export default Accessories;