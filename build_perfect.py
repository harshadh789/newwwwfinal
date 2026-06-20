import re

with open("proper_recovered_index.html", "r") as f:
    html = f.read()

def get_section(regex_pattern, html_string):
    match = re.search(regex_pattern, html_string, re.DOTALL | re.IGNORECASE)
    return match.group(1) if match else None

head_match = re.search(r'(.*?)(<header.*?</header>\s*)<main>', html, re.DOTALL | re.IGNORECASE)
if not head_match:
    head_match = re.search(r'(.*?)(<header.*?</header>\s*)<main', html, re.DOTALL | re.IGNORECASE)
head_and_header = head_match.group(1) + head_match.group(2) if head_match else ""

foot_match = re.search(r'(</main>.*)', html, re.DOTALL | re.IGNORECASE)
foot_content = foot_match.group(1) if foot_match else ""

hero = get_section(r'(\s*<section class="hero.*?</section>\n)', html)
if hero and hero.startswith('"'):
    hero = hero[1:]

partners = get_section(r'(\s*<!-- Trust Banner: Tourism Boards -->.*?<section class="tourism-partners".*?</section>\n)', html)
if not partners:
    partners = get_section(r'(\s*<section class="tourism-partners".*?</section>\n)', html)

chips = get_section(r'(\s*<section class="chips-strip".*?</section>\n)', html)
featured = get_section(r'(\s*<section class="section" id="featured">.*?</section>\n)', html)
themes = get_section(r'(\s*<section class="section" id="themes">.*?</section>\n)', html)
split = get_section(r'(\s*<section class="section">\s*<div class="container split-layout">.*?</section>\n)', html)
destinations = get_section(r'(\s*<section class="section" id="destinations">.*?</section>\n)', html)
cta = get_section(r'(\s*<section class="section">\s*<div class="container cta-band">.*?</section>\n)', html)
stats = get_section(r'(\s*<section class="section section-soft">.*?</section>\n)', html)

intent = """
      <!-- Travel Styles / Intent Selection -->
      <section class="section intent-section">
        <div class="container">
          <div class="section-head centered">
            <h2>Who's coming with you?</h2>
            <p>Select your travel group to find perfectly curated plans.</p>
          </div>
          <div class="intent-grid">
            <a href="#destinations" class="intent-card">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <h3>Couple</h3>
              <p>Retreats for two</p>
            </a>
            <a href="#destinations" class="intent-card">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <h3>Family</h3>
              <p>Kid-friendly adventures</p>
            </a>
            <a href="#destinations" class="intent-card">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <h3>Friends</h3>
              <p>Group trips & trails</p>
            </a>
            <a href="#destinations" class="intent-card">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <h3>Solo</h3>
              <p>Curated backpacking</p>
            </a>
          </div>
        </div>
      </section>
"""

trust = """
      <!-- Trust & Credibility Pillars -->
      <section class="section trust-section">
        <div class="container trust-grid">
          <div class="trust-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <h4>100% Secure Booking</h4>
            <p>Bank-grade encryption</p>
          </div>
          <div class="trust-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <h4>24/7 On-Trip Support</h4>
            <p>We are with you every step</p>
          </div>
          <div class="trust-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <h4>Verified Expert Guides</h4>
            <p>Vetted professionals only</p>
          </div>
        </div>
      </section>
"""

with open("advanced_reviews.html", "r") as rfile:
    reviews = rfile.read()

# Build index.html
new_main_content = "\n" + (hero or "") + (partners or "") + (intent or "") + (featured or "") + (chips or "") + (themes or "") + (destinations or "") + (split or "") + (stats or "") + (trust or "") + (reviews or "") + (cta or "")

final_html = head_and_header + "\n<main>\n" + new_main_content + "\n</main>\n" + foot_content

with open("index.html", "w") as f:
    f.write(final_html)

print("index.html reconstructed!")
