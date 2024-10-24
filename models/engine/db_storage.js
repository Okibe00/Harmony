/**
 * database engine
 * @class
 */
import mysql from 'mysql2/promise';
import { TABLES, DATABASE } from '../../utils/db_setup';
import 'dotenv/config';

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
    const { HOST, PASSWORD} = process.env;
    const config = {
      host: HOST,
      password: PASSWORD,
      user: 'simon'
    };
      this.#conn = mysql.createPool({connectionLimit: 50, ...config});
      dbStorage.instance = this;
  }
  /**
   * Provision the database
   * @return nothing
   */
   async setup_db() {
    //create  the database;
    await this.#conn.query('CREATE DATABASE IF NOT EXISTS ' + DATABASE);
    await this.#conn.query(`USE ${DATABASE}`);

    for (const table in TABLES) {
      await this.#conn.query(TABLES[table]);
    }
  }

  /**
   * create a new manufacturer
   */
  async

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
  async save(obj) {
    const placeholderCount = Object.keys(obj).length;
    const table = obj.constructor.name.toLowerCase();
    const valuePlaceholder = '?'.repeat(placeholderCount).split('').toString();
    const columns = Object.keys(obj).join();
    const values = Object.values(obj);
    const sqlQuery = `INSERT INTO ${table} (${columns}) VALUES (${valuePlaceholder})`;
    await this.#conn.execute(sqlQuery, [...values]);
    // console.log(this.#conn.sql);
  }
} //end of dbStorage clas

const storage = new dbStorage();
export default storage;
