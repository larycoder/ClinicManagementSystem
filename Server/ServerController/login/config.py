mysql = {
  'host': '127.0.0.1',
  'user': 'server1',
  'password': 'password',
  'database': 'Clinic',
  'raise_on_warnings': True
}

query = {
  'verify_login': "SELECT COUNT(*) FROM user WHERE username = %s AND password = %s",
  'create_account': "INSERT INTO user(id,username,password,type,first_name,last_name,gender,dob,address,phone_number,Ssn,specialization,emergency_contact_name,emergency_contact_phone,emergency_contact_relationship_to_patient) VALUES (NULL,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
  'doctor_list': "SELECT id,CONCAT(first_name,' ',last_name) AS doctor_name, FROM user WHERE type='doctor'",
  'nurse_list': "SELECT CONCAT(first_name," ",last_name) AS nurse_name FROM user WHERE type='nurse'",
  'patient_list': "SELECT CONCAT(first_name," ",last_name) AS patient_name FROM user WHERE type='patient'",
  'resource_list':"SELECT * FROM resource"
  'add_resource': "INSERT INTO resource(id, code, name, unit, quantity, status, price) VALUES(NULL,%s,%s,%s,%d,%d,%d)"
  
  
  

  
}
