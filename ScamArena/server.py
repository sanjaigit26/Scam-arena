import http.server
import socketserver
import os
import sys
import json
from urllib.parse import urlparse, parse_qs

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        # Support SPA fallback for clean routes
        parsed = urlparse(self.path)
        path = parsed.path
        
        # Check if file exists, else if not an extension like .css/.js/.json, serve index.html
        local_path = os.path.join(DIRECTORY, path.lstrip('/'))
        if not os.path.exists(local_path) and '.' not in os.path.basename(path):
            self.path = '/index.html'
        
        return super().do_GET()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    with socketserver.TCPServer(("", port), Handler) as httpd:
        print(f"Scam Arena server listening at http://localhost:{port}")
        httpd.serve_forever()
