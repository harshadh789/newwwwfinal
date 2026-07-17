const fs = require('fs');
let html = fs.readFileSync('blog-post.html', 'utf8');

// Replace Header Container
const headerStart = '<div class="post-header-container">';
const headerEnd = '</header>';
const idxHStart = html.indexOf(headerStart);
const idxHEnd = html.indexOf(headerEnd);

if(idxHStart !== -1 && idxHEnd !== -1) {
  const newHeader = `<div class="post-header-container" id="post-header-container"></div>\n      `;
  html = html.substring(0, idxHStart) + newHeader + html.substring(idxHEnd);
}

// Replace Hero Image
const heroStart = '<div class="post-hero-image">';
const heroEnd = '<!-- Content Layout -->';
const idxHeroStart = html.indexOf(heroStart);
const idxHeroEnd = html.indexOf(heroEnd);

if (idxHeroStart !== -1 && idxHeroEnd !== -1) {
  const newHero = `<div class="post-hero-image" id="post-hero-image"></div>\n\n      `;
  html = html.substring(0, idxHeroStart) + newHero + html.substring(idxHeroEnd);
}

// Replace Post Content
const contentStart = '<div class="post-content">';
const contentEnd = '<aside class="post-sidebar">';
const idxContentStart = html.indexOf(contentStart);
const idxContentEnd = html.indexOf(contentEnd);

if (idxContentStart !== -1 && idxContentEnd !== -1) {
  const newContent = `<div class="post-content" id="post-content"></div>\n\n        `;
  html = html.substring(0, idxContentStart) + newContent + html.substring(idxContentEnd);
}

// Replace Related Grid
const relatedStart = '<div class="related-grid">';
const relatedEnd = '</section>';
const idxRelatedStart = html.indexOf(relatedStart);
const idxRelatedEnd = html.indexOf(relatedEnd);

if (idxRelatedStart !== -1 && idxRelatedEnd !== -1) {
  const newRelated = `<div class="related-grid" id="related-grid"></div>\n      `;
  html = html.substring(0, idxRelatedStart) + newRelated + html.substring(idxRelatedEnd);
}

// Add script tags at the bottom
if (!html.includes('blog-data.js')) {
  html = html.replace('<script src="script.js"></script>', '<script src="blog-data.js"></script>\n    <script src="blog-post.js"></script>\n    <script src="script.js"></script>');
}

fs.writeFileSync('blog-post.html', html, 'utf8');
console.log('blog-post.html updated successfully.');
