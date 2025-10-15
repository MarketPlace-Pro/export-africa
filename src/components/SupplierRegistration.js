import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { workingEmailService } from '../services/workingEmailService'
import './SupplierRegistration.css'

function SupplierRegistration({ onSuccess }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    country: '',
    business_type: '',

    // Step 2: Business Details
    business_registration: '',
    tax_id: '',
    years_in_business: '',
    annual_revenue: '',

    // Step 3: Export Experience
    main_products: [],
    export_markets: [],
    certifications: [],
    shipping_capability: '',

    // Step 4: Documents
    documents: {
      registration_certificate: null,
      tax_certificate: null,
      quality_certifications: null
    }
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('🔄 Submitting supplier registration:', formData);

      // Send email using working service
      const emailResult = await workingEmailService.sendSupplierRegistration(formData);
      
      // Try to save to Supabase if configured
      let supabaseResult = { success: false };
      try {
        const { data, error } = await supabase
          .from('suppliers')
          .insert([
            {
              company_name: formData.company_name,
              contact_person: formData.contact_person,
              email: formData.email,
              phone: formData.phone,
              country: formData.country,
              business_type: formData.business_type,
              business_registration: formData.business_registration,
              tax_id: formData.tax_id,
              years_in_business: formData.years_in_business,
              annual_revenue: formData.annual_revenue,
              main_products: formData.main_products,
              export_markets: formData.export_markets,
              certifications: formData.certifications,
              shipping_capability: formData.shipping_capability,
              status: 'pending',
              created_at: new Date().toISOString()
            }
          ])
          .select()

        if (!error) {
          supabaseResult = { success: true, data };
        }
      } catch (supabaseError) {
        console.log('Supabase not configured, using localStorage only');
      }

      console.log('✅ Form submission result:', { emailResult, supabaseResult });
      
      setLoading(false)

      if (emailResult.success) {
        if (onSuccess) {
          onSuccess('Application submitted successfully! Please check your email to complete the submission.');
        } else {
          alert('Application submitted successfully! Please check your email to complete the submission.');
        }

        // Reset form
        setStep(1)
        setFormData({
          company_name: '',
          contact_person: '',
          email: '',
          phone: '',
          country: '',
          business_type: '',
          business_registration: '',
          tax_id: '',
          years_in_business: '',
          annual_revenue: '',
          main_products: [],
          export_markets: [],
          certifications: [],
          shipping_capability: '',
          documents: {
            registration_certificate: null,
            tax_certificate: null,
            quality_certifications: null
          }
        })
      } else {
        alert('There was an issue submitting your application. Please try again or contact us directly.');
      }

    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Error submitting application. Please try again.')
      setLoading(false)
    }
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const businessTypes = [
    'Fresh Fruit Exporter',
    'Vegetable Exporter',
    'Processed Foods',
    'Agricultural Cooperative',
    'Trading Company',
    'Other'
  ]

  const productOptions = [
    'Citrus Fruits',
    'Table Grapes',
    'Stone Fruits',
    'Pomegranates',
    'Avocados',
    'Mangoes',
    'Apples',
    'Berries',
    'Other Fruits'
  ]

  const marketOptions = [
    'Middle East',
    'Europe',
    'Asia',
    'North America',
    'Africa',
    'Other'
  ]

  const certificationOptions = [
    'GlobalGAP',
    'HACCP',
    'ISO 22000',
    'Organic',
    'Fair Trade',
    'BRCGS',
    'Other'
  ]

  return (
    <div className="supplier-registration-form">
      <form onSubmit={handleSubmit}>
        {/* Progress Bar */}
        <div className="progress-bar">
          {[1, 2, 3, 4].map((stepNum) => (
            <div
              key={stepNum}
              className={`progress-step ${step >= stepNum ? 'active' : ''}`}
            >
              <div className="step-number">{stepNum}</div>
              <div className="step-label">
                {stepNum === 1 && 'Basic Info'}
                {stepNum === 2 && 'Business Details'}
                {stepNum === 3 && 'Products & Markets'}
                {stepNum === 4 && 'Review & Submit'}
              </div>
            </div>
          ))}
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="form-step">
            <h3>Company Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  placeholder="Enter company name"
                />
              </div>

              <div className="form-group">
                <label>Contact Person *</label>
                <input
                  type="text"
                  required
                  value={formData.contact_person}
                  onChange={(e) => handleInputChange('contact_person', e.target.value)}
                  placeholder="Full name"
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="company@email.com"
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+27 XXX XXX XXXX"
                />
              </div>

              <div className="form-group">
                <label>Country *</label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="South Africa"
                />
              </div>

              <div className="form-group">
                <label>Business Type *</label>
                <select
                  required
                  value={formData.business_type}
                  onChange={(e) => handleInputChange('business_type', e.target.value)}
                >
                  <option value="">Select business type</option>
                  {businessTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={nextStep} className="btn btn-primary">
                Next: Business Details →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Business Details */}
        {step === 2 && (
          <div className="form-step">
            <h3>Business Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Business Registration Number</label>
                <input
                  type="text"
                  value={formData.business_registration}
                  onChange={(e) => handleInputChange('business_registration', e.target.value)}
                  placeholder="Registration number"
                />
              </div>

              <div className="form-group">
                <label>Tax ID / VAT Number</label>
                <input
                  type="text"
                  value={formData.tax_id}
                  onChange={(e) => handleInputChange('tax_id', e.target.value)}
                  placeholder="Tax identification number"
                />
              </div>

              <div className="form-group">
                <label>Years in Business</label>
                <select
                  value={formData.years_in_business}
                  onChange={(e) => handleInputChange('years_in_business', e.target.value)}
                >
                  <option value="">Select years</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div className="form-group">
                <label>Annual Revenue (USD)</label>
                <select
                  value={formData.annual_revenue}
                  onChange={(e) => handleInputChange('annual_revenue', e.target.value)}
                >
                  <option value="">Select revenue range</option>
                  <option value="0-500k">$0 - $500,000</option>
                  <option value="500k-1M">$500,000 - $1M</option>
                  <option value="1M-5M">$1M - $5M</option>
                  <option value="5M+">$5M+</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={prevStep} className="btn btn-secondary">
                ← Back
              </button>
              <button type="button" onClick={nextStep} className="btn btn-primary">
                Next: Products & Markets →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Products & Markets */}
        {step === 3 && (
          <div className="form-step">
            <h3>Products & Export Markets</h3>

            <div className="form-group">
              <label>Main Products *</label>
              <div className="checkbox-grid">
                {productOptions.map(product => (
                  <label key={product} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.main_products.includes(product)}
                      onChange={(e) => {
                        const updatedProducts = e.target.checked
                          ? [...formData.main_products, product]
                          : formData.main_products.filter(p => p !== product)
                        handleInputChange('main_products', updatedProducts)
                      }}
                    />
                    {product}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Export Markets *</label>
              <div className="checkbox-grid">
                {marketOptions.map(market => (
                  <label key={market} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.export_markets.includes(market)}
                      onChange={(e) => {
                        const updatedMarkets = e.target.checked
                          ? [...formData.export_markets, market]
                          : formData.export_markets.filter(m => m !== market)
                        handleInputChange('export_markets', updatedMarkets)
                      }}
                    />
                    {market}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Certifications</label>
              <div className="checkbox-grid">
                {certificationOptions.map(cert => (
                  <label key={cert} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.certifications.includes(cert)}
                      onChange={(e) => {
                        const updatedCerts = e.target.checked
                          ? [...formData.certifications, cert]
                          : formData.certifications.filter(c => c !== cert)
                        handleInputChange('certifications', updatedCerts)
                      }}
                    />
                    {cert}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Shipping Capability</label>
              <select
                value={formData.shipping_capability}
                onChange={(e) => handleInputChange('shipping_capability', e.target.value)}
              >
                <option value="">Select capability</option>
                <option value="FOB">FOB (Free On Board)</option>
                <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                <option value="EXW">EXW (Ex Works)</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="button" onClick={prevStep} className="btn btn-secondary">
                ← Back
              </button>
              <button type="button" onClick={nextStep} className="btn btn-primary">
                Next: Review & Submit →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {step === 4 && (
          <div className="form-step">
            <h3>Review Your Application</h3>

            <div className="review-section">
              <h3>Company Information</h3>
              <p><strong>Company:</strong> {formData.company_name}</p>
              <p><strong>Contact:</strong> {formData.contact_person}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Country:</strong> {formData.country}</p>
              <p><strong>Business Type:</strong> {formData.business_type}</p>
            </div>

            <div className="review-section">
              <h3>Business Details</h3>
              <p><strong>Registration:</strong> {formData.business_registration || 'Not provided'}</p>
              <p><strong>Tax ID:</strong> {formData.tax_id || 'Not provided'}</p>
              <p><strong>Years in Business:</strong> {formData.years_in_business || 'Not provided'}</p>
              <p><strong>Annual Revenue:</strong> {formData.annual_revenue || 'Not provided'}</p>
            </div>

            <div className="review-section">
              <h3>Products <h4>Products & Markets</h4> Markets</h3>
              <p><strong>Main Products:</strong> {formData.main_products.join(', ') || 'None selected'}</p>
              <p><strong>Export Markets:</strong> {formData.export_markets.join(', ') || 'None selected'}</p>
              <p><strong>Certifications:</strong> {formData.certifications.join(', ') || 'None'}</p>
              <p><strong>Shipping:</strong> {formData.shipping_capability || 'Not specified'}</p>
            </div>

            <div className="form-actions">
              <button type="button" onClick={prevStep} className="btn btn-secondary">
                ← Back
              </button>
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default SupplierRegistration
