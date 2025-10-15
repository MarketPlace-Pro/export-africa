import { supabase } from '../supabaseClient';

export const paymentService = {
  // Create a new order and payment intent
  async createOrder(cartItems, buyerInfo, shippingAddress) {
    try {
      // Calculate total amount
      const totalAmount = cartItems.reduce((total, item) => 
        total + (item.price * item.quantity), 0
      );

      // Generate order number
      const orderNumber = 'AFT' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();

      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          order_number: orderNumber,
          buyer_email: buyerInfo.email,
          buyer_name: buyerInfo.name,
          buyer_phone: buyerInfo.phone,
          shipping_address: shippingAddress,
          total_amount: totalAmount,
          status: 'pending'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity,
        total_price: item.price * item.quantity,
        supplier_email: item.supplier
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // In a real implementation, you would create a Stripe Payment Intent here
      // For now, we'll simulate it
      const mockPaymentIntent = {
        id: 'pi_mock_' + Date.now(),
        client_secret: 'cs_mock_' + Date.now(),
        status: 'requires_payment_method'
      };

      // Update order with Stripe payment intent ID
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          stripe_payment_intent_id: mockPaymentIntent.id,
          stripe_client_secret: mockPaymentIntent.client_secret
        })
        .eq('id', order.id);

      if (updateError) throw updateError;

      return {
        success: true,
        order: {
          ...order,
          payment_intent: mockPaymentIntent
        }
      };

    } catch (error) {
      console.error('Error creating order:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Process payment (simulated for demo)
  async processPayment(orderId, paymentMethod) {
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update order status
      const { error } = await supabase
        .from('orders')
        .update({
          status: 'paid',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;

      // Create payment record
      await supabase
        .from('payments')
        .insert([{
          order_id: orderId,
          stripe_payment_intent_id: 'pi_mock_' + Date.now(),
          amount: 100, // This would be the actual amount
          status: 'succeeded',
          payment_method: paymentMethod.type,
          buyer_email: 'buyer@example.com' // This would be actual buyer email
        }]);

      return {
        success: true,
        message: 'Payment processed successfully'
      };

    } catch (error) {
      console.error('Error processing payment:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get order by ID
  async getOrder(orderId) {
    try {
      const { data: order, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;

      const { data: items } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);

      return {
        success: true,
        order: {
          ...order,
          items: items || []
        }
      };

    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get orders by buyer email
  async getBuyerOrders(buyerEmail) {
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .eq('buyer_email', buyerEmail)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        orders: orders || []
      };

    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};
