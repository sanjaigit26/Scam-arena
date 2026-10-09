import urllib.request
import re

with urllib.request.urlopen('http://127.0.0.1:3000/') as r:
    html = r.read().decode('utf-8')

css_files = re.findall(r'href=["\'](css/[^"\']+)["\']', html)
js_files = re.findall(r'src=["\'](js/[^"\']+)["\']', html)

all_files = css_files + js_files
print(f"Checking {len(all_files)} assets linked in index.html:")

failures = 0
for f in all_files:
    url = f"http://127.0.0.1:3000/{f}"
    try:
        with urllib.request.urlopen(url) as res:
            data = res.read()
            print(f"  [OK {res.status}] {f} ({len(data)} bytes)")
    except Exception as e:
        print(f"  [FAIL] {f}: {e}")
        failures += 1

if failures == 0:
    print(f"\nALL {len(all_files)} ASSETS VERIFIED SUCCESSFULLY WITH HTTP 200!")
else:
    print(f"\n{failures} ASSETS FAILED TO LOAD.")
