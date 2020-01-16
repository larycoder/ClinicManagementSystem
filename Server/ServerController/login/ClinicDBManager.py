from datetime import date, datetime
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

    def get_appointment_list(self) -> list:
        labels = ['id', 'doctor_id', 'patient_id', 'from_time', 'status']
        cursor = self.cnx.cursor()
        cursor.execute(config.query['display_schedule'])
        result = cursor.fetchall()
        print(result)
        appointment_list = []
        for one_tuple in result:
            appointment_list.append(self.tuple_to_dict(one_tuple, labels))
        return appointment_list

    def get_appointment_list_by_doctor(self, doctor: Dict) -> list:
        """
        doctor = {"id": "i39ur34ri"}
        """
        labels = ['appointment_id', 'doctor_id', 'doctor_name', 'patient_id', 'patient_name', 'from_time', 'status']
        cursor = self.cnx.cursor()
        cursor.execute(config.query['display_all_schedule_by_doctor'], doctor)
        result = cursor.fetchall()
        print(result)
        appointment_list = []
        for one_tuple in result:
            appointment_list.append(self.tuple_to_dict(one_tuple, labels))
        return appointment_list

    def book_schedule(self, schedule: Dict) -> bool:
        """
        A patient books an appointment
        schedule = {
            patient_id: 12453,
            doctor_id: 23423,
            from_time: datetime.datetime(year, month, day, hour, min)
        }
        """
        cursor = self.cnx.cursor()
        if self.is_schedule_exist(schedule):
            try:
                cursor.execute(config.query['book_schedule'], schedule)
                self.cnx.commit()
                return True
            except mysql.connector.Error as e:
                print(e.errno)
                return False
        else:
            return False

    def is_schedule_exist(self, schedule: Dict):
        cursor = self.cnx.cursor()
        cursor.execute(config.query['is_schedule_exist'], schedule)
        result = cursor.fetchall()
        if(result.__len__()):
            if result[0][0] == 0:
                return True
            else:
                return False
        else:
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

    def list_schedule_today(self, doctor: Dict):
        """
        doctor = {'doctor_id':'id'}
        """
        cursor = self.cnx.cursor()
        cursor.execute(config.query['list_schedule_today'], doctor)
        result = cursor.fetchall()
        labels = ['appointment_id', 'doctor_id', 'doctor_name', 'patient_id', 'patient_name', 'from_time', 'status']
        schedule_list = []
        for one_tuple in result:
            schedule_list.append(self.tuple_to_dict(one_tuple, labels))
        return schedule_list


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

    def get_report_list_by_patient(self, patient: Dict) -> list:
        """
        patient = {
                    patient_id: str
                    }
        """
        cursor = self.cnx.cursor()
        cursor.execute(config.query['report_list_by_patient'], patient)
        result = cursor.fetchall()
        labels = ["report_id", "patient_id", "patient_name", "doctor_id", "doctor_name", "date_time", "appointment_id", "report_data"]
        report_list = []
        for one_tuple in result:
            report_list.append(self.tuple_to_dict(one_tuple, labels))
        return report_list

    def get_instruction_list_by_report(self, report: Dict) -> list:
        """
        report = {
                    report_id: str
                    }
        """
        cursor = self.cnx.cursor()
        cursor.execute(config.query['list_instruction_by_report'], report)
        result = cursor.fetchall()
        labels = ['instruction_id', 'report_id', 'resource_id', 'resource_name', 'resource_quantity', 'resource_unit', 'service_id', 'service_name', 'service_quantity', 'description']
        instruction_list = []
        for one_tuple in result:
            instruction_list.append(self.tuple_to_dict(one_tuple, labels))
        return instruction_list

    def add_instruction_list(self, instruction_list: list):
        """
        report = {id: "id"}
        instruction_list: a list of instructions, each instruction is a dict
        instruction = {
                        report_id: "id",
                        service_id: "service_id",
                        resource_id: "resource_id",
                        service_quantity: "quantity",
                        resource_quantity: "quantity",
                        description: "description"
                        }
        """
        cursor = self.cnx.cursor()
        for instruction in instruction_list:
            cursor = self.cnx.cursor()
            try:
                cursor.execute(config.query['add_instruction'], instruction)
                self.cnx.commit()
            except mysql.connector.IntegrityError as err:
                return False
        return True

    def check_user_has_report(self, check: Dict) -> bool:
        """
        check = {
                'user_id': int id,
                'report_id': 'id'
                }
        """
        cursor = self.cnx.cursor()
        cursor.execute(config.query['get_report_owner'], check)
        result = cursor.fetchall()
        print(result[0][0])
        if(result[0][0] == check['user_id']):
            return True
        else:
            return False

    def add_report(self,report: Dict, instruction_list: list):
        """
        report: {appointment_id, report_data}

        """
        cursor = self.cnx.cursor()
        try:
            cursor.execute(config.query['add_report'], report)
            self.cnx.commit()
        except mysql.connector.IntegrityError as err:
            return False
        for instruction in instruction_list:
            instruction['report_id'] = str(cursor.lastrowid)
        self.add_instruction_list(instruction_list)
        return True

    def list_resource(self):
        cursor = self.cnx.cursor()
        cursor.execute(config.query['resource_list'])
        result = cursor.fetchall()
        labels = ['id', 'code', 'name', 'unit', 'quantity', 'status', 'price']
        resource_list = []
        for one_tuple in result:
            resource_list.append(self.tuple_to_dict(one_tuple, labels))
        return resource_list

    def add_resource_quantity(self, resource: Dict):
        """
        resource: {
                    'id': 'id',
                    'quantity': 'num'
                    }
        """
        cursor = self.cnx.cursor()
        try:
            cursor.execute(config.query['add_res_quantity'], resource)
            self.cnx.commit()
            return True
        except mysql.connector.Error as e:
            print(e.errno)
            return False

    def remove_resource_quantity(self, resource: Dict):
        cursor = self.cnx.cursor()
        try:
            cursor.execute(config.query['sub_res_quantity'], resource)
            self.cnx.commit()
            return True
        except mysql.connector.Error as e:
            print(e.errno)
            return False


        
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
        # db_manager.verify_tomorrow = datetime.now().date() + timedelta(days=1)login(user_login)
        # print(db_manager.add_new_user(user_register))
        # print(db_manager.get_patient_info({"id": "1"}))
        # print(db_manager.get_user_info({"id": "2"}))
        # print(db_manager.get_doctor_list())
        schedule = {'patient_id': '1',
                    'doctor_id': '3',
                    'from_time': datetime(2020, 1, 19, 8, 30)}
        report = {
            'appointment_id': '1',
            'report_data': 'H1N1, go to the hospital'
        }

        db_manager.add_report(report, instruction_list=[])
        print(db_manager.list_schedule_today({'doctor_id': '5'}))

        # print(db_manager.get_appointment_list_by_doctor({'id': '7'}))
        # print(db_manager.get_report_list_by_patient({'patient_id': '4'}))
        # print(db_manager.get_instruction_list_by_report({'report_id': '2'}))


        # check = {
        #     'user_id': 1,
        #     'report_id': '1'
        # }
        # if(db_manager.check_user_has_report(check)):
        #     print("Yes")
        # else:
        #     print("No")
        #
        # if db_manager.book_schedule(schedule):
        #     print("done")
        # else:
        #     print("failed")
        #
        # if db_manager.is_schedule_exist(schedule):
        #     print("exist")
        # else:
        #     print("not exist")

    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    else:
        db_manager.close_connection()
