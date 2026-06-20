import re

html_content = """
    <main class="packages-discovery-page">
      <!-- Premium Hero mirroring Homepage aesthetic -->
      <section class="section section-soft" style="padding-top: 6rem; padding-bottom: 3rem; text-align: center;">
        <div class="container" style="max-width: 800px;">
          <h1 id="packages-page-title" style="font-size: 3rem; font-weight: 800; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 1rem;">Discover Your Next Adventure</h1>
          <p id="packages-page-desc" style="font-size: 1.15rem; color: var(--muted); margin-bottom: 2rem;">Browse our hand-picked selection of premium experiences.</p>
          
          <div style="background: #fff; padding: 0.5rem; border-radius: 999px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); display: flex; align-items: center; max-width: 600px; margin: 0 auto 2rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 1rem; color: var(--muted);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Where do you want to go?" style="border: none; padding: 1rem; width: 100%; outline: none; font-size: 1rem; font-family: inherit; background: transparent; border-radius: 999px;" />
            <button class="solid" style="border-radius: 999px; padding: 0.8rem 2rem;">Search</button>
          </div>

          <!-- Quick Filters mirroring intent cards -->
          <div class="tab-system" style="justify-content: center; border-bottom: none;">
            <div class="tab-list" role="tablist" style="flex-wrap: wrap; justify-content: center; border-bottom: none; gap: 0.5rem;">
              <button class="tab-button is-active" role="tab" data-tab="all-tours" aria-selected="true" style="background: var(--surface); border: 1px solid var(--line); border-radius: 999px; margin: 0; padding: 0.5rem 1.25rem;">All Tours</button>
              <button class="tab-button" role="tab" data-tab="domestic-tours" aria-selected="false" style="background: var(--surface); border: 1px solid var(--line); border-radius: 999px; margin: 0; padding: 0.5rem 1.25rem;">Domestic</button>
              <button class="tab-button" role="tab" data-tab="international-tours" aria-selected="false" style="background: var(--surface); border: 1px solid var(--line); border-radius: 999px; margin: 0; padding: 0.5rem 1.25rem;">International</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Curated Section using Homepage Classes -->
      <section class="section" id="packages">
        <div class="container">
          <div class="section-head">
            <div>
              <span class="eyebrow">OUR CURATION</span>
              <h2>Handpicked Escapes</h2>
            </div>
          </div>

          <div class="cards-3" id="packages-grid">
            <!-- Populated via script.js -->
          </div>
          
          <div style="text-align: center; margin-top: 3rem;">
             <button class="ghost action-btn">Load More Packages</button>
          </div>
        </div>
      </section>
    </main>
"""

with open("packages.html", "r") as f:
    content = f.read()

# Replace <main>...</main>
new_content = re.sub(r'<main.*?</main>', html_content, content, flags=re.DOTALL)

with open("packages.html", "w") as f:
    f.write(new_content)

print("packages.html structure replaced")
