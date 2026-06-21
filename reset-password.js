document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('reset-password-form');
  const passwordInput = document.getElementById('rp-password');
  const confirmInput = document.getElementById('rp-confirm');
  const submitBtn = document.getElementById('rp-submit-btn');
  const statusMsg = document.getElementById('status-message');
  const strengthBar = document.getElementById('strength-bar');
  const strengthText = document.getElementById('strength-text');

  // Extract token from URL
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (!token) {
    showError('Invalid or missing reset token.');
    return;
  }

  // Validate token on load
  try {
    const res = await fetch(`http://localhost:5001/api/v1/auth/validate-reset-token?token=${token}`);
    const data = await res.json();
    
    if (res.ok) {
      // Token is valid, show the form
      form.style.display = 'block';
    } else {
      showError(data.error || 'This password reset link is invalid or has expired.');
    }
  } catch (err) {
    showError('Unable to connect to the server to validate token.');
  }

  function showError(msg) {
    statusMsg.className = 'message-box error';
    statusMsg.textContent = msg;
  }

  function showSuccess(msg) {
    statusMsg.className = 'message-box success';
    statusMsg.textContent = msg;
  }

  // Password Strength Logic
  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      const val = passwordInput.value;
      let strength = 0;
      
      if (val.length > 0) {
        if (val.length >= 8) strength += 1;
        if (/[A-Z]/.test(val)) strength += 1;
        if (/[0-9]/.test(val)) strength += 1;
        if (/[^A-Za-z0-9]/.test(val)) strength += 1;
      }
      
      let width = '0%';
      let color = '#e5e7eb'; // default grey
      let text = '';
      
      switch (strength) {
        case 1:
          width = '25%'; color = '#ef4444'; text = 'Weak'; break; // red
        case 2:
          width = '50%'; color = '#f59e0b'; text = 'Fair'; break; // yellow
        case 3:
          width = '75%'; color = '#3b82f6'; text = 'Good'; break; // blue
        case 4:
          width = '100%'; color = '#10b981'; text = 'Strong'; break; // green
      }
      
      strengthBar.style.width = width;
      strengthBar.style.backgroundColor = color;
      strengthText.textContent = text;
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const newPassword = passwordInput.value;
      const confirm = confirmInput.value;

      if (newPassword !== confirm) {
        showError('Passwords do not match.');
        return;
      }

      if (newPassword.length < 8) {
        showError('Password must be at least 8 characters long.');
        return;
      }

      submitBtn.textContent = 'Resetting...';
      submitBtn.disabled = true;
      statusMsg.style.display = 'none';

      try {
        const res = await fetch('http://localhost:5001/api/v1/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, newPassword })
        });

        const data = await res.json();

        if (res.ok) {
          form.style.display = 'none';
          showSuccess('Your password has been successfully reset. You can now login.');
          // Redirect to login after 3 seconds
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 3000);
        } else {
          showError(data.error || 'Failed to reset password.');
        }
      } catch (err) {
        console.error('Reset password error:', err);
        showError('Unable to connect to the server. Please try again later.');
      } finally {
        submitBtn.textContent = 'Reset Password';
        submitBtn.disabled = false;
      }
    });
  }
});
