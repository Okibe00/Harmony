/**
 * delete a manufacturer
 * @param {string} name - manufacturer_name
 */

import storage from "../models/engine/db_storage.js"


const deleteManufacturer = async (name) => {
  try {
    if (name) {
      await storage.execute(`DELETE FROM manufacturers WHERE manufacturer_name=?`, [name]);
      return 0;
    } else {
      console.log('Please specify a manufacturer name')
    }
  } catch(err) {
    console.error(err);
  }
}
export default deleteManufacturer;
