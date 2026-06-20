import re

with open("styles.css", "r") as f:
    content = f.read()

start_marker = "/* ==========================================================================\n   PACKAGE DETAIL PAGE\n   ========================================================================== */"

if start_marker in content:
    idx = content.find(start_marker)
    original_css = content[:idx]
    
    new_css = """/* ==========================================================================
   PACKAGE DETAIL PAGE
   ========================================================================== */

.package-detail-page {
  padding: 3rem 0 6rem;
  background-color: var(--bg);
}

/* Breadcrumbs */
.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: var(--brand);
  margin-bottom: 2rem;
  font-weight: 500;
}
.breadcrumb a {
  color: var(--brand);
  text-decoration: none;
  transition: color 0.2s var(--ease-out);
}
.breadcrumb a:hover {
  color: var(--brand-dark);
}
.breadcrumb svg {
  color: var(--muted);
}
#breadcrumb-active {
  color: var(--ink);
}

/* Header Info */
.package-header-info {
  margin-bottom: 2.5rem;
}
.package-title-row {
  margin-bottom: 1rem;
}
.package-title-row h1 {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--ink);
  margin: 0;
  line-height: 1.1;
}

.quick-glance {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}
#pkg-meta {
  color: var(--ink);
  font-weight: 600;
  font-size: 1.15rem;
}

/* Mosaic Gallery */
.package-mosaic-gallery {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 280px 280px;
  gap: 1.5rem;
  margin-bottom: 4rem;
}
.mosaic-item {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 16px;
}
.mosaic-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
  display: block;
}
.mosaic-item img:hover {
  transform: scale(1.05);
}
.mosaic-main {
  grid-row: 1 / span 2;
}

/* Layout */
.package-detail-layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 4rem;
}

/* Left Column */
.detail-section {
  margin-bottom: 4rem;
}
.detail-section h2 {
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
  color: var(--ink);
}
.desc-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text);
  max-width: 65ch;
}

/* Accordion */
.itinerary-accordion {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 2rem;
}
.itinerary-day {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}
.day-label {
  background: var(--brand);
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  flex-shrink: 0;
  margin-top: 0.3rem;
}
.day-content-wrapper h3 {
  font-size: 1.3rem;
  color: var(--ink);
  font-weight: 700;
  margin: 0 0 0.75rem 0;
}
.day-content-wrapper p {
  color: var(--text);
  line-height: 1.7;
  margin: 0;
  max-width: 60ch;
}

/* Inclusions & Exclusions */
.inc-exc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.inc-card, .exc-card {
  background: var(--surface);
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid var(--line);
  box-shadow: 0 4px 30px rgba(0,0,0,0.03);
}
.inc-card h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--brand);
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
}
.exc-card h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--ink);
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
}
.inc-card ul, .exc-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.inc-card li, .exc-card li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 1.05rem;
  color: var(--text);
}
.inc-card li svg {
  color: var(--brand);
  flex-shrink: 0;
  margin-top: 0.15rem;
}
.exc-card li svg {
  color: var(--muted);
  flex-shrink: 0;
  margin-top: 0.15rem;
}

/* Right Column Sticky Booking Widget */
.package-booking-sidebar {
  position: relative;
}
.sticky-booking-card {
  position: sticky;
  top: 120px;
  background: var(--surface);
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  overflow: hidden;
  padding: 2.5rem;
}

.price-header {
  margin-bottom: 2rem;
}
.price {
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.04em;
}
.unit {
  color: var(--text);
  font-size: 1.1rem;
  font-weight: 500;
}
.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.booking-form label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.booking-form input,
.booking-form select {
  padding: 1rem 1.2rem;
  border: none;
  border-radius: 8px;
  background: #f8fafc;
  font-family: inherit;
  font-size: 1rem;
  color: var(--ink);
  transition: box-shadow 0.2s var(--ease-out);
  width: 100%;
}
.booking-form input:focus,
.booking-form select:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--sun);
}
.booking-form .submit-btn {
  width: 100%;
  justify-content: center;
  padding: 1.2rem;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  background: var(--sun);
  color: var(--ink);
  border-radius: 8px; /* Based on user feedback in image 2 they might prefer 8px for this specific card button, let's keep it pill using 999px to strictly match the brand */
  border-radius: 999px; 
}
.booking-form .submit-btn:hover {
  background: var(--accent);
}

/* Media Queries for Package Detail */
@media (max-width: 1024px) {
  .package-detail-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .sticky-booking-card {
    position: static;
  }
}
@media (max-width: 760px) {
  .package-title-row h1 {
    font-size: 2.2rem;
  }
  .package-mosaic-gallery {
    grid-template-columns: 1fr;
    grid-template-rows: 350px;
    gap: 0;
  }
  .mosaic-item {
    border-radius: 0;
    margin-left: -1rem;
    margin-right: -1rem;
    width: calc(100% + 2rem);
  }
  .mosaic-item:not(.mosaic-main) {
    display: none;
  }
  .mosaic-main {
    grid-row: 1;
  }
  .inc-exc-grid {
    grid-template-columns: 1fr;
  }
}
"""
    with open("styles.css", "w") as f:
        f.write(original_css + new_css)
    print("CSS replaced successfully.")
else:
    print("Could not find start marker.")
