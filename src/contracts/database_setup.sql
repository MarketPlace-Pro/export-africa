-- Create deals table for commission tracking
CREATE TABLE IF NOT EXISTS deals (
  id BIGSERIAL PRIMARY KEY,
  buyer_company TEXT NOT NULL,
  supplier_company TEXT NOT NULL,
  product TEXT NOT NULL,
  deal_amount DECIMAL(12,2) NOT NULL,
  commission_rate DECIMAL(4,3) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_created_at ON deals(created_at);

-- Insert sample deal for testing
INSERT INTO deals (buyer_company, supplier_company, product, deal_amount, commission_rate, commission_amount, status) 
VALUES ('Kuwait Fresh Fruits Co', 'Kromco', 'Pomegranates', 50000.00, 0.05, 2500.00, 'pending');
