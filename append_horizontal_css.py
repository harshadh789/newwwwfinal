css = """
/* ==========================================================================
   HORIZONTAL PACKAGE CARDS (LISTING PAGE UI REBUILD)
   ========================================================================== */

/* Make the sidebar sticky */
.filters-sidebar {
  position: sticky;
  top: 100px; /* offset from sticky header */
}

/* Redefine grid for horizontal cards */
.packages-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Horizontal Card UI */
.horizontal-package-card {
  display: flex;
  background: var(--surface);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  transition: all 0.3s var(--ease-out);
  border: 1px solid var(--line);
  text-decoration: none;
  color: inherit;
  position: relative;
}

.horizontal-package-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  border-color: rgba(0,0,0,0.1);
}

/* Left Image Area */
.hpc-image {
  flex: 0 0 320px;
  position: relative;
}
.hpc-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hpc-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--sun);
  color: var(--ink);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
}

/* Middle Content Area */
.hpc-content {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border-right: 1px dashed var(--line);
}
.hpc-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--brand);
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.hpc-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 1rem;
  line-height: 1.2;
}
.hpc-inclusions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: auto;
}
.hpc-inclusion-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--muted);
  background: var(--bg);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
}
.hpc-inclusion-item svg {
  color: var(--brand);
}

/* Right Pricing Area */
.hpc-pricing {
  flex: 0 0 240px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fafbfc;
}
.hpc-rating {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--brand);
  color: #fff;
  align-self: flex-start;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: auto;
}
.hpc-rating span {
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.9;
}
.price-block {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.strike-price {
  font-size: 0.9rem;
  color: var(--muted);
  text-decoration: line-through;
  display: block;
  margin-bottom: 0.2rem;
}
.final-price {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.02em;
  display: block;
}
.price-unit {
  font-size: 0.8rem;
  color: var(--muted);
}
.hpc-pricing .action-btn {
  width: 100%;
  text-align: center;
  justify-content: center;
  padding: 0.8rem;
  border-radius: 8px;
}

/* Responsive */
@media (max-width: 900px) {
  .horizontal-package-card {
    flex-direction: column;
  }
  .hpc-image {
    flex: none;
    height: 240px;
  }
  .hpc-content {
    border-right: none;
    border-bottom: 1px dashed var(--line);
  }
  .hpc-pricing {
    flex: none;
    background: transparent;
    padding-top: 1rem;
  }
  .hpc-rating {
    margin-bottom: 1rem;
  }
}
"""
with open("styles.css", "a") as f:
    f.write(css)

print("styles.css appended horizontally")
