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
      e.preventDefault();
      // If already logged in, redirect to dashboard
      if (localStorage.getItem('campfly_user')) {
        window.location.href = 'dashboard.html';
      } else {
        authModalOverlay.classList.add('active');
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

  // Update UI based on auth state
  function updateAuthUI() {
    const userStr = localStorage.getItem('campfly_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      // Change login buttons to Dashboard / Profile icon
      loginBtns.forEach(btn => {
        btn.textContent = 'Dashboard';
        btn.href = 'dashboard.html';
        btn.classList.add('logged-in');
      });
      
      // If we are on the dashboard page, populate user details
      const dashName = document.getElementById('dash-user-name');
      const dashEmail = document.getElementById('dash-user-email');
      const dashAvatar = document.getElementById('dash-user-avatar');
      
      if (dashName) dashName.textContent = user.name;
      if (dashEmail) dashEmail.textContent = user.email;
      if (dashAvatar) dashAvatar.textContent = user.avatar;
    } else {
      loginBtns.forEach(btn => {
        btn.textContent = 'Login';
        btn.href = '#';
        btn.classList.remove('logged-in');
      });
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
        // Handle Logout specially
        if (item.classList.contains('logout-btn')) {
          localStorage.removeItem('campfly_user');
          window.location.href = 'index.html';
          return;
        }

        const targetId = item.getAttribute('data-target');
        
        // Update active class on navs
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // If it's a mobile nav item, also update desktop nav items, and vice versa
        document.querySelectorAll(`.nav-item[data-target="${targetId}"]`).forEach(nav => nav.classList.add('active'));

        // Update active class on contents
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
