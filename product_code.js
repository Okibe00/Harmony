/**
 * create  a unique product code
 * @param manufacturerId{string},
 * @param productDetail{object}
 */
import {createHash} from 'crypto';
const dosageForms = {
  tablet: 1,
  capsule: 2,
  syrup: 3,
  injection: 4,
  ointment: 5,
  cream: 6,
  gel: 7,
  patch: 8,
  inhaler: 9,
  suppository: 10,
  drops: 11,
  solution: 12,
  suspension: 13,
  powder: 14
};

const mnfList = {
  'Fidson plc': 1,
  'May and Baker': 2,
  'Norvatis': 3,
  'Emzor plc': 4
}
const manufacturer = 'fidson plc';
const productDetail = {
  brandName: 'Tuxil D child',
  genericName: 'chlorpheniramine',
  dosageForm: 'syrup',
}
export const getProductCode = (manufacturerId, productDetail) => {
  const manufactureCode = manufacturerId.toString().padStart(4, '0');
  const { brandName, dosageForm } = productDetail;
  brandName = brandName.slice(0, 4);
  dosageForm = dosageForms[dosageForm].toString().padStart(3, '0');
  const productCode = `${brandName}-${manufactureCode}-${dosageForm}`;
  return productCode;
}

const genCode = getProductCode(mnfList['Fidson plc'], productDetail);
console.log(gencode);
