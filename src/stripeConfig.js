import { loadStripe } from '@stripe/stripe-js';

// Test publishable key - replace with your live key in production
const stripePromise = loadStripe('pk_test_51PLSA2Rv4pC9w1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p1p');

export default stripePromise;
