/**
 * @description defines the user class
 */

import BaseModel from './baseModel';
/**
 * Represents a user in the app
 */
export default class Users extends BaseModel {
  /**
   * 
   * @param {Object} user {username, password, email}  
   */
  constructor(user) {
    super(user);
  }
}
