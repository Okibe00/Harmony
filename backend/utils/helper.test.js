/**
 * Test utility functions
 */
import { getProductCode, hashPwd } from './helper';
// import Brand from '../models/brand';
import bcrypt from 'bcrypt';
// import { hashPwd } from './helper';

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
    expect(result.split('-').length).toBe(4);
  });

  test('should return 0', () => {
    let result = getProductCode('AMOXICILLIN', 'gsk');
    expect(result).toBe(0);
    expect(getProductCode('', '', '', '', '')).toBe(0);
    expect(getProductCode('', 'FF', 'FFFF', 'SFS', 'DSDSD')).toBe(0);
  });
});

test('should return a password hash', () => {
  const plainPwd = 'harmonyDB';
  const saltRound = 10;
  const pwdHash = hashPwd(plainPwd, saltRound);
  console.log(bcrypt.compareSync(plainPwd, pwdHash));
});
