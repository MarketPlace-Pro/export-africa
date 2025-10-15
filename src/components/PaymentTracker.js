import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function PaymentTracker() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDeals(data || []);
    } catch (error) {
      console.error('Error loading deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCommission = (dealAmount, commissionRate = 0.05) => {
    return dealAmount * commissionRate;
  };

  const addNewDeal = async (dealData) => {
    try {
      const commission = calculateCommission(dealData.deal_amount, dealData.commission_rate);
      
      const { data, error } = await supabase
        .from('deals')
        .insert([
          {
            ...dealData,
            commission_amount: commission,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;
      
      setDeals([data[0], ...deals]);
      return data[0];
    } catch (error) {
      console.error('Error adding deal:', error);
      throw error;
    }
  };

  const updateDealStatus = async (dealId, newStatus) => {
    try {
      const { error } = await supabase
        .from('deals')
        .update({ status: newStatus })
        .eq('id', dealId);

      if (error) throw error;
      
      loadDeals(); // Reload deals
    } catch (error) {
      console.error('Error updating deal:', error);
    }
  };

  const totalRevenue = deals.reduce((sum, deal) => {
    return deal.status === 'paid' ? sum + deal.commission_amount : sum;
  }, 0);

  const pendingRevenue = deals.reduce((sum, deal) => {
    return deal.status === 'pending' ? sum + deal.commission_amount : sum;
  }, 0);

  if (loading) {
    return <div>Loading payment data...</div>;
  }

  return (
    <div className="payment-tracker">
      <div className="revenue-stats">
        <div className="stat-card">
          <h3>${totalRevenue.toFixed(2)}</h3>
          <p>Total Revenue</p>
        </div>
        <div className="stat-card">
          <h3>${pendingRevenue.toFixed(2)}</h3>
          <p>Pending Commissions</p>
        </div>
        <div className="stat-card">
          <h3>{deals.length}</h3>
          <p>Total Deals</p>
        </div>
      </div>

      <div className="deals-list">
        <h3>Deal Pipeline</h3>
        {deals.map(deal => (
          <div key={deal.id} className={`deal-card status-${deal.status}`}>
            <div className="deal-header">
              <h3>{deal.buyer_company} → {deal.supplier_company}</h3>
              <span className={`status-badge status-${deal.status}`}>
                {deal.status}
              </span>
            </div>
            <div className="deal-details">
              <p><strong>Product:</strong> {deal.product}</p>
              <p><strong>Deal Amount:</strong> ${deal.deal_amount.toLocaleString()}</p>
              <p><strong>Commission:</strong> ${deal.commission_amount.toFixed(2)} ({deal.commission_rate * 100}%)</p>
              <p><strong>Date:</strong> {new Date(deal.created_at).toLocaleDateString()}</p>
            </div>
            <div className="deal-actions">
              {deal.status === 'pending' && (
                <>
                  <button 
                    onClick={() => updateDealStatus(deal.id, 'confirmed')}
                    className="btn btn-success"
                  >
                    Mark Paid
                  </button>
                  <button 
                    onClick={() => updateDealStatus(deal.id, 'cancelled')}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentTracker;
