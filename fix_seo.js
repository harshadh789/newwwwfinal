const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const directoryPath = './';
const htmlFiles = fs.readdirSync(directoryPath).filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
  // Skip non-public pages
  if (['dashboard.html', 'forgot-password.html', 'reset-password.html'].includes(file)) return;
  
  let content = fs.readFileSync(path.join(directoryPath, file), 'utf-8');
  let $ = cheerio.load(content);
  let changed = false;

  // Fix short title
  const titleElem = $('title');
  let title = titleElem.text();
  if (title && title.length < 30) {
    if (!title.includes('Campfly')) {
        titleElem.text(title + ' | Campfly Premium Tours');
    } else {
        titleElem.text(title + ' | Premium Tour Packages');
    }
    changed = true;
  }
  
  // Fix short description
  const descElem = $('meta[name="description"]');
  let desc = descElem.attr('content');
  if (desc && desc.length < 100) {
    const suffix = ' Discover expert travel tips, customized itineraries, and premium packages with Campfly.';
    descElem.attr('content', desc + suffix);
    changed = true;
  }
  
  // Fix img lazy loading and alt tags
  $('img').each((i, el) => {
    if (!$(el).attr('loading')) {
      $(el).attr('loading', 'lazy');
      changed = true;
    }
    if (!$(el).attr('alt')) {
      $(el).attr('alt', 'Campfly Travel Experience');
      changed = true;
    }
  });

  if (changed) {
    // Write back, preserving DOCTYPE which Cheerio might strip/modify. 
    // Cheerio automatically adds html, head, body if they didn't exist, but our pages have them.
    let updatedContent = $.html();
    
    // Quick hack for self-closing tags and spacing if needed, but Cheerio's output is generally valid HTML.
    fs.writeFileSync(path.join(directoryPath, file), updatedContent);
  }
});

console.log('Fixed SEO metadata across all files.');
