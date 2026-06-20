import os
from PIL import Image

def main():
    source_path = "assets/logo-source.png"
    target_path = "assets/logo-cropped.png"
    
    if not os.path.exists(source_path):
        print(f"Source file {source_path} not found.")
        return
        
    print("Opening source logo...")
    img = Image.open(source_path).convert("RGBA")
    pixels = img.load()
    
    width, height = img.size
    
    # We will convert white and near-white background pixels to transparent
    # To handle anti-aliasing smoothly, we can set alpha dynamically or use a threshold.
    # A threshold of 245 is safe for this logo since the logo itself has no white elements.
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if r > 245 and g > 245 and b > 245:
                # Make it fully transparent
                pixels[x, y] = (255, 255, 255, 0)
                
    # Get the bounding box of the non-transparent area
    bbox = img.getbbox()
    if bbox:
        # Add a tiny padding of 10px so the edges aren't cut too abruptly
        left, top, right, bottom = bbox
        left = max(0, left - 10)
        top = max(0, top - 10)
        right = min(width, right + 10)
        bottom = min(height, bottom + 10)
        
        cropped_img = img.crop((left, top, right, bottom))
        cropped_img.save(target_path, "PNG")
        print(f"Successfully cropped logo and saved to {target_path}")
        print(f"Original size: {width}x{height}, Cropped size: {cropped_img.width}x{cropped_img.height}")
    else:
        print("Error: Could not find non-transparent bounding box.")

if __name__ == "__main__":
    main()
