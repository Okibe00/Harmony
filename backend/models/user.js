/**
 * class representing a manufacturer
 *
 *  */

import BaseModel from "./base_model.js";

export default class admin_user extends BaseModel {
  /**
   * @param {string} manufacturer_name - name of manufacturer
   * @param {string} country - country of manufacturer
   */
  constructor(obj) {
    super(obj);
  }
}
