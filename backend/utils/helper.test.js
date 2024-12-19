/**
 * Test utility functions
 */
import { getProductCode } from './helper';
// import Brand from '../models/brand';

describe('getProductCode', () => {
  test('test with all param given', () => {
    const gascol = {
      brandName: 'gascol',
      drugClass: 'antacid',
      manufacturerId: 1,
      dosageForm: 'suspension',
    };
    // const gascol = new Brand(newBrand)
    const result = getProductCode(gascol);
    console.log(result);
    expect(result).toBe('gas-001-sus-antac');
  });

  test('should return 0', () => {
    let result = getProductCode('AMOXICILLIN', 'gsk');
    expect(result).toBe(0);
    expect(getProductCode('', '', '', '', '')).toBe(0);
    expect(getProductCode('', 'FF', 'FFFF', 'SFS', 'DSDSD')).toBe(0);
  });
});
