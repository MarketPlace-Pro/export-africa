import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Performance monitoring
const startTime = performance.now();

// Error tracking setup (can integrate with services like Sentry later)
const logError = (error, errorInfo) => {
  console.error('Application Error:', error, errorInfo);
  // Here you can add error reporting to services like:
  // Sentry.captureException(error, { extra: errorInfo });
};

// Strict Mode for development best practices
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance measurement
const endTime = performance.now();
console.log(`🚀 App rendered in ${(endTime - startTime).toFixed(2)}ms`);

// Web vitals reporting with enhanced logging
reportWebVitals((metric) => {
  console.log('📊 Performance Metric:', metric.name, metric.value);
  
  // You can send these to analytics services
  switch (metric.name) {
    case 'FCP':
      console.log('🎯 First Contentful Paint:', metric.value);
      break;
    case 'LCP':
      console.log('🎯 Largest Contentful Paint:', metric.value);
      break;
    case 'CLS':
      console.log('🎯 Cumulative Layout Shift:', metric.value);
      break;
    case 'FID':
      console.log('🎯 First Input Delay:', metric.value);
      break;
    default:
      break;
  }
});

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  logError(event.error, {
    componentStack: event.error?.componentStack,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  logError(event.reason, {
    type: 'unhandledrejection'
  });
});

// Service Worker registration for future PWA capabilities
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registered:', registration);
      })
      .catch((registrationError) => {
        console.log('❌ Service Worker registration failed:', registrationError);
      });
  });
}
