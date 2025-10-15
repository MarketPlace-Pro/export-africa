// Bulk Email Service for AfriTrade Global
export const bulkEmailService = {
  
  // Email templates for different scenarios
  templates: {
    newSeason: {
      subject: "🌍 NEW SEASON: Premium South African {product} Now Available!",
      body: `Dear {buyerName},

🌱 NEW HARVEST SEASON ALERT!

We're excited to announce that premium South African {product} from {region} is now available for export!

📦 PRODUCT DETAILS:
• Product: {product}
• Quality: {quality}
• Season: {season}
• Minimum Order: {minOrder}
• Price: {price}

🎯 WHY CHOOSE AFRITRADE:
✅ 30+ Verified South African Exporters
✅ GlobalGAP & BRCGS Certified
✅ Complete Export Documentation
✅ Refrigerated Logistics
✅ Quality Assurance

💼 READY TO SHIP:
We have {volume} available for immediate shipment to {market}.

📞 CONTACT US:
Email: Afritradexport@outlook.com
Phone: +27 XXX XXX XXXX
Platform: https://afritrade-export.vercel.app

Best regards,
Lucky Masilo
Founder - AfriTrade Global
🌍 Connecting South African Fresh Produce with Global Markets`
    },

    priceUpdate: {
      subject: "💰 PRICE UPDATE: Competitive Rates for South African {product}",
      body: `Dear {buyerName},

We're reaching out with updated competitive pricing for South African {product}!

📊 CURRENT MARKET POSITION:
• Product: {product}
• New Price: {price} (was {oldPrice})
• Quality: {quality}
• Availability: {availability}

🚢 LOGISTICS READY:
• Shipping: {shippingTime} to {market}
• Temperature: {temperature}
• Documentation: Complete export handling

🎯 SPECIAL OFFER:
{specialOffer}

Contact us today to secure your allocation!

📞 GET QUOTE:
Email: Afritradexport@outlook.com
Phone: +27 XXX XXX XXXX

Best regards,
Lucky Masilo
Founder - AfriTrade Global`
    },

    relationship: {
      subject: "🤝 Checking In - South African {product} Availability",
      body: `Dear {buyerName},

I hope this email finds you well!

I wanted to check in regarding your {product} requirements for the upcoming season. We have excellent availability from our verified South African growers.

📈 CURRENT OPPORTUNITIES:
• Product: {product}
• Season: {season}
• Quality: Export Grade A
• Competitive Pricing Available

🌍 WHY PARTNER WITH US:
• Direct grower relationships
• Quality assurance
• Complete export solution
• Reliable supply chain

Would you like me to send you current pricing and availability?

Best regards,
Lucky Masilo
Founder - AfriTrade Global
Afritradexport@outlook.com
https://afritrade-export.vercel.app`
    }
  },

  // Send bulk emails with personalization
  async sendBulkEmails(buyers, templateType, productData) {
    const template = this.templates[templateType];
    if (!template) {
      throw new Error(`Template ${templateType} not found`);
    }

    const results = [];
    
    for (const buyer of buyers) {
      try {
        const personalizedSubject = this.personalizeTemplate(template.subject, buyer, productData);
        const personalizedBody = this.personalizeTemplate(template.body, buyer, productData);
        
        const result = await this.sendSingleEmail(buyer.email, personalizedSubject, personalizedBody);
        results.push({
          buyer: buyer.companyName,
          email: buyer.email,
          status: 'sent',
          timestamp: new Date().toISOString()
        });
        
        // Add delay to avoid being flagged as spam
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        results.push({
          buyer: buyer.companyName,
          email: buyer.email,
          status: 'failed',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    return results;
  },

  // Personalize email templates
  personalizeTemplate(template, buyer, productData) {
    return template
      .replace(/{buyerName}/g, buyer.contactPerson || 'Valued Client')
      .replace(/{companyName}/g, buyer.companyName)
      .replace(/{country}/g, buyer.country)
      .replace(/{product}/g, productData.product || 'fresh produce')
      .replace(/{quality}/g, productData.quality || 'Export Grade A')
      .replace(/{season}/g, productData.season || 'current season')
      .replace(/{minOrder}/g, productData.minOrder || 'flexible quantities')
      .replace(/{price}/g, productData.price || 'competitive rates')
      .replace(/{volume}/g, productData.volume || 'significant volumes')
      .replace(/{market}/g, buyer.country || 'your market')
      .replace(/{region}/g, productData.region || 'premium growing regions')
      .replace(/{shippingTime}/g, productData.shippingTime || '2-4 weeks')
      .replace(/{temperature}/g, productData.temperature || 'controlled temperature')
      .replace(/{availability}/g, productData.availability || 'good availability')
      .replace(/{oldPrice}/g, productData.oldPrice || 'previous price')
      .replace(/{specialOffer}/g, productData.specialOffer || 'Contact us for special pricing!');
  },

  // Send single email (using your existing email service)
  async sendSingleEmail(to, subject, body) {
    // Use your existing email service
    const emailData = {
      to: to,
      subject: subject,
      body: body
    };

    // Open email client with pre-filled data
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
    
    return { success: true, method: 'mailto' };
  },

  // CSV export for email campaigns
  exportBuyersToCSV(buyers) {
    const headers = ['Company Name', 'Contact Person', 'Email', 'Country', 'Products Required', 'Last Contact'];
    const csvData = buyers.map(buyer => [
      `"${buyer.companyName}"`,
      `"${buyer.contactPerson}"`,
      `"${buyer.email}"`,
      `"${buyer.country}"`,
      `"${buyer.productsRequired?.join(', ') || 'Various'}"`,
      `"${buyer.lastContact || 'Never'}"`
    ].join(','));

    return [headers.join(','), ...csvData].join('\n');
  },

  // Import buyers from CSV
  importBuyersFromCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.replace(/"/g, '').trim());
      const buyer = {};
      headers.forEach((header, index) => {
        buyer[header.toLowerCase().replace(' ', '_')] = values[index];
      });
      return buyer;
    }).filter(buyer => buyer.email); // Only return buyers with email
  }
};
