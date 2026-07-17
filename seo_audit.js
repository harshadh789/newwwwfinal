const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const directoryPath = './';
const htmlFiles = fs.readdirSync(directoryPath).filter(file => file.endsWith('.html'));

const report = {
  missingTitle: [],
  shortTitle: [],
  longTitle: [],
  missingDesc: [],
  shortDesc: [],
  longDesc: [],
  multipleH1: [],
  missingH1: [],
  missingCanonical: [],
  missingOG: [],
  missingSchema: [],
  totalFiles: htmlFiles.length
};

htmlFiles.forEach(file => {
  // Skip non-public pages
  if (['dashboard.html', 'forgot-password.html', 'reset-password.html'].includes(file)) return;
  
  const content = fs.readFileSync(path.join(directoryPath, file), 'utf-8');
  const $ = cheerio.load(content);
  
  const title = $('title').text();
  if (!title) report.missingTitle.push(file);
  else if (title.length < 30) report.shortTitle.push({file, len: title.length});
  else if (title.length > 65) report.longTitle.push({file, len: title.length});
  
  const desc = $('meta[name="description"]').attr('content');
  if (!desc) report.missingDesc.push(file);
  else if (desc.length < 100) report.shortDesc.push({file, len: desc.length});
  else if (desc.length > 170) report.longDesc.push({file, len: desc.length});
  
  const h1s = $('h1').length;
  if (h1s === 0) report.missingH1.push(file);
  else if (h1s > 1) report.multipleH1.push({file, count: h1s});
  
  const canonical = $('link[rel="canonical"]').attr('href');
  if (!canonical) report.missingCanonical.push(file);
  
  const ogTitle = $('meta[property="og:title"]').attr('content');
  if (!ogTitle) report.missingOG.push(file);
  
  const schema = $('script[type="application/ld+json"]').html();
  if (!schema) report.missingSchema.push(file);
});

fs.writeFileSync('seo_report.json', JSON.stringify(report, null, 2));
console.log('Audit complete. Found issues:', Object.keys(report).map(k => `${k}: ${report[k].length || report[k]}`).join(', '));
