import time
from http.server import HTTPServer
from Parser import RESTHandler as handler

HOST_NAME = ''
PORT_NUMBER = 5000

server_class = HTTPServer
httpd = server_class((HOST_NAME, PORT_NUMBER), handler)
print(time.asctime(), "Server Starts - %s:%s" % (HOST_NAME, PORT_NUMBER))
try:
  httpd.serve_forever()
except KeyboardInterrupt:
  pass
httpd.server_close()
print(time.asctime(), "Server Stops - %s:%s" % (HOST_NAME, PORT_NUMBER))