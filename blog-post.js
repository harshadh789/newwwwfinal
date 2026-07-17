document.addEventListener('DOMContentLoaded', () => {
  const blogData = window.blogData || [];
  
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  
  const headerContainer = document.getElementById('post-header-container');
  const heroImageContainer = document.getElementById('post-hero-image');
  const contentContainer = document.getElementById('post-content');
  const relatedGridContainer = document.getElementById('related-grid');

  if (!postId) {
    showNotFound();
    return;
  }

  const post = blogData.find(p => p.id === postId);

  if (!post) {
    showNotFound();
    return;
  }

  // Update Page Title
  document.title = `${post.title} | Campfly Blog`;

  // Render Header
  headerContainer.innerHTML = `
    <span class="post-tag">${post.category}</span>
    <h1 class="post-title">${post.title}</h1>
    <div class="post-meta">
      <div class="post-meta-item">
        <img src="assets/logo-cropped.png" alt="Campfly" style="height: 24px;">
        <span>${post.author}</span>
      </div>
      <div class="post-meta-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        <span>${post.date}</span>
      </div>
      <div class="post-meta-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <span>${post.readTime}</span>
      </div>
    </div>
  `;

  // Render Hero Image
  heroImageContainer.innerHTML = `
    <img loading="lazy" src="${post.image}" alt="${post.title}">
  `;

  // Render Content
  contentContainer.innerHTML = post.content;

  // Render Related Posts (Same category, max 3)
  const relatedPosts = blogData
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  if (relatedPosts.length > 0) {
    relatedGridContainer.innerHTML = relatedPosts.map(relPost => `
      <article class="blog-card">
        <img src="${relPost.image}" alt="${relPost.title}" loading="lazy">
        <div class="blog-card-content">
          <h3><a href="blog-post.html?id=${relPost.id}">${relPost.title}</a></h3>
          <a href="blog-post.html?id=${relPost.id}" class="read-more">Read Article <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
        </div>
      </article>
    `).join('');
  } else {
    // If no related posts in same category, just show the newest 3 not equal to this one
    const fallbackPosts = blogData
      .filter(p => p.id !== post.id)
      .slice(0, 3);
      
    relatedGridContainer.innerHTML = fallbackPosts.map(relPost => `
      <article class="blog-card">
        <img src="${relPost.image}" alt="${relPost.title}" loading="lazy">
        <div class="blog-card-content">
          <h3><a href="blog-post.html?id=${relPost.id}">${relPost.title}</a></h3>
          <a href="blog-post.html?id=${relPost.id}" class="read-more">Read Article <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
        </div>
      </article>
    `).join('');
  }

  // Generate Table of Contents
  const tocNav = document.getElementById('toc-nav');
  const tocWidget = document.getElementById('toc-widget');
  if (tocNav && tocWidget) {
    const headings = contentContainer.querySelectorAll('h2, h3');
    if (headings.length > 0) {
      headings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        heading.id = id;
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        link.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-h3' : 'toc-h2';
        tocNav.appendChild(link);
      });

      // ScrollSpy functionality
      const tocLinks = tocNav.querySelectorAll('a');
      window.addEventListener('scroll', () => {
        let current = '';
        headings.forEach(heading => {
          const headingTop = heading.getBoundingClientRect().top;
          if (headingTop < 150) {
            current = heading.id;
          }
        });

        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      });
    } else {
      tocWidget.style.display = 'none';
    }
  }

  function showNotFound() {
    headerContainer.innerHTML = `
      <h1 class="post-title" style="margin-top: 4rem;">Post Not Found</h1>
      <p>Sorry, we couldn't find the article you were looking for.</p>
      <a href="blog.html" class="solid action-link" style="margin-top: 2rem; display: inline-block;">Return to Blog</a>
    `;
    heroImageContainer.innerHTML = '';
    contentContainer.innerHTML = '';
    relatedGridContainer.innerHTML = '';
  }
});
