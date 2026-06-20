import re

with open('styles.css', 'r') as f:
    css = f.read()

new_styles = """
/* --- UI Audited Styles --- */
.intent-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.2rem;
}
.intent-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 1rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.intent-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-soft);
  border-color: var(--brand);
}
.intent-card svg {
  color: var(--brand);
  margin-bottom: 1.2rem;
}
.intent-card h3 {
  margin: 0;
  color: var(--ink);
  font-size: 1.1rem;
}
.intent-card p {
  margin: 0.4rem 0 0;
  color: var(--muted);
  font-size: 0.9rem;
}

.trust-section {
  background: var(--surface-warm);
}
.trust-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  text-align: center;
}
.trust-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
}
.trust-card svg {
  color: var(--accent);
  margin-bottom: 1.2rem;
}
.trust-card h4 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--ink);
}
.trust-card p {
  margin: 0.5rem 0 0;
  color: var(--muted);
  font-size: 0.95rem;
}

/* Reviews Styles */
.review-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  border: 1px solid var(--line);
}
.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.review-author-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.review-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--brand);
  color: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}
.review-author {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--ink);
  font-weight: 600;
  font-size: 0.95rem;
}
.review-tag {
  font-size: 0.75rem;
  background: var(--surface-warm);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  color: var(--muted);
  margin-left: 0.5rem;
  font-weight: normal;
}
.review-date {
  font-size: 0.8rem;
  color: var(--muted);
}
.review-stars {
  display: flex;
  gap: 0.2rem;
}
.review-card h4 {
  margin-top: 1rem;
  margin-bottom: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--ink);
}
.review-card > p {
  margin-top: 0.5rem;
  margin-bottom: 0;
  color: var(--text);
  font-size: 0.95rem;
  line-height: 1.5;
}
.review-photos {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  overflow-x: auto;
}
.review-photos img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}
/* --- End UI Audited Styles --- */

"""

# Insert new styles before the first @media query
css = css.replace('@media (max-width: 1080px)', new_styles + '@media (max-width: 1080px)')

# Update the media queries to include intent-grid and trust-grid
# 1080px media query
css = css.replace(
    '.planner-form,\n  .cards-3,\n  .themes-grid,\n  .split-layout,\n  .stats-grid,\n  .reviews-grid,\n  .footer-grid {',
    '.planner-form,\n  .cards-3,\n  .themes-grid,\n  .split-layout,\n  .stats-grid,\n  .reviews-grid,\n  .intent-grid,\n  .trust-grid,\n  .footer-grid {'
)

# 760px media query
css = css.replace(
    '.planner-form,\n  .cards-3,\n  .themes-grid,\n  .split-layout,\n  .stats-grid,\n  .reviews-grid,\n  .footer-grid {\n    grid-template-columns: 1fr;\n  }',
    '.planner-form,\n  .cards-3,\n  .themes-grid,\n  .split-layout,\n  .stats-grid,\n  .reviews-grid,\n  .intent-grid,\n  .trust-grid,\n  .footer-grid {\n    grid-template-columns: 1fr;\n  }'
)

with open('styles.css', 'w') as f:
    f.write(css)

print("CSS updated successfully!")
