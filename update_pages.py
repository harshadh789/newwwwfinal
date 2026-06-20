import json

# We will create the 6 pages by copying packages.html and replacing the title and default searchQuery
destinations = {
    "kerala": "Kerala",
    "maldives": "Maldives",
    "dubai": "Dubai",
    "ladakh": "Ladakh",
    "vietnam": "Vietnam",
    "northeast": "North East India"
}

with open("packages.html", "r") as f:
    template = f.read()

for dest_key, dest_name in destinations.items():
    # Replace title
    page_content = template.replace("<title>Tour Packages | Campfly</title>", f"<title>{dest_name} Packages | Campfly</title>")
    
    # Replace header text
    page_content = page_content.replace('<h1 id="catalog-title">Explore All Tours</h1>', f'<h1 id="catalog-title">Explore {dest_name}</h1>')
    page_content = page_content.replace('<p id="catalog-subtitle">Discover our complete collection of premium experiences</p>', f'<p id="catalog-subtitle">Discover our handpicked packages for {dest_name}</p>')
    
    # Inject default search query for the specific destination
    # We replace let searchQuery = ''; with let searchQuery = 'dest_key';
    page_content = page_content.replace("let searchQuery = '';", f"let searchQuery = '{dest_key}';")
    
    # We should also ensure the script doesn't override the title back to "Search Results"
    page_content = page_content.replace('catalogTitle.textContent = "Search Results";', f'// catalogTitle.textContent = "Search Results";')
    page_content = page_content.replace('catalogTitle.textContent = "Explore All Tours";', f'// catalogTitle.textContent = "Explore All Tours";')
    page_content = page_content.replace('catalogTitle.textContent = currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1) + " Tours";', f'// replaced')

    with open(f"{dest_key}.html", "w") as f:
        f.write(page_content)
    print(f"Created {dest_key}.html")

