/**
 * create  a unique product code
 * @param manufacturerId{string},
 * @param productDetail{object}
 * Return {string}: brandName-manufacturerCode-dosageForm || '0'
 */

export const getProductCode = ({ manufacturerId,  brandName, dosageForm, drugClass }) => {
  if (
    !manufacturerId
      && !brandName
      && !dosageForm
      && !drugClass
    ) {
      return ('0');
    }
  const manufacturerCode = padCode(manufacturerId, 3, '0');
  const dosageFormCode = padCode(dosageForm, 2, '0');
  const productCode = `${brandName.slice(0, 3)}-${manufacturerCode}-${dosageFormCode}-${drugClass}`;
  /**
   * split the code by '-'
   *  There should be 4 strings of XXX, XXX | more, XXX | more
   */
  if (validateCode(productCode)) {
    return productCode;
  }
  return '0';
}

/**
 * pad val if charLength is < 3
 * @param val{string}
 * @param padSize{number}
 * @param padString{string}
 */
const padCode = (val, padSize=3, padString='0') => {
  const valString = val.toString();
  if (valString.length < 3) {
    return (valString.padStart(padSize, padString));
  }
  return val;
}

/**
 *
 * @param {String} productCode
 * @returns true | false
 */
const validateCode = (productCode) => {
  const [brandName, manufacturerCode, dosageFormCode, drugClass] = productCode.split('-');
  console.log(brandName, manufacturerCode, dosageFormCode, drugClass)
  return (
    brandName.length === 3
     && manufacturerCode.length >= 3
     && dosageFormCode.length >=2
     && drugClass
  )
}
