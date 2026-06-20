import re

with open("index.html", "r") as f:
    html = f.read()

new_footer = """    <footer class="site-footer" id="contact">
      <div class="footer-top-band">
        <div class="container flex-band">
          <div class="engagement-newsletter">
            <div>
              <h4>Stay Inspired</h4>
              <p class="small">Join our newsletter for exclusive offers and travel tips.</p>
            </div>
            <form class="newsletter-form" id="newsletter-form">
              <input type="email" name="newsletter_email" required placeholder="Enter your email" />
              <button class="solid" type="submit">Subscribe</button>
            </form>
          </div>
          <div class="engagement-socials">
            <h4>Follow Us</h4>
            <div class="social-icons">
              <a href="#" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
              <a href="#" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              <a href="#" aria-label="X (Twitter)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
              <a href="#" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
            </div>
          </div>
        </div>
      </div>
      <div class="container footer-grid">
        <section class="footer-brand-col">
          <h4>Reach Us</h4>
          <div class="footer-contact-info">
            <p class="small"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> No. 39/2475, LR Towers, Mythri Road, Palarivattom, Ernakulam - 682025</p>
            <p class="small"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> <a href="tel:+919876543321">+91 98765 43321</a></p>
            <p class="small"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="M12 14l9-7-9 7z"></path></svg> <a href="mailto:hello@campfly.com">hello@campfly.com</a></p>
          </div>
        </section>
        <section>
          <h4>Support & Legal</h4>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact Us</a>
          <a href="#">Help Centre</a>
          <a href="#">FAQs</a>
          <a href="#">Blog</a>
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms & Conditions</a>
          <a href="cancellation.html">Cancellation Policy</a>
        </section>
        <section>
          <h4>Top Destinations</h4>
          <a href="packages.html?dest=kerala">Kerala Tour Packages</a>
          <a href="packages.html?dest=maldives">Maldives Tour Packages</a>
          <a href="packages.html?dest=dubai">Dubai Escapes</a>
          <a href="packages.html?dest=ladakh">Ladakh Adventures</a>
          <a href="packages.html?dest=vietnam">Vietnam Packages</a>
          <a href="packages.html?dest=northeast">North East India</a>
        </section>
        <section>
          <h4>Travel Styles</h4>
          <a href="packages.html?theme=honeymoon">Honeymoon Escapes</a>
          <a href="packages.html?theme=family">Family Plans</a>
          <a href="packages.html?theme=weekend">Weekend Getaways</a>
          <a href="packages.html?theme=adventure">Adventure Routes</a>
          <a href="packages.html?theme=luxury">Luxury Retreats</a>
          <a href="packages.html?theme=group">Group Tours</a>
        </section>
      </div>
      <div class="container footer-bottom">
        <p>© <span id="year"></span> Campfly, Inc. All rights reserved.</p>
        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>"""

updated_html = re.sub(r'<footer class="site-footer" id="contact">.*</footer>', new_footer, html, flags=re.DOTALL)

with open("index.html", "w") as f:
    f.write(updated_html)

print("Updated index.html footer")
