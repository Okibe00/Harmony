/**
 * Base model class
 *
 */
import { v4 as uuidv4} from 'uuid';
export default class BaseModel {

  /**
   *
   * @param {*} obj - object containing instance attributes.
   *
   * Note - validation for attributes may be necessary in the future
   */
  constructor(obj) {
    Object.assign(this, obj);
  }
}
