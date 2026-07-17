const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Read and parse blog-data.js
let dataContent = fs.readFileSync('blog-data.js', 'utf-8');
dataContent = dataContent.replace('window.blogData = ', '').trim();
if (dataContent.endsWith(';')) dataContent = dataContent.slice(0, -1);
// Because it's a JS object with unquoted keys, eval is easiest
const blogData = eval(dataContent);

if (!fs.existsSync('./blog')) fs.mkdirSync('./blog');

const template = fs.readFileSync('blog-post.html', 'utf-8');

blogData.forEach(post => {
    const $ = cheerio.load(template);
    
    // Update Meta
    $('title').text(`${post.title} | Campfly Blog`);
    $('meta[name="description"]').attr('content', post.excerpt);
    $('meta[property="og:title"], meta[name="twitter:title"]').attr('content', `${post.title} | Campfly Blog`);
    $('meta[property="og:description"], meta[name="twitter:description"]').attr('content', post.excerpt);
    $('meta[property="og:image"], meta[name="twitter:image"]').attr('content', `https://campfly.in/${post.image}`);
    
    // Set canonical
    let canonical = $('link[rel="canonical"]');
    if (canonical.length === 0) {
        $('head').append(`<link rel="canonical" href="https://campfly.in/blog/${post.id}">`);
    } else {
        canonical.attr('href', `https://campfly.in/blog/${post.id}`);
    }

    // Render Header
    $('#post-header-container').html(`
      <span class="post-tag">${post.category}</span>
      <h1 class="post-title">${post.title}</h1>
      <div class="post-meta">
        <div class="post-meta-item">
          <img src="/assets/logo-cropped.png" alt="Campfly" style="height: 24px;">
          <span>${post.author}</span>
        </div>
        <div class="post-meta-item">
          <span>${post.date}</span>
        </div>
        <div class="post-meta-item">
          <span>${post.readTime}</span>
        </div>
      </div>
    `);

    // Ensure no hidden H1 remains in the skeleton
    $('header.post-header h1[style="display:none;"]').remove();

    // Render Hero Image with fetchpriority
    $('#post-hero-image').html(`
      <img fetchpriority="high" src="/${post.image}" alt="${post.title} - Campfly Blog">
    `);

    // Render Content
    $('#post-content').html(post.content);

    // Fix TOC
    const headings = $('#post-content h2, #post-content h3');
    headings.each((i, el) => {
        const id = $(el).attr('id') || `heading-${i}`;
        $(el).attr('id', id);
        const link = `<a href="#${id}" class="${el.tagName.toLowerCase() === 'h3' ? 'toc-h3' : 'toc-h2'}">${$(el).text()}</a>`;
        $('#toc-nav').append(link);
    });

    // Related Posts
    const related = blogData.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);
    const relatedHTML = (related.length > 0 ? related : blogData.filter(p => p.id !== post.id).slice(0,3)).map(rel => `
      <article class="blog-card">
        <img src="/${rel.image}" alt="${rel.title}" loading="lazy">
        <div class="blog-card-content">
          <h3><a href="/blog/${rel.id}">${rel.title}</a></h3>
        </div>
      </article>
    `).join('');
    $('#related-grid').html(relatedHTML);

    // Fix relative assets (since we are moving from / to /blog/)
    $('link[href^="assets/"], link[href^="styles.css"], link[href^="dashboard.css"]').each((i, el) => {
        $(el).attr('href', '/' + $(el).attr('href'));
    });
    $('img[src^="assets/"]').each((i, el) => {
        $(el).attr('src', '/' + $(el).attr('src'));
    });
    $('script[src^="blog-data.js"], script[src^="script.js"], script[src^="auth.js"]').each((i, el) => {
        $(el).attr('src', '/' + $(el).attr('src'));
    });
    
    // Remove blog-post.js since it's SSG now
    $('script[src^="blog-post.js"], script[src^="/blog-post.js"]').remove();
    
    // Add BlogPosting Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://campfly.in/blog/${post.id}`
      },
      "headline": post.title,
      "image": `https://campfly.in/${post.image}`,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Campfly",
        "logo": {
          "@type": "ImageObject",
          "url": "https://campfly.in/assets/logo-cropped.png"
        }
      },
      "datePublished": post.date
    };
    $('head').append(`\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>\n`);

    // Also inject breadcrumbs for blog
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://campfly.in/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://campfly.in/blog.html" },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://campfly.in/blog/${post.id}` }
      ]
    };
    $('head').append(`\n<script type="application/ld+json">\n${JSON.stringify(breadcrumb, null, 2)}\n</script>\n`);

    fs.writeFileSync(`./blog/${post.id}.html`, $.html());
});
console.log('Blog SSG complete.');
