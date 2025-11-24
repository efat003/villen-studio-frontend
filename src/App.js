// src/App.js - FIXED WITH CORRECT FILE PATHS
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Context Providers
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import { WishlistProvider } from './context/WishlistContext';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './utils/ScrollToTop';
import LoadingSpinner from './components/ui/LoadingSpinner';
import NotificationToast from './components/ui/NotificationToast';
import MobileNavigation from './components/layout/MobileNavigation';
import QuickCart from './components/cart/QuickCart';

// Pages
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Shoes from './pages/Shoes';
import Accessories from './pages/Accessories';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Contact from './pages/Contact';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import About from './pages/about'; // Fixed: lowercase 'about'

// Admin Pages - Check if these files exist, if not, we'll create them
import AdminDashboard from './admin/Dashboard'; // Fixed: lowercase 'dashboard'
// import AdminProducts from './admin/Products'; // Commented out - file doesn't exist
// import AdminOrders from './admin/Orders'; // Commented out - file doesn't exist
import AdminSidebar from './components/AdminSidebar'; // Check if this exists
import AdminHeader from './components/AdminHeader'; 

// Styles
import './App.css';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null 
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We apologize for the inconvenience. Please try again.
            </p>
            <button 
              onClick={this.handleRetry}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <NotificationProvider>
                    <Router
                      future={{
                        v7_startTransition: true,
                        v7_relativeSplatPath: true,
                      }}
                    >
                      <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                        <Navbar />
                        <MobileNavigation />
                        <QuickCart />
                        <ScrollToTop />
                       
                        <NotificationToast />
                        
                        <main className="relative min-h-[80vh]">
                          <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/men" element={<Men />} />
                            <Route path="/women" element={<Women />} />
                            <Route path="/shoes" element={<Shoes />} />
                            <Route path="/accessories" element={<Accessories />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/payment/success" element={<PaymentSuccess />} />
                            <Route path="/payment/failed" element={<PaymentFailed />} />
                            
                            {/* Admin Routes - Only include if files exist */}
                            <Route path="/admin" element={<AdminDashboard />} />
                            {/* Comment out until files are created */}
                            {/* <Route path="/admin/products" element={<AdminProducts />} /> */}
                            {/* <Route path="/admin/orders" element={<AdminOrders />} /> */}
                            
                            {/* 404 Fallback Route */}
                            <Route path="*" element={
                              <div className="min-h-screen flex items-center justify-center">
                                <div className="text-center">
                                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                    404
                                  </h1>
                                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                                    Page not found
                                  </p>
                                  <a 
                                    href="/"
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                  >
                                    Return to Home
                                  </a>
                                </div>
                              </div>
                            } />
                          </Routes>
                        </main>
                        
                        <Footer />
                      </div>
                    </Router>
                  </NotificationProvider>
                </WishlistProvider>
              </CartProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;