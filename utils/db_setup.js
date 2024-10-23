/**
 * setup the database - create tables
 */

export const DATABASE = 'harmony';

export const TABLES = {

  manufacturer: (
    `
     CREATE TABLE IF NOT EXISTS manufacturers (
      manufacturer_id INT PRIMARY KEY AUTO_INCREMENT,
      manufacturer_name VARCHAR(255),
      country VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_manufacturer_name (manufacturer_name)
     )ENGINE=InnoDB
    `
  ),
brand: (
  `
   CREATE TABLE IF NOT EXISTS brands (
    brand_id INT PRIMARY KEY AUTO_INCREMENT,
    brand_name VARCHAR(255) NOT NULL,
    manufacturer_id INT,
    category ENUM('POM', 'OTC') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(manufacturer_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    nafdac_no VARCHAR(50),
    INDEX idx_brand_name (brand_name)
  )ENGINE=InnoDB
  `),
formulation: (
  `
  CREATE TABLE IF NOT EXISTS formulations (
    formulation_id INT PRIMARY KEY AUTO_INCREMENT,
    brand_id INT,
    dosage_form VARCHAR(100) NOT NULL,
    strength VARCHAR(50) NOT NULL,
    active_ingredients TEXT NOT NULL,
    market_status ENUM('active', 'discontinued') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES brands(brand_id)
  )ENGINE=InnoDB
  `
),
drugCodes: (
  `
   CREATE TABLE IF NOT EXISTS drug_codes (
     code_id INT PRIMARY KEY AUTO_INCREMENT,
     brand_id INT,
     manufacturer_id INT,
     formulation_id INT,
     product_code VARCHAR(100) NOT NULL UNIQUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     FOREIGN KEY (brand_id) REFERENCES brands(brand_id) ON DELETE CASCADE,
     FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(manufacturer_id),
     FOREIGN KEY (formulation_id) REFERENCES formulations(formulation_id)
   )ENGINE=InnoDB
  `
),
user: (
  `
  CREATE TABLE IF NOT EXISTS admin_user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('read', 'write', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )ENGINE=InnoDB
  `
),
drugClass: (
  `
  CREATE TABLE IF NOT EXISTS drug_class (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    INDEX idx_name (name)
  )
  `
)
}
