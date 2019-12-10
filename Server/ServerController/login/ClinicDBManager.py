from datetime import date
from typing import Union, Dict, Any

import config
import mysql.connector
import mysql
from mysql.connector import errorcode
import logging
from mysql.connector import connection


class ClinicDBManager:
    cnx: connection.MySQLConnection = None

    def __init__(self):
        pass

    def get_connection(self, mysql_user: Dict) -> connection.MySQLConnection:
        self.cnx = connection.MySQLConnection(user = mysql_user['user'], password = mysql_user['password'],
                                              host = mysql_user['host'], database = mysql_user['database'])
        logging.info("Successfully create a connection to Clinic database server")
        return self.cnx

    def close_connection(self):
        self.cnx.close()

    def verify_login(self, account: Dict) -> Union[Dict[str, Any], int]:
        cursor = self.cnx.cursor()
        cursor.execute(config.query['verify_login'], account)
        result = cursor.fetchall()
        if result.__len__() == 1:
            user = {"id": result[0][0]}
            print(user)
            return user
        else:
            return -1

    def add_new_user(self, new_user: Dict):
        cursor = self.cnx.cursor()
        cursor.execute(config.query['register'], new_user)
        self.cnx.commit()

def CreateDbConnection():
    try:
        db_manager = ClinicDBManager()
        cnx = db_manager.get_connection(mysql_user= config.mysql_user)
        return db_manager
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
        return None
