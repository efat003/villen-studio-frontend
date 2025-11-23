// src/components/layout/Footer.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentYear = currentTime.getFullYear();
  const formattedTime = currentTime.toLocaleTimeString('en-BD', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Dhaka'
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  // Dynamic footer data
  const footerData = {
    company: {
      name: "Villen Studio",
      tagline: "Redefining Fashion Excellence in Bangladesh",
      description: "Premium fashion destination offering curated collections, sustainable fashion, and exceptional customer experiences since 2020.",
      established: "2020"
    },
    
    quickLinks: {
      shop: [
        { to: "/new-arrivals", label: "New Arrivals", icon: "🆕" },
        { to: "/bestsellers", label: "Bestsellers", icon: "🔥" },
        { to: "/men", label: "Men's Collection", icon: "👔" },
        { to: "/women", label: "Women's Collection", icon: "👗" },
        { to: "/accessories", label: "Accessories", icon: "🕶️" },
        { to: "/sale", label: "Sale", icon: "💰", highlight: true }
      ],
      support: [
        { to: "/contact", label: "Contact Us", icon: "📞" },
        { to: "/shipping", label: "Shipping Info", icon: "🚚" },
        { to: "/returns", label: "Returns & Exchange", icon: "🔄" },
        { to: "/size-guide", label: "Size Guide", icon: "📏" },
        { to: "/faq", label: "FAQ", icon: "❓" },
        { to: "/track-order", label: "Track Order", icon: "📍" }
      ],
      company: [
        { to: "/about", label: "About Us", icon: "🏢" },
        { to: "/sustainability", label: "Sustainability", icon: "🌱" },
        { to: "/careers", label: "Careers", icon: "💼" },
        { to: "/blog", label: "Blog", icon: "📝" },
        { to: "/press", label: "Press Kit", icon: "📰" },
        { to: "/affiliates", label: "Affiliate Program", icon: "🤝" }
      ]
    },

    contact: {
      phone: "+8801627457073",
      phoneDisplay: "+880 1627-457073",
      email: "hello@villenstudio.com",
      supportEmail: "support@villenstudio.com",
      address: "Gulshan 1, Dhaka 1212, Bangladesh",
      businessHours: "9:00 AM - 11:00 PM (Everyday)"
    },

    social: [
      { name: 'Instagram', icon: '📸', url: 'https://instagram.com/villenstudio', color: 'from-pink-500 to-purple-600' },
      { name: 'Facebook', icon: '👥', url: 'https://facebook.com/villenstudio', color: 'from-blue-600 to-blue-800' },
      { name: 'TikTok', icon: '🎵', url: 'https://tiktok.com/@villenstudio', color: 'from-gray-900 to-gray-700' },
      { name: 'YouTube', icon: '📺', url: 'https://youtube.com/villenstudio', color: 'from-red-600 to-red-800' },
      { name: 'Pinterest', icon: '📌', url: 'https://pinterest.com/villenstudio', color: 'from-red-500 to-red-600' },
      { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/company/villenstudio', color: 'from-blue-700 to-blue-900' }
    ],

    features: [
      { icon: "🚚", title: "Free Shipping", desc: "On orders over ৳2000" },
      { icon: "↩️", title: "Easy Returns", desc: "30-day return policy" },
      { icon: "🔒", title: "Secure Payment", desc: "SSL encrypted" },
      { icon: "⭐", title: "Premium Quality", desc: "Quality guaranteed" }
    ],

    paymentMethods: [
      "💳 Visa", "💳 MasterCard", "💳 American Express", 
      "📱 bKash", "📱 Nagad", "📱 Rocket", "🏦 Bank Transfer"
    ]
  };

  const StatCard = ({ number, label }) => (
    <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-lg border border-white/10">
      <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-500 rounded-full filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-500 rounded-full filter blur-xl opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-pink-500 rounded-full filter blur-xl opacity-20 animate-ping"></div>
      </div>

      <div className="relative z-10 text-white">
        {/* Features Banner */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {footerData.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-3 text-white">
                  <span className="text-2xl">{feature.icon}</span>
                  <div className="text-sm">
                    <div className="font-semibold">{feature.title}</div>
                    <div className="text-cyan-100 text-xs">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Company Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-8 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 mb-6">
              <h1 className="text-4xl font-bold tracking-tight">VILLEN STUDIO</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
              {footerData.company.description}
            </p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <StatCard number="4+" label="Years Experience" />
              <StatCard number="10K+" label="Happy Customers" />
              <StatCard number="50+" label="Brand Partners" />
              <StatCard number="24/7" label="Customer Support" />
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            {/* Contact Section */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Get In Touch
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-200">
                      📞
                    </div>
                    <div>
                      <a href={`tel:${footerData.contact.phone}`} className="text-white font-semibold hover:underline block">
                        {footerData.contact.phoneDisplay}
                      </a>
                      <p className="text-gray-400 text-sm">Call us anytime</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-200">
                      ✉️
                    </div>
                    <div>
                      <a href={`mailto:${footerData.contact.email}`} className="text-white font-semibold hover:underline block">
                        {footerData.contact.email}
                      </a>
                      <p className="text-gray-400 text-sm">Main inquiries</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      📍
                    </div>
                    <div>
                      <p className="text-white font-semibold">{footerData.contact.address}</p>
                      <p className="text-gray-400 text-sm">{footerData.contact.businessHours}</p>
                    </div>
                  </div>
                </div>

                {/* Live Time */}
                <div className="bg-black/30 rounded-2xl p-4 text-center">
                  <p className="text-gray-400 text-sm">Current Time in Dhaka</p>
                  <p className="text-2xl font-mono font-bold text-cyan-400">{formattedTime}</p>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerData.quickLinks).map(([key, links]) => (
              <div key={key} className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-6 text-cyan-300 border-b border-cyan-500/30 pb-2 capitalize">
                  {key}
                </h3>
                <ul className="space-y-3">
                  {links.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={item.to}
                        className={`flex items-center space-x-3 transition-all duration-200 group py-2 ${
                          item.highlight ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="group-hover:translate-x-2 transition-transform duration-200">
                          {item.label}
                        </span>
                        {item.highlight && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2 animate-pulse">
                            SALE
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social & Newsletter Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Social Media */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Join Our Community
              </h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {footerData.social.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.url}
                    className={`w-14 h-14 bg-gradient-to-br ${platform.color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg hover:shadow-2xl transform hover:scale-110 hover:rotate-12 transition-all duration-300`}
                    aria-label={platform.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {platform.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="text-center lg:text-right">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                Stay in the Loop
              </h3>
              {isSubscribed ? (
                <div className="bg-green-500/20 border border-green-500 rounded-2xl p-6">
                  <div className="text-green-400 text-lg font-semibold">🎉 Thank you for subscribing!</div>
                  <p className="text-gray-300">Welcome to the Villen Studio family!</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for exclusive offers"
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-lg flex-1 min-w-0"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-gray-300 mb-4">We Accept</h4>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {footerData.paymentMethods.map((method, index) => (
                <span key={index} className="bg-white/10 px-3 py-2 rounded-lg border border-white/20">
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="text-center lg:text-left">
                <p className="text-gray-400">
                  © {currentYear} <span className="font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Villen Studio
                  </span>. All rights reserved. | Est. {footerData.company.established}
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/privacy" className="text-gray-400 hover:text-cyan-300 transition-colors duration-200 hover:underline">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-cyan-300 transition-colors duration-200 hover:underline">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-cyan-300 transition-colors duration-200 hover:underline">
                  Cookies
                </Link>
                <Link to="/sitemap" className="text-gray-400 hover:text-cyan-300 transition-colors duration-200 hover:underline">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;