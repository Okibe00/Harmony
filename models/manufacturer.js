/**
 * class representing a manufacturer
 *
 *  */

/**
 * manufacturer_id INT PRIMARY KEY AUTO_INCREMENT,
      manufacturer_name VARCHAR(255),
      country VARCHAR(100),
 */
import BaseModel from "./base_model";

export default class Manufacturers extends BaseModel {
  /**
   * @param {string} manufacturer_name - name of manufacturer
   * @param {string} country - country of manufacturer
   */
  constructor(obj) {
    super(obj);
  }

}
