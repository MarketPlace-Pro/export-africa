import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ==================== ENHANCED SECURE API FUNCTIONS ====================

// Authentication functions
export const authAPI = {
  signUp: async (email, password, userType, profileData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType,
            ...profileData
          }
        }
      })
      return { data, error }
    } catch (error) {
      console.error('Auth signUp error:', error)
      return { data: null, error }
    }
  },

  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      return { data, error }
    } catch (error) {
      console.error('Auth signIn error:', error)
      return { data: null, error }
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      console.error('Auth signOut error:', error)
      return { error }
    }
  },

  getCurrentUser: () => {
    return supabase.auth.getUser()
  },

  resetPassword: async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email)
      return { data, error }
    } catch (error) {
      console.error('Auth resetPassword error:', error)
      return { data: null, error }
    }
  }
}

// Enhanced Products API with fallbacks
export const productsAPI = {
  getAll: async () => {
    try {
      // Try Supabase first
      if (supabaseUrl && supabaseAnonKey) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })

        if (!error) return { success: true, data }
      }

      // Fallback to your existing productService
      return await productService.getProducts()
    } catch (error) {
      console.error('Products getAll error:', error)
      return await productService.getProducts() // Fallback
    }
  },

  getByCategory: async (category) => {
    try {
      if (supabaseUrl && supabaseAnonKey) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', category)
        return { data, error }
      }
      
      // Fallback
      const result = await productService.getProducts()
      const filtered = result.data?.filter(p => p.category === category) || []
      return { data: filtered, error: null }
    } catch (error) {
      console.error('Products getByCategory error:', error)
      return { data: null, error }
    }
  },

  create: async (productData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (supabaseUrl && supabaseAnonKey && user) {
        const { data, error } = await supabase
          .from('products')
          .insert([
            {
              ...productData,
              supplier_id: user.id,
              status: 'active',
              created_at: new Date().toISOString()
            }
          ])
          .select()
        return { data, error }
      }

      // Fallback to existing service
      return await productService.addProduct(productData)
    } catch (error) {
      console.error('Products create error:', error)
      return await productService.addProduct(productData) // Fallback
    }
  }
}

// Suppliers API
export const suppliersAPI = {
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
      return { data, error }
    } catch (error) {
      console.error('Suppliers getAll error:', error)
      return { data: null, error }
    }
  },

  upsertProfile: async (profileData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { data, error } = await supabase
        .from('suppliers')
        .upsert([
          {
            user_id: user?.id,
            ...profileData,
            created_at: new Date().toISOString()
          }
        ])
        .select()
      return { data, error }
    } catch (error) {
      console.error('Suppliers upsertProfile error:', error)
      return { data: null, error }
    }
  }
}

// Buyers API
export const buyersAPI = {
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('buyers')
        .select('*')
      return { data, error }
    } catch (error) {
      console.error('Buyers getAll error:', error)
      return { data: null, error }
    }
  },

  upsertProfile: async (profileData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { data, error } = await supabase
        .from('buyers')
        .upsert([
          {
            user_id: user?.id,
            ...profileData,
            created_at: new Date().toISOString()
          }
        ])
        .select()
      return { data, error }
    } catch (error) {
      console.error('Buyers upsertProfile error:', error)
      return { data: null, error }
    }
  }
}

// ==================== KEEP YOUR EXISTING FUNCTIONS ====================

// Fallback functions for when Supabase is not configured
export const saveToLocalStorage = (key, data) => {
  try {
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    const newData = [...existing, { ...data, id: Date.now(), timestamp: new Date().toISOString() }]
    localStorage.setItem(key, JSON.stringify(newData))
    return { success: true, data: newData }
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return { success: false, error }
  }
}

export const getFromLocalStorage = (key) => {
  try {
    const data = JSON.parse(localStorage.getItem(key) || '[]')
    return { success: true, data }
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return { success: false, error, data: [] }
  }
}

// Your existing product service functions (keep them!)
export const productService = {
  async getProducts() {
    try {
      // Try Supabase first
      if (supabaseUrl && supabaseAnonKey) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('status', 'active')

        if (!error) return { success: true, data }
      }

      // Fallback to localStorage
      const localData = getFromLocalStorage('products')
      if (localData.success && localData.data.length > 0) {
        return { success: true, data: localData.data }
      }

      // Final fallback to static data
      return {
        success: true,
        data: [
          {
            id: 1,
            name: 'Navel Oranges',
            category: 'Citrus Fruits',
            price: '$850/ton',
            quality: 'Export Grade A',
            availability: 'June - November',
            supplier: 'Citrus Farms Co.',
            location: 'Limpopo, South Africa'
          },
          {
            id: 2,
            name: 'Table Grapes',
            category: 'Grapes',
            price: '$1,200/ton',
            quality: 'Premium Export',
            availability: 'January - April',
            supplier: 'Table Grape Exporters',
            location: 'Western Cape, South Africa'
          }
        ]
      }
    } catch (error) {
      console.error('Error getting products:', error)
      return { success: false, error }
    }
  },

  async addProduct(productData) {
    try {
      // Try Supabase first
      if (supabaseUrl && supabaseAnonKey) {
        const { data, error } = await supabase
          .from('products')
          .insert([{ ...productData, status: 'active', created_at: new Date().toISOString() }])
          .select()

        if (!error) return { success: true, data }
      }

      // Fallback to localStorage
      return saveToLocalStorage('products', { ...productData, status: 'active' })
    } catch (error) {
      console.error('Error adding product:', error)
      return { success: false, error }
    }
  }
}

// Your existing inquiry service functions (keep them!)
export const inquiryService = {
  async getInquiries() {
    try {
      // Try Supabase first
      if (supabaseUrl && supabaseAnonKey) {
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false })

        if (!error) return { success: true, data }
      }

      // Fallback to localStorage
      return getFromLocalStorage('inquiries')
    } catch (error) {
      console.error('Error getting inquiries:', error)
      return { success: false, error }
    }
  },

  async addInquiry(inquiryData) {
    try {
      // Try Supabase first
      if (supabaseUrl && supabaseAnonKey) {
        const { data, error } = await supabase
          .from('inquiries')
          .insert([{ ...inquiryData, status: 'new', created_at: new Date().toISOString() }])
          .select()

        if (!error) return { success: true, data }
      }

      // Fallback to localStorage
      return saveToLocalStorage('inquiries', { ...inquiryData, status: 'new' })
    } catch (error) {
      console.error('Error adding inquiry:', error)
      return { success: false, error }
    }
  }
}

export default supabase
