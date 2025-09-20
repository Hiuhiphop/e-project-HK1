Câu lệnh tạo database-table nhanh
CREATE TABLE Admin (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

CREATE TABLE Customer (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone_number VARCHAR(20),
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

CREATE TABLE Specialization (
    specialization_id INT PRIMARY KEY AUTO_INCREMENT,
    specialization_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
) ENGINE = InnoDB;

CREATE TABLE Lawyer (
    lawyer_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    specialization_id INT,
    experience_years INT,
    address VARCHAR(255),
    city VARCHAR(100),
    province VARCHAR(100),
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (specialization_id) REFERENCES Specialization(specialization_id)
) ENGINE = InnoDB;

CREATE TABLE Appointment (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    lawyer_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('Booked', 'Confirmed', 'Cancelled') NOT NULL DEFAULT 'Booked',
    reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (lawyer_id) REFERENCES Lawyer(lawyer_id)
) ENGINE = InnoDB;

CREATE TABLE ReviewAndRating (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    appointment_id INT,
    rating_score INT NOT NULL,
    review_text TEXT,
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id),
    CHECK (rating_score BETWEEN 1 AND 5)
) ENGINE = InnoDB;

CREATE TABLE AvailabilitySlot (
    slot_id INT PRIMARY KEY AUTO_INCREMENT,
    lawyer_id INT NOT NULL,
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status ENUM('Available', 'Booked') NOT NULL DEFAULT 'Available',
    FOREIGN KEY (lawyer_id) REFERENCES Lawyer(lawyer_id)
) ENGINE = InnoDB;

CREATE TABLE Announcement (
    announcement_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
) ENGINE = InnoDB;
