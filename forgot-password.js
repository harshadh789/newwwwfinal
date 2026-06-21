document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('forgot-password-form');
  const emailInput = document.getElementById('fp-email');
  const submitBtn = document.getElementById('fp-submit-btn');
  const statusMsg = document.getElementById('status-message');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      if (!email) return;

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      statusMsg.className = 'message-box';
      statusMsg.textContent = '';

      try {
        const res = await fetch('http://localhost:5001/api/v1/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (res.ok) {
          statusMsg.className = 'message-box success';
          statusMsg.textContent = data.message;
          // Note: In development we can check data.previewUrl in the console
          if (data.previewUrl) {
            console.log('Email preview URL:', data.previewUrl);
          }
          form.reset();
        } else {
          statusMsg.className = 'message-box error';
          statusMsg.textContent = data.error || 'An error occurred. Please try again.';
        }
      } catch (err) {
        console.error('Forgot password error:', err);
        statusMsg.className = 'message-box error';
        statusMsg.textContent = 'Unable to connect to the server. Please try again later.';
      } finally {
        submitBtn.textContent = 'Send Reset Link';
        submitBtn.disabled = false;
      }
    });
  }
});
