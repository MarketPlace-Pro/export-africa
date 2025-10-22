import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AppDataProvider } from './AppDataContext.js';

// Lazy load pages for better performance
const Home = lazy(() => import('./Home'));
const Products = lazy(() => import('./Products'));
const Suppliers = lazy(() => import('./Suppliers'));
const SupplierApplication = lazy(() => import('./SupplierApplication'));
const BuyerRequest = lazy(() => import('./BuyerRequest'));
const Blog = lazy(() => import('./Blog'));
const About = lazy(() => import('./About'));
const ContactForm = lazy(() => import('./ContactForm'));

// Simple loading component
const SimpleLoading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px',
    flexDirection: 'column'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #2E8B57',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p style={{ marginTop: '20px', color: '#666' }}>Loading...</p>
    
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

function App() {
  return (
    <AppDataProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Suspense fallback={<SimpleLoading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/supplier-application" element={<SupplierApplication />} />
                <Route path="/buyer-request" element={<BuyerRequest />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactForm />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AppDataProvider>
  );
}

export default App;
