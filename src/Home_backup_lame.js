import React, { useState, useEffect } from 'react';

const Home = () => {
  const [stats, setStats] = useState([
    { value: 0, label: 'Verified Suppliers', suffix: '+' },
    { value: 0, label: 'Products Listed', suffix: '+' },
    { value: 0, label: 'Countries Served', suffix: '+' },
    { value: 0, label: 'Successful Exports', suffix: '+' }
  ]);

  const [products] = useState([
    { id: 1, name: 'Premium Avocados', category: 'Fresh Fruits', price: '$45/box', image: '/api/placeholder/300/200' },
    { id: 2, name: 'Arabica Coffee', category: 'Premium Beans', price: '$25/kg', image: '/api/placeholder/300/200' },
    { id: 3, name: 'Macadamia Nuts', category: 'Organic Nuts', price: '$35/kg', image: '/api/placeholder/300/200' },
    { id: 4, name: 'Fresh Citrus', category: 'Seasonal Fruits', price: '$30/box', image: '/api/placeholder/300/200' }
  ]);

  const [currentProduct, setCurrentProduct] = useState(0);

  useEffect(() => {
    // Animate stats
    const intervals = stats.map((stat, index) => {
      return setTimeout(() => {
        const targetValues = [500, 10000, 50, 2500];
        let current = 0;
        const increment = targetValues[index] / 50;

        const counter = setInterval(() => {
          current += increment;
          if (current >= targetValues[index]) {
            current = targetValues[index];
            clearInterval(counter);
          }

          setStats(prev => prev.map((s, i) =>
            i === index ? { ...s, value: Math.floor(current) } : s
          ));
        }, 30);
      }, index * 200);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const nextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingTop: '70px' }}>
      {/* HERO SECTION - GREEN THEME */}
      <section style={{
        background: 'linear-gradient(135deg, #2E8B57 0%, #228B22 100%)',
        color: 'white',
        padding: '120px 20px 80px',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3rem', 
            marginBottom: '1rem', 
            fontWeight: 'bold',
            lineHeight: '1.2'
          }}>
            Connect Directly with African Exporters
          </h1>
          <p style={{
            fontSize: '1.3rem', 
            marginBottom: '2rem', 
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            Source premium African products directly from verified suppliers. 
            Fresh produce, authentic goods, competitive prices.
          </p>
          
          <div style={{
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            <button style={{
              background: '#FF6B35',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              Find Suppliers
            </button>
            <button style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              Become a Seller
            </button>
          </div>

          {/* TRUST BADGES */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✓</div>
              <div style={{ fontWeight: '600' }}>Verified Suppliers</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🛡️</div>
              <div style={{ fontWeight: '600' }}>Secure Payments</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🚚</div>
              <div style={{ fontWeight: '600' }}>Global Shipping</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES SECTION */}
      <section style={{
        background: '#f8f9fa',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#2E8B57' }}>✓</div>
            <div style={{ fontWeight: '600', color: '#2E8B57', fontSize: '1.1rem' }}>Verified Suppliers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#2E8B57' }}>🛡️</div>
            <div style={{ fontWeight: '600', color: '#2E8B57', fontSize: '1.1rem' }}>Secure Payments</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#2E8B57' }}>🚚</div>
            <div style={{ fontWeight: '600', color: '#2E8B57', fontSize: '1.1rem' }}>Global Shipping</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#2E8B57' }}>⭐</div>
            <div style={{ fontWeight: '600', color: '#2E8B57', fontSize: '1.1rem' }}>Quality Certified</div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={{
        padding: '80px 20px',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '20px',
            color: '#333'
          }}>
            Trusted by African Export Community
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginTop: '50px'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '40px 30px',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#2E8B57',
                  marginBottom: '10px'
                }}>
                  {stat.value}{stat.suffix}
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  color: '#666',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION WITH CAROUSEL */}
      <section style={{
        padding: '80px 20px',
        background: '#f8f9fa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '20px',
            color: '#333'
          }}>
            Featured Products
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '60px'
          }}>
            Premium African products ready for export
          </p>
          
          {/* SIMPLE CAROUSEL */}
          <div style={{
            position: 'relative',
            maxWidth: '600px',
            margin: '0 auto 50px',
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }}>
            <button onClick={prevProduct} style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#2E8B57',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}>
              ‹
            </button>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100%',
                height: '200px',
                background: '#e9ecef',
                borderRadius: '12px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                {products[currentProduct].name.includes('Avocados') && '🥑'}
                {products[currentProduct].name.includes('Coffee') && '☕'}
                {products[currentProduct].name.includes('Nuts') && '🌰'}
                {products[currentProduct].name.includes('Citrus') && '🍊'}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '10px',
                color: '#333'
              }}>
                {products[currentProduct].name}
              </h3>
              <p style={{
                color: '#666',
                marginBottom: '10px'
              }}>
                {products[currentProduct].category}
              </p>
              <p style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#2E8B57',
                marginBottom: '20px'
              }}>
                {products[currentProduct].price}
              </p>
              <button style={{
                background: '#2E8B57',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                View Details
              </button>
            </div>

            <button onClick={nextProduct} style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#2E8B57',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}>
              ›
            </button>
          </div>

          {/* PRODUCTS GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {products.map((product, index) => (
              <div key={product.id} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }}>
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: '#e9ecef',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem'
                }}>
                  {product.name.includes('Avocados') && '🥑'}
                  {product.name.includes('Coffee') && '☕'}
                  {product.name.includes('Nuts') && '🌰'}
                  {product.name.includes('Citrus') && '🍊'}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333'
                  }}>
                    {product.name}
                  </h3>
                  <p style={{
                    color: '#666',
                    marginBottom: '8px',
                    fontSize: '0.9rem'
                  }}>
                    {product.category}
                  </p>
                  <p style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: '#2E8B57',
                    marginBottom: '20px'
                  }}>
                    {product.price}
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '12px',
                    background: '#2E8B57',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease'
                  }}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #2E8B57 0%, #228B22 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '20px'
          }}>
            Ready to Start Trading?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '40px',
            opacity: 0.9
          }}>
            Join thousands of buyers and sellers in Africa's fastest growing export platform
          </p>
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button style={{
              background: '#FF6B35',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Sign Up Free
            </button>
            <button style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
