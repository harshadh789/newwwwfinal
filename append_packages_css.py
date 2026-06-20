import re

css = """
/* ==========================================================================
   PACKAGES LISTING PAGE (IMAGE 3 DESIGN)
   ========================================================================== */

.packages-listing-page {
  background-color: #f0f4f8; /* Soft blue-gray background visible in the right side of image 3 */
  padding-bottom: 6rem;
}

/* Immersive Hero */
.packages-hero {
  position: relative;
  min-height: 480px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}
.packages-hero-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.hero-text {
  max-width: 500px;
  color: #fff;
}
.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 0.5rem;
  color: #fff;
  line-height: 1.1;
}
.hero-text p {
  font-size: 1.25rem;
  font-weight: 500;
  opacity: 0.9;
}

/* Floating Hit Pick Card */
.hit-pick-card {
  width: 420px;
  background: #000; /* Dark card background */
  border-radius: 16px;
  position: relative;
  margin-top: 2rem;
  color: #fff;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}
.hit-pick-badge {
  position: absolute;
  top: -16px;
  left: 20px;
  background: #2dd4bf; /* Neon green/teal */
  color: #000;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.hit-pick-badge::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 0;
  height: 0;
  border-top: 8px solid #14b8a6;
  border-right: 8px solid transparent;
}
.hit-pick-content {
  padding: 2.5rem 2rem 2rem;
}
.hit-pick-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #fff;
  line-height: 1.3;
}
.hit-pick-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.hit-pick-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.8);
}
.hit-pick-features li svg {
  color: #2dd4bf; /* Green check */
}
.hit-pick-footer {
  border-top: 1px solid rgba(255,255,255,0.2);
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hit-pick-price {
  display: flex;
  flex-direction: column;
}
.hit-pick-price .price {
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.hit-pick-price .unit {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
}
.view-detail-btn {
  background: #2dd4bf;
  color: #000;
  padding: 0.8rem 1.5rem;
  font-size: 0.95rem;
  border-radius: 8px; /* Slightly squared button as in screenshot */
}
.view-detail-btn:hover {
  background: #14b8a6;
}

/* Trust Bar */
.trust-bar {
  background: #0f172a; /* Dark blue/slate */
  padding: 1.5rem 0;
  color: #fff;
}
.trust-bar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}
.trust-stat {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.trust-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.1rem;
}
.fb-icon {
  background: #1877f2;
  color: #fff;
}
.google-icon {
  background: #fff;
  color: #ea4335;
}
.trophy-icon {
  background: none;
  font-size: 1.8rem;
}
.trust-text {
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.7);
}
.trust-text strong {
  font-size: 1.1rem;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.trust-text strong svg {
  color: var(--sun);
}
.trust-review {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 380px;
}
.reviewer-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
.trust-review .trust-text {
  font-size: 0.85rem;
  line-height: 1.4;
  color: rgba(255,255,255,0.9);
}

/* Main Listing Layout */
.packages-main-section {
  padding-top: 3rem;
}
.layout-with-sidebar {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2rem;
}

/* Sidebar Filters */
.filters-sidebar {
  background: var(--surface);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--line);
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  align-self: start;
}
.filter-group h4 {
  font-size: 0.85rem;
  color: var(--brand);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
  font-weight: 700;
}
.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: var(--ink);
}
.filter-checkbox:last-child {
  margin-bottom: 0;
}
.filter-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  cursor: pointer;
  accent-color: var(--brand);
}

/* Toolbar & Grid */
.packages-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.sort-dropdown {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.sort-dropdown span {
  font-size: 0.95rem;
  color: var(--muted);
}
.sort-dropdown select {
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background-color: var(--surface);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--ink);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px;
}

/* Responsive */
@media (max-width: 1024px) {
  .layout-with-sidebar {
    grid-template-columns: 1fr;
  }
  .filters-sidebar {
    display: none; /* Can be turned into an off-canvas menu for mobile */
  }
  .packages-hero-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
  .hit-pick-card {
    width: 100%;
  }
}
"""

with open("styles.css", "a") as f:
    f.write(css)

print("styles.css appended")
