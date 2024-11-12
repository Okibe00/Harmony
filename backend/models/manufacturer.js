/**
 * class representing a manufacturer
 *
 *  */

/**
 * manufacturer_id INT PRIMARY KEY AUTO_INCREMENT,
      manufacturer_name VARCHAR(255),
      country VARCHAR(100),
 */
import BaseModel from "./base_model.js";
import { v4 as uuidv4 } from 'uuid';

export default class Manufacturers extends BaseModel {
  /**
   * @param {string} manufacturer_name - name of manufacturer
   * @param {string} country - country of manufacturer
   */
  constructor(obj) {
    super(obj);
    this.manufacturer_id = uuidv4();
  }

}
