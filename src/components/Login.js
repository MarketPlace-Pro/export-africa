import React, { useState } from 'react'
import { authAPI } from '../supabaseClient'
import './Auth.css'

const Login = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await authAPI.signIn(email, password)
      if (error) throw error
      
      // Success - close modal or redirect
      if (onClose) onClose()
      window.location.reload() // Refresh to update auth state
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <h2>Welcome Back</h2>
        <p>Sign in to your AfriTrade account</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? 
            <button onClick={onSwitchToRegister} className="link-button">
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
