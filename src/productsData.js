export const products = [
  {
    id: 1,
    name: "Stellenbosch Cabernet Sauvignon",
    category: "wine",
    supplier: "Stellenbosch Vineyards",
    origin: "South Africa",
    price: 24.50,
    unit: "bottle",
    minOrder: 120,
    description: "Premium red wine with rich dark berry flavors and subtle oak notes. Perfect for export to EU and US markets.",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop",
    exportMarkets: ["EU", "USA", "China"],
    shipping: "Refrigerated Container"
  },
  {
    id: 2,
    name: "Hass Avocados Premium Grade",
    category: "fruits",
    supplier: "Kenya Avocado Exporters",
    origin: "Kenya",
    price: 3.20,
    unit: "kg",
    minOrder: 1000,
    description: "Premium Hass avocados with creamy texture and rich flavor. Perfect oil content for export markets.",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
    exportMarkets: ["EU", "Middle East"],
    shipping: "Refrigerated"
  },
  {
    id: 3,
    name: "Zulu Beaded Artwork Collection",
    category: "crafts",
    supplier: "Zulu Craft Collective",
    origin: "South Africa",
    price: 45.00,
    unit: "piece",
    minOrder: 50,
    description: "Traditional Zulu beadwork with cultural patterns. Each piece is unique and handcrafted.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    exportMarkets: ["USA", "EU"],
    shipping: "Air Freight"
  },
  {
    id: 4,
    name: "Rooibos Tea Organic",
    category: "spices",
    supplier: "Cedarberg Tea Farms",
    origin: "South Africa",
    price: 8.75,
    unit: "kg",
    minOrder: 500,
    description: "Premium organic Rooibos tea, caffeine-free with antioxidant properties. EU organic certified.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
    exportMarkets: ["EU", "USA", "Japan"],
    shipping: "Dry Container"
  },
  {
    id: 5,
    name: "African Textile - Shweshwe Pattern",
    category: "textiles",
    supplier: "Da Gama Textiles",
    origin: "South Africa",
    price: 12.50,
    unit: "meter",
    minOrder: 1000,
    description: "Authentic African Shweshwe fabric with traditional patterns. Used for clothing and home decor.",
    image: "https://images.unsplash.com/photo-1558769132-cb25c5d0b6c0?w=400&h=300&fit=crop",
    exportMarkets: ["USA", "EU", "Middle East"],
    shipping: "Sea Freight"
  },
  {
    id: 6,
    name: "Table Grapes - Prime Variety",
    category: "fruits",
    supplier: "Hex River Valley Growers",
    origin: "South Africa",
    price: 4.80,
    unit: "kg",
    minOrder: 2000,
    description: "Sweet seedless table grapes with excellent shelf life. Perfect for supermarket exports.",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop",
    exportMarkets: ["EU", "UK", "Middle East"],
    shipping: "Refrigerated Container"
  }
];

export const categories = [
  { id: 'all', name: 'All Products', icon: '🌍' },
  { id: 'wine', name: 'Wine & Spirits', icon: '🍷' },
  { id: 'fruits', name: 'Fresh Fruits', icon: '🍓' },
  { id: 'crafts', name: 'Handicrafts', icon: '🎨' },
  { id: 'textiles', name: 'Textiles', icon: '👕' },
  { id: 'spices', name: 'Spices & Foods', icon: '🌶️' }
];
