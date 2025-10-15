import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppDataProvider } from './AppDataContext.js';
import Header from './components/Header';
import './App.css';

// Lazy load components for better performance
const Home = lazy(() => import('./Home'));
const Products = lazy(() => import('./Products'));
const Blog = lazy(() => import('./Blog'));
const About = lazy(() => import('./About'));
const Cart = lazy(() => import('./Cart'));
const Suppliers = lazy(() => import('./Suppliers'));
const BuyRequests = lazy(() => import('./BuyRequests'));

// Loading component
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    fontSize: '1.2rem',
    color: '#2E8B57'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #2E8B57',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '15px'
    }}></div>
    Loading AfriTrade Export...
  </div>
);

function App() {
  return (
    <AppDataProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/buy-requests" element={<BuyRequests />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/blog/:postId" element={<Blog />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </AppDataProvider>
  );
}

export default App;
