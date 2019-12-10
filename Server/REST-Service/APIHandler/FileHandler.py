# function process file
# root directory of WEB server
import os

root = os.path.dirname(os.path.realpath(__file__)) + "/../../../Client"

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