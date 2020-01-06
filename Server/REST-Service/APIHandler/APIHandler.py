from Tool import *
import datetime
import json

# Predefine API
Status_pair = {-4:403, -3:401, -2:400, -1:404, 1:200, 2:201}

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
  
  def userInfo(self, data):
    if self.DBConnection == None:
      print("DB Connection is not exit")
      return readFile(root + "/error404.html")
    else:
      JsonFile = String2Json(data)
      userInfo = self.DBConnection.get_user_info(JsonFile)
      if userInfo == None:
        return readFile(root + "/error404.html")
      else:
        print("Get user information successful !")
        return [1, json.dumps(userInfo, default = datetimeObject2String)]
  
  def doctorList(self, data):
    if self.DBConnection == None:
      print("DB Connection is not exit")
      return readFile(root + "/error404.html")
    else:
      userID = String2Json(data)

      # Check exit user id
      try:
        userInfo = self.DBConnection.get_user_info(userID)
      except Exception as e:
        print(e)
        return readFile(root + "/error404.html")

      doctorList = self.DBConnection.get_doctor_list()
      return [1, json.dumps(doctorList)]
  
  def doctorTimes(self, data):
    if self.DBConnection == None:
      print("DB Connection is not exit")
      return readFile(root + "/error404.html")

    user = String2Json(data)
    userID = {"id": user["id"]}
    doctorID = {"id": user["doctorID"]}
    # Check exit user id
    try:
      userInfo = self.DBConnection.get_user_info(user)
    except Exception as e:
      print(e)
      return readFile(root + "/error404.html")
    # Get doctor schedules
    try:
      doctorTimes = self.DBConnection.get_appointment3_list_by_doctor(doctorID)
    except Exception as e:
      print(e)
      return readFile(root + "/error404.html")
    return [1, json.dumps(doctorTimes, default = datetimeObject2String)]

  def scheduleBook(self, data):
    if self.DBConnection == None:
      print("DB Connection is not exit")
      return readFile(root + "/error404.html")
    
    dataID = String2Json(data)
    userID = dataID["id"]
    doctorID = dataID["doctorID"]
    patientID = dataID["patientID"]
    fromTime = datetime.datetime.strptime(dataID["from_time"], '%Y-%m-%d %H:%M')

    try:
      userInfo = self.DBConnection.get_user_info(userID)
      patientInfo = self.DBConnection.get_user_info(patientID)
    except Exception as e:
      print(e)
      return readFile(root + "/error404.html")

    if (userInfo["type"] == "patient" and userID != patientID) or patientID != "patient":
      return [-4, json.dumps({'return':'permission dennied'})]

    update = self.DBConnection.book_schedule({"patient_id":patientID, "doctor_id":doctorID, "from_time":fromTime})

    if update == False:
      return [-2, json.dumps({'return':'book fail'})]
    
    return [1, json.dumps({'return':'book successfully'})]


class POSTHandler():
  """ class hanler POST method """

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

  def register(self, data):
    if self.DBConnection == None:
      return readFile(root + "/error404.html")
    else:
      JsonFile = String2Json(data)
      check = self.DBConnection.add_new_user(JsonFile)
      if check == True:
        return [2, json.dumps("Your Register is succesful")]
      return [-2,"this user is already exit"]
  
  def doctorBook(self, data):
    if self.DBConnection == None:
      print("DB Connection is not exit")
      return readFile(root + "/error404.html")
    
    doctorData = String2Json(data)

    userID = {"id":doctorData["id"]}
    doctorID = {"id":doctorData["doctorID"]}
    try:
      doctorTrue = self.DBConnection.get_user_info(userID)
      # check permission of user
      if doctorTrue["type"] == "patient":
        return [-3, json.dumps({"return":"-1"})]
      # check permission of doctor
      doctorTrue = self.DBConnection.get_user_info(doctorID)
      if doctorTrue["type"] != "doctor":
        return [-3, json.dumps({"return":"-1"})]
    except Exception as e:
      print(e)
      return readFile(root + "/error404.html")
    
    time = datetime.datetime.strptime(doctorData["from_time"], '%Y-%m-%d %H:%M')
    bookSchedule = {"doctor_id":doctorData["doctorID"], "from_time":time}
    check = self.DBConnection.create_schedule(bookSchedule)
    if check == True:
      return [2, json.dumps({"return":"1"})]
    else:
      return [-2, json.dumps({"return":"-1"})]