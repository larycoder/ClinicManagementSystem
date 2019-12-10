use Clinic;
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

-- create report detail ( report with patient and doctor name)
DROP VIEW IF EXISTS report_detail_view;
CREATE VIEW report_detail_view 
AS 
	SELECT r.id AS report_id, r.patient_id, pv.patient_name, r. doctor_id, dv.doctor_name, r.date_time, r.appointment_id, r.report_data
	FROM patient_view pv JOIN report r ON pv.id = r.patient_id JOIN doctor_view dv ON r.doctor_id = dv.id;

-- create instruction view (contain instruction info and name of res and service)
DROP VIEW IF EXISTS instruction_view;
CREATE VIEW instruction_view
AS
    SELECT I.id instruction_id, report_id, I.resource_id, R.name resource_name, I.resource_quantity, R.unit resource_unit, I.service_id, S.name service_name, I.service_quantity, description instruction_description
    FROM instruction I LEFT OUTER JOIN resource R ON I.resource_id=R.id LEFT OUTER JOIN service S ON I.service_id =S.id
    ORDER BY I.id ASC;

-- create report with attachment view (contain report and related attachments)
DROP VIEW IF EXISTS report_with_attachment_view;
CREATE VIEW report_with_attachment_view
AS
    SELECT R.id report_id, R.doctor_id, DV.doctor_name, R.patient_id,PV.patient_name, R.date_time, R.appointment_id, R.report_data, A.id attachment_id, A.name attachment_name, A.file_path attachment_file_path, A.description attachment_description
    -- SELECT R.*, DV.doctor_name, PV.patient_name, A.id attachment_id
    FROM report R LEFT OUTER JOIN attachments A ON R.id=A.report_id LEFT OUTER JOIN doctor_view DV ON R.doctor_id = DV.id LEFT OUTER JOIN patient_view PV ON R.patient_id= PV.id;

-- create report view (contain report and all related attachments and instructions)
DROP VIEW IF EXISTS report_view;
CREATE VIEW report_view
AS
    SELECT RAV.*, IV.instruction_id, IV.resource_id,IV.resource_name,IV.resource_quantity,IV.resource_unit,IV.service_id,IV.service_name,IV.service_quantity, IV.instruction_description
    -- SELECT RAV.*, IV.instruction_id 
FROM report_with_attachment_view RAV LEFT OUTER JOIN instruction_view IV ON RAV.report_id=IV.report_id;

DROP VIEW IF EXISTS report_price;
CREATE VIEW report_price
AS
	SELECT rv.report_id, rv.doctor_id, rv.doctor_name, rv.patient_id, rv.patient_name, rv.date_time, rv.appointment_id, rv.report_data, IFNULL( rv.resource_quantity * r.price, 0) + IFNULL( rv.service_quantity * s.price, 0) AS price, p.status 
	FROM resource r RIGHT OUTER JOIN report_view rv ON rv.resource_id = r.id LEFT OUTER JOIN service s ON rv.service_id = s.id JOIN purchase p ON rv.report_id = p.report_id;  

DROP VIEW IF EXISTS purchase_detail_view;
CREATE VIEW purchase_detail_view 
AS 
	SELECT rd.report_id, rd.patient_id, rd.patient_name, rd.doctor_id, rd.doctor_name, p.total_bill, p.status
	FROM report_detail_view rd JOIN purchase p ON rd.report_id = p.report_id;

INSERT INTO purchase (id, report_id, total_bill, status) VALUES (NULL, (SELECT rp.report_id FROM report_price rp WHERE report_id = '1'),(SELECT rp.price FROM report_price rp WHERE report_id = '1') ,'0');

SELECT * FROM purchase;