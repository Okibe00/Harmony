import { getProductCode } from '../utils/helper';
import { v4 as uuidv4 } from 'uuid';

/**
 * @class - drug codes class
 */

export default class DrugCodes {
  /**
   *
   * @param {string} brandName
   * @param {string} manufacturerId
   * @param {string} drugClass
   * @param {string} dosageForm
   * @param {*} brandId
   */
  constructor({
    brandName,
    manufacturerId,
    drugClass,
    dosageForm,
    brandId,
  }) {
    const brand = {
      brandName,
      manufacturerId,
      drugClass,
      dosageForm,
      brandId,
    };
    this.codeId = uuidv4();
    this.productCode = getProductCode(brand);
    this.brandId = brandId;
    this.manufacturerId = manufacturerId;
  }

  get brandCode() {
    return this.productCode;
  }
}
