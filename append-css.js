const fs = require('fs');
const css = `
/* ==========================================================================
   BLOG UX/UI OVERHAUL
   ========================================================================== */

/* --- Reading Progress --- */
#reading-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: transparent;
  z-index: 9999;
}
#reading-progress-bar {
  height: 100%;
  background: var(--brand);
  width: 0%;
  transition: width 0.1s ease-out;
}

/* --- Layout Grid --- */
.blog-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;
}
@media (min-width: 1024px) {
  .blog-layout {
    grid-template-columns: 320px 1fr;
    gap: 4rem;
  }
}

/* --- Sidebar (Desktop) --- */
.blog-sidebar {
  display: none;
}
@media (min-width: 1024px) {
  .blog-sidebar {
    display: block;
    position: sticky;
    top: 6rem;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
    padding-right: 1rem;
    scrollbar-width: thin;
  }
}
.sidebar-sticky {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* --- Sidebar Components --- */
.sidebar-search {
  position: relative;
  display: flex;
  align-items: center;
}
.sidebar-search svg {
  position: absolute;
  left: 12px;
  color: var(--muted);
}
.sidebar-search input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  font-size: 0.95rem;
  transition: all 0.2s;
}
.sidebar-search input:focus {
  border-color: var(--brand);
  outline: none;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}
.clear-search-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--muted);
  cursor: pointer;
  padding: 0;
}

.sidebar-toc {
  background: var(--surface-warm);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 1.5rem;
}
.toc-title {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--ink);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
#toc-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
#toc-nav a {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.9rem;
  line-height: 1.4;
  padding-left: 0.5rem;
  border-left: 2px solid transparent;
  transition: all 0.2s;
}
#toc-nav a:hover, #toc-nav a.active {
  color: var(--brand);
  border-left-color: var(--brand);
  font-weight: 500;
}
#toc-nav a.toc-h3 {
  padding-left: 1.5rem;
  font-size: 0.85rem;
}

.sidebar-cta {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}

/* --- Main Content Reading Area --- */
.blog-main {
  max-width: 900px;
  width: 100%;
}
.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--line);
  margin-bottom: 2rem;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 500;
}
.article-meta span {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.blog-content-rich {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--ink);
}
.blog-content-rich h2 {
  font-size: 2.2rem;
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
  color: #111;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--line);
}
.blog-content-rich h3 {
  font-size: 1.6rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: #222;
}
.blog-content-rich h4 {
  font-size: 1.2rem;
  margin-top: 2rem;
  margin-bottom: 0.8rem;
  color: #333;
}
.blog-content-rich p {
  margin-bottom: 1.5rem;
}

/* --- Callout Components --- */
.callout {
  padding: 1.5rem;
  border-radius: 12px;
  margin: 2rem 0;
  background: var(--surface-warm);
  border-left: 4px solid var(--brand);
}
.callout h4, .callout h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.callout p:last-child {
  margin-bottom: 0;
}

.callout-quick-answer { border-left-color: #3b82f6; background: rgba(59,130,246,0.05); }
.callout-travel-tip { border-left-color: #10b981; background: rgba(16,185,129,0.05); }
.callout-insider-tip { border-left-color: #8b5cf6; background: rgba(139,92,246,0.05); }
.callout-warning { border-left-color: #ef4444; background: rgba(239,68,68,0.05); }
.callout-budget { border-left-color: #14b8a6; background: rgba(20,184,166,0.05); }
.callout-family { border-left-color: #f59e0b; background: rgba(245,158,11,0.05); }

/* --- Attraction Cards (Premium) --- */
.attraction-block {
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem !important; /* Override inline styles */
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  transition: transform 0.2s, box-shadow 0.2s;
}
.attraction-block:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.06);
}
.attraction-block h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  border-bottom: none;
}

/* --- Responsive Tables --- */
.table-responsive {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 0 1px var(--line);
}
.blog-content-rich table {
  width: 100%;
  min-width: 600px; /* Forces scroll on mobile */
  border-collapse: collapse;
  background: white;
  margin-bottom: 0; /* Let wrapper handle margin */
  box-shadow: none;
}
.blog-content-rich th, .blog-content-rich td {
  padding: 1.2rem;
  text-align: left;
  border-bottom: 1px solid var(--line);
}
.blog-content-rich th {
  background: var(--surface-warm);
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 10;
}

/* --- Highlight Search Text --- */
mark.search-highlight {
  background-color: rgba(245, 158, 11, 0.4);
  color: inherit;
  padding: 0 0.1rem;
  border-radius: 2px;
}

/* --- Mobile Specifics --- */
.mobile-toc-btn {
  display: none;
}
@media (max-width: 1023px) {
  .mobile-toc-btn {
    display: flex;
    position: fixed;
    bottom: 5rem;
    left: 1rem;
    background: var(--ink);
    color: white;
    padding: 0.8rem 1.2rem;
    border-radius: 99px;
    border: none;
    font-weight: 600;
    font-size: 0.95rem;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 100;
    cursor: pointer;
  }
}
`;
fs.appendFileSync('styles.css', css);
console.log('Appended CSS to styles.css');
