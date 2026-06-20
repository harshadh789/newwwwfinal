import os

css = """
/* ==========================================================================
   TOUR CATALOG PAGE REBUILD
   ========================================================================== */

/* Catalog Header */
.catalog-header {
  padding: 8rem 1rem 4rem;
  background: var(--surface);
  text-align: center;
  border-bottom: 1px solid var(--line);
}
.catalog-header h1 {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
}
.catalog-header p {
  font-size: 1.1rem;
  color: var(--muted);
  margin-bottom: 2rem;
}

/* Search Bar */
.catalog-search-wrapper {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  transition: box-shadow 0.3s ease;
}
.catalog-search-wrapper:focus-within {
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  border-color: var(--brand);
}
.catalog-search-wrapper svg {
  color: var(--muted);
  margin-right: 0.5rem;
}
.catalog-search-wrapper input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.05rem;
  font-family: inherit;
  color: var(--ink);
  background: transparent;
}
.catalog-search-wrapper input::placeholder {
  color: #a0aec0;
}
.catalog-search-wrapper button {
  padding: 0.7rem 1.8rem;
  border-radius: 999px;
  font-size: 0.95rem;
}

/* Catalog Controls (Sticky Toolbar) */
.catalog-controls-container {
  position: sticky;
  top: 70px; /* Below site header */
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 40;
  border-bottom: 1px solid var(--line);
  padding: 1rem 0;
}
.catalog-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
@media (max-width: 768px) {
  .catalog-controls {
    flex-direction: column;
    align-items: stretch;
  }
}

/* Filter Chips */
.catalog-filters {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.2rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
}
.catalog-filters::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.filter-chip {
  flex-shrink: 0;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
  background: var(--surface);
  color: var(--muted);
  border: 1px solid var(--line);
  cursor: pointer;
  transition: all 0.2s ease;
}
.filter-chip:hover {
  border-color: var(--muted);
  color: var(--ink);
}
.filter-chip.active {
  background: var(--ink);
  color: #fff;
  border-color: var(--ink);
}

/* Sorting */
.catalog-sort {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}
.catalog-sort label {
  font-size: 0.85rem;
  color: var(--muted);
  font-weight: 500;
}
.catalog-sort select {
  padding: 0.4rem 2rem 0.4rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink);
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23718096%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;
}
.catalog-sort select:focus {
  border-color: var(--brand);
}

/* Catalog Grid Wrapper */
.catalog-main {
  padding: 3rem 0 5rem;
  background: var(--bg);
  min-height: 50vh;
}
.catalog-empty-state {
  text-align: center;
  padding: 4rem 1rem;
  color: var(--muted);
  display: none;
}
.catalog-empty-state h3 {
  color: var(--ink);
  margin-bottom: 0.5rem;
}

/* Dedicated Catalog Card (optimized for comparison) */
.catalog-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out);
  border: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}
.catalog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.08);
}
.cc-image {
  height: 200px;
  position: relative;
  background: #edf2f7;
}
.cc-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cc-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.cc-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.cc-meta {
  font-size: 0.8rem;
  color: var(--brand);
  font-weight: 600;
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.cc-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 1rem;
  line-height: 1.3;
}
.cc-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid var(--line);
  padding-top: 1rem;
}
.cc-price-block {
  display: flex;
  flex-direction: column;
}
.cc-price-label {
  font-size: 0.75rem;
  color: var(--muted);
}
.cc-price {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.02em;
}
.cc-button {
  background: var(--surface);
  color: var(--brand);
  border: 1px solid var(--brand);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;
}
.catalog-card:hover .cc-button {
  background: var(--brand);
  color: #fff;
}
"""

with open("/Users/campfly/Downloads/campfly-landing-page-main/styles.css", "a") as f:
    f.write(css)

print("Appended catalog CSS")
