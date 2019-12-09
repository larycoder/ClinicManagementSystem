import sys
import os

sys.path.append(os.path.dirname(os.path.realpath(__file__)) + "/APIHandler")
sys.path.append(os.path.dirname(os.path.realpath(__file__)) + "/../ServerController/login")

import time
from http.server import HTTPServer
from Parser import RESTHandler as handler

HOST_NAME = ''
PORT_NUMBER = 5000

class http_server(HTTPServer):
  DBConnection = None
  def getDBConnection(self):
    return self.DBConnection
  def setDBConnection(self, Connection):
    self.DBConnection = Connection

server_class = http_server
httpd = server_class((HOST_NAME, PORT_NUMBER), handler)
print(time.asctime(), "Server Starts - %s:%s" % (HOST_NAME, PORT_NUMBER))
try:
  httpd.serve_forever()
except KeyboardInterrupt:
  pass

httpd.getDBConnection().close_connection()
httpd.server_close()
print(time.asctime(), "Server Stops - %s:%s" % (HOST_NAME, PORT_NUMBER))