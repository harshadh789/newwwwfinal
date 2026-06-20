import re

with open('index.html', 'r') as f:
    html = f.read()

# Isolate <main> content
main_match = re.search(r'(<main>)(.*?)(</main>)', html, re.DOTALL)
if not main_match:
    print("Could not find <main>")
    exit(1)

main_content = main_match.group(2)

# Define regex patterns for each section
patterns = {
    'hero': r'(\s*<section class="hero">.*?</section>\n)',
    'partners': r'(\s*<!-- Trust Banner: Tourism Boards -->\s*<section class="tourism-partners".*?</section>\n)',
    'chips': r'(\s*<section class="chips-strip".*?</section>\n)',
    'intent': r'(\s*<!-- Travel Styles / Intent Selection -->\s*<section class="section intent-section".*?</section>\n)',
    'featured': r'(\s*<section class="section" id="featured">.*?</section>\n)',
    'themes': r'(\s*<section class="section" id="themes">.*?</section>\n)',
    'split': r'(\s*<section class="section">\s*<div class="container split-layout">.*?</section>\n)',
    'destinations': r'(\s*<section class="section" id="destinations">.*?</section>\n)',
    'cta': r'(\s*<section class="section">\s*<div class="container cta-band">.*?</section>\n)',
    'stats': r'(\s*<section class="section section-soft">.*?</section>\n)',
    'trust': r'(\s*<!-- Trust & Credibility Pillars -->\s*<section class="section trust-section".*?</section>\n)',
    'reviews': r'(\s*<section class="section" id="reviews">.*?</section>\n)',
}

sections = {}
for key, pattern in patterns.items():
    match = re.search(pattern, main_content, re.DOTALL)
    if match:
        sections[key] = match.group(1)
    else:
        print(f"Failed to find {key}")
        exit(1)

new_order = [
    'hero',
    'intent',
    'featured',
    'chips',
    'themes',
    'destinations',
    'split',
    'partners',
    'stats',
    'trust',
    'reviews',
    'cta'
]

new_main_content = "\n" + "".join(sections[key] for key in new_order)
new_html = html[:main_match.start(2)] + new_main_content + html[main_match.end(2):]

with open('index.html', 'w') as f:
    f.write(new_html)

print("Successfully rearranged sections in index.html!")
