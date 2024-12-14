/**
 * @description Test suit for brands class
 */

import Brand from './brand';
test('Should have id and name field', () => {
  const brand = {
    name: '',
  };
  const pharmabay = new Brand(brand);
  expect(pharmabay.name).toBe('Pharmabay Limited');
  expect(pharmabay.id).toBeTruthy();
});
