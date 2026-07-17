document.addEventListener('DOMContentLoaded', () => {
  const blogData = window.blogData || [];
  
  const featuredContainer = document.getElementById('featured-post-container');
  const gridContainer = document.getElementById('blog-grid');
  const searchInput = document.querySelector('.blog-search-input');
  const categoryLinks = document.querySelectorAll('.blog-cat');
  const loadMoreBtn = document.querySelector('.load-more-btn');

  let currentCategory = 'All Articles';
  let searchQuery = '';
  let currentLimit = 5; // 1 featured + 4 grid

  function renderPosts() {
    let filtered = blogData.filter(post => {
      const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = currentCategory === 'All Articles' || post.category === currentCategory;
      return matchSearch && matchCategory;
    });

    if (filtered.length === 0) {
      if (featuredContainer) featuredContainer.innerHTML = '';
      if (gridContainer) gridContainer.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--muted);">No articles found matching your criteria.</div>';
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      return;
    }

    const postsToShow = filtered.slice(0, currentLimit);

    // Render Featured (first item)
    const featured = postsToShow[0];
    if (featuredContainer) {
      featuredContainer.innerHTML = `
        <article class="featured-post">
          <img src="${featured.image}" alt="${featured.title}" class="featured-img" loading="lazy">
          <div class="featured-content">
            <div class="post-meta">
              <span class="post-tag">${featured.category}</span>
              <span>•</span>
              <span>${featured.readTime}</span>
              <span>•</span>
              <span>${featured.date}</span>
            </div>
            <h2><a href="blog/${featured.id}">${featured.title}</a></h2>
            <p>${featured.excerpt}</p>
            <a href="blog/${featured.id}" class="read-more">Read Full Article <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
          </div>
        </article>
      `;
    }

    // Render Grid (remaining items)
    const gridPosts = postsToShow.slice(1);
    if (gridContainer) {
      if (gridPosts.length > 0) {
        gridContainer.innerHTML = gridPosts.map(post => `
          <article class="blog-card">
            <img src="${post.image}" alt="${post.title}" loading="lazy">
            <div class="blog-card-content">
              <div class="post-meta">
                <span class="post-tag">${post.category}</span>
                <span>•</span>
                <span>${post.readTime}</span>
              </div>
              <h3><a href="blog/${post.id}">${post.title}</a></h3>
              <p>${post.excerpt}</p>
              <a href="blog/${post.id}" class="read-more">Read Article <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
            </div>
          </article>
        `).join('');
      } else {
        gridContainer.innerHTML = '';
      }
    }

    // Handle Load More visibility
    if (loadMoreBtn) {
      if (currentLimit >= filtered.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-block';
      }
    }
  }

  // Initial render
  renderPosts();

  // Load More functionality
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentLimit += 4;
      renderPosts();
    });
  }

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      currentLimit = 5; // Reset pagination on search
      renderPosts();
    });
  }

  // Category filtering
  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active state
      categoryLinks.forEach(l => l.classList.remove('active'));
      e.target.classList.add('active');

      currentCategory = e.target.textContent.trim();
      currentLimit = 5; // Reset pagination on category change
      renderPosts();
    });
  });
});
