from Tool import *
import json

# Predefine API
Status_pair = {-2:400, -1:404, 1:200, 2:201}

class API:
    """ A class to get request api and response correct data"""

    # Attribute hold DBConnection
    DBConnection = None

    # Attribute hold status of api
    Status = -1

    # Buffer keep response message
    ResponseBuf = "Sorry"

    def __init__(self, Connection = None):
      self.DBConnection = Connection # get Database handle
    
    ## handle GET method request ##
    def handleGET(self, path = '/'):
      if path == "/":
        self.Status, self.ResponseBuf = readFile(root + "/menu.html")
      elif path.split("/")[1] == "api":
        API = GETHandler(self.DBConnection)
        data = (path.split("/")[2]).split("?")
        self.Status, self.ResponseBuf = getattr(API, data[0])(data[1])
      else:
        self.Status, self.ResponseBuf = readFile(root + path)

    ## handle POST method request **
    def handlePOST(self, path = '/', data = ""):
      if path.split("/")[1] == "api":
        API = POSTHandler(self.DBConnection)
        self.Status, self.ResponseBuf = getattr(API, path.split("/")[2])(data)
      else:
        self.Status, self.ResponseBuf = readFile(root + "/error404.html")

    ## response method ##
    def getResponse(self):
      return Status_pair[self.Status]

    def getData(self):
      return self.ResponseBuf



class GETHandler():
  """ class hanler GET method """

  DBConnection = None

  def __init__(self, DBConnection):
    self.DBConnection = DBConnection

  def login(self, data):
    if self.DBConnection == None:
      print("DB Connection is not exit")
      return readFile(root + "/error404.html")
    else:
      JsonFile = String2Json(data)
      ID = self.DBConnection.verify_login(JsonFile)
      if ID == -1:
        return [1, json.dumps({'ID':ID})]
      else:
        print(json.dumps(ID))
        return [1, json.dumps(ID)]

class POSTHandler():
  """ class hanler POST method """

  DBConnection = None

  def __init__(self, DBConnection):
    self.DBConnection = DBConnection

  def register(self, data):
    if self.DBConnection == None:
      return readFile(root + "/error404.html")
    else:
      JsonFile = String2Json(data)
      check = self.DBConnection.add_new_user(JsonFile)
      if check == True:
        return [2, json.dumps("Your Register is succesful"]
      return [-2,"this user is already exit"]