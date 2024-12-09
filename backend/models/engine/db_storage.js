/**
 * database engine
 * @class
 */
import mysql from 'mysql2/promise';
import 'dotenv/config';
import { DATABASE, DATABASE_TABLES } from '../../utils/db_schema/db_schema.js';
import addBrand from '../../utils/add_brand.js';
import addManufacturer from '../../utils/add_manufacturer.js';
import MySQLStore from 'express-mysql-session';

class dbStorage {
  /**
   * @constructor
   * @param {string} host - database host
   * @param {string} user - current logged user
   * @param {string} password - user password
   * @param  {string} database - destination database
   */
  #conn = null;
  sessionStore = null;
  constructor() {
    if (dbStorage.instance) {
      return dbStorage.instance;
    }
    const { HOST, PASSWORD} = process.env;
    const config = {
      host: HOST,
      password: PASSWORD,
      user: 'simon',
      database: 'harmony'
    };
      this.#conn = mysql.createPool({connectionLimit: 50, ...config});
      this.sessionStore = this.#conn;
      dbStorage.instance = this;
  }
  /**
   * Provision the database
   * @return nothing
   */
   async setup_db() {
    //create  the database;
    try {
      await this.#conn.query('CREATE DATABASE IF NOT EXISTS ' + DATABASE);
      await this.#conn.query(`USE ${DATABASE}`);

      for (const table in DATABASE_TABLES) {
        await this.#conn.query(DATABASE_TABLES[table]);
      }
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * create a new manufacturer
   * @param {object} - brand| user | manufacturer| DrugCode
   * @return {number} 0 success | 1 failed
  */
  async add(obj) {
    try {
      if (obj.constructor.name === 'Brands') {
        await addBrand(obj);
      } else if (obj.constructor.name === 'Manufacturers') {
        await addManufacturer(obj);
      } else if (obj.constructor.name === 'admin_user') {
        await this.save(obj);
      } else if (obj.constructor.name === 'Drug_Code') {
        await this.save(obj);
      }
      return 0;
    } catch(error) {
      console.error(error)
      return 1;
    }
  }

  /**
   * execute a query string
   * @returns query result
   *
   */
  async execute(query, values=[]) {
    try{
      await this.#conn.query('USE harmony');
      return await this.#conn.execute(query, values);
    } catch(error) {
      console.log(error);
      throw error;
    }
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
    /**
     * consider a way to save subquery to retrieve the id
     */
    const placeholderCount = Object.keys(obj).length;
    const table = obj.constructor.name.toLowerCase();
    const valuePlaceholder = '?'.repeat(placeholderCount).split('').toString();
    const columns = Object.keys(obj).join();
    const values = Object.values(obj);
    const sqlQuery = `INSERT INTO ${table} (${columns}) VALUES (${valuePlaceholder})`;
    return await this.execute(sqlQuery, [...values]);
  }
} //end of dbStorage clas

const storage = new dbStorage();
export default storage;
