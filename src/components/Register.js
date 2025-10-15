import React, { useState } from 'react'
import { authAPI } from '../supabaseClient'
import './Auth.css'

const Register = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'buyer',
    companyName: '',
    fullName: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const profileData = {
        full_name: formData.fullName,
        company_name: formData.companyName,
        user_type: formData.userType
      }

      const { data, error } = await authAPI.signUp(
        formData.email, 
        formData.password, 
        formData.userType, 
        profileData
      )
      
      if (error) throw error
      
      // Success - show confirmation message
      alert('Registration successful! Please check your email to confirm your account.')
      if (onClose) onClose()
      
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <h2>Join AfriTrade</h2>
        <p>Create your account to start trading</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your company name"
              required
            />
          </div>

          <div className="form-group">
            <label>I am a:</label>
            <select 
              name="userType" 
              value={formData.userType} 
              onChange={handleChange}
              className="user-type-select"
            >
              <option value="buyer">Buyer/Importer</option>
              <option value="supplier">Supplier/Exporter</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? 
            <button onClick={onSwitchToLogin} className="link-button">
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
