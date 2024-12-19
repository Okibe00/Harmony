/**
 * database engine
 * @class
 */
import mysql from 'mysql2/promise';
import 'dotenv/config';
// import { DATABASE, DATABASE_TABLES } from '../../utils/db_schema/db_schema.js';
// import addBrand from '../../utils/add_brand.js';
// import addManufacturer from '../../utils/add_manufacturer.js';
// import MySQLStore from 'express-mysql-session';
import { TABLES } from '../../utils/dbUtils/dbSchema.js';
class dbStorage {
  /**
   * @constructor
   * @param {string} host - database host
   * @param {string} user - current logged user
   * @param {string} password - user password
   * @param  {string} database - destination database
   */
  #conn = null;
  constructor() {
    if (dbStorage.instance) {
      return dbStorage.instance;
    }
    const { HOST, PASSWORD, DB_USER, DB } = process.env;
    const config = {
      host: HOST,
      password: PASSWORD,
      user: DB_USER,
      database: DB,
    };
    // console.log(config);
    this.#conn = mysql.createPool({ connectionLimit: 50, ...config });
    dbStorage.instance = this;
  }

  async setup_db() {
    try {
      for (const table in TABLES) {
        await this.#conn.query(TABLES[table]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * execute a query string
   * @returns query result
   *
   */
  async execute(query, values = []) {
    try {
      // await this.#conn.query('USE harmony');
      return await this.#conn.execute(query, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async get(id = '', obj = '') {
    if (id && obj) {
      const query = `SELECT * FROM ${obj} WHERE id=?`;
      const [[row]] = await this.execute(query, [id]);
      return row;
    } else {
      console.log('Invalid id or table');
    }
  }

  async delete(id, obj) {
    if ((id, obj)) {
      const query = `DELETE FROM ${obj} WHERE id=?`;
      const [row] = await this.execute(query, [id]);
      return row;
    }
    return 1;
  }
  /**
   * close the pool connection
   */
  async closeConnection() {
    try {
      await this.#conn.end();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  /**
   *
   * @param {@param} obj
   */
  async save(obj) {
    const placeholderCount = Object.keys(obj).length;
    const table = obj.constructor.name.toLowerCase();
    const valuePlaceholder = '?'.repeat(placeholderCount).split('').toString();
    const columns = Object.keys(obj).join();
    const values = Object.values(obj);
    const sqlQuery = `INSERT INTO ${table} (${columns}) VALUES (${valuePlaceholder})`;
    return await this.execute(sqlQuery, [...values]);
  }
} //end of dbStorage class

export const storage = new dbStorage();
// export  storage;
