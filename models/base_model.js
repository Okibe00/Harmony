/**
 * Base model class
 *
 */

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
