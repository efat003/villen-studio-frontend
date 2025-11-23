// src/pages/Women.js - BANGLADESHI WOMEN'S COLLECTION
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';

const Women = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addNotification } = useNotification();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [viewMode, setViewMode] = useState('grid');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Bangladeshi Women's Products Data
  const womenProducts = [
    {
      id: 1,
      name: "Traditional Silk Saree",
      brand: "Aarong",
      category: "sarees",
      price: 4599,
      originalPrice: 5999,
      discount: 23,
      images: [
        "https://images.unsplash.com/photo-1585487000113-7e7f781de03c?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1585487000157-97f0e6b6bf7c?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["Free Size"],
      colors: [
        { name: "Red", hex: "#dc2626" },
        { name: "Blue", hex: "#1e40af" },
        { name: "Green", hex: "#065f46" },
        { name: "Purple", hex: "#7e22ce" }
      ],
      description: "Elegant pure silk saree with intricate embroidery. Perfect for weddings and special occasions.",
      features: ["Pure Silk", "Hand Embroidery", "Traditional", "Premium Quality"],
      stock: 15,
      rating: 4.8,
      reviewCount: 234,
      featured: true,
      freeShipping: true,
      returnPolicy: 7
    },
    {
      id: 2,
      name: "Designer Salwar Kameez",
      brand: "Yellow",
      category: "salwar-kameez",
      price: 3299,
      originalPrice: 4299,
      discount: 23,
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1585487000127-1a3d9a5c2416?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Pink", hex: "#ec4899" },
        { name: "Blue", hex: "#3b82f6" },
        { name: "Yellow", hex: "#eab308" }
      ],
      description: "Beautiful designer salwar kameez with matching dupatta. Comfortable and stylish for everyday wear.",
      features: ["Cotton Silk", "Designer Print", "Matching Dupatta", "Comfort Fit"],
      stock: 28,
      rating: 4.6,
      reviewCount: 167,
      bestseller: true,
      freeShipping: true
    },
    {
      id: 3,
      name: "Embroidered Kurti",
      brand: "Kay Kraft",
      category: "kurtis",
      price: 1299,
      originalPrice: 1799,
      discount: 28,
      images: [
        "https://images.unsplash.com/photo-1585487000127-1a3d9a5c2416?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "White", hex: "#ffffff" },
        { name: "Black", hex: "#000000" },
        { name: "Navy Blue", hex: "#1e3a8a" },
        { name: "Maroon", hex: "#991b1b" }
      ],
      description: "Casual embroidered kurti with comfortable fit. Perfect for office and casual outings.",
      features: ["Cotton Blend", "Hand Embroidery", "Casual Wear", "Machine Wash"],
      stock: 42,
      rating: 4.5,
      reviewCount: 289,
      isNew: true,
      freeShipping: true
    },
    {
      id: 4,
      name: "Western Style Dress",
      brand: "Etra",
      category: "dresses",
      price: 1899,
      originalPrice: 2499,
      discount: 24,
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1585487000157-97f0e6b6bf7c?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["XS", "S", "M", "L"],
      colors: [
        { name: "Floral Print", hex: "#fef3c7" },
        { name: "Black", hex: "#000000" },
        { name: "Red", hex: "#dc2626" }
      ],
      description: "Elegant western style dress with floral pattern. Perfect for parties and special occasions.",
      features: ["Western Style", "Floral Print", "Party Wear", "Comfortable"],
      stock: 23,
      rating: 4.7,
      reviewCount: 134,
      featured: true,
      freeShipping: true
    },
    {
      id: 5,
      name: "Designer Handbag",
      brand: "Aarong",
      category: "accessories",
      price: 2199,
      originalPrice: 2999,
      discount: 27,
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Brown", hex: "#92400e" },
        { name: "Black", hex: "#000000" },
        { name: "Red", hex: "#dc2626" }
      ],
      description: "Handcrafted designer handbag with premium materials. Spacious and stylish for everyday use.",
      features: ["Handcrafted", "Genuine Leather", "Spacious", "Adjustable Strap"],
      stock: 18,
      rating: 4.8,
      reviewCount: 98,
      bestseller: true,
      freeShipping: true
    },
    {
      id: 6,
      name: "Casual Top",
      brand: "Richman",
      category: "tops",
      price: 799,
      originalPrice: 1199,
      discount: 33,
      images: [
        "https://images.unsplash.com/photo-1585487000127-1a3d9a5c2416?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "White", hex: "#ffffff" },
        { name: "Black", hex: "#000000" },
        { name: "Pink", hex: "#ec4899" },
        { name: "Blue", hex: "#3b82f6" }
      ],
      description: "Comfortable casual top with modern design. Versatile for various occasions and easy to style.",
      features: ["100% Cotton", "Casual Style", "Easy Care", "Trendy Design"],
      stock: 56,
      rating: 4.4,
      reviewCount: 203,
      freeShipping: false
    },
    {
      id: 7,
      name: "Designer Jewelry Set",
      brand: "Bindu",
      category: "jewelry",
      price: 1499,
      originalPrice: 1999,
      discount: 25,
      images: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Gold", hex: "#fbbf24" },
        { name: "Silver", hex: "#d1d5db" },
        { name: "Rose Gold", hex: "#fb7185" }
      ],
      description: "Elegant designer jewelry set with matching necklace and earrings. Perfect for traditional wear.",
      features: ["Oxidation Resistant", "Traditional Design", "Matching Set", "Gift Ready"],
      stock: 32,
      rating: 4.6,
      reviewCount: 145,
      isNew: true,
      freeShipping: true
    },
    {
      id: 8,
      name: "Casual Palazzo Pants",
      brand: "Easywear",
      category: "bottoms",
      price: 1399,
      originalPrice: 1899,
      discount: 26,
      images: [
        "https://images.unsplash.com/photo-1585487000127-1a3d9a5c2416?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#ffffff" },
        { name: "Navy Blue", hex: "#1e3a8a" }
      ],
      description: "Comfortable palazzo pants with elastic waist. Perfect for casual and semi-formal occasions.",
      features: ["Elastic Waist", "Comfort Fit", "Flowy Design", "Versatile"],
      stock: 38,
      rating: 4.3,
      reviewCount: 178,
      freeShipping: true
    },
    {
      id: 9,
      name: "Designer Lehenga",
      brand: "Nishat",
      category: "lehengas",
      price: 7899,
      originalPrice: 9999,
      discount: 21,
      images: [
        "https://images.unsplash.com/photo-1585487000157-97f0e6b6bf7c?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1585487000113-7e7f781de03c?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["Custom Size"],
      colors: [
        { name: "Red", hex: "#dc2626" },
        { name: "Pink", hex: "#ec4899" },
        { name: "Blue", hex: "#1e40af" }
      ],
      description: "Exquisite designer lehenga with heavy embroidery. Perfect for weddings and grand celebrations.",
      features: ["Heavy Embroidery", "Premium Fabric", "Custom Sizing", "Bridal Collection"],
      stock: 8,
      rating: 4.9,
      reviewCount: 67,
      featured: true,
      freeShipping: true
    },
    {
      id: 10,
      name: "Casual Scarf",
      brand: "Aarong",
      category: "accessories",
      price: 499,
      originalPrice: 799,
      discount: 38,
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Multicolor", hex: "#fef3c7" },
        { name: "Blue", hex: "#3b82f6" },
        { name: "Pink", hex: "#ec4899" }
      ],
      description: "Soft and stylish casual scarf with beautiful patterns. Perfect accessory for any outfit.",
      features: ["Soft Fabric", "Multiple Uses", "Lightweight", "Fashionable"],
      stock: 72,
      rating: 4.2,
      reviewCount: 189,
      freeShipping: false
    },
    {
      id: 11,
      name: "Designer Blouse",
      brand: "Kay Kraft",
      category: "blouses",
      price: 1599,
      originalPrice: 2199,
      discount: 27,
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1585487000127-1a3d9a5c2416?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Red", hex: "#dc2626" },
        { name: "Black", hex: "#000000" },
        { name: "Gold", hex: "#fbbf24" }
      ],
      description: "Elegant designer blouse with intricate work. Perfect pairing with sarees and lehengas.",
      features: ["Designer Work", "Premium Fabric", "Perfect Fit", "Traditional Style"],
      stock: 25,
      rating: 4.7,
      reviewCount: 112,
      bestseller: true,
      freeShipping: true
    },
    {
      id: 12,
      name: "Casual Skirt",
      brand: "Etra",
      category: "bottoms",
      price: 1199,
      originalPrice: 1699,
      discount: 29,
      images: [
        "https://images.unsplash.com/photo-1585487000127-1a3d9a5c2416?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#ffffff" },
        { name: "Denim Blue", hex: "#1e40af" }
      ],
      description: "Comfortable casual skirt with elastic waist. Versatile for various styling options.",
      features: ["Elastic Waist", "Comfort Fit", "Casual Style", "Easy Care"],
      stock: 44,
      rating: 4.4,
      reviewCount: 156,
      freeShipping: true
    },
    {
      id: 13,
      name: "Traditional Jewelry",
      brand: "Bindu",
      category: "jewelry",
      price: 899,
      originalPrice: 1299,
      discount: 31,
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Silver", hex: "#d1d5db" },
        { name: "Gold", hex: "#fbbf24" }
      ],
      description: "Beautiful traditional jewelry pieces with ethnic designs. Perfect for cultural events.",
      features: ["Traditional Design", "Lightweight", "Comfortable", "Elegant"],
      stock: 29,
      rating: 4.5,
      reviewCount: 98,
      isNew: true,
      freeShipping: true
    },
    {
      id: 14,
      name: "Designer Dupatta",
      brand: "Nishat",
      category: "accessories",
      price: 699,
      originalPrice: 999,
      discount: 30,
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Printed", hex: "#fef3c7" },
        { name: "Embroidered", hex: "#fbcfe8" },
        { name: "Plain", hex: "#ffffff" }
      ],
      description: "Elegant designer dupatta with beautiful patterns. Perfect accessory for traditional outfits.",
      features: ["Designer Print", "Soft Fabric", "Versatile", "Stylish"],
      stock: 51,
      rating: 4.3,
      reviewCount: 134,
      freeShipping: false
    },
    {
      id: 15,
      name: "Casual Handbag",
      brand: "Aarong",
      category: "accessories",
      price: 1499,
      originalPrice: 1999,
      discount: 25,
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Brown", hex: "#92400e" },
        { name: "Black", hex: "#000000" },
        { name: "Blue", hex: "#1e40af" }
      ],
      description: "Practical casual handbag with multiple compartments. Perfect for everyday use.",
      features: ["Multiple Pockets", "Durable", "Comfortable Strap", "Spacious"],
      stock: 36,
      rating: 4.6,
      reviewCount: 223,
      freeShipping: true
    },
    {
      id: 16,
      name: "Designer Anarkali",
      brand: "Yellow",
      category: "anarkalis",
      price: 2899,
      originalPrice: 3899,
      discount: 26,
      images: [
        "https://images.unsplash.com/photo-1585487000157-97f0e6b6bf7c?w=500&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Red", hex: "#dc2626" },
        { name: "Blue", hex: "#1e40af" },
        { name: "Green", hex: "#065f46" }
      ],
      description: "Beautiful designer anarkali suit with flowing silhouette. Elegant for parties and events.",
      features: ["Flowy Design", "Premium Fabric", "Elegant Look", "Comfortable"],
      stock: 19,
      rating: 4.7,
      reviewCount: 145,
      featured: true,
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
    let filtered = [...womenProducts];

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
  const brands = [...new Set(womenProducts.map(product => product.brand))];
  const categories = [...new Set(womenProducts.map(product => product.category))];

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
                    ? 'bg-pink-500 text-white' 
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
                  className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                >
                  -{product.discount}%
                </motion.div>
              )}
              {product.featured && (
                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  Featured
                </div>
              )}
              {product.bestseller && (
                <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  Bestseller
                </div>
              )}
              {product.isNew && (
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
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
              className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white py-3 rounded-2xl font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:shadow-lg"
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
                            ? 'border-pink-600 bg-pink-600 text-white'
                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-pink-400'
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
                            ? 'border-pink-600 scale-110'
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
                  className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all"
                >
                  Add to Cart - {formatPriceBDT(product.price)}
                </motion.button>
                <motion.button
                  onClick={(e) => handleWishlistToggle(product, e)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-xl transition-all ${
                    isInWishlist(product.id)
                      ? 'bg-pink-500 border-pink-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-pink-400'
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-900 dark:to-pink-900/20 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Women's Fashion Collection
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover elegant women's fashion with authentic Bangladeshi brands and traditional craftsmanship
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
            <div className="w-32 h-32 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">👗</span>
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
              className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
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

export default Women;