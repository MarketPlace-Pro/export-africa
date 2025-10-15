import React from 'react';
import { useAppData } from './AppDataContext.js';
import { ComponentFactory } from './ComponentFactory.js';

const About = () => {
  const { about = {}, certifications = [] } = useAppData();

  // Safe fallbacks for about data
  const safeAbout = {
    companyStory: about.companyStory || {
      headline: "Connecting African Agriculture with Global Markets Through Technology",
      mission: "To empower African farmers and agricultural businesses by providing direct access to international markets through our AI-powered digital platform.",
      story: "Our story content is loading..."
    },
    values: about.values || [],
    achievements: about.achievements || [],
    trustElements: about.trustElements || [],
    callToAction: about.callToAction || {
      title: "Join Africa's Fastest-Growing Agricultural Export Platform",
      description: "Whether you're an African supplier looking to access global markets or an international buyer seeking premium African products, our platform provides the tools, connections, and support you need to succeed.",
      buttons: [
        { text: "Start Selling", type: "primary" },
        { text: "Find Suppliers", type: "secondary" }
      ]
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        padding: '60px 20px',
        background: 'linear-gradient(135deg, #2E8B57 0%, #1a5276 100%)',
        color: 'white',
        borderRadius: '16px',
        marginBottom: '50px'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          {safeAbout.companyStory.headline}
        </h1>
        <p style={{ fontSize: '1.3rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
          {safeAbout.companyStory.mission}
        </p>
      </section>

      {/* Our Story */}
      <section style={{ marginBottom: '50px' }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '2.2rem', color: '#333', marginBottom: '20px' }}>
            Our Story
          </h2>
          <div style={{ 
            color: '#666', 
            lineHeight: '1.8',
            fontSize: '1.1rem'
          }}>
            <p style={{ marginBottom: '20px' }}>
              {safeAbout.companyStory.story}
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      {safeAbout.values.length > 0 && (
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#333', marginBottom: '40px' }}>
            Our Values
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {safeAbout.values.map((value, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
                  {value.icon}
                </div>
                <h3 style={{ color: '#333', marginBottom: '15px' }}>
                  {value.title}
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {safeAbout.achievements.length > 0 && (
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#333', marginBottom: '40px' }}>
            Our Impact
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            {safeAbout.achievements.map((achievement, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  color: '#2E8B57',
                  marginBottom: '10px'
                }}>
                  {achievement.number}
                </div>
                <div style={{ 
                  fontWeight: '600', 
                  color: '#333',
                  marginBottom: '5px'
                }}>
                  {achievement.label}
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trust Elements */}
      {safeAbout.trustElements.length > 0 && (
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#333', marginBottom: '40px' }}>
            Why Trust Us
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {safeAbout.trustElements.map((element, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#2E8B57', marginBottom: '15px' }}>
                  {element.title}
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  {element.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section style={{
        background: 'linear-gradient(135deg, #2E8B57 0%, #1a5276 100%)',
        color: 'white',
        padding: '50px 30px',
        borderRadius: '16px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          {safeAbout.callToAction.title}
        </h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '30px', maxWidth: '600px', margin: '0 auto' }}>
          {safeAbout.callToAction.description}
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {safeAbout.callToAction.buttons.map((button, index) => (
            <button
              key={index}
              style={{
                padding: '15px 30px',
                background: button.type === 'primary' ? '#FF6B35' : 'transparent',
                color: 'white',
                border: button.type === 'primary' ? 'none' : '2px solid white',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (button.type === 'primary') {
                  e.target.style.background = '#e55a2b';
                } else {
                  e.target.style.background = 'white';
                  e.target.style.color = '#2E8B57';
                }
              }}
              onMouseLeave={(e) => {
                if (button.type === 'primary') {
                  e.target.style.background = '#FF6B35';
                } else {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'white';
                }
              }}
            >
              {button.text}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
