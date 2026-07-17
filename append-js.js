const fs = require('fs');

const js = `
/* ==========================================================================
   BLOG UX LOGIC (Matheran Guide)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const blogMain = document.getElementById("blog-main");
  if (!blogMain) return; // Only run on blog pages

  // 1. Reading Progress
  const progressBar = document.getElementById("reading-progress-bar");
  window.addEventListener("scroll", () => {
    if (!progressBar) return;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });

  // 2. Dynamic TOC Generation
  const tocNav = document.getElementById("toc-nav");
  const headings = blogMain.querySelectorAll("h2, h3");
  
  if (tocNav && headings.length > 0) {
    headings.forEach((heading, index) => {
      // Skip Quick Answer headings inside callouts
      if (heading.closest('.callout')) return;

      if (!heading.id) {
        heading.id = 'heading-' + index;
      }
      
      const link = document.createElement("a");
      link.href = "#" + heading.id;
      link.textContent = heading.textContent;
      
      if (heading.tagName.toLowerCase() === "h3") {
        link.classList.add("toc-h3");
      }
      
      tocNav.appendChild(link);
    });
  }

  // 3. TOC Active State Highlighting (Intersection Observer)
  const tocLinks = tocNav ? tocNav.querySelectorAll("a") : [];
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80% 0px", // Trigger when heading is near top
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  headings.forEach(heading => {
    if (!heading.closest('.callout')) {
      observer.observe(heading);
    }
  });

  // 4. Premium Article Search
  const searchInput = document.getElementById("article-search");
  const clearBtn = document.getElementById("clear-search");
  const articleBlocks = blogMain.querySelectorAll("p, .attraction-block, h3, h4, .callout");
  
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      if (query.length > 0) {
        clearBtn.style.display = "block";
      } else {
        clearBtn.style.display = "none";
      }

      // If empty, reset everything
      if (query === "") {
        articleBlocks.forEach(block => {
          block.style.display = "";
          // Remove highlights (naive implementation for demo, resets innerHTML)
          // In a real app we'd use a text node walker, but since we didn't add <mark> tags dynamically yet, we just show them.
        });
        return;
      }

      // Hide/Show based on query
      articleBlocks.forEach(block => {
        // Don't hide parent containers if child matches
        const text = block.textContent.toLowerCase();
        if (text.includes(query)) {
          block.style.display = "";
          // To ensure parent blocks (.attraction-block) stay visible if their h4/p matches
          if (block.closest('.attraction-block')) {
            block.closest('.attraction-block').style.display = "";
          }
        } else {
          // Only hide if it's not a container of a matched element
          if (!block.querySelector || !block.querySelector(':not([style*="display: none"])')) {
             // For simplicity, we just hide paragraphs or h4s that don't match, 
             // but if it's a huge attraction block, hide the whole block if nothing inside matches.
             if (block.classList.contains('attraction-block')) {
               block.style.display = "none";
             } else if (block.tagName === 'P' || block.tagName === 'H4' || block.classList.contains('callout')) {
               block.style.display = "none";
             }
          }
        }
      });
    });

    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.dispatchEvent(new Event("input"));
    });
  }

  // 5. Mobile TOC Drawer Toggle
  const mobileTocBtn = document.getElementById("mobile-toc-toggle");
  const sidebar = document.getElementById("blog-sidebar");
  
  if (mobileTocBtn && sidebar) {
    mobileTocBtn.addEventListener("click", () => {
      // Simple toggle using inline styles for mobile drawer behavior
      if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
        sidebar.style.position = "sticky";
        mobileTocBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> Index';
      } else {
        sidebar.style.display = "block";
        sidebar.style.position = "fixed";
        sidebar.style.top = "0";
        sidebar.style.left = "0";
        sidebar.style.width = "100%";
        sidebar.style.height = "100%";
        sidebar.style.background = "var(--surface)";
        sidebar.style.zIndex = "9999";
        sidebar.style.padding = "2rem";
        sidebar.style.overflowY = "auto";
        mobileTocBtn.innerHTML = '&times; Close';
      }
    });
  }
});
`;

fs.appendFileSync('script.js', js);
console.log('Appended JS to script.js');
