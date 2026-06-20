import glob
import os

target_block = """        <section>
          <h4>Top Destinations</h4>
          <a href="packages.html?dest=kerala">Kerala Tour Packages</a>
          <a href="packages.html?dest=maldives">Maldives Tour Packages</a>
          <a href="packages.html?dest=dubai">Dubai Escapes</a>
          <a href="packages.html?dest=ladakh">Ladakh Adventures</a>
          <a href="packages.html?dest=vietnam">Vietnam Packages</a>
          <a href="packages.html?dest=northeast">North East India</a>
        </section>"""

replacement_block = """        <section>
          <h4>Top Destinations</h4>
          <a href="packages.html?dest=ladakh">Ladakh Adventures</a>
          <a href="destinations.html">View All Destinations</a>
          <!-- Temporarily hidden until dedicated pages are built
          <a href="packages.html?dest=kerala">Kerala Tour Packages</a>
          <a href="packages.html?dest=maldives">Maldives Tour Packages</a>
          <a href="packages.html?dest=dubai">Dubai Escapes</a>
          <a href="packages.html?dest=vietnam">Vietnam Packages</a>
          <a href="packages.html?dest=northeast">North East India</a>
          -->
        </section>"""

count = 0
for filepath in glob.glob("*.html"):
    with open(filepath, "r") as f:
        content = f.read()
    
    if target_block in content:
        new_content = content.replace(target_block, replacement_block)
        with open(filepath, "w") as f:
            f.write(new_content)
        count += 1

print(f"Replaced footer in {count} files.")
