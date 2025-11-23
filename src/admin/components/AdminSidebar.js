// src/admin/components/AdminSidebar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { path: '/admin', label: 'ড্যাশবোর্ড', icon: '📊' },
    { path: '/admin/products', label: 'প্রোডাক্টস', icon: '👕' },
    { path: '/admin/orders', label: 'অর্ডারস', icon: '📦' },
    { path: '/admin/customers', label: 'কাস্টমারস', icon: '👥' },
    { path: '/admin/settings', label: 'সেটিংস', icon: '⚙️' }
  ];

  const handleLogout = () => {
    // Logout logic here
    navigate('/');
  };

  return (
    <div className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">F</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">FashionBD</h1>
            <p className="text-gray-400 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-4 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 group ${
              location.pathname === item.path 
                ? 'bg-blue-600 text-white shadow-lg border-r-4 border-yellow-400' 
                : ''
            }`}
          >
            <span className="mr-4 text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
            {location.pathname === item.path && (
              <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            )}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200 group"
        >
          <span className="mr-4 text-xl">🚪</span>
          <span>লগআউট</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;