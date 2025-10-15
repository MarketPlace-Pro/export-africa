import { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import { paymentService } from '../services/paymentService';
import { emailService } from '../services/emailService';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const { cart, clearCart, getCartTotal, getCartItemsCount } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Buyer Information
    email: '',
    name: '',
    phone: '',
    company: '',

    // Shipping Address
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',

    // Payment
    paymentMethod: 'card'
  });

  useEffect(() => {
    if (cart.items.length === 0 && step === 1) {
      navigate('/products');
    }
  }, [cart.items.length, step, navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlaceOrder = async () => {
    if (cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);

    const buyerInfo = {
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      company: formData.company
    };

    const shippingAddress = {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      postalCode: formData.postalCode
    };

    try {
      const result = await paymentService.createOrder(cart.items, buyerInfo, shippingAddress);
      
      if (result.success) {
        setOrder(result.order);
        setStep(3); // Move to payment step
        
        // In real implementation, you would redirect to Stripe Checkout
        // For demo, we'll simulate payment success after a delay
        setTimeout(() => {
          handlePaymentSuccess(result.order.id);
        }, 3000);
        
      } else {
        alert('Failed to create order: ' + result.error);
      }
    } catch (error) {
      alert('Error creating order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (orderId) => {
    try {
      const result = await paymentService.processPayment(orderId, { type: 'card' });
      
      if (result.success) {
        // Send order confirmation email
        await emailService.sendOrderConfirmation(
          order, 
          formData.email
        );
        
        setStep(4); // Success step
        clearCart();
      } else {
        alert('Payment failed: ' + result.error);
      }
    } catch (error) {
      alert('Payment processing error: ' + error.message);
    }
  };

  const renderStep1 = () => (
    <div className="checkout-step">
      <h2>📦 Review Your Order</h2>
      <div className="order-summary">
        <div className="order-items">
          {cart.items.map(item => (
            <div key={item.id} className="order-item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>By: {item.supplier}</p>
                <div className="item-details">
                  <span>${item.price} × {item.quantity} {item.unit}</span>
                  <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="order-totals">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>
          <div className="total-row grand-total">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button 
        className="btn-primary"
        onClick={() => setStep(2)}
        disabled={cart.items.length === 0}
      >
        Continue to Shipping
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="checkout-step">
      <h2>🚚 Shipping Information</h2>
      
      <div className="form-grid">
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
          <label>Phone Number *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
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

        <div className="form-group full-width">
          <label>Street Address *</label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="123 Main Street"
          />
        </div>

        <div className="form-group">
          <label>City *</label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="City"
          />
        </div>

        <div className="form-group">
          <label>State/Province *</label>
          <input
            type="text"
            required
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            placeholder="State or Province"
          />
        </div>

        <div className="form-group">
          <label>Postal Code *</label>
          <input
            type="text"
            required
            value={formData.postalCode}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
            placeholder="ZIP / Postal Code"
          />
        </div>

        <div className="form-group">
          <label>Country *</label>
          <select
            required
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
          >
            <option value="">Select Country</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="CN">China</option>
            <option value="JP">Japan</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="step-actions">
        <button 
          className="btn-secondary"
          onClick={() => setStep(1)}
        >
          ← Back to Cart
        </button>
        <button 
          className="btn-primary"
          onClick={handlePlaceOrder}
          disabled={loading || !formData.name || !formData.email || !formData.phone || !formData.address}
        >
          {loading ? 'Creating Order...' : 'Place Order & Pay'}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="checkout-step">
      <h2>💳 Processing Payment</h2>
      <div className="payment-processing">
        <div className="loading-spinner"></div>
        <p>Processing your payment securely...</p>
        <div className="order-details-preview">
          <h3>Order #{order?.order_number}</h3>
          <p>Total: <strong>${order?.total_amount}</strong></p>
          <p>This is a demo. In a real implementation, you would be redirected to Stripe Checkout.</p>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="checkout-step success-step">
      <div className="success-icon">✅</div>
      <h2>Payment Successful!</h2>
      <p className="success-message">
        Thank you for your order. Your export request has been received and suppliers have been notified.
      </p>
      
      <div className="order-confirmation">
        <h3>Order Confirmation</h3>
        <p><strong>Order Number:</strong> {order?.order_number}</p>
        <p><strong>Total Amount:</strong> ${order?.total_amount}</p>
        <p><strong>Email Sent To:</strong> {formData.email}</p>
      </div>

      <div className="next-steps">
        <h3>What happens next?</h3>
        <ul>
          <li>✅ Suppliers will contact you within 24 hours</li>
          <li>📧 You'll receive order confirmation via email</li>
          <li>📞 Our team will assist with logistics</li>
          <li>🚢 Shipping arrangements will be coordinated</li>
        </ul>
      </div>

      <div className="success-actions">
        <button 
          className="btn-primary"
          onClick={() => navigate('/products')}
        >
          Continue Shopping
        </button>
        <button 
          className="btn-secondary"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <div className="checkout-progress">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
              <span>1</span>
              Cart
            </div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
              <span>2</span>
              Shipping
            </div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
              <span>3</span>
              Payment
            </div>
            <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>
              <span>4</span>
              Complete
            </div>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-main">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </div>

          {step < 4 && (
            <div className="checkout-sidebar">
              <div className="order-summary-card">
                <h3>Order Summary</h3>
                <div className="summary-items">
                  {cart.items.slice(0, 3).map(item => (
                    <div key={item.id} className="summary-item">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">×{item.quantity}</span>
                      <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  {cart.items.length > 3 && (
                    <div className="more-items">
                      +{cart.items.length - 3} more items
                    </div>
                  )}
                </div>
                <div className="summary-total">
                  <span>Total:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="security-badge">
                <div className="lock-icon">🔒</div>
                <div>
                  <strong>Secure Checkout</strong>
                  <p>Your payment information is encrypted</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Add default export
export default Checkout;
