# Predefine API
API_pair = {
  '/':'get_login',
  '/login':'get_login',
  '/login/css':'get_login_css'
}

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
    ResponseBuf = None

    def __init__(self, API = '/', Connection = None):
      self.DBConnection = Connection


      self.Status = getattr(self, API_pair[API])() # call method from string

    def getResponse(self):
      return Status_pair[self.Status]

    def getData(self):
      return self.ResponseBuf

    ### these are methods for handling each specific method ###
    
    # GET login method
    def get_login(self):
      with open("../../Client/Login/Login.html", "r") as f:
        try:
          self.ResponseBuf = f.read()
          f.close()
          return 1
        except IOError:
          print("Could not read file", f)
          f.close()
          return -1

    def get_login_css(self):
      with open("../../Client/Login/login.css", "r") as f:
        try:
          self.ResponseBuf = f.read()
          f.close()
          return 1
        except IOError:
          print("Could not read file", f)
          f.close()
          return -1