const fs = require('fs');

// Read the current App.js
let appContent = fs.readFileSync('App.js', 'utf8');

// Remove the problematic echo line and add CSS directly
const fixedContent = appContent.replace('// Append CSS to App.css\necho "$additionalCSS" >> App.css', `
// CSS will be added separately
console.log("App.js updated successfully");
`);

// Write the fixed content back
fs.writeFileSync('App.js', fixedContent);

console.log("✅ App.js fixed successfully!");
