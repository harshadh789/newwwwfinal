const fs = require('fs');

const blogDataPath = 'blog-data.js';
let blogDataRaw = fs.readFileSync(blogDataPath, 'utf8');

// Replace the invalid image
blogDataRaw = blogDataRaw.replace(
  /"https:\/\/images\.unsplash\.com\/photo-1625078502844-32213e4b31a3\?auto=format&fit=crop&w=1200&q=80"/g,
  '"https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80"'
);

// Remove the duplicate <h2>
blogDataRaw = blogDataRaw.replace(
  /<h2>Top Places to Visit in Matheran<\/h2>/g,
  ''
);

fs.writeFileSync(blogDataPath, blogDataRaw);
console.log("Matheran data fixed.");
