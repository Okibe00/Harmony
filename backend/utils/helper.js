/**
 * create  a unique product code
 * @param manufacturerId{string},
 * @param product{object}
 * Return {string}: productCode || '0'
 */

import Manufacturers from '../models/manufacturer.js';
import { storage } from '../models/engine/db.js';
import Brands from '../models/brand.js';
import { v4 as uuidv4 } from 'uuid';

export const getProductCode = ({
  manufacturerId,
  brandName,
  dosageForm,
  drugClass,
}) => {
  if (!manufacturerId && !brandName && !dosageForm && !drugClass) {
    return 0;
  }
  const manufacturerCode = padCode(uuidv4(), 5, '0');
  const dosageFormCode = padCode(dosageForm, 2, '0');
  const productCode = `${brandName.slice(
    0,
    3
  )}-${manufacturerCode}-${dosageFormCode}-${drugClass.slice(0, 5)}`;
  /**
   * split the code by '-'
   *  There should be 4 strings of XXX, XXX | more, XXX | more
   */
  if (validateCode(productCode)) {
    return productCode;
  }
  return '0';
};

/**
 * pad val if charLength is < 3
 * @param val{string}
 * @param padSize{number}
 * @param padString{string}
 */
let padCode = (val, padSize = 3, padString = '0') => {
  const valString = val.toString();
  const strLen = valString.length;
  if (strLen < 3) {
    return valString.padStart(padSize, padString);
  } else if (strLen === 3) {
    return valString;
  } else {
    return valString.slice(0, padSize + 1);
  }
};

/**
 *
 * @param {String} productCode
 * @returns true | false
 */
let validateCode = (productCode) => {
  const [brandName, manufacturerCode, dosageFormCode, drugClass] =
    productCode.split('-');
  return (
    brandName.length === 3 &&
    manufacturerCode.length >= 3 &&
    dosageFormCode.length >= 2 &&
    drugClass
  );
};

//provision database with some data
export async function provisionDb() {
  const man0 = {
    name: 'Fidson PLC',
    country: 'Nigeria',
  };
  const man1 = {
    name: 'Emzor Pharmaceuticals',
    country: 'Nigeria',
  };
  const man2 = {
    name: 'Chi Pharma Ltd',
    country: 'Nigeria',
  };
  const man3 = {
    name: 'Elbe',
    country: 'Nigeria',
  };
  const man4 = {
    name: 'DrugField',
    country: 'Nigeria',
  };
  const companyList = [man0, man1, man2, man3, man4];

  const companyObjs = companyList.map((man) => {
    return new Manufacturers(man);
  });
  for (let i = 0; i < companyObjs.length; i++) {
    await storage.save(companyObjs[i]);
  }
}
//add some testing brands 
export async function addBrands() {
  const amatem = {
    brand_name: 'Amatem Soft Gel 80/480mg',
    manufacturer_id: '7c458dbc-6272-4fe7-b03f-eae4086bb8ef',
    generic_name: 'Artemeter+lumefrantrine',
    nafdac_no: '546236',
    pack_size: '1x10',
    drug_class: 'Antimalaria',
    category: 'POM',
    dosage_form: 'Tablet',
    active_ingredients: 'Artemeter 80mg + Lumefrantine 480mg',
    market_status: 'active',
  };
  const Eparacetamol = {
    brand_name: 'Emzor Paracetamol',
    manufacturer_id: '5c85a761-7977-4889-a6e1-27323dee021c',
    generic_name: 'Paracetamol',
    nafdac_no: 'B4-8578',
    pack_size: '1x10',
    drug_class: 'Antipyretic',
    category: 'OTC',
    dosage_form: 'Tablet',
    active_ingredients: 'Paracetamol 500mg',
    market_status: 'active',
  };
  const acyclovir = {
    brand_name: 'Acyclovir Cream',
    manufacturer_id: '2d07528f-67fe-404f-8400-5129a49c61fb',
    generic_name: 'Acyclovir',
    nafdac_no: 'B4-828',
    pack_size: '1x1',
    drug_class: 'Antiviral',
    category: 'POM',
    dosage_form: 'Cream',
    active_ingredients: 'Acyclovir 15%w/w',
    market_status: 'active',
  };
  const meprasil = {
    brand_name: 'Meprasil-20',
    manufacturer_id: '1360f8d5-d5c0-4056-a833-9772eb61ee38',
    generic_name: 'Omeprazole',
    nafdac_no: 'B4-7512',
    pack_size: '2x10',
    drug_class: 'PPI',
    category: 'POM/OTC',
    dosage_form: 'Tablet',
    active_ingredients: 'Omeprazole 20mg',
    market_status: 'active',
  };
  const chiflox = {
    brand_name: 'ChiFlox 500',
    manufacturer_id: '0ad7c637-3577-4d8d-ae1d-50946255ae66',
    generic_name: 'Ciprofloxacin 500mg',
    nafdac_no: 'B4-7822',
    pack_size: '1x10',
    drug_class: 'Antibiotic',
    category: 'POM/OTC',
    dosage_form: 'Tablet',
    active_ingredients: 'Ciprofloxacin 500mg',
    market_status: 'active',
  };
  const brandList = [amatem, acyclovir, Eparacetamol, meprasil, chiflox];
  const brandObj = brandList.map((brand) => new Brands(brand));
  for (let i = 0; i < brandObj.length; i++) {
    await storage.save(brandObj[i]);
  }
}
