/**
 * @module add_brand
 * @description add a record to brand table
 */

/**
 *
 * @param {Object} - object of containing table values
 * @returns 0(success) 1(failure)
 */
import Brands from "../models/brand.js";
import storage from "../models/engine/db_storage.js";
import add_manufacturer from '../utils/add_manufacturer.js';
import Drug_Codes from "../models/drug_code.js";
import Manufacturers from "../models/manufacturer.js";

const addBrand = async (newBrand={}) => {
  try {
    let query = `SELECT manufacturer_id FROM manufacturers WHERE manufacturer_name=?`;
    let manufacturer_id;
    const [[manufacturer]] = await storage.execute(query, [newBrand.manufacturer_name]);
    //attempt to create the manufacturer with name alone
    if (!manufacturer) {
      console.log('creating manufacturer');
      const manufacturer_name = newBrand.manufacturer_name;
       manufacturer_id = await add_manufacturer(new Manufacturers({manufacturer_name}))
    } else {
      manufacturer_id = manufacturer.manufacturer_id;
      console.log(newBrand.manufacturer_id === manufacturer.manufacturer_id)
    }
    const dupObj = {...newBrand};
    delete dupObj['manufacturer_name'];
    dupObj['manufacturer_id'] = manufacturer_id;
    const row = new Brands(dupObj);
    await storage.save(row);
    const drugCode = new Drug_Codes(row);
    await storage.save(drugCode);
    return 0;
  } catch(err) {
    console.error(err);
    return 1;
  }
}
export default addBrand;
