// AI service for intelligent features
export class AfriTradeAI {
  
  // Smart product recommendations based on user behavior
  getProductRecommendations(userPreferences, cartItems, browseHistory) {
    const allProducts = require('./appData').products;
    
    let recommendations = [];
    
    // 1. Recommend similar to cart items
    if (cartItems.length > 0) {
      const cartCategories = [...new Set(cartItems.map(item => item.category))];
      recommendations = allProducts.filter(product => 
        cartCategories.includes(product.category) && 
        !cartItems.find(item => item.id === product.id)
      );
    }
    
    // 2. Recommend based on preferences
    if (userPreferences.category) {
      const categoryRecs = allProducts.filter(product => 
        product.category === userPreferences.category
      );
      recommendations = [...new Set([...recommendations, ...categoryRecs])];
    }
    
    // 3. Popular products as fallback
    if (recommendations.length < 3) {
      const popular = allProducts
        .slice(0, 6)
        .filter(p => !recommendations.find(r => r.id === p.id));
      recommendations = [...recommendations, ...popular.slice(0, 3 - recommendations.length)];
    }
    
    return recommendations.slice(0, 4);
  }

  // Market insights generator
  getMarketInsights(productCategory) {
    const insights = {
      wine: "🌍 **EU Market Opportunity**: South African wines enjoy tariff-free access to European markets. Premium wines showing 15% YoY growth with strong demand in Germany and UK.",
      fruits: "🚀 **Middle East Demand**: UAE and Saudi Arabia import over $2B in fresh fruits annually. Kenyan avocados have competitive advantage with 30% lower tariffs.",
      crafts: "🎨 **US Market Trend**: Authentic African handicrafts seeing 25% growth in specialty retail. Focus on sustainability stories and fair trade certifications.",
      textiles: "👗 **Global Fashion**: African prints trending in European fashion weeks. OEKO-TEX certification increases buyer confidence by 40%.",
      spices: "🌶️ **Health Food Boom**: Organic African spices in high demand for health-conscious markets. US and Japan showing 20% annual growth."
    };
    
    return insights[productCategory] || "🌱 **Export Growth**: African products gaining international recognition. Focus on quality certifications and reliable supply chains.";
  }

  // Smart inquiry response suggestions
  generateInquiryResponse(inquiryType, productInfo) {
    const templates = {
      product: `Thank you for your interest in ${productInfo.name}. We can supply ${productInfo.min_order}+ units with ${productInfo.lead_time} lead time. All export documentation included.`,
      bulk: `For bulk orders of ${productInfo.name}, we offer competitive pricing and dedicated logistics support. Minimum order: ${productInfo.min_order} ${productInfo.unit}s.`,
      sample: `Sample requests available for qualified buyers. Shipping costs apply. Please share your business details for sample approval.`
    };
    
    return templates[inquiryType] || "Thank you for your export inquiry. Our team will provide customized solutions for your international trade needs.";
  }

  // Export market matching
  suggestExportMarkets(product) {
    const marketSuggestions = {
      wine: ["EU", "USA", "China", "UK"],
      fruits: ["EU", "Middle East", "UK", "Russia"],
      crafts: ["USA", "EU", "Canada", "Australia"],
      textiles: ["USA", "EU", "Japan", "Middle East"],
      spices: ["EU", "USA", "Japan", "South Korea"]
    };
    
    return marketSuggestions[product.category] || ["EU", "USA", "Middle East"];
  }
}

export const afriTradeAI = new AfriTradeAI();
