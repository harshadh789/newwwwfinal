import re

with open("last_seen_css.txt", "r") as f:
    lines = f.readlines()

css_lines = []
for line in lines:
    match = re.match(r'^\d+:\s?(.*)', line)
    if match:
        css_lines.append(match.group(1))

with open("styles_recovered.css", "w") as f:
    f.write("\n".join(css_lines))

print(f"Recovered CSS lines: {len(css_lines)}")
