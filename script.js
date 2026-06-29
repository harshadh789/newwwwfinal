/* ─── Dynamic Year ─── */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

/* ─── Mobile Menu Toggle ─── */
const menuToggle = document.getElementById("mobile-menu-toggle");
const hamburgerIcon = document.querySelector(".hamburger-icon");
const closeIcon = document.querySelector(".close-icon");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.style.display = isOpen ? "none" : "block";
      closeIcon.style.display = isOpen ? "block" : "none";
    }
    
    // Prevent background scrolling on mobile
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
  
  // Close menu when clicking a nav link
  const mainNavLinks = document.querySelectorAll(".main-nav a:not(.has-dropdown)");
  mainNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.style.display = "block";
        closeIcon.style.display = "none";
      }
      document.body.style.overflow = "";
    });
  });

  // Mobile Drawer Specific Logic
  const closeDrawerBtn = document.querySelector(".mobile-drawer-close");
  const drawerOverlay = document.querySelector(".mobile-drawer-overlay");
  const drawerLinks = document.querySelectorAll(".mobile-drawer-nav a");

  function closeMobileDrawer() {
    document.body.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.style.display = "block";
      closeIcon.style.display = "none";
    }
    document.body.style.overflow = "";
  }

  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeMobileDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeMobileDrawer);
  drawerLinks.forEach(link => link.addEventListener("click", closeMobileDrawer));

  // Reset menu state when navigating via browser Back/Forward (BFCache)
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      closeMobileDrawer();
    }
  });

  // Handle mega-menu toggle on mobile
  const hasDropdowns = document.querySelectorAll(".has-dropdown");
  hasDropdowns.forEach(link => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 760) {
        e.preventDefault();
        link.classList.toggle("active");
      }
    });
  });
}

/* ─── Search + Chips ─── */
const searchInput = document.getElementById("site-search");
const chips = Array.from(document.querySelectorAll(".chip"));
const plannerForm = document.getElementById("planner");

function openWhatsApp(message) {
  window.location.href = `https://wa.me/918891999253?text=${encodeURIComponent(message)}`;
}

if (searchInput) {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `packages.html?dest=${encodeURIComponent(query)}`;
      }
    }
  });

  if (chips.length) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();

      chips.forEach((chip) => {
        const isMatch = query && chip.textContent.toLowerCase().includes(query);
        chip.classList.toggle("active", Boolean(isMatch));
      });

      if (!query) {
        chips.forEach((chip, index) => chip.classList.toggle("active", index === 0));
      }
    });

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const destination = chip.textContent.trim();

        if (searchInput) {
          searchInput.value = destination === "Explore" ? "" : destination;
          searchInput.dispatchEvent(new Event("input"));
        }

        if (plannerForm && destination !== "Explore") {
          const destinationField = plannerForm.elements.destination;
          destinationField.value = destination;
          plannerForm.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });
  }
}

/* ─── Tab Switcher ─── */
const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
const panels = Array.from(document.querySelectorAll(".panel"));

function setActiveTab(targetId) {
  tabButtons.forEach((button) => {
    const isMatch = button.dataset.tab === targetId;
    button.classList.toggle("is-active", isMatch);
    button.setAttribute("aria-selected", isMatch ? "true" : "false");
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === targetId);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.tab;
    if (targetId) setActiveTab(targetId);
  });
});

/* ─── Currency Button ─── */
const currencyButton = document.querySelector("[data-currency-button]");
if (currencyButton) {
  currencyButton.addEventListener("click", () => {
    alert("All package prices are currently shown in Indian rupees.");
  });
}
/* ─── Newsletter ─── */
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const btn = newsletterForm.querySelector("button");
    const originalText = btn.textContent;
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    
    btn.textContent = "Subscribing...";
    btn.disabled = true;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "f8b483a6-fa92-42b8-8584-ec89012908c1",
          email: emailInput.value,
          subject: "New Newsletter Subscriber"
        })
      });

      if (response.status === 200) {
        btn.textContent = "Subscribed!";
        btn.style.background = "var(--brand-dark)";
      } else {
        btn.textContent = "Error!";
      }
    } catch (error) {
      console.log(error);
      btn.textContent = "Error!";
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = "";
      btn.disabled = false;
      newsletterForm.reset();
    }, 2500);
  });
}

/* ─── Planner Form ─── */
if (plannerForm) {
  plannerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(plannerForm);
    const destination = formData.get("destination") || "a destination";
    const month = formData.get("month") || "my travel month";
    const style = formData.get("style") || "holiday";
    const message = `Hi Campfly, I want a ${style} itinerary for ${destination} around ${month}.`;

    openWhatsApp(message);
  });
}

/* ─── Package Buttons ─── */
const packageButtons = document.querySelectorAll(".package-button");
packageButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const pkg = btn.dataset.package || "a package";
    const message = `Hi Campfly, I'm interested in booking the "${pkg}" package. Please share the details!`;
    openWhatsApp(message);
  });
});

/* ─── Header Smart Scroll ─── */
const header = document.querySelector(".site-header");
if (header) {
  let lastScroll = 0;
  const onScroll = () => {
    const scrollY = window.scrollY;
    header.classList.toggle("scrolled", scrollY > 10);
    lastScroll = scrollY;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ─── Scroll Reveal (IntersectionObserver) ─── */
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  // Fallback: make everything visible immediately
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

/* ─── Stats Counter Animation ─── */
function animateCounter(el, target, suffix) {
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    el.textContent = current.toLocaleString("en-IN") + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statsSection = document.querySelector(".stats-grid");
if (statsSection && "IntersectionObserver" in window) {
  let statsAnimated = false;
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          const statEls = statsSection.querySelectorAll("h3");
          statEls.forEach((h3) => {
            const raw = h3.textContent.trim();
            // Parse: "22L+" → 22, "650+" → 650, "4.8/5" → skip, "24/7" → skip
            if (raw.includes("L+")) {
              animateCounter(h3, parseInt(raw), "L+");
            } else if (raw.includes("+") && !raw.includes("/")) {
              animateCounter(h3, parseInt(raw), "+");
            }
          });
          statsObserver.unobserve(statsSection);
        }
      });
    },
    { threshold: 0.3 }
  );
  statsObserver.observe(statsSection);
}

/* ─── Newsletter Form ─── */
const newsletterForms = document.querySelectorAll(".newsletter-form");
newsletterForms.forEach(form => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value;
    const originalText = btn.textContent;
    
    btn.textContent = "Please wait...";
    btn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "f8b483a6-fa92-42b8-8584-ec89012908c1",
          subject: "New Newsletter Subscriber (Campfly)",
          email: email
        })
      });
      
      if (response.ok) {
        btn.textContent = "Subscribed!";
        btn.style.backgroundColor = "#16a34a"; // Success green
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = "";
          btn.disabled = false;
        }, 3000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      btn.textContent = "Error!";
      btn.style.backgroundColor = "#dc2626"; // Error red
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = "";
        btn.disabled = false;
      }, 3000);
    }
  });
});


// FAQ Accordion Logic (Contact Page)
document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all other accordions (optional, but good UX)
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle the clicked one
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});

/* ─── Scroll to Top Button (Dynamic) ─── */
document.addEventListener("DOMContentLoaded", () => {
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.id = "scroll-to-top";
  scrollTopBtn.setAttribute("aria-label", "Scroll to top");
  scrollTopBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
  document.body.appendChild(scrollTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }, { passive: true });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
