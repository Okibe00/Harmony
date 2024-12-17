/**
 * @description Test suit for brands class
 */

import Brands from './brand';
test('Should have id and name field', () => {
  const brand = {
    name: '',
  };
  const pharmabay = new Brands(brand);
  expect(pharmabay.name).toBe('Pharmabay Limited');
  expect(pharmabay.id).toBeTruthy();
});
