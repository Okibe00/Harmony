import { getProductCode } from '../utils/product_code.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * @class - drug codes class
  */


export default class Drug_Codes {
  /**
   *
   * @param {string} brandName
   * @param {string} manufacturerId
   * @param {string} drugClass
   * @param {string} dosageForm
   * @param {*} brandId
   */
  constructor({ brand_name, manufacturer_id, drug_class, dosage_form, brand_id }) {
    const brand = {
      brandName: brand_name,
      manufacturerId: manufacturer_id,
      drugClass: drug_class,
      dosageForm: dosage_form,
      brandId: brand_id
    }
    this.code_id = uuidv4();
    this.product_code = getProductCode(brand);
    this.brand_id = brand_id;
    this.manufacturer_id = manufacturer_id;
  }
  /**
   * @return brandCode
   */
  get brandCode() {
    return this.product_code;
  }
}
