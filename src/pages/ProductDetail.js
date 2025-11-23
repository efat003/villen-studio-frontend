// src/pages/ProductDetail.js - ENHANCED PREMIUM
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { addNotification } = useNotification();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [imageLoading, setImageLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data - replace with actual API call
  const product = {
    id: 1,
    name: "Premium Cotton T-Shirt",
    description: "High-quality cotton t-shirt with premium finish. Perfect for everyday wear with exceptional comfort and style. Made from 100% organic cotton with reinforced stitching for durability.",
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800",
      "https://images.unsplash.com/photo-1503342217505-b0a15c326d24?w=800",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800"
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Navy', value: '#1e3a8a' },
      { name: 'Forest Green', value: '#166534' }
    ],
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    features: [
      "100% Premium Organic Cotton",
      "Machine Washable",
      "Slim Fit Design",
      "Eco-friendly Materials",
      "Reinforced Stitching",
      "Breathable Fabric"
    ],
    specifications: {
      material: "100% Organic Cotton",
      care: "Machine wash cold, tumble dry low",
      origin: "Bangladesh",
      weight: "180 GSM"
    },
    reviews: [
      { id: 1, user: "Sarah M.", rating: 5, comment: "Absolutely love this t-shirt! Perfect fit and super comfortable.", date: "2024-01-15" },
      { id: 2, user: "John D.", rating: 4, comment: "Great quality fabric. Would buy again!", date: "2024-01-10" }
    ]
  };

  useEffect(() => {
    // Check if product is in wishlist
    setIsWishlisted(isInWishlist(product.id));
    
    // Set default selections
    if (product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    }
  }, [product, isInWishlist]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      addNotification('Please select size and color', 'error');
      return;
    }
    
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };
    
    addToCart(cartItem);
    addNotification('Product added to cart!', 'success');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      addNotification('Removed from wishlist', 'info');
    } else {
      addToWishlist(product);
      addNotification('Added to wishlist!', 'success');
    }
    setIsWishlisted(!isWishlisted);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8"
        >
          <button onClick={() => navigate(-1)} className="hover:text-gray-900 dark:hover:text-white transition-colors">
            ← Back
          </button>
          <span>•</span>
          <span>Men</span>
          <span>•</span>
          <span className="text-gray-900 dark:text-white font-medium">T-Shirts</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-700 relative shadow-2xl"
            >
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-3xl" />
              )}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
                onLoad={handleImageLoad}
                style={{ opacity: imageLoading ? 0 : 1 }}
              />
              
              {/* Wishlist Button */}
              <motion.button
                onClick={handleWishlistToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
              >
                <span className={`text-xl ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}>
                  {isWishlisted ? '❤️' : '♡'}
                </span>
              </motion.button>

              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-2xl font-bold shadow-lg">
                  -{product.discount}% OFF
                </div>
              )}
            </motion.div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedImage(index);
                    setImageLoading(true);
                  }}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-purple-500 shadow-lg' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400 text-lg">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-2xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Save {product.discount}%
                  </span>
                </>
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed"
            >
              {product.description}
            </motion.p>

            {/* Size Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
                Size: <span className="text-purple-600">{selectedSize}</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-2xl border-2 font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-purple-600 bg-purple-600 text-white shadow-lg'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-400 hover:shadow-md'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Color Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
                Color: <span className="text-purple-600">{selectedColor}</span>
              </h3>
              <div className="flex flex-wrap gap-4">
                {product.colors.map((color) => (
                  <motion.button
                    key={color.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-full border-2 transition-all shadow-md ${
                      selectedColor === color.name
                        ? 'border-purple-600 ring-4 ring-purple-200 dark:ring-purple-800'
                        : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </motion.div>

            {/* Quantity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center space-x-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Quantity:</h3>
              <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 rounded-2xl p-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-2xl bg-white dark:bg-gray-600 shadow-sm flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                >
                  -
                </motion.button>
                <span className="w-12 text-center font-bold text-lg text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-2xl bg-white dark:bg-gray-600 shadow-sm flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                >
                  +
                </motion.button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex space-x-4 pt-6"
            >
              <motion.button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-4 px-8 rounded-2xl font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                Add to Cart
              </motion.button>
              <motion.button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-2xl font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                Buy Now
              </motion.button>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-4 pt-6"
            >
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                  </div>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Product Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-16"
        >
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {[
                { id: 'description', name: 'Description' },
                { id: 'specifications', name: 'Specifications' },
                { id: 'reviews', name: `Reviews (${product.reviews.length})` },
                { id: 'shipping', name: 'Shipping & Returns' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-semibold text-sm capitalize transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="prose dark:prose-invert max-w-none"
              >
                {activeTab === 'description' && (
                  <div className="space-y-4">
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      {product.description}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our premium cotton t-shirt is crafted with attention to detail and designed for ultimate comfort. 
                      The fabric is soft, breathable, and maintains its shape wash after wash.
                    </p>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="font-semibold text-gray-900 dark:text-white capitalize">
                          {key}:
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {review.user.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{review.user}</h4>
                              <div className="flex text-yellow-400 text-sm">
                                {'★'.repeat(review.rating)}
                                {'☆'.repeat(5 - review.rating)}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Shipping Information</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        • Free shipping on orders over $50<br/>
                        • Standard delivery: 3-5 business days<br/>
                        • Express delivery: 1-2 business days ($9.99)<br/>
                        • International shipping available
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Return Policy</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        • 30-day easy returns<br/>
                        • Free returns for unworn items<br/>
                        • Full refund or exchange<br/>
                        • Return shipping label included
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;