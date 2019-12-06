CREATE DATABASE Clinic;
USE Clinic;

CREATE TABLE user
(
id INT(10) NOT NULL AUTO_INCREMENT,
username VARCHAR(50) NOT NULL,
password VARCHAR(50) NOT NULL,
type VARCHAR(10) NOT NULL,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
gender VARCHAR(50) NOT NULL,
dob DATETIME NOT NULL,
address LONGTEXT NOT NULL,
phone_number VARCHAR(20) NOT NULL,
Ssn VARCHAR(20) NOT NULL,
specialization VARCHAR(20),
emergency_contact_name VARCHAR(45),
emergency_contact_phone VARCHAR(20),
emergency_contact_relationship_to_patient VARCHAR(45),
PRIMARY KEY (id),
UNIQUE (username)
);

CREATE TABLE schedule_appointment
(
id INT(10) NOT NULL AUTO_INCREMENT,
doctor_id INT(10),
patient_id INT(10),
from_time DATETIME NOT NULL,
status BOOLEAN NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (doctor_id) REFERENCES user(id),
FOREIGN KEY (patient_id) REFERENCES user(id)
);

CREATE TABLE report
(
id INT(10) NOT NULL AUTO_INCREMENT,
doctor_id INT(10) NOT NULL,
patient_id INT(10) NOT NULL,
date_time DATETIME NOT NULL,
report_data text,
PRIMARY KEY (id),
FOREIGN KEY (doctor_id) REFERENCES user(id),
FOREIGN KEY (patient_id) REFERENCES user(id)
);

CREATE TABLE purchase
(
id INT(10) NOT NULL AUTO_INCREMENT,
report_id INT(10) NOT NULL,
total_bill INT(50) NOT NULL,
status BOOLEAN NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (report_id) REFERENCES report(id)
);

CREATE TABLE attachments
(
id INT(10) NOT NULL AUTO_INCREMENT,
name VARCHAR(20) NOT NULL,
report_id INT(10) NOT NULL,
file_path TEXT,
description TEXT,
PRIMARY KEY (id),
FOREIGN KEY (report_id) REFERENCES report(id)
);

CREATE TABLE service
(
id INT(10) NOT NULL AUTO_INCREMENT,
code VARCHAR(10) NOT NULL,
name VARCHAR(50) NOT NULL,
status BOOLEAN NOT NULL,
price INT(50),
PRIMARY KEY (id)
);

CREATE TABLE resource
(
id INT(10) NOT NULL AUTO_INCREMENT,
code VARCHAR(10) NOT NULL,
name VARCHAR(50) NOT NULL,
unit VARCHAR(10) NOT NULL,
quantity INT(20) NOT NULL,
status BOOLEAN NOT NULL,
price INT(50),
PRIMARY KEY (id)
);


CREATE TABLE instruction
(
id INT(10) NOT NULL AUTO_INCREMENT,
report_id INT(10) NOT NULL,
service_id INT(10),
resource_id INT(10),
service_quantity INT(50),
resource_quantity INT(50),
description LONGTEXT,
PRIMARY KEY (id),
FOREIGN KEY (report_id) REFERENCES report(id),
FOREIGN KEY (service_id) REFERENCES service(id),
FOREIGN KEY (resource_id) REFERENCES resource(id)
);