// src/admin/Products.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminAPI } from '../utils/api';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await adminAPI.getProducts();
      if (result.success) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error('Products load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData) => {
    const result = await adminAPI.createProduct(productData);
    if (result.success) {
      setShowAddModal(false);
      loadProducts(); // Refresh list
    }
  };

  const handleEditProduct = async (id, productData) => {
    const result = await adminAPI.updateProduct(id, productData);
    if (result.success) {
      setEditingProduct(null);
      loadProducts(); // Refresh list
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('আপনি কি এই প্রোডাক্ট ডিলিট করতে চান?')) {
      const result = await adminAPI.deleteProduct(id);
      if (result.success) {
        loadProducts(); // Refresh list
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {/* Header with Add Button */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">প্রোডাক্ট ম্যানেজমেন্ট</h1>
              <p className="text-gray-600">আপনার সকল প্রোডাক্ট পরিচালনা করুন</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>+</span>
              <span>নতুন প্রোডাক্ট</span>
            </button>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-8">লোড হচ্ছে...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onEdit={setEditingProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          )}

          {/* Add/Edit Modals */}
          {showAddModal && (
            <ProductModal
              onClose={() => setShowAddModal(false)}
              onSave={handleAddProduct}
            />
          )}

          {editingProduct && (
            <ProductModal
              product={editingProduct}
              onClose={() => setEditingProduct(null)}
              onSave={(data) => handleEditProduct(editingProduct._id, data)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
    >
      {/* Product Image */}
      <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <span className="text-4xl">👕</span>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">৳{product.price}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            Stock: {product.stock}
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 transition-colors"
          >
            এডিট
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition-colors"
          >
            ডিলিট
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Product Modal Component
const ProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    product || {
      name: '',
      description: '',
      price: '',
      category: 'শার্ট',
      stock: '',
      sizes: [],
      colors: []
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">
          {product ? 'প্রোডাক্ট এডিট করুন' : 'নতুন প্রোডাক্ট যোগ করুন'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="প্রোডাক্টের নাম"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <textarea
            placeholder="বিবরণ"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          />
          
          <input
            type="number"
            placeholder="দাম"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <input
            type="number"
            placeholder="স্টক সংখ্যা"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              সেভ করুন
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Products;