from FileHandler import readFile
from FileHandler import root

# Predefine API
Status_pair = {
  1:200,
  -1:404
}

class API:
    """ A class to get request api and response correct data"""

    # Attribute hold DBConnection
    DBConnection = None

    # Attribute hold status of api
    Status = -1

    # Buffer keep response message
    ResponseBuf = "Sorry"

    def __init__(self, API = '/', Connection = None):
      self.DBConnection = Connection
      if API == "/":
        self.Status, self.ResponseBuf = readFile(root + "/error4.html")
      else:
        self.Status, self.ResponseBuf = readFile(root + API)

    def getResponse(self):
      return Status_pair[self.Status]

    def getData(self):
      return self.ResponseBuf

    ### these are methods for handling each specific method ###