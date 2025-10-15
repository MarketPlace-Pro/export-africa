// Analytics Service for AfriTrade Global
export const analytics = {
  
  // Track page views
  trackPageView(page) {
    console.log('📊 Page view:', page);
    // In production, integrate with Google Analytics, Mixpanel, etc.
    this.saveEvent('page_view', { page, timestamp: new Date().toISOString() });
  },

  // Track user actions
  trackEvent(event, data = {}) {
    console.log('📊 Event:', event, data);
    this.saveEvent(event, { ...data, timestamp: new Date().toISOString() });
  },

  // Track form submissions
  trackFormSubmission(formType, data) {
    console.log('📊 Form submission:', formType, data);
    this.saveEvent('form_submission', { 
      form_type: formType, 
      ...data, 
      timestamp: new Date().toISOString() 
    });
  },

  // Track product interactions
  trackProductInteraction(action, product) {
    console.log('📊 Product interaction:', action, product.name);
    this.saveEvent('product_interaction', {
      action,
      product_id: product.id,
      product_name: product.name,
      category: product.category,
      timestamp: new Date().toISOString()
    });
  },

  // Save event to localStorage
  saveEvent(eventType, data) {
    try {
      const existing = JSON.parse(localStorage.getItem('afritrade_analytics') || '[]');
      const newEvent = {
        id: Date.now(),
        type: eventType,
        ...data
      };
      const updated = [...existing, newEvent];
      localStorage.setItem('afritrade_analytics', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving analytics event:', error);
    }
  },

  // Get analytics data
  getAnalytics() {
    try {
      return JSON.parse(localStorage.getItem('afritrade_analytics') || '[]');
    } catch (error) {
      console.error('Error reading analytics:', error);
      return [];
    }
  },

  // Get dashboard stats
  getDashboardStats() {
    const events = this.getAnalytics();
    
    const pageViews = events.filter(e => e.type === 'page_view').length;
    const formSubmissions = events.filter(e => e.type === 'form_submission').length;
    const productInteractions = events.filter(e => e.type === 'product_interaction').length;
    
    // Get popular pages
    const pageCounts = {};
    events.filter(e => e.type === 'page_view').forEach(e => {
      pageCounts[e.page] = (pageCounts[e.page] || 0) + 1;
    });
    
    const popularPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      totalEvents: events.length,
      pageViews,
      formSubmissions,
      productInteractions,
      popularPages
    };
  },

  // Export analytics data
  exportData() {
    const events = this.getAnalytics();
    const csv = this.convertToCSV(events);
    return csv;
  },

  // Convert events to CSV
  convertToCSV(events) {
    if (events.length === 0) return '';
    
    const headers = Object.keys(events[0]);
    const csvRows = [headers.join(',')];
    
    events.forEach(event => {
      const values = headers.map(header => {
        const value = event[header];
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      });
      csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
  }
};
