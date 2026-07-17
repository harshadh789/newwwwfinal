const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const directoryPath = './';
const htmlFiles = fs.readdirSync(directoryPath).filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
  if (['dashboard.html', 'forgot-password.html', 'reset-password.html', 'index.html'].includes(file)) return;
  
  let content = fs.readFileSync(path.join(directoryPath, file), 'utf-8');
  let $ = cheerio.load(content);
  
  // Check if BreadcrumbList exists
  const existingScripts = $('script[type="application/ld+json"]').map((i, el) => $(el).html()).get();
  const hasBreadcrumb = existingScripts.some(script => script.includes('BreadcrumbList'));
  
  if (!hasBreadcrumb) {
    const title = $('title').text().split('|')[0].trim();
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://campfly.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": title,
          "item": `https://campfly.in/${file}`
        }
      ]
    };
    
    $('head').append(`\n    <script type="application/ld+json">\n    ${JSON.stringify(breadcrumb, null, 2)}\n    </script>\n`);
    
    // Write back
    fs.writeFileSync(path.join(directoryPath, file), $.html());
  }
});

console.log('Added Breadcrumb schema to all pages.');
