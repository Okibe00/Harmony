import storage from "../models/engine/db_storage.js";

/**
 * search for drug records base
 * @param {string} searchTerm - search_string
 * @param {string} filter - filter criteria
 * @return {Object | null} result - object containing result
 *
 *
 */

const getDrug = async (searchTerm = '', { dosageForm=null, category=null, marketStatus=null }) => {

  if (searchTerm) {
      const query = `
      SELECT d.product_code,
        b.brand_name,
        m.manufacturer_name,
        b.generic_name,
        b.dosage_form
      FROM drug_codes d
      JOIN brands b
        ON d.brand_id = b.brand_id
      JOIN manufacturers m
        ON d.manufacturer_id = m.manufacturer_id
       WHERE
        brand_name LIKE ?
        OR generic_name LIKE ?
        OR manufacturer_name LIKE ?
        OR product_code LIKE ?
        OR dosage_form LIKE ?
        OR category LIKE ?
        OR market_status LIKE ?
      `;
      const [ row ] = await storage.execute(
        query,
         [
          `%${searchTerm}%`,
           `%${searchTerm}%`,
           `%${searchTerm}%`,
           `%${searchTerm}%`,
           dosageForm,
           category,
           marketStatus
         ]
        );
      return row;
  } else {
    return 'Please provide search entry';
  }
}
export default getDrug;
