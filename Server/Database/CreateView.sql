-- create patient view
DROP VIEW IF EXISTS patient_view;
CREATE VIEW patient_view
AS
    SELECT id, username, type, CONCAT(first_name,' ', last_name) patient_name, gender, dob, address, phone_number, Ssn, specialization, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship_to_patient
    FROM user
    WHERE type ="patient";


-- create doctor view
DROP VIEW IF EXISTS doctor_view;
CREATE VIEW doctor_view
AS
    SELECT id, username, type, CONCAT(first_name,' ', last_name) doctor_name, gender, dob, address, phone_number, Ssn, specialization, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship_to_patient
    FROM user
    WHERE type ="doctor";

-- create nurse view
DROP VIEW IF EXISTS nurse_view;
CREATE VIEW nurse_view
AS
    SELECT id, username, type, CONCAT(first_name,' ', last_name) nurse_name, gender, dob, address, phone_number, Ssn, specialization, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship_to_patient
    FROM user
    WHERE type ="nurse";

-- create appointment info view
DROP VIEW IF EXISTS appointment_info_view;
CREATE VIEW appointment_info_view
AS
    SELECT SA.id appointment_id, SA.doctor_id, D.doctor_name, SA.patient_id, P.patient_name, from_time, status
    FROM schedule_appointment SA INNER JOIN doctor_view D ON SA.doctor_id = D.id INNER JOIN patient_view P ON SA.patient_id= P.id;