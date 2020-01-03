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
        try:
            cursor = self.cnx.cursor()
            cursor.execute(config.query['register'], new_user)
            self.cnx.commit()
            return True
        except mysql.connector.IntegrityError as err:
            return False



    def tuple_to_dict(self, my_tuple: tuple, labels: list) -> Dict:
        return dict(zip(labels, list(my_tuple)))

    def get_appointment3_list(self) -> list:
        labels = ['id', 'doctor_id', 'patient_id', 'from_time', 'status']
        cursor = self.cnx.cursor()
        cursor.execute(config.query['display_schedule'])
        result = cursor.fetchall()
        print(result)
        appointment_list = []
        for one_tuple in result:
            appointment_list.append(self.tuple_to_dict(one_tuple, labels))
        return appointment_list

    def get_appointment3_list_by_doctor(self, doctor: Dict) -> list:
        """
        doctor = {"id": "i39ur34ri"}
        """
        labels = ['id', 'doctor_id', 'patient_id', 'from_time', 'status']
        cursor = self.cnx.cursor()
        cursor.execute(config.query['display_schedule_by_doctor'], doctor)
        result = cursor.fetchall()
        print(result)
        appointment_list = []
        for one_tuple in result:
            appointment_list.append(self.tuple_to_dict(one_tuple, labels))
        return appointment_list

    def book_schedule(self, schedule: Dict) -> bool:
        """
        A patient books an appointment
        """
        try:
            cursor = self.cnx.cursor()
            cursor.execute(config.query['add_new_schedule'], schedule)
            cnx.commit()
            return True
        except mysql.connector.Error as e:
            print(e.errno)
            return False

    def create_schedule(self, new_schedule: Dict) -> bool:
        """
        A doctor create a schedule
        schedule = {
                    doctor_id: 128,
                    from_time: datetime
                    }
        """
        try:
            cursor = self.cnx.cursor()
            cursor.execute(config.query['add_new_schedule'], new_schedule)
            self.cnx.commit()
            return True
        except mysql.connector.IntegrityError as err:
            return False
        

    def get_patient_info(self, patient_id: Dict) -> Dict:
        """
        patient_id = {"id": "3092u34"}
        """
        cursor = self.cnx.cursor()
        cursor.execute(config.query['list_patient_info'], patient_id)
        result = cursor.fetchall()
        labels = ["id", "username", "type", "patient_name", "gender", "dob", "address", "phone_number", "ssn", "specialization", "emergency_contact_name", "emergency_contact_phone", "emergency_contact_relationship_to_patient"]
        print(result)
        return self.tuple_to_dict(result[0], labels)

    def get_user_info(self, user_id: Dict) -> Dict:
        """
        user_id = {"id": "3092u34"}
        """
        cursor = self.cnx.cursor()
        cursor.execute(config.query['list_user_info'], user_id)
        result = cursor.fetchall()
        labels = ["id", "username", "type", "first_name", "last_name", "gender", "dob", "address", "phone_number", "ssn", "specialization", "emergency_contact_name", "emergency_contact_phone", "emergency_contact_relationship_to_patient"]
        print(result)
        return self.tuple_to_dict(result[0], labels)

    def get_doctor_list(self):
        cursor = self.cnx.cursor()
        cursor.execute(config.query['doctor_list'])
        result = cursor.fetchall()
        labels = ["id", "doctor_name", "specialization"]
        doctor_list = []
        for one_tuple in result:
            doctor_list.append(self.tuple_to_dict(one_tuple, labels))
        return doctor_list

  

        
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

if __name__ == '__main__':
    try:
        db_manager = ClinicDBManager()
        user_login: Dict[str, str] = {"username": "meomeo", "password": "89348"}
        user_register = {"username": "misamisa",
                         "password": "misakute",
                         "type": "patient",
                         "first_name": "misa",
                         "last_name": "misakute",
                         "gender": "male",
                         "dob": date(1999, 8, 3),
                         "address": "123 Tran Nhan Tong",
                         "phone_number": "09343921",
                         "Ssn": "031199001111",
                         "specialization": None,
                         "emergency_contact_name": None,
                         "emergency_contact_phone": None,
                         "emergency_contact_relationship_to_patient": None}
        cnx = db_manager.get_connection(mysql_user= config.mysql_user)
        # db_manager.verify_login(user_login)
        # print(db_manager.add_new_user(user_register))
        print(db_manager.get_patient_info({"id": "1"}))
        print(db_manager.get_user_info({"id": "2"}))
        print(db_manager.get_doctor_list())

    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    else:
        db_manager.close_connection()
