import React from 'react';

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization", 
    "name": "Export Africa",
    "description": "Premium African agricultural export marketplace",
    "url": "https://verselagritrades.vercel.app",
    "logo": "https://verselagritrades.vercel.app/logo512.png"
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  );
};

export default StructuredData;
