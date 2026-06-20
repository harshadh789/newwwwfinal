import os

head_content = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title} | Campfly</title>
    <meta name="description" content="{desc}" />
    <meta name="theme-color" content="#0da99b" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="site-header">
      <div class="container nav-shell">
        <a href="index.html" class="logo" aria-label="Campfly Home">
          <img src="assets/logo-source.png" alt="Campfly" class="brand-logo-img" height="42" style="width: auto; display: block;" />
        </a>

        <div class="nav-overlay">
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
        </div>

        <div class="header-actions">
          <button class="ghost" data-currency-button type="button" aria-label="Prices are shown in Indian rupees">INR</button>
          <a class="solid action-link" href="contact.html">Plan trip</a>
          <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="close-icon" style="display: none;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </header>
"""

foot_content = """
    <footer class="site-footer" id="contact">
      <div class="footer-top-band">
        <div class="container flex-band">
          <div class="engagement-newsletter">
            <div>
              <h4>Stay Inspired</h4>
              <p class="small">Join our newsletter for exclusive offers and travel tips.</p>
            </div>
            <form class="newsletter-form" id="newsletter-form">
              <input type="email" name="newsletter_email" required placeholder="Enter your email" />
              <button class="solid" type="submit">Subscribe</button>
            </form>
          </div>
          <div class="engagement-socials">
            <h4>Follow Us</h4>
            <div class="social-icons">
              <a href="#" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
              <a href="#" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              <a href="#" aria-label="X (Twitter)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
              <a href="#" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
            </div>
          </div>
        </div>
      </div>
      <div class="container footer-grid">
        <section class="footer-brand-col">
          <h4>Reach Us</h4>
          <div class="footer-contact-info">
            <p class="small"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> No. 39/2475, LR Towers, Mythri Road, Palarivattom, Ernakulam - 682025</p>
            <p class="small"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> <a href="tel:+919876543321">+91 98765 43321</a></p>
            <p class="small"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="M12 14l9-7-9 7z"></path></svg> <a href="mailto:hello@campfly.com">hello@campfly.com</a></p>
          </div>
        </section>
        <section>
          <h4>Support & Legal</h4>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact Us</a>
          <a href="#">Help Centre</a>
          <a href="#">FAQs</a>
          <a href="#">Blog</a>
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms & Conditions</a>
          <a href="cancellation.html">Cancellation Policy</a>
        </section>
        <section>
          <h4>Top Destinations</h4>
          <a href="packages.html?dest=kerala">Kerala Tour Packages</a>
          <a href="packages.html?dest=maldives">Maldives Tour Packages</a>
          <a href="packages.html?dest=dubai">Dubai Escapes</a>
          <a href="packages.html?dest=ladakh">Ladakh Adventures</a>
          <a href="packages.html?dest=vietnam">Vietnam Packages</a>
          <a href="packages.html?dest=northeast">North East India</a>
        </section>
        <section>
          <h4>Travel Styles</h4>
          <a href="packages.html?theme=honeymoon">Honeymoon Escapes</a>
          <a href="packages.html?theme=family">Family Plans</a>
          <a href="packages.html?theme=weekend">Weekend Getaways</a>
          <a href="packages.html?theme=adventure">Adventure Routes</a>
          <a href="packages.html?theme=luxury">Luxury Retreats</a>
          <a href="packages.html?theme=group">Group Tours</a>
        </section>
      </div>
      <div class="container footer-bottom">
        <p>© <span id="year"></span> Campfly, Inc. All rights reserved.</p>
        <div>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
    {extra_scripts}
  </body>
