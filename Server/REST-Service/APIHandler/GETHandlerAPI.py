# Predefine API
Status_pair = {
  1:200,
  -1:404
}

# root directory of WEB server
root = "../../Client"

class API:
    """ A class to get request api and response correct data"""

    # Attribute hold DBConnection
    DBConnection = None

    # Attribute hold status of api
    Status = 1

    # Buffer keep response message
    ResponseBuf = "Sorry"

    def __init__(self, API = '/', Connection = None):
      self.DBConnection = Connection
      if API == "/":
        self.Status = self.readFile(root + "/Login/Login.html")
      else:
        self.Status = self.readFile(root + API)

    def getResponse(self):
      return Status_pair[self.Status]

    def getData(self):
      return self.ResponseBuf
    
    def readFile(self, string):
      # reference f for reading file
      f = None

      try:
        f = open(string)
        self.ResponseBuf = f.read()
        f.close()
        return 1
      except IOError:
        print("Error when processing file")
        if not f == None:
          print("Could not read file ", f)
          f.close()
        else:
          print("File is not exit")
        ErrorFile = open(root + "/error404.html")
        self.ResponseBuf = ErrorFile.read()
        ErrorFile.close()
        return -1

    ### these are methods for handling each specific method ###