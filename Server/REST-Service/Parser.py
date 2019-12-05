from http.server import BaseHTTPRequestHandler


class RESTHandler(BaseHTTPRequestHandler):
  def do_HEAD(s):
    s.send_response(200)
    s.send_header("Content-type", "text/html")
    s.end_headers()
  def do_GET(s):
    """Respond to a GET request."""
    s.send_response(200)
    s.send_header("Content-type", "text/html")
    s.end_headers()
    s.wfile.write("<html><head><title>Title goes here.</title></head>".encode())
    s.wfile.write("<body><p>This is Clinic Management System Server</p>".encode())
    # If someone went to "http://something.somewhere.net/foo/bar/",
    # then s.path equals "/foo/bar/".
    s.wfile.write(("<p>You accessed path: %s</p>" % s.path).encode())
    s.wfile.write("</body></html>".encode())