</html>"""

def build_page(filename, title, desc, main_content, extra_scripts="<script src=\"script.js\"></script>"):
    html = head_content.format(title=title, desc=desc) + f"\n    <main>\n{main_content}\n    </main>\n" + foot_content.format(extra_scripts=extra_scripts)
    with open(filename, "w") as f:
        f.write(html)
    print(f"Rebuilt {filename}")

# =====================
# ABOUT.HTML
# =====================
about_main = """      <section class="page-hero">
        <div class="container page-hero-content">
          <h1>Our Story</h1>
          <p>We believe travel is not just about the destination, but the journey and the memories you make along the way.</p>
        </div>
      </section>

      <section class="section">
        <div class="container split-layout">
          <div>
            <h2>Who We Are</h2>
            <p>At Campfly, we are redefining how people explore the world. Born from a passion for authentic travel experiences, we connect you with verified local experts who craft personalized itineraries.</p>
            <p>Our mission is to eliminate the stress of planning and replace it with the joy of discovery. Whether it's a serene honeymoon in the Maldives, a thrilling adventure in Ladakh, or a cozy family retreat in Kerala, we ensure every detail is handled with care.</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80" alt="Travel team" style="border-radius: 16px; width: 100%; height: auto; object-fit: cover;" />
          </div>
        </div>
      </section>

      <section class="section section-soft">
        <div class="container">
          <div class="section-head centered">
            <h2>The Fastest Growing Holiday Marketplace</h2>
            <p>Transparent pricing, trusted local experts, and seamless support from planning to return.</p>
          </div>
          <div class="stats-grid">
            <article>
              <h3>22L+</h3>
              <p>Happy travellers</p>
            </article>
            <article>
              <h3>650+</h3>
              <p>Verified agents</p>
            </article>
            <article>
              <h3>4.8/5</h3>
              <p>Average rating</p>
            </article>
            <article>
              <h3>24/7</h3>
              <p>Support desk</p>
            </article>
          </div>
        </div>
      </section>"""
build_page("about.html", "About Us", "Learn more about Campfly", about_main)


# =====================
# CONTACT.HTML
# =====================
contact_main = """      <section class="page-hero">
        <div class="container page-hero-content">
          <h1>Contact Us</h1>
          <p>We're here to help you plan your next perfect getaway.</p>
        </div>
      </section>

      <section class="section">
        <div class="container split-layout">
          <div>
            <h2>Get in Touch</h2>
            <p>Have questions about our packages or need help building a custom itinerary? Send us a message and our travel experts will get back to you shortly.</p>
            <form class="contact-form" style="display:flex; flex-direction:column; gap:1rem; margin-top:2rem;" action="https://api.web3forms.com/submit" method="POST">
              <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
              <label>Name
                <input type="text" name="name" required style="width:100%; padding:0.75rem; border:1px solid var(--border-color); border-radius:8px;"/>
              </label>
              <label>Email
                <input type="email" name="email" required style="width:100%; padding:0.75rem; border:1px solid var(--border-color); border-radius:8px;"/>
              </label>
              <label>Message
                <textarea name="message" rows="5" required style="width:100%; padding:0.75rem; border:1px solid var(--border-color); border-radius:8px;"></textarea>
              </label>
              <button type="submit" class="solid submit-btn">Send Message</button>
            </form>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80" alt="Contact Us" style="border-radius: 16px; width: 100%; height: auto; object-fit: cover;" />
          </div>
        </div>
      </section>"""
build_page("contact.html", "Contact Us", "Get in touch with the Campfly team.", contact_main)


# =====================
# DESTINATIONS.HTML
# =====================
dest_main = """      <section class="page-hero">
        <div class="container page-hero-content">
          <h1>Explore Destinations</h1>
          <p>Discover beautiful places across the globe handpicked by our travel experts.</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="destinations-grid" id="destinations-grid">
            <!-- Populated via script.js -->
          </div>
        </div>
      </section>"""
dest_scripts = """    <script src="data.js"></script>
    <script src="script.js"></script>
    <script>
      // Load destinations
      document.addEventListener("DOMContentLoaded", () => {
        const destGrid = document.getElementById("destinations-grid");
        if(destGrid && typeof renderDestinations === 'function') {
          renderDestinations(); // Or we can inline the rendering if we need to.
        } else {
          // Fallback if we need to render manually
          const dests = [
            { id: "kerala", name: "Kerala", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944", tours: "45" },
            { id: "maldives", name: "Maldives", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8", tours: "12" },
            { id: "dubai", name: "Dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c", tours: "28" },
            { id: "ladakh", name: "Ladakh", img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d", tours: "15" },
            { id: "vietnam", name: "Vietnam", img: "https://images.unsplash.com/photo-1528181304800-259b08848526", tours: "20" },
            { id: "northeast", name: "North East India", img: "https://images.unsplash.com/photo-1566418898126-724f8d554a9b", tours: "10" }
          ];
          destGrid.innerHTML = dests.map(d => `
            <a href="packages.html?dest=${d.id}" class="destination-card reveal">
              <img src="${d.img}?auto=format&fit=crop&w=600&q=80" alt="${d.name}" />
              <div class="destination-content">
                <h3>${d.name}</h3>
                <p>${d.tours} Packages</p>
              </div>
            </a>
          `).join("");
        }
      });
    </script>"""
build_page("destinations.html", "Explore Destinations", "Discover worldwide destinations.", dest_main, dest_scripts)


# =====================
# PACKAGES.HTML
# =====================
packages_main = """      <section class="page-hero">
        <div class="container page-hero-content">
          <h1 id="packages-page-title">Explore Tours</h1>
          <p id="packages-page-desc">Browse our curated selection of amazing travel experiences.</p>
        </div>
      </section>

      <section class="section section-soft">
        <div class="container">
          <div class="tab-system">
            <div class="tab-list" role="tablist">
              <button class="tab-button is-active" role="tab" data-tab="all-tours" aria-selected="true">All Tours</button>
              <button class="tab-button" role="tab" data-tab="domestic-tours" aria-selected="false">Domestic</button>
              <button class="tab-button" role="tab" data-tab="international-tours" aria-selected="false">International</button>
            </div>
          </div>
          
          <div class="packages-grid" id="packages-grid" style="margin-top:2rem;">
            <!-- Populated via script.js -->
          </div>
        </div>
      </section>"""
pkg_scripts = """    <script src="data.js"></script>
    <script src="script.js"></script>
    <script>
      // Load packages based on data.js
      document.addEventListener("DOMContentLoaded", () => {
        const grid = document.getElementById("packages-grid");
        const urlParams = new URLSearchParams(window.location.search);
        const typeFilter = urlParams.get('type');
        const destFilter = urlParams.get('dest');
        const themeFilter = urlParams.get('theme');

        let filteredKeys = Object.keys(tourPackages);
        
        if (typeFilter) {
          filteredKeys = filteredKeys.filter(k => tourPackages[k].type === typeFilter);
          document.getElementById('packages-page-title').textContent = typeFilter === 'international' ? 'International Tours' : 'Domestic Tours';
        } else if (destFilter) {
          // simple mock filtering
          document.getElementById('packages-page-title').textContent = destFilter.charAt(0).toUpperCase() + destFilter.slice(1) + ' Tours';
        } else if (themeFilter) {
          document.getElementById('packages-page-title').textContent = themeFilter.charAt(0).toUpperCase() + themeFilter.slice(1) + ' Escapes';
        }

        if(grid) {
          grid.innerHTML = filteredKeys.map(k => {
            const p = tourPackages[k];
            return `
            <a href="package-detail.html?id=${k}" class="package-card reveal">
              <div class="image-wrapper">
                <img src="${p.images[0]}" alt="${p.title}" />
                <span class="badge ${p.type === 'international' ? 'international' : 'domestic'}">${p.type}</span>
              </div>
              <div class="content">
                <div class="meta">${p.duration} &bull; ${p.type}</div>
                <h3>${p.title}</h3>
                <div class="price">INR ${p.price} <span class="unit">/ person</span></div>
              </div>
            </a>`;
          }).join("");
        }
      });
    </script>"""
build_page("packages.html", "Tour Packages", "Browse curated travel packages.", packages_main, pkg_scripts)


# =====================
# INDEX.HTML
# =====================
index_main = """      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-bg">
          <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80" alt="Beautiful landscape" />
          <div class="overlay"></div>
        </div>
        <div class="container hero-content">
          <h1>Find Your Next Great Adventure</h1>
          <p>Handcrafted itineraries by local experts to over 50 destinations worldwide.</p>
          <form class="search-bar" action="packages.html" method="GET">
            <input type="text" name="dest" placeholder="Where do you want to go?" required />
            <button class="solid" type="submit">Search</button>
          </form>
          <div class="quick-links" style="margin-top:1.5rem; display:flex; gap:1rem; flex-wrap:wrap; justify-content:center;">
            <a href="packages.html?type=domestic" class="chip active">Kerala</a>
            <a href="packages.html?type=international" class="chip">Maldives</a>
            <a href="packages.html?dest=dubai" class="chip">Dubai</a>
            <a href="packages.html?dest=bali" class="chip">Bali</a>
            <a href="destinations.html" class="chip">Explore</a>
          </div>
        </div>
      </section>

      <!-- Trust Banner -->
      <section class="tourism-partners">
        <div class="container">
          <p class="small text-muted centered">Trusted by thousands of travellers and partners</p>
          <div class="partners-grid" style="display:flex; justify-content:center; gap:2rem; flex-wrap:wrap; opacity:0.6; margin-top:1rem;">
            <span>Partner 1</span>
            <span>Partner 2</span>
            <span>Partner 3</span>
            <span>Partner 4</span>
          </div>
        </div>
      </section>

      <!-- Intent Selection -->
      <section class="section intent-section section-soft">
        <div class="container">
          <div class="section-head centered">
            <h2>Travel Styles</h2>
            <p>What kind of experience are you looking for?</p>
          </div>
          <div class="destinations-grid">
            <a href="packages.html?theme=honeymoon" class="destination-card reveal">
              <img src="https://images.unsplash.com/photo-1543888363-2287f3b7d1e8?auto=format&fit=crop&w=600&q=80" alt="Honeymoon" />
              <div class="destination-content"><h3>Honeymoon</h3></div>
            </a>
            <a href="packages.html?theme=family" class="destination-card reveal">
              <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80" alt="Family" />
              <div class="destination-content"><h3>Family Plans</h3></div>
            </a>
            <a href="packages.html?theme=adventure" class="destination-card reveal">
              <img src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=600&q=80" alt="Adventure" />
              <div class="destination-content"><h3>Adventure Routes</h3></div>
            </a>
          </div>
        </div>
      </section>

      <!-- Featured Packages -->
      <section class="section" id="featured">
        <div class="container">
          <div class="section-head">
            <h2>Trending Packages</h2>
            <a href="packages.html" class="action-link">View all</a>
          </div>
          <div class="packages-grid" id="featured-packages-grid">
            <!-- Populated via script.js -->
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="section">
        <div class="container cta-band">
          <div>
            <h2>Ready to start planning?</h2>
            <p>Connect with our local experts to build your custom itinerary.</p>
          </div>
          <a class="ghost light action-link" href="contact.html">Get Started</a>
        </div>
      </section>"""
index_scripts = """    <script src="data.js"></script>
    <script src="script.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        const grid = document.getElementById("featured-packages-grid");
        if(grid) {
          const keys = ["ladakh", "paris", "goa"].filter(k => tourPackages[k]);
          grid.innerHTML = keys.map(k => {
            const p = tourPackages[k];
            return `
            <a href="package-detail.html?id=${k}" class="package-card reveal">
              <div class="image-wrapper">
                <img src="${p.images[0]}" alt="${p.title}" />
                <span class="badge ${p.type === 'international' ? 'international' : 'domestic'}">${p.type}</span>
              </div>
              <div class="content">
                <div class="meta">${p.duration} &bull; ${p.type}</div>
                <h3>${p.title}</h3>
                <div class="price">INR ${p.price} <span class="unit">/ person</span></div>
              </div>
            </a>`;
          }).join("");
        }
      });
    </script>"""
build_page("index.html", "Campfly", "The fastest growing holiday marketplace.", index_main, index_scripts)
