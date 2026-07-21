const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('response', response => {
    if (response.status() >= 400) {
      console.log('HTTP ERROR:', response.url(), response.status());
    }
  });

  await page.goto('file://' + process.cwd() + '/index.html', { waitUntil: 'networkidle0' });
  
  console.log("Clicking login button...");
  await page.click('.login-btn');
  
  await page.waitForSelector('#auth-modal-overlay.active', { timeout: 2000 });
  console.log("Modal is open.");

  // Switch to sign up mode
  console.log("Switching to sign up...");
  await page.click('.auth-footer a');

  await page.type('#auth-email', 'test@example.com');
  await page.type('#auth-password', 'password123');
  await page.type('#auth-confirm-password', 'password123');
  await page.type('#auth-name', 'Test User');

  console.log("Submitting form...");
  await page.click('button.auth-btn');

  await new Promise(r => setTimeout(r, 2000));
  
  console.log("Current URL:", page.url());
  
  await browser.close();
})();
