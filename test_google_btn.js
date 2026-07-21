const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto('file://' + process.cwd() + '/index.html', { waitUntil: 'networkidle0' });
  
  await page.evaluate(() => {
    // Mock window.google
    window.google = {
      accounts: {
        id: {
          initialize: () => console.log("Google initialize"),
          renderButton: () => console.log("Google renderButton")
        }
      }
    };
  });
  
  console.log("Clicking login button twice...");
  await page.click('.login-btn');
  await new Promise(r => setTimeout(r, 200));
  await page.click('.auth-close');
  await new Promise(r => setTimeout(r, 200));
  await page.click('.login-btn');
  await new Promise(r => setTimeout(r, 200));

  await browser.close();
})();
