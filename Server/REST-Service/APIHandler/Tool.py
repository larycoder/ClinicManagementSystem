# function process file
# root directory of WEB server
import os
import datetime
import json

root = os.path.dirname(os.path.realpath(__file__)) + "/../../../Client"

## tool function ##
def String2Json(data):
  JsonFile = {} # dictionary to keep json object
  values = data.split("&")
  for value in values:
    value = value.split("=")
    JsonFile[value[0]] = value[1]
  return JsonFile

def Json2Dict(data):
  return json.loads(data)

def readFile(String):
      # reference f for reading file
      f = None

      try:
        f = open(String)
        Buff = f.read()
        f.close()
        return [1, Buff]
      except IOError:
        print("Error when processing file")
        if not f == None:
          print("Could not read file ", f)
          f.close()
        else:
          print("File is not exit")
        ErrorFile = open(root + "/error404.html")
        Buff = ErrorFile.read()
        ErrorFile.close()
        return [-1, Buff]

def datetimeObject2String(object):
  if isinstance(object, datetime.datetime):
        return object.__str__()