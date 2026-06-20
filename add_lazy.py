import re

with open('index.html', 'r') as f:
    content = f.read()

# Split before and after hero to avoid lazy loading the hero or header images
parts = content.split('<section class="tourism-partners"')
if len(parts) == 2:
    header_part = parts[0]
    rest_part = parts[1]
    
    # Add loading="lazy" to all <img tags in the rest of the page that don't have it
    def replace_img(match):
        img_tag = match.group(0)
        if 'loading="lazy"' not in img_tag:
            return img_tag.replace('<img', '<img loading="lazy"')
        return img_tag

    new_rest_part = re.sub(r'<img[^>]+>', replace_img, rest_part)
    
    with open('index.html', 'w') as f:
        f.write(header_part + '<section class="tourism-partners"' + new_rest_part)
    print("Added lazy loading to images.")
else:
    print("Could not find split point.")
