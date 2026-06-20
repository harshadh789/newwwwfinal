css_to_append = """
/* ==========================================================================
   PACKAGE DETAIL PAGE REBUILD
   ========================================================================== */
.package-detail-page {
  padding-top: 2rem;
  padding-bottom: 6rem;
  background: var(--bg);
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--muted);
  margin-bottom: 2rem;
}
.breadcrumb a {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumb a:hover {
  color: var(--brand);
}
.breadcrumb span {
  color: var(--ink);
  font-weight: 500;
}

/* Title Area */
.package-header-info {
  margin-bottom: 2rem;
}
.package-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 1rem;
}
.package-title-row h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--ink);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0;
}
.rating-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: var(--surface);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  font-weight: 600;
  color: var(--ink);
  flex-shrink: 0;
}
.rating-badge svg {
  width: 16px;
  height: 16px;
  fill: #FFB400; /* gold star */
}
.rating-count {
  font-size: 0.8rem;
  color: var(--muted);
  font-weight: 400;
  margin-left: 0.25rem;
}

.quick-glance {
  display: flex;
  gap: 1.5rem;
  color: var(--ink);
  font-weight: 500;
  font-size: 1rem;
  align-items: center;
}
.quick-glance-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.quick-glance-item svg {
  color: var(--brand);
}

/* Mosaic Gallery */
.package-mosaic-gallery {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 250px 250px;
  gap: 1rem;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 4rem;
}
.mosaic-item {
  position: relative;
  overflow: hidden;
  background: #edf2f7;
  cursor: pointer;
}
.mosaic-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s var(--ease-out);
}
.mosaic-item:hover img {
  transform: scale(1.05);
}
.mosaic-main {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}
@media (max-width: 992px) {
  .package-mosaic-gallery {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 200px 200px;
  }
  .mosaic-main {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }
}
@media (max-width: 576px) {
  .package-mosaic-gallery {
    grid-template-columns: 1fr;
    grid-template-rows: 300px;
  }
  .mosaic-item:not(.mosaic-main) {
    display: none;
  }
  .mosaic-main {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
}

/* Layout */
.package-detail-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 4rem;
  align-items: start;
}
@media (max-width: 1024px) {
  .package-detail-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

/* Left Column Content */
.detail-section {
  margin-bottom: 3.5rem;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid var(--line);
}
.detail-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}
.detail-section h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 1.5rem;
}
.desc-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--muted);
}

/* Package Highlights Grid */
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}
.highlight-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--surface);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--line);
}
.highlight-card svg {
  color: var(--brand);
}
.highlight-card span {
  font-weight: 600;
  color: var(--ink);
  font-size: 0.95rem;
}

/* Itinerary Timeline */
.itinerary-accordion {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.itinerary-day {
  display: flex;
  gap: 1.5rem;
  position: relative;
}
.itinerary-day::before {
  content: '';
  position: absolute;
  top: 56px;
  bottom: -1.5rem;
  left: 28px;
  width: 2px;
  background: var(--line);
  z-index: 0;
}
.itinerary-day:last-child::before {
  display: none;
}
.day-label {
  width: 56px;
  height: 56px;
  background: var(--brand-light);
  color: var(--brand);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  flex-shrink: 0;
  z-index: 1;
  border: 4px solid var(--bg);
}
.day-label span {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: -4px;
}
.day-content-wrapper {
  background: var(--surface);
  border: 1px solid var(--line);
  padding: 1.5rem;
  border-radius: 16px;
  flex: 1;
}
.day-content-wrapper h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--ink);
}
.day-content-wrapper p {
  color: var(--muted);
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
}

/* Inclusions / Exclusions */
.inc-exc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
@media (max-width: 768px) {
  .inc-exc-grid {
    grid-template-columns: 1fr;
  }
}
.inc-card, .exc-card {
  background: var(--surface);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--line);
}
.inc-card h4, .exc-card h4 {
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.inc-card h4 { color: #10B981; }
.exc-card h4 { color: #EF4444; }
.inc-card ul, .exc-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.inc-card ul li, .exc-card ul li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: var(--muted);
  line-height: 1.5;
}
.inc-card ul li svg { color: #10B981; flex-shrink: 0; margin-top: 2px;}
.exc-card ul li svg { color: #EF4444; flex-shrink: 0; margin-top: 2px;}
.inc-card ul li span, .exc-card ul li span {
  flex: 1;
}

/* Sticky Booking Widget */
.package-booking-sidebar {
  position: sticky;
  top: 100px; /* Below sticky header */
}
.sticky-booking-card {
  background: var(--surface);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  border: 1px solid var(--line);
}
.price-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--line);
}
.price-strike {
  display: block;
  font-size: 1rem;
  color: var(--muted);
  text-decoration: line-through;
  margin-bottom: 0.25rem;
}
.price {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.03em;
}
.price-unit {
  font-size: 1rem;
  color: var(--muted);
  font-weight: 500;
}
.booking-form .form-row {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}
.booking-form label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--ink);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.booking-form input, .booking-form select {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--line);
  border-radius: 12px;
  font-family: inherit;
  font-size: 1rem;
  background: #fff;
  color: var(--ink);
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.booking-form input:focus, .booking-form select:focus {
  border-color: var(--brand);
}
.submit-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: 12px;
  justify-content: center;
}
.booking-trust {
  text-align: center;
  margin-top: 1.25rem;
}
.booking-trust p {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  color: var(--muted);
  font-weight: 500;
}

/* Similar Tours */
.similar-tours-section {
  padding: 6rem 0;
  background: var(--surface);
  border-top: 1px solid var(--line);
}
.similar-tours-section h2 {
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--ink);
}

@media (max-width: 1024px) {
  .package-booking-sidebar {
    position: static;
  }
}
"""

with open("/Users/campfly/Downloads/campfly-landing-page-main/styles.css", "a") as f:
    f.write(css_to_append)

print("CSS Appended")
