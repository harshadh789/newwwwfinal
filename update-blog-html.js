const fs = require('fs');

let html = fs.readFileSync('blog.html', 'utf8');

// Replace Featured Post and first Grid
const startMarker1 = '<!-- Featured Post -->';
const endMarker1 = '<!-- Inline CTA Banner -->';
const indexStart1 = html.indexOf(startMarker1);
const indexEnd1 = html.indexOf(endMarker1);

if (indexStart1 !== -1 && indexEnd1 !== -1) {
  const newContent1 = `<!-- Featured Post -->
        <div id="featured-post-container"></div>

        <!-- Grid -->
        <div id="blog-grid" class="blog-grid"></div>

        `;
  html = html.substring(0, indexStart1) + newContent1 + html.substring(indexEnd1);
}

// Remove second grid row
const startMarker2 = '<!-- Grid row 2 -->';
const endMarker2 = '<div class="load-more-wrapper"';
const indexStart2 = html.indexOf(startMarker2);
const indexEnd2 = html.indexOf(endMarker2);

if (indexStart2 !== -1 && indexEnd2 !== -1) {
  html = html.substring(0, indexStart2) + html.substring(indexEnd2);
}

// Add script tags at the bottom
if (!html.includes('blog-data.js')) {
  html = html.replace('<script src="script.js"></script>', '<script src="blog-data.js"></script>\n    <script src="blog.js"></script>\n    <script src="script.js"></script>');
}

fs.writeFileSync('blog.html', html, 'utf8');
console.log('blog.html updated successfully.');
