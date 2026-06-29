
let currentAvatarUrl = null;

document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('campfly_user');
  if (!user) {
    // Not logged in, redirect to index
    window.location.href = '/';
    return;
  }

  loadUserProfile();
  loadInquiries();
  loadWishlist();

  const profileSaveBtn = document.getElementById('profile-save-btn');
  if (profileSaveBtn) {
    profileSaveBtn.addEventListener('click', updateProfile);
  }

  const avatarUpload = document.getElementById('profile-avatar-upload');
  if (avatarUpload) {
    avatarUpload.addEventListener('change', handleAvatarUpload);
  }
});

function handleAvatarUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    currentAvatarUrl = event.target.result;
    const previewEl = document.getElementById('profile-avatar-preview');
    if (previewEl) {
      previewEl.innerHTML = `<img src="${currentAvatarUrl}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    }
  };
  reader.readAsDataURL(file);
}

async function loadUserProfile() {
  try {
    const res = await fetch('http://localhost:5001/api/v1/users/me', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    if (res.ok) {
      const user = await res.json();
      currentAvatarUrl = user.avatarUrl || null;
      
      // Update sidebar
      const fallbackInitial = user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U';
      const avatarHtml = user.avatarUrl 
        ? `<img src="${user.avatarUrl}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">` 
        : fallbackInitial;

      const avatarEl = document.getElementById('dash-user-avatar');
      if (avatarEl) {
        avatarEl.innerHTML = avatarHtml;
      }
      
      const nameEl = document.getElementById('dash-user-name');
      if (nameEl) nameEl.textContent = user.fullName || 'User';
      
      const emailEl = document.getElementById('dash-user-email');
      if (emailEl) emailEl.textContent = user.email;

      // Update Form Preview
      const previewEl = document.getElementById('profile-avatar-preview');
      if (previewEl) {
         previewEl.innerHTML = avatarHtml;
      }

      // Update Profile Tab Inputs
      const fNameEl = document.getElementById('profile-fullname');
      if (fNameEl) fNameEl.value = user.fullName || '';

      const fEmailEl = document.getElementById('profile-email');
      if (fEmailEl) fEmailEl.value = user.email || '';

      const fMobileEl = document.getElementById('profile-mobile');
      if (fMobileEl) fMobileEl.value = user.mobile || '';

      const fDobEl = document.getElementById('profile-dob');
      if (fDobEl && user.dob) {
        fDobEl.value = user.dob.split('T')[0];
      }

      const fCityEl = document.getElementById('profile-city');
      if (fCityEl) fCityEl.value = user.city || '';

      const fCountryEl = document.getElementById('profile-country');
      if (fCountryEl) fCountryEl.value = user.country || '';
    }
  } catch (error) {
    console.error('Failed to load profile', error);
  }
}

async function updateProfile() {
  const msgEl = document.getElementById('profile-save-msg');
  msgEl.textContent = 'Saving...';
  
  const body = {
    fullName: document.getElementById('profile-fullname').value,
    mobile: document.getElementById('profile-mobile').value,
    dob: document.getElementById('profile-dob').value,
    city: document.getElementById('profile-city').value,
    country: document.getElementById('profile-country').value,
    avatarUrl: currentAvatarUrl
  };

  try {
    const res = await fetch('http://localhost:5001/api/v1/users/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body)
    });

    if (res.ok) {
      msgEl.textContent = 'Saved successfully!';
      loadUserProfile(); // refresh sidebar
      
      // Update localStorage so the navbar updates on next refresh
      const userStr = localStorage.getItem('campfly_user');
      if (userStr) {
         let lsUser = (function(){try{return JSON.parse(userStr)}catch(e){return null}})();
         lsUser.name = body.fullName || 'User';
         const fallbackInit = lsUser.name.charAt(0).toUpperCase();
         lsUser.avatar = body.avatarUrl 
            ? `<img src="${body.avatarUrl}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`
            : fallbackInit;
         localStorage.setItem('campfly_user', JSON.stringify(lsUser));
         
         // Dynamically update the top right navbar avatar so they don't have to refresh
         const userIconBtns = document.querySelectorAll('.user-icon-btn.logged-in');
         userIconBtns.forEach(btn => {
           btn.innerHTML = lsUser.avatar;
         });
         const dropdownNames = document.querySelectorAll('.user-dropdown-name');
         dropdownNames.forEach(el => el.textContent = lsUser.name);
      }
      
      setTimeout(() => { msgEl.textContent = ''; }, 3000);
    } else {
      msgEl.textContent = 'Failed to save.';
    }
  } catch (error) {
    console.error('Update profile error', error);
    msgEl.textContent = 'Error connecting to server.';
  }
}


