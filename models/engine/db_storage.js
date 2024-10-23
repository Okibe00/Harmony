/**
 * database engine
 * @class
 */
import mysql from 'mysql2/promise';
import { TABLES, DATABASE } from '../../utils/db_setup';
import 'dotenv/config';

export default class dbStorage {
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
  }
  /**
   * Provision the database
   * @return nothing
   */
   async setup_db() {
    //create  the database;
    await this.#conn.query('CREATE DATABASE IF NOT EXISTS ' + DATABASE);
    await this.#conn.query('USE ' + DATABASE);

    for (const table in TABLES) {
      await this.#conn.query(TABLES[table]);
    }
  }

  /**
   * create a new manufacturer
   */

  /**
   * execute a query string
   * @returns query result
   *
   */
  async execute(query, values=[]) {
    try{
      return await this.#conn.execute(query, values);
    } catch(err) {
      console.log(err);
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
    }
  }

} //end of dbStorage clas
