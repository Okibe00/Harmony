/**
 * create  a unique product code
 * @param manufacturerId{string},
 * @param product{object}
 * Return {string}: productCode || '0'
 */

import Manufacturers from '../models/manufacturer';
import storage from '../models/engine/db';

export const getProductCode = ({
  manufacturerId,
  brandName,
  dosageForm,
  drugClass,
}) => {
  if (!manufacturerId && !brandName && !dosageForm && !drugClass) {
    return 0;
  }
  const manufacturerCode = padCode(manufacturerId, 3, '0');
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
    return valString.slice(0, 3);
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
