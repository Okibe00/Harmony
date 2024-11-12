import storage from "../models/engine/db_storage.js";
import Manufacturers from "../models/manufacturer.js";
/**
 * add a manufacturer
 * @param{object} manufacturer - manufacturer object
 */
const addManufacturer = async (obj) => {
  try {
    await storage.save(obj);
    return obj.manufacturer_id;
  } catch(err) {
     console.error(err);
     return -1;
  }
}

export default addManufacturer;
