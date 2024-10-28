import storage from "../models/engine/db_storage.js";
import Manufacturers from "../models/manufacturer.js";
/**
 * add a manufacturer
 * @param{object} manufacturer - manufacturer object
 */
const addManufacturer = async (obj) => {
  try {
    const row = new Manufacturers(obj);
    console.log(await storage.save(row));
    const [[manufacturer]] = await storage.execute(`SELECT manufacturer_id FROM manufacturers WHERE manufacturer_name=?`, [row.manufacturer_name]);
    return manufacturer.manufacturer_id;
  } catch(err) {
     console.error(err);
     return -1;
  }
}

export default addManufacturer;
