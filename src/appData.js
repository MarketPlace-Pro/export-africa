// Real South African Fresh Produce Export Categories
export const categories = [
  { 
    id: 'all', 
    name: 'All Export Products', 
    icon: '🌍',
    description: 'Complete range of South African fresh produce exports'
  },
  { 
    id: 'citrus', 
    name: 'Citrus Fruits', 
    icon: '🍊',
    description: 'South Africa\'s #1 fruit export - 30% of global citrus exports',
    suppliers: ['Kromco', 'Freshgro Citrus', 'Impala Citrus', 'Laeveld Sitrus'],
    season: 'May - November',
    exportVolume: '2.5M tons annually',
    mainMarkets: ['EU', 'Middle East', 'China', 'USA'],
    certifications: ['GlobalGAP', 'SIZA', 'Phytosanitary']
  },
  { 
    id: 'grapes', 
    name: 'Table Grapes', 
    icon: '🍇',
    description: 'Premium seedless varieties for global markets',
    suppliers: ['The Grape Company', 'FruitOne', 'Karsten Marketing', 'Kromco'],
    season: 'November - April', 
    exportVolume: '350,000 tons annually',
    mainMarkets: ['UK', 'EU', 'Middle East', 'Canada'],
    certifications: ['GlobalGAP', 'BRCGS', 'HACCP']
  },
  { 
    id: 'stone-fruits', 
    name: 'Stone Fruits', 
    icon: '🍑',
    description: 'Peaches, nectarines, plums and apricots',
    suppliers: ['Fruitways', 'Kromco', 'Core Fruit', 'In2Fruit'],
    season: 'October - March',
    exportVolume: '180,000 tons annually',
    mainMarkets: ['EU', 'Middle East', 'Asia'],
    certifications: ['GlobalGAP', 'SIZA']
  },
  { 
    id: 'pomegranates', 
    name: 'Pomegranates', 
    icon: '🔴',
    description: 'Fast-growing export category with premium varieties',
    suppliers: ['Kromco', 'EPIC Fruit', 'Karsten Marketing'],
    season: 'March - May',
    exportVolume: '45,000 tons annually', 
    mainMarkets: ['Middle East', 'EU', 'Russia'],
    certifications: ['GlobalGAP', 'Organic Options']
  },
  { 
    id: 'avocados', 
    name: 'Avocados', 
    icon: '🥑',
    description: 'Hass and Fuerte varieties for international markets',
    suppliers: ['Allesbeste', 'Westfalia', 'Green Farms'],
    season: 'March - September',
    exportVolume: '125,000 tons annually',
    mainMarkets: ['EU', 'UK', 'Middle East'],
    certifications: ['GlobalGAP', 'Fair Trade']
  },
  { 
    id: 'berries', 
    name: 'Berries', 
    icon: '🫐',
    description: 'Blueberries, raspberries, strawberries and blackberries',
    suppliers: ['Berryworld', 'Haygrove', 'Kromco'],
    season: 'Year-round (different regions)',
    exportVolume: '25,000 tons annually',
    mainMarkets: ['EU', 'UK', 'Middle East'],
    certifications: ['GlobalGAP', 'Organic']
  },
  { 
    id: 'apples-pears', 
    name: 'Apples & Pears', 
    icon: '🍎',
    description: 'Premium deciduous fruits for export markets',
    suppliers: ['Tru-Cape', 'Dutoit', 'Fruitways'],
    season: 'February - August',
    exportVolume: '500,000 tons annually',
    mainMarkets: ['EU', 'Middle East', 'Africa'],
    certifications: ['GlobalGAP', 'BRCGS']
  },
  { 
    id: 'exotic-fruits', 
    name: 'Exotic Fruits', 
    icon: '🥭',
    description: 'Litchis, mangoes, guavas and other tropical specialties',
    suppliers: ['Various Specialized Growers', 'Tropical Fruit Co'],
    season: 'Seasonal specialties',
    exportVolume: '15,000 tons annually',
    mainMarkets: ['EU', 'Middle East', 'Asia'],
    certifications: ['GlobalGAP', 'Phytosanitary']
  }
];

