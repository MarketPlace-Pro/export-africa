import { useState } from 'react'
import { inquiryService } from '../supabaseClient'
import { emailService } from '../services/emailService'

function RealContactForm({ product, onClose }) {
  const [formData, setFormData] = useState({
    product_id: product?.id || null,
    buyer_name: '',
    buyer_email: '',
    company: '',
    country: '',
    quantity: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { data, error } = await inquiryService.createInquiry(formData)
      
      if (error) throw error
      
      // Send notification to supplier
      await emailService.sendInquiryNotification(
        {
          ...formData,
          product_name: product?.name || 'General Inquiry'
        },
        product?.supplier || 'suppliers@afritrade.com'
      );
      
      setSubmitted(true)
    } catch (error) {
      alert('Error submitting inquiry: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '10px',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <h3>✅ Inquiry Submitted!</h3>
          <p>Your export inquiry has been sent to the supplier.</p>
          <button onClick={onClose} style={{
            background: '#1e3c72',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            marginTop: '1rem',
            cursor: 'pointer'
          }}>
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '10px',
        maxWidth: '500px',
        width: '90%'
      }}>
        <h3>📞 Contact Supplier</h3>
        {product && <p>Product: <strong>{product.name}</strong></p>}
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Your Name" 
            required 
            value={formData.buyer_name} 
            onChange={e => setFormData({...formData, buyer_name: e.target.value})}
            style={{width: '100%', margin: '0.5rem 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}
          />
          <input 
            type="email" 
            placeholder="Email" 
            required
            value={formData.buyer_email}
            onChange={e => setFormData({...formData, buyer_email: e.target.value})}
            style={{width: '100%', margin: '0.5rem 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}
          />
          <input 
            type="text" 
            placeholder="Company"
            value={formData.company}
            onChange={e => setFormData({...formData, company: e.target.value})}
            style={{width: '100%', margin: '0.5rem 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}
          />
          <input 
            type="text" 
            placeholder="Country" 
            required
            value={formData.country}
            onChange={e => setFormData({...formData, country: e.target.value})}
            style={{width: '100%', margin: '0.5rem 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}
          />
          <input 
            type="number" 
            placeholder="Quantity" 
            required
            value={formData.quantity}
            onChange={e => setFormData({...formData, quantity: e.target.value})}
            style={{width: '100%', margin: '0.5rem 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}
          />
          <textarea 
            placeholder="Your message..." 
            required
            rows="4"
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
            style={{width: '100%', margin: '0.5rem 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}
          />
          <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
            <button type="submit" disabled={loading} style={{
              flex: 1,
              background: '#1e3c72',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              {loading ? 'Sending...' : 'Send Inquiry'}
            </button>
            <button type="button" onClick={onClose} style={{
              flex: 1,
              background: '#f7fafc',
              color: '#1e3c72',
              border: '1px solid #1e3c72',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RealContactForm;
