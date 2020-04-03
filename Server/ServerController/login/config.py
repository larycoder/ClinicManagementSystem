mysql_user = {
  'host': 'localhost',
  'user': 'server1',
  'password': 'password',
  'database': 'Clinic',
  'raise_on_warnings': True
}

query = {
  #login
  'verify_login': "SELECT (id) FROM user WHERE username = %(username)s AND password = %(password)s",
  
  #register
  'create_account': "INSERT INTO user(id,username,password,type,first_name,last_name,gender,dob,address,phone_number,Ssn,specialization,emergency_contact_name,emergency_contact_phone,emergency_contact_relationship_to_patient) VALUES (NULL,%(username)s, %(password)s, %(type)s, %(first_name)s, %(last_name)s, %(gender)s, %(dob)s, %(address)s, %(phone_number)s, %(Ssn)s, %(specialization)s, %(emergency_contact_name)s, %(emergency_contact_phone)s, %(emergency_contact_relationship_to_patient)s);",
  'check_if_account_exits': "SELECT COUNT(*) FROM user WHERE username = %(username)s;",
  
  #maintain employee information
  'doctor_list': "SELECT id,CONCAT(first_name,' ',last_name) AS doctor_name, specialization FROM user WHERE type='doctor';",
  'nurse_name_list': "SELECT CONCAT(first_name," ",last_name) AS nurse_name FROM user WHERE type='nurse';",
  
  #maintain patient information
  'patient_name_list': "SELECT CONCAT(first_name," ",last_name) AS patient_name FROM user WHERE type='patient';",
  'list_patient_info': "SELECT * FROM patient_view WHERE id = %(id)s;",
  'list_doctor_info': "SELECT * FROM doctor_view;",
  'list_nurse_info': "SELECT * FROM nurse_view;",
  'list_patient_record': "SELECT * FROM report_detail_view WHERE patient_name = %s OR id = %d ",
  'list_patient_attachment': "SELECT * FROM report_attachment_view WHERE patient_name = %s OR patient_id = %d",
  'list_user_info': "SELECT id,username,type,first_name,last_name,gender,dob,address,phone_number,Ssn,specialization,emergency_contact_name,emergency_contact_phone,emergency_contact_relationship_to_patient FROM user WHERE id = %(id)s",
  'list_instruction_by_report': "SELECT * from instruction_view WHERE report_id = %(report_id)s",
  'add_instruction': "INSERT INTO instruction(report_id, service_id, resource_id, service_quantity, resource_quantity, description) VALUE(%(report_id)s, %(service_id)s, %(resource_id)s, %(service_quantity)s, %(resource_quantity)s, %(description)s)",
  'get_report_owner': "SELECT patient_id from report WHERE id = %(report_id)s",
  'add_report': "INSERT INTO report(doctor_id, patient_id, date_time, appointment_id, report_data) SELECT doctor_id, patient_id, from_time, %(appointment_id)s, %(report_data)s FROM schedule_appointment WHERE id = %(appointment_id)s",

  #maintain stock
  'resource_list': "SELECT * FROM resource;",
  'service_list':"SELECT id, code, name FROM service;",
  'add_resource': "INSERT INTO resource(id, code, name, unit, quantity, status, price) VALUES(NULL,%(code)s,%(name)s,%(unit)s,%(quantity)s,1,%(price)s);",
  'add_service': "INSERT INTO service(id, code, name, status, price) VALUES (NULL,%(code)s,%(name)s,%(status)d,%(price)d);",
  'delete_resource': "DELETE FROM resource WHERE id= %(id)d;",
  'delete_service': "DELETE FROM service WHERE id= %(id)d;",
  'change_resource_status': "UPDATE resource SET status = %(status)d WHERE id= %(id)d;",
  'change_service_status': "UPDATE service SET status = %(status)d WHERE id= %(id)d;",
  'change_resource_price': "UPDATE resource SET price = %(price)d WHERE id = %(id)d;",
  'change_service_price': "UPDATE service SET price = %(price)d WHERE id = %(id)d;",
  'change_resource_unit': "UPDATE resource SET unit = %(unit)s WHERE id = %(id)d;",
  'search_service': "SELECT * FROM service WHERE name LIKE CONCAT('%',%s,'%');",  #return service whose name contains that string
  'search_resource': "SELECT * FROM resource WHERE name LIKE CONCAT('%',%s,'%');",  #return resource whose name contains that string
  'add_res_quantity': "UPDATE resource SET quantity = %(quantity)s + quantity WHERE id = %(id)s",
  'sub_res_quantity': "UPDATE resource SET quantity = quantity - %(quantity)s WHERE id = %(id)s",
  'update_res_quantity': "UPDATE resource SET quantity = quantity - (SELECT SUM(I.resource_quantity) FROM instruction I WHERE I.resource_id = %(resource_id)d) WHERE id = %(resource_id)d;",
  'list_using_res': "SELECT * FROM resource WHERE status = 1",
  'list_unused_res': "SELECT * FROM resource WHERE status = 0",
  'list_using_service': "SELECT * FROM service WHERE status = 1",
  'list_unused_service': "SELECT * FROM service WHERE status = 0",

  # maintain schedule
  'add_new_schedule': "INSERT INTO schedule_appointment(id, doctor_id, patient_id, from_time, status) VALUES (NULL,%(doctor_id)s, NULL, %(from_time)s,0)",
  'delete_appointment': "DELETE FROM schedule_appointment WHERE id = %(id)d",
  'change_appointment_status': "UPDATE schedule_appointment SET status = %(status)d WHERE id = %(id)d",
  'list_appointment_info': "SELECT * FROM appointment_info_view",
  'list_appointment_info_by_doctor': "SELECT * FROM appointment_info_view WHERE doctor_id = %(id)s",
  'is_doctor_has_appointment': "SELECT * FROM schedule_appointment WHERE doctor_id = %(doctor_id)s AND id = %(appointment_id)s",
  
  # export report
  'list_report': "SELECT * FROM report",
  'list_report_with_attachments': "SELECT * FROM report_with_attachment_view",
  'list_report_full_info': "SELECT * FROM report_view",
  'report_spec_patient': "SELECT * FROM report_view WHERE patient_id=%(patient_id)s",
  'report_list_by_patient': "SELECT * FROM report_detail_view WHERE patient_id = %(patient_id)s",
  'get_report_by_id': "SELECT * FROM report WHERE id = %(report_id)s",
  
  #book schedule
  'display_schedule': "SELECT * FROM appointment_info_view WHERE YEARWEEK(from_time, 1) >= YEARWEEK(NOW(), 1)",
  'display_schedule_by_doctor': "SELECT * FROM appointment_info_view WHERE YEARWEEK(from_time, 1) >= YEARWEEK(NOW(), 1) AND doctor_id = %(id)s",
  'display_all_schedule_by_doctor': "SELECT * FROM appointment_info_view WHERE doctor_id = %(id)s",
  'check_if_appointment_available': "SELECT status FROM scheduled_appointment WHERE from_time = %s AND doctor_id = %d",
  'create_appointment': "INSERT INTO scheduled_appointment(id, doctor_id, patient_id, from_time, status) VALUES( NULL, %d, %d, %s, '1' )",
  'book_schedule': "UPDATE schedule_appointment SET status = 1, patient_id = %(patient_id)s WHERE doctor_id = %(doctor_id)s AND from_time = %(from_time)s",
  'is_schedule_exist': "SELECT status FROM schedule_appointment WHERE doctor_id = %(doctor_id)s AND from_time = %(from_time)s",
  'list_schedule_today': "SELECT * FROM appointment_info_view WHERE status=1 AND doctor_id = %(doctor_id)s AND DATE(from_time) = CURDATE()",
  #purchase
  'list_patient_today':"SELECT * FROM report_detail.view WHERE data_time = %s",
  'update_purchase': "INSERT INTO purchase (id, report_id, total_bill, status) VALUES (NULL, (SELECT rp.report_id FROM report_price rp WHERE report_id = %s),(SELECT rp.price FROM report_price rp WHERE report_id = %s) ,'0')",
  'calulate_bill': "SELECT SUM(price) FROM report_price WHERE patient_id = %s OR patient_name = %s AND status = '0'",
  'list_bill_not_pay': "SELECT * FROM purchase_detail_view WHERE status = '0' AND patient_id = %s OR patient_name = %s",
  'purchase': "UPDATE purchase SET status = '1' WHERE report_id = %s",
  
  #reister
  "register": "INSERT INTO user(username, password, type, first_name, last_name, gender, dob, address, phone_number, Ssn, specialization, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship_to_patient) VALUES(%(username)s, %(password)s, %(type)s, %(first_name)s, %(last_name)s, %(gender)s, %(dob)s, %(address)s, %(phone_number)s, %(Ssn)s, %(specialization)s, %(emergency_contact_name)s, %(emergency_contact_phone)s, %(emergency_contact_relationship_to_patient)s)"

}
