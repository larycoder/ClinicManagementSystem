mysql_user = {
  'host': '127.0.0.1',
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
  'doctor_name_list': "SELECT id,CONCAT(first_name,' ',last_name) AS doctor_name FROM user WHERE type='doctor';",
  'nurse_name_list': "SELECT CONCAT(first_name," ",last_name) AS nurse_name FROM user WHERE type='nurse';",
  #maintain patient information
  'patient_name_list': "SELECT CONCAT(first_name," ",last_name) AS patient_name FROM user WHERE type='patient';",
  'list_patient_info': "SELECT * FROM patient_view;",
  'list_doctor_info': "SELECT * FROM doctor_view;",
  'list_nurse_info': "SELECT * FROM nurse_view;",
  'list_patient_record': "SELECT * FROM report_detail_view WHERE first_name = %s AND last_name = %s OR id = %d ",
  'list_patient_attachment': "SELECT * FROM report_attachment_view WHERE first_name = %s AND last_name = %s OR patient_id = %d"

  #maintain stock
  'resource_list': "SELECT * FROM resource;",
  'service_list':"SELECT * FROM service;",
  'add_resource': "INSERT INTO resource(id, code, name, unit, quantity, status, price) VALUES(NULL,%(code)s,%(name)s,%(unit)s,%(quantity)d,%(status)d,%(price)d);",
  'add_service': "INSERT INTO service(id, code, name, status, price) VALUES (NULL,%(code)s,%(name)s,%(status)d,%(price)d);",
  'delete_resource': "DELETE FROM resource WHERE id= %(id)d; ",
  'delete_service': "DELETE FROM service WHERE id= %(id)d;",
  'change_resource_status': "UPDATE TABLE resource SET status = %(status)d WHERE id= %(id)d;",
  'change_service_status': "UPDATE TABLE service SET status = %(status)d WHERE id= %(id)d;",
  'change_resource_price': "UPDATE TABLE resource SET price = %(price)d WHERE id = %(id)d;",
  'change_service_price': "UPDATE TABLE service SET price = %(price)d WHERE id = %(id)d;",
  'change_resource_unit': "UPDATE TABLE resource SET unit = %(unit)s WHERE id = %(id)d;",
  'search_service': "SELECT * FROM service WHERE name LIKE CONCAT('%',%s,'%');",  #return service whose name contains that string
  'search_resource': "SELECT * FROM resource WHERE name LIKE CONCAT('%',%s,'%');",  #return resource whose name contains that string
  'add_res_quantity': "UPDATE resource SET quantity = %d + quantity WHERE id = %(id)d;",
  'update_res_quantity': "UPDATE resource SET quantity = quantity - (SELECT SUM(I.resource_quantity) FROM instruction I WHERE I.resource_id = %(resource_id)d) WHERE id = %(resource_id)d;",
  'list_using_res': "SELECT * FROM resource WHERE status = 1",
  'list_unused_res': "SELECT * FROM resource WHERE status = 0",
  'list_using_service': "SELECT * FROM service WHERE status = 1",
  'list_unused_service': "SELECT * FROM service WHERE status = 0",

  # maintain schedule
  'delete_appointment': "DELETE FROM schedule_appointment WHERE id = %(id)d",
  'change_appointment_status': "UPDATE TABLE schedule_appointment SET status = %(status)d WHERE id = %(id)d",
  'list_appointment_info': "SELECT * FROM appointment_info_view",
  
  # export report
  'list_report': "SELECT * FROM report",
  'list_report_with_attachments': "SELECT * FROM report_with_attachment_view",
  'list_report_full_info': "SELECT * FROM report_view",
  'report_spec_patient': "SELECT * FROM report_view WHERE patient_id=%(patient_id)d AND patient_name=%(patient_name)s",
  
  #book schedule
  'display_schedule': "SELECT * FROM scheduled_appointment",
  
  'check_if_appointment_available': "SELECT status FROM scheduled_appointment WHERE from_time = %s AND doctor_id = %d",

  'create_appointment': "INSERT INTO scheduled_appointment(id, doctor_id, patient_id, from_time, status) VALUES( NULL, %d, %d, %s, '1' )",
  #purchase
  'list_patient_today':"SELECT * FROM "
  



  "register": "INSERT INTO user(username, password, type, first_name, last_name, gender, dob, address, phone_number, Ssn, specialization, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship_to_patient) VALUES(%(username)s, %(password)s, %(type)s, %(first_name)s, %(last_name)s, %(gender)s, %(dob)s, %(address)s, %(phone_number)s, %(Ssn)s, %(specialization)s, %(emergency_contact_name)s, %(emergency_contact_phone)s, %(emergency_contact_relationship_to_patient)s)"
  



  
}
