// WORKING Email Service with multiple fallbacks
export const workingEmailService = {
  
  // Method 1: Simple mailto - ALWAYS WORKS
  sendViaMailto(subject, body, to = 'Afritradexport@outlook.com') {
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
    return { success: true, method: 'mailto', message: 'Email client opened' };
  },

  // Method 2: FormSubmit.co - FREE email service
  async sendViaFormSubmit(formData, formType) {
    try {
      const formName = formType === 'buyer' ? 'buyer_request' : 'supplier_registration';
      const response = await fetch('https://formsubmit.co/ajax/Afritradexport@outlook.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New ${formType} request: ${formData.company_name || formData.companyName}`,
          _template: 'table'
        })
      });

      const result = await response.json();
      if (result.success) {
        return { success: true, method: 'formsubmit', message: 'Email sent via FormSubmit' };
      }
      throw new Error('FormSubmit failed');
    } catch (error) {
      console.log('FormSubmit failed, falling back to mailto');
      return this.sendViaMailto(
        `New ${formType} request: ${formData.company_name || formData.companyName}`,
        JSON.stringify(formData, null, 2)
      );
    }
  },

  // Method 3: EmailJS - More reliable but requires setup
  async sendViaEmailJS(templateParams, templateName) {
    // This requires EmailJS setup - we'll use as fallback
    try {
      // You can set up EmailJS later at https://www.emailjs.com
      console.log('EmailJS would send:', { templateParams, templateName });
      return { success: false, method: 'emailjs', message: 'EmailJS not configured' };
    } catch (error) {
      return { success: false, method: 'emailjs', error };
    }
  },

  // MAIN FUNCTION: Send buyer request with multiple fallbacks
  async sendBuyerRequest(buyerData) {
    const subject = `🚨 NEW BUYER: ${buyerData.companyName} from ${buyerData.country}`;
    const body = `
NEW BUYER REQUEST - AFRITRADE GLOBAL
=====================================

COMPANY: ${buyerData.companyName}
CONTACT: ${buyerData.contactPerson}
EMAIL: ${buyerData.email}
PHONE: ${buyerData.phone}
COUNTRY: ${buyerData.country}

PRODUCTS NEEDED:
${Array.isArray(buyerData.productsRequired) ? buyerData.productsRequired.join('\\n') : buyerData.productsRequired}

QUANTITY: ${buyerData.quantity}
TIMELINE: ${buyerData.timeline}
BUDGET: ${buyerData.budget}

MESSAGE:
${buyerData.message || 'No additional message'}

SUBMITTED: ${new Date().toLocaleString()}
PLATFORM: https://afritrade-export.vercel.app
    `;

    // Try FormSubmit first, then fallback to mailto
    const result = await this.sendViaFormSubmit(buyerData, 'buyer');
    
    // Always save to localStorage as backup
    this.saveToBackup('buyer_requests', buyerData);
    
    return result;
  },

  // MAIN FUNCTION: Send supplier registration
  async sendSupplierRegistration(supplierData) {
    const subject = `📝 NEW SUPPLIER: ${supplierData.company_name}`;
    const body = `
NEW SUPPLIER REGISTRATION - AFRITRADE GLOBAL
============================================

COMPANY: ${supplierData.company_name}
CONTACT: ${supplierData.contact_person}
EMAIL: ${supplierData.email}
PHONE: ${supplierData.phone}
LOCATION: ${supplierData.country}
BUSINESS: ${supplierData.business_type}

PRODUCTS:
${Array.isArray(supplierData.main_products) ? supplierData.main_products.join('\\n') : supplierData.main_products}

MARKETS:
${Array.isArray(supplierData.export_markets) ? supplierData.export_markets.join('\\n') : supplierData.export_markets}

CERTIFICATIONS:
${Array.isArray(supplierData.certifications) ? supplierData.certifications.join('\\n') : (supplierData.certifications || 'None')}

EXPERIENCE: ${supplierData.years_in_business}
REVENUE: ${supplierData.annual_revenue}
SHIPPING: ${supplierData.shipping_capability}

SUBMITTED: ${new Date().toLocaleString()}
PLATFORM: https://afritrade-export.vercel.app
    `;

    // Try FormSubmit first, then fallback to mailto
    const result = await this.sendViaFormSubmit(supplierData, 'supplier');
    
    // Always save to localStorage as backup
    this.saveToBackup('supplier_registrations', supplierData);
    
    return result;
  },

  // Backup to localStorage
  saveToBackup(key, data) {
    try {
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      const newEntry = {
        ...data,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      const updated = [...existing, newEntry];
      localStorage.setItem(key, JSON.stringify(updated));
      console.log(`✅ Backup saved to localStorage: ${key}`, newEntry);
    } catch (error) {
      console.error('Error saving backup:', error);
    }
  },

  // Get backups from localStorage
  getBackups(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (error) {
      console.error('Error reading backups:', error);
      return [];
    }
  }
};
