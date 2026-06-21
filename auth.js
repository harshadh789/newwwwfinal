document.addEventListener('DOMContentLoaded', () => {
  /* =========================================
     AUTH MODAL LOGIC
     ========================================= */
  const authModalOverlay = document.getElementById('auth-modal-overlay');
  const authCloseBtn = document.getElementById('auth-close');
  const loginBtns = document.querySelectorAll('.login-btn');
  const authForm = document.getElementById('auth-form');

  // Open Modal
  loginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If we are clicking inside user dropdown, let the default happen
      if (btn.classList.contains('user-icon-btn') && localStorage.getItem('campfly_user')) {
        return; // Dropdown is handled by CSS hover
      }
      
      // If mobile card is clicked and logged in, do nothing (CSS shows links below it)
      if (btn.classList.contains('mobile-auth-card') && localStorage.getItem('campfly_user')) {
        return; 
      }

      e.preventDefault();
      // If not logged in, open modal
      if (!localStorage.getItem('campfly_user')) {
        if(authModalOverlay) authModalOverlay.classList.add('active');
      }
    });
  });

  // Close Modal
  if (authCloseBtn) {
    authCloseBtn.addEventListener('click', () => {
      authModalOverlay.classList.remove('active');
    });
  }
  
  if (authModalOverlay) {
    authModalOverlay.addEventListener('click', (e) => {
      if (e.target === authModalOverlay) {
        authModalOverlay.classList.remove('active');
      }
    });
  }

  // Handle Form Submit (Fake Login/Signup)
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-email').value;
      
      // Simulate login
      const user = {
        name: email.split('@')[0],
        email: email,
        avatar: email.charAt(0).toUpperCase()
      };
      
      localStorage.setItem('campfly_user', JSON.stringify(user));
      authModalOverlay.classList.remove('active');
      updateAuthUI();
      
      // If they logged in from somewhere else, redirect to dashboard
      window.location.href = 'dashboard.html';
    });
  }

  // Handle Global Logout Buttons
  const logoutActions = document.querySelectorAll('.logout-action');
  logoutActions.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('campfly_user');
      window.location.href = 'index.html';
    });
  });

  // Update UI based on auth state
  function updateAuthUI() {
    const userStr = localStorage.getItem('campfly_user');
    const mobileAuthCards = document.querySelectorAll('.mobile-auth-card');
    const mobileLoggedInLinks = document.querySelectorAll('.mobile-logged-in-links');
    const userIconBtns = document.querySelectorAll('.user-icon-btn');
    const dropdownNames = document.querySelectorAll('.user-dropdown-name');
    const dropdownEmails = document.querySelectorAll('.user-dropdown-email');
    
    if (userStr) {
      const user = JSON.parse(userStr);
      
      // Update Desktop Icon
      userIconBtns.forEach(btn => {
        btn.classList.add('logged-in');
        btn.innerHTML = user.avatar;
      });
      dropdownNames.forEach(el => el.textContent = user.name);
      dropdownEmails.forEach(el => el.textContent = user.email);
      
      // Update Mobile Card
      mobileAuthCards.forEach(card => {
        const avatar = card.querySelector('.mobile-auth-avatar');
        if(avatar) {
          avatar.classList.add('logged-in');
          avatar.innerHTML = user.avatar;
        }
        const title = card.querySelector('#mobile-nav-title');
        if(title) title.textContent = `Hi, ${user.name}`;
        const subtitle = card.querySelector('#mobile-nav-subtitle');
        if(subtitle) subtitle.textContent = "View Dashboard";
        const chevron = card.querySelector('.chevron');
        if(chevron) chevron.style.display = "none";
      });
      mobileLoggedInLinks.forEach(links => links.style.display = "block");

      // Dashboard Page specific updates
      const dashName = document.getElementById('dash-user-name');
      const dashEmail = document.getElementById('dash-user-email');
      const dashAvatar = document.getElementById('dash-user-avatar');
      if (dashName) dashName.textContent = user.name;
      if (dashEmail) dashEmail.textContent = user.email;
      if (dashAvatar) dashAvatar.textContent = user.avatar;
      
    } else {
      // Logged Out State
      userIconBtns.forEach(btn => {
        btn.classList.remove('logged-in');
        btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
      });
      dropdownNames.forEach(el => el.textContent = "Guest");
      dropdownEmails.forEach(el => el.textContent = "Sign in to manage trips");
      
      mobileAuthCards.forEach(card => {
        const avatar = card.querySelector('.mobile-auth-avatar');
        if(avatar) {
          avatar.classList.remove('logged-in');
          avatar.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
        }
        const title = card.querySelector('#mobile-nav-title');
        if(title) title.textContent = "Sign In / Join";
        const subtitle = card.querySelector('#mobile-nav-subtitle');
        if(subtitle) subtitle.textContent = "Manage your trips and wishlist";
        const chevron = card.querySelector('.chevron');
        if(chevron) chevron.style.display = "block";
      });
      mobileLoggedInLinks.forEach(links => links.style.display = "none");
    }
  }

  updateAuthUI();

  /* =========================================
     DASHBOARD TABS LOGIC
     ========================================= */
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  if (navItems.length > 0 && tabContents.length > 0) {
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (item.classList.contains('logout-btn')) {
          localStorage.removeItem('campfly_user');
          window.location.href = 'index.html';
          return;
        }

        const targetId = item.getAttribute('data-target');
        navItems.forEach(nav => nav.classList.remove('active'));
        document.querySelectorAll(`.nav-item[data-target="${targetId}"]`).forEach(nav => nav.classList.add('active'));

        tabContents.forEach(content => {
          if (content.id === targetId) {
            content.classList.add('active');
          } else {
            content.classList.remove('active');
          }
        });
      });
    });
  }
});
