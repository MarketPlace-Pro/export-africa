import React, { useEffect, useState } from 'react'
import { productsAPI } from '../supabaseClient'

const SupabaseTest = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing Supabase connection...')
        const result = await productsAPI.getAll()
        console.log('Result:', result)
        
        if (result.data) {
          setProducts(result.data)
        } else if (result.success && result.data) {
          setProducts(result.data)
        } else {
          setError('No data received')
        }
      } catch (err) {
        console.error('Test failed:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    testConnection()
  }, [])

  if (loading) return (
    <div style={{ padding: '20px', background: '#fff3cd', margin: '10px', borderRadius: '8px' }}>
      <h3>🔄 Testing Database Connection...</h3>
      <p>Connecting to Supabase...</p>
    </div>
  )

  if (error) return (
    <div style={{ padding: '20px', background: '#f8d7da', margin: '10px', borderRadius: '8px' }}>
      <h3>❌ Connection Error</h3>
      <p>{error}</p>
      <p>Check your .env file and Supabase credentials</p>
    </div>
  )

  return (
    <div style={{ 
      padding: '20px', 
      background: '#d1edff', 
      margin: '10px', 
      borderRadius: '8px',
      border: '2px solid #007bff'
    }}>
      <h3>✅ Supabase Connection Successful!</h3>
      <p>📦 Products loaded: {products.length}</p>
      <div style={{ marginTop: '15px' }}>
        {products.slice(0, 3).map(product => (
          <div key={product.id} style={{ 
            margin: '8px', 
            padding: '12px', 
            background: 'white',
            borderRadius: '6px',
            border: '1px solid #dee2e6'
          }}>
            <strong>{product.name}</strong><br/>
            Category: {product.category}<br/>
            Price: {product.price}<br/>
            Supplier: {product.supplier}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SupabaseTest
