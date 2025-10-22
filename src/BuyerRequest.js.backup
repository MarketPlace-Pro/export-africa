import React, { useState } from 'react';
import { workingEmailService } from './services/workingEmailService';
import { saveToLocalStorage } from './supabaseClient';
import './BuyerRequest.css';

function BuyerRequest() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    country: '',
    productsRequired: [],
    quantity: '',
    timeline: '',
    budget: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      productsRequired: checked
        ? [...prev.productsRequired, value]
        : prev.productsRequired.filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      console.log('🔄 Submitting buyer request:', formData);
      
      // Send email using working service
      const emailResult = await workingEmailService.sendBuyerRequest(formData);
      
      // Save to localStorage as additional backup
      await saveToLocalStorage('buyer_requests', formData);
      
      console.log('✅ Form submission result:', emailResult);
      
      if (emailResult.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          companyName: '',
          contactPerson: '',
          country: '',
          productsRequired: [],
          quantity: '',
          timeline: '',
          budget: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('❌ Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="buyer-request-page">
        <h1>🌍 Become a Buyer</h1>
        <p className="page-subtitle">Connect with verified South African fresh produce suppliers</p>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="buyer-form">
            <div className="form-section">
              <h3>Company Information</h3>
              
              <div className="form-group">
                <label htmlFor="companyName">Company Name *</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactPerson">Contact Person *</label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Product Requirements</h3>
              
              <div className="form-group">
                <label>Products Needed *</label>
                <div className="checkbox-grid">
                  {[
                    'Citrus Fruits (Oranges, Lemons, Grapefruit)',
                    'Table Grapes',
                    'Stone Fruits (Peaches, Plums, Nectarines)',
                    'Pomegranates',
                    'Avocados',
                    'Berries (Blueberries, Raspberries)',
                    'Apples & Pears',
                    'Exotic Fruits (Mangoes, Litchis)'
                  ].map(product => (
                    <label key={product} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={product}
                        checked={formData.productsRequired.includes(product)}
                        onChange={handleCheckboxChange}
                      />
                      {product}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity">Quantity Required *</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    placeholder="e.g., 20 tons, 3 containers"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="timeline">Delivery Timeline *</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select timeline</option>
                    <option value="Immediate (0-2 weeks)">Immediate (0-2 weeks)</option>
                    <option value="Short-term (2-4 weeks)">Short-term (2-4 weeks)</option>
                    <option value="Medium-term (1-2 months)">Medium-term (1-2 months)</option>
                    <option value="Long-term (3+ months)">Long-term (3+ months)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="budget">Budget Range (USD)</label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  placeholder="e.g., $50,000 - $100,000"
                    value={formData.budget}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Contact Details</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Requirements or Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Tell us about your specific requirements, quality standards, or any other details..."
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="alert alert-success">
                ✅ Thank you! Your buyer request has been submitted successfully. 
                {window.innerWidth > 768 ? ' Please check your email client to send the pre-filled email.' : ' We will contact you within 24 hours.'}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="alert alert-error">
                ❌ There was an issue submitting your form. Please try again or contact us directly at Afritradexport@outlook.com
              </div>
            )}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Buyer Request'}
            </button>

            <p className="form-note">
              By submitting this form, you agree to our terms of service. We'll connect you with verified South African exporters that match your requirements.
            </p>
          </form>
        </div>

        {/* Display backup data for testing */}
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
          <h3>📋 Recent Submissions (Backup)</h3>
          <button 
            onClick={() => {
              const backups = workingEmailService.getBackups('buyer_requests');
              console.log('Backup data:', backups);
              alert(`You have ${backups.length} buyer requests in backup. Check console for details.`);
            }}
            style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}
          >
            Check Backup Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyerRequest;
