import re

with open("proper_recovered_index.html", "r") as f:
    html = f.read()

# Let's see what is inside proper_recovered_index.html
def has_section(name, html):
    return name in html

print(f"Has intent section: {has_section('intent-section', html)}")
print(f"Has trust section: {has_section('trust-section', html)}")
print(f"Has reviews section: {has_section('Traveler Reviews', html)}")
print(f"Has chips strip: {has_section('chips-strip', html)}")
print(f"Has themes section: {has_section('themes', html)}")

