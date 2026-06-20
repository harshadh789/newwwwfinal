import re

html_header_replacement = """
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
    <main class="package-detail-page">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="index.html">Home</a>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <a href="packages.html" id="breadcrumb-type">Tours</a>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <span aria-current="page" id="breadcrumb-active">Loading...</span>
        </nav>

        <!-- Premium Header Info -->
        <div class="package-header-info">
          <div class="package-title-row">
            <h1 id="pkg-title">Loading Package...</h1>
            <div class="rating-badge" id="pkg-rating-badge">
              <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              <span id="pkg-rating">4.9</span>
              <span class="rating-count" id="pkg-review-count">(124 Reviews)</span>
            </div>
          </div>
          <div class="quick-glance" id="pkg-quick-glance">
            <div class="quick-glance-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span id="pkg-duration">Loading...</span>
            </div>
            <div class="quick-glance-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <span>Small Group (Max 12)</span>
            </div>
            <div class="quick-glance-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>Premium Handcrafted</span>
            </div>
          </div>
        </div>

        <!-- Premium Mosaic Gallery -->
        <div class="package-mosaic-gallery" id="pkg-gallery">
          <!-- Populated via JS -->
        </div>

        <!-- Content Layout -->
        <div class="package-detail-layout">
          <!-- Left Column: Details -->
          <div class="package-details">
            <section class="detail-section">
              <h2>Overview</h2>
              <p class="desc-text" id="pkg-desc">Loading description...</p>
              
              <div class="highlights-grid">
                <div class="highlight-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  <span>4-Star Hotels</span>
                </div>
                <div class="highlight-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
                  <span>Daily Breakfast & Dinner</span>
                </div>
                <div class="highlight-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="2"></rect><path d="M7 8V6a5 5 0 0 1 10 0v2"></path></svg>
                  <span>Secure Transfers</span>
                </div>
                <div class="highlight-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"></path></svg>
                  <span>Expert Local Guide</span>
                </div>
              </div>
            </section>

            <section class="detail-section">
              <h2>Itinerary</h2>
              <div class="itinerary-accordion" id="pkg-itinerary">
                <!-- Populated via JS -->
              </div>
            </section>

            <section class="detail-section">
              <h2>Inclusions & Exclusions</h2>
              <div class="inc-exc-grid">
                <div class="inc-card">
                  <h4><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> What's Included</h4>
                  <ul id="pkg-inclusions"></ul>
                </div>
                <div class="exc-card">
                  <h4><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> What's Not Included</h4>
                  <ul id="pkg-exclusions"></ul>
                </div>
              </div>
            </section>
            
          </div>

          <!-- Right Column: Sticky Booking Widget -->
          <aside class="package-booking-sidebar">
            <div class="sticky-booking-card">
              <div class="price-header">
                <span class="price-strike" id="pkg-price-strike" style="display:none;"></span>
                <span class="price" id="pkg-price">INR --,---</span>
                <span class="price-unit">/ person</span>
              </div>
              <form class="booking-form" id="booking-widget-form">
                <input type="hidden" name="package" id="pkg-form-input" value="" />
                
                <div class="form-row">
                  <label>Select Date
                    <input type="date" name="date" required />
                  </label>
                  <label>Guests
                    <select name="guests">
                      <option>1 Adult</option>
                      <option selected>2 Adults</option>
                      <option>3 Adults</option>
                      <option>4 Adults</option>
                      <option>Family (2 Adults, 2 Kids)</option>
                    </select>
                  </label>
                </div>

                <button type="submit" class="solid submit-btn">Request Booking</button>
              </form>
              <div class="booking-trust">
                <p>You won't be charged yet</p>
                <p>Free cancellation up to 7 days before</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>

    <!-- Related Tours Section -->
    <section class="similar-tours-section">
      <div class="container">
        <h2>You Might Also Like</h2>
        <div class="cards-3" id="similar-tours-grid">
          <!-- Populated via script.js -->
        </div>
      </div>
    </section>
"""

