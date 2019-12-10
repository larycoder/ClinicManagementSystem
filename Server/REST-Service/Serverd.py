import sys
import os

sys.path.append(os.path.dirname(os.path.realpath(__file__)) + "/APIHandler")
sys.path.append(os.path.dirname(os.path.realpath(__file__)) + "/../ServerController/login")

import time
from http.server import HTTPServer
from Parser import RESTHandler as handler
from ClinicDBManager import CreateDbConnection

HOST_NAME = ''
PORT_NUMBER = 5000

ClinicDBManager = CreateDbConnection()
handler.DBConnection = ClinicDBManager

server_class = HTTPServer
httpd = server_class((HOST_NAME, PORT_NUMBER), handler)
print(time.asctime(), "Server Starts - %s:%s" % (HOST_NAME, PORT_NUMBER))
try:
  httpd.serve_forever()
except KeyboardInterrupt:
  pass

ClinicDBManager.close_connection()
httpd.server_close()
print(time.asctime(), "Server Stops - %s:%s" % (HOST_NAME, PORT_NUMBER))