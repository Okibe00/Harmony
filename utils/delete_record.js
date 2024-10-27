/**
 * deletes a record from the database
 * @param{string} product_code - unique identifier
 */

import storage from "../models/engine/db_storage.js"

const deleteProduct = async (product_code) => {
  try {
    const [[brand]] = await storage.execute('SELECT brand_id FROM drug_codes WHERE product_code=?', [product_code]);
    if (!brand) {
      return 1;
    }
    await storage.execute(`DELETE FROM brands WHERE brand_id=?`, [brand.brand_id]);
    return 0
  } catch(err) {
    console.err(err);
  }
}
export default deleteProduct;
