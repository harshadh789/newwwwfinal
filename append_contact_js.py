import os

js_content = """

// FAQ Accordion Logic (Contact Page)
document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all other accordions (optional, but good UX)
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle the clicked one
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});
"""

with open("/Users/campfly/Downloads/campfly-landing-page-main/script.js", "a") as f:
    f.write(js_content)

print("JS appended to script.js successfully.")
