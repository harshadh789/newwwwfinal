import re

css_to_append = """
/* ==========================================================================
   ABOUT US - BRAND STORYTELLING PAGE
   ========================================================================== */
.about-page {
  background: var(--bg);
  padding-bottom: 0;
}

/* 1. Cinematic Hero */
.about-hero {
  padding: 8rem 1rem 6rem;
  background: linear-gradient(to bottom, rgba(240, 248, 247, 1) 0%, rgba(255, 255, 255, 0) 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.about-hero::before {
  content: '';
  position: absolute;
  top: -50%; left: 50%;
  transform: translateX(-50%);
  width: 1000px; height: 1000px;
  background: radial-gradient(circle, var(--brand-light) 0%, transparent 60%);
  z-index: 0;
  opacity: 0.5;
}
.about-hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}
.about-hero-content h1 {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}
.about-hero-content p {
  font-size: 1.2rem;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 2.5rem;
}
.about-hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

/* Common Section Styles */
.about-section {
  padding: 6rem 0;
}
.about-section-header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
.about-section-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}
.about-section-header p {
  font-size: 1.15rem;
  color: var(--muted);
  line-height: 1.6;
}

/* 2. Our Story (Editorial) */
.story-editorial {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.story-images {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.story-img-main {
  grid-column: 1 / 3;
  border-radius: 20px;
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.story-img-sub {
  border-radius: 16px;
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.story-content h3 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 1.5rem;
}
.story-content p {
  font-size: 1.1rem;
  color: var(--muted);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}
@media (max-width: 992px) {
  .story-editorial { grid-template-columns: 1fr; }
}

/* 3. Mission & Vision */
.mission-vision-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.mv-card {
  background: var(--surface);
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid var(--line);
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  position: relative;
  overflow: hidden;
}
.mv-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 6px;
  background: linear-gradient(90deg, var(--brand), var(--brand-light));
}
.mv-icon {
  width: 60px; height: 60px;
  background: var(--brand-light);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--brand);
}
.mv-card h3 {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 1rem;
}
.mv-card p {
  font-size: 1.1rem;
  color: var(--muted);
  line-height: 1.6;
}
@media (max-width: 768px) {
  .mission-vision-grid { grid-template-columns: 1fr; }
}

/* 4. Why Travelers Choose Campfly */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
.pillar-card {
  background: var(--bg);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid var(--line);
  transition: transform 0.2s, box-shadow 0.2s;
}
.pillar-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.05);
  border-color: var(--brand-light);
}
.pillar-icon {
  color: var(--brand);
  margin-bottom: 1.25rem;
}
.pillar-card h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 0.75rem;
}
.pillar-card p {
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* 5. By The Numbers (Stats Bar) */
.about-stats {
  background: var(--brand-dark);
  padding: 5rem 0;
  color: #fff;
}
.stats-bar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: center;
}
.stat-item h3 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #fff;
  line-height: 1;
}
.stat-item p {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--accent);
}
@media (max-width: 768px) {
  .stats-bar-grid { grid-template-columns: 1fr 1fr; gap: 3rem 2rem; }
}

/* 6. Travel Philosophy */
.philosophy-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 6rem;
}
.philosophy-block:last-child { margin-bottom: 0; }
.philosophy-block.inverted .pb-content { order: 2; }
.philosophy-block.inverted .pb-image { order: 1; }
.pb-image img {
  width: 100%;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}
.pb-content h3 {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 1.5rem;
}
.pb-content p {
  font-size: 1.1rem;
  color: var(--muted);
  line-height: 1.7;
}
@media (max-width: 992px) {
  .philosophy-block, .philosophy-block.inverted { grid-template-columns: 1fr; }
  .philosophy-block.inverted .pb-content, .philosophy-block.inverted .pb-image { order: unset; }
}

/* 7. How Campfly Works (Timeline) */
.process-timeline {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  position: relative;
}
.process-step {
  text-align: center;
  position: relative;
  z-index: 1;
}
.step-number {
  width: 60px; height: 60px;
  background: var(--brand);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 20px rgba(13, 169, 155, 0.3);
}
.process-step h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 0.75rem;
}
.process-step p {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.5;
}
@media (min-width: 993px) {
  .process-timeline::before {
    content: '';
    position: absolute;
    top: 30px;
    left: 12.5%;
    right: 12.5%;
    height: 2px;
    background: var(--line);
    z-index: 0;
  }
}
@media (max-width: 992px) {
  .process-timeline { grid-template-columns: 1fr; gap: 3rem; }
}

/* 9. Traveler Testimonials */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.testimonial-card {
  background: var(--surface);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  border: 1px solid var(--line);
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
}
.t-rating {
  color: #FFB400;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 0.25rem;
}
.t-quote {
  font-size: 1.1rem;
  color: var(--ink);
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 2rem;
}
.t-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.t-avatar {
  width: 50px; height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.t-author-info h5 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 0.2rem;
}
.t-author-info span {
  font-size: 0.85rem;
  color: var(--muted);
}

/* 10. The Team / Experts */
.experts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
.expert-card {
  text-align: center;
}
.expert-img {
  width: 100%;
  height: 300px;
  border-radius: 20px;
  object-fit: cover;
  margin-bottom: 1.5rem;
  background: var(--line);
}
.expert-card h4 {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 0.2rem;
}
.expert-card p {
  font-size: 1rem;
  color: var(--brand);
  font-weight: 500;
}

/* 11. Final CTA */
.about-final-cta {
  background: var(--brand);
  padding: 6rem 1rem;
  text-align: center;
  color: #fff;
}
.about-final-cta h2 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}
.about-final-cta p {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}
.about-cta-btns {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.btn-white {
  background: #fff;
  color: var(--brand-dark);
  padding: 1rem 2rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s;
}
.btn-white:hover { transform: scale(1.05); }
.btn-outline-white {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  padding: 1rem 2rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.btn-outline-white:hover {
  background: #fff;
  color: var(--brand-dark);
}
"""

