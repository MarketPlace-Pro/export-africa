import React from 'react';

function InvoiceGenerator({ deal }) {
  const generateInvoice = () => {
    const invoiceData = {
      invoice_number: `AFT-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      ...deal
    };

    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
          .company-info { float: right; text-align: right; }
          .details { margin: 20px 0; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #f5f5f5; }
          .total { font-weight: bold; font-size: 1.2em; }
          .footer { margin-top: 50px; font-size: 0.9em; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>INVOICE</h1>
          <div class="company-info">
            <strong>AfriTrade Global</strong><br>
            Email: Afritradexport@outlook.com<br>
            Phone: +27 XXX XXX XXXX<br>
            Website: afritrade-export.vercel.app
          </div>
          <div>
            <strong>Invoice #:</strong> ${invoiceData.invoice_number}<br>
            <strong>Date:</strong> ${invoiceData.date}<br>
            <strong>Due Date:</strong> ${invoiceData.due_date}
          </div>
        </div>

        <div class="details">
          <strong>Bill To:</strong><br>
          ${deal.supplier_company}<br>
          ${deal.supplier_contact}
        </div>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Buyer</th>
              <th>Product</th>
              <th>Deal Amount</th>
              <th>Commission Rate</th>
              <th>Commission Due</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Export Deal Commission</td>
              <td>${deal.buyer_company}</td>
              <td>${deal.product}</td>
              <td>$${deal.deal_amount.toLocaleString()}</td>
              <td>${(deal.commission_rate * 100)}%</td>
              <td>$${deal.commission_amount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div class="total">
          Total Due: $${deal.commission_amount.toFixed(2)}
        </div>

        <div class="footer">
          <p><strong>Payment Terms:</strong> Net 7 days</p>
          <p><strong>Payment Methods:</strong> Bank Transfer, PayPal</p>
          <p><strong>Bank Details:</strong><br>
          Bank: [Your Bank]<br>
          Account: [Your Account Number]<br>
          SWIFT: [Your SWIFT Code]</p>
          
          <p><strong>Terms & Conditions:</strong><br>
          1. Commission payable within 7 days of buyer payment<br>
          2. Late payments subject to 1.5% monthly interest<br>
          3. All amounts in USD</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <button onClick={generateInvoice} className="btn btn-primary">
      🧾 Generate Invoice
    </button>
  );
}

export default InvoiceGenerator;
