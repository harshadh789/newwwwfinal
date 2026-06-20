import os

css_content = """
/* Utility classes */
.text-center {
  text-align: center !important;
}
"""

with open("/Users/campfly/Downloads/campfly-landing-page-main/styles.css", "a") as f:
    f.write(css_content)

print("Utility CSS appended.")
