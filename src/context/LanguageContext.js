// src/context/LanguageContext.js - UPDATED FOR VILLEN
import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    // Navigation
    home: "Home",
    men: "Men's",
    women: "Women's",
    shoes: "Footwear",
    accessories: "Accessories",
    contact: "Contact",
    login: "Sign In",
    register: "Join Villen",
    profile: "My Profile",
    orders: "My Orders",
    logout: "Sign Out",
    
    // Brand Specific
    brandName: "Villen Apparels",
    brandTagline: "Elevating Everyday Style",
    
    // Common
    search: "Discover premium styles...",
    addToCart: "Add to Cart",
    buyNow: "Shop Now",
    price: "Investment",
    quantity: "Quantity",
    size: "Select Size",
    color: "Choose Color",
    total: "Total Amount",
    subtotal: "Subtotal",
    shipping: "Delivery",
    discount: "Savings",
    
    // Homepage
    welcome: "Welcome to Villen Apparels",
    slogan: "Where sophistication meets contemporary fashion",
    shopNow: "Explore Collection",
    featured: "Signature Collection",
    trending: "Trending Now",
    newArrivals: "New Arrivals",
    
    // Product
    inStock: "Available",
    outOfStock: "Coming Soon",
    reviews: "Style Reviews",
    description: "Craftsmanship",
    specifications: "Details",
    
    // Cart
    shoppingCart: "Style Bag",
    emptyCart: "Your style bag is empty",
    continueShopping: "Continue Exploring",
    proceedToCheckout: "Complete Order",
    
    // Checkout
    checkout: "Checkout",
    shippingAddress: "Delivery Address",
    paymentMethod: "Payment",
    placeOrder: "Confirm Order",
    
    // Contact
    contactUs: "Get in Touch",
    sendMessage: "Send Message",
  },
  bn: {
    // Navigation
    home: "হোম",
    men: "পুরুষ",
    women: "মহিলা",
    shoes: "জুতা",
    accessories: "অ্যাকসেসরিজ",
    contact: "যোগাযোগ",
    login: "সাইন ইন",
    register: "ভিলেনে যোগ দিন",
    profile: "প্রোফাইল",
    orders: "আমার অর্ডার",
    logout: "সাইন আউট",
    
    // Brand Specific
    brandName: "ভিলেন অ্যাপারেলস",
    brandTagline: "দৈনন্দিন স্টাইলকে উন্নত করা",
    
    // Common
    search: "প্রিমিয়াম স্টাইল খুঁজুন...",
    addToCart: "কার্টে যোগ করুন",
    buyNow: "এখনই কিনুন",
    price: "মূল্য",
    quantity: "পরিমাণ",
    size: "সাইজ নির্বাচন",
    color: "রং নির্বাচন",
    total: "মোট Amount",
    subtotal: "সাবটোটাল",
    shipping: "ডেলিভারি",
    discount: "সঞ্চয়",
    
    // Homepage
    welcome: "ভিলেন অ্যাপারেলসে স্বাগতম",
    slogan: "যেখানে পরিশীলিততা meets সমসাময়িক ফ্যাশন",
    shopNow: "কালেকশন এক্সপ্লোর করুন",
    featured: "সিগনেচার কালেকশন",
    trending: "ট্রেন্ডিং এখন",
    newArrivals: "নতুন আগমন",
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};