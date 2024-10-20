/**
 * test produces right code sequence
 * test empty param
 */
import { getProductCode } from './product_code';
import { MANUFACTURER, FORMULATIONS } from './dosage_form';
import { DRUGCLASS } from './drugclass';

describe('getProductCode test suite', () => {
  test('test with all param given', () => {
    const gascol = {
      brandName: 'gascol',
      drugClass: DRUGCLASS['antacid'],
      manufacturerId: MANUFACTURER['Fidson'],
      dosageForm: FORMULATIONS['suspension'],
    }
    const result = getProductCode(gascol);

    expect(result).toBe('gas-001-13-36');
  })

  test('test incomplete parameters', () => {
    let result = getProductCode("AMOXICILLIN", "gsk");
    expect(result).toBe('0');
    expect(getProductCode('', '', '', '', '')).toBe('0')
    expect(getProductCode('', 'FF', 'FFFF', 'SFS', 'DSDSD')).toBe('0')

  })
})
