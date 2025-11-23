// src/utils/api.js
const API_BASE_URL = 'http://localhost:5000/api';

// Admin API functions
export const adminAPI = {
  // Dashboard data
  async getDashboardData() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Dashboard data load error:', error);
      return {
        success: false,
        data: {
          totalProducts: 0,
          totalOrders: 0,
          totalCustomers: 0,
          totalRevenue: 0,
          recentOrders: [],
          stats: {
            pendingOrders: 0,
            completedOrders: 0,
            lowStockProducts: 0
          }
        }
      };
    }
  },

  // Products
  async getProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/products`);
      return await response.json();
    } catch (error) {
      console.error('Products load error:', error);
      return { success: false, data: [] };
    }
  },

  async createProduct(productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      return await response.json();
    } catch (error) {
      console.error('Product create error:', error);
      return { success: false, message: 'Network error' };
    }
  },

  async updateProduct(id, productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      return await response.json();
    } catch (error) {
      console.error('Product update error:', error);
      return { success: false, message: 'Network error' };
    }
  },

  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error('Product delete error:', error);
      return { success: false, message: 'Network error' };
    }
  }
};