async function loadInquiries() {
  const container = document.getElementById('inquiries-container');
  if (!container) return;

  try {
    const res = await fetch('http://localhost:5001/api/v1/content/inquiries/me', {
      credentials: 'include'
    });
    
    if (res.ok) {
      const inquiries = await res.json();
      if (inquiries.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <p>You haven't submitted any trip inquiries yet.</p>
            <a href="packages.html" class="solid">Explore Packages</a>
          </div>`;
      } else {
        container.innerHTML = inquiries.map(inq => `
          <div class="dash-card">
            <div class="dash-card-header">
              <h3>INQ-${inq.id.substring(0, 5).toUpperCase()}</h3>
              <span class="badge ${inq.status === 'PENDING' ? 'badge-pending' : ''}">${inq.status}</span>
            </div>
            <p><strong>Package:</strong> ${inq.package ? inq.package.title : 'Custom Trip'}<br>
            <strong>Submitted:</strong> ${new Date(inq.createdAt).toLocaleDateString()}<br>
            <strong>Message:</strong> "${inq.message}"</p>
            <div style="margin-top: 1rem;">
              <a href="https://wa.me/918891999253?text=Hi%20Campfly%2C%20following%20up%20on%20my%20inquiry%20INQ-${inq.id.substring(0, 5).toUpperCase()}" class="outline" style="padding: 0.5rem 1rem; font-size: 0.85rem;" target="_blank" rel="noopener noreferrer">Follow up on WhatsApp</a>
            </div>
          </div>
        `).join('');
      }
    }
  } catch (error) {
    console.error('Failed to load inquiries', error);
    container.innerHTML = '<p>Error loading inquiries.</p>';
  }
}

async function loadWishlist() {
  const homeContainer = document.getElementById('wishlist-container');
  const tabGrid = document.getElementById('dashboard-wishlist-grid');
  const tabEmpty = document.getElementById('dashboard-wishlist-empty');

  const userStr = localStorage.getItem('campfly_user');
  const token = userStr ? (function(){try{return JSON.parse(userStr)}catch(e){return null}})().token : localStorage.getItem('campfly_token');
  if (!token) return;

  try {
    const res = await fetch('http://localhost:5001/api/v1/user/wishlist', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (res.ok) {
      const items = await res.json();
      
      // Home Tab Recent Wishlist
      if (homeContainer) {
        if (items.length === 0) {
          homeContainer.innerHTML = `
            <div class="empty-state" style="padding: 2rem;">
              <p style="margin-bottom: 0;">Your wishlist is empty.</p>
            </div>`;
        } else {
          homeContainer.innerHTML = items.slice(0, 3).map(item => {
            let title = item.itemId;
            if (item.itemType === 'package' && typeof tourPackages !== 'undefined' && tourPackages[item.itemId]) {
              title = tourPackages[item.itemId].title;
            } else if (item.itemType === 'destination') {
              title = item.itemId.charAt(0).toUpperCase() + item.itemId.slice(1);
            }
            return `
            <div style="padding: 1rem; border-bottom: 1px solid var(--line);">
              <h4 style="margin:0 0 0.25rem 0;">${title}</h4>
              <p style="margin:0; font-size: 0.85rem; color: var(--text-secondary);">Added on ${new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
          `}).join('');
        }
      }

      // Main Wishlist Tab
      if (tabGrid && tabEmpty) {
        if (items.length === 0) {
          tabGrid.style.display = 'none';
          tabEmpty.style.display = 'block';
        } else {
          tabEmpty.style.display = 'none';
          tabGrid.style.display = 'grid';
          tabGrid.innerHTML = items.map(item => {
            let title = item.itemId;
            let img = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80';
            let link = '#';
            let meta = item.itemType === 'package' ? 'Package' : 'Destination';

            if (item.itemType === 'package' && typeof tourPackages !== 'undefined' && tourPackages[item.itemId]) {
              const p = tourPackages[item.itemId];
              title = p.title;
              img = p.images[0];
              link = `package-detail.html?id=${item.itemId}`;
              meta = `${p.duration} • Starts from INR ${p.price}`;
            } else if (item.itemType === 'destination') {
              title = item.itemId.charAt(0).toUpperCase() + item.itemId.slice(1);
              link = `packages.html?dest=${item.itemId}`;
              meta = `Explore ${title}`;
            }

            return `
              <a href="${link}" class="catalog-card" style="display: block; text-decoration: none; color: inherit;">
                <div class="cc-image" style="height: 180px;">
                  <img loading="lazy" src="${img}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;" />
                  <button type="button" class="wishlist-btn saved" data-type="${item.itemType}" data-id="${item.itemId}" data-saved-id="${item.id}" aria-label="Remove from Wishlist" style="position: absolute; top: 1rem; right: 1rem;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                </div>
                <div class="cc-content" style="padding: 1.25rem;">
                  <div class="cc-meta" style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem;">${meta}</div>
                  <h3 class="cc-title" style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">${title}</h3>
                </div>
              </a>
            `;
          }).join('');
        }
      }
    }
  } catch (error) {
    console.error('Failed to load wishlist', error);
  }
}
