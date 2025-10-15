// Email service for automated notifications
export const emailService = {
  // Send order confirmation to buyer
  async sendOrderConfirmation(order, buyerEmail) {
    const emailData = {
      to: buyerEmail,
      subject: `Order Confirmation - ${order.order_number}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e40af, #1e3a8a); padding: 2rem; text-align: center; color: white;">
            <h1>🌍 AfriTrade Global</h1>
            <h2>Order Confirmation</h2>
          </div>

          <div style="padding: 2rem;">
            <p>Dear Valued Customer,</p>

            <p>Thank you for your order! Your export request has been received and is being processed.</p>

            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
              <h3 style="color: #1e40af; margin-bottom: 1rem;">Order Details</h3>
              <p><strong>Order Number:</strong> ${order.order_number}</p>
              <p><strong>Total Amount:</strong> $${order.total_amount}</p>
              <p><strong>Shipping To:</strong> ${order.shipping_address}</p>
            </div>

            <p>Our export team will contact you within 24 hours to coordinate shipping and documentation.</p>

            <p>Best regards,<br>The AfriTrade Global Team</p>
          </div>
        </div>
      `
    };

    console.log('📧 Order confirmation email prepared:', emailData);
    return { success: true, message: 'Order confirmation email queued' };
  },

  // Send supplier notification for new order
  async sendSupplierNotification(supplierEmail, orderDetails) {
    const emailData = {
      to: supplierEmail,
      subject: `New Order Request - ${orderDetails.product_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #059669, #047857); padding: 2rem; text-align: center; color: white;">
            <h1>🌍 AfriTrade Global</h1>
            <h2>New Order Request</h2>
          </div>

          <div style="padding: 2rem;">
            <p>Dear Supplier,</p>

            <p>You have received a new order request through AfriTrade Global.</p>

            <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
              <h3 style="color: #059669; margin-bottom: 1rem;">Order Details</h3>
              <p><strong>Product:</strong> ${orderDetails.product_name}</p>
              <p><strong>Quantity:</strong> ${orderDetails.quantity}</p>
              <p><strong>Destination:</strong> ${orderDetails.destination}</p>
              <p><strong>Buyer Contact:</strong> ${orderDetails.buyer_email}</p>
            </div>

            <p>Please review this request and prepare a quotation within 24 hours.</p>

            <p>Best regards,<br>The AfriTrade Global Team</p>
          </div>
        </div>
      `
    };

    console.log('📧 Supplier notification email prepared:', emailData);
    return { success: true, message: 'Supplier notification queued' };
  },

  // Send supplier confirmation email
  async sendSupplierConfirmation(supplierEmail, companyName) {
    const emailData = {
      to: supplierEmail,
      subject: `Supplier Application Received - AfriTrade Global`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed, #6d28d9); padding: 2rem; text-align: center; color: white;">
            <h1>🌍 AfriTrade Global</h1>
            <h2>Application Received</h2>
          </div>

          <div style="padding: 2rem;">
            <p>Dear ${companyName} Team,</p>

            <p>Thank you for applying to become a verified supplier on AfriTrade Global!</p>

            <div style="background: #faf5ff; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
              <h3 style="color: #7c3aed; margin-bottom: 1rem;">Next Steps</h3>
              <p><strong>Verification:</strong> Our team will review your application within 24-48 hours</p>
              <p><strong>Onboarding:</strong> If approved, we'll guide you through the onboarding process</p>
              <p><strong>Access:</strong> You'll receive access to our buyer network and platform tools</p>
            </div>

            <p><strong>Need immediate assistance?</strong><br>
            Contact: luckymasilo76@gmail.com</p>

            <p>Best regards,<br>The AfriTrade Global Team</p>
          </div>
        </div>
      `
    };

    console.log('📧 Supplier confirmation email prepared:', emailData);
    return { success: true, message: 'Supplier confirmation email queued' };
  },

  // Send buyer request notification to admin
  async sendBuyerRequestNotification(buyerData) {
    const emailData = {
      to: 'admin@afritradeglobal.com', // Replace with your email
      subject: `🚨 NEW BUYER REQUEST: ${buyerData.company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); padding: 2rem; text-align: center; color: white;">
            <h1>🌍 AfriTrade Global</h1>
            <h2>NEW BUYER REQUEST</h2>
          </div>

          <div style="padding: 2rem;">
            <p><strong>Immediate Action Required:</strong> A new buyer has submitted a request for South African produce.</p>

            <div style="background: #fef2f2; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
              <h3 style="color: #dc2626; margin-bottom: 1rem;">Buyer Details</h3>
              <p><strong>Company:</strong> ${buyerData.company}</p>
              <p><strong>Products Needed:</strong> ${buyerData.products}</p>
              <p><strong>Quantity:</strong> ${buyerData.quantity}</p>
              <p><strong>Destination:</strong> ${buyerData.destination}</p>
              <p><strong>Email:</strong> ${buyerData.email}</p>
              <p><strong>Phone:</strong> ${buyerData.phone || 'Not provided'}</p>
            </div>

            <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
              <h3 style="color: #0369a1; margin-bottom: 1rem;">Required Actions</h3>
              <p>✅ Contact buyer within 4 hours</p>
              <p>✅ Match with relevant suppliers</p>
              <p>✅ Coordinate initial quotes</p>
              <p>✅ Update CRM status</p>
            </div>

            <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>

            <div style="text-align: center; margin-top: 2rem;">
              <a href="https://afritrade-export.vercel.app/admin" 
                 style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View in Dashboard
              </a>
            </div>
          </div>
        </div>
      `
    };

    console.log('📧 Buyer request notification prepared:', emailData);
    return { success: true, message: 'Buyer request notification queued' };
  },

  // Send buyer confirmation email
  async sendBuyerConfirmation(buyerEmail, companyName) {
    const emailData = {
      to: buyerEmail,
      subject: `✅ Buyer Request Received - AfriTrade Global`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #059669, #047857); padding: 2rem; text-align: center; color: white;">
            <h1>🌍 AfriTrade Global</h1>
            <h2>Buyer Request Confirmation</h2>
          </div>

          <div style="padding: 2rem;">
            <p>Dear ${companyName} Team,</p>

            <p>Thank you for your interest in sourcing premium South African fresh produce through AfriTrade Global!</p>

            <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
              <h3 style="color: #059669; margin-bottom: 1rem;">What Happens Next?</h3>
              <p><strong>Within 4 Hours:</strong> Our team will contact you to discuss your requirements</p>
              <p><strong>Within 24 Hours:</strong> You'll receive initial quotes from verified suppliers</p>
              <p><strong>Ongoing:</strong> We'll coordinate samples, shipping, and documentation</p>
            </div>

            <p><strong>Your dedicated export manager:</strong> Lucky Masilo</p>
            <p><strong>Contact:</strong> luckymasilo76@gmail.com | +27 XXX XXX XXXX</p>

            <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
              <h3 style="color: #0369a1; margin-bottom: 1rem;">Why Choose AfriTrade?</h3>
              <p>✅ 30+ Verified South African Exporters</p>
              <p>✅ Quality Assured Supply Chain</p>
              <p>✅ Export Documentation Handling</p>
              <p>✅ Competitive Pricing</p>
            </div>

            <p>Best regards,<br>The AfriTrade Global Team</p>
          </div>
        </div>
      `
    };

    console.log('📧 Buyer confirmation email prepared:', emailData);
    return { success: true, message: 'Buyer confirmation email queued' };
  }
};
