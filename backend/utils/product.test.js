/**
 * test produces right code sequence
 * test empty param
 */
import { getProductCode } from './product_code';
import { MANUFACTURER } from './dosage_form';

describe('getProductCode test suite', () => {
  test('test with all param given', () => {
    const gascol = {
      brandName: 'gascol',
      drugClass: 'antacid',
      manufacturerId: MANUFACTURER['Fidson'],
      dosageForm: 'suspension',
    }
    const result = getProductCode(gascol);
    console.log(result);

    expect(result).toBe('gas-001-sus-antac');
  })

  test('test incomplete parameters', () => {
    let result = getProductCode("AMOXICILLIN", "gsk");
    expect(result).toBe('0');
    expect(getProductCode('', '', '', '', '')).toBe('0')
    expect(getProductCode('', 'FF', 'FFFF', 'SFS', 'DSDSD')).toBe('0')

  })

  test('get codes from db', () => {
    const drugs = [
      {
        brandName: "Coartem 80/480",
        drugClass: "Antimalaria",
        manufacturerId: 5,
        dosageForm: "tablet"
      },
      {
        brandName: "Meprasil-20",
        drugClass: "PPI",
        manufacturerId: 1,
        dosageForm: "tablet"
      },
      {
        brandName: "Emcap Paractemol",
        drugClass: "Antimalaria",
        manufacturerId: 4,
        dosageForm: "tablet"
      },
      {
        brandName: "Amatem Softgel",
        drugClass: "Antimalaria",
        manufacturerId: 6,
        dosageForm: "tablet"
      },
      {
        brandName: "Zinnat 500mg",
        drugClass: "Antibiotic",
        manufacturerId: 2,
        dosageForm: "tablet"
      }
    ];

 drugs.forEach((obj) => {
  console.log(getProductCode(obj));
 })
  })
})
