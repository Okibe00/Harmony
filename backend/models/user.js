/**
 * class representing a manufacturer
 *
 *  */

import BaseModel from "./base_model.js";
import { v4 as uuidv4} from 'uuid';

export default class admin_user extends BaseModel {
  /**
   * @param {obj} - user data { }
   */
  constructor(obj) {
    super(obj);
    this.user_id = uuidv4();
  }
}
