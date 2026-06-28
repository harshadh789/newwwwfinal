const fs = require('fs');
const path = require('path');

const baseUrl = 'https://campfly.in';
const exclude = ['dashboard.html', 'forgot-password.html', 'reset-password.html'];

function generateSitemap() {
  const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));
  const urls = files.filter(file => !exclude.includes(file));
  
  const now = new Date().toISOString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  urls.forEach(file => {
    const url = file === 'index.html' ? `${baseUrl}/` : `${baseUrl}/${file}`;
    const priority = file === 'index.html' ? '1.0' : '0.8';
    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });
  
  xml += `</urlset>`;
  
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml);
  console.log(`Successfully generated sitemap.xml with ${urls.length} URLs.`);
}

generateSitemap();
