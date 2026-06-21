
let currentAvatarUrl = null;

document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('campfly_user');
  if (!user) {
    // Not logged in, redirect to index
    window.location.href = 'index.html';
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
         let lsUser = JSON.parse(userStr);
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
  const container = document.getElementById('wishlist-container');
  if (!container) return;

  try {
    const res = await fetch('http://localhost:5001/api/v1/users/wishlist', {
      credentials: 'include'
    });
    
    if (res.ok) {
      const items = await res.json();
      if (items.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <p>Your wishlist is empty.</p>
            <a href="destinations.html" class="outline">Browse Destinations</a>
          </div>`;
      } else {
        container.innerHTML = items.map(item => `
          <div class="dash-card">
            <h4>${item.package ? item.package.title : (item.destination ? item.destination.name : 'Unknown')}</h4>
            <p>Added on ${new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
        `).join('');
      }
    }
  } catch (error) {
    console.error('Failed to load wishlist', error);
    container.innerHTML = '<p>Error loading wishlist.</p>';
  }
}
