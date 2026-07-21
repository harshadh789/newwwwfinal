const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('dialog', async dialog => {
    console.log("DIALOG:", dialog.message());
    await dialog.accept();
  });

  await page.goto('file://' + process.cwd() + '/index.html', { waitUntil: 'networkidle0' });
  
  await page.evaluate(async () => {
    // Open modal programmatically
    document.getElementById('auth-modal-overlay').classList.add('active');
    
    // Switch to sign up mode
    document.querySelector('.auth-footer a').click();

    document.getElementById('auth-email').value = 'test@example.com';
    document.getElementById('auth-password').value = 'password123';
    document.getElementById('auth-confirm-password').value = 'password123';
    document.getElementById('auth-name').value = 'Test User';
  });

  console.log("Clicking submit...");
  await page.click('button.auth-btn');

  await new Promise(r => setTimeout(r, 2000));
  
  console.log("Current URL:", page.url());
  
  await browser.close();
})();
