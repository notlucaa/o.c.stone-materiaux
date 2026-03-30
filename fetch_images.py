import urllib.request
import re

req = urllib.request.Request('https://www.ocstone.fr/le-groupe/', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    for img in set(re.findall(r'<img[^>]+src=\"([^\">]+)\"', html)):
        print(img)
except Exception as e:
    print(str(e))
