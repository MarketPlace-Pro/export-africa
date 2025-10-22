const https = require('https');
const { exec } = require('child_process');

console.log('🔍 SEO AUDIT FOR EXPORT AFRICA');
console.log('==============================');

// Check critical SEO elements
const checks = [
  {
    name: 'Homepage Loading',
    test: () => new Promise((resolve) => {
      https.get('https://verselagritrades.vercel.app', (res) => {
        resolve(res.statusCode === 200 ? '✅ Online' : '❌ Offline');
      }).on('error', () => resolve('❌ Cannot reach'));
    })
  },
  {
    name: 'Sitemap Exists',
    test: () => new Promise((resolve) => {
      https.get('https://verselagritrades.vercel.app/sitemap.xml', (res) => {
        resolve(res.statusCode === 200 ? '✅ Found' : '❌ Missing');
      }).on('error', () => resolve('❌ Missing'));
    })
  },
  {
    name: 'Robots.txt',
    test: () => new Promise((resolve) => {
      https.get('https://verselagritrades.vercel.app/robots.txt', (res) => {
        resolve(res.statusCode === 200 ? '✅ Found' : '❌ Missing');
      }).on('error', () => resolve('❌ Missing'));
    })
  }
];

// Run all checks
Promise.all(checks.map(check => check.test().then(result => ({...check, result}))))
  .then(results => {
    results.forEach(({name, result}) => {
      console.log(`${name}: ${result}`);
    });
    
    console.log('\n🎯 RECOMMENDATIONS:');
    console.log('1. Ensure all pages have meta tags');
    console.log('2. Verify sitemap includes all products');
    console.log('3. Check page load speeds');
    console.log('4. Validate mobile responsiveness');
  });
