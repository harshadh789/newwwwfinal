import re

with open("package-detail.html", "r") as f:
    html = f.read()

# We want to replace from <main class="package-detail-page"> to <!-- Content Layout -->
old_block = re.search(r'<main class="package-detail-page">.*?<!-- Content Layout -->', html, re.DOTALL)

if old_block:
    new_html = html.replace(old_block.group(0), """<main class="package-detail-page">
      
      <!-- Premium Hero Section (Matches Homepage) -->
      <section class="hero package-hero" id="pkg-hero" style="min-height: 60vh; background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; position: relative; margin-top: -80px; padding-top: 120px;">
        <div class="container hero-inner" style="z-index: 2; position: relative; text-align: center; color: #fff;">
          <div class="hero-content" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; align-items: center;">
            <nav class="breadcrumb" aria-label="Breadcrumb" style="color: rgba(255,255,255,0.8); margin-bottom: 1.5rem; justify-content: center;">
              <a href="index.html" style="color: #fff;">Home</a>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              <a href="packages.html?type=domestic" id="breadcrumb-type" style="color: #fff;">Tours</a>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              <span aria-current="page" id="breadcrumb-active" style="color: #fff; font-weight: 600;">Loading...</span>
            </nav>
            
            <p class="eyebrow" id="pkg-type-eyebrow" style="color: var(--sun); margin-bottom: 1rem;">EXCLUSIVE TOUR</p>
            <h1 id="pkg-title" style="color: #fff; font-size: 3.5rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 1rem; line-height: 1.1;">Loading Package...</h1>
            <p id="pkg-meta" style="font-size: 1.2rem; font-weight: 500; color: rgba(255,255,255,0.9); margin-bottom: 1.5rem;">Loading...</p>
            
            <div class="rating-badge" id="pkg-rating-badge" style="display:none; justify-content: center; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.3); color: #fff; border-radius: 999px; padding: 0.5rem 1rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
              <svg viewBox="0 0 24 24" style="fill: var(--sun); width: 18px; height: 18px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              <span id="pkg-rating" style="font-weight: 700; margin-left: 0.5rem;">4.9</span>
              <span class="rating-count" id="pkg-review-count" style="font-weight: 500; color: rgba(255,255,255,0.8); margin-left: 0.25rem;">(0 Reviews)</span>
            </div>
          </div>
        </div>
      </section>

      <div class="container" style="position: relative; z-index: 10; margin-top: -3rem;">
        <!-- Package Highlights Floating Over Hero -->
        <div class="package-highlights" id="pkg-highlights" style="justify-content: center; margin-bottom: 4rem; background: var(--surface); padding: 1.5rem; border-radius: 16px; box-shadow: var(--shadow-strong); border: 1px solid var(--line);">
          <!-- Dynamic Highlights -->
        </div>

        <!-- Premium Mosaic Gallery (Below Hero) -->
        <div class="package-mosaic-gallery" id="pkg-gallery">
          <!-- Dynamic Images -->
        </div>

        <!-- Content Layout -->""")
    
    # Also update JS
    js_update = """
        // Header & Meta
        document.title = data.title + " | Campfly";
        document.getElementById("breadcrumb-active").textContent = data.title;
        
        const breadcrumbType = document.getElementById("breadcrumb-type");
        if (breadcrumbType) {
            breadcrumbType.href = `packages.html?type=${data.type}`;
            breadcrumbType.textContent = data.type === "international" ? "International Tours" : "Domestic Tours";
        }
        
        const eyebrow = document.getElementById("pkg-type-eyebrow");
        if (eyebrow) {
            eyebrow.textContent = data.type === "international" ? "INTERNATIONAL ESCAPE" : "DOMESTIC TOUR";
        }
        
        document.getElementById("pkg-title").textContent = data.title;
        document.getElementById("pkg-meta").innerHTML = `${data.duration} &nbsp;&bull;&nbsp; Handcrafted Experience &nbsp;&bull;&nbsp; ${data.type === 'international' ? 'International' : 'Domestic'}`;
        document.getElementById("pkg-desc").textContent = data.description;
        
        // Set Hero Background
        const heroSection = document.getElementById("pkg-hero");
        if (heroSection && data.images && data.images.length > 0) {
            heroSection.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%), url('${data.images[0]}')`;
        }
"""
    new_html = re.sub(r'// Header & Meta.*?(?=// Price Formatting)', js_update, new_html, flags=re.DOTALL)
    
    with open("package-detail.html", "w") as f:
        f.write(new_html)
    print("package-detail.html rewritten successfully.")
else:
    print("Could not find the target block.")

