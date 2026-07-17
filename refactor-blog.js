const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'matheran.html');
let html = fs.readFileSync(filePath, 'utf-8');

const startTag = '<article class="container content-rich" itemscope itemtype="https://schema.org/Article" style="margin-top: 4rem; margin-bottom: 4rem;">';
const endTag = '</article>';

const newStartTag = `
      <div class="container blog-layout" style="margin-top: 4rem; margin-bottom: 4rem;">
        
        <!-- SIDEBAR -->
        <aside class="blog-sidebar" id="blog-sidebar">
          <div class="sidebar-sticky">
            <div class="sidebar-search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" id="article-search" placeholder="Search guide..." aria-label="Search guide" />
              <button id="clear-search" class="clear-search-btn" aria-label="Clear search" style="display:none;">&times;</button>
            </div>
            
            <div class="sidebar-toc">
              <h3 class="toc-title">Table of Contents</h3>
              <nav id="toc-nav">
                <!-- TOC Generated via JS -->
              </nav>
            </div>
            
            <div class="sidebar-cta">
              <h4 style="margin-top:0;">Ready to go?</h4>
              <p style="font-size: 0.9rem; margin-bottom: 1rem;">View all Matheran packages</p>
              <a href="packages.html?theme=all" class="solid btn-primary" style="display:block; text-align:center;">View Packages</a>
            </div>
          </div>
        </aside>

        <!-- MAIN CONTENT -->
        <article class="blog-main blog-content-rich" id="blog-main" itemscope itemtype="https://schema.org/Article">
          
          <div class="article-meta">
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> By Campfly Expert</span>
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> 15 Min Read</span>
            <span>Last Updated: July 2026</span>
          </div>
`;

const newEndTag = `
        </article>
      </div>
`;

if (html.includes(startTag)) {
  html = html.replace(startTag, newStartTag);
  
  const lastArticleIndex = html.lastIndexOf('</article>');
  if (lastArticleIndex !== -1) {
    html = html.substring(0, lastArticleIndex) + newEndTag + html.substring(lastArticleIndex + '</article>'.length);
    console.log("Successfully wrapped article in blog-layout grid.");
  } else {
    console.log("Could not find closing </article> tag.");
  }
} else {
  console.log("Could not find start tag, checking if already refactored...");
}

// Convert "quick-answer-box" to "callout callout-quick-answer" (strip inline styles to rely on CSS)
html = html.replace(/<div class="quick-answer-box"[^>]*>/g, '<div class="callout callout-quick-answer">');
html = html.replace(/<div class="quick-answer-box">/g, '<div class="callout callout-quick-answer">');

// Convert "photo-tip" to "callout callout-travel-tip"
html = html.replace(/<figure class="photo-tip"[^>]*>/g, '<figure class="callout callout-travel-tip">');

// Add "table-responsive" wrapper to all tables
html = html.replace(/<table([^>]*)>/g, '<div class="table-responsive"><table$1>');
html = html.replace(/<\/table>/g, '</table></div>');

// Add Reading Progress Bar to header
if (!html.includes('id="reading-progress-bar"')) {
  html = html.replace('<header class="site-header">', '<div id="reading-progress-container"><div id="reading-progress-bar"></div></div>\n    <header class="site-header">');
}

// Add Mobile TOC drawer button
if (!html.includes('id="mobile-toc-toggle"')) {
  const scrollHtml = `
    <button id="mobile-toc-toggle" class="mobile-toc-btn" aria-label="Table of Contents">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      Index
    </button>
  `;
  html = html.replace('</main>', scrollHtml + '\n    </main>');
}

fs.writeFileSync(filePath, html, 'utf-8');
console.log("matheran.html refactoring complete.");
