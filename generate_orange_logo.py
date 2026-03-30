import urllib.request
import os
from PIL import Image

url = "https://www.ocstone.fr/wp-content/uploads/2025/03/logo-oc-stone-.png"
os.makedirs("images", exist_ok=True)
img_path = "images/logo-orange.png"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        with open(img_path, 'wb') as f:
            f.write(response.read())
            
    img = Image.open(img_path).convert("RGBA")
    data = img.getdata()
    new_data = []

    for item in data:
        r, g, b, a = item
        # Detect yellow colors
        if a > 0 and r > 150 and g > 130 and b < 100:
            new_data.append((255, 90, 0, a))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(img_path, "PNG")
    print("Success")
except Exception as e:
    print(f"Failed to process image: {e}")
