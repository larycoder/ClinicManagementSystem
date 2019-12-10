from FileHandler import readFile
from FileHandler import root
import json

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
      self.DBConnection = Connection # get Database handle
      if API == "/":
        self.Status, self.ResponseBuf = readFile(root + "/error404.html")
      elif API.split("/")[1] == "api":
        data = (API.split("/")[2]).split("?")
        self.Status, self.ResponseBuf = getattr(self, data[0])(data[1])
      else:
        self.Status, self.ResponseBuf = readFile(root + API)

    def getResponse(self):
      return Status_pair[self.Status]

    def getData(self):
      return self.ResponseBuf

    def String2Json(self, data):
      JsonFile = {} # dictionary to keep json object
      values = data.split("&")
      for value in values:
        value = value.split("=")
        JsonFile[value[0]] = value[1]
      return JsonFile

    ## method for handling API request ##
    def login(self, data):
      if self.DBConnection == None:
        return readFile(root + "/error404.html")
      else:
        JsonFile = self.String2Json(data)
        ID = None
        ID = self.DBConnection.verify_login(JsonFile)
        if ID == None:
          return readFile(root + "/error404.html")
        else:
          return [1, str(ID)]
