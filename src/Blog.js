import React from 'react';
import { useAppData } from './AppDataContext.js';
import { ComponentFactory } from './ComponentFactory.js';

const Blog = () => {
  const { blogPosts = [], blogCategories = [] } = useAppData();

  const handleReadMore = (post) => {
    alert(`Reading: ${post.title}\n\n${post.content}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '15px' }}>
          African Agriculture Insights
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Expert analysis, export guides, and success stories from African agricultural markets.
        </p>
      </div>

      {/* Featured Posts */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '2rem', color: '#333', marginBottom: '30px', textAlign: 'center' }}>
          Featured Articles
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {blogPosts.slice(0, 3).map(post => (
            <ComponentFactory.BlogCard
              key={post.id}
              post={post}
              onReadMore={handleReadMore}
            />
          ))}
        </div>
      </section>

      {/* All Blog Posts */}
      <section>
        <h2 style={{ fontSize: '2rem', color: '#333', marginBottom: '30px', textAlign: 'center' }}>
          Latest Articles
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {blogPosts.map(post => (
            <ComponentFactory.BlogCard
              key={post.id}
              post={post}
              onReadMore={handleReadMore}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ 
        marginTop: '60px', 
        background: 'white', 
        padding: '40px', 
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          Browse by Category
        </h3>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {blogCategories.map(category => (
            <button
              key={category}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                color: '#2E8B57',
                border: '2px solid #2E8B57',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#2E8B57';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#2E8B57';
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
