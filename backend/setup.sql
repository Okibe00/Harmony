-- create  database;
CREATE DATABASE IF NOT EXISTS harmony;
-- select database;
USE harmony;

-- create database tables;

CREATE TABLE IF NOT EXISTS manufacturers (
    manufacturer_id INT PRIMARY KEY AUTO_INCREMENT,
    manufacturer_name VARCHAR(255) UNIQUE,
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_manufacturer_name (manufacturer_name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS brands (
    brand_id INT PRIMARY KEY AUTO_INCREMENT,
    generic_name TEXT,
    brand_name VARCHAR(255) NOT NULL,
    manufacturer_id INT,
    nafdac_no VARCHAR(50),
    pack_size VARCHAR(100),
    drug_class VARCHAR(100),
    category ENUM('POM', 'OTC') NOT NULL,
    dosage_form VARCHAR(100) NOT NULL,
    active_ingredients TEXT NOT NULL,
    market_status ENUM('active', 'discontinued') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(manufacturer_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    INDEX idx_brand_name (brand_name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS drug_codes (
     code_id INT PRIMARY KEY AUTO_INCREMENT,
     brand_id INT,
     manufacturer_id INT,
     product_code VARCHAR(100) NOT NULL UNIQUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     FOREIGN KEY (brand_id) REFERENCES brands(brand_id) ON DELETE CASCADE,
     FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(manufacturer_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS admin_user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('read', 'write', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- insert into manufacturer
INSERT INTO manufacturers (manufacturer_name, country) VALUES
    ('Fidson', 'Nigeria'),
    ('GSK', 'Britain'),
    ('CHI', 'Nigeria'),
    ('Emzor', 'Nigeria'),
    ('Norvartis', 'Sweden'),
    ('Elbe', 'Nigeria');

INSERT INTO brands (
    generic_name,
    brand_name,
    manufacturer_id,
    nafdac_no,
    pack_size,
    drug_class,
    category,
    dosage_form,
    active_ingredients,
    market_status
) VALUES
    ('Artemeter+Lumefrantrine', 'Coartem 80/480',(SELECT manufacturer_id From manufacturers WHERE manufacturer_name='Norvartis'), 'B4-0262', '1x6', 'Antimalaria', 'POM', 'tablet' ,'Artemeter80mg/lumefrantrine480mg', 'active'),
    ('Omeprazole', 'Meprasil-20', (SELECT manufacturer_id From manufacturers WHERE manufacturer_name='Fidson'), 'O4-5478', '2x10', 'PPI', 'POM', 'tablet' ,'Omeprazole 20mg', 'active'),
    ('Paracetamol', 'Emcap Paracetamol', (SELECT manufacturer_id From manufacturers WHERE manufacturer_name='Emzor'), 'O4-5478', '2x10', 'Analgesic', 'OTC', 'tablet' ,'Paracetamol 500mg', 'active'),
    ('Artemeter+Lumefrantrine', 'Amatem Softgel', (SELECT manufacturer_id From manufacturers WHERE manufacturer_name='Elbe'), 'A4-3489', '1x6', 'Antimalaria', 'POM', 'tablet' ,'Artemeter+Lumefrantine', 'active'),
    ('Cefuroxime', 'Zinnat 500mg', (SELECT manufacturer_id From manufacturers WHERE manufacturer_name='GSk'), '04-0433', '1x10', 'Antibiotic', 'POM', 'tablet' ,'Cefuroxime 500mg', 'active');

-- insert drug codes
INSERT INTO drug_codes (
    brand_id,
    manufacturer_id,
    product_code
    )
    VALUES ((SELECT brand_id FROM brands WHERE brand_name='Coartem 80/480'), (SELECT manufacturer_id FROM manufacturers WHERE manufacturer_name='Norvartis'), 'Coa-005-tab-antim'),((SELECT brand_id FROM brands WHERE brand_name='Meprasil-20'), (SELECT manufacturer_id FROM manufacturers WHERE manufacturer_name='Fidson'), 'Mep-001-tab-PPI'),((SELECT brand_id FROM brands WHERE brand_name='Emcap Paracetamol'), (SELECT manufacturer_id FROM manufacturers WHERE manufacturer_name='Emzor'), 'Emc-004-tab-Analg'), ((SELECT brand_id FROM brands WHERE brand_name='Amatem Softgel'), (SELECT manufacturer_id FROM manufacturers WHERE manufacturer_name='Elbe'), 'Ama-006-tab-antim'),((SELECT brand_id FROM brands WHERE brand_name='Zinnat 500mg'), (SELECT manufacturer_id FROM manufacturers WHERE manufacturer_name='GSK'), 'Zin-002-Antib');

-- test cleanup
-- DROP DATABASE harmony;
