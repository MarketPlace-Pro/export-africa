import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';

// Lazy load components for better performance
import { lazy, Suspense } from 'react';

// Lazy imports - components load only when needed
const Header = lazy(() => import('./components/Header'));
const Home = lazy(() => import('./Home'));
const Products = lazy(() => import('./Products'));
const BuyerRequest = lazy(() => import('./BuyerRequest'));
const Cart = lazy(() => import('./Cart'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const SupplierApplication = lazy(() => import('./SupplierApplication'));
const Suppliers = lazy(() => import('./Suppliers'));
const Blog = lazy(() => import('./Blog'));
const About = lazy(() => import('./About'));

// Simple Error Boundary for better UX
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Something went wrong</h2>
          <p>Please refresh the page or try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#2c5530',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '50vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #2c5530',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p style={{ color: '#666', margin: 0 }}>Loading...</p>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

// Route protection component
const ProtectedRoute = ({ children }) => {
  // This would use your AuthContext to check if user is authenticated
  // For now, it's a placeholder for future implementation
  return children;
};

function Checkout() {
  return (
    <div className="container">
      <div style={{ padding: '2rem 0' }}>
        <h1>💰 Checkout</h1>
        <p>Secure payment processing - Coming Soon</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="App">
              <Suspense fallback={<LoadingSpinner />}>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/buyer-request" element={<BuyerRequest />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/supplier-application" element={<SupplierApplication />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />
                  </Routes>
                </main>
              </Suspense>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
