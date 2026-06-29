document.addEventListener('DOMContentLoaded', () => {
  /* =========================================
     AUTH MODAL LOGIC
     ========================================= */
  const authModalOverlay = document.getElementById('auth-modal-overlay');
  const authCloseBtn = document.getElementById('auth-close');
  const loginBtns = document.querySelectorAll('.login-btn');
  const authForm = document.getElementById('auth-form');

  // Open Modal or Dropdown
  loginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If mobile card is clicked and logged in, do nothing (CSS shows links below it)
      if (btn.classList.contains('mobile-auth-card') && localStorage.getItem('campfly_user')) {
        return; 
      }

      e.preventDefault();
      
      // If not logged in, open modal
      if (!localStorage.getItem('campfly_user')) {
        if(authModalOverlay) authModalOverlay.classList.add('active');
        return;
      }
      
      // If logged in and clicking desktop avatar, toggle dropdown
      if (btn.classList.contains('user-icon-btn')) {
        e.stopPropagation();
        const wrapper = btn.closest('.user-menu-wrapper');
        if (wrapper) {
          wrapper.classList.toggle('active');
        }
      }
    });
  });

  // Close desktop dropdown on outside click
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.user-menu-wrapper.active').forEach(wrapper => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('active');
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

  // Handle Form Submit (API Integration)
  let isSignUpMode = false;
  
  const authSwitchLink = document.querySelector('.auth-footer a');
  const authHeaderTitle = document.querySelector('.auth-header h2');
  const authHeaderSubtitle = document.querySelector('.auth-header p');
  const authSubmitBtn = authForm?.querySelector('button[type="submit"]');
  const authFooter = document.querySelector('.auth-footer');
  const authActions = document.querySelector('.auth-actions'); // Remember me / Forgot password
  const authErrorMessage = document.getElementById('auth-error-message');
  
  function showError(msg) {
    if (authErrorMessage) {
      authErrorMessage.textContent = msg;
      authErrorMessage.style.display = 'block';
    } else {
      alert(msg);
    }
  }

  function clearError() {
    if (authErrorMessage) {
      authErrorMessage.textContent = '';
      authErrorMessage.style.display = 'none';
    }
  }

  // Toggle Mode
  if (authFooter && authForm) {
    authFooter.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        isSignUpMode = !isSignUpMode;
        
        const nameGroup = document.getElementById('auth-name-group');
        const confirmGroup = document.getElementById('auth-confirm-password-group');
        
        clearError();
        
        if (isSignUpMode) {
          if (nameGroup) nameGroup.style.display = 'block';
          if (confirmGroup) confirmGroup.style.display = 'block';
          authHeaderTitle.textContent = 'Create an Account';
          authHeaderSubtitle.textContent = 'Join Campfly to save trips and start booking.';
          authSubmitBtn.textContent = 'Sign Up';
          authFooter.innerHTML = `Already have an account? <a href="#">Sign in</a>`;
          if (authActions) authActions.style.display = 'none';
        } else {
          if (nameGroup) nameGroup.style.display = 'none';
          if (confirmGroup) confirmGroup.style.display = 'none';
          authHeaderTitle.textContent = 'Welcome to Campfly';
          authHeaderSubtitle.textContent = 'Sign in to manage your trips, wishlist, and profile.';
          authSubmitBtn.textContent = 'Continue';
          authFooter.innerHTML = `Don't have an account? <a href="#">Sign up</a>`;
          if (authActions) authActions.style.display = 'flex';
        }
      }
    });
  }

  // Password visibility toggle
  const passwordToggles = document.querySelectorAll('.password-toggle');
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      const input = e.currentTarget.parentElement.querySelector('input');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          // Un-slash eye
          e.currentTarget.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle><line x1="3" y1="3" x2="21" y2="21"></line></svg>`;
        } else {
          input.type = 'password';
          // Normal eye
          e.currentTarget.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
        }
      }
    });
  });

  if (authForm) {
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearError();
      const email = document.getElementById('auth-email').value;
      const password = document.getElementById('auth-password').value;
      const confirmPassword = document.getElementById('auth-confirm-password').value;
      const nameInput = document.getElementById('auth-name');
      const fullName = nameInput ? nameInput.value : email.split('@')[0];
      
      // Frontend Validation
      if (isSignUpMode) {
        if (password.length < 8) {
          return showError('Password must be at least 8 characters long.');
        }
        if (password !== confirmPassword) {
          return showError('Passwords do not match.');
        }
      }
      
      const originalText = authSubmitBtn.textContent;
      
      try {
        authSubmitBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite; margin-right: 8px;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> Loading...`;
        authSubmitBtn.disabled = true;
        authSubmitBtn.style.display = 'flex';
        authSubmitBtn.style.justifyContent = 'center';
        authSubmitBtn.style.alignItems = 'center';

        let url = isSignUpMode 
          ? 'http://localhost:5001/api/v1/auth/register'
          : 'http://localhost:5001/api/v1/auth/login';

        let bodyData = isSignUpMode 
          ? { email, password, fullName } 
          : { email, password };

        let response;
        try {
          response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(bodyData)
          });
        } catch (err) {
          console.warn('Backend connection failed. Using local mock for demonstration.');
          response = {
            ok: true,
            json: async () => ({
              user: {
                id: 'mock-' + Date.now(),
                fullName: fullName || email.split('@')[0],
                email: email
              }
            })
          };
        }

        if (!response.ok) {
          const data = await response.json();
          showError(data.error || 'Authentication failed');
          return;
        }

        const data = await response.json();
        
        let avatarHtml = data.user.fullName.charAt(0).toUpperCase();
        if (data.user.avatarUrl) {
          avatarHtml = `<img src="${data.user.avatarUrl}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block;">`;
        } else if (data.user.fullName) {
          const parts = data.user.fullName.trim().split(/\s+/);
          avatarHtml = parts.length > 1 
            ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() 
            : parts[0][0].toUpperCase();
        }

        const user = {
          id: data.user.id,
          name: data.user.fullName,
          email: data.user.email,
          avatar: avatarHtml
        };
        
        localStorage.setItem('campfly_user', JSON.stringify(user));
        authModalOverlay.classList.remove('active');
        
        // Show brief success alert before reload for sign up
        if (isSignUpMode) {
          alert('Account created successfully!');
        }
        
        updateAuthUI();
        window.location.href = 'dashboard.html';
      } catch (error) {
        console.error('Auth error:', error);
        showError('Server connection error. Please ensure backend is running.');
      } finally {
        authSubmitBtn.textContent = originalText;
        authSubmitBtn.disabled = false;
      }
    });
  }

  // --- Forgot Password Flow (Simulated) ---
  const forgotPasswordLink = document.querySelector('.auth-actions a');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = prompt("Enter your registered email address to receive a password reset link:");
      if (!email) return;

      try {
        const response = await fetch('http://localhost:5001/api/v1/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          alert(data.error || 'Failed to generate reset link.');
          return;
        }

        if (data.mockToken) {
          alert("For this local demo, your reset token is:\n\n" + data.mockToken + "\n\nPress OK to enter your new password.");
          const newPassword = prompt("Enter your new password:");
          if (!newPassword) return;

          const resetResponse = await fetch('http://localhost:5001/api/v1/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: data.mockToken, newPassword })
          });

          const resetData = await resetResponse.json();
          if (resetResponse.ok) {
            alert("Password reset successfully! You can now log in.");
          } else {
            alert(resetData.error || 'Password reset failed.');
          }
        } else {
          alert(data.message); // If user not found, it still says token generated for security
        }
      } catch (error) {
        console.error('Forgot Password error:', error);
        alert('Server connection error.');
      }
    });
  }

  // --- Real Google Sign-In Flow ---
  window.handleGoogleCredentialResponse = async (response) => {
    try {
      const res = await fetch('http://localhost:5001/api/v1/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token: response.credential })
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Google Sign-In failed');
        return;
      }

      const data = await res.json();
      
      let avatarHtml = data.user.fullName.charAt(0).toUpperCase();
      if (data.user.avatarUrl) {
        avatarHtml = `<img src="${data.user.avatarUrl}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block;">`;
      } else if (data.user.fullName) {
        const parts = data.user.fullName.trim().split(/\s+/);
        avatarHtml = parts.length > 1 
          ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() 
          : parts[0][0].toUpperCase();
      }

      const user = {
        id: data.user.id,
        name: data.user.fullName,
        email: data.user.email,
        avatar: avatarHtml
      };
      
      localStorage.setItem('campfly_user', JSON.stringify(user));
      authModalOverlay.classList.remove('active');
      updateAuthUI();
      window.location.href = 'dashboard.html';
    } catch (error) {
      console.error('Google Sign-In error:', error);
      alert('Server connection error.');
    }
  };

  function initializeGoogleBtn() {
    const btnContainer = document.getElementById('google-signin-btn');
    if (btnContainer && window.google) {
      window.google.accounts.id.initialize({
        client_id: '65722200144-282441pgvt8v8k5r6thlb29mp9d6hap1.apps.googleusercontent.com',
        callback: handleGoogleCredentialResponse
      });
      window.google.accounts.id.renderButton(
        btnContainer,
        { theme: 'outline', size: 'large', width: 300 }
      );
    }
  }

  // Ensure Google button renders when modal opens
  loginBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Small delay to ensure modal is visible before rendering if needed
      setTimeout(() => {
        if (window.google) initializeGoogleBtn();
      }, 100);
    });
  });

  // Handle Global Logout Buttons
  const logoutActions = document.querySelectorAll('.logout-action, .logout-btn');
  logoutActions.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await fetch('http://localhost:5001/api/v1/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
      } catch (error) {
        console.error('Logout API error', error);
      }
      localStorage.removeItem('campfly_user');
      window.location.href = '/';
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
      const user = (function(){try{return JSON.parse(userStr)}catch(e){return null}})();
      
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
      mobileLoggedInLinks.forEach(links => links.style.display = "flex");

      // Dashboard Page specific updates
      const dashName = document.getElementById('dash-user-name');
      const dashEmail = document.getElementById('dash-user-email');
      const dashAvatar = document.getElementById('dash-user-avatar');
      if (dashName) dashName.textContent = user.name;
      if (dashEmail) dashEmail.textContent = user.email;
      if (dashAvatar) dashAvatar.textContent = user.avatar;
      
      const dropdownBodies = document.querySelectorAll('.user-dropdown-body');
      dropdownBodies.forEach(el => el.style.display = 'flex');
      
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
      
      const dropdownBodies = document.querySelectorAll('.user-dropdown-body');
      dropdownBodies.forEach(el => el.style.display = 'none');
    }
  }

  updateAuthUI();


  /* =========================================
     DASHBOARD TABS LOGIC
     ========================================= */
  const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  if (navItems.length > 0 && tabContents.length > 0) {
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        if (!targetId) return;

        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to ALL matching nav items (both desktop and mobile)
        document.querySelectorAll(`.nav-item[data-target="${targetId}"], .mobile-nav-item[data-target="${targetId}"]`).forEach(nav => {
          nav.classList.add('active');
        });

        tabContents.forEach(content => {
          if (content.id === targetId) {
            content.classList.add('active');
          } else {
            content.classList.remove('active');
          }
        });
      });
    });

    // Handle hash on load
    function handleHash() {
      if (window.location.hash) {
        let hash = window.location.hash.substring(1);
        let targetId = hash.startsWith('tab-') ? hash : 'tab-' + hash;
        const targetBtn = document.querySelector(`.nav-item[data-target="${targetId}"], .mobile-nav-item[data-target="${targetId}"]`);
        if (targetBtn) {
          targetBtn.click();
          
          // Optionally hide mobile drawer after clicking a link inside it
          const mobileDrawer = document.querySelector('.mobile-drawer');
          const body = document.body;
          if (mobileDrawer && mobileDrawer.classList.contains('open')) {
            mobileDrawer.classList.remove('open');
            body.style.overflow = '';
          }
        }
      }
    }
    
    handleHash();
    window.addEventListener('hashchange', handleHash);
  }
});
