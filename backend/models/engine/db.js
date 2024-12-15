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
  constructor() {
    if (dbStorage.instance) {
      return dbStorage.instance;
    }
    const { HOST, PASSWORD, USER, DB } = process.env;
    const config = {
      host: HOST,
      password: PASSWORD,
      user: USER,
      database: DB,
    };
    this.#conn = mysql.createPool({ connectionLimit: 50, ...config });
    dbStorage.instance = this;
  }
  
  async setup_db() {
    try {
      await this.#conn.query('CREATE DATABASE IF NOT EXISTS ' + DATABASE);
      await this.#conn.query(`USE ${DATABASE}`);

      for (const table in DATABASE_TABLES) {
        await this.#conn.query(DATABASE_TABLES[table]);
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
} //end of dbStorage class

const storage = new dbStorage();
export default storage;