html_script = """
    <script src="data.js"></script>
    <script src="script.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        const urlParams = new URLSearchParams(window.location.search);
        let pkgId = urlParams.get('id');
        
        if (!pkgId || !tourPackages[pkgId]) {
          pkgId = "ladakh";
        }

        const data = tourPackages[pkgId];

        // Header & Meta
        document.title = data.title + " | Campfly";
        document.getElementById("breadcrumb-active").textContent = data.title;
        
        const breadcrumbType = document.getElementById("breadcrumb-type");
        if (breadcrumbType) {
            breadcrumbType.href = `packages.html?type=${data.type}`;
            breadcrumbType.textContent = data.type === "international" ? "International Tours" : "Domestic Tours";
        }
        
        document.getElementById("pkg-title").textContent = data.title;
        document.getElementById("pkg-duration").textContent = data.duration;
        document.getElementById("pkg-desc").textContent = data.description;
        
        // Price Formatting
        document.getElementById("pkg-price").textContent = `INR ${data.price}`;
        
        const formInput = document.getElementById("pkg-form-input");
        if(formInput) formInput.value = data.title;

        // Mosaic Gallery
        const gallery = document.getElementById("pkg-gallery");
        if (data.images && data.images.length > 0) {
          let imgsHtml = `<div class="mosaic-item mosaic-main"><img src="${data.images[0]}" alt="${data.title} Main" /></div>`;
          for(let i=1; i<Math.min(data.images.length, 5); i++) {
             imgsHtml += `<div class="mosaic-item"><img src="${data.images[i]}" alt="${data.title} View ${i}" /></div>`;
          }
          gallery.innerHTML = imgsHtml;
        }

        // Inclusions & Exclusions
        const inclusionsList = document.getElementById("pkg-inclusions");
        if (data.inclusions) {
          inclusionsList.innerHTML = data.inclusions.map(inc => `<li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${inc}</span></li>`).join("");
        }
        const exclusionsList = document.getElementById("pkg-exclusions");
        if (data.exclusions) {
          exclusionsList.innerHTML = data.exclusions.map(exc => `<li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> <span>${exc}</span></li>`).join("");
        }

        // Interactive Itinerary
        const itineraryContainer = document.getElementById("pkg-itinerary");
        if (data.itinerary) {
          itineraryContainer.innerHTML = data.itinerary.map((item, index) => `
            <div class="itinerary-day">
              <div class="day-label"><span>Day</span>${item.day}</div>
              <div class="day-content-wrapper">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
              </div>
            </div>
          `).join("");
        }
        
        // Similar Tours (load 3 random tours from the same category)
        const similarGrid = document.getElementById("similar-tours-grid");
        if(similarGrid) {
            let similarKeys = Object.keys(tourPackages).filter(k => tourPackages[k].type === data.type && k !== pkgId);
            // shuffle array
            similarKeys = similarKeys.sort(() => 0.5 - Math.random()).slice(0, 3);
            
            similarGrid.innerHTML = similarKeys.map(k => {
              const p = tourPackages[k];
              return `
                <a href="package-detail.html?id=${k}" class="catalog-card">
                  <div class="cc-image">
                    <img loading="lazy" src="${p.images[0]}" alt="${p.title}" />
                    <span class="cc-badge">${p.type}</span>
                  </div>
                  <div class="cc-content">
                    <div class="cc-meta">${p.duration} &bull; Small Group</div>
                    <h3 class="cc-title">${p.title}</h3>
                    <div class="cc-footer">
                      <div class="cc-price-block">
                        <span class="cc-price-label">Starts from</span>
                        <span class="cc-price">INR ${p.price}</span>
                      </div>
                      <div class="cc-button">View Detail</div>
                    </div>
                  </div>
                </a>
              `;
            }).join('');
        }

      });

      const bookingForm = document.getElementById("booking-widget-form");
      if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const formData = new FormData(bookingForm);
          const pkg = formData.get("package");
          const date = formData.get("date");
          const guests = formData.get("guests");
          
          if(typeof openWhatsApp === "function") {
            const msg = `Hi Campfly, I am interested in booking the ${pkg} package for ${guests} on ${date}. Please share more details.`;
            openWhatsApp(msg);
          } else {
             window.open(`https://wa.me/919876543321?text=${encodeURIComponent(`Hi Campfly, I am interested in booking the ${pkg} package for ${guests} on ${date}. Please share more details.`)}`, '_blank');
          }
        });
      }
    </script>
"""

with open("/Users/campfly/Downloads/campfly-landing-page-main/package-detail.html", "r") as f:
    content = f.read()

# Replace <header> to <div class="header-actions">...</div> </div> </header>
# But wait, we can just replace everything from <header class="site-header"> up to </header>
content = re.sub(r'<header class="site-header">.*?</header>', html_header_replacement, content, flags=re.DOTALL)

# Replace <main class="package-detail-page"> up to </main>
content = re.sub(r'<main class="package-detail-page">.*?</main>', html_main, content, flags=re.DOTALL)

# Replace <script> containing document.addEventListener("DOMContentLoaded"...
content = re.sub(r'<script src="data\.js"></script>.*?</script>.*?</script>', html_script, content, flags=re.DOTALL)

# Also ensure styles.css?v=11
content = re.sub(r'styles\.css\?v=\d+', 'styles.css?v=11', content)

with open("/Users/campfly/Downloads/campfly-landing-page-main/package-detail.html", "w") as f:
    f.write(content)

print("package-detail.html injected")
