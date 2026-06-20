import re

html_content = """
    <main class="packages-listing-page">
      <!-- Immersive Hero Banner with Hit Pick Card -->
      <section class="packages-hero" style="background-image: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%), url('https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80');">
        <div class="container packages-hero-inner">
          <div class="hero-text">
            <h1 id="packages-page-title">Europe Packages</h1>
            <p id="packages-page-desc">Visit great cities & do exciting things with our best packages.</p>
          </div>
          <div class="hit-pick-card">
            <div class="hit-pick-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              SOOPER HIT PICK
            </div>
            <div class="hit-pick-content">
              <h3>7-Day France Honeymoon Special for Couples</h3>
              <ul class="hit-pick-features">
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Hotels</li>
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 6 activities</li>
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Shared Transfer</li>
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 24x7 concierge</li>
              </ul>
              <div class="hit-pick-footer">
                <div class="hit-pick-price">
                  <span class="price">₹1,14,791</span>
                  <span class="unit">6 nights / person</span>
                </div>
                <button class="solid action-btn view-detail-btn">View Detail</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust Bar -->
      <div class="trust-bar">
        <div class="container trust-bar-inner">
          <div class="trust-stat">
            <div class="trust-icon fb-icon">f</div>
            <div class="trust-text">
              <strong>4.8 <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg></strong>
              <span>from 1425+ travellers</span>
            </div>
          </div>
          <div class="trust-stat">
            <div class="trust-icon google-icon">G</div>
            <div class="trust-text">
              <strong>4.6 <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg></strong>
              <span>from 8250+ travellers</span>
            </div>
          </div>
          <div class="trust-stat award-stat">
            <div class="trust-icon trophy-icon">🏆</div>
            <div class="trust-text">
              <span>Awarded India's No.1 Leisure<br/>Travel Brand</span>
            </div>
          </div>
          <div class="trust-review">
            <img src="https://i.pravatar.cc/100?img=11" alt="Reviewer" class="reviewer-avatar" />
            <div class="trust-text">
              <span>"Our recent Europe trip with Campfly was an amazing experience! The planning..." - <strong>ANINDYA..</strong></span>
            </div>
          </div>
        </div>
      </div>

      <section class="section packages-main-section">
        <div class="container layout-with-sidebar">
          
          <!-- Filters Sidebar -->
          <aside class="filters-sidebar">
            <div class="filter-group">
              <h4>BUDGET</h4>
              <label class="filter-checkbox"><input type="checkbox" name="budget" value="below50" /> <span>Below ₹ 50k</span></label>
              <label class="filter-checkbox"><input type="checkbox" name="budget" value="50to75" /> <span>₹ 50k - ₹ 75k</span></label>
              <label class="filter-checkbox"><input type="checkbox" name="budget" value="75to1l" /> <span>₹ 75k - ₹ 1L</span></label>
              <label class="filter-checkbox"><input type="checkbox" name="budget" value="1lto15" /> <span>₹ 1L - ₹ 1.5L</span></label>
              <label class="filter-checkbox"><input type="checkbox" name="budget" value="15to2l" /> <span>₹ 1.5L - ₹ 2L</span></label>
              <label class="filter-checkbox"><input type="checkbox" name="budget" value="above2l" /> <span>Above ₹ 2L</span></label>
            </div>
          </aside>

          <!-- Packages Grid Area -->
          <div class="packages-content-area">
            <div class="packages-toolbar">
              <div class="tab-system">
                <div class="tab-list" role="tablist">
                  <button class="tab-button is-active" role="tab" data-tab="all-tours" aria-selected="true">All Tours</button>
                  <button class="tab-button" role="tab" data-tab="domestic-tours" aria-selected="false">Domestic</button>
                  <button class="tab-button" role="tab" data-tab="international-tours" aria-selected="false">International</button>
                </div>
              </div>
              
              <div class="sort-dropdown">
                <span>Sort by</span>
                <select aria-label="Sort packages">
                  <option>Lowest to highest</option>
                  <option>Highest to lowest</option>
                  <option>Duration: Short to long</option>
                  <option>Duration: Long to short</option>
                </select>
              </div>
            </div>

            <div class="packages-grid" id="packages-grid">
              <!-- Populated via script.js -->
            </div>
          </div>
        </div>
      </section>
    </main>
"""

with open("packages.html", "r") as f:
    content = f.read()

# Replace <main>...</main>
new_content = re.sub(r'<main>.*?</main>', html_content, content, flags=re.DOTALL)

with open("packages.html", "w") as f:
    f.write(new_content)

print("packages.html replaced")
