// CART SYSTEM & QUOTE MANAGEMENT
export const cartInitialState = {
  items: [],
  quoteRequests: [],
  totalAmount: 0,
  shippingInfo: null,
  paymentMethod: null
};

export const cartActions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  ADD_QUOTE_REQUEST: 'ADD_QUOTE_REQUEST'
};

// Trust badges for cart/checkout
export const trustBadges = [
  {
    icon: "🔒",
    title: "Secure Payment",
    description: "All transactions protected with encryption"
  },
  {
    icon: "✓", 
    title: "Verified Suppliers",
    description: "Every supplier quality-checked and verified"
  },
  {
    icon: "🚚",
    title: "Global Shipping",
    description: "Reliable logistics to 50+ countries"
  },
  {
    icon: "📞",
    title: "Export Support",
    description: "Dedicated assistance for international trade"
  }
];

// Shipping options
export const shippingOptions = [
  {
    id: "air_freight",
    name: "Air Freight",
    description: "Fast delivery (5-10 days)",
    cost: "$$$",
    details: "Ideal for perishable goods and urgent shipments"
  },
  {
    id: "sea_freight",
    name: "Sea Freight", 
    description: "Cost-effective (25-40 days)",
    cost: "$",
    details: "Best for large quantities and non-perishable goods"
  },
  {
    id: "express_courier",
    name: "Express Courier",
    description: "Premium speed (3-7 days)", 
    cost: "$$$$",
    details: "Door-to-door service with real-time tracking"
  }
];

// Payment methods
export const paymentMethods = [
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    description: "Secure international wire transfer",
    fees: "Low",
    processingTime: "2-3 business days"
  },
  {
    id: "escrow",
    name: "Escrow Protection",
    description: "Funds released after delivery confirmation",
    fees: "Medium", 
    processingTime: "After delivery confirmation"
  },
  {
    id: "letter_of_credit",
    name: "Letter of Credit",
    description: "Bank-guaranteed payment for large orders",
    fees: "High",
    processingTime: "5-7 business days"
  }
];
