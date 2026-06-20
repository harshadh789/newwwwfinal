import re

html_main = """
    <main class="catalog-page">
      <header class="catalog-header">
        <div class="container">
          <h1 id="catalog-title">Explore All Tours</h1>
          <p id="catalog-subtitle">Discover our complete collection of premium experiences</p>
          <div class="catalog-search-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="catalog-search" placeholder="Search destinations, tours, or themes..." />
          </div>
        </div>
      </header>

      <div class="catalog-controls-container">
        <div class="container catalog-controls">
          <div class="catalog-filters" id="catalog-filters">
            <button class="filter-chip active" data-filter="all">All</button>
            <button class="filter-chip" data-filter="domestic">Domestic</button>
            <button class="filter-chip" data-filter="international">International</button>
            <button class="filter-chip" data-filter="honeymoon">Honeymoon</button>
            <button class="filter-chip" data-filter="adventure">Adventure</button>
            <button class="filter-chip" data-filter="luxury">Luxury</button>
            <button class="filter-chip" data-filter="family">Family</button>
          </div>
          <div class="catalog-sort">
            <label for="catalog-sort-select">Sort by:</label>
            <select id="catalog-sort-select">
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div class="catalog-main">
        <div class="container">
          <div class="cards-3" id="catalog-grid">
            <!-- Populated via script.js -->
          </div>
          <div class="catalog-empty-state" id="catalog-empty-state">
            <h3>No tours found</h3>
            <p>We couldn't find any tours matching your search criteria.</p>
            <button class="ghost action-btn" style="margin-top: 1.5rem;" id="reset-filters-btn">Reset Filters</button>
          </div>
          <div style="text-align: center; margin-top: 3rem;" id="load-more-container">
             <button class="ghost action-btn">Load More Packages</button>
          </div>
        </div>
      </div>
    </main>
"""

html_script = """
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        const grid = document.getElementById("catalog-grid");
        const emptyState = document.getElementById("catalog-empty-state");
        const loadMore = document.getElementById("load-more-container");
        const searchInput = document.getElementById("catalog-search");
        const sortSelect = document.getElementById("catalog-sort-select");
        const filterChips = document.querySelectorAll(".filter-chip");
        const resetBtn = document.getElementById("reset-filters-btn");
        const catalogTitle = document.getElementById("catalog-title");

        let currentFilter = 'all';
        let searchQuery = '';
        let currentSort = 'popular';

        // Parse initial URL params
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('type')) { currentFilter = urlParams.get('type'); }
        if (urlParams.get('theme')) { currentFilter = urlParams.get('theme'); }
        if (urlParams.get('dest')) { searchQuery = urlParams.get('dest').toLowerCase(); searchInput.value = urlParams.get('dest'); }

        // Set initial chip
        filterChips.forEach(chip => {
          chip.classList.remove('active');
          if (chip.dataset.filter === currentFilter) {
            chip.classList.add('active');
          }
        });

        // Function to extract numeric price
        const getPrice = (priceStr) => parseInt(priceStr.replace(/,/g, ''));

        const renderCatalog = () => {
          let keys = Object.keys(tourPackages);

          // 1. Apply Filter
          if (currentFilter !== 'all') {
            keys = keys.filter(k => {
              const p = tourPackages[k];
              const pType = p.type ? p.type.toLowerCase() : '';
              return pType === currentFilter || k.toLowerCase().includes(currentFilter) || p.title.toLowerCase().includes(currentFilter);
            });
            // Update title
            catalogTitle.textContent = currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1) + " Tours";
          } else {
            catalogTitle.textContent = "Explore All Tours";
          }

          // 2. Apply Search
          if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            keys = keys.filter(k => {
              const p = tourPackages[k];
              return p.title.toLowerCase().includes(query) || k.toLowerCase().includes(query) || (p.type && p.type.toLowerCase().includes(query));
            });
            catalogTitle.textContent = "Search Results";
          }

          // 3. Apply Sorting
          if (currentSort === 'price-low') {
            keys.sort((a, b) => getPrice(tourPackages[a].price) - getPrice(tourPackages[b].price));
          } else if (currentSort === 'price-high') {
            keys.sort((a, b) => getPrice(tourPackages[b].price) - getPrice(tourPackages[a].price));
          }
          // Default popular sorting keeps original object order which usually is fine.

          // 4. Render
          if (keys.length === 0) {
            grid.style.display = 'none';
            loadMore.style.display = 'none';
            emptyState.style.display = 'block';
          } else {
            grid.style.display = 'grid';
            emptyState.style.display = 'none';
            loadMore.style.display = keys.length > 6 ? 'block' : 'none'; // mock load more
            
            grid.innerHTML = keys.map(k => {
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
        };

        // Event Listeners
        searchInput.addEventListener('input', (e) => {
          searchQuery = e.target.value;
          renderCatalog();
        });

        sortSelect.addEventListener('change', (e) => {
          currentSort = e.target.value;
          renderCatalog();
        });

        filterChips.forEach(chip => {
          chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.dataset.filter;
            renderCatalog();
          });
        });

        resetBtn.addEventListener('click', () => {
          searchInput.value = '';
          searchQuery = '';
          currentFilter = 'all';
          currentSort = 'popular';
          sortSelect.value = 'popular';
          filterChips.forEach(c => c.classList.remove('active'));
          filterChips[0].classList.add('active'); // Set 'all' to active
          renderCatalog();
        });

        // Initial render
        renderCatalog();
      });
    </script>
"""

with open("/Users/campfly/Downloads/campfly-landing-page-main/packages.html", "r") as f:
    content = f.read()

# Replace <main>
content = re.sub(r'<main.*?</main>', html_main, content, flags=re.DOTALL)

# Replace <script> containing document.addEventListener("DOMContentLoaded"...
content = re.sub(r'<script>\s*// Load packages based on data.js.*?</script>', html_script, content, flags=re.DOTALL)

# Update css version to bust cache
content = re.sub(r'styles\.css\?v=\d+', 'styles.css?v=7', content)

with open("/Users/campfly/Downloads/campfly-landing-page-main/packages.html", "w") as f:
    f.write(content)

print("packages.html catalog logic injected")
