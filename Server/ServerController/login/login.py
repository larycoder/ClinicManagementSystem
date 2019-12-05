from typing import Union, Dict, Any

import config
import mysql.connector
import mysql
from mysql.connector import errorcode
from mysql.connector import connection


class ClinicDbConnection(connection.MySQLConnection):
    """A class to manipulate any action require database connection"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        print("connect done")

    def verify_login(self, username: str, password: str) -> Union[Dict[str, Any], int]:
        """A function to verify a login request
        Parameters
        ----------
        username : str
          the username
        password : str
          the password

        Returns
        -------
        bool
          is user verified or not
        """
        cursor = self.cursor()
        cursor.execute(config.query['verify_login'], (username, password))
        result = cursor.fetchall()
        if result.__len__() == 1:
          for id in result:
            user = {}
            user.update({"id": id[0]})
          return user
        else:
          return -1

if __name__ == '__main__':
    try:
        cnx = ClinicDbConnection(user=config.mysql['user'], password=config.mysql['password'],
                                 host=config.mysql['host'], database=config.mysql['database'])
        cnx.verify_login('hito', 'misa')
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    else:
        cnx.close()
