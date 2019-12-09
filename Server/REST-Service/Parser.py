from http.server import BaseHTTPRequestHandler
from APIHandler import API
from login import CreateDbConnection

class RESTHandler(BaseHTTPRequestHandler):
  """A class to parse http request and response"""

  DBConnection = CreateDbConnection()

  def do_HEAD(s):
    s.send_response(200)
    s.send_header("Content-type", "text/html")
    s.end_headers()

  def do_GET(s):
    """Respond to a GET request."""
    APIHandler = API(API = s.path, Connection = s.DBConnection)
    s.send_response(APIHandler.getResponse())
    s.end_headers()
    s.wfile.write(APIHandler.getData().encode())