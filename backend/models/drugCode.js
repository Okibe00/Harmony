import { getProductCode } from '../utils/helper.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * @class - drug codes class
 */

export default class Codes {
  /**
   *
   * @param {string} brandName
   * @param {string} manufacturerId
   * @param {string} drugClass
   * @param {string} dosageForm
   * @param {*} brandId
   */
  constructor({
    brand_name,
    manufacturer_id,
    drug_class,
    dosage_form,
    id,
  }) {
    const brand = {
      brandName: brand_name,
      manufacturerId: manufacturer_id,
      drugClass: drug_class,
      dosageForm: dosage_form,
      brandId: id
    };
    this.id = uuidv4();
    this.product_code = getProductCode(brand);
    this.brand_id = id;
    this.manufacturer_id = manufacturer_id;
  }

  get brandCode() {
    return this.product_code;
  }
}
