// MAIN DATA INTEGRATION FILE - COMBINES ALL AI-GENERATED CONTENT
import { productsData, categories } from './productData.js';
import { blogPosts, blogCategories } from './blogData.js';
import { aboutContent, certifications } from './aboutData.js';
import { cartInitialState, trustBadges, shippingOptions, paymentMethods } from './cartData.js';
import { seoContent, pageMeta } from './seoData.js';

// Export all data for easy imports
export const AppData = {
  products: {
    all: productsData,
    categories: categories,
    featured: productsData.filter(product => product.rating >= 4.7),
    byCategory: (categoryName) => 
      productsData.filter(product => 
        categories.find(cat => cat.name === categoryName)?.products.includes(product.id)
      )
  },

  blog: {
    all: blogPosts,
    categories: blogCategories,
    featured: blogPosts.slice(0, 3),
    byCategory: (category) => blogPosts.filter(post => post.category === category),
    recent: blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
  },

  about: aboutContent,
  
  cart: {
    initialState: cartInitialState,
    trustBadges: trustBadges,
    shippingOptions: shippingOptions,
    paymentMethods: paymentMethods
  },

  seo: seoContent,
  meta: pageMeta,
  certifications: certifications
};

// Utility functions for data manipulation
export const DataUtils = {
  // Product utilities
  getProductById: (id) => productsData.find(product => product.id === id),
  getProductsBySupplier: (supplier) => productsData.filter(product => product.supplier === supplier),
  getRelatedProducts: (currentProductId) => {
    const currentProduct = productsData.find(p => p.id === currentProductId);
    return productsData.filter(p => 
      p.id !== currentProductId && p.category === currentProduct.category
    ).slice(0, 4);
  },

  // Blog utilities
  getBlogPostById: (id) => blogPosts.find(post => post.id === id),
  getPostsByTag: (tag) => blogPosts.filter(post => post.tags.includes(tag)),
  getPopularPosts: () => blogPosts.sort((a, b) => b.views - a.views).slice(0, 5),

  // SEO utilities
  getMetaForPage: (pageName) => pageMeta[pageName] || pageMeta.home,
  generateProductMeta: (product) => ({
    title: `${product.name} - ${product.supplier} | AfriTrade Export`,
    description: `${product.description.substring(0, 160)}...`,
    keywords: [...product.certifications, product.category, product.origin, 'African export']
  })
};

// Default exports for easy imports
export default AppData;
