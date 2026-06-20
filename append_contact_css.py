import os

css_content = """
/* ==========================================================================
   CONTACT PAGE REBUILD
   ========================================================================== */

/* Hero */
.contact-hero {
  padding-top: 10rem;
  padding-bottom: 6rem;
  background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(240,244,248,0.5) 100%);
  border-bottom: 1px solid var(--line);
}
.contact-hero h1 {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
}
.contact-hero .hero-subtitle {
  font-size: 1.25rem;
  color: var(--muted);
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}
.contact-hero .hero-ctas {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

/* Contact Cards */
.contact-cards-section {
  margin-top: -3rem;
  position: relative;
  z-index: 10;
}
.contact-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.contact-card {
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 12px 30px rgba(0,0,0,0.06);
  text-align: center;
  border: 1px solid var(--line);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}
.contact-card .cc-icon {
  width: 60px;
  height: 60px;
  background-color: rgba(13, 169, 155, 0.1);
  color: var(--brand);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}
.contact-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.contact-card .cc-detail {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.contact-card .cc-detail a {
  color: var(--ink);
  text-decoration: none;
}
.contact-card .cc-sub {
  font-size: 0.9rem;
  color: var(--muted);
}
.contact-card .text-link {
  color: var(--brand);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
}

/* Inquiry Layout */
.inquiry-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 3rem;
  align-items: start;
}
.premium-form-wrapper {
  padding: 3rem;
}
.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.form-row-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
}
.premium-form .form-group {
  margin-bottom: 1.5rem;
}
.premium-form label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.premium-form input,
.premium-form select,
.premium-form textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid var(--line);
  border-radius: 12px;
  font-family: inherit;
  font-size: 1rem;
  color: var(--ink);
  background-color: #f9fafb;
  transition: all 0.2s ease;
}
.premium-form input:focus,
.premium-form select:focus,
.premium-form textarea:focus {
  outline: none;
  border-color: var(--brand);
  background-color: #fff;
  box-shadow: 0 0 0 4px rgba(13, 169, 155, 0.1);
}
.premium-form textarea {
  resize: vertical;
}
.form-assurance {
  font-size: 0.85rem;
  color: var(--muted);
  text-align: center;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

/* Sidebar Components */
.quick-planner-card {
  padding: 2rem;
  margin-bottom: 2rem;
}
.quick-planner-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
.emergency-support-card {
  background: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
}
.emergency-support-card .em-icon {
  width: 48px;
  height: 48px;
  background: #fed7d7;
  color: #e53e3e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}
.emergency-support-card h4 {
  color: #c53030;
  margin-bottom: 0.5rem;
}
.emergency-support-card p {
  font-size: 0.9rem;
  color: #742a2a;
  margin-bottom: 1rem;
}
.emergency-support-card .em-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  color: #e53e3e;
  text-decoration: none;
  margin-bottom: 1rem;
}
.emergency-support-card .em-badge {
  display: inline-block;
  background: #e53e3e;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Trust Grid */
.trust-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}
.trust-card {
  background: #fff;
  border: 1px solid var(--line);
  padding: 2rem;
  border-radius: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.trust-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}
.trust-card .trust-icon {
  color: var(--brand);
  margin-bottom: 1rem;
}
.trust-card h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.trust-card p {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.6;
}

/* Office & Map */
.office-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.office-location-card {
  background: #fff;
  border: 1px solid var(--line);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}
.office-location-card h5 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--brand);
}
.office-location-card p {
  color: var(--ink);
  line-height: 1.6;
}
.map-placeholder {
  background: #e2e8f0;
  border-radius: 16px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #cbd5e1;
}

/* FAQ Accordion */
.faq-container {
  max-width: 800px;
}
.faq-item {
  border-bottom: 1px solid var(--line);
}
.faq-question {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ink);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.faq-question:hover {
  color: var(--brand);
}
.faq-icon {
  color: var(--muted);
  transition: transform 0.3s ease;
}
.faq-item.active .faq-icon {
  transform: rotate(180deg);
}
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.faq-item.active .faq-answer {
  max-height: 500px;
}
.faq-answer p {
  padding-bottom: 1.5rem;
  color: var(--muted);
  line-height: 1.6;
}

/* Social Cards */
.social-cards {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}
.social-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 99px;
  text-decoration: none;
  color: var(--ink);
  font-weight: 600;
  transition: all 0.2s ease;
}
.social-card:hover {
  background: var(--surface);
  border-color: var(--brand);
  color: var(--brand);
  transform: translateY(-2px);
}

/* CTA Section */
.cta-section {
  background: var(--brand);
  padding: 6rem 0;
  color: white;
}
.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.cta-section p {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* Responsive Overrides */
@media (max-width: 992px) {
  .inquiry-layout, .office-layout {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
  .form-row-2, .form-row-3 {
    grid-template-columns: 1fr;
  }
  .contact-hero h1 {
    font-size: 2.5rem;
  }
  .premium-form-wrapper {
    padding: 2rem;
  }
}
"""

with open("/Users/campfly/Downloads/campfly-landing-page-main/styles.css", "a") as f:
    f.write(css_content)

print("CSS appended to styles.css successfully.")
