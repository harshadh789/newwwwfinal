const fs = require('fs');

const matheranHtml = fs.readFileSync('matheran.html', 'utf8');

// Find the start and end of the top places section
const startStr = '<!-- START: TOP PLACES GENERATED SECTION -->';
const endStr = '</section>';

const startIndex = matheranHtml.indexOf(startStr);
// find the first closing section tag after startIndex
let endIndex = matheranHtml.indexOf(endStr, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find Matheran content bounds.");
  process.exit(1);
}

// We want to get the content of <section class="detail-section" id="top-places">
// Let's actually extract from <h2>Top Places to Visit in Matheran</h2> down to before the comparison tables if possible.
const startHeading = '<h2>Top Places to Visit in Matheran</h2>';
const startHeadingIndex = matheranHtml.indexOf(startHeading, startIndex);

// We want to stop before <h2 id="comparison-tables">Matheran Quick Comparison Guides</h2>
const stopHeading = '<h2 id="comparison-tables">Matheran Quick Comparison Guides</h2>';
let stopIndex = matheranHtml.indexOf(stopHeading, startIndex);
if (stopIndex === -1) {
    stopIndex = endIndex;
}

const content = matheranHtml.substring(startHeadingIndex, stopIndex).trim();

const newPost = {
  id: "matheran-destination-guide",
  title: "Top Places to Visit in Matheran",
  excerpt: "Discover the best viewpoints, serene lakes, and hidden trails in Asia's only automobile-free hill station.",
  category: "Destination Guides",
  readTime: "12 min read",
  date: "Jul 15, 2026",
  author: "Campfly Editorial",
  image: "https://images.unsplash.com/photo-1625078502844-32213e4b31a3?auto=format&fit=crop&w=1200&q=80",
  content: content
};

const blogDataPath = 'blog-data.js';
let blogDataRaw = fs.readFileSync(blogDataPath, 'utf8');

// The file ends with:
//   }
// ];
// We will replace the last ]; with , \n<newPost>\n];

// Need to escape backticks and $ in the HTML content for the template literal string in JS
const escapedContent = content.replace(/`/g, '\\`').replace(/\$/g, '\\$');

const newPostString = `  ,{
    id: "${newPost.id}",
    title: "${newPost.title}",
    excerpt: "${newPost.excerpt}",
    category: "${newPost.category}",
    readTime: "${newPost.readTime}",
    date: "${newPost.date}",
    author: "${newPost.author}",
    image: "${newPost.image}",
    content: \`
${escapedContent}
    \`
  }`;

blogDataRaw = blogDataRaw.replace(/\];\s*$/, newPostString + '\n];\n');
fs.writeFileSync(blogDataPath, blogDataRaw);
console.log("Matheran content successfully migrated.");
