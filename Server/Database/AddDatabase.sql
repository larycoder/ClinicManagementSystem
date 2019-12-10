use Clinic;

-- add to user table
INSERT INTO user(id, username, password, type, first_name, last_name, gender, dob, address, phone_number, Ssn, specialization, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship_to_patient)
VALUES (1, 'motconvit', '123456', 'patient', 'Ngoc', 'Nguyen', 'female', '1992-03-24', '23 Hoang Quoc Viet, Cau Giay, Ha Noi', '0934934349', '00028473827', NULL, 'Nguyen Hung', '0938485935', 'hunsband');
INSERT INTO user(id, username, password, type, first_name, last_name, gender, dob, address, phone_number, Ssn, specialization, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship_to_patient)
VALUES (2, 'xoerahaicaicanh', '654321', 'doctor', 'Tung', 'Tran', 'male', '1978-04-25', '34 To Hieu, Cau Giay, Ha Noi', '0972834349', '00029374827', 'general', 'Phan Linh', '0938921351', 'wife');
INSERT INTO user(id, username, password, type, first_name, last_name, gender, dob, address, phone_number, Ssn, specialization, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship_to_patient)
VALUES (3, 'quacquac', '123321', 'nurse', 'Mai', 'Vu', 'female', '1997-08-09', '89 Hoang Hoa Tham, Cau Giay, Ha Noi', '0934920049', '00021123227', 'nurse', 'Mac Lien', '0938003435', 'hunsband');
INSERT INTO user(id, username, password, type, first_name, last_name, gender, dob, address, phone_number, Ssn, specialization, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship_to_patient)
VALUES (4, 'motconmeo', '567890', 'patient', 'Hoa', 'Le', 'female', '1998-12-24', '29 Nguyen Khanh Toan, Cau Giay, Ha Noi', '0930432349', '00028111827', NULL, 'Phan Hiep', '0944485935', 'hunsband');
INSERT INTO user(id, username, password, type, first_name, last_name, gender, dob, address, phone_number, Ssn, specialization, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship_to_patient)
VALUES (5, 'namvatveo', '654321', 'doctor', 'Quan', 'Hoang', 'male', '1982-09-25', '89 Thuy Khue, Cau Giay, Ha Noi', '0972800749', '00029370027', 'cardio', 'Luong Nhu', '0938900351', 'wife');
INSERT INTO user(id, username, password, type, first_name, last_name, gender, dob, address, phone_number, Ssn, specialization, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship_to_patient)
VALUES (6, 'duidui', '734827', 'patient', 'Huong', 'Nguyen', 'female', '1992-03-24', '23 Hoang Quoc Viet, Cau Giay, Ha Noi', '0934004349', '00028471127', NULL, 'Nguyen Hung', '0938485015', 'hunsband');
INSERT INTO user(id, username, password, type, first_name, last_name, gender, dob, address, phone_number, Ssn, specialization, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship_to_patient)
VALUES (7, 'meomeo', '89348', 'doctor', 'Lan', 'Tran', 'female', '1978-04-25', '34 To Hieu, Cau Giay, Ha Noi', '0972834301', '00029234827', 'trauma', 'Phan Linh', '0938920051', 'hunsband');

-- add to schedule_appointment table
INSERT INTO schedule_appointment(id, doctor_id, patient_id, from_time, status) VALUES (1, 2, 1, '2019-11-04 08:30:00',1);
INSERT INTO schedule_appointment(id, doctor_id, patient_id, from_time, status) VALUES (2, 5, 4, '2019-11-04 08:45:00',1);
INSERT INTO schedule_appointment(id, doctor_id, patient_id, from_time, status) VALUES (3, 7, 6, '2019-11-04 09:00:00',1);

-- add to report
INSERT INTO report (id, doctor_id, patient_id, date_time, report_data, appointment_id) VALUES (1, 2, 1, '2019-11-04 08:30:00', 'do blood test', 1);
INSERT INTO report (id, doctor_id, patient_id, date_time, report_data, appointment_id) VALUES (2, 5, 4, '2019-11-04 08:45:00', 'take a thrombolysis, do percutaneous coronary intervention (PCI)', 2);
INSERT INTO report (id, doctor_id, patient_id, date_time, report_data, appointment_id) VALUES (3, 7, 6, '2019-11-04 09:00:00', 'do CT scan', 3);

-- add to attachments
INSERT INTO attachments (id, name, report_id, file_path, description) VALUES (1, 'CT scan', 3, '.\data\CT_scan\01','stable');
INSERT INTO attachments (id, name, report_id, file_path, description) VALUES (2, 'Blood test', 1, '.\data\Blood_test\01','stable');

-- add to service
INSERT INTO service (id, code, name, status, price) VALUES (1, 001, 'CT scan', 1, 150000);
INSERT INTO service (id, code, name, status, price) VALUES (2, 002, 'Blood test', 1, 200000);
INSERT INTO service (id, code, name, status, price) VALUES (3, 003, 'PCI', 1, 250000);

-- add to resource
INSERT INTO resource ( id, code, name, unit, quantity, status, price) VALUES (1, 001, 'thrombolysis', 'pack', 2500, 1, 50000);

-- add to instruction
INSERT INTO instruction (id, report_id, service_id, resource_id, service_quantity, resource_quantity, description) VALUES (1, 1, 2, NULL, 1, NULL, NULL);
INSERT INTO instruction (id, report_id, service_id, resource_id, service_quantity, resource_quantity, description) VALUES (2, 2, 3, 1, 1, 1, NULL);
INSERT INTO instruction (id, report_id, service_id, resource_id, service_quantity, resource_quantity, description) VALUES (3, 3, 1, NULL, 1, NULL, NULL);

-- add to purchase
INSERT INTO purchase (id, report_id, total_bill, status) VALUES (1,1,200000,0);
INSERT INTO purchase (id, report_id, total_bill, status) VALUES (2,2,300000,0);
INSERT INTO purchase (id, report_id, total_bill, status) VALUES (3,3,150000,1);
