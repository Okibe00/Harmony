/**
 * @module baseModel
 * @description base model for all app models
 */

import { v4 as uuid4 } from 'uuid';

class BaseModel {
  constructor(obj) {
    this.id = uuid4();
    Object.assign(this, obj);
  }
}

export default BaseModel;
