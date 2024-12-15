/**
 * @description - contains database schema
 */
// create  database;
export const DATABASE_TABLES = {
  manufacturers: `CREATE TABLE IF NOT EXISTS manufacturers (
    manufacturer_id VARCHAR(255) PRIMARY KEY,
    manufacturer_name VARCHAR(255) UNIQUE,
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_manufacturer_name (manufacturer_name)
) ENGINE=InnoDB;
`,
  brands: `CREATE TABLE IF NOT EXISTS brands (
    brand_id VARCHAR(255) PRIMARY KEY,
    generic_name TEXT,
    brand_name VARCHAR(255) NOT NULL,
    manufacturer_id VARCHAR(255),
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
) ENGINE=InnoDB;`,
  drug_codes: `CREATE TABLE IF NOT EXISTS drug_codes (
     code_id VARCHAR(255) PRIMARY KEY,
     brand_id VARCHAR(255),
     manufacturer_id VARCHAR(255),
     product_code VARCHAR(100) NOT NULL UNIQUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     FOREIGN KEY (brand_id) REFERENCES brands(brand_id) ON DELETE CASCADE,
     FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(manufacturer_id)
) ENGINE=InnoDB;`,
  user: `CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
`,
  sessions: `CREATE TABLE IF NOT EXISTS sessions (
  session_id varchar(128) COLLATE utf8mb4_bin NOT NULL,
  expires int(11) unsigned NOT NULL,
  data mediumtext COLLATE utf8mb4_bin,
  PRIMARY KEY (session_id)
) ENGINE=InnoDB`,
};
