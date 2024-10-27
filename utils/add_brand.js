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

const addBrand = async (newBrand={}) => {
  try {
    let query = `SELECT manufacturer_id FROM manufacturers WHERE manufacturer_name=?`;
    let manufacturer_id;

    const [[manufacturer]] = await storage.execute(query, [newBrand.manufacturer_name]);
    console.log(manufacturer);
    if (!manufacturer) {
      const manufacturer_name = newBrand.manufacturer_name;
       manufacturer_id = await add_manufacturer({manufacturer_name})
    } else {
      manufacturer_id = manufacturer.manufacturer_id;
    }
    const dupObj = {...newBrand};
    delete dupObj['manufacturer_name'];
    dupObj['manufacturer_id'] = manufacturer_id;
    const row = new Brands(dupObj);
    await storage.save(row);
    const [[res]] = await storage.execute('Select brand_id, brand_name, dosage_form,manufacturer_id, drug_class FROM brands WHERE brand_name=?', [row.brand_name]);
    console.log(res);
    const drugCode = new Drug_Codes(res);
    await storage.save(drugCode);
    return 0;
  } catch(err) {
    console.err(err);
    return 1;
  }
}
export default addBrand;
