document.addEventListener("DOMContentLoaded", () => {
  const API_URL = 'http://localhost:5001/api/v1/user/wishlist';
  let wishlistItems = [];

  // Fetch wishlist on load if logged in
  const fetchWishlist = async () => {
    const user = (function(){try{return JSON.parse(localStorage.getItem('campfly_user'))}catch(e){return null}})();
    if (!user) return;

    try {
      const response = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${user.token || localStorage.getItem('campfly_token')}` }
      });
      if (response.ok) {
        wishlistItems = await response.json();
        updateWishlistUI();
      }
    } catch (err) {
      console.error('Failed to fetch wishlist', err);
    }
  };

  // Update heart icons across the page
  const updateWishlistUI = () => {
    const btns = document.querySelectorAll('.wishlist-btn');
    btns.forEach(btn => {
      const type = btn.dataset.type;
      const id = btn.dataset.id;
      
      const isSaved = wishlistItems.find(item => item.itemType === type && item.itemId === id);
      
      if (isSaved) {
        btn.classList.add('saved');
        btn.dataset.savedId = isSaved.id; // Store DB id for deletion
        // Fill heart
        const svg = btn.querySelector('svg');
        if (svg) svg.innerHTML = `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>`;
      } else {
        btn.classList.remove('saved');
        delete btn.dataset.savedId;
        // Outline heart
        const svg = btn.querySelector('svg');
        if (svg) svg.innerHTML = `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>`;
      }
    });
  };

  // Handle heart click
  document.body.addEventListener('click', async (e) => {
    const btn = e.target.closest('.wishlist-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const user = (function(){try{return JSON.parse(localStorage.getItem('campfly_user'))}catch(e){return null}})();
    if (!user) {
      // Trigger auth modal
      const modal = document.getElementById('auth-modal-overlay');
      if (modal) {
        modal.classList.add('active');
      } else {
        window.location.href = '/#login';
      }
      return;
    }

    const type = btn.dataset.type;
    const id = btn.dataset.id;
    const isSaved = btn.classList.contains('saved');
    const token = user.token || localStorage.getItem('campfly_token');

    try {
      if (isSaved) {
        // Remove from wishlist
        const savedId = btn.dataset.savedId;
        if (!savedId) return;

        const res = await fetch(`${API_URL}/${savedId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          wishlistItems = wishlistItems.filter(item => item.id !== savedId);
          updateWishlistUI();
        }
      } else {
        // Add to wishlist
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ type, itemId: id })
        });

        if (res.ok) {
          const data = await res.json();
          wishlistItems.push(data.item);
          updateWishlistUI();
        }
      }
    } catch (err) {
      console.error('Wishlist action failed', err);
    }
  });

  // Expose methods to global so they can be called dynamically
  window.campflyFetchWishlist = fetchWishlist;
  window.campflyUpdateWishlistUI = updateWishlistUI;

  // Run on load
  fetchWishlist();
});
