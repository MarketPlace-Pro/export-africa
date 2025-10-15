import { useState } from 'react';
import { supabase } from '../supabaseClient';
import './UserAuth.css';

function UserAuth({ onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
    userType: 'buyer'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login logic
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (error) throw error;
        
        onAuthSuccess({
          user: data.user,
          userType: 'buyer' // In real app, get from user profile
        });
        
      } else {
        // Signup logic
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              company: formData.company,
              user_type: formData.userType
            }
          }
        });

        if (error) throw error;

        // Create user profile
        if (data.user) {
          await supabase
            .from('user_profiles')
            .insert([{
              id: data.user.id,
              email: formData.email,
              name: formData.name,
              company: formData.company,
              user_type: formData.userType,
              created_at: new Date().toISOString()
            }]);
        }

        onAuthSuccess({
          user: data.user,
          userType: formData.userType,
          message: 'Account created successfully! Please check your email for verification.'
        });
      }
    } catch (error) {
      alert(isLogin ? 'Login failed: ' + error.message : 'Signup failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      
      <div className="modal-content">
        <div className="modal-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to your account' : 'Join AfriTrade Global today'}</p>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleAuth}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Your company (optional)"
                />
              </div>

              <div className="form-group">
                <label>I am a *</label>
                <select
                  required
                  value={formData.userType}
                  onChange={(e) => handleInputChange('userType', e.target.value)}
                >
                  <option value="buyer">🌍 Buyer / Importer</option>
                  <option value="supplier">🏭 Supplier / Exporter</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="link-button"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        <div className="auth-benefits">
          <h3>🎯 Benefits of Creating an Account:</h3>
          <ul>
            <li>Track your orders and inquiries</li>
            <li>Save favorite products and suppliers</li>
            <li>Faster checkout process</li>
            <li>Personalized product recommendations</li>
            <li>Export market insights</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserAuth;
