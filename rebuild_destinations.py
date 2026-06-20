import re

css_to_append = """
/* ==========================================================================
   DESTINATIONS HUB PAGE
   ========================================================================== */
.destinations-hub-page {
  background: var(--bg);
  padding-bottom: 0;
}

/* Compact Hero */
.hub-hero {
  padding: 6rem 1rem 5rem;
  background: var(--surface);
  text-align: center;
  border-bottom: 1px solid var(--line);
}
.hub-hero h1 {
  font-size: 3.2rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}
.hub-hero p {
  font-size: 1.15rem;
  color: var(--muted);
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}
.hub-search-wrapper {
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
}
.hub-search-wrapper input {
  width: 100%;
  padding: 1.25rem 1.25rem 1.25rem 3.5rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  font-size: 1.1rem;
  outline: none;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: all 0.2s;
  font-family: inherit;
}
.hub-search-wrapper input:focus {
  border-color: var(--brand);
  box-shadow: 0 10px 40px rgba(13, 169, 155, 0.15);
}
.hub-search-wrapper svg {
  position: absolute;
  left: 1.2rem;
  color: var(--muted);
}

/* Section Common */
.hub-section {
  padding: 5rem 0 0;
}
.hub-section-title {
  text-align: center;
  margin-bottom: 3.5rem;
}
.hub-section-title h2 {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}
.hub-section-title p {
  color: var(--muted);
  font-size: 1.1rem;
}

/* Premium Destination Card */
.dest-premium-card {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--line);
  transition: all 0.3s var(--ease-out);
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}
.dest-premium-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  border-color: rgba(0,0,0,0.1);
}
.dest-img-wrap {
  position: relative;
  height: 240px;
  overflow: hidden;
}
.dest-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}
.dest-premium-card:hover .dest-img-wrap img {
  transform: scale(1.05);
}
.dest-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 2;
}
.dest-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.dest-name {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 0.5rem;
}
.dest-desc {
  font-size: 0.95rem;
  color: var(--muted);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}
.dest-footer {
  margin-top: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-top: 1px solid var(--line);
  padding-top: 1.25rem;
}
.dest-stats span {
  display: block;
}
.dest-price-label {
  font-size: 0.75rem;
  color: var(--muted);
}
.dest-price {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--ink);
}
.dest-explore-btn {
  background: var(--surface);
  color: var(--brand);
  border: 1px solid var(--brand);
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;
}
.dest-premium-card:hover .dest-explore-btn {
  background: var(--brand);
  color: #fff;
}

/* Region Layout */
.region-block {
  margin-bottom: 4rem;
}
.region-block h3 {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}

/* Trending Mini Cards */
.trending-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}
.trending-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--surface);
  padding: 1rem;
  border-radius: 16px;
  border: 1px solid var(--line);
  text-decoration: none;
  transition: all 0.2s;
}
.trending-card:hover {
  border-color: var(--brand);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.04);
}
.trending-img {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}
.trending-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.trending-info h4 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 0.2rem;
}
.trending-info p {
  font-size: 0.8rem;
  color: var(--brand);
  font-weight: 600;
}

/* Theme Collections */
.theme-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
@media (max-width: 992px) {
  .theme-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 576px) {
  .theme-grid {
    grid-template-columns: 1fr;
  }
}
.theme-card {
  position: relative;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
.theme-card img {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
  z-index: 0;
}
.theme-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
  z-index: 1;
  transition: background 0.3s;
}
.theme-card:hover img {
  transform: scale(1.05);
}
.theme-card:hover .theme-overlay {
  background: rgba(0,0,0,0.5);
}
.theme-card h3 {
  position: relative;
  z-index: 2;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

/* Inspiration Section */
.inspiration-section {
  background: var(--brand-dark);
  color: #fff;
  padding: 6rem 0;
  text-align: center;
  margin-top: 5rem;
}
.inspiration-section h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}
.inspiration-section p {
  font-size: 1.15rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}
.inspiration-cta {
  background: var(--accent);
  color: var(--ink);
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.2s;
}
.inspiration-cta:hover {
  transform: scale(1.05);
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
    <main class="destinations-hub-page">
      <!-- Compact Hero Section -->
      <section class="hub-hero">
        <div class="container">
          <h1>Explore Destinations Around the World</h1>
          <p>Discover handpicked experiences across India's most loved destinations and international escapes.</p>
          <div class="hub-search-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="dest-search" placeholder="Search a destination (e.g., Kerala, Dubai)..." />
          </div>
        </div>
      </section>

      <!-- Trending Section -->
      <section class="hub-section">
        <div class="container">
          <div class="hub-section-title">
            <h2>Trending Right Now</h2>
            <p>The most booked destinations this season</p>
          </div>
          <div class="trending-grid">
            <a href="packages.html?dest=bali" class="trending-card">
              <div class="trending-img"><img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=200&q=80" alt="Bali" /></div>
              <div class="trending-info">
                <h4>Bali, Indonesia</h4>
                <p>Trending 🔥</p>
              </div>
            </a>
            <a href="packages.html?dest=ladakh" class="trending-card">
              <div class="trending-img"><img src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=200&q=80" alt="Ladakh" /></div>
              <div class="trending-info">
                <h4>Ladakh, India</h4>
                <p>Popular 🏔️</p>
              </div>
            </a>
            <a href="packages.html?dest=maldives" class="trending-card">
              <div class="trending-img"><img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=200&q=80" alt="Maldives" /></div>
              <div class="trending-info">
                <h4>Maldives</h4>
                <p>High Demand 🏖️</p>
              </div>
            </a>
            <a href="packages.html?dest=kerala" class="trending-card">
              <div class="trending-img"><img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=200&q=80" alt="Kerala" /></div>
              <div class="trending-info">
                <h4>Kerala, India</h4>
                <p>Top Rated 🌿</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- Browse By Region -->
      <section class="hub-section">
        <div class="container">
          <div class="hub-section-title">
            <h2>Browse by Region</h2>
            <p>Find the perfect package in your preferred geographical region</p>
          </div>
          
          <div class="region-block">
            <h3>Incredible India</h3>
            <div class="cards-3">
              <!-- Domestic Cards -->
              <a href="packages.html?dest=kerala" class="dest-premium-card">
                <div class="dest-img-wrap">
                  <span class="dest-badge">Best Season</span>
                  <img loading="lazy" src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80" alt="Kerala" />
                </div>
                <div class="dest-content">
                  <h4 class="dest-name">Kerala</h4>
                  <p class="dest-desc">Lush backwaters, pristine beaches, and rich cultural heritage in God's Own Country.</p>
                  <div class="dest-footer">
                    <div class="dest-stats">
                      <span class="dest-price-label">Over 45 Packages</span>
                      <span class="dest-price">Starts INR 14,500</span>
                    </div>
                    <div class="dest-explore-btn">Explore</div>
                  </div>
                </div>
              </a>

              <a href="packages.html?dest=ladakh" class="dest-premium-card">
                <div class="dest-img-wrap">
                  <img loading="lazy" src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80" alt="Ladakh" />
                </div>
                <div class="dest-content">
                  <h4 class="dest-name">Ladakh</h4>
                  <p class="dest-desc">Rugged mountains, ancient monasteries, and thrilling high-altitude lakes.</p>
                  <div class="dest-footer">
                    <div class="dest-stats">
                      <span class="dest-price-label">15 Packages</span>
                      <span class="dest-price">Starts INR 24,000</span>
                    </div>
                    <div class="dest-explore-btn">Explore</div>
                  </div>
                </div>
              </a>

              <a href="packages.html?dest=kashmir" class="dest-premium-card">
                <div class="dest-img-wrap">
                  <img loading="lazy" src="https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=600&q=80" alt="Kashmir" />
                </div>
                <div class="dest-content">
                  <h4 class="dest-name">Kashmir</h4>
                  <p class="dest-desc">Experience paradise on earth with snow-capped peaks and serene Dal Lake.</p>
                  <div class="dest-footer">
                    <div class="dest-stats">
                      <span class="dest-price-label">22 Packages</span>
                      <span class="dest-price">Starts INR 18,900</span>
                    </div>
                    <div class="dest-explore-btn">Explore</div>
                  </div>
                </div>
              </a>

              <a href="packages.html?dest=goa" class="dest-premium-card">
                <div class="dest-img-wrap">
                  <img loading="lazy" src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80" alt="Goa" />
                </div>
                <div class="dest-content">
                  <h4 class="dest-name">Goa</h4>
                  <p class="dest-desc">Vibrant beaches, electrifying nightlife, and Portuguese architectural charm.</p>
                  <div class="dest-footer">
                    <div class="dest-stats">
                      <span class="dest-price-label">30 Packages</span>
                      <span class="dest-price">Starts INR 11,200</span>
                    </div>
                    <div class="dest-explore-btn">Explore</div>
                  </div>
                </div>
              </a>

              <a href="packages.html?dest=andaman" class="dest-premium-card">
                <div class="dest-img-wrap">
                  <span class="dest-badge">Couples Pick</span>
                  <img loading="lazy" src="https://images.unsplash.com/photo-1589136777351-fdc9c9cb1669?auto=format&fit=crop&w=600&q=80" alt="Andaman" />
                </div>
                <div class="dest-content">
                  <h4 class="dest-name">Andaman</h4>
                  <p class="dest-desc">Crystal clear waters, coral reefs, and white sandy beaches await you.</p>
                  <div class="dest-footer">
                    <div class="dest-stats">
                      <span class="dest-price-label">18 Packages</span>
                      <span class="dest-price">Starts INR 22,500</span>
                    </div>
                    <div class="dest-explore-btn">Explore</div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="region-block">
            <h3>International Escapes</h3>
            <div class="cards-3">
              <!-- International Cards -->
              <a href="packages.html?dest=dubai" class="dest-premium-card">
                <div class="dest-img-wrap">
                  <img loading="lazy" src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80" alt="Dubai" />
                </div>
                <div class="dest-content">
                  <h4 class="dest-name">Dubai</h4>
                  <p class="dest-desc">Futuristic skyline, luxury shopping, and thrilling desert safaris.</p>
                  <div class="dest-footer">
                    <div class="dest-stats">
                      <span class="dest-price-label">28 Packages</span>
                      <span class="dest-price">Starts INR 35,000</span>
                    </div>
                    <div class="dest-explore-btn">Explore</div>
                  </div>
                </div>
              </a>

              <a href="packages.html?dest=bali" class="dest-premium-card">
                <div class="dest-img-wrap">
                  <span class="dest-badge">Most Loved</span>
                  <img loading="lazy" src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80" alt="Bali" />
                </div>
                <div class="dest-content">
                  <h4 class="dest-name">Bali</h4>
                  <p class="dest-desc">Iconic temples, lush rice terraces, and a deeply spiritual culture.</p>
                  <div class="dest-footer">
                    <div class="dest-stats">
                      <span class="dest-price-label">35 Packages</span>
                      <span class="dest-price">Starts INR 29,999</span>
                    </div>
                    <div class="dest-explore-btn">Explore</div>
                  </div>
                </div>
              </a>

              <a href="packages.html?dest=maldives" class="dest-premium-card">
                <div class="dest-img-wrap">
                  <span class="dest-badge">Luxury</span>
                  <img loading="lazy" src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80" alt="Maldives" />
                </div>
                <div class="dest-content">
                  <h4 class="dest-name">Maldives</h4>
                  <p class="dest-desc">Overwater villas, turquoise lagoons, and the ultimate romantic getaway.</p>
                  <div class="dest-footer">
                    <div class="dest-stats">
                      <span class="dest-price-label">12 Packages</span>
                      <span class="dest-price">Starts INR 65,000</span>
                    </div>
                    <div class="dest-explore-btn">Explore</div>
                  </div>
                </div>
              </a>

              <a href="packages.html?dest=thailand" class="dest-premium-card">
                <div class="dest-img-wrap">
                  <img loading="lazy" src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80" alt="Thailand" />
                </div>
                <div class="dest-content">
                  <h4 class="dest-name">Thailand</h4>
                  <p class="dest-desc">Bustling street markets, ornate temples, and stunning tropical islands.</p>
                  <div class="dest-footer">
                    <div class="dest-stats">
                      <span class="dest-price-label">42 Packages</span>
                      <span class="dest-price">Starts INR 24,500</span>
                    </div>
                    <div class="dest-explore-btn">Explore</div>
                  </div>
                </div>
              </a>

              <a href="packages.html?dest=vietnam" class="dest-premium-card">
                <div class="dest-img-wrap">
                  <img loading="lazy" src="https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=600&q=80" alt="Vietnam" />
                </div>
                <div class="dest-content">
                  <h4 class="dest-name">Vietnam</h4>
                  <p class="dest-desc">Breathtaking landscapes, deep history, and incredible culinary adventures.</p>
                  <div class="dest-footer">
                    <div class="dest-stats">
                      <span class="dest-price-label">20 Packages</span>
                      <span class="dest-price">Starts INR 32,000</span>
                    </div>
                    <div class="dest-explore-btn">Explore</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Thematic Collections -->
      <section class="hub-section">
        <div class="container">
          <div class="hub-section-title">
            <h2>Destination Collections</h2>
            <p>Explore by the vibe, mood, and travel style</p>
          </div>
          <div class="theme-grid">
            <a href="packages.html?theme=beach" class="theme-card">
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" alt="Beach Destinations" />
              <div class="theme-overlay"></div>
              <h3>Beach Escapes</h3>
            </a>
            <a href="packages.html?theme=mountains" class="theme-card">
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80" alt="Mountain Destinations" />
              <div class="theme-overlay"></div>
              <h3>Mountain Escapes</h3>
            </a>
            <a href="packages.html?theme=honeymoon" class="theme-card">
              <img src="https://images.unsplash.com/photo-1529154036614-a60975f5c760?auto=format&fit=crop&w=600&q=80" alt="Honeymoon Destinations" />
              <div class="theme-overlay"></div>
              <h3>Honeymoon Favorites</h3>
            </a>
            <a href="packages.html?theme=family" class="theme-card">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80" alt="Family Destinations" />
              <div class="theme-overlay"></div>
              <h3>Family Plans</h3>
            </a>
            <a href="packages.html?theme=luxury" class="theme-card">
              <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80" alt="Luxury Destinations" />
              <div class="theme-overlay"></div>
              <h3>Luxury Retreats</h3>
            </a>
            <a href="packages.html?theme=adventure" class="theme-card">
              <img src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80" alt="Adventure Destinations" />
              <div class="theme-overlay"></div>
              <h3>Adventure Routes</h3>
            </a>
          </div>
        </div>
      </section>

      <!-- Travel Inspiration & CTA -->
      <section class="inspiration-section">
        <div class="container">
          <h2>Need help choosing your next adventure?</h2>
          <p>Whether you're planning a romantic honeymoon, a family vacation, or a solo backpacking trip, our travel experts are here to handcraft the perfect itinerary just for you.</p>
          <a href="contact.html" class="inspiration-cta">Talk to a Travel Expert</a>
        </div>
      </section>
    </main>
"""

with open("/Users/campfly/Downloads/campfly-landing-page-main/styles.css", "a") as f:
    f.write(css_to_append)

with open("/Users/campfly/Downloads/campfly-landing-page-main/destinations.html", "r") as f:
    content = f.read()

# Replace <header class="site-header"> up to </header>
content = re.sub(r'<header class="site-header">.*?</header>', html_header, content, flags=re.DOTALL)

# Replace <main> up to </main>
content = re.sub(r'<main>.*?</main>', html_main, content, flags=re.DOTALL)

# Remove the inline script that rendered old destinations
content = re.sub(r'<script>\s*// Load destinations.*?</script>', '', content, flags=re.DOTALL)

# Update CSS version
content = re.sub(r'styles\.css\?v=\d+', 'styles.css?v=13', content)
content = re.sub(r'href="styles\.css"', 'href="styles.css?v=13"', content)

with open("/Users/campfly/Downloads/campfly-landing-page-main/destinations.html", "w") as f:
    f.write(content)

print("Destinations page successfully rewritten!")