html_header = """
    <div class="offer-strip" aria-label="Latest offer">
      <div class="offer-track">
        <span>Onam Offer • Up to 30% off on honeymoon packages</span>
        <span>Weekend Escapes • Free airport transfer on selected tours</span>
        <span>Family Plans • Kids stay free on curated destinations</span>
      </div>
    </div>

    <header class="site-header">
      <div class="container nav-shell">
        <a href="index.html" class="logo" aria-label="Campfly Home">
          <img src="assets/logo-cropped.png" alt="Campfly" class="brand-logo-img" height="32" style="width: auto; display: block;" />
        </a>

        <nav class="main-nav" aria-label="Primary navigation">
          <a href="packages.html?type=domestic">Domestic Tours</a>
          
          <div class="nav-dropdown-wrapper">
            <a href="destinations.html" class="has-dropdown">Explore Destinations <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="chevron"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
            
            <div class="mega-menu style-mega-menu">
              <div class="mega-menu-inner">
                <div class="mega-col style-grid">
                  <a href="destinations.html" class="style-item">
                    <span class="style-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></span>
                    <div>
                      <h5>Popular Destinations</h5>
                      <p>Top locations loved by travellers</p>
                    </div>
                  </a>
                  <a href="destinations.html" class="style-item">
                    <span class="style-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg></span>
                    <div>
                      <h5>Trending Regions</h5>
                      <p>The best regions to explore right now</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <a href="packages.html?type=international">International Tours</a>
        </nav>

        <label class="search-box" aria-label="Search destinations">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input id="site-search" type="search" placeholder="Search destinations" />
        </label>

        <div class="header-actions">
          <button class="ghost" data-currency-button type="button" aria-label="Prices are shown in Indian rupees">INR</button>
          <a class="solid action-link" href="contact.html">Plan trip</a>
          <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="hamburger-icon"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="close-icon" style="display:none;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </header>
"""

