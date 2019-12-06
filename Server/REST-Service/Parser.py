from http.server import BaseHTTPRequestHandler
from APIHandler import GETHandlerAPI

class RESTHandler(BaseHTTPRequestHandler):
  """A class to parse http request and response"""

  def do_HEAD(s):
    s.send_response(200)
    s.send_header("Content-type", "text/html")
    s.end_headers()

  def do_GET(s):
    """Respond to a GET request."""
    APIHandler = GETHandlerAPI.API(API = s.path)
    s.send_response(APIHandler.getResponse())
    s.send_header("Content-type", "text/html")
    s.end_headers()
    s.wfile.write(APIHandler.getData().encode())