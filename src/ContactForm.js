import React, { useState } from 'react';
import './App.css';

function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    inquiryType: 'general',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`📧 Thank you for your inquiry, ${formData.name}!\n\nOur export team will contact you at ${formData.email} within 24 hours.\n\nInquiry Type: ${formData.inquiryType}\nCompany: ${formData.company}\nCountry: ${formData.country}`);
    
    if (onClose) {
      onClose();
    }
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      country: '',
      inquiryType: 'general',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-modal">
      <div className="contact-form-container">
        <div className="contact-header">
          <h3>📧 Export Inquiry Form</h3>
          <p>Get expert assistance with African exports</p>
          {onClose && (
            <button className="close-btn" onClick={onClose}>×</button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name"
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Your country"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Inquiry Type</label>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
            >
              <option value="general">General Information</option>
              <option value="product">Product Inquiry</option>
              <option value="supplier">Become a Supplier</option>
              <option value="shipping">Shipping & Logistics</option>
              <option value="customs">Customs & Documentation</option>
            </select>
          </div>

          <div className="form-group">
            <label>Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Tell us about your export needs, products of interest, or any specific requirements..."
            ></textarea>
          </div>

          <button type="submit" className="btn-primary submit-btn">
            📧 Send Export Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
