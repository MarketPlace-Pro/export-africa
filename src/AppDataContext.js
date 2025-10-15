import React, { createContext, useContext, useReducer } from 'react';
import { AppData, DataUtils } from './dataIntegration.js';

// Create context
const AppDataContext = createContext();

// Safe data access with fallbacks
const safeData = {
  products: AppData?.products?.all || [],
  categories: AppData?.products?.categories || [],
  blogPosts: AppData?.blog?.all || [],
  blogCategories: AppData?.blog?.categories || [],
  about: AppData?.about || {},
  cart: AppData?.cart || { initialState: { items: [], quoteRequests: [] } },
  certifications: AppData?.certifications || []
};

// Initial state
const initialState = {
  products: safeData.products,
  blogPosts: safeData.blogPosts,
  cart: {
    items: [],
    quoteRequests: [],
    totalAmount: 0,
    itemCount: 0
  },
  currentPage: 'home',
  searchQuery: '',
  filters: {
    category: '',
    supplier: '',
    priceRange: { min: 0, max: 1000 },
    certification: []
  }
};

// Reducer function
function appDataReducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    
    case 'SET_CATEGORY_FILTER':
      const filteredProducts = action.payload ? 
        safeData.products.filter(p => p.category === action.payload) : 
        safeData.products;
      return { 
        ...state, 
        filters: { ...state.filters, category: action.payload },
        products: filteredProducts
      };
    
    case 'SET_SEARCH_QUERY':
      const query = action.payload.toLowerCase();
      const searchedProducts = query ? 
        safeData.products.filter(p => 
          p.name?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.supplier?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query)
        ) : safeData.products;
      return {
        ...state,
        searchQuery: query,
        products: searchedProducts
      };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.items.find(item => item.id === action.payload.id);
      
      let newItems;
      if (existingItem) {
        newItems = state.cart.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
      } else {
        newItems = [...state.cart.items, { ...action.payload, quantity: action.payload.quantity || 1 }];
      }
      
      // Calculate new totals
      const totalAmount = newItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        return total + (price * item.quantity);
      }, 0);
      
      const itemCount = newItems.reduce((total, item) => total + item.quantity, 0);
      
      return {
        ...state,
        cart: {
          ...state.cart,
          items: newItems,
          totalAmount,
          itemCount
        }
      };
    
    case 'REMOVE_FROM_CART':
      const filteredItems = state.cart.items.filter(item => item.id !== action.payload);
      
      const newTotalAmount = filteredItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        return total + (price * item.quantity);
      }, 0);
      
      const newItemCount = filteredItems.reduce((total, item) => total + item.quantity, 0);
      
      return {
        ...state,
        cart: {
          ...state.cart,
          items: filteredItems,
          totalAmount: newTotalAmount,
          itemCount: newItemCount
        }
      };
    
    case 'UPDATE_QUANTITY':
      const updatedItems = state.cart.items.map(item =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0); // Remove items with quantity 0
      
      const updatedTotalAmount = updatedItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        return total + (price * item.quantity);
      }, 0);
      
      const updatedItemCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
      
      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedItems,
          totalAmount: updatedTotalAmount,
          itemCount: updatedItemCount
        }
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        cart: {
          items: [],
          quoteRequests: [],
          totalAmount: 0,
          itemCount: 0
        }
      };
    
    case 'ADD_QUOTE_REQUEST':
      return {
        ...state,
        cart: {
          ...state.cart,
          quoteRequests: [...state.cart.quoteRequests, action.payload]
        }
      };
    
    default:
      return state;
  }
}

// Context provider component
export function AppDataProvider({ children }) {
  const [state, dispatch] = useReducer(appDataReducer, initialState);

  // Action creators
  const actions = {
    setProducts: (products) => dispatch({ type: 'SET_PRODUCTS', payload: products }),
    setCategoryFilter: (category) => dispatch({ type: 'SET_CATEGORY_FILTER', payload: category }),
    setSearchQuery: (query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
    
    addToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
    removeFromCart: (productId) => dispatch({ type: 'REMOVE_FROM_CART', payload: productId }),
    updateQuantity: (productId, quantity) => dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { productId, quantity } 
    }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    
    addQuoteRequest: (request) => dispatch({ type: 'ADD_QUOTE_REQUEST', payload: request })
  };

  const value = {
    ...state,
    ...actions,
    dataUtils: DataUtils,
    appData: AppData,
    categories: safeData.categories,
    blogCategories: safeData.blogCategories,
    about: safeData.about,
    certifications: safeData.certifications
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
}

// Custom hook to use the context
export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}

export default AppDataContext;