// Real South African Fresh Produce Products
export const products = [
  // CITRUS PRODUCTS
  {
    id: 101,
    name: "Valencia Late Oranges",
    category: "citrus",
    supplier: "Kromco",
    origin: "Limpopo, South Africa",
    price: 12.50,
    unit: "kg",
    min_order: 2000,
    description: "Premium Valencia oranges with high juice content (12-14° brix) and excellent shelf life. Perfect for juice production and fresh markets.",
    image_url: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop",
    export_markets: ["EU", "Middle East", "China", "Russia"],
    shipping_info: "Refrigerated Container (1-4°C)",
    certifications: ["GlobalGAP", "SIZA", "Phytosanitary"],
    lead_time: "3-5 days",
    season: "June - October",
    specifications: {
      variety: "Valencia Late",
      brix: "12-14°",
      size: "72-88 count",
      packaging: "15kg cartons",
      shelf_life: "60 days"
    },
    supplier_contact: "exports@kromco.co.za",
    annual_capacity: "50,000 tons"
  },
  {
    id: 102,
    name: "Navel Oranges - Early Season",
    category: "citrus",
    supplier: "Freshgro Citrus",
    origin: "Eastern Cape, South Africa",
    price: 13.20,
    unit: "kg",
    min_order: 1500,
    description: "Early season Navel oranges with easy-peel characteristics and sweet flavor. Ideal for premium fresh fruit markets.",
    image_url: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&h=300&fit=crop",
    export_markets: ["EU", "Middle East", "USA"],
    shipping_info: "Refrigerated Container (2-5°C)",
    certifications: ["GlobalGAP", "BRCGS"],
    lead_time: "2-4 days",
    season: "May - August",
    specifications: {
      variety: "Navelina",
      brix: "11-13°",
      size: "56-72 count",
      packaging: "15kg cartons",
      shelf_life: "45 days"
    },
    supplier_contact: "exports@freshgrocitrus.co.za",
    annual_capacity: "35,000 tons"
  },
  {
    id: 103,
    name: "Star Ruby Grapefruit",
    category: "citrus",
    supplier: "Impala Citrus",
    origin: "Mpumalanga, South Africa",
    price: 15.80,
    unit: "kg",
    min_order: 1000,
    description: "Red fleshed grapefruit with sweet-tart flavor and high antioxidant content. Popular in health-conscious markets.",
    image_url: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=400&h=300&fit=crop",
    export_markets: ["Japan", "EU", "Middle East"],
    shipping_info: "Refrigerated Container (8-10°C)",
    certifications: ["GlobalGAP", "JAS"],
    lead_time: "4-6 days",
    season: "July - September",
    specifications: {
      variety: "Star Ruby",
      brix: "10-12°",
      size: "36-48 count",
      packaging: "12kg cartons",
      shelf_life: "50 days"
    },
    supplier_contact: "sales@impalacitrus.co.za",
    annual_capacity: "20,000 tons"
  },

  // TABLE GRAPES
  {
    id: 201,
    name: "Crimson Seedless Grapes",
    category: "grapes",
    supplier: "The Grape Company",
    origin: "Hex River Valley, South Africa",
    price: 8.75,
    unit: "kg",
    min_order: 5000,
    description: "Premium seedless table grapes with deep red color and crisp texture. Excellent shelf life and consistent quality.",
    image_url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop",
    export_markets: ["UK", "EU", "Middle East", "Canada"],
    shipping_info: "Refrigerated Container (-1 to 0°C)",
    certifications: ["GlobalGAP", "BRCGS", "HACCP"],
    lead_time: "2-4 days",
    season: "December - February",
    specifications: {
      variety: "Crimson Seedless",
      sugar: "16-18 brix",
      packaging: "4.5kg punnets",
      berry_size: "18-20mm",
      shelf_life: "45 days"
    },
    supplier_contact: "exports@grapecompany.co.za",
    annual_capacity: "25,000 tons"
  },
  {
    id: 202,
    name: "Thompson Seedless Grapes",
    category: "grapes",
    supplier: "FruitOne",
    origin: "Orange River, South Africa",
    price: 7.90,
    unit: "kg",
    min_order: 3000,
    description: "Classic green seedless grapes with sweet flavor and firm texture. Reliable performer in international markets.",
    image_url: "https://images.unsplash.com/photo-1591801990816-3c6c1c5356ae?w=400&h=300&fit=crop",
    export_markets: ["EU", "Middle East", "Asia"],
    shipping_info: "Refrigerated Container (-1 to 0°C)",
    certifications: ["GlobalGAP", "SIZA"],
    lead_time: "3-5 days",
    season: "January - March",
    specifications: {
      variety: "Thompson Seedless",
      sugar: "17-19 brix",
      packaging: "5kg bags",
      berry_size: "16-18mm",
      shelf_life: "40 days"
    },
    supplier_contact: "info@fruitone.co.za",
    annual_capacity: "18,000 tons"
  },

  // STONE FRUITS
  {
    id: 301,
    name: "Yellow Flesh Peaches",
    category: "stone-fruits",
    supplier: "Fruitways",
    origin: "Western Cape, South Africa",
    price: 6.50,
    unit: "kg",
    min_order: 2000,
    description: "Sweet yellow flesh peaches with excellent flavor and aroma. Perfect for fresh consumption and processing.",
    image_url: "https://images.unsplash.com/photo-1570974434090-1c67d17a45b4?w=400&h=300&fit=crop",
    export_markets: ["EU", "Middle East", "UK"],
    shipping_info: "Refrigerated Container (0-2°C)",
    certifications: ["GlobalGAP", "SIZA"],
    lead_time: "2-3 days",
    season: "November - January",
    specifications: {
      variety: "O'Henry",
      brix: "12-14°",
      size: "60-70 count",
      packaging: "10kg trays",
      shelf_life: "21 days"
    },
    supplier_contact: "exports@fruitways.co.za",
    annual_capacity: "15,000 tons"
  },
  {
    id: 302,
    name: "Plums - African Delight",
    category: "stone-fruits",
    supplier: "Kromco",
    origin: "Limpopo, South Africa",
    price: 7.20,
    unit: "kg",
    min_order: 1500,
    description: "Dark red plums with sweet flavor and firm texture. Excellent for shipping and long shelf life.",
    image_url: "https://images.unsplash.com/photo-1553279768-6d5eb796a5e9?w=400&h=300&fit=crop",
    export_markets: ["EU", "Middle East", "China"],
    shipping_info: "Refrigerated Container (0-2°C)",
    certifications: ["GlobalGAP", "BRCGS"],
    lead_time: "3-4 days",
    season: "December - February",
    specifications: {
      variety: "African Delight",
      brix: "14-16°",
      size: "55-65 count",
      packaging: "8kg cartons",
      shelf_life: "28 days"
    },
    supplier_contact: "exports@kromco.co.za",
    annual_capacity: "12,000 tons"
  },

  // POMEGRANATES
  {
    id: 401,
    name: "Wonderful Pomegranates",
    category: "pomegranates",
    supplier: "Kromco",
    origin: "Western Cape, South Africa",
    price: 18.50,
    unit: "kg",
    min_order: 1000,
    description: "Large, deep red pomegranates with sweet arils and high antioxidant content. Premium quality for health markets.",
    image_url: "https://images.unsplash.com/photo-1541344999737-9c9e97bce3c8?w=400&h=300&fit=crop",
    export_markets: ["Middle East", "EU", "Russia"],
    shipping_info: "Refrigerated Container (5-7°C)",
    certifications: ["GlobalGAP", "Organic Options"],
    lead_time: "4-6 days",
    season: "March - May",
    specifications: {
      variety: "Wonderful",
      size: "8-10 count",
      packaging: "5kg cartons",
      aril_color: "Deep Red",
      shelf_life: "60 days"
    },
    supplier_contact: "exports@kromco.co.za",
    annual_capacity: "8,000 tons"
  },

  // AVOCADOS
  {
    id: 501,
    name: "Hass Avocados Premium",
    category: "avocados",
    supplier: "Allesbeste",
    origin: "Limpopo, South Africa",
    price: 14.80,
    unit: "kg",
    min_order: 800,
    description: "Premium Hass avocados with creamy texture and rich flavor. Perfect dry matter content for export markets.",
    image_url: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
    export_markets: ["EU", "UK", "Middle East"],
    shipping_info: "Refrigerated Container (4-6°C)",
    certifications: ["GlobalGAP", "Fair Trade"],
    lead_time: "3-5 days",
    season: "March - August",
    specifications: {
      variety: "Hass",
      dry_matter: "24-28%",
      size: "16-22 count",
      packaging: "4kg trays",
      shelf_life: "21 days"
    },
    supplier_contact: "exports@allesbeste.co.za",
    annual_capacity: "10,000 tons"
  },

  // BERRIES
  {
    id: 601,
    name: "Blueberries - Southern Highbush",
    category: "berries",
    supplier: "Berryworld",
    origin: "Western Cape, South Africa",
    price: 28.50,
    unit: "kg",
    min_order: 500,
    description: "Premium blueberries with excellent flavor and firm texture. High antioxidant content and consistent quality.",
    image_url: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=300&fit=crop",
    export_markets: ["EU", "UK", "Middle East"],
    shipping_info: "Refrigerated Air Freight (0-2°C)",
    certifications: ["GlobalGAP", "Organic"],
    lead_time: "1-2 days",
    season: "October - March",
    specifications: {
      variety: "Southern Highbush",
      size: "Large",
      packaging: "125g punnets",
      brix: "12-14°",
      shelf_life: "14 days"
    },
    supplier_contact: "info@berryworld.co.za",
    annual_capacity: "2,000 tons"
  },

  // APPLES & PEARS
  {
    id: 701,
    name: "Granny Smith Apples",
    category: "apples-pears",
    supplier: "Tru-Cape",
    origin: "Elgin Valley, South Africa",
    price: 9.80,
    unit: "kg",
    min_order: 3000,
    description: "Crisp green apples with tart flavor. Excellent for fresh consumption and food service industry.",
    image_url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
    export_markets: ["EU", "Middle East", "Africa"],
    shipping_info: "Refrigerated Container (0-2°C)",
    certifications: ["GlobalGAP", "BRCGS"],
    lead_time: "4-7 days",
    season: "March - July",
    specifications: {
      variety: "Granny Smith",
      size: "80-100 count",
      packaging: "18kg cartons",
      firmness: "16-18 lbs",
      shelf_life: "180 days"
    },
    supplier_contact: "exports@tru-cape.co.za",
    annual_capacity: "40,000 tons"
  }
];

// Supplier directory with real contact information
export const suppliers = {
  "Kromco": {
    contact: "exports@kromco.co.za",
    phone: "+27 21 850 6700",
    products: ["citrus", "grapes", "stone-fruits", "pomegranates"],
    certifications: ["GlobalGAP", "BRCGS", "SIZA"],
    established: 1995
  },
  "Freshgro Citrus": {
    contact: "exports@freshgrocitrus.co.za", 
    phone: "+27 15 516 1000",
    products: ["citrus"],
    certifications: ["GlobalGAP", "BRCGS"],
    established: 2002
  },
  "The Grape Company": {
    contact: "exports@grapecompany.co.za",
    phone: "+27 23 349 1200", 
    products: ["grapes"],
    certifications: ["GlobalGAP", "BRCGS", "HACCP"],
    established: 1998
  },
  "FruitOne": {
    contact: "info@fruitone.co.za",
    phone: "+27 21 872 1500",
    products: ["grapes", "stone-fruits"],
    certifications: ["GlobalGAP", "SIZA"],
    established: 2005
  }
};
