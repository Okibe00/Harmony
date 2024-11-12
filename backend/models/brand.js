/**
 * @class brand class
 */

import BaseModel from './base_model.js';
import { v4 as uuidv4 } from 'uuid';

export default class Brands extends BaseModel {
  /**
   * @param {object} - object of validated attributes
   */
  constructor(obj) {
    super(obj);
    this.brand_id = uuidv4();
  }
}