html_main = """
    <main class="about-page">
      
      <!-- 1. Cinematic Hero -->
      <section class="about-hero">
        <div class="container about-hero-content">
          <h1>Travel Better. Travel Smarter.<br/>Travel with Campfly.</h1>
          <p>We create carefully curated travel experiences designed around comfort, authenticity, and unforgettable memories. Say goodbye to stressful planning and hello to extraordinary destinations.</p>
          <div class="about-hero-actions">
            <a href="packages.html" class="solid">Explore Tours</a>
            <a href="contact.html" class="ghost" style="border: 1px solid var(--line); background: var(--surface);">Plan My Trip</a>
          </div>
        </div>
      </section>

      <!-- 2. Our Story -->
      <section class="about-section">
        <div class="container">
          <div class="story-editorial">
            <div class="story-content">
              <h3>Our Story</h3>
              <p>Campfly was born from a simple realization: planning a high-quality, stress-free holiday had become exhausting. Travelers were overwhelmed by endless choices, hidden fees, and generic mass-market itineraries that felt disconnected from the true spirit of travel.</p>
              <p>We created Campfly to solve this problem. Our founders, a team of passionate globetrotters, wanted to build a platform that focused entirely on <strong>quality over quantity</strong>. We don't just aggregate tours; we curate them. Every destination, hotel, and local guide is handpicked to ensure your journey is authentic, comfortable, and truly unforgettable.</p>
            </div>
            <div class="story-images">
              <img loading="lazy" src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=800&q=80" alt="Travelers exploring mountains" class="story-img-main" />
              <img loading="lazy" src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=400&q=80" alt="Friends road trip" class="story-img-sub" />
              <img loading="lazy" src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80" alt="Scenic lake view" class="story-img-sub" />
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Mission & Vision -->
      <section class="about-section" style="background: var(--surface); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);">
        <div class="container">
          <div class="mission-vision-grid">
            <div class="mv-card">
              <div class="mv-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
              </div>
              <h3>Our Mission</h3>
              <p>To help travelers discover extraordinary destinations through carefully curated, transparent, and completely stress-free travel experiences.</p>
            </div>
            <div class="mv-card">
              <div class="mv-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><line x1="2" y1="12" x2="22" y2="12"></line></svg>
              </div>
              <h3>Our Vision</h3>
              <p>To become the most trusted and beloved travel planning platform for modern travelers who value authenticity, comfort, and local expertise.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Why Travelers Choose Campfly -->
      <section class="about-section">
        <div class="container">
          <div class="about-section-header">
            <h2>Why Travelers Choose Campfly</h2>
            <p>We believe every holiday should be exceptional. Here is how we guarantee it.</p>
          </div>
          <div class="pillars-grid">
            <div class="pillar-card">
              <svg class="pillar-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <h4>Handpicked Experiences</h4>
              <p>No generic mass tours. Every itinerary is crafted for quality, comfort, and authenticity.</p>
            </div>
            <div class="pillar-card">
              <svg class="pillar-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <h4>Verified Travel Partners</h4>
              <p>We rigorously vet every local guide, driver, and hotel so you only travel with the best.</p>
            </div>
            <div class="pillar-card">
              <svg class="pillar-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              <h4>Transparent Pricing</h4>
              <p>No hidden fees or surprise charges. What you see is exactly what you pay.</p>
            </div>
            <div class="pillar-card">
              <svg class="pillar-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <h4>Local Expertise</h4>
              <p>Experience destinations like an insider with our deep local knowledge and connections.</p>
            </div>
            <div class="pillar-card">
              <svg class="pillar-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <h4>Personalized Support</h4>
              <p>Every traveler gets a dedicated expert to customize the journey to their exact preferences.</p>
            </div>
            <div class="pillar-card">
              <svg class="pillar-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <h4>Secure Booking</h4>
              <p>Bank-grade encryption and flexible cancellation policies give you complete peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. By The Numbers -->
      <section class="about-stats">
        <div class="container">
          <div class="stats-bar-grid">
            <div class="stat-item">
              <h3>22,000+</h3>
              <p>Happy Travelers</p>
            </div>
            <div class="stat-item">
              <h3>650+</h3>
              <p>Verified Travel Partners</p>
            </div>
            <div class="stat-item">
              <h3>65+</h3>
              <p>Global Destinations</p>
            </div>
            <div class="stat-item">
              <h3>4.8/5</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. Our Travel Philosophy -->
      <section class="about-section">
        <div class="container">
          <div class="about-section-header">
            <h2>Our Travel Philosophy</h2>
            <p>How we design the perfect Campfly experience.</p>
          </div>

          <div class="philosophy-block">
            <div class="pb-image">
              <img loading="lazy" src="https://images.unsplash.com/photo-1542314831-c6a4d27d66f6?auto=format&fit=crop&w=800&q=80" alt="Quality over quantity" />
            </div>
            <div class="pb-content">
              <h3>Quality Over Quantity</h3>
              <p>We refuse to offer thousands of generic tours just to look big. Instead, we spend our time heavily researching, reviewing, and perfecting a select number of incredible itineraries. If a hotel or experience doesn't meet our strict standards, it simply doesn't make the cut.</p>
            </div>
          </div>

          <div class="philosophy-block inverted">
            <div class="pb-image">
              <img loading="lazy" src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=800&q=80" alt="Authentic connections" />
            </div>
            <div class="pb-content">
              <h3>Authentic Local Connections</h3>
              <p>To truly understand a destination, you must experience it through the eyes of the locals. We partner directly with on-the-ground experts who introduce you to hidden gems, authentic cuisines, and cultural experiences that you won't find in a standard guidebook.</p>
            </div>
          </div>

          <div class="philosophy-block">
            <div class="pb-image">
              <img loading="lazy" src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" alt="Responsible travel" />
            </div>
            <div class="pb-content">
              <h3>Comfort Without Compromise</h3>
              <p>Adventure shouldn't mean sacrificing comfort. We believe in providing seamless transfers, highly-rated accommodations, and 24/7 on-trip assistance so you can focus entirely on enjoying your holiday while we handle the logistics in the background.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. How Campfly Works -->
      <section class="about-section" style="background: var(--surface); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);">
        <div class="container">
          <div class="about-section-header">
            <h2>How Campfly Works</h2>
            <p>Your journey from dreaming to departing, simplified in 4 easy steps.</p>
          </div>
          <div class="process-timeline">
            <div class="process-step">
              <div class="step-number">1</div>
              <h4>Discover Destinations</h4>
              <p>Browse our curated catalog to find inspiring locations and travel themes.</p>
            </div>
            <div class="process-step">
              <div class="step-number">2</div>
              <h4>Choose Your Package</h4>
              <p>Select an itinerary that matches your style, budget, and desired pace.</p>
            </div>
            <div class="process-step">
              <div class="step-number">3</div>
              <h4>Customize Your Journey</h4>
              <p>Work with our travel experts to tweak the details until it's absolutely perfect.</p>
            </div>
            <div class="process-step">
              <div class="step-number">4</div>
              <h4>Travel With Confidence</h4>
              <p>Pack your bags! We handle the bookings, transfers, and provide 24/7 support.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. Trust & Recognition -->
      <section class="about-section" style="background: #f8fafc;">
        <div class="container">
          <div class="recognition">
            <p class="small" style="text-align: center; font-weight: 600; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2rem;">Recognised & Accredited By</p>
            <div class="logos-track">
              <img src="assets/iata-logo.png" alt="IATA" height="40" />
              <img src="assets/taai-logo.png" alt="TAAI" height="40" />
              <img src="assets/ministry-logo.png" alt="Ministry of Tourism" height="40" />
              <img src="assets/iso-logo.png" alt="ISO" height="40" />
              <img src="assets/toai-logo.png" alt="TOAI" height="40" />
            </div>
          </div>
        </div>
      </section>

      <!-- 9. Traveler Testimonials -->
      <section class="about-section">
        <div class="container">
          <div class="about-section-header">
            <h2>Real Traveler Stories</h2>
            <p>Don't just take our word for it. Hear from those who have travelled with Campfly.</p>
          </div>
          <div class="testimonials-grid">
            <div class="testimonial-card">
              <div class="t-rating">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <p class="t-quote">"The entire trip to Ladakh was planned flawlessly. The hotels were incredible, the driver was courteous, and we didn't have to worry about a single thing. Highly recommend Campfly!"</p>
              <div class="t-author">
                <img loading="lazy" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Sarah J." class="t-avatar" />
                <div class="t-author-info">
                  <h5>Sarah Jenkins</h5>
                  <span>Travelled to Ladakh</span>
                </div>
              </div>
            </div>
            
            <div class="testimonial-card">
              <div class="t-rating">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <p class="t-quote">"Our honeymoon in the Maldives was a dream come true. Campfly's expert team suggested the perfect resort that matched our vibe and budget perfectly. 10/10 experience."</p>
              <div class="t-author">
                <img loading="lazy" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Michael T." class="t-avatar" />
                <div class="t-author-info">
                  <h5>Michael Thompson</h5>
                  <span>Travelled to Maldives</span>
                </div>
              </div>
            </div>

            <div class="testimonial-card">
              <div class="t-rating">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <p class="t-quote">"Finally, a travel company that actually listens to what you want. They customized our family trip to Kerala so that we had the perfect mix of activities for kids and relaxation for adults."</p>
              <div class="t-author">
                <img loading="lazy" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" alt="Priya P." class="t-avatar" />
                <div class="t-author-info">
                  <h5>Priya Patel</h5>
                  <span>Travelled to Kerala</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 10. Meet the Team (Experts) -->
      <section class="about-section" style="background: var(--surface); border-top: 1px solid var(--line);">
        <div class="container">
          <div class="about-section-header">
            <h2>The Experts Behind Every Journey</h2>
            <p>Our dedicated team of destination specialists, itinerary designers, and 24/7 support staff work tirelessly to ensure your travel experience is nothing short of perfection.</p>
          </div>
          <div class="experts-grid">
            <div class="expert-card">
              <img loading="lazy" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" alt="Destination Expert" class="expert-img" />
              <h4>Destination Specialists</h4>
              <p>Curating authentic experiences</p>
            </div>
            <div class="expert-card">
              <img loading="lazy" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" alt="Itinerary Designer" class="expert-img" />
              <h4>Itinerary Designers</h4>
              <p>Crafting the perfect flow</p>
            </div>
            <div class="expert-card">
              <img loading="lazy" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" alt="Support Team" class="expert-img" />
              <h4>24/7 Support Desk</h4>
              <p>Always there when you need us</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 11. Final CTA -->
      <section class="about-final-cta">
        <div class="container">
          <h2>Ready for Your Next Adventure?</h2>
          <p>Join thousands of happy travelers and let Campfly design your perfect holiday.</p>
          <div class="about-cta-btns">
            <a href="packages.html" class="btn-white">Explore Tours</a>
            <a href="contact.html" class="btn-outline-white">Contact Us</a>
          </div>
        </div>
      </section>

    </main>
"""

with open("/Users/campfly/Downloads/campfly-landing-page-main/styles.css", "a") as f:
    f.write(css_to_append)

with open("/Users/campfly/Downloads/campfly-landing-page-main/about.html", "r") as f:
    content = f.read()

# Replace <header class="site-header"> up to </header>
content = re.sub(r'<header class="site-header">.*?</header>', html_header, content, flags=re.DOTALL)

# Replace <main> up to </main>
content = re.sub(r'<main>.*?</main>', html_main, content, flags=re.DOTALL)

# Update CSS version
content = re.sub(r'styles\.css\?v=\d+', 'styles.css?v=14', content)
content = re.sub(r'href="styles\.css"', 'href="styles.css?v=14"', content)

with open("/Users/campfly/Downloads/campfly-landing-page-main/about.html", "w") as f:
    f.write(content)

print("About Us page successfully rewritten!")
