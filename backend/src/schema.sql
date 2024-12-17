-- This file isnt used by the code at all it was just the easiest way for me to plan put the database schema

----------------------------
-- RESETTING THE DATABASE --
----------------------------

-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS crates;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS materials;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS shipments;
DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS vendors;

-- Enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-------------------------
-- CREATING THE TABLES --
-------------------------

CREATE TABLE IF NOT EXISTS crates(
    crate_id INT AUTO_INCREMENT PRIMARY KEY,
    crate_number VARCHAR(255) UNIQUE,
    location_id INT NOT NULL,
    project_id INT NOT NULL,
    vendor_id INT NOT NULL,
    FOREIGN KEY (location_id) REFERENCES locations(location_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id),
);

CREATE TABLE IF NOT EXISTS locations(
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    aisle INT DEFAULT NULL,
    col CHAR DEFAULT NULL,
    shelf INT DEFAULT NULL,
);

CREATE TABLE IF NOT EXISTS materials(
    material_id INT AUTO_INCREMENT PRIMARY KEY,
    part_number VARCHAR(255) UNIQUE,
    description VARCHAR(255) NOT NULL,
    thickness_inches FLOAT DEFAULT NULL,
    width_inches FLOAT DEFAULT NULL,
    length_inches FLOAT DEFAULT NULL,
    sfqt FLOAT DEFAULT NULL,
    color VARCHAR(255) DEFAULT NULL,
    tag VARCHAR(255) DEFAULT NULL,
    vendor_id INT NOT NULL,
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id),
);
ALTER TABLE materials ADD UNIQUE INDEX idx_part_number(part_number);

CREATE TABLE IF NOT EXISTS projects(
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    number INT UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS requests(
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
);

CREATE TABLE IF NOT EXISTS shipments(
    shipment_id INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM('Inbound', 'Outbound', 'Returning', 'In Transit', 'Received') NOT NULL,
    origin INT DEFAULT NULL,
    destination INT DEFAULT NULL,
    comment VARCHAR(255) DEFAULT NULL,
);

CREATE TABLE IF NOT EXISTS stock(
    stock_id INT AUTO_INCREMENT PRIMARY KEY,
    material_id INT NOT NULL,
    quantity INT DEFAULT 0,
    FOREIGN KEY (material_id) REFERENCES materials(material_id),
);

CREATE TABLE IF NOT EXISTS vendors(
    vendor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS crate_stock(
    crate_stock_id INT AUTO_INCREMENT PRIMARY KEY,
    crate_id INT NOT NULL,
    stock_id INT NOT NULL,
    FOREIGN KEY (crate_id) REFERENCES crates(crate_id),
    FOREIGN KEY (stock_id) REFERENCES stock(stock_id),
);

CREATE TABLE IF NOT EXISTS shipment_stock(
    shipment_stock_id INT AUTO_INCREMENT PRIMARY KEY,
    shipment_id INT NOT NULL,
    stock_id INT NOT NULL,
    FOREIGN KEY (shipment_id) REFERENCES shipments(shipment_id),
    FOREIGN KEY (stock_id) REFERENCES stock(stock_id),
);

CREATE TABLE IF NOT EXISTS request_stock(
    request_stock_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    stock_id INT NOT NULL,
    FOREIGN KEY (request_id) REFERENCES requests(request_id),
    FOREIGN KEY (stock_id) REFERENCES stock(stock_id),
);

-----------------------
-- CREATING TRIGGERS --
-----------------------

DELIMITER //
DROP TRIGGER IF EXISTS set_sqft;
--  Trigger to calculate the sqft of each material
CREATE TRIGGER IF NOT EXISTS set_sqft
BEFORE INSERT ON materials
FOR EACH ROW
BEGIN
    -- Only calculate sqft if it's not provided (i.e., NULL)
    IF NEW.sqft IS NULL THEN
        -- Check if width_inches and length_inches are valid (not NULL)
        IF NEW.width_inches IS NOT NULL AND NEW.length_inches IS NOT NULL THEN
            -- Calculate square feet
            SET NEW.sqft = NEW.width_inches * NEW.length_inches / 144;
        ELSE
            -- Handle missing dimensions by setting sqft to NULL
            SET NEW.sqft = NULL; 
        END IF;
    END IF;
    -- If sqft is provided, the trigger does nothing to overwrite it
END;
//
DELIMITER ;