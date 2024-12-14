/**
 * @description defines the user class
 */

import BaseModel from './baseModel';
/**
 * Represents a user in the app
 */
export default class User extends BaseModel {
  /**
   * 
   * @param {Object} user {username, password, email}  
   */
  constructor(user) {
    super(user);
  }
